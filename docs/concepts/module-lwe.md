# Module-LWE (gentle)

**Prereqs:** [LWE](lwe.md) · [Polynomials Part A](../fundamentals/polynomials-gentle.md) · [Polynomial wrap-around](../fundamentals/polynomials-wraparound.md) · [Noisy linear equations (LWE story)](../bridge/noisy-linear-equations-lwe.md)  
**Next:** [KEM](kem.md) · Track: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · HW fork: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** lattice-lwe · pqc-hardware (after theory)

**Learning goals.** Explain Module-LWE as “LWE with polynomial / module packaging,” see why that shrinks keys versus plain LWE, and know that ML-KEM sits in this family — without implementing Kyber here.

## Why this card exists

Plain LWE with huge integer vectors makes large public keys.  
**Module-LWE** packages secrets and samples as short **vectors of polynomials** (a module over a polynomial ring). Same noisy-equation spirit you practiced on the [LWE bridge](../bridge/noisy-linear-equations-lwe.md) and named in [LWE](lwe.md); more structure for efficiency.

ML-KEM (FIPS 203 / Kyber lineage) is the scheme family you will hear most often in lattice PQC engineering. This card is the packaging slogan — not a full Kyber tutorial.

## Intuition — same cloudy equations, polynomial blocks

Recall LWE: secret vector of integers mod $q$, noisy dot products.

**Module-LWE slogan:** replace “long list of integers” with “short list of polynomials whose coefficients are integers mod $q$,” with polynomial multiply-and-wrap (see [Part A](../fundamentals/polynomials-gentle.md) and [wrap-around Part B](../fundamentals/polynomials-wraparound.md), often mod $X^n+1$ in practice).

You still see equations that look like

$$
\mathbf{b} \approx \mathbf{A}\mathbf{s} + \mathbf{e},
$$

but multiplication mixes **polynomial** structure (and is often accelerated with NTTs in hardware/software). Noise stays **small on coefficients** so legitimate recovery can still round back.

### Side-by-side packaging

| | Plain LWE | Module-LWE |
|--|-----------|------------|
| Secret shape | One long vector of integers mod $q$ | Short vector of polynomials (module) |
| Sample feel | Noisy integer dot products | Noisy “matrix × module-vector” with poly multiply |
| Why designers like it | Simple slogan | Smaller keys + fast ring arithmetic |
| Still essential | Small noise | Small noise (unchanged moral) |

Exact hardness assumptions (Module-LWE vs Ring-LWE vs plain LWE) are research-level detail. For this curriculum, hold:

> Same noisy linear story, packaged in polynomial blocks.

### Mid-page self-check

Does Module-LWE remove the need for noise?

<details><summary>Answer</summary>

No. Noise remains essential — without it, linear algebra over the ring / module can recover secrets. Module packaging changes representation and efficiency, not the “errors matter” moral from the LWE bridge.

</details>

## Tiny postcard (not a full Kyber tutorial)

Think of each “symbol” as a small polynomial, not a single integer.  
Adding two secrets means adding polynomials coefficient-wise mod $q$.  
Multiplying mixes coefficients (wrap with the ring modulus).  
Adding noise still means “small coefficient noise.”  
Decapsulation still needs noise small enough to round back to the shared secret.

### Why NTT shows up next to ML-KEM

| Goal | Module packaging helps by… |
|------|----------------------------|
| Smaller keys | Structured objects compress descriptions |
| Fast multiply | NTT-friendly rings |
| Still LWE-flavored | Security arguments relate back to module / ring variants |

Hardware / TCAS-II-style papers about NTT pipelines and modular multipliers are implementing the **arithmetic engine** under this packaging — not a different cryptography API.

### Worked feel (tiny coefficients, not Kyber)

Suppose you treat “degree-$1$ polynomials mod $q$” as a toy stand-in (real schemes use larger degree). A secret might look like a short list

$$
\mathbf{s}=(s_1(X),\, s_2(X)),
$$

and a public matrix mixes them with polynomial multiplication before small coefficient noise is added. You do **not** need to multiply by hand here — notice the shape: still $\mathbf{b}\approx\mathbf{A}\mathbf{s}+\mathbf{e}$, still small $\mathbf{e}$, just richer symbols than plain integers.

If that sentence clicks, you are ready for ML-KEM talk at the API level ([KEM](kem.md)) without memorizing parameter sets.

## Where it appears in PQC

- ML-KEM keygen / encaps / decaps  
- Papers on NTT pipelines, modular multipliers, Kyber accelerators (lab’s TCAS-II / hardware corpus)  
- Shared KEM API: [KEM](kem.md) · notions: [IND-CPA / CCA](ind-cpa-cca.md)

## Common confusions

- Module-LWE is not a different *API* — KEMs still encapsulate keys.  
- Polynomial wrap-around here is related to, but not the same as, quasi-cyclic **code** polynomials (different track: [quasi-cyclic codes](quasi-cyclic-codes.md)).  
- You do not need to memorize Kyber parameter sets to understand the slogan.  
- Ring-LWE is a close cousin (often “rank-1 module”); Module-LWE allows short module rank $>1$ — names differ, noisy spirit shared.  
- If polynomials still feel steep, revisit [Part A](../fundamentals/polynomials-gentle.md) and [wrap-around Part B](../fundamentals/polynomials-wraparound.md) before this card.

## Check yourself

1. In one sentence, how does Module-LWE differ from plain LWE?  
2. Why might a hardware paper mention NTT next to Kyber/ML-KEM?  
3. True or false: Module-LWE removes the need for noise.  
4. Name the bridge page that already did tiny noisy integer equations.  

<details><summary>Answers</summary>

1. Secrets/samples use short vectors of polynomials (module structure) instead of one long integer vector.  
2. Polynomial multiplication in those rings is often implemented via NTTs.  
3. False — noise remains essential.  
4. [Noisy linear equations (LWE story)](../bridge/noisy-linear-equations-lwe.md).

</details>

## Big practice set

1. Fill: plain LWE packages integers; Module-LWE packages _____.  
2. True or false: learning Module-LWE means you must implement FIPS 203 by hand.  
3. Why might keys shrink when moving from plain LWE samples to module packaging?  
4. After this card, which concept explains the shared encapsulate / decapsulate API?  

<details><summary>Practice answers</summary>

1. Short vectors of polynomials (a module over a polynomial ring).  
2. False — this card is the packaging slogan; ML-KEM is a concrete scheme family using that idea.  
3. Structured algebraic objects can be described more compactly than huge unstructured integer matrices / vectors.  
4. [KEM](kem.md).

</details>

## Next steps

- [KEM](kem.md) · [IND-CPA / CCA](ind-cpa-cca.md)  
- Track: [Lattice / LWE ROADMAP](../tracks/lattice-lwe/ROADMAP.md)  
- Replay: [LWE](lwe.md) · [Noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
- Return to code track: [index](../index.md)  
