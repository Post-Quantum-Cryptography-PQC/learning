# Polynomial multiply engines

**Prereqs:** [Polynomials Part A](../fundamentals/polynomials-gentle.md) · [Polynomial wrap-around](../fundamentals/polynomials-wraparound.md) · [Modular multiplier](modular-multiplier.md)  
**Next:** [NTT butterfly](ntt-butterfly.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Name the main ways hardware multiplies polynomials mod $(X^n\pm 1)$ (or similar), say when schoolbook vs Karatsuba vs NTT appear, and see memory / scheduling as part of the “engine,” not just ALUs.

## Why this card exists

A modular multiplier multiplies **coefficients**. Lattice KEMs multiply **polynomials** (or modules of them). The **engine** is the organization: how many modmuls fire, in what order, with what memory ports.

## What “poly mul” means here

Given $f,g$ of degree $< n$ with coefficients mod $q$, compute $h = f\cdot g$ reduced modulo a fixed polynomial (often $X^n+1$ in ML-KEM-shaped rings — see [wrap-around](../fundamentals/polynomials-wraparound.md)).

Every coefficient of $h$ is a sum of products of coefficients of $f$ and $g$ — so the engine is mostly **scheduling modular multiplies and adds**.

## Engine families (slogans)

| Engine | Slogan | HW feel |
|--------|--------|---------|
| **Schoolbook** | All $n^2$ coefficient products (with wrap folding) | Simple control; many muls; fine for tiny $n$ demos |
| **Karatsuba / Toom / TMVP / Winograd** | Divide-and-conquer or structured formulas; fewer muls, more adds | Attractive when mul is expensive; control + wiring grow |
| **NTT-based** | Transform → pointwise mul → inverse transform | Dominant for ML-KEM-scale $n$; needs butterflies + twiddles + memory |

**Pointwise multiply (PWM):** after NTT, multiply matching coefficients with your [modular multiplier](modular-multiplier.md) — often the easy middle step.

### Coefficient-wise multiply (CWM) — Kyber vocabulary

Some Kyber / ML-KEM hardware papers write **CWM** for the middle step of NTT-based poly mul. Careful: in **Kyber’s NTT convention**, CWM is often **binomial**, not a single $a_i\cdot b_i$ product.

Slogan picture (pairs of NTT-domain coefficients):

$$
(a_0,a_1)\cdot(b_0,b_1)
\;\mapsto\;
\text{a few }a_i b_j\bmod q\text{ with }X^2\equiv\zeta\text{-style folds}
$$

Hardware may need **about four modular muls** per binomial product (vs one mul for naive pointwise PWM). That is why Kyber CWM latency can approach an NTT stage count — and why a reconfigurable Bi-Core rewires butterfly mul arrays into a **4-mul CWM** datapath.

Hold three modes of one engine:

| Mode | Job |
|------|-----|
| **NTT** | Transform coefficients (CT butterflies + twiddles) |
| **CWM** | Binomial (Kyber) coefficient products in NTT domain |
| **INTT** | Inverse transform (often GS butterflies) |

A “reconfigurable poly-mul accelerator” often means **one datapath** that switches among these modes (shared [modular multiplier](modular-multiplier.md), shared memory banks) rather than three separate ASICs. See [NTT parallel memory](ntt-parallel-memory.md) for how banks feed those modes.

### Tiny schoolbook sketch ($n=2$, ignore wrap for a moment)

$f = f_0 + f_1 X$, $g = g_0 + g_1 X$:

$$
\begin{align*}
h_0 &\leftarrow f_0 g_0 \\
h_1 &\leftarrow f_0 g_1 + f_1 g_0 \\
h_2 &\leftarrow f_1 g_1
\end{align*}
$$

Then fold $h_2$ using the ring modulus ($X^2\equiv \ldots$). Hardware reuses one modmul over cycles or instantiates several in parallel.

### Mid-page self-check

Why is “poly mul engine” more than “wire up one modmul”?

<details><summary>Answer</summary>

You must sequence many coefficient products, accumulate, fold wrap-around, and feed memories — control and ports dominate real designs.

</details>

## Memory and scheduling (architecture keywords)

IEEE accelerator papers often innovate here even when the modmul is standard:

- **Ping-pong / double buffers** — one bank feeds the butterfly while another is written  
- **In-place NTT layouts** — coefficient addresses follow bit-reversed or constant-geometry patterns  
- **Parallel lanes** — $p$ butterflies or PWM / CWM lanes per cycle  
- **Conflict-free banking** — $n$ coefficients striped across banks so a stage’s butterflies all get ports — see [NTT parallel memory](ntt-parallel-memory.md)  
- **Ping between hash and poly domains** — later, in [accelerator anatomy](kem-accelerator-anatomy.md)

When a paper says “new architecture,” ask: **new arithmetic leaf**, or **new schedule / memory / parallelism**?

## Link to Module-LWE

[Module-LWE](module-lwe.md) packages secrets as short vectors of polynomials. Encaps/Decaps are full of poly muls — so engines here are the computational heart of lattice PQC hardware.

## Story recap

1. Poly mul = many coefficient muls + adds + wrap.  
2. Schoolbook / Karatsuba-style / NTT are different engines.  
3. Memory ports and schedules are first-class architecture.  
4. Next cliff: the NTT butterfly itself.

## Check yourself

1. What is PWM in an NTT engine?  
<details><summary>Answer</summary>
Pointwise multiply of transformed coefficients using modular multipliers.
</details>

2. Name one reason Karatsuba might still lose to NTT at Kyber-scale $n$.  
<details><summary>Answer</summary>
Asymptotics / practical counts: NTT-based mul is typically far cheaper at cryptographic sizes despite setup cost.
</details>

3. Is a new ping-pong memory schedule a “new modmul”?  
<details><summary>Answer</summary>
No — it is a datapath / memory architecture; the leaf mul unit might be unchanged.
</details>

4. What does CWM mean in a Kyber poly-mul paper?  
<details><summary>Answer</summary>
Coefficient-wise multiply in the NTT domain — for Kyber often a **binomial** product (several muls + folds), not a single pointwise $a_i b_i$.
</details>

## Next steps

- [NTT butterfly](ntt-butterfly.md)  
- [NTT parallel memory](ntt-parallel-memory.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
