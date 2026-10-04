# LRPC codes (intuition)

**Prereqs:** [Rank metric](rank-metric.md) · [Linear codes](linear-codes.md)  
**Next:** [Rank syndrome decoding](rank-syndrome-decoding.md) · Track: [Rank metric](../tracks/rank-metric/ROADMAP.md)  
**Tracks:** rank-metric

**Learning goals.** Explain what “low-rank parity-check” suggests, contrast LRPC structure with MDPC-style Hamming sparsity, and say who uses the hidden support for decoding.

## Why this card exists

**LRPC** = *Low-Rank Parity-Check* codes. They are a structured family in rank-metric cryptography (related to RQC-shaped KEMs and lab WIP on blockwise / ideal variants).  

This card is **intuition only** — not a full decoder derivation or parameter table. Think of it as the rank twin of “MDPC has sparse checks,” told patiently.

## Intuition — structure that makes decoding easy for the owner

In the **Hamming** world, MDPC codes use a **sparse** parity-check matrix: few $1$s per row. That sparsity is trapdoor fuel for bit-flipping-style decoders.

In the **rank** world, LRPC codes use parity-check entries that all live in a **small-dimensional $\mathbb{F}_q$-subspace** of $\mathbb{F}_{q^m}$ — a low-dimensional “support.” That algebraic smallness is the trapdoor fuel for decoding **low-rank** errors.

| | Hamming MDPC spirit | Rank LRPC spirit |
|--|---------------------|------------------|
| What is kept “small” | Number of $1$s in $H$ (Hamming sparsity) | Dimension of the $\mathbb{F}_q$-subspace containing check entries |
| Errors the owner corrects | Low Hamming-weight noise | Low **rank-weight** noise ([rank metric](rank-metric.md)) |
| Public view | Scrambled / structured public key that should hide the sparse secret | Public matrix that should hide the secret support subspace |

Slogan:

> Owner knows a hidden low-dimensional support for the checks → can decode low-rank noise.  
> Public key hides that support → attacker faces a hard rank-decoding-type problem.

### Picture in words (no full algorithm)

1. Secret: a small subspace $F\subset\mathbb{F}_{q^m}$ with $\dim_{\mathbb{F}_q} F$ small (the LRPC “weight”).  
2. Build a parity-check matrix whose entries live in $F$.  
3. On receive, expand the syndrome using knowledge of $F$ and recover a low-rank error when parameters allow.  
4. Attacker without $F$ should not get that expansion for free.

Exact algorithms (and failure rates) are paper-specific; treat them as “structured rank decoders,” parallel to “bit-flipping for MDPC.”

### Mid-page self-check

Is an LRPC code defined by “few $1$s in the binary expansion of $H$”?

<details><summary>Answer</summary>

Not as the defining slogan. LRPC smallness is about a **low-dimensional support subspace** for check entries over $\mathbb{F}_{q^m}$, not Hamming sparsity of a binary matrix (though the *spirit* — structured checks for the owner — is analogous).

</details>

## Formal definition (postcard)

An LRPC code is typically defined via a parity-check matrix $H$ whose entries all lie in a secret $\mathbb{F}_q$-subspace $F\subseteq\mathbb{F}_{q^m}$ with $\dim F$ small.  

Decoding algorithms expand syndromes into products / spans involving that support and recover low-rank errors when the design parameters allow.  

You do **not** need the full product-space analysis to use this card. Hold:

> Small secret support for checks + low-rank noise → owner decoding.  
> Hidden support + public instance → attacker faces [rank syndrome decoding](rank-syndrome-decoding.md)-flavored hardness.

## Worked analogy (not a cryptanalysis result)

Imagine Hamming MDPC: “I know where the sparse $1$s live → I can flip bits using local checks.”  
Imagine LRPC: “I know the small subspace the check symbols live in → I can expand the syndrome in that subspace and peel a low-rank error.”

Both stories share **easy for owner / hard for public instance**. They do **not** share cost formulas — do not import MDPC bit-flipping failure models unchanged into rank papers.

## Where it appears in PQC

- Rank-metric KEM / PKE proposals using LRPC or close cousins.  
- TIT / lab themes: blockwise rank decoding, ideal variants, support-learning cryptanalysis.  
- Not on the Hamming [code-based KEM](../tracks/code-based-kems/ROADMAP.md) core path unless a paper bridges both.

Ideal / quasi-cyclic-like compressions change key size **and** attack surface — structure is not free security.

## Common confusions

- LRPC $\neq$ “low Hamming-weight parity checks” (spirit similar; definition different).  
- Ideal / structured public keys can weaken or strengthen attacks — do not assume random-LRPC security automatically.  
- Failure events exist here too (rank-metric cousins of [DFR](dfr.md)); models differ from Hamming.  
- Knowing “LRPC” does not replace reading a scheme’s actual decoder and failure analysis.

## Check yourself

1. What is kept small in an LRPC parity-check structure?  
2. Who uses that small support for decoding?  
3. Name the metric LRPC lives in.  
4. Name the Hamming-world cousin that also uses structured parity checks for the owner.  

<details><summary>Answers</summary>

1. The dimension of the $\mathbb{F}_q$-subspace containing the check entries (the support).  
2. The secret-key owner (trapdoor decoder).  
3. The rank metric.  
4. MDPC (moderate-density parity-check) codes — sparse $H$ in the Hamming world.

</details>

## Big practice set

1. Fill the table mentally: MDPC keeps _____ small; LRPC keeps _____ small.  
2. True or false: publishing an ideal compressed public key always increases security.  
3. Why does the attacker care about learning the support $F$?  
4. After this card, which problem statement should you read next?  

<details><summary>Practice answers</summary>

1. Hamming weight / number of $1$s in checks; dimension of the check-entry support subspace.  
2. False — compression changes the attack surface; structure can help attackers too.  
3. With $F$, the structured decoder path becomes available (or related algebraic attacks); without it, they face a harder public decoding instance.  
4. [Rank syndrome decoding](rank-syndrome-decoding.md).

</details>

## Next steps

- [Rank syndrome decoding](rank-syndrome-decoding.md)  
- Track roadmap: [Rank metric](../tracks/rank-metric/ROADMAP.md)  
- Contrast Hamming twin: [Syndrome decoding](syndrome-decoding.md)  
