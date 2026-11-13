# Bridge layer — how to use this section

**Prereqs:** finish [Fundamentals](../index.md#2-fundamentals) (or the first six); [Orientation](../orientation/README.md) if you skipped the story  
**Next:** work through the ordered list below, then [Concepts](../index.md#4-concepts)

## Why bridge exists

**Fundamentals** = math and crypto intuition from scratch.  
**Concepts** = compact PQC vocabulary cards.  

The jump can feel steep (codes, syndromes, DFR, independence, LWE). **Bridge** pages are longer, story-first explainers that sit in the middle on purpose. More files and more wording are intentional — written so newcomers can follow with patience.

**Study tip:** do every tiny table on paper. Reading alone is not enough on decoding and McEliece pages.

## Suggested order (code-based core)

1. [From bits to codes](from-bits-to-codes.md) — redundancy, repeat-3, distance  
2. [Noisy channel story](noisy-channel-story.md) — BSC, DFR cousin, crypto twist  
3. [Generator and parity-check matrices](generator-and-parity-check.md) — $G$, $H$, syndrome  
4. [Decoding as a puzzle](decoding-as-a-puzzle.md) — sparse search, trapdoor gap  
5. [McEliece in plain words](mceliece-in-plain-words.md) — public scramble + intentional error  
6. [From KEM API to noise](from-kem-api-to-noise.md) — Encaps ↔ noise ↔ DFR  
7. [Finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md) — $\mathbb{F}_q$ postcard  
8. [Building $\mathrm{GF}(2^3)$](building-gf-8.md) — $\mathrm{GF}(p^m)\cong\mathrm{GF}(p)[x]/(f)$, GF(4)/GF(8) lab, irreducible vs traps  
9. [Security bits and attack work](security-bits-and-work.md) — $2^{128}$ work vs $2^{-128}$ failure  

**Rank-metric fork** (after finite fields + linear-code intuition):

10. [From Hamming to rank](from-hamming-to-rank.md) → [Rank metric track](../tracks/rank-metric/ROADMAP.md)

**Lattice / LWE fork** (after vectors + modular arithmetic + [Lattices (gentle)](../fundamentals/lattices-gentle.md); GF lab helpful):

11. [Noisy linear equations (LWE story)](noisy-linear-equations-lwe.md)  
12. [From fields to $R_q$](from-fields-to-rq.md) — field ≠ ring; toy $R_q$; ML-KEM slogan → [Lattice / LWE track](../tracks/lattice-lwe/ROADMAP.md)

**PQC hardware fork** (after modular arithmetic + bits; Module-LWE helpful before NTT/accelerator pages):

13. [Clocks, registers, and latency](clocks-registers-latency.md)  
14. [Area, time, power honesty](area-time-power-honesty.md) → [PQC hardware track](../tracks/pqc-hardware/ROADMAP.md)  
15. [Side-channel threat model (gentle)](side-channel-threat-model.md) → [Masking shares](../concepts/masking-shares.md) · [Shuffling / hiding](../concepts/shuffling-hiding.md)

Then enter Concepts starting at [Error-correcting codes](../concepts/error-correcting-codes.md) (code track), [LWE](../concepts/lwe.md) (lattice track), [Hash-based signatures](../concepts/hash-based-signatures.md) / [Oil–vinegar](../concepts/oil-vinegar-multivariate.md) / [Isogeny](../concepts/isogeny-csidh-sike.md) (other families), or [Modular multiplier](../concepts/modular-multiplier.md) (hardware track) — they should read as summaries of ideas you already met slowly.

## Already comfortable?

If a bridge page feels easy, still skim the “crypto twist” / “common confusions” sections — those prevent the usual mix-ups before concepts.
