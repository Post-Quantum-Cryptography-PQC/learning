# MDPC and QC-MDPC codes (intuition)

**Prereqs:** [Hamming metric](hamming-metric.md) · [Linear codes](linear-codes.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md) · [Syndrome decoding](syndrome-decoding.md)  
**Next:** [Bit-flipping decoding](bit-flipping-decoding.md) · [DFR](dfr.md) · Paper: [QC-MDPC reaction attack explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain what “moderate density” means for a parity-check matrix, contrast MDPC with Classic McEliece’s Goppa story, say why QC-MDPC shrinks keys, and know that decoding is probabilistic (DFR + reaction-attack lessons).

## Why this card exists

BIKE-family and related schemes use **QC-MDPC** secrets. The TIT reaction-attack paper assumes you know what that structure is. This card is that postcard — before [bit-flipping](bit-flipping-decoding.md) and DFR.

## Story in six lines (no math yet)

1. Alice’s secret is a **checklist with a moderate number of ticks** (not ultra-sparse, not fully dense).  
2. The checklist repeats in rotating blocks so she can store it as a few short patterns (quasi-cyclic).  
3. She publishes a masked view — not the raw secret ticks.  
4. Bob sends something that looks like a noisy fingerprint of sparse noise.  
5. Alice runs an iterative “who looks guilty?” cleaner ([bit-flipping](bit-flipping-decoding.md)); sometimes it fails (DFR).  
6. If Eve can watch many success/fail reactions on a **static** key, she may learn Alice’s ticks — the reaction-attack lesson.

## Intuition — sparse checks, but not ultra-sparse

**LDPC** (low-density parity-check) codes: parity-check matrix $H$ has very few $1$s per row — great for communications decoding.

**MDPC** (moderate-density parity-check): still sparse compared to a random dense matrix, but denser than classical LDPC. That middle ground is useful for crypto key sizes and decoding radius tradeoffs.

**QC-MDPC:** the MDPC matrix is built from **quasi-cyclic** (circulant / polynomial) blocks — store a few sparse polynomials instead of a huge unstructured $H$.

### Density cartoon

| Family | $1$s in $H$ (slogan) | Typical PQC role |
|--------|----------------------|------------------|
| Dense random-looking $H$ | Many | Hard SD instances for attackers |
| LDPC | Very few per row | Communications; careful in crypto |
| MDPC | Moderate sparse | Code-based KEM secrets (BIKE-shaped) |
| QC-MDPC | MDPC + circulant blocks | Compact keys |

### Quick self-check

Does QC-MDPC primarily shrink keys by changing the Hamming metric?  
<details><summary>Answer</summary>
No — it keeps Hamming; quasi-cyclic structure compresses the description.
</details>

## Formal postcard (light)

- Secret: sparse parity-check matrix $H$ (MDPC), often block-circulant (QC).  
- Public: a related matrix that hides the sparse secret (scheme-dependent masking).  
- Ciphertext / encaps: produces a syndrome-like noisy object.  
- Decrypt / decaps: run an iterative decoder (usually **bit-flipping** family) to recover sparse error / secret-related noise.

Decoding is **not** a perfect algebraic Goppa decoder — it can fail → [DFR](dfr.md).

## Contrast with Classic McEliece

| | Classic McEliece (Goppa) | QC-MDPC / BIKE-shaped |
|--|-------------------------|------------------------|
| Secret structure | Algebraic Goppa / alternant | Sparse (QC) parity-check |
| Public key size | Very large | Much smaller |
| Decoder | Algebraic (designed $t$) | Iterative bit-flipping (probabilistic) |
| Main caution | Structural algebraic leaks | DFR + reaction / key-reuse lessons |

Both are still **Hamming**-metric code-based crypto.

## Worked slogan timeline

1. Alice samples sparse QC blocks → secret MDPC $H$.  
2. She publishes a masked public key.  
3. Bob encapsulates with sparse noise.  
4. Alice bit-flips to remove noise and recover the session material.  
5. If noise is unlucky, she fails (DFR).  
6. If Eve can observe many success/fail reactions on a **static** key, she may learn the secret support — see the [reaction-attack explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md).

## Where it appears in PQC

- BIKE and QC-MDPC encryption / KEM lineage  
- Ouroboros / related QC code KEM discussions on this track  
- Modeling of failures and independence for QC noise ([2025/018](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) is QC-product-noise flavored, not MDPC-only)

## Common confusions

- MDPC ≠ LDPC (density regime differs).  
- QC-MDPC ≠ Classic McEliece with a smaller Goppa key — different trapdoor.  
- Probabilistic decoding means DFR is a first-class design parameter.  
- Quasi-cyclic structure helps size **and** opens structured cryptanalysis — not free security.

## Check yourself

1. What does “moderate density” refer to?  
2. Why add quasi-cyclic structure?  
3. Name the usual decoder family for MDPC.  
4. True or false: QC-MDPC uses the rank metric.  

<details><summary>Answers</summary>

1. How sparse the parity-check matrix is (between LDPC and dense).  
2. Smaller public keys (circulant / polynomial storage).  
3. Bit-flipping (iterative).  
4. False — Hamming metric.

</details>

## Big practice set

1. Rank these by typical public-key size slogan: Classic McEliece, QC-MDPC.  
2. What observable bit enables reaction attacks in the TIT paper’s lesson?  
3. Which card should you read next for the decoder mechanics?  

<details><summary>Answers</summary>

1. Classic McEliece larger; QC-MDPC smaller.  
2. Decrypt / decaps success vs failure (reaction).  
3. [Bit-flipping decoding](bit-flipping-decoding.md).

</details>

## Next steps

- [Bit-flipping decoding](bit-flipping-decoding.md)  
- [DFR](dfr.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md)  
- Paper: [QC-MDPC reaction attack](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md)  
