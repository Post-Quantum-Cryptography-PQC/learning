# Track: Isogeny

**Prereqs:** [Modular arithmetic](../../fundamentals/modular-arithmetic.md) · [Orientation — History](../../orientation/history.md) · [Challenges](../../orientation/challenges.md)  
**Next:** [PQC hardware § isogeny leaves](../pqc-hardware/ROADMAP.md#family-hw-leaves-isogeny) · [index](../../index.md)  
**Tracks:** isogeny

## Who / outcomes

After this track you can:

- Place isogeny-based KEMs in the PQC timeline, including **why SIKE left the NIST KEM path**.  
- Open curated SIKE / CSIDH `paper.md` HW and implementation extracts with that historical label.  
- Avoid treating SIKE accelerators as “current standard” guidance.

## How to use

1. Shared entry with History / Challenges first.  
2. Stage 1 status check, then extracts.  
3. Hardware fork → [isogeny family HW leaves](../pqc-hardware/ROADMAP.md#family-hw-leaves-isogeny).

## Shared entry

1. [History](../../orientation/history.md) · [Challenges](../../orientation/challenges.md)  
2. [Modular arithmetic](../../fundamentals/modular-arithmetic.md)  
3. [Hard problems](../../fundamentals/hard-problems.md) · [Public-key picture](../../fundamentals/public-key-picture.md)  
4. Helpful: [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md)

## Stages

### Stage 1 — Status and placement (Intro ch. 20–21)

1. Read Challenges / History for NIST path changes and broken candidates.  
2. Concept gap (follow-on): elliptic-curve isogeny / SIDH intuition cards — not in `share/` yet.  
3. TIT digests without `paper.md` yet (e.g. `papers/tit-pqc/new-hybrid-method-for-isogeny-based-cryptosystems-using-edwards-curves/analysis.md`) — wait for extract before promoting to leaf table.

**Checkpoint:** Why is a fast SIKE FPGA paper still useful to read, and why is it unsafe to recommend SIKE for new deployments?

### Stage 2 — Curated extracts (historical / engineering)

All leaves below are **extract only** and inherit the broken-KEM / research-history framing.

## Paper leaves

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Compact scalable SIKE HW/SW | `papers/tches-pqc/a-compact-and-scalable-hardware-software-co-design-of-sike/paper.md` | extract only (historical) |
| High-performance SIKE (TCAS-II) | `papers/tcas-ii-pqc/a-high-performance-sike-accelerator-with-high-frequency-and-low-area-time-product/paper.md` | extract only (historical) |
| High-performance SIKE (TVLSI) | `papers/tvlsi-pqc/A High-Performance SIKE Hardware Accelerator/paper.md` | extract only (historical) |
| CTIDH — faster constant-time CSIDH | `papers/tches-pqc/ctidh-faster-constant-time-csidh/paper.md` | extract only |

## Course map (PQC_HTML Intro — inspiration only)

| Intro ch. | Theme | This track |
|-----------|--------|------------|
| 20 | Isogenies / SIDH ideas | Stage 1 |
| 21 | SIKE + attacks / status | Stages 1–2 |

## Cross-track forks

- [PQC hardware](../pqc-hardware/ROADMAP.md#family-hw-leaves-isogeny) — family HW leaves  
- [Lattice / LWE](../lattice-lwe/ROADMAP.md) · [Code-based KEMs](../code-based-kems/ROADMAP.md) — current KEM-shaped families  
- Not linked to [Rank metric](../rank-metric/ROADMAP.md) (code metric fork only)
