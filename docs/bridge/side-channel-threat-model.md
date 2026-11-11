# Side-channel threat model (gentle)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [Public-key picture](../fundamentals/public-key-picture.md) · helpful: [Clocks, registers, and latency](clocks-registers-latency.md)  
**Next:** [Masking shares](../concepts/masking-shares.md) · [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md) · [Area–time–power honesty](area-time-power-honesty.md)  

**Learning goals.** Separate “the math looks hard” from “the chip might still leak,” name everyday side channels in plain words, and know why PQC HW papers add masking or shuffling.

## The one idea

[LWE](../concepts/lwe.md) / Module-LWE security talks about an adversary who sees **public keys and ciphertexts**.  
[[1]](#ref-1) stresses that during migration to ML-KEM/Kyber one must also assess **physical** attacks — especially side-channel attacks (SCAs) and fault injection attacks (FIAs).

**This page is a threat-model postcard**, not an attack tutorial.

## Two different “breaks”

[[1]](#ref-1) separates:

| Kind | What [[1]](#ref-1) says | Typical defenses named there |
|------|-------------------------|------------------------------|
| **SCA** | Recover keys from **power consumption or electromagnetic emanations** | Hiding or masking |
| **FIA** | Recover keys by **introducing faults** during operation | Error detection |

Curriculum slogan: correct math + leaky implementation can still lose the key.

### Everyday pictures (aligned with [[1]](#ref-1))

- **Power** — consumption correlates with computation.  
- **EM** — emanations off the device.  
- **Timing** — not the focus of [[1]](#ref-1)’s Kyber FPGA eval, but constant-time claims appear elsewhere (e.g. [[3]](#ref-3)).

### Mid-page self-check

MLWE is believed hard. Does that alone make a Kyber FPGA safe on the lab bench?

<details><summary>Answer</summary>

No. [[1]](#ref-1) treats SCA/FIA on implementations as a separate concern from choosing Kyber as a KEM.

</details>

## Why Kyber decrypt gets special attention

[[1]](#ref-1) notes that secret-key leakage points concentrate in Kyber’s **decryption** path, which includes NTT, point-wise multiplication (PWM), INTT, subtraction, and compress.  
Following the hardware leakage points they adopt (citing Zhao *et al.* inside [[1]](#ref-1)), three spots are:

1. **PWM**  
2. **Modular reduction after PWM**  
3. **Subtraction after INTT**  

They also shuffle INTT butterflies because INTT has been attacked in software settings [[1]](#ref-1).

Pedagogy moral: ask *which operations touch the secret*, not “is the whole chip equally risky?”

## What “evaluation” means in [[1]](#ref-1)

[[1]](#ref-1) evaluates with:

- **CPA** (correlation power analysis) on PWM (Hamming-distance style energy model on multiplier-output registers),  
- **TVLA** (Welch $t$-test) on the decryption procedure,  
- using **EM traces** on an Artix-7 board for Kyber768.

Read those results as evidence **in that experiment**, not a universal warranty.

Separately, masked-software work argues about share security in the **$t$-probing** model and $t$-(S)NI gadget composition [[2]](#ref-2).

## Two defender slogans

| Slogan | As discussed in the cited papers | Next |
|--------|----------------------------------|------|
| **Masking** | Split sensitive values into shares; [[1]](#ref-1) names masking as an SCA countermeasure; [[2]](#ref-2) builds full masked Kyber gadgets | [Masking shares](../concepts/masking-shares.md) |
| **Hiding / shuffling** | Randomize order of leaky sub-operations; [[1]](#ref-1) is a HW shuffling design | HW track leaves |

[[3]](#ref-3) states their RBLWE poly-mul/accelerator is **constant-time** (timing), but that **DPA and fault** countermeasures are **not** installed and are left as future work.

## Bridge to honest HW reading

[[1]](#ref-1) reports their protected design increases ATP by about **8.7%** vs the unprotected baseline while improving SCA resistance in their CPA/TVLA tests.  
[Area–time–power honesty](area-time-power-honesty.md): do not read ATP alone without the SCA story.

## Check yourself

1. Name the two physical attack families [[1]](#ref-1) highlights beside math migration.  
<details><summary>Answer</summary>
SCA and FIA.
</details>

2. Name the three decrypt leakage points listed in [[1]](#ref-1).  
<details><summary>Answer</summary>
PWM; modular reduction after PWM; subtraction after INTT.
</details>

3. What does [[3]](#ref-3) claim about DPA?  
<details><summary>Answer</summary>
Constant timing helps regular timing attacks; DPA/fault need countermeasures they did not include yet.
</details>

## Next steps

- [Masking shares](../concepts/masking-shares.md) — the share picture  
- [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md) — where leaky units sit  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  

## References

<a id="ref-1"></a>[1] D. Xu, K. Wang, and J. Tian, “A hardware-friendly shuffling countermeasure against side-channel attacks for Kyber,” *IEEE Trans. Circuits Syst. II*, vol. 72, no. 3, pp. 504–508, Mar. 2025, doi: [10.1109/TCSII.2025.3528751](https://doi.org/10.1109/TCSII.2025.3528751).

<a id="ref-2"></a>[2] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214).

<a id="ref-3"></a>[3] P. He, T. Bao, and J. Xie, “High-performance instruction-set hardware accelerator for ring-binary-LWE-based lightweight PQC,” *IEEE Trans. Very Large Scale Integr. (VLSI) Syst.*, vol. 33, no. 5, pp. 1417–1421, May 2025, doi: [10.1109/TVLSI.2025.3538874](https://doi.org/10.1109/TVLSI.2025.3538874).
