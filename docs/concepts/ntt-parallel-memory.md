# NTT parallel memory

**Prereqs:** [NTT butterfly](ntt-butterfly.md) · [Polynomial multiply engines](poly-mul-engines.md) · [Clocks, registers, latency](../bridge/clocks-registers-latency.md)  
**Next:** [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Explain why NTT stages need many simultaneous coefficient reads/writes, say what “conflict-free” banking means at slogan level, and connect dual-port / multi-bank SRAM to dual-butterfly throughput — without designing a full address generator.

## Why this card exists

An [NTT butterfly](ntt-butterfly.md) wants **two** inputs and produces **two** outputs. A dual-butterfly core wants **four** reads and **four** writes in related patterns each cycle. If all $n$ coefficients live in one single-port SRAM, the ALU starves on ports.

IEEE Kyber poly-mul papers therefore spend as many words on **memory geometry** as on the Barrett leaf. This card is that vocabulary.

## The port problem (tiny picture)

Suppose $n=8$ coefficients in one bank, one read port:

- One butterfly needs $a,b$ → already two reads.  
- Dual-butterfly → four reads.  
- Same cycle may need writes of previous results.

**Moral:** parallelism without banking is fake parallelism.

## Banking and conflict-freedom (slogans)

| Idea | Slogan |
|------|--------|
| **Multi-bank SRAM** | Split the $n$ coefficients across $B$ banks so several addresses can be live at once |
| **Conflict-free schedule** | Stage $s$’s butterfly pairs never hit the same bank twice in one cycle |
| **Ping-pong / double buffer** | Read from bank set A while writing bank set B (or NTT vs CWM phases) |
| **In-place layout** | Overwrite coefficients carefully so address patterns stay legal across stages |
| **Twiddle ROM ports** | Separate (usually smaller) memory for $\omega$; grouping butterflies that share twiddles reduces ROM pressure |

Exact address maps (bit-reversed, constant-geometry, custom Kyber maps) are paper-specific. Hold the question: **does this stage’s pair set collide on a bank?**

### Mid-page self-check

Why might adding a second butterfly **not** halve NTT latency?

<details><summary>Answer</summary>

If memory ports or bank conflicts cannot feed both butterflies every cycle, the schedule stalls — ALU count ≠ delivered throughput.

</details>

## Dual-butterfly + Bi-Core feel

A common accelerator pattern:

1. Two CT (or GS) butterflies share one [modular multiplier](modular-multiplier.md) fabric or use two BMMs.  
2. Coefficient banks are striped so those four operands are conflict-free.  
3. Twiddles are grouped so one ROM fetch serves both (or adjacent) butterflies.  
4. Control FSM walks stages for NTT, switches mode for [CWM](poly-mul-engines.md), then GS-style INTT.

That composition is still a **poly-mul engine**, not a full [KEM accelerator](kem-accelerator-anatomy.md).

## Link to honesty metrics

More banks → more area. Fewer cycles → better latency. [Area–time honesty](../bridge/area-time-power-honesty.md) asks whether a table’s win came from arithmetic, from banking, or from a friendlier clock — and whether “SEC” is a defined efficiency score.

## Story recap

1. Butterflies are port-hungry.  
2. Multi-bank + conflict-free maps unlock parallel butterflies.  
3. Twiddle ports and ping-pong are part of the engine.  
4. Memory architecture can be the paper’s real novelty.

## Check yourself

1. What is a bank conflict in an NTT stage?  
<details><summary>Answer</summary>
Two needed coefficients map to the same bank/port in one cycle, so one access must wait.
</details>

2. Name two memory ideas besides “bigger single SRAM.”  
<details><summary>Answer</summary>
Any two of: multi-bank striping, ping-pong buffers, in-place conflict-free maps, dedicated twiddle ROM.
</details>

3. Does conflict-free banking change the math of the NTT?  
<details><summary>Answer</summary>
No — same butterflies and twiddles; only the schedule and wiring change.
</details>

## Next steps

- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
