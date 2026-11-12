# Track: PQC hardware (modules → accelerator)

**Prereqs:** [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Bits, XOR](../../fundamentals/bits-xor-randomness.md) · helpful: [Module-LWE](../../concepts/module-lwe.md) before Tier 2–3  
**Next:** [Clocks, registers, latency](../../bridge/clocks-registers-latency.md) · [Lattice / LWE](../lattice-lwe/ROADMAP.md) · [index](../../index.md)  
**Tracks:** pqc-hardware

## Who / outcomes

After this track you can:

- Read latency / area–time tables without treating every paper as comparable.  
- Name modmul → poly/NTT → sampler/hash/compress → KEM accelerator blocks.  
- Place SCA threat model and masking shares before TCHES-style leaves.  
- Open **family HW leaf tables** (hash / multivariate / isogeny / **code–HQC**) off the lattice core — primary-subject extracts, not name-drops.  
- Place CIM-NTT and deep shuffle schedules as frontier lattice-core leaves after banking / hiding vocabulary.  
- Use [crypto-agile SoC](../../concepts/crypto-agile-soc.md) before PQPU / RePQC / ARV-Q rows; [ASA / HPC fuzzing](../../concepts/asa-hpc-fuzzing.md) before the TCAD detection leaf.

## How to use

1. Shared crypto entry, then **Tier 0–3b** (lattice core).  
2. Paper leaves: lattice-core table first; then **family sections** (code table is large — walk after [carryless polymul](../../concepts/carryless-polymul-f2.md)).  
3. Lab RTL under `projects/papers/` stays implementation, not default curriculum.

**Lab split:** pedagogy here; faithful RTL via `research-circuit-implementation`.

## Shared entry

1. [Modular arithmetic](../../fundamentals/modular-arithmetic.md)  
2. [Bits, XOR, randomness](../../fundamentals/bits-xor-randomness.md)  
3. Helpful theory: [Module-LWE](../../concepts/module-lwe.md) · [Lattice / LWE track](../lattice-lwe/ROADMAP.md)

## Stages (lattice core — ASIC ch. 1–10 themes)

### Tier 0 — Digital intuition (ASIC ~1–2)

1. [Clocks, registers, and latency](../../bridge/clocks-registers-latency.md)  
2. [Area, time, power honesty](../../bridge/area-time-power-honesty.md)

**Checkpoint:** Name one reason two “same algorithm” FPGA papers may not be fair to compare.

### Tier 1 — Arithmetic (ASIC ~3)

1. [Modular multiplier](../../concepts/modular-multiplier.md)

### Tier 2 — Polynomial / NTT (ASIC ~5–6)

1. [Polynomial multiply engines](../../concepts/poly-mul-engines.md)  
2. [NTT butterfly](../../concepts/ntt-butterfly.md)  
3. [NTT parallel memory](../../concepts/ntt-parallel-memory.md)  
4. Optional frontier: [CIM-NTT](../../concepts/cim-ntt.md)

### Tier 3 — Scheme datapath (ASIC ~3–4, 13)

1. [Noise samplers](../../concepts/noise-samplers.md) · [Hash / XOF](../../concepts/hash-xof-keccak.md) · [Ciphertext compress / encode](../../concepts/ciphertext-compress-encode.md)  
2. [KEM accelerator anatomy](../../concepts/kem-accelerator-anatomy.md)  
3. Optional: [PQ signatures — Dilithium](../../concepts/pq-signatures-dilithium.md)

### Tier 3b — Side-channel vocabulary (ASIC ~9–10)

1. [Side-channel threat model](../../bridge/side-channel-threat-model.md)  
2. [Masking shares](../../concepts/masking-shares.md)  
3. [Shuffling / hiding](../../concepts/shuffling-hiding.md)

**Checkpoint:** Masking randomizes **values** (shares); shuffling randomizes **order** — which paper leaf below targets each?

## Paper leaves — lattice core

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Masking Kyber | `papers/tches-pqc/masking-kyber-first-and-higher-order-implementations/paper.md` | concept ready |
| Kyber shuffling countermeasure | `papers/tcas-ii-pqc/a-hardware-friendly-shuffling-countermeasure-against-side-channel-attacks-for-kyber/paper.md` | concept ready |
| Dilithium lightweight accelerator | `papers/tcas-i-pqc/lightweight-hardware-accelerator-for-post-quantum-digital-signature-crystals-dilithium/paper.md` | concept ready |
| Dilithium high-speed TCAS-II | `papers/tcas-ii-pqc/a-high-speed-post-quantum-crypto-processor-for-crystals-dilithium/paper.md` | extract only |
| Kyber reconfigurable poly-mul | `papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/paper.md` | private explainer + extract |
| RBLWE instruction-set accelerator | `papers/tvlsi-pqc/High-Performance Instruction-Set Hardware Accelerator for Ring-Binary-LWE-Based Lightweight PQC/paper.md` | concept ready |
| CIM pipeline NTT (28 nm) | `papers/tcas-ii-pqc/a-28-nm-75-6-kops-13-nj-computing-in-memory-pipeline-number-theoretic-transform-accelerator-for-pqc/paper.md` | concept ready |
| Low-cost NTT shuffling (deep schedule) | `papers/tcad-pqc/low-cost-shuffling-countermeasures-against-side-channel-attacks-for-ntt-based-post-quantum-cryptography/paper.md` | concept ready |
| SUCRE shuffle-and-unmask (ML-DSA rejection) | `papers/tches-pqc/ml-dsa-masking-sweetened-with-sucre-shuffle-and-unmask-countermeasure-for-rejection-sampling/paper.md` | concept ready |

## Family HW leaves — hash-based

<a id="family-hw-leaves-hash"></a>

| Title (short) | Extract | Status |
|---------------|---------|--------|
| SPHINCS+ reconfigurable processor | `papers/tcas-i-pqc/an-efficient-and-reconfigurable-post-quantum-crypto-processor-for-sphincs/paper.md` | extract only |
| XMSS / EMSS for SPHINCS | `papers/tcas-i-pqc/efficient-hardware-implementation-of-extended-merkle-signature-scheme-for-sphincs/paper.md` | extract only |
| Parallel SPHINCS+ on GPUs | `papers/tcas-i-pqc/parallel-implementation-of-sphincs-with-gpus/paper.md` | extract only |
| SLH-DSA RISC-V (RVSLH) | `papers/tvlsi-pqc/RVSLH: Acceleration of Postquantum Standard SLH-DSA With Customized RISC-V Processor/paper.md` | extract only |
| SPHINCS+-256 FPGA accelerator | `papers/tches-pqc/fpga-based-accelerator-for-post-quantum-signature-scheme-sphincs-256/paper.md` | extract only |
| SPHINCS+ fault protection | `papers/tches-pqc/on-protecting-sphincs-against-fault-attacks/paper.md` | extract only |
| WOTS+ fault countermeasures | `papers/tches-pqc/fault-attack-countermeasures-for-sphincs-wots-with-checksum-segmentation-and-subtree-root-children-caching/paper.md` | extract only |
| PQPU agile SoC (includes SPHINCS+) | `papers/jssc-pqc/pqpu-a-4-4-uj-op-69-4-kops-agile-post-quantum-crypto-processor-across-multiple-mathematical-problems/paper.md` | extract only (multi-family silicon) |
| HPC fuzzing ASA (includes SPHINCS+) | `papers/tcad-pqc/fuzzinghardware-performance-counters-based-detection-of-algorithm-subversion-attacks-on-postquantum-signature-schemes/paper.md` | extract only (multi-family detection) |

## Family HW leaves — multivariate

<a id="family-hw-leaves-mq"></a>

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Threshold MAYO | `papers/tches-pqc/optimizing-and-implementing-threshold-mayo/paper.md` | extract only |
| MAYO GPU matrix reordering | `papers/tches-pqc/high-throughput-gpu-design-and-implementation-of-mayo-with-matrix-computation-reordering/paper.md` | extract only |
| Nibbling MAYO (AVX2 / Cortex-M4) | `papers/tches-pqc/nibbling-mayo-optimized-implementations-for-avx2-and-cortex-m4/paper.md` | extract only |
| QR-UOV AVX2 | `papers/tches-pqc/avx2-implementation-of-qr-uov-for-modern-x86-processors/paper.md` | extract only |
| Rainbow / UOV AVX2 | `papers/tches-pqc/efficient-implementations-of-rainbow-and-uov-using-avx2/paper.md` | extract only |
| Rainbow on Cortex-M4 | `papers/tches-pqc/rainbow-on-cortex-m4/paper.md` | extract only |
| Masked linear solves → UOV | `papers/tches-pqc/masked-solving-of-linear-equations-system-and-application-to-uov-signatures/paper.md` | extract only |
| SCA on MQ signatures | `papers/tches-pqc/side-channel-attacks-on-post-quantum-signature-schemes-based-on-multivariate-quadratic-equations/paper.md` | extract only |
| RePQC agile SoC (includes Rainbow) | `papers/jssc-pqc/repqc-a-3-4-uj-op-48-kops-post-quantum-crypto-processor-for-multiple-mathematical-problems/paper.md` | extract only (multi-family silicon) |
| HPC fuzzing ASA (includes Rainbow) | `papers/tcad-pqc/fuzzinghardware-performance-counters-based-detection-of-algorithm-subversion-attacks-on-postquantum-signature-schemes/paper.md` | extract only (multi-family detection) |

## Family HW leaves — isogeny (historical / broken-KEM context)

<a id="family-hw-leaves-isogeny"></a>

SIKE is **not** a current NIST KEM standard path; leaves teach accelerators and history.

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Compact SIKE HW/SW co-design | `papers/tches-pqc/a-compact-and-scalable-hardware-software-co-design-of-sike/paper.md` | extract only |
| High-performance SIKE (TCAS-II) | `papers/tcas-ii-pqc/a-high-performance-sike-accelerator-with-high-frequency-and-low-area-time-product/paper.md` | extract only |
| High-performance SIKE (TVLSI) | `papers/tvlsi-pqc/A High-Performance SIKE Hardware Accelerator/paper.md` | extract only |
| CTIDH (constant-time CSIDH) | `papers/tches-pqc/ctidh-faster-constant-time-csidh/paper.md` | extract only |

## Family HW leaves — code / HQC

<a id="family-hw-leaves-code"></a>
<a id="family-hw-leaves-code-later"></a>

Walk [Carryless $\mathbb{F}_2$ polymul](../../concepts/carryless-polymul-f2.md) first. These leaves are the **code-based HW fork** off the lattice core (not a replacement for ML-KEM study). Full theory + circuit table also lives on [Code-based KEMs](../code-based-kems/ROADMAP.md).

| Title (short) | Extract | Status |
|---------------|---------|--------|
| HQC Ibex tightly coupled accelerators | `papers/tcas-ii-pqc/a-hardware-software-co-optimization-of-hqc-using-tightly-coupled-accelerators-on-a-32-bit-ibex-core/paper.md` | concept ready |
| LEAP sparse HQC polymul | `papers/tvlsi-pqc/LEAP: Lightweight and Efficient Accelerator for Sparse Polynomial Multiplication of HQC/paper.md` | extract only |
| Area-efficient HQC accelerator (unified modules) | `papers/tvlsi-pqc/An Area-Efficient HQC Accelerator With Unified Parallel Modules and Fine-Grained Scheduling/paper.md` | extract only |
| PHOENIX (ML-KEM + HQC agile sharing) | `papers/tches-pqc/phoenix-crypto-agile-hardware-sharing-for-ml-kem-and-hqc/paper.md` | extract only |
| BIKE binary polymul (sparsity pipeline) | `papers/tvlsi-pqc/A Scalable and Efficient Architecture for Binary Polynomial Multiplication in BIKE Utilizing Inter-Inner-Wise Sparsity and Block-by-Block Pipeline/paper.md` | extract only |
| Area–time BIKE KEM on FPGA | `papers/tvlsi-pqc/Area–Time-Efficient Code-Based Postquantum Key Encapsulation Mechanism on FPGA/paper.md` | extract only |
| Classic McEliece Encap/Decap (EReA) | `papers/tvlsi-pqc/An Efficient and Reconfigurable Architecture for Classic McEliece Encapsulation and Decapsulation/paper.md` | extract only |
| Classic McEliece keygen (matrix / Gaussian) | `papers/tcas-i-pqc/fast-hardware-architecture-with-efficient-matrix-computations-for-the-key-generation-of-classic-mceliece/paper.md` | extract only |
| Min-sum QC-MDPC decoder | `papers/tcas-i-pqc/low-complexity-parallel-min-sum-medium-density-parity-check-decoder-for-mceliece-cryptosystem/paper.md` | extract only |
| Sparsity-aware MDPC decoder | `papers/tcas-ii-pqc/sparsity-aware-medium-density-parity-check-decoder-for-mceliece-cryptosystems/paper.md` | extract only |
| Constant-weight coding engines | `papers/tcas-ii-pqc/compact-constant-weight-coding-engines-for-the-code-based-cryptography/paper.md` | extract only |
| QC-LDGM signature on embedded HW | `papers/tcas-i-pqc/toward-practical-code-based-signature-implementing-fast-and-compact-qc-ldgm-signature-scheme-on-embedded-hardware/paper.md` | extract only |
| Compact LEDAsig + SCA resilience | `papers/tcas-i-pqc/compact-code-based-signature-for-reconfigurable-devices-with-side-channel-resilience/paper.md` | extract only |
| CED for McEliece composite-field Goppa arith | `papers/tcad-pqc/reliable-architectures-for-composite-field-oriented-constructions-of-mceliece-post-quantum-cryptography-on-fpga/paper.md` · [CED concept](../../concepts/ced-composite-goppa.md) | concept ready |
| CED for GF multipliers (McEliece-oriented) | `papers/tvlsi-pqc/Reliable Architectures for Finite Field Multipliers Using Cyclic Codes on FPGA Utilized in Classic and Post-Quantum Cryptography/paper.md` · [CED concept](../../concepts/ced-composite-goppa.md) | concept ready (component) |
| ARV-Q (supports BIKE / HQC / McEliece) | `papers/tcas-i-pqc/arv-q-an-adaptive-risc-v-vector-processor-for-unified-support-of-post-quantum-standards-and-side-channel-protection-on-the-edge/paper.md` | extract only (multi-scheme) |
| PQPU agile SoC (BIKE / HQC / McEliece) | `papers/jssc-pqc/pqpu-a-4-4-uj-op-69-4-kops-agile-post-quantum-crypto-processor-across-multiple-mathematical-problems/paper.md` | extract only (multi-family silicon) |
| RePQC agile SoC (includes Classic McEliece) | `papers/jssc-pqc/repqc-a-3-4-uj-op-48-kops-post-quantum-crypto-processor-for-multiple-mathematical-problems/paper.md` | extract only (multi-family silicon) |
| PQC HW tutorial (BIKE / McEliece / HQC) | `papers/tcas-ii-pqc/hardware-circuits-and-systems-design-for-post-quantum-cryptography-a-tutorial-brief/paper.md` | extract only (survey) |

## Course map (ASIC book — inspiration only)

| ASIC ch. (approx.) | Theme | This track |
|--------------------|--------|------------|
| 1–2 | Flow / HDL intuition | Tier 0 |
| 3–6 | Kyber params / NTT / poly | Tiers 1–2 (+ optional [CIM-NTT](../../concepts/cim-ntt.md)) |
| 8–10 | Dilithium / TRNG / masking / shuffling | Tier 3–3b |
| — | Family accelerators | Hash / MQ / isogeny / **HQC–code** leaf tables |

## Cross-track forks

- Theory core: [Lattice / LWE](../lattice-lwe/ROADMAP.md)  
- Family theory: [Hash-based](../hash-based-signatures/ROADMAP.md) · [Multivariate](../multivariate/ROADMAP.md) · [Isogeny](../isogeny/ROADMAP.md) · [Code-based](../code-based-kems/ROADMAP.md) (HQC HW → [#family-hw-leaves-code](#family-hw-leaves-code))
