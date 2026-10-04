# Track: Code-based KEMs

**Prereqs:** [Fundamentals](../../index.md#1-fundamentals) · [Bridge](../../bridge/README.md)  
**Next:** [McEliece–Niederreiter equivalence](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md) · [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)

Primary curated path for this lab’s learning curriculum. Goal: take a motivated beginner from fundamentals through **TIT** code-based papers, then optional ePrint leaves.

## How to use

1. Finish the **Fundamentals** block (or skim if you already know it).  
2. Walk the **Bridge** block (long explainers — do not skip if new to coding theory).  
3. Walk **Concepts** in order (compact vocabulary).  
4. Read the **TIT** paper explainers in order (core path).  
5. Optional: ePrint modelling leaf (2025/018).  
6. Skim **Gaps** for open questions.  
7. More leaves: `docs/PAPERS.md` with tag `code-based-cryptosystem` — prefer `papers/tit-pqc/` when adding explainers via `research-pqc-learn`.

## Core path

### A. Fundamentals

0. [How to read the math](../../fundamentals/reading-math-notation.md)  
1. [Why cryptography?](../../fundamentals/why-cryptography.md)  
2. [Modular arithmetic](../../fundamentals/modular-arithmetic.md)  
3. [Bits, XOR, and randomness](../../fundamentals/bits-xor-randomness.md)  
4. [Probability (gentle)](../../fundamentals/probability-gentle.md)  
5. [Hard problems](../../fundamentals/hard-problems.md)  
6. [Public-key picture](../../fundamentals/public-key-picture.md)  
7. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
8. [Polynomials (gentle) — Part A](../../fundamentals/polynomials-gentle.md)  
8b. [Polynomial wrap-around — Part B](../../fundamentals/polynomials-wraparound.md)  
9. [Quantum threat](../../fundamentals/quantum-threat.md)  

### B. Bridge (close the gap)

10. [Bridge overview](../../bridge/README.md)  
11. [From bits to codes](../../bridge/from-bits-to-codes.md)  
12. [Noisy channel story](../../bridge/noisy-channel-story.md)  
13. [Generator and parity-check](../../bridge/generator-and-parity-check.md)  
14. [Decoding as a puzzle](../../bridge/decoding-as-a-puzzle.md)  
15. [McEliece in plain words](../../bridge/mceliece-in-plain-words.md)  
16. [From KEM API to noise](../../bridge/from-kem-api-to-noise.md)  
17. [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md)  
18. [Security bits and attack work](../../bridge/security-bits-and-work.md)  

### C. Concepts

19. [Error-correcting codes](../../concepts/error-correcting-codes.md)  
20. [Hamming metric](../../concepts/hamming-metric.md)  
21. [Linear codes](../../concepts/linear-codes.md)  
22. [Syndrome decoding](../../concepts/syndrome-decoding.md)  
23. [Information-set decoding](../../concepts/information-set-decoding.md)  
24. [Goppa and alternant](../../concepts/goppa-alternant.md)  
25. [Niederreiter](../../concepts/niederreiter.md)  
26. [Quasi-cyclic codes](../../concepts/quasi-cyclic-codes.md)  
27. [MDPC and QC-MDPC](../../concepts/mdpc-qc-mdpc.md)  
28. [Bit-flipping decoding](../../concepts/bit-flipping-decoding.md)  
29. [KEM](../../concepts/kem.md)  
30. [IND-CPA / IND-CCA](../../concepts/ind-cpa-cca.md)  
31. [DFR](../../concepts/dfr.md)  
32. [Independence heuristics](../../concepts/independence-heuristics.md)  
33. [KL divergence](../../concepts/kl-divergence.md)  

### D. Papers — TIT core (beginner explainers)

34. [TIT — McEliece ↔ Niederreiter equivalence](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md)  
35. [TIT — Ouroboros KEM family](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/ouroboros-an-efficient-and-provably-secure-kem-family/explainer.md)  
36. [TIT — QC-MDPC reaction attack](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md)  

### E. Papers — optional ePrint leaf

37. [ePrint 2025/018 — Independence assumption in QC code-based crypto](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  

### F. Frontier / gaps

- [gaps.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)  
- Lab WIP (research, not curriculum defaults): ideal blockwise LRPC / SSRS projects under `projects/wip/`

## Optional leaves (no explainer yet)

Prefer new explainers from `papers/tit-pqc/` (already digested). Add with `research-pqc-learn`.

## Mindmap (textual)

```
fundamentals → bridge (codes, G/H, McEliece story, KEM↔noise)
                              ↓
                         concepts (compact)
                              ↓
                      quasi-cyclic + DFR + independence
                              ↓
     TIT: equivalence → Ouroboros → QC-MDPC reaction
                              ↓
              optional: 2025/018 audits independence (KL/TV)
                              ↓
                    open: modern ISD joint-W / CCA+DFR / unstructured ti
```

Machine-readable edges: [edges.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/edges.yaml).
