# Track: Rank metric

**Prereqs:** [Fundamentals](../../index.md#1-fundamentals) · [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) · [Linear codes](../../concepts/linear-codes.md)  
**Next:** [From Hamming to rank](../../bridge/from-hamming-to-rank.md) · [Code-based KEMs track](../code-based-kems/ROADMAP.md) · [index](../../index.md)

Secondary curated path for rank-metric code-based PQC. Goal: leave the Hamming-only story with a clear metric change, then reach LRPC / rank syndrome decoding intuition before optional TIT leaves and lab WIP.

## How to use

1. Finish shared **Fundamentals** (especially vectors / matrices and polynomials).  
2. On the main bridge, at least reach [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) and [Linear codes](../../concepts/linear-codes.md).  
3. Walk this track’s **bridge + concepts** below.  
4. Optional: TIT / ePrint explainers when added via `research-pqc-learn`.  
5. Frontier: lab WIP under `projects/wip/` (ideal blockwise LRPC, related cryptanalysis) — research, not default curriculum.

## Core path

### A. Shared entry

1. [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md)  
2. [Linear codes](../../concepts/linear-codes.md)  
3. (Helpful) [Syndrome decoding](../../concepts/syndrome-decoding.md) — Hamming twin for contrast  

### B. Rank bridge

4. [From Hamming to rank](../../bridge/from-hamming-to-rank.md)  

### C. Rank concepts

5. [Rank metric](../../concepts/rank-metric.md)  
6. [LRPC codes](../../concepts/lrpc-codes.md)  
7. [Rank syndrome decoding](../../concepts/rank-syndrome-decoding.md)  

### D. Papers (optional leaves — no explainers required yet)

Prefer digested `papers/tit-pqc/` rank / LRPC papers when expanding with `research-pqc-learn` (e.g. blockwise rank decoding). Keep them as leaves until must-prereqs above are solid.

### E. Frontier / gaps

- Lab WIP: ideal blockwise LRPC / related projects under `projects/wip/`  
- Research gaps ledger stays in [gaps.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml) (scientific opens), not pedagogy holes  

## Mindmap (textual)

```
shared fundamentals + F_q + linear codes
                 ↓
     bridge: Hamming distance → rank distance
                 ↓
     concepts: rank metric → LRPC → rank SD
                 ↓
     optional TIT leaves / lab WIP cryptanalysis
```

Return anytime to the Hamming [code-based KEMs](../code-based-kems/ROADMAP.md) track.
