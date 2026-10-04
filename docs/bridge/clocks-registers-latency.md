# Clocks, registers, and latency

**Prereqs:** [Bits, XOR, and randomness](../fundamentals/bits-xor-randomness.md) · [Modular arithmetic](../fundamentals/modular-arithmetic.md)  
**Next:** [Area, time, power honesty](area-time-power-honesty.md) · [Modular multiplier](../concepts/modular-multiplier.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Separate wires from clocks, combinatorial logic from registers, **cycles** from **nanoseconds**, and say why a PQC accelerator cares about both.

## Why this page exists

Crypto pages talk about modular multiply and NTT. Hardware papers suddenly say “critical path,” “pipeline,” and “one cycle latency.” This bridge is the shared digital postcard so those words do not feel like a foreign dialect — **without** teaching Verilog here.

## Bits as wires (combinational logic)

A **wire** carries a $0$ or $1$ (voltage low/high).  
**Combinational** logic is a pure function of current inputs: AND, XOR, adders, multiplexers. Change an input and — after a tiny delay — the output settles. No memory.

Tiny picture: two bits $a,b$ into an XOR gate → one wire $a\oplus b$. That is combinational.

## Clocks and registers (sequential logic)

A **register** (flip-flop bank) **stores** bits until the next **clock edge**.  
On each rising (or falling) edge, it samples its input and holds that value.

| Idea | Slogan |
|------|--------|
| Combinational | “Compute now from current wires” |
| Sequential | “Remember until the next tick” |
| Clock | Shared heartbeat for registers |

A **pipeline** is a chain: combo → register → combo → register → …  
Each stage does part of the work; throughput can rise even if total latency (in cycles) grows.

### Latency in cycles vs delay in nanoseconds

Two different rulers:

| Metric | Unit | Asks |
|--------|------|------|
| **Latency (cycles)** | clock ticks | How many ticks until the answer is ready? |
| **Critical path / delay** | nanoseconds (ns) | How long must one tick be so the logic settles? |
| **Throughput** | results per second | How often can a new result start? |

Example slogan: a modular multiplier that finishes in **1 cycle** with a **long** critical path may run at a **slow** clock. A **3-cycle** pipelined design with a **short** path may finish more multiplies per second.

Papers often optimize **area–delay product (ADP)** or similar — see the next bridge for honest reading of tables.

### Mid-page self-check

If a design takes 2 cycles at $5\,\mathrm{ns}$ per cycle, how long (wall time) until the result?

<details><summary>Answer</summary>

About $10\,\mathrm{ns}$ of wall time ($2\times 5$). Cycles and ns multiply when you convert.

</details>

## Why PQC hardware cares

Lattice KEMs (ML-KEM-shaped) spend huge effort on **coefficient modular multiply** and **NTT butterflies**. Code-based designs spend it on other blocks (sparse matrix–vector, CLMUL, …). Same digital vocabulary:

- How many cycles per multiply / butterfly?  
- How long is the critical path (limits clock)?  
- Are mul and reduce in the **same** cycle (security / timing story in some papers) or staged?

You do not need to design RTL yet — you need to **hear** the sentences.

## Common confusions

| Confusion | Clearer reading |
|-----------|-----------------|
| “Faster” always means fewer cycles | Throughput and critical path both matter |
| One big combo block is always best | May lengthen the critical path and force a slow clock |
| Pipeline always leaks less / more | Timing side channels are a separate cautionary topic (deferred on this track) |
| Software “latency” = HW cycles | Software is instruction-time; HW papers mix cycles and ns |

## Check yourself

1. Combinational vs sequential — one sentence each?  
<details><summary>Answer</summary>
Combo: outputs from current inputs only. Sequential: remembers via registers between clocks.
</details>

2. Can a 1-cycle design be slower in wall time than a 3-cycle design?  
<details><summary>Answer</summary>
Yes — if its critical path forces a much slower clock.
</details>

3. What does a register do on a clock edge?  
<details><summary>Answer</summary>
Samples its input and holds that value until the next relevant edge.
</details>

## Next steps

- [Area, time, power honesty](area-time-power-honesty.md) — how papers report area / delay / power  
- [Modular multiplier](../concepts/modular-multiplier.md) — first arithmetic module  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
