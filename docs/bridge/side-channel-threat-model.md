# Side-channel threat model (gentle)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [Public-key picture](../fundamentals/public-key-picture.md) · helpful: [Clocks, registers, and latency](clocks-registers-latency.md)  
**Next:** [Masking shares](../concepts/masking-shares.md) · [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md) · [Area–time–power honesty](area-time-power-honesty.md)  

**Learning goals.** Separate “the math looks hard” from “the chip might still leak,” name everyday side channels in plain words, and know why PQC HW papers add masking or shuffling.

## The one idea

[LWE](../concepts/lwe.md) / Module-LWE security talks about an adversary who sees **public keys and ciphertexts**.  
A lab adversary with an oscilloscope might also see **how the silicon behaves while computing** — power wiggles, EM whispers, timing hiccups.

That extra information is a **side channel**.  
Correct math + leaky implementation can still lose the key.

**This page is a threat-model postcard**, not an attack tutorial.

## Two different “breaks”

| Kind | Adversary sees… | Defended by… |
|------|-----------------|--------------|
| **Cryptanalysis** | Public math objects | Hard problems, parameters, proofs |
| **Side-channel (SCA)** | Physical measurements of a run | Constant-time care, masking, hiding/shuffling, … |

A cousin threat is **fault injection** (poke the chip mid-computation). Many SCA papers leave faults to separate work — keep the buckets distinct.

### Everyday pictures

- **Timing** — a secret-dependent branch takes longer.  
- **Power** — current draw correlates with bit flips in a register.  
- **EM** — related wiggles radiate off the package.

You do not need lab setup details here — only the moral: **implementation is part of the security story**.

### Mid-page self-check

MLWE is believed hard. Does that alone make a Kyber FPGA safe on the lab bench?

<details><summary>Answer</summary>

No. Hardness of the math problem does not stop leakage from power/EM/timing of a concrete implementation.

</details>

## Why Kyber decrypt gets special attention

Decrypt uses the **long-term secret**. Rough sketch:

> take ciphertext pieces → NTT / multiply by secret → INTT → subtract → compress to message bits.

HW papers often highlight sensitive spots along that path (for example point-wise multiply, reductions, post-INTT subtract). Pedagogy moral:

> Ask *which operations touch the secret*, not “is the whole chip equally risky?”

## What “evaluation” means in those papers

You will see names like **CPA** (correlation-style power analysis) or **TVLA** (statistical leakage tests).  
Read them as: “Did our countermeasure make traces look less secret-dependent *in this experiment*?”  
Trace counts are paper-specific — not a warranty for every board.

## Two defender slogans (next cards)

| Slogan | Idea | Next |
|--------|------|------|
| **Masking** | Split secret values into random shares | [Masking shares](../concepts/masking-shares.md) |
| **Hiding / shuffling** | Randomize *when* or *in what order* ops run | Mentioned on HW track leaves |

Also: avoid secret-dependent branches and memory indices (**constant-time** discipline). Constant-time helps timing; it does **not** by itself stop all power/EM leakage.

## Bridge to honest HW reading

[Area–time–power tables](area-time-power-honesty.md) compare speed and area.  
An unprotected design can look “better” on ATP while failing SCA checks. Read both stories.

## Check yourself

1. Name two side channels.  
<details><summary>Answer</summary>
Any two of timing, power, EM.
</details>

2. Masking vs shuffling — one phrase each.  
<details><summary>Answer</summary>
Masking randomizes values via shares; shuffling/hiding randomizes order/timing of operations.
</details>

3. True or false: “TVLA clean on our FPGA” equals a proof of IND-CCA.  
<details><summary>Answer</summary>
False — experimental leakage evidence ≠ public-key security proof.
</details>

## Next steps

- [Masking shares](../concepts/masking-shares.md) — the share picture  
- [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md) — where leaky units sit  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  

## Where this is grounded (optional)

1. D. Xu, K. Wang, and J. Tian, “A hardware-friendly shuffling countermeasure against side-channel attacks for Kyber,” *IEEE Trans. Circuits Syst. II*, vol. 72, no. 3, pp. 504–508, Mar. 2025, doi: [10.1109/TCSII.2025.3528751](https://doi.org/10.1109/TCSII.2025.3528751). (§I SCA vs FIA; §II.B decrypt leakage points; §IV.A CPA/TVLA)
2. J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214). (§2 $t$-probing / share notions)
3. P. He, T. Bao, and J. Xie, “High-performance instruction-set hardware accelerator for ring-binary-LWE-based lightweight PQC,” *IEEE Trans. Very Large Scale Integr. (VLSI) Syst.*, vol. 33, no. 5, pp. 1417–1421, May 2025, doi: [10.1109/TVLSI.2025.3538874](https://doi.org/10.1109/TVLSI.2025.3538874). (§IV.C timing vs open DPA/fault gap)
