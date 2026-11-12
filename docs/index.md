# Post-Quantum Cryptography — Learning Path

**Prereqs:** none (curriculum entry)  
**Next:** [Motivation](orientation/motivation.md) · or [Orientation hub](orientation/README.md)

<div class="pqc-hero" markdown="0">
  <div class="pqc-hero__brand">PQC Learn</div>
  <h1>From first principles to research papers</h1>
  <p class="pqc-hero__lead">
    A guided curriculum in post-quantum cryptography — orientation, gentle math,
    bridge stories, concept cards, and curated family tracks. Written so newcomers
    can follow with patience.
  </p>
  <div class="pqc-hero__actions">
    <a class="pqc-btn pqc-btn--primary" href="orientation/motivation/">Start orientation</a>
    <a class="pqc-btn pqc-btn--amber" href="tracks/lattice-lwe/ROADMAP/">Lattice / LWE track</a>
    <a class="pqc-btn pqc-btn--ghost" href="glossary/">Glossary</a>
    <a class="pqc-btn pqc-btn--ghost" href="papers/">Paper map</a>
  </div>
</div>

<div class="pqc-metrics" markdown="0">
  <div class="pqc-metric"><span class="pqc-metric__n">12</span><span class="pqc-metric__l">Fundamentals</span></div>
  <div class="pqc-metric"><span class="pqc-metric__n">13</span><span class="pqc-metric__l">Bridge pages</span></div>
  <div class="pqc-metric"><span class="pqc-metric__n">38</span><span class="pqc-metric__l">Concept cards</span></div>
  <div class="pqc-metric"><span class="pqc-metric__n">7</span><span class="pqc-metric__l">Research tracks</span></div>
</div>

**Lookup:** [Glossary (plain English)](glossary.md) — jump here whenever a word feels fuzzy.  
**Paper map:** [Browse indexed papers](papers.md) — search / filter / sort; titles link to publisher URLs.

### Recently added / updated

Curriculum Wave B (concepts + track leaves):

| Area | What changed |
|------|----------------|
| **Concepts (+8)** | [Hash-based signatures](concepts/hash-based-signatures.md), [faults on hash sigs](concepts/fault-attacks-hash-sigs.md), [oil–vinegar / MAYO](concepts/oil-vinegar-multivariate.md), [MinRank / MiRitH](concepts/minrank-mpcitH.md), [isogeny / CSIDH / SIKE](concepts/isogeny-csidh-sike.md), [shuffling / hiding](concepts/shuffling-hiding.md), [carryless $\mathbb{F}_2$ polymul](concepts/carryless-polymul-f2.md), [CIM-NTT](concepts/cim-ntt.md) |
| **Rank track** | Promoted TIT **blockwise LRPC** + **BD-LRPC** `paper.md` leaves |
| **Hardware track** | **HQC / code** family HW fork (Ibex, LEAP, unified HQC, PHOENIX); CIM-NTT + deep NTT shuffle / SUCRE on the lattice-core leaf table |
| **Other tracks** | Hash / multivariate / isogeny / code-based ROADMAPs now point at the new concept cards; McEliece↔Niederreiter cites `paper.md` |

## Who this is for

<div class="pqc-card-grid" markdown="0">
  <div class="pqc-card">
    <span class="pqc-card__kicker">Path A</span>
    <div class="pqc-card__title">Brand new</div>
    <p class="pqc-card__desc">Want the story before the math — why crypto must change, then the history and problem slogans.</p>
    <a class="pqc-card__link" href="orientation/motivation/">Open Orientation</a>
  </div>
  <div class="pqc-card">
    <span class="pqc-card__kicker">Path B</span>
    <div class="pqc-card__title">New to the notation</div>
    <p class="pqc-card__desc">Start with reading math gently, then modular arithmetic, bits, and hard problems.</p>
    <a class="pqc-card__link" href="fundamentals/reading-math-notation/">Open Fundamentals</a>
  </div>
  <div class="pqc-card">
    <span class="pqc-card__kicker">Path C</span>
    <div class="pqc-card__title">Concepts feel sudden</div>
    <p class="pqc-card__desc">Use story-first bridge pages between fundamentals and compact PQC vocabulary cards.</p>
    <a class="pqc-card__link" href="bridge/">Open Bridge</a>
  </div>
  <div class="pqc-card">
    <span class="pqc-card__kicker">Path D</span>
    <div class="pqc-card__title">Ready for a family track</div>
    <p class="pqc-card__desc">Pick lattice, code-based, rank, hash, multivariate, isogeny, or hardware — staged like a short course.</p>
    <a class="pqc-card__link" href="#5-tracks">Browse Tracks</a>
  </div>
</div>

## 1. Orientation (start here)

Share the *why* before the *how*. Five short pages, then Fundamentals.

Hub: [orientation/README.md](orientation/README.md)

1. [Motivation](orientation/motivation.md) — why change cryptography; store-now-decrypt-later  
2. [History](orientation/history.md) — [classical PKC](glossary.md#pkc) → quantum threat → NIST PQC  
3. [Problems](orientation/problems.md) — easy forward, hard backward; family slogans  
4. [Challenges](orientation/challenges.md) — size, DFR, SCA, hybrids, moving cryptanalysis  
5. [Crypto categories (mindmap)](orientation/crypto-categories.md) — goals / symmetric / hashes / asymmetric (classical + PQC) / protocols  


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
13. [Side-channel threat model (gentle)](bridge/side-channel-threat-model.md) — before masking / TCHES SCA leaves  

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
- [MinRank and MPCitH (MiRitH)](concepts/minrank-mpcitH.md) — *also listed under multivariate / algebraic*  

**Lattice / LWE**

- [Learning With Errors (LWE)](concepts/lwe.md)  
- [Module-LWE (gentle)](concepts/module-lwe.md)  
- [Noise samplers](concepts/noise-samplers.md) — *what draws the small $e$ in LWE*  
- [Hash / XOF (Keccak–SHAKE slogan)](concepts/hash-xof-keccak.md) — *seed → long bitstreams*  
- [Ciphertext compress / encode](concepts/ciphertext-compress-encode.md) — *why ciphertexts drop bits*  
- [PQ signatures — Dilithium slogan](concepts/pq-signatures-dilithium.md) — *Sign vs KEM + retry*  

**Hash-based / multivariate / isogeny**

- [Hash-based signatures (WOTS+, Merkle, SPHINCS+)](concepts/hash-based-signatures.md) — *trees of one-time hashes*  
- [Fault attacks on hash-based signatures](concepts/fault-attacks-hash-sigs.md) — *tree-grafting threat shape*  
- [Oil–vinegar multivariate (UOV / MAYO)](concepts/oil-vinegar-multivariate.md) — *quadratic public maps*  
- [MinRank and MPCitH (MiRitH)](concepts/minrank-mpcitH.md) — *low-rank witness proofs*  
- [Isogenies, CSIDH, SIKE (historical)](concepts/isogeny-csidh-sike.md) — *broken SIKE KEM labeled*  

**PQC hardware (modules → accelerator)**

- [Modular multiplier](concepts/modular-multiplier.md)  
- [Polynomial multiply engines](concepts/poly-mul-engines.md)  
- [Carryless $\mathbb{F}_2$ polymul (HQC-shaped)](concepts/carryless-polymul-f2.md) — *binary poly / CLMUL*  
- [NTT butterfly (gentle)](concepts/ntt-butterfly.md)  
- [NTT parallel memory](concepts/ntt-parallel-memory.md)  
- [CIM-NTT](concepts/cim-ntt.md) — *compute-in-memory transform*  
- [KEM accelerator anatomy](concepts/kem-accelerator-anatomy.md)  
- [Masking shares](concepts/masking-shares.md) — *split secrets against side channels*  
- [Shuffling / hiding](concepts/shuffling-hiding.md) — *randomize operation order*  


## 5. Tracks

Pick **one family** (or hardware) by goal. Each roadmap is staged like a short course; paper leaves cite in-repo `paper.md` extracts.

| You want… | Track | After this path you can… | Start |
|-----------|--------|--------------------------|--------|
| ML-KEM / Module-LWE intuition | [Lattice / LWE](tracks/lattice-lwe/ROADMAP.md) | Read LWE → Module-LWE → samplers / compress / Dilithium slogan | [Lattices (gentle)](fundamentals/lattices-gentle.md) |
| McEliece / QC-MDPC / HQC-shaped reading | [Code-based KEMs](tracks/code-based-kems/ROADMAP.md) | Walk codes → KEM/DFR → curated TIT leaves; fork to HQC HW | [From bits to codes](bridge/from-bits-to-codes.md) |
| Rank distance / LRPC (after Hamming) | [Rank metric](tracks/rank-metric/ROADMAP.md) | Contrast Hamming vs rank; open TIT LRPC + MiRitH leaves | [From Hamming to rank](bridge/from-hamming-to-rank.md) |
| SPHINCS+ / SLH-DSA-shaped reading | [Hash-based signatures](tracks/hash-based-signatures/ROADMAP.md) | Use WOTS+/Merkle/SPHINCS+ card; open HW + fault extracts | [Hash-based signatures](concepts/hash-based-signatures.md) |
| MQ / MAYO / UOV-shaped reading | [Multivariate](tracks/multivariate/ROADMAP.md) | Use oil–vinegar card; open MAYO/UOV/Rainbow extracts | [Oil–vinegar multivariate](concepts/oil-vinegar-multivariate.md) |
| Isogeny / SIKE history (broken KEM context) | [Isogeny](tracks/isogeny/ROADMAP.md) | Label SIKE historical; open CSIDH/CTIDH + SIKE HW extracts | [Isogenies, CSIDH, SIKE](concepts/isogeny-csidh-sike.md) |
| Chips, NTT, SCA / masking / HQC HW | [PQC hardware](tracks/pqc-hardware/ROADMAP.md) | Lattice core + CIM/deep shuffle; family HW incl. **HQC/code** | [Clocks, registers, latency](bridge/clocks-registers-latency.md) |
{: .pqc-path-table }

**Forks:** Rank opens only from the code-based path. Hardware is orthogonal — lattice is the core walk; hash / multivariate / isogeny / **code–HQC** add family HW leaves on the same roadmap.

Maintained by skill: `research-pqc-learn`.
