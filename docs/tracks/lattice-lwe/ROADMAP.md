# Track: Lattice / LWE

**Prereqs:** [Fundamentals](../../index.md#1-fundamentals) (through vectors + modular arithmetic) · [Lattices (gentle)](../../fundamentals/lattices-gentle.md)  
**Next:** [Noisy linear equations (LWE story)](../../bridge/noisy-linear-equations-lwe.md) · [PQC hardware track](../pqc-hardware/ROADMAP.md) · [Code-based KEMs track](../code-based-kems/ROADMAP.md) · [index](../../index.md)

Secondary curated path for lattice-based PQC (ML-KEM / LWE-shaped schemes). Goal: leave the integer-grid picture, meet noisy modular equations, then Module-LWE vocabulary — before optional paper / hardware leaves.

## How to use

1. Finish shared **Fundamentals** at least through [Modular arithmetic](../../fundamentals/modular-arithmetic.md), [Vectors](../../fundamentals/vectors-matrices.md), [Probability](../../fundamentals/probability-gentle.md), and [Hard problems](../../fundamentals/hard-problems.md).  
2. Walk this track’s **lattice fundamental + LWE bridge + concepts** below.  
3. Reuse shared concepts: [KEM](../../concepts/kem.md), [IND-CPA / CCA](../../concepts/ind-cpa-cca.md), [Security bits](../../bridge/security-bits-and-work.md).  
4. Optional: TIT paper explainers when added via `research-pqc-learn`.  
5. Hardware path: after Module-LWE, fork to [PQC hardware](../pqc-hardware/ROADMAP.md).  
6. Code-based papers remain the densest TIT explainer path in this lab — use that track in parallel if you want research reading first.

## Core path

### A. Shared entry

1. [Modular arithmetic](../../fundamentals/modular-arithmetic.md)  
2. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
3. [Polynomials (gentle) — Part A](../../fundamentals/polynomials-gentle.md) · [Part B wrap-around](../../fundamentals/polynomials-wraparound.md) — needed before Module-LWE  
4. (Helpful) [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md) — modulus / alphabet intuition  

### B. Lattice fundamental + bridge

5. [Lattices (gentle)](../../fundamentals/lattices-gentle.md)  
6. [Noisy linear equations (LWE story)](../../bridge/noisy-linear-equations-lwe.md)  

### C. Lattice concepts

7. [LWE](../../concepts/lwe.md)  
8. [Module-LWE](../../concepts/module-lwe.md)  
9. Shared: [KEM](../../concepts/kem.md) · [IND-CPA / CCA](../../concepts/ind-cpa-cca.md)  

### D. Hardware fork (modules → accelerator)

After Module-LWE feels solid, walk the curated HW path (digital intuition → modmul → poly/NTT → accelerator anatomy):

- Track: **[PQC hardware](../pqc-hardware/ROADMAP.md)**

Paper explainers for TCAS-II circuit digests hang there as optional leaves — not required to finish this theory track.

### E. Papers (optional leaves — no explainers required yet)

Prefer digested lattice-tagged rows in `docs/PAPERS.md` / `papers/tit-pqc/` when expanding with `research-pqc-learn`.

### F. Frontier / gaps

- Research gaps ledger: [gaps.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)  
- Lab hardware WIP under `projects/papers/` is implementation, not default curriculum  

## Mindmap (textual)

```
shared fundamentals (mod q, vectors, polynomials)
                 ↓
     lattices-gentle (grid, SVP/CVP slogans)
                 ↓
     bridge: noisy linear equations (LWE story)
                 ↓
     concepts: LWE → Module-LWE → shared KEM/CCA
                 ↓
     optional TIT leaves · fork → pqc-hardware track
```

Return anytime to the [code-based KEMs](../code-based-kems/ROADMAP.md) track or the [PQC hardware](../pqc-hardware/ROADMAP.md) track.
