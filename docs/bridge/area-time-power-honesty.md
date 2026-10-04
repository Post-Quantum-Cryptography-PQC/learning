# Area, time, power — reading HW tables honestly

**Prereqs:** [Clocks, registers, and latency](clocks-registers-latency.md)  
**Next:** [Modular multiplier](../concepts/modular-multiplier.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Read area, delay, power, and ADP columns without over-claiming; know why open-PDK / academic STA tables are not drop-in copies of proprietary foundry numbers in a paper.

## Why this page exists

Circuit papers (TCAS-II and friends) live by comparison tables: area in µm², delay in ns, power in µW, sometimes **ADP** (area × delay). Lab reproductions often use **open PDKs** and open tools. Mixing those numbers with a paper’s Synopsys / TSMC-style flow without caveats teaches false “wins.”

This bridge is the honesty layer for the [PQC hardware](../tracks/pqc-hardware/ROADMAP.md) track and for fairness notes in `projects/papers/`.

## What the columns usually mean

| Column | Typical unit | Plain meaning |
|--------|--------------|---------------|
| **Area** | µm² or gate count | How much silicon / logic the block uses |
| **Delay / critical path** | ns | How long one combo path needs (limits clock period) |
| **Power** | µW / mW | Energy per time under a stated activity / clock |
| **ADP** | area × delay | One scalar trade-off slogan (smaller often “better” in the table’s story) |
| **ATP** | area × time (or area × latency) | Same idea with “time” spelled as latency / ns × cycles — read the paper’s exact product |
| **SEC** | scaled efficiency slogan | Paper-defined score (e.g. ops per area-time); **not** a crypto security bit |
| **Cycles** | integer | Latency or pipeline depth — different ruler from ns |

**ADP / ATP slogan:** if design A is a bit larger but much shorter delay (or fewer cycles at the same clock), the product can still improve. Always check whether the paper **normalized** baselines (same cell library, same arithmetic blocks remapped, same bitwidth).

**SEC caution:** some accelerator tables invent a **scaled efficiency** column (often abbreviated SEC). Treat it as an author-defined ranking aid — verify the formula in the method section before comparing rows across papers.

### Tiny toy table (fictional)

| Design | Area | Delay | ADP |
|--------|------|-------|-----|
| Slow-small | 100 | 10 | 1000 |
| Fast-large | 150 | 6 | 900 |

Fast-large wins on ADP here even though area grew. Real papers need the same technology story under both rows.

## Technology and flow — why apples ≠ oranges

A published brief might say “SAED 32 nm, Synopsys.”  
A lab fairness run might say “open PDK + Yosys + OpenSTA.”

Both can be **internally consistent**. They are **not** interchangeable for claiming “we beat Table I by X%” unless the experiment was designed as a **relative** comparison under one fixed flow.

Hold these habits:

1. **Same bitwidth / same modulus class** when comparing modular multipliers.  
2. **Same mapping policy** for baselines (authors sometimes remapped priors — independent reproduction is healthy).  
3. **Open flow ≠ foundry flow** — treat absolute ns / µm² as flow-local, not universal truth.  
4. **Power** is especially sensitive to activity factors and tool settings — read with extra caution.

### Link to the lab

When this lab re-implements a TCAS-II modular multiplier, fairness docs under `projects/papers/.../fairness/` exist to make **relative** claims careful. Pedagogy here only needs the slogan: **compare under one ruler**.

## What “reconfigurable” and “same-cycle” mean in tables

- **Reconfigurable modulus:** one architecture compiled or wired for several sparse primes (PQC-scale vs HE-scale bitwidths). Check which configuration each table row uses.  
- **Same-cycle mul+reduce:** multiply and modular reduction finish within one clock tick (no pipeline between them). That choice can be motivated by timing-attack considerations in some papers — it also forces a longer critical path than a split pipeline.

Neither slogan replaces reading the method section.

## Common confusions

| Confusion | Clearer reading |
|-----------|-----------------|
| Smaller ADP always means better crypto | ADP is a circuit trade-off, not a security bit claim |
| Higher “SEC” means more secure | Usually a **scaled efficiency** score, not cryptographic security |
| Gate count = µm² | Related but tool- and library-dependent |
| Paper 32 nm number = your open-PDK number | Different rulers |
| Power column settles the debate | Often the noisiest metric |
| Cycles-only win = ns win | Need clock period; throughput = $f_{\mathrm{clk}}/$cycles |

## Check yourself

1. What does ADP stand for, and why might a larger design still “win”?  
<details><summary>Answer</summary>
Area–delay product. If delay drops enough, product can fall even when area rises.
</details>

2. Why is remapping priors to the same arithmetic blocks important?  
<details><summary>Answer</summary>
So the table compares architecture ideas under one technology story, not mismatched library accidents.
</details>

3. Is a lower open-PDK delay a proof you beat a TSMC table row?  
<details><summary>Answer</summary>
No — different flows. Use relative comparisons inside one flow, or treat absolute numbers as flow-local.
</details>

4. What should you do when a table shows “SEC”?  
<details><summary>Answer</summary>
Read the paper’s definition — it is usually a scaled area–time efficiency, not a security level in bits.
</details>

## Next steps

- [Modular multiplier](../concepts/modular-multiplier.md) — first arithmetic module that fills those tables  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Theory side: [Module-LWE](../concepts/module-lwe.md) — why coefficient mul exists at all  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
