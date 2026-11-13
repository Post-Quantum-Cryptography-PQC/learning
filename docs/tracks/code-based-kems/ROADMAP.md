# Track: Code-based KEMs (with signature fork)

**Prereqs:** [Fundamentals](../../index.md#2-fundamentals) · [Bridge overview](../../bridge/README.md)  
**Next:** [From bits to codes](../../bridge/from-bits-to-codes.md) · [Rank metric](../rank-metric/ROADMAP.md) · [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)  
**Tracks:** code-based-kems

## Who / outcomes

After this track you can:

- Tell the McEliece story from generator / parity-check intuition.  
- Place QC-MDPC / HQC / BIKE-shaped **KEMs** next to DFR and independence heuristics.  
- Open an optional **code-based signature** fork (CFS / QC-LDGM / LEDAsig) after constant-weight + Sign vocabulary.  
- Read curated **TIT** theory leaves and **TCAS / TVLSI / TCAD / JSSC** circuit leaves with `paper.md` grounding.  
- Fork to **rank metric** (Hamming → rank) or the shared [hardware code fork](../pqc-hardware/ROADMAP.md#family-hw-leaves-code).

## How to use

1. Shared entry (essentials only — full fundamentals list is on [Home](../../index.md)).  
2. Stages 1–3 = **KEM core** (mandatory order).  
3. Stage 3b = optional **signature fork** before signature HW leaves.  
4. Stage 4 paper leaves: **TIT theory first**, then circuit tables (KEM HW · signature HW · shared silicon).  
5. Optional: [Rank metric](../rank-metric/ROADMAP.md); full accelerator depth on [PQC hardware § code](../pqc-hardware/ROADMAP.md#family-hw-leaves-code).

## Shared entry

1. [Bits, XOR, randomness](../../fundamentals/bits-xor-randomness.md)  
2. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
3. [Polynomials — Part A](../../fundamentals/polynomials-gentle.md) · [Part B](../../fundamentals/polynomials-wraparound.md)  
4. [Hard problems](../../fundamentals/hard-problems.md) · [Public-key picture](../../fundamentals/public-key-picture.md)  
5. [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) · [Building $\mathrm{GF}(2^3)$](../../bridge/building-gf-8.md) · [Security bits](../../bridge/security-bits-and-work.md)

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
3. Helpful before packaging / reliability leaves: [Constant-weight coding](../../concepts/constant-weight-coding.md) · [CED / composite-field Goppa](../../concepts/ced-composite-goppa.md)

**Checkpoint:** What is hidden in the public key vs what the legitimate owner still knows?

### Stage 3 — QC-MDPC / KEM / DFR (Intro ch. 13–14)

1. [From KEM API to noise](../../bridge/from-kem-api-to-noise.md)  
2. [Quasi-cyclic codes](../../concepts/quasi-cyclic-codes.md) · [MDPC / QC-MDPC](../../concepts/mdpc-qc-mdpc.md) · [Bit-flipping](../../concepts/bit-flipping-decoding.md) (includes min-sum contrast)  
3. [KEM](../../concepts/kem.md) · [IND-CPA / CCA](../../concepts/ind-cpa-cca.md) · [DFR](../../concepts/dfr.md)  
4. [Independence heuristics](../../concepts/independence-heuristics.md) · [KL divergence](../../concepts/kl-divergence.md)  
5. Before HQC/BIKE HW leaves: [Carryless $\mathbb{F}_2$ polymul](../../concepts/carryless-polymul-f2.md)

**Checkpoint:** Why is decryption failure rate a security topic, not only a reliability topic?

### Stage 3b — Optional signature fork

Only if you will read QC-LDGM / LEDAsig (or related) leaves:

1. [Code-based signatures](../../concepts/code-based-signatures.md)  
2. Revisit [Constant-weight coding](../../concepts/constant-weight-coding.md)

**Checkpoint:** Encaps/Decaps vs Sign/Verify — which API do those leaves use?

### Stage 4 — Research leaves

Walk **theory** then **circuit** tables. Circuit rows are promoted because the paper’s primary subject is code-based PQC (not a name-drop in a lattice paper). Multi-family silicon: [crypto-agile SoC](../../concepts/crypto-agile-soc.md).

## Paper leaves — theory (TIT / ePrint)

| Title (short) | Extract / explainer | Status |
|---------------|---------------------|--------|
| McEliece ↔ Niederreiter equivalence | `papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/paper.md` · [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md) | private explainer + extract |
| Ouroboros KEM family | `papers/tit-pqc/ouroboros-an-efficient-and-provably-secure-kem-family/paper.md` · [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/ouroboros-an-efficient-and-provably-secure-kem-family/explainer.md) | private explainer + extract |
| QC-MDPC reaction attack | `papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/paper.md` · [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md) | private explainer + extract |
| High-rate McEliece distinguisher | `papers/tit-pqc/a-distinguisher-for-high-rate-mceliece-cryptosystems/paper.md` | extract only |
| ePrint 2025/018 independence (QC) | [Private explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) · `papers/eprint/2025-018/analysis.md` (`paper.md` not yet extracted) | private explainer |

## Paper leaves — circuit journals (TCAS / TVLSI / TCAD / JSSC)

### KEM / decoder / polymul HW

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Classic McEliece keygen (matrix / Gaussian) | `papers/tcas-i-pqc/fast-hardware-architecture-with-efficient-matrix-computations-for-the-key-generation-of-classic-mceliece/paper.md` | extract only |
| Min-sum QC-MDPC decoder for McEliece | `papers/tcas-i-pqc/low-complexity-parallel-min-sum-medium-density-parity-check-decoder-for-mceliece-cryptosystem/paper.md` | extract only |
| HQC Ibex tightly coupled accelerators | `papers/tcas-ii-pqc/a-hardware-software-co-optimization-of-hqc-using-tightly-coupled-accelerators-on-a-32-bit-ibex-core/paper.md` | concept ready |
| Constant-weight coding engines (code-based) | `papers/tcas-ii-pqc/compact-constant-weight-coding-engines-for-the-code-based-cryptography/paper.md` · [CW concept](../../concepts/constant-weight-coding.md) | concept ready |
| Sparsity-aware MDPC decoder | `papers/tcas-ii-pqc/sparsity-aware-medium-density-parity-check-decoder-for-mceliece-cryptosystems/paper.md` | extract only |
| PQC HW tutorial (covers BIKE / McEliece / HQC) | `papers/tcas-ii-pqc/hardware-circuits-and-systems-design-for-post-quantum-cryptography-a-tutorial-brief/paper.md` | extract only (survey) |
| BIKE binary polymul (sparsity pipeline) | `papers/tvlsi-pqc/A Scalable and Efficient Architecture for Binary Polynomial Multiplication in BIKE Utilizing Inter-Inner-Wise Sparsity and Block-by-Block Pipeline/paper.md` | concept ready |
| Area–time BIKE KEM on FPGA | `papers/tvlsi-pqc/Area–Time-Efficient Code-Based Postquantum Key Encapsulation Mechanism on FPGA/paper.md` | extract only |
| Classic McEliece Encap/Decap (EReA) | `papers/tvlsi-pqc/An Efficient and Reconfigurable Architecture for Classic McEliece Encapsulation and Decapsulation/paper.md` | extract only |
| LEAP sparse HQC polymul | `papers/tvlsi-pqc/LEAP: Lightweight and Efficient Accelerator for Sparse Polynomial Multiplication of HQC/paper.md` | extract only |
| Area-efficient HQC accelerator | `papers/tvlsi-pqc/An Area-Efficient HQC Accelerator With Unified Parallel Modules and Fine-Grained Scheduling/paper.md` | extract only |
| CED for GF multipliers (McEliece-oriented) | `papers/tvlsi-pqc/Reliable Architectures for Finite Field Multipliers Using Cyclic Codes on FPGA Utilized in Classic and Post-Quantum Cryptography/paper.md` · [CED concept](../../concepts/ced-composite-goppa.md) | concept ready (component) |
| CED for McEliece composite-field Goppa arith | `papers/tcad-pqc/reliable-architectures-for-composite-field-oriented-constructions-of-mceliece-post-quantum-cryptography-on-fpga/paper.md` · [CED concept](../../concepts/ced-composite-goppa.md) | concept ready |

### Signature HW (after Stage 3b)

| Title (short) | Extract | Status |
|---------------|---------|--------|
| QC-LDGM signature on embedded HW | `papers/tcas-i-pqc/toward-practical-code-based-signature-implementing-fast-and-compact-qc-ldgm-signature-scheme-on-embedded-hardware/paper.md` · [code-sig concept](../../concepts/code-based-signatures.md) | concept ready |
| Compact LEDAsig + SCA resilience | `papers/tcas-i-pqc/compact-code-based-signature-for-reconfigurable-devices-with-side-channel-resilience/paper.md` · [code-sig concept](../../concepts/code-based-signatures.md) | concept ready |

### Multi-family silicon

| Title (short) | Extract | Status |
|---------------|---------|--------|
| ARV-Q (supports BIKE / HQC / McEliece among standards) | `papers/tcas-i-pqc/arv-q-an-adaptive-risc-v-vector-processor-for-unified-support-of-post-quantum-standards-and-side-channel-protection-on-the-edge/paper.md` · [agile SoC](../../concepts/crypto-agile-soc.md) | concept ready (multi-scheme) |
| PQPU agile SoC (includes BIKE / McEliece / HQC) | `papers/jssc-pqc/pqpu-a-4-4-uj-op-69-4-kops-agile-post-quantum-crypto-processor-across-multiple-mathematical-problems/paper.md` · [agile SoC](../../concepts/crypto-agile-soc.md) | concept ready (multi-family silicon) |
| RePQC agile SoC (includes Classic McEliece) | `papers/jssc-pqc/repqc-a-3-4-uj-op-48-kops-post-quantum-crypto-processor-for-multiple-mathematical-problems/paper.md` · [agile SoC](../../concepts/crypto-agile-soc.md) | concept ready (multi-family silicon) |

Same circuit rows are mirrored / extended on [PQC hardware § code](../pqc-hardware/ROADMAP.md#family-hw-leaves-code). Prep cards: [carryless polymul](../../concepts/carryless-polymul-f2.md) · [crypto-agile SoC](../../concepts/crypto-agile-soc.md).

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 11 | Linear codes | Stage 1 |
| 12 | McEliece | Stage 2 |
| 13–14 | BIKE / HQC-shaped | Stage 3 |
| — | Code-based signatures | Stage 3b fork |
| — | TIT cryptanalysis | Stage 4 theory leaves |
| — | Circuit accelerators | Stage 4 circuit leaves |

## Cross-track forks

- [Rank metric](../rank-metric/ROADMAP.md) — Hamming → rank (only from this family)  
- [PQC hardware § HQC / code](../pqc-hardware/ROADMAP.md#family-hw-leaves-code) — shared accelerator table  
- [Lattice / LWE](../lattice-lwe/ROADMAP.md) — parallel NIST KEM family  
- Signature contrast: [Hash-based](../hash-based-signatures/ROADMAP.md) · [Multivariate](../multivariate/ROADMAP.md)
