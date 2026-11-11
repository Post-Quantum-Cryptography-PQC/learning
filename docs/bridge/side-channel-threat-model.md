# Side-channel threat model (gentle)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [Public-key picture](../fundamentals/public-key-picture.md) · [Clocks, registers, and latency](clocks-registers-latency.md)  
**Next:** [Masking shares](../concepts/masking-shares.md) · [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md) · [Area–time–power honesty](area-time-power-honesty.md)  

**Learning goals.** Retell, from HW extracts, how SCA differs from math breaks; name Kyber decrypt leakage points and the CPA/TVLA evaluation slogans those papers use — without teaching attack recipes.

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| SCA via power/EM; hiding vs masking; FIA as cousin | TCAS-II shuffling Kyber — §I Introduction (`papers/tcas-ii-pqc/a-hardware-friendly-shuffling-countermeasure-against-side-channel-attacks-for-kyber/paper.md`) |
| Decrypt leakage points: PWM, post-PWM reduction, post-INTT subtraction; also INTT butterflies | same file — §II.B Kyber and Side-Channel Leakage Points |
| CPA on PWM + TVLA on decrypt; Artix-7 EM traces | same file — §IV.A Evaluation on SCA Resistance |
| $t$-probing model; arithmetic vs Boolean shares | TCHES masked Kyber — §2 Side-Channel Notation (`.../masking-kyber-.../paper.md`) |
| Timing constant-time vs open DPA/fault gap | TVLSI RBLWE — §IV.C Discussion (`.../High-Performance Instruction-Set.../paper.md`) |

## Why this page exists

TCAS-II §I states the migration worry plainly: efficient Kyber/ML-KEM HW is mature, but **physical** attacks still matter. This bridge is that sentence expanded for newcomers.

## Two threat families (from the extracts)

TCAS-II §I:

- **SCA:** recover keys from **power or EM** while the device runs; defenders use **hiding** or **masking**.  
- **FIA:** disturb the device (faults); needs detection — the shuffling brief leaves FIA largely to future work.

Masked Kyber §2 adds the **$t$-probing** math model used to argue about shared circuits (up to $t$ intermediate probes). Treat that as the formal cousin of “lab traces,” not something you must prove here.

TVLSI §IV.C: their RBLWE core is **constant-time** (timing), but they **do not** claim DPA/fault resistance without countermeasures — a clean honesty line for readers of ATP-only tables.

### Mid-page self-check

If MLWE is hard, is a Kyber FPGA automatically SCA-safe?

<details><summary>Answer</summary>

No. TCAS-II §I separates quantum/math migration from physical SCA/FIA on implementations.

</details>

## Concrete Kyber decrypt leakage map (TCAS-II §II.B)

Decrypt sketch in the extract:

$$
m \leftarrow \mathrm{Compress}_q\big(v - \mathrm{INTT}(\hat{s}^T \circ \mathrm{NTT}(u)), 1\big).
$$

Cited HW leakage points (after Zhao et al. in that paper):

1. **PWM** (point-wise mul)  
2. **Modular reduction after PWM**  
3. **Subtraction after INTT**  

Plus: INTT butterflies shuffled because software attacks on INTT exist. Pedagogy moral: SCA papers name **which ops** touch the secret — not “the whole chip equally.”

## How those papers “evaluate” (slogans only)

§IV.A: **CPA** (correlation power analysis) on PWM register Hamming-distance models; **TVLA** ($t$-test) on the decrypt flow; EM traces on Artix-7. Numbers in that brief (e.g. unprotected failing early vs protected at $10^5$–$10^7$ traces) are **that paper’s experiment**, not a universal certificate.

## Bridge to countermeasures

| Tool | Where the extract lives | Slogan |
|------|-------------------------|--------|
| **Shuffling / hiding** | TCAS-II whole brief | Randomize **order** of leaky sub-ops |
| **Masking** | TCHES masked Kyber | Randomize **values** via shares — [masking shares](../concepts/masking-shares.md) |

## Check yourself

1. Name the three decrypt leakage points from TCAS-II §II.B.  
<details><summary>Answer</summary>
PWM; modular reduction after PWM; subtraction after INTT.
</details>

2. Hiding vs masking — one sentence each.  
<details><summary>Answer</summary>
Hiding/shuffling randomizes operation order/timing; masking splits sensitive values into shares.
</details>

3. What does TVLSI §IV.C admit about DPA?  
<details><summary>Answer</summary>
Constant-time helps timing; advanced DPA/fault need extra countermeasures they did not install.
</details>

## Next steps

- [Masking shares](../concepts/masking-shares.md)  
- [KEM accelerator anatomy](../concepts/kem-accelerator-anatomy.md)  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)
