# Post-Quantum Cryptography — Learning Path

**Prereqs:** none (curriculum entry)  
**Next:** [Motivation](orientation/motivation.md) · or [Orientation hub](orientation/README.md)

A guided path from **orientation** (why / history / problems / challenges) through
**fundamentals**, **bridge** pages, and **concept** cards into curated **tracks**.
Written so newcomers can follow with patience — no prior crypto course assumed.

**Lookup:** [Glossary (plain English)](glossary.md) — jump here whenever a word feels fuzzy.  
**Paper map:** [Browse indexed papers](papers.md) — search / filter / sort; titles link to publisher URLs.

## Who this is for

| You are… | Start at |
|----------|----------|
| Brand new — want the story before math | [Orientation](#1-orientation-start-here) (Motivation → History → Problems → Challenges) |
| New to cryptography or the math notation | [Fundamentals](#2-fundamentals) (start with [reading math](fundamentals/reading-math-notation.md) if symbols feel scary) |
| Finished fundamentals but concepts feel sudden | [Bridge](#3-bridge-close-the-gap) |
| Comfortable with coding intuition | [Concepts](#4-concepts) |
| Ready for a guided path | [Tracks](#5-tracks) |
| Curious about chips / accelerators | [PQC hardware track](#5-tracks) |

## 1. Orientation (start here)

Share the *why* before the *how*. Four short pages, then Fundamentals.

Hub: [orientation/README.md](orientation/README.md)

1. [Motivation](orientation/motivation.md) — why change cryptography; store-now-decrypt-later  
2. [History](orientation/history.md) — classical PKC → quantum threat → NIST PQC  
3. [Problems](orientation/problems.md) — easy forward, hard backward; family slogans  
4. [Challenges](orientation/challenges.md) — size, DFR, SCA, hybrids, moving cryptanalysis  

## 2. Fundamentals

Build mathematical and crypto intuition slowly. **No rush.** More pages and more wording are intentional.

0. [How to read the math](fundamentals/reading-math-notation.md) — start here if symbols feel scary  
1. [Why cryptography?](fundamentals/why-cryptography.md) — deeper toys after Orientation Motivation  
2. [Modular arithmetic](fundamentals/modular-arithmetic.md)  
3. [Bits, XOR, and randomness](fundamentals/bits-xor-randomness.md)  
4. [Probability (gentle)](fundamentals/probability-gentle.md)  
5. [What is a hard problem?](fundamentals/hard-problems.md) — deepen Orientation Problems  
6. [Public-key crypto in one picture](fundamentals/public-key-picture.md)  
7. [Vectors and matrices (gentle)](fundamentals/vectors-matrices.md)  
8. [Polynomials (gentle) — Part A](fundamentals/polynomials-gentle.md) — add/multiply only; do the paper lab  
8b. [Polynomial wrap-around — Part B](fundamentals/polynomials-wraparound.md) — before QC / HQC-shaped pages  
9. [Why quantum computers change crypto](fundamentals/quantum-threat.md) — deepen Orientation Motivation / History  
10. [Lattices (gentle)](fundamentals/lattices-gentle.md) — for the lattice / LWE track  

## 3. Bridge (close the gap)

Longer, story-first pages between fundamentals and compact PQC concepts. **Do not skip** if concepts feel sudden. More wording is intentional so newcomers can follow with patience.

Start here: [bridge/README.md](bridge/README.md)

1. [From bits to codes](bridge/from-bits-to-codes.md)  
2. [Noisy channel story](bridge/noisy-channel-story.md)  
3. [Generator and parity-check matrices](bridge/generator-and-parity-check.md)  
4. [Decoding as a puzzle](bridge/decoding-as-a-puzzle.md)  
5. [McEliece in plain words](bridge/mceliece-in-plain-words.md)  
6. [From KEM API to noise](bridge/from-kem-api-to-noise.md)  
7. [Finite fields beyond F₂](bridge/finite-fields-beyond-f2.md)  
8. [Security bits and attack work](bridge/security-bits-and-work.md)  
9. [From Hamming to rank](bridge/from-hamming-to-rank.md) — for the rank-metric track  
10. [Noisy linear equations (LWE story)](bridge/noisy-linear-equations-lwe.md) — for the lattice / LWE track  
11. [Clocks, registers, and latency](bridge/clocks-registers-latency.md) — for the PQC hardware track  
12. [Area, time, power honesty](bridge/area-time-power-honesty.md) — reading HW comparison tables  

## 4. Concepts

PQC vocabulary cards. Best after the matching bridge pages. Prefer clarity over compression.

**Code-based / shared**

- [Error-correcting codes (intuition)](concepts/error-correcting-codes.md)  
- [Hamming metric](concepts/hamming-metric.md)  
- [Linear codes over finite fields](concepts/linear-codes.md)  
- [Syndrome decoding](concepts/syndrome-decoding.md)  
- [Information-set decoding (ISD)](concepts/information-set-decoding.md)  
- [Goppa and alternant codes](concepts/goppa-alternant.md)  
- [Niederreiter cryptosystem](concepts/niederreiter.md)  
- [MDPC and QC-MDPC codes](concepts/mdpc-qc-mdpc.md)  
- [Bit-flipping decoding](concepts/bit-flipping-decoding.md)  
- [Quasi-cyclic codes](concepts/quasi-cyclic-codes.md)  
- [Key encapsulation (KEM)](concepts/kem.md)  
- [IND-CPA and IND-CCA](concepts/ind-cpa-cca.md)  
- [Decryption failure rate (DFR)](concepts/dfr.md)  
- [Independence heuristics](concepts/independence-heuristics.md)  
- [KL divergence (gentle)](concepts/kl-divergence.md)  

**Rank metric**

- [Rank metric](concepts/rank-metric.md)  
- [LRPC codes](concepts/lrpc-codes.md)  
- [Rank syndrome decoding](concepts/rank-syndrome-decoding.md)  

**Lattice / LWE**

- [Learning With Errors (LWE)](concepts/lwe.md)  
- [Module-LWE (gentle)](concepts/module-lwe.md)  

**PQC hardware (modules → accelerator)**

- [Modular multiplier](concepts/modular-multiplier.md)  
- [Polynomial multiply engines](concepts/poly-mul-engines.md)  
- [NTT butterfly (gentle)](concepts/ntt-butterfly.md)  
- [NTT parallel memory](concepts/ntt-parallel-memory.md)  
- [KEM accelerator anatomy](concepts/kem-accelerator-anatomy.md)  

## 5. Tracks

- **[Code-based KEMs](tracks/code-based-kems/ROADMAP.md)** — primary curated path (McEliece intuition → HQC/BIKE-shaped ideas → modelling & cryptanalysis)  
- **[Lattice / LWE](tracks/lattice-lwe/ROADMAP.md)** — grids → LWE story → Module-LWE  
- **[Rank metric](tracks/rank-metric/ROADMAP.md)** — Hamming→rank bridge + LRPC / rank-SD concepts  
- **[PQC hardware](tracks/pqc-hardware/ROADMAP.md)** — digital intuition → modmul → poly/NTT → KEM accelerator anatomy  

Maintained by skill: `research-pqc-learn`.
