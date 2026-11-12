# Track: Hash-based signatures

**Prereqs:** [Bits, XOR, randomness](../../fundamentals/bits-xor-randomness.md) · [Orientation — Problems](../../orientation/problems.md)  
**Next:** [Hash-based signatures](../../concepts/hash-based-signatures.md) · [Hash / XOF](../../concepts/hash-xof-keccak.md) · [PQC hardware § hash leaves](../pqc-hardware/ROADMAP.md#family-hw-leaves-hash) · [index](../../index.md)  
**Tracks:** hash-based-signatures

## Who / outcomes

After this track you can:

- Place hash-based signatures (SPHINCS+ / SLH-DSA-shaped) among PQC families.  
- Reuse the curriculum’s XOF/hash slogan and the WOTS+/Merkle/SPHINCS+ concept card before opening HW extracts.  
- Open curated TCAS / TVLSI / TCHES / JSSC / TCAD leaves whose *primary subject* is SPHINCS+ / SLH-DSA (or multi-family silicon that substantially implements it).  
- Fork to the shared hardware hash leaf table.

## How to use

1. Shared entry.  
2. Stage 1 orientation + shared hash concept.  
3. Paper leaves (circuit + fault extracts).  
4. Hardware fork → [PQC hardware — hash family leaves](../pqc-hardware/ROADMAP.md#family-hw-leaves-hash).

## Shared entry

1. [Motivation](../../orientation/motivation.md) · [Problems](../../orientation/problems.md) · [Challenges](../../orientation/challenges.md)  
2. [Bits, XOR, randomness](../../fundamentals/bits-xor-randomness.md)  
3. [Hard problems](../../fundamentals/hard-problems.md) · [Public-key picture](../../fundamentals/public-key-picture.md)  
4. [Security bits and attack work](../../bridge/security-bits-and-work.md)

## Stages

### Stage 1 — Family placement (Intro ch. 18–19)

1. Skim family slogans on [Problems](../../orientation/problems.md) / [Challenges](../../orientation/challenges.md).  
2. [Hash / XOF (Keccak–SHAKE)](../../concepts/hash-xof-keccak.md) — shared seed→bitstream tool (Dilithium-grounded extract; still the right XOF vocabulary).  
3. [Hash-based signatures (WOTS+, Merkle, SPHINCS+)](../../concepts/hash-based-signatures.md).  
4. [Fault attacks on hash-based signatures](../../concepts/fault-attacks-hash-sigs.md) before the TCHES fault leaves.

**Checkpoint:** Stateless hash-based signatures avoid lattices/codes — what do they lean on instead?

### Stage 2 — Curated extracts

Use the paper table. Prefer reading extract abstracts/sections named in each `paper.md` before HW deep dives. Do **not** treat lattice accelerators that merely use SHAKE as hash-family leaves. Before multi-family / detection rows: [crypto-agile SoC](../../concepts/crypto-agile-soc.md) · [ASA / HPC fuzzing](../../concepts/asa-hpc-fuzzing.md).

## Paper leaves

| Title (short) | Extract | Status |
|---------------|---------|--------|
| SPHINCS+ reconfigurable crypto processor | `papers/tcas-i-pqc/an-efficient-and-reconfigurable-post-quantum-crypto-processor-for-sphincs/paper.md` | extract only |
| Extended Merkle signature HW for SPHINCS | `papers/tcas-i-pqc/efficient-hardware-implementation-of-extended-merkle-signature-scheme-for-sphincs/paper.md` | extract only |
| Parallel SPHINCS+ on GPUs | `papers/tcas-i-pqc/parallel-implementation-of-sphincs-with-gpus/paper.md` | extract only |
| SLH-DSA on customized RISC-V (RVSLH) | `papers/tvlsi-pqc/RVSLH: Acceleration of Postquantum Standard SLH-DSA With Customized RISC-V Processor/paper.md` | extract only |
| SPHINCS+-256 FPGA accelerator | `papers/tches-pqc/fpga-based-accelerator-for-post-quantum-signature-scheme-sphincs-256/paper.md` | extract only |
| Protecting SPHINCS+ against fault attacks | `papers/tches-pqc/on-protecting-sphincs-against-fault-attacks/paper.md` | extract only |
| WOTS+ fault countermeasures | `papers/tches-pqc/fault-attack-countermeasures-for-sphincs-wots-with-checksum-segmentation-and-subtree-root-children-caching/paper.md` | extract only |
| PQPU agile SoC (includes SPHINCS+) | `papers/jssc-pqc/pqpu-a-4-4-uj-op-69-4-kops-agile-post-quantum-crypto-processor-across-multiple-mathematical-problems/paper.md` · [agile SoC](../../concepts/crypto-agile-soc.md) | concept ready (multi-family silicon) |
| HPC fuzzing ASA (includes SPHINCS+) | `papers/tcad-pqc/fuzzinghardware-performance-counters-based-detection-of-algorithm-subversion-attacks-on-postquantum-signature-schemes/paper.md` · [ASA concept](../../concepts/asa-hpc-fuzzing.md) | concept ready (multi-family detection) |

Same rows are mirrored on [PQC hardware § hash](../pqc-hardware/ROADMAP.md#family-hw-leaves-hash).

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 18 | MSS / XMSS / LMS | Stage 1 + EMSS leaf |
| 19 | SPHINCS+ | Stage 2 leaves |

## Cross-track forks

- [PQC hardware](../pqc-hardware/ROADMAP.md#family-hw-leaves-hash) — family HW leaves  
- [Lattice / LWE](../lattice-lwe/ROADMAP.md) — Dilithium vs hash-based signatures  
- [Multivariate](../multivariate/ROADMAP.md) · [Isogeny](../isogeny/ROADMAP.md) — parallel families
