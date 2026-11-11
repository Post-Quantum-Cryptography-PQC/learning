# Noise samplers

**Prereqs:** [Probability (gentle)](../fundamentals/probability-gentle.md) · [LWE](lwe.md) · helpful: [Module-LWE](module-lwe.md) · [Noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
**Next:** [Hash / XOF](hash-xof-keccak.md) · [Ciphertext compress / encode](ciphertext-compress-encode.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** After this page you can (1) say in one sentence what a noise sampler *does*, (2) build a tiny CBD sample by hand, and (3) recognize that “sampler” in HW papers is the block that draws those small random coefficients.

## The one idea

On the [LWE](lwe.md) card you met cloudy equations

$$
b \equiv \langle \mathbf{a}, \mathbf{s}\rangle + e \pmod{q}
$$

with a **small** noise $e$.  
Someone (software or a chip) must **actually pick** those small $e$ values — and often whole vectors or polynomials of them.

That “someone” is the **noise sampler**.

| Without a sampler | With a sampler |
|-------------------|----------------|
| You know $e$ should be small | You have a concrete random recipe that outputs small $e$ |
| Papers just write “$e\leftarrow\chi$” | Hardware has a named block that produces coefficients |

**This page teaches the recipe idea**, not a full Kyber parameter sheet.

## Why small random noise (30-second replay)

From the [LWE bridge](../bridge/noisy-linear-equations-lwe.md):

- **Too little / zero noise** → equations become ordinary linear algebra; secrets leak.  
- **Too much noise** → even the legitimate owner cannot recover the message (failures).  
- Schemes therefore sample from a distribution that **likes values near zero**.

A sampler is how KeyGen / Encaps / Sign **implement** that distribution in real code or silicon.

## Worked toy — centered binomial (CBD)

Kyber-shaped KEMs often use a **centered binomial distribution** (CBD).  
Plain English: flip a few fair coins, subtract two small counts, get a number near $0$.

**Recipe for one coefficient** (parameter $\eta=2$ — a tiny teaching choice, not “the” Kyber $\eta$):

1. Draw four fair bits: $a_0,a_1$ and $b_0,b_1$.  
2. Output

$$
e = (a_0+a_1) - (b_0+b_1).
$$

Possible values of $e$ are in $\{-2,-1,0,1,2\}$, with $0$ most common.

### Slow-motion example

Bits: $a=(1,0)$, $b=(0,1)$.

$$
e = (1+0) - (0+1) = 1 - 1 = 0.
$$

Another draw: $a=(1,1)$, $b=(0,0)$ → $e=2-0=2$ (still small).  
Another: $a=(0,0)$, $b=(1,1)$ → $e=0-2=-2$.

General formula used in Kyber-family writeups:

$$
e = \sum_{i=0}^{\eta-1}(a_i - b_i),\qquad a_i,b_i\in\{0,1\}.
$$

Repeat for every coefficient of a polynomial → you have sampled a **noise polynomial**.

### Mid-page self-check

Is CBD the same as “pick a uniform random number mod $q$”?

<details><summary>Answer</summary>

No. Uniform mod $q$ is usually huge. CBD piles up a few $\pm 1$ coin flips so the result stays **near zero**.

</details>

## Where do the random bits come from?

Often from a hash/XOF stream (SHAKE) expanded from a short seed — see [Hash / XOF](hash-xof-keccak.md).  
Sometimes from a hardware TRNG.  
The sampler’s job is: **bits → small coefficients** (plus accept/reject rules when needed).

## Same job, other recipes (so papers do not confuse you)

| Recipe you will see | What it draws | Typical home |
|---------------------|---------------|--------------|
| **CBD** | Small integers near $0$ | Kyber / ML-KEM noise |
| **Rejection sampling** | Candidates from a stream; keep only ones that pass a size/check | Dilithium Sign (may **retry** a whole signature) |
| **Binary sampler** | Bits / binary polynomials | Lightweight Ring-Binary-LWE schemes |

All three are “samplers.” The shared slogan:

> Produce the **random small stuff** the scheme’s math assumes.

You do **not** need every Dilithium loop on this page — only that Sign often **samples, checks, and sometimes restarts** ([Dilithium slogan](pq-signatures-dilithium.md)).

## Bridge to hardware

[KEM accelerator anatomy](kem-accelerator-anatomy.md) draws a box labeled **Sampler** next to NTT and hash.  
That box is exactly this idea: fill coefficient memories with CBD (or binary / rejected) noise before poly-mul runs.

When you later read “sampling module” in an FPGA paper, ask:

1. Which distribution? (CBD / binary / rejection)  
2. Where do bits come from? (SHAKE / TRNG)  
3. Is it one polynomial, or part of a Sign retry loop?

## Common confusions

- Sampler ≠ modular multiplier. Multipliers compute $ab\bmod q$; samplers **draw** random small values.  
- “Uniform bytes from SHAKE” are only the **fuel**; CBD/rejection turns them into the right shape.  
- Compressing ciphertext bits ([compress / encode](ciphertext-compress-encode.md)) is a later step — not sampling.

## Check yourself

1. In one sentence, what does a noise sampler do?  
<details><summary>Answer</summary>
It randomly produces the small noise (or noise polynomials) that LWE-shaped schemes need.
</details>

2. With $\eta=1$, bits $a_0=1$, $b_0=0$, what is $e$?  
<details><summary>Answer</summary>
$e=1-0=1$.
</details>

3. Why might Dilithium Sign “sample again”?  
<details><summary>Answer</summary>
Rejection: a candidate failed a size/correctness check, so the scheme retries.
</details>

4. Point to the anatomy box this card explains.  
<details><summary>Answer</summary>
The Sampler unit next to NTT / hash / compress.
</details>

## Next steps

- Practice more LWE toys: [LWE](lwe.md) · [noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
- Follow the bit stream: [Hash / XOF](hash-xof-keccak.md)  
- See the chip map: [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Signatures that retry: [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md)  

## Where this is grounded (optional)

Ideas match in-repo `paper.md` extracts (CBD in masked Kyber §2; ML-KEM $\eta$ in tailorable-codes §3.1; Dilithium sampling/rejection in TCAS-I §II.B/§III.E; binary sampler in TVLSI RBLWE §III.G). This page teaches the idea first; those papers are later reading, not the lesson plan.
