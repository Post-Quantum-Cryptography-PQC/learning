# Track: Lattice / LWE

**Prereqs:** [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Vectors](../../fundamentals/vectors-matrices.md) · [Probability](../../fundamentals/probability-gentle.md)  
**Next:** [Lattices (gentle)](../../fundamentals/lattices-gentle.md) · [PQC hardware](../pqc-hardware/ROADMAP.md) · [index](../../index.md)  
**Tracks:** lattice-lwe

## Who / outcomes

After this track you can:

- Explain lattices and LWE as “noisy modular equations,” then Module-LWE as polynomial-vector LWE.  
- Name what samplers, SHAKE/XOF, and Compress do in an ML-KEM-shaped story.  
- Contrast KEM encaps with Dilithium’s Sign + rejection loop.  
- Fork to the hardware track for NTT / SCA leaves grounded in `paper.md`.

## How to use

1. Shared entry below (skip what you already know).  
2. Walk **Stages 1–4** in order; do each checkpoint.  
3. Open **paper leaves** only after Stage 3 feels solid.  
4. Hardware: Stage 5 → [PQC hardware](../pqc-hardware/ROADMAP.md) (lattice core).

## Shared entry

1. [Modular arithmetic](../../fundamentals/modular-arithmetic.md)  
2. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
3. [Polynomials — Part A](../../fundamentals/polynomials-gentle.md) · [Part B wrap-around](../../fundamentals/polynomials-wraparound.md)  
4. [Probability (gentle)](../../fundamentals/probability-gentle.md) · [Hard problems](../../fundamentals/hard-problems.md)  
5. Helpful: [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) · [Security bits](../../bridge/security-bits-and-work.md)

## Stages

### Stage 1 — Grids (Intro ch. 05)

1. [Lattices (gentle)](../../fundamentals/lattices-gentle.md)

**Checkpoint:** In one sentence, what makes a lattice different from “all of $\mathbb{Z}^n$”?

### Stage 2 — Noisy equations → Module-LWE (Intro ch. 06)

1. [Noisy linear equations (LWE story)](../../bridge/noisy-linear-equations-lwe.md)  
2. [LWE](../../concepts/lwe.md)  
3. [Module-LWE](../../concepts/module-lwe.md)

**Checkpoint:** What does the small error $e$ protect, and what breaks if $e=0$?

### Stage 3 — ML-KEM vocabulary (Intro ch. 08)

1. [Noise samplers](../../concepts/noise-samplers.md)  
2. [Hash / XOF (Keccak–SHAKE)](../../concepts/hash-xof-keccak.md)  
3. [Ciphertext compress / encode](../../concepts/ciphertext-compress-encode.md)  
4. [KEM](../../concepts/kem.md) · [IND-CPA / CCA](../../concepts/ind-cpa-cca.md)

**Checkpoint:** Name one reason Compress shrinks ciphertexts and one risk if you drop too many bits.

### Stage 4 — Signatures fork (Intro ch. 09)

1. [PQ signatures — Dilithium slogan](../../concepts/pq-signatures-dilithium.md)

**Checkpoint:** How does Dilithium’s rejection loop differ from a one-shot KEM encaps?

### Stage 5 — Hardware fork

Walk the lattice **core** on [PQC hardware](../pqc-hardware/ROADMAP.md) (modmul → NTT → anatomy → SCA).

## Paper leaves

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Masking Kyber (CBD, Compress, FO wrap) | `papers/tches-pqc/masking-kyber-first-and-higher-order-implementations/paper.md` | concept ready |
| Tailorable codes / ML-KEM compress | `papers/tches-pqc/tailorable-codes-for-lattice-based-kems-with-applications-to-compact-ml-kem-instantiations/paper.md` | concept ready |
| Dilithium lightweight HW (SHAKE, sampling, Sign) | `papers/tcas-i-pqc/lightweight-hardware-accelerator-for-post-quantum-digital-signature-crystals-dilithium/paper.md` | concept ready |
| RBLWE instruction-set accelerator (binary sampler) | `papers/tvlsi-pqc/High-Performance Instruction-Set Hardware Accelerator for Ring-Binary-LWE-Based Lightweight PQC/paper.md` | concept ready |
| Kyber reconfigurable poly-mul (TCAD) | `papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/paper.md` | private explainer + extract |

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 05–06 | Lattice / LWE basics | Stages 1–2 |
| 08 | Kyber / ML-KEM-shaped | Stage 3 |
| 09 | Dilithium | Stage 4 |
| — | Hardware | Stage 5 → HW track |

## Cross-track forks

- [Code-based KEMs](../code-based-kems/ROADMAP.md) — parallel family  
- [PQC hardware](../pqc-hardware/ROADMAP.md) — lattice core + family HW leaves  
- [Hash-based](../hash-based-signatures/ROADMAP.md) · [Multivariate](../multivariate/ROADMAP.md) · [Isogeny](../isogeny/ROADMAP.md)
