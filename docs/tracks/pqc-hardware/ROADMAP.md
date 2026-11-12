# Track: PQC hardware (modules → accelerator)

**Prereqs:** [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Bits, XOR](../../fundamentals/bits-xor-randomness.md) · helpful: [Module-LWE](../../concepts/module-lwe.md) before Tier 2–3  
**Next:** [Clocks, registers, latency](../../bridge/clocks-registers-latency.md) · [Lattice / LWE](../lattice-lwe/ROADMAP.md) · [index](../../index.md)  
**Tracks:** pqc-hardware

## Who / outcomes

After this track you can:

- Read latency / area–time tables without treating every paper as comparable.  
- Name modmul → poly/NTT → sampler/hash/compress → KEM accelerator blocks.  
- Place SCA threat model and masking shares before TCHES-style leaves.  
- Open **family HW leaves** (hash / multivariate / isogeny / **code–HQC**) as optional extracts off the lattice core.  
- Place CIM-NTT and deep shuffle schedules as frontier lattice-core leaves after banking / hiding vocabulary.

## How to use

1. Shared crypto entry, then **Tier 0–3b** (lattice core).  
2. Paper leaves: core table first; then family sections (including code–HQC).  
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
| SLH-DSA RISC-V (RVSLH) | `papers/tvlsi-pqc/RVSLH: Acceleration of Postquantum Standard SLH-DSA With Customized RISC-V Processor/paper.md` | extract only |
| SPHINCS+ fault protection | `papers/tches-pqc/on-protecting-sphincs-against-fault-attacks/paper.md` | extract only |

## Family HW leaves — multivariate

<a id="family-hw-leaves-mq"></a>

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Threshold MAYO | `papers/tches-pqc/optimizing-and-implementing-threshold-mayo/paper.md` | extract only |
| MAYO GPU matrix reordering | `papers/tches-pqc/high-throughput-gpu-design-and-implementation-of-mayo-with-matrix-computation-reordering/paper.md` | extract only |
| QR-UOV AVX2 | `papers/tches-pqc/avx2-implementation-of-qr-uov-for-modern-x86-processors/paper.md` | extract only |
| Rainbow / UOV AVX2 | `papers/tches-pqc/efficient-implementations-of-rainbow-and-uov-using-avx2/paper.md` | extract only |

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

Walk [Carryless $\mathbb{F}_2$ polymul](../../concepts/carryless-polymul-f2.md) first. These leaves are the **code-based HW fork** off the lattice core (not a replacement for ML-KEM study).

| Title (short) | Extract | Status |
|---------------|---------|--------|
| HQC Ibex tightly coupled accelerators | `papers/tcas-ii-pqc/a-hardware-software-co-optimization-of-hqc-using-tightly-coupled-accelerators-on-a-32-bit-ibex-core/paper.md` | concept ready |
| LEAP sparse HQC polymul | `papers/tvlsi-pqc/LEAP: Lightweight and Efficient Accelerator for Sparse Polynomial Multiplication of HQC/paper.md` | extract only |
| Area-efficient HQC accelerator (unified modules) | `papers/tvlsi-pqc/An Area-Efficient HQC Accelerator With Unified Parallel Modules and Fine-Grained Scheduling/paper.md` | extract only |
| PHOENIX (ML-KEM + HQC agile sharing) | `papers/tches-pqc/phoenix-crypto-agile-hardware-sharing-for-ml-kem-and-hqc/paper.md` | extract only |

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
