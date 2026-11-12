# Shuffling / hiding against side channels

**Prereqs:** [Side-channel threat model](../bridge/side-channel-threat-model.md) · [Masking shares](masking-shares.md) · helpful: [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
**Next:** [Masking shares](masking-shares.md) (contrast) · [ASA / HPC fuzzing](asa-hpc-fuzzing.md) · [Crypto-agile SoC](crypto-agile-soc.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware · lattice-lwe

**Learning goals.** After this page you can:

- Contrast **shuffling/hiding** with **masking** in one table  
- Sketch Fisher–Yates-style **order randomization** on a tiny list  
- Open the curated Kyber HW shuffling extract with correct expectations  

## The one idea

[Masking](masking-shares.md) randomizes **values** by splitting secrets into shares.  
**Hiding / shuffling** randomizes **when** sensitive operations happen — the order of loop iterations, memory accesses, or butterfly steps — so a fixed-time power model lines up less cleanly with the secret [[1]](#ref-1).

| | Masking | Shuffling / hiding [[1]](#ref-1) |
|--|---------|----------------------------------|
| Randomizes | Share **values** | Operation **order / addresses** |
| Typical cost | Share arithmetic + conversions | RNG + permutation control + some latency |
| Kyber example | Masked Compress / compare gadgets | Shuffle decrypt leakage points (PWM, reduction, post-INTT sub, …) |

Many real designs combine both; this card isolates shuffling so the contrast sticks.

## Toy — shuffle a length-4 loop

Sensitive iterations $0,1,2,3$ (think four coefficient slots).  
A **Fisher–Yates** shuffle draws a random permutation $\pi$ and processes slot $\pi(i)$ instead of $i$.

Example permutation $\pi = (2,0,3,1)$ means the hardware touches indices in order $2\to 0\to 3\to 1$.  
An attacker who assumes “cycle $t$ always means index $t$” is now wrong [[1]](#ref-1).

### Hardware-friendly wrinkle

Naive shuffles can create **address conflicts** on dual-port memories or fixed pipelines.  
[[1]](#ref-1) describes a hardware-friendly Fisher–Yates variant with an **intermediate address permutation** so the first/last shuffled addresses do not collide in their Kyber FPGA datapath.

### Mid-page self-check

Does shuffling change the Module-LWE hardness assumption?

<details><summary>Answer</summary>

No. Like masking, it hardens the **implementation** against physical leakage; it does not replace the mathematical assumption.

</details>

## What the Kyber leaf protects

Built on an open-source Kyber FPGA, [[1]](#ref-1) adds compact on-chip RNG + address controllers around decrypt leakage points (pointwise multiply, modular reduction, post-INTT subtraction, INTT butterflies).  
Security eval uses CPA / TVLA on Artix-7; area overhead is modest relative to unprotected ATP in that paper’s tables — always re-read numbers from the extract and apply [area–time honesty](../bridge/area-time-power-honesty.md).

## Common confusions

- Shuffling ≠ masking (see table).  
- Shuffling ≠ constant-time alone (order still varies; timing channels need their own story).  
- Passing TVLA at $N$ traces ≠ “unbreakable forever.”  
- Fault attacks ([hash-based fault card](fault-attacks-hash-sigs.md)) are a different physical threat.

## Check yourself

1. What does shuffling randomize?  
<details><summary>Answer</summary>
The order (and related addresses) of sensitive operations.
</details>

2. Why might a HW shuffle need an “intermediate permutation”?  
<details><summary>Answer</summary>
To avoid memory / port address conflicts in a Fisher–Yates schedule [[1]](#ref-1).
</details>

3. Name the curated extract.  
<details><summary>Answer</summary>
`papers/tcas-ii-pqc/a-hardware-friendly-shuffling-countermeasure-against-side-channel-attacks-for-kyber/paper.md`
</details>

## Deep schedules (NTT / rejection) — same idea, thicker controllers

Once the toy shuffle is clear, curated leaves go deeper:

| Leaf theme | What gets permuted | Extract |
|------------|--------------------|---------|
| **NTT network / coefficient-index shuffle** | Nested NTT loops collapsed to a single-level address schedule; CIR + network randomization on an FPGA PE [[2]](#ref-2) | TCAD low-cost NTT shuffling |
| **SUCRE (ML-DSA)** | Shuffle-and-unmask for **rejection sampling** under masking — permute then unmask for $\infty$-norm checks without heavy A2B [[3]](#ref-3) | TCHES SUCRE |

These are still **order / schedule** tools (sometimes combined with masking), not CIM memory fusion ([CIM-NTT](cim-ntt.md)).

## Next steps

- Re-read [masking shares](masking-shares.md) contrast section · [Side-channel threat model](../bridge/side-channel-threat-model.md)  
- Different threats: [ASA / HPC fuzzing](asa-hpc-fuzzing.md) · [Fault attacks on hash sigs](fault-attacks-hash-sigs.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Crypto-agile SoC](crypto-agile-soc.md)  
- [PQC hardware ROADMAP](../tracks/pqc-hardware/ROADMAP.md) shuffle + deep-schedule leaves  
- Optional: [CIM-NTT](cim-ntt.md) for a different implementation axis  

## References

<a id="ref-1"></a>[1] D. Xu, K. Wang, and J. Tian, “A hardware-friendly shuffling countermeasure against side-channel attacks for Kyber,” *IEEE Trans. Circuits Syst. II*, vol. 72, no. 3, pp. 504–508, Mar. 2025, doi: [10.1109/TCSII.2025.3528751](https://doi.org/10.1109/TCSII.2025.3528751).

<a id="ref-2"></a>[2] Z. Chen, Y. Ma, and J. Jing, “Low-cost shuffling countermeasures against side-channel attacks for NTT-based post-quantum cryptography,” *IEEE Trans. Comput.-Aided Design Integr. Circuits Syst.*, vol. 42, no. 1, pp. 322–326, Jan. 2023, doi: [10.1109/TCAD.2022.3174142](https://doi.org/10.1109/TCAD.2022.3174142).

<a id="ref-3"></a>[3] S. Belaïd et al., “ML-DSA masking sweetened with SUCRE: Shuffle-and-unmask countermeasure for rejection sampling,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2026, no. 1, pp. 618–659, 2026, doi: [10.46586/tches.v2026.i1.618-659](https://doi.org/10.46586/tches.v2026.i1.618-659).
