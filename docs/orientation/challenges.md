# Challenges — what still makes PQC hard

**Prereqs:** [Problems](problems.md)  
**Next:** [How to read the math](../fundamentals/reading-math-notation.md) · or [Why cryptography?](../fundamentals/why-cryptography.md)

**Learning goals.** Name several *practical* obstacles beyond “pick a hard problem”: key/ciphertext size, decryption failures, side channels, hardware cost, hybrids, and the fact that cryptanalysis never freezes.

## Hardness is necessary, not sufficient

Orientation [Problems](problems.md) asked what mathematical puzzle you rest on.  
This page asks: **even if the puzzle is hard, what else can go wrong?**

These challenges are why PQC is an active research and engineering field — not a finished checklist.

## 1. Size and speed

Many PQC public keys or ciphertexts are **larger** than classical ECC equivalents. That stresses:

- bandwidth and storage,  
- embedded devices,  
- certificate chains and handshake round-trips.

Hardware papers chase area, latency, and energy for the same reason: arithmetic (NTT, modular multiply, hashing) must stay affordable.

**Later:** [Area–time–power honesty](../bridge/area-time-power-honesty.md) · [PQC hardware track](../tracks/pqc-hardware/ROADMAP.md)

## 2. Decryption / decapsulation failures

Some KEMs are **noisy** by design: honest parties almost always recover the session key, but failure probability is not literally zero. That rate is the **decryption failure rate (DFR)**.

Challenges include:

- proving or estimating DFR honestly,  
- independence assumptions that simplify proofs but may not hold exactly,  
- reaction attacks if failures leak through timing or behavior.

**Later:** [DFR](../concepts/dfr.md) · [Independence heuristics](../concepts/independence-heuristics.md)

## 3. Side channels and faults

Even a hard mathematical problem fails in practice if the **implementation** leaks:

- timing,  
- power / EM traces,  
- fault injection.

PQC does not magically resist side channels. Masking, constant-time coding, and fault checks are separate research threads.

## 4. Hybrids and migration

Real networks rarely flip a switch overnight. **Hybrid** designs combine classical and PQC so security remains if *either* component holds. Challenges include:

- protocol engineering (TLS, etc.),  
- certificate and PKI churn,  
- performance budgets during the transition,  
- operational mistakes (shipping PQC but still trusting only the classical half).

## 5. Cryptanalysis keeps moving

Standardization freezes parameters for products. Attackers and theorists keep:

- improving decoding / lattice reduction,  
- finding weak parameter corners,  
- breaking optimistic modelling assumptions.

A challenge for learners and researchers alike: read **claims with dates** — “best known attack” is a moving target.

## 6. Understanding the papers

PQC papers mix coding theory, lattices, probability, reductions, and sometimes circuits. The curriculum’s answer is a **ladder**:

Orientation → Fundamentals → Bridge → Concepts → Tracks → paper explainers (private module).

Skipping the ladder is a common challenge; the fix is patience, not genius.

### Quick self-check

Name two challenges that are *not* “the math puzzle might be easy.”  
<details><summary>Answer (examples)</summary>
Large keys/ciphertexts; nonzero DFR; side-channel leakage; hybrid migration; ongoing cryptanalysis; hardware cost.
</details>

## You are ready for Fundamentals

| Path | Start |
|------|--------|
| Symbols feel scary | [How to read the math](../fundamentals/reading-math-notation.md) |
| Want crypto jobs in plain words | [Why cryptography?](../fundamentals/why-cryptography.md) |
| Prefer the ordered list | [Home → Fundamentals](../index.md#2-fundamentals) |

**Lookup:** [Glossary](../glossary.md)
