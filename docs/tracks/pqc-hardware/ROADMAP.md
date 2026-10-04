# Track: PQC hardware (modules → accelerator)

**Prereqs:** [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Bits, XOR](../../fundamentals/bits-xor-randomness.md) · helpful: [Module-LWE](../../concepts/module-lwe.md) before Tier 2–3  
**Next:** [Clocks, registers, latency](../../bridge/clocks-registers-latency.md) · [Lattice / LWE track](../lattice-lwe/ROADMAP.md) · [index](../../index.md)

Curated path from **digital intuition** to **reusable arithmetic / polynomial modules** to **KEM accelerator anatomy**. Theory lives on the [Lattice / LWE](../lattice-lwe/ROADMAP.md) track; this track teaches how those ideas show up as hardware blocks.

**Lab split:** pedagogy is here under `learn/`. Faithful RTL, STA, and fairness audits stay under `projects/papers/` via `research-circuit-implementation` — not dumped into every concept card.

**IEEE flywheel:** new TCAS-II / circuit digests (`papers/.../analysis.md`) should expand **module** vocabulary here first; paper explainers hang as optional leaves after the matching concept exists.

## How to use

1. Finish shared crypto fundamentals at least through modular arithmetic and bits.  
2. Walk **Tier 0** bridges (chips without Verilog).  
3. Learn **Tier 1** modular multiply — the first concrete LBC coefficient unit.  
4. Continue **Tier 2–3** (poly engines → NTT → accelerator anatomy) before optional paper leaves.  
5. When a new IEEE HW paper lands, scan for untaught architectures → recommend new/deepened concepts → then (optionally) explainer + RTL.

## Core path

### Tier 0 — Digital intuition

1. [Clocks, registers, and latency](../../bridge/clocks-registers-latency.md)  
2. [Area, time, power — reading HW tables honestly](../../bridge/area-time-power-honesty.md)  

### Tier 1 — Arithmetic modules

3. [Modular multiplier](../../concepts/modular-multiplier.md)  

### Tier 2 — Polynomial engines

4. [Polynomial multiply engines](../../concepts/poly-mul-engines.md)  
5. [NTT butterfly (gentle)](../../concepts/ntt-butterfly.md)  
5b. [NTT parallel memory](../../concepts/ntt-parallel-memory.md) — optional but recommended before Kyber FPGA leaves  

### Tier 3 — Scheme datapath

6. [KEM accelerator anatomy](../../concepts/kem-accelerator-anatomy.md)  

### Tier 4 — Optional leaves (not core)

- [Reconfigurable Kyber poly-mul (TCAD 2023)](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md) — Bi-Core NTT/INTT/CWM on Artix-7  
- Paper explainers for other digested TCAS-II / TCAD rows — as accepted  
- Super-scalar / dual-issue hash–poly processors, CIM-NTT, SCA shuffling — **deferred** (see [pedagogy-gaps.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/pedagogy-gaps.yaml))  
- Code-based HW fork (MDPC bit-flip, HQC CLMUL) — later, off [code-based KEMs](../code-based-kems/ROADMAP.md)

## Mindmap (textual)

```
crypto fundamentals (mod q, bits, Module-LWE helpful)
                 ↓
     Tier 0: clocks / latency · area–time honesty
                 ↓
     Tier 1: modular multiplier
                 ↓
     Tier 2: poly-mul engines → NTT butterfly → parallel memory
                 ↓
     Tier 3: KEM accelerator anatomy
                 ↓
     optional IEEE leaves (TCAD Kyber poly-mul, …) · lab RTL under projects/
```

## Related tracks

- [Lattice / LWE](../lattice-lwe/ROADMAP.md) — why Module-LWE / ML-KEM need these units  
- [Code-based KEMs](../code-based-kems/ROADMAP.md) — later Hamming HW fork  

Return anytime to the [index](../../index.md).
