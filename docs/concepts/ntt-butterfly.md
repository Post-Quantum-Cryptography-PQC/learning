# NTT butterfly (gentle)

**Prereqs:** [Polynomial multiply engines](poly-mul-engines.md) · [Polynomial wrap-around](../fundamentals/polynomials-wraparound.md) · [Modular multiplier](modular-multiplier.md) · helpful: [Module-LWE](module-lwe.md)  
**Next:** [NTT parallel memory](ntt-parallel-memory.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Explain an NTT as “FFT for modular integers,” contrast Cooley–Tukey (CT) vs Gentleman–Sande (GS) at slogan level, describe a butterfly as a small modular arithmetic cell, and list what hardware must store beyond the ALU (twiddles, addresses, pipeline).

## Why this card exists

For cryptographic sizes, the fast path for polynomial multiplication is:

$$
\text{NTT} \rightarrow \text{pointwise mul} \rightarrow \text{INTT}.
$$

Papers throw “Cooley–Tukey,” “Gentleman–Sande,” “twiddle,” and “CT/GS butterfly” quickly. This card is the gentle HW-facing vocabulary — not a full number-theory course.

## Intuition — FFT, but mod $q$

The classical FFT evaluates a polynomial at special roots of unity using a recursive butterfly pattern.  
An **NTT** (number-theoretic transform) does the same idea **modulo a prime $q$** that admits a suitable root of unity (NTT-friendly $q$ — the reason many lattice primes look “weird”).

Moral for hardware: lots of identical **butterflies** applied in stages, with coefficients streaming from memory.

## What is a butterfly?

A **butterfly** takes two coefficients $a,b$, a **twiddle** factor $\omega$ (a stored constant mod $q$), and produces two outputs. One common Cooley–Tukey-style slogan:

$$
\begin{align*}
a' &\equiv a + \omega\cdot b \pmod{q} \\
b' &\equiv a - \omega\cdot b \pmod{q}
\end{align*}
$$

(Exact CT vs GS formulas and scaling for INTT vary by paper — hold the structure: **one modmul by twiddle + modular add/sub**.)

So each butterfly leans on your [modular multiplier](modular-multiplier.md) (or a dedicated mul-by-constant) plus modular add/sub.

### CT vs GS (and why papers pick both)

| Flavor | Slogan | Typical use in Kyber HW |
|--------|--------|-------------------------|
| **Cooley–Tukey (CT)** | Multiply by twiddle **before** the add/sub split | Forward NTT stages |
| **Gentleman–Sande (GS)** | Add/sub **first**, then multiply a difference by twiddle | INTT stages (often) |

Hardware often **reuses one ALU** with a mode bit: CT for NTT, GS for INTT, and a third mode for [CWM](poly-mul-engines.md) that skips the butterfly pattern and just does $a\cdot b\bmod q$.

**Twiddle grouping:** consecutive butterflies in a stage may share the same $\omega$, or follow a fixed ROM schedule. Grouping reduces ports to twiddle memory and simplifies the address generator — a common “Bi-Core / dual-butterfly” trick is to fire two butterflies that need the same (or adjacent) twiddles in one cycle.

### Symbols

| Symbol | Say |
|--------|-----|
| NTT / INTT | forward / inverse number-theoretic transform |
| Twiddle $\omega$ | precomputed root-of-unity power mod $q$ |
| Butterfly | local 2-in / 2-out modular update |
| Stage | one pass of $n/2$ butterflies across the vector |

### Mid-page self-check

Why do NTT designs care so much about memory address patterns?

<details><summary>Answer</summary>

Butterflies pair coefficients at changing strides each stage; ports and conflicts dominate latency if addresses are naive.

</details>

## Hardware ingredients (beyond one ALU)

| Ingredient | Role |
|------------|------|
| Butterfly ALU | modmul + add/sub (+ pipeline registers) |
| Twiddle ROM / generator | supply $\omega$ each cycle |
| Coefficient SRAM | banks, ping-pong, in-place layouts |
| Address generator | bit-reversed / constant-geometry schedules |
| Control FSM | stage loops, NTT vs INTT vs PWM modes |

IEEE papers often claim novelty in **scheduling**, **multi-issue butterflies**, **merged NTT+PWM**, or **memory geometry** — not always in a brand-new modmul.

## Story recap

1. NTT ≈ modular FFT enabling fast poly mul.  
2. Butterfly = twiddle mul + modular add/sub pair.  
3. Engine = many butterflies + memory + control.  
4. Next: how Encaps/Decaps wraps engines into an accelerator.

## Check yourself

1. Name the three big steps of NTT-based poly mul.  
<details><summary>Answer</summary>
NTT, pointwise modular multiply, INTT.
</details>

2. What is a twiddle?  
<details><summary>Answer</summary>
A precomputed power of a root of unity modulo $q$, used inside butterflies.
</details>

3. Does inventing a better modmul automatically invent a better NTT engine?  
<details><summary>Answer</summary>
It helps the leaf; the engine still needs schedule, memory, and twiddle delivery.
</details>

4. CT vs GS — which usually maps to forward NTT in Kyber accelerators?  
<details><summary>Answer</summary>
Cooley–Tukey (CT) for forward NTT; Gentleman–Sande (GS) often for INTT — check the paper’s exact formulas.
</details>

## Next steps

- [NTT parallel memory](ntt-parallel-memory.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Theory: [Module-LWE](module-lwe.md)  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
