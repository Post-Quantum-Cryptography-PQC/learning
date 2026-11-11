# Track: Multivariate

**Prereqs:** [Vectors and matrices](../../fundamentals/vectors-matrices.md) · [Polynomials (gentle)](../../fundamentals/polynomials-gentle.md) · [Orientation — Problems](../../orientation/problems.md)  
**Next:** [PQC hardware § multivariate leaves](../pqc-hardware/ROADMAP.md#family-hw-leaves-mq) · [index](../../index.md)  
**Tracks:** multivariate

## Who / outcomes

After this track you can:

- Place multivariate quadratic (MQ) signature families among PQC options.  
- Open curated MAYO / UOV / Rainbow / MQ-SCA `paper.md` extracts.  
- Fork to hardware/GPU leaves on the shared HW roadmap.

## How to use

1. Shared entry (linear algebra + polynomials).  
2. Stage 1 family placement (concept cards for Oil–Vinegar / MAYO are follow-on gaps).  
3. Paper leaves, then HW fork.

## Shared entry

1. [Vectors and matrices](../../fundamentals/vectors-matrices.md)  
2. [Polynomials — Part A](../../fundamentals/polynomials-gentle.md)  
3. [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Hard problems](../../fundamentals/hard-problems.md)  
4. [Problems](../../orientation/problems.md) · [Challenges](../../orientation/challenges.md) · [Security bits](../../bridge/security-bits-and-work.md)

## Stages

### Stage 1 — Family placement (Intro ch. 15–17)

1. Orientation family slogans ([Problems](../../orientation/problems.md)).  
2. Concept gap (follow-on): MQ problem card, Oil–Vinegar, MAYO/UOV scheme cards — not in `share/` yet.  
3. Reuse [Public-key picture](../../fundamentals/public-key-picture.md) for “trapdoor map” intuition only.

**Checkpoint:** Multivariate schemes hide structure in a system of equations — what is the public object an attacker sees?

### Stage 2 — Curated extracts

Read the leaf table; treat Rainbow/UOV implementation papers as historical/engineering context alongside MAYO-focused rows.

## Paper leaves

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Threshold MAYO | `papers/tches-pqc/optimizing-and-implementing-threshold-mayo/paper.md` | extract only |
| MAYO GPU (matrix reordering) | `papers/tches-pqc/high-throughput-gpu-design-and-implementation-of-mayo-with-matrix-computation-reordering/paper.md` | extract only |
| QR-UOV on AVX2 | `papers/tches-pqc/avx2-implementation-of-qr-uov-for-modern-x86-processors/paper.md` | extract only |
| Rainbow and UOV AVX2 | `papers/tches-pqc/efficient-implementations-of-rainbow-and-uov-using-avx2/paper.md` | extract only |
| SCA on MQ signature schemes | `papers/tches-pqc/side-channel-attacks-on-post-quantum-signature-schemes-based-on-multivariate-quadratic-equations/paper.md` | extract only |

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 15 | MQ / Oil–Vinegar | Stage 1 |
| 16–17 | Rainbow / GeMSS / MAYO | Stage 2 leaves |

## Cross-track forks

- [PQC hardware](../pqc-hardware/ROADMAP.md#family-hw-leaves-mq) — family HW / GPU leaves  
- [Hash-based signatures](../hash-based-signatures/ROADMAP.md) · [Lattice / LWE](../lattice-lwe/ROADMAP.md) — other signature families  
- [Isogeny](../isogeny/ROADMAP.md) — parallel (non-signature-primary) family
