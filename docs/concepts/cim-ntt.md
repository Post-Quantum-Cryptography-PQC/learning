# Compute-in-memory (CIM) NTT

**Prereqs:** [NTT butterfly](ntt-butterfly.md) · [NTT parallel memory](ntt-parallel-memory.md) · [Clocks, registers, latency](../bridge/clocks-registers-latency.md) · [Area–time–power honesty](../bridge/area-time-power-honesty.md)  
**Next:** [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware · lattice-lwe

**Learning goals.** After this page you can:

- Contrast **von Neumann** NTT (ALU + separate SRAM) with **compute-in-memory** slogans  
- Say why moving butterflies toward memory can cut data movement energy  
- Open the curated 28 nm CIM pipeline NTT leaf without treating every “CIM” claim as comparable  

## The one idea

Standard FPGA/ASIC NTT engines keep coefficients in SRAM banks and run butterflies in a separate PE ([NTT parallel memory](ntt-parallel-memory.md)).  
**Compute-in-memory (CIM)** designs push arithmetic **closer to** (or into) the memory macros so coefficients travel fewer millimeters — trading memory organization and PE/array layout for energy and cycle claims [[1]](#ref-1).

This is still an **NTT for lattice PQC** (Kyber-class $n$), not a new hardness assumption.

| Style | Where butterflies live | Data-movement slogan |
|-------|------------------------|----------------------|
| Classical PE + SRAM | Outside the array | Fetch ↔ compute ↔ write back |
| CIM / near-memory | Inside or beside memory macros | Compute where bits sit |

## Pipeline CIM postcard [[1]](#ref-1)

[[1]](#ref-1) reports a **28 nm CMOS** CIM **pipeline** NTT accelerator aimed at lattice PQC:

- Bidirectional multi-level CT/GS processing-element array with **SRAM-CIM** macros  
- Small-cycle 256-point NTT energy in the **nJ** class; full Kyber-512 KeyGen+Encaps+Decaps throughput/energy reported in the abstract/results  
- Claims large NTT cycle cuts vs prior NTT accelerators — always re-read tables with [area–time honesty](../bridge/area-time-power-honesty.md) (process node, what is included, ASIC vs FPGA)

Teaching moral: CIM papers sell **memory–compute fusion**; your checklist is still ports, stages, and what Op is in the denominator.

### Mid-page self-check

Does CIM-NTT replace Module-LWE?

<details><summary>Answer</summary>

No. It is an implementation organization for the same transform used inside lattice KEMs/signatures.

</details>

## How it sits next to other NTT cards

1. [Poly-mul engines](poly-mul-engines.md) — why NTT exists  
2. [NTT butterfly](ntt-butterfly.md) — CT/GS local update  
3. [NTT parallel memory](ntt-parallel-memory.md) — banking without CIM  
4. **This card** — when banking moves into CIM macros / pipeline arrays [[1]](#ref-1)

## Common confusions

- CIM ≠ “analog ML accelerator only” — here it is digital/SRAM-CIM style PQC NTT [[1]](#ref-1).  
- Lower nJ/Op on 28 nm ≠ automatically better than an Artix-7 ATP number.  
- Pipeline depth and PE count change latency vs throughput trade-offs the same as classical designs.

## Check yourself

1. What problem does CIM try to shrink versus a classical PE+SRAM NTT?  
<details><summary>Answer</summary>
Data movement energy / cycles between memory and arithmetic.
</details>

2. Name the curated extract.  
<details><summary>Answer</summary>
`papers/tcas-ii-pqc/a-28-nm-75-6-kops-13-nj-computing-in-memory-pipeline-number-theoretic-transform-accelerator-for-pqc/paper.md`
</details>

3. Which honesty bridge do you open before comparing CIM ASIC to FPGA leaves?  
<details><summary>Answer</summary>
[Area, time, power honesty](../bridge/area-time-power-honesty.md).
</details>

## Next steps

- Lattice-core leaf table on [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Contrast with deep NTT shuffling leaves (order hiding, not CIM) via [shuffling / hiding](shuffling-hiding.md)

## References

<a id="ref-1"></a>[1] J. Zhu et al., “A 28 nm 75.6 KOPS 13 nJ computing-in-memory pipeline number theoretic transform accelerator for PQC,” *IEEE Trans. Circuits Syst. II*, vol. 72, no. 1, pp. 273–277, Jan. 2025, doi: [10.1109/TCSII.2024.3481996](https://doi.org/10.1109/TCSII.2024.3481996).
