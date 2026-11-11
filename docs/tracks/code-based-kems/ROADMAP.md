# Track: Code-based KEMs

**Prereqs:** [Fundamentals](../../index.md#2-fundamentals) · [Bridge overview](../../bridge/README.md)  
**Next:** [From bits to codes](../../bridge/from-bits-to-codes.md) · [Rank metric](../rank-metric/ROADMAP.md) · [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)  
**Tracks:** code-based-kems

## Who / outcomes

After this track you can:

- Tell the McEliece story from generator / parity-check intuition.  
- Place QC-MDPC / HQC-shaped KEMs next to DFR and independence heuristics.  
- Read curated TIT explainers with matching `paper.md` (or labeled private explainer) grounding.  
- Fork to **rank metric** (Hamming → rank) or later **code HW** leaves on the hardware track.

## How to use

1. Shared entry (essentials only — full fundamentals list is on [Home](../../index.md)).  
2. Stages 1–4 in order.  
3. TIT / ePrint leaves after Stage 3.  
4. Optional: [Rank metric](../rank-metric/ROADMAP.md); hardware family leaves later on [PQC hardware](../pqc-hardware/ROADMAP.md).

## Shared entry

1. [Bits, XOR, randomness](../../fundamentals/bits-xor-randomness.md)  
2. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
3. [Polynomials — Part A](../../fundamentals/polynomials-gentle.md) · [Part B](../../fundamentals/polynomials-wraparound.md)  
4. [Hard problems](../../fundamentals/hard-problems.md) · [Public-key picture](../../fundamentals/public-key-picture.md)  
5. [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) · [Security bits](../../bridge/security-bits-and-work.md)

## Stages

### Stage 1 — Codes bridge (Intro ch. 11)

1. [From bits to codes](../../bridge/from-bits-to-codes.md)  
2. [Noisy channel story](../../bridge/noisy-channel-story.md)  
3. [Generator and parity-check](../../bridge/generator-and-parity-check.md)  
4. [Decoding as a puzzle](../../bridge/decoding-as-a-puzzle.md)  
5. Concepts: [Error-correcting codes](../../concepts/error-correcting-codes.md) · [Hamming metric](../../concepts/hamming-metric.md) · [Linear codes](../../concepts/linear-codes.md) · [Syndrome decoding](../../concepts/syndrome-decoding.md)

**Checkpoint:** What is a syndrome, in one plain sentence?

### Stage 2 — McEliece intuition (Intro ch. 12)

1. [McEliece in plain words](../../bridge/mceliece-in-plain-words.md)  
2. [Goppa and alternant](../../concepts/goppa-alternant.md) · [Niederreiter](../../concepts/niederreiter.md) · [ISD](../../concepts/information-set-decoding.md)

**Checkpoint:** What is hidden in the public key vs what the legitimate owner still knows?

### Stage 3 — QC-MDPC / KEM / DFR (Intro ch. 13–14)

1. [From KEM API to noise](../../bridge/from-kem-api-to-noise.md)  
2. [Quasi-cyclic codes](../../concepts/quasi-cyclic-codes.md) · [MDPC / QC-MDPC](../../concepts/mdpc-qc-mdpc.md) · [Bit-flipping](../../concepts/bit-flipping-decoding.md)  
3. [KEM](../../concepts/kem.md) · [IND-CPA / CCA](../../concepts/ind-cpa-cca.md) · [DFR](../../concepts/dfr.md)  
4. [Independence heuristics](../../concepts/independence-heuristics.md) · [KL divergence](../../concepts/kl-divergence.md)

**Checkpoint:** Why is decryption failure rate a security topic, not only a reliability topic?

### Stage 4 — Research leaves

Walk the paper table below (TIT core first).

## Paper leaves

| Title (short) | Extract / explainer | Status |
|---------------|---------------------|--------|
| McEliece ↔ Niederreiter equivalence | [Private explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md) · analysis at `papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/analysis.md` (`paper.md` not yet extracted) | private explainer |
| Ouroboros KEM family | `papers/tit-pqc/ouroboros-an-efficient-and-provably-secure-kem-family/paper.md` · [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/ouroboros-an-efficient-and-provably-secure-kem-family/explainer.md) | private explainer + extract |
| QC-MDPC reaction attack | `papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/paper.md` · [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md) | private explainer + extract |
| High-rate McEliece distinguisher | `papers/tit-pqc/a-distinguisher-for-high-rate-mceliece-cryptosystems/paper.md` | extract only |
| ePrint 2025/018 independence (QC) | [Private explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) · `papers/eprint/2025-018/analysis.md` (`paper.md` not yet extracted) | private explainer |

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 11 | Linear codes | Stage 1 |
| 12 | McEliece | Stage 2 |
| 13–14 | BIKE / HQC-shaped | Stage 3 |
| — | TIT cryptanalysis | Stage 4 |

## Cross-track forks

- [Rank metric](../rank-metric/ROADMAP.md) — Hamming → rank (only from this family)  
- [PQC hardware](../pqc-hardware/ROADMAP.md#family-hw-leaves-code-later) — code HW leaves deferred  
- [Lattice / LWE](../lattice-lwe/ROADMAP.md) — parallel NIST KEM family
