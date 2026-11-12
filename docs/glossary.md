# Glossary (plain English)

**Prereqs:** none (lookup anytime)  
**Next:** [Orientation](orientation/README.md) · [How to read the math](fundamentals/reading-math-notation.md) · [Index](index.md)

A quick dictionary for this curriculum. Each entry is one or two sentences plus a link to the teaching page. Skip freely; come back when a word feels fuzzy.

**Habit:** English first, symbols second. No page here uses school-grade labels — clarity is for everyone.

## A–C

| Term | Plain meaning | See |
|------|---------------|-----|
| **ADP** | Area × delay — one circuit trade-off scalar in HW tables | [Area–time honesty](bridge/area-time-power-honesty.md) |
| <a id="aead"></a>**AEAD** | Authenticated encryption with associated data — encrypts for secrecy and adds a **shared-key** integrity/authentication tag (often with extra public header bytes). Not a public-key signature | [Crypto categories](orientation/crypto-categories.md) · [Why cryptography?](fundamentals/why-cryptography.md) |
| <a id="aes"></a>**AES** | Advanced Encryption Standard — common symmetric block cipher for bulk confidentiality | [Symmetric crypto](#symmetric-crypto) · [Why cryptography?](fundamentals/why-cryptography.md) |
| **Alternant code** | Algebraic code family related to GRS; includes binary Goppa as a famous case | [Goppa and alternant](concepts/goppa-alternant.md) |
| **ASA / Kleptography** | Maliciously substituted crypto algorithm or parameters (subversion), not ordinary SCA leakage | [ASA / HPC fuzzing](concepts/asa-hpc-fuzzing.md) |
| <a id="asymmetric-pkc"></a>**Asymmetric / PKC** | Public-key family (public + private key). **Classical PKC** and **PQC** are subfamilies here — not separate top-level crypto kinds | [Crypto categories](orientation/crypto-categories.md) · [PKC](#pkc) |
| <a id="authentication"></a>**Authentication** | Evidence about *which key* produced data — shared-key (MAC/AEAD) or publicly verifiable (signature) | [Crypto categories](orientation/crypto-categories.md) · [Why cryptography?](fundamentals/why-cryptography.md) |
| **BIKE** | Bit Flipping Key Encapsulation — QC-MDPC-shaped code-based KEM family | [MDPC / QC-MDPC](concepts/mdpc-qc-mdpc.md) · [Carryless polymul](concepts/carryless-polymul-f2.md) |
| **Authenticity** | Informal umbrella for “not forged / not silently edited”; this curriculum splits it into [integrity](#integrity), [authentication](#authentication), and [non-repudiation](#non-repudiation) | [Crypto categories](orientation/crypto-categories.md) |
| **Bit** | A $0$ or $1$ | [Bits, XOR](fundamentals/bits-xor-randomness.md) |
| **Bit-flipping** | Iterative decoder: flip bits that fail many parity checks | [Bit-flipping decoding](concepts/bit-flipping-decoding.md) |
| **Butterfly (NTT)** | Local 2-in/2-out modular update with a twiddle | [NTT butterfly](concepts/ntt-butterfly.md) |
| **CIM-NTT** | Compute-in-memory (or near-memory) organization for NTT butterflies | [CIM-NTT](concepts/cim-ntt.md) |
| **Ciphertext** | Scrambled form that travels on the wire | [Why cryptography?](fundamentals/why-cryptography.md) |
| **Clock / register** | Heartbeat + stored bits between ticks | [Clocks, registers](bridge/clocks-registers-latency.md) |
| **Carryless / CLMUL** | Binary polynomial multiply (XOR instead of integer carry); HQC/BIKE-shaped hot path | [Carryless $\mathbb{F}_2$ polymul](concepts/carryless-polymul-f2.md) |
| **CED** | Concurrent error detection — reliability / fault-detection logic on arithmetic (not a digital signature) | Code CED leaves on [code-based ROADMAP](tracks/code-based-kems/ROADMAP.md) |
| **CFS / QC-LDGM / LEDAsig** | Code-based signature families (historical / engineering leaves) | [Code-based signatures](concepts/code-based-signatures.md) |
| **Code / codeword** | Allowed protected strings; a codeword is one allowed string | [Error-correcting codes](concepts/error-correcting-codes.md) |
| **Constant-weight coding** | Map ordinary bits ↔ fixed Hamming-weight vectors (format layer) | [Constant-weight coding](concepts/constant-weight-coding.md) |
| **Crypto-agile SoC** | One chip / processor reconfigured across multiple PQC families | [Crypto-agile SoC](concepts/crypto-agile-soc.md) |
| **Combinational logic** | Outputs from current inputs only (no memory) | [Clocks, registers](bridge/clocks-registers-latency.md) |
| **CSIDH / CTIDH** | Isogeny group-action key exchange; CTIDH emphasizes constant-time evaluation | [Isogenies, CSIDH, SIKE](concepts/isogeny-csidh-sike.md) |

| <a id="cmac"></a>**CMAC** | Cipher-based MAC — keyed integrity tag built from a block cipher (sibling of HMAC) | [MAC](#mac) · [Symmetric crypto](#symmetric-crypto) |
| **Confidentiality** | Strangers cannot read the content | [Why cryptography?](fundamentals/why-cryptography.md) |
| **Critical path** | Longest combo delay that limits the clock period (ns) | [Clocks, registers](bridge/clocks-registers-latency.md) |
| **CVP** | Closest vector problem — nearest lattice point to a target (slogan) | [Lattices](fundamentals/lattices-gentle.md) |

## D–G

| Term | Plain meaning | See |
|------|---------------|-----|
| **DFR** | How often honest Decaps fails to return the session key | [DFR](concepts/dfr.md) |
| <a id="dh"></a>**DH / Diffie–Hellman** | Classical key-agreement method: both sides derive a shared secret; not message encryption by itself | [Key agreement](#key-agreement) · [Crypto categories](orientation/crypto-categories.md) |
| <a id="digital-signature"></a>**Digital signature** | Sign with the private key; anyone with the public key can verify — integrity + authentication with public verification; often non-repudiation. Not confidentiality, and not a shared-key MAC/AEAD | [Crypto categories](orientation/crypto-categories.md) · [Public-key picture](fundamentals/public-key-picture.md) |
| <a id="ecc"></a>**ECC** | Elliptic-curve cryptography — classical PKC family; often **ECDH** (agreement) and **ECDSA** (signatures) | [PKC](#pkc) · [Crypto categories](orientation/crypto-categories.md) |
| <a id="ecdh"></a>**ECDH** | Elliptic-curve Diffie–Hellman — ECC-based key agreement | [DH](#dh) · [Key agreement](#key-agreement) |
| <a id="ecdsa"></a>**ECDSA** | Elliptic-curve digital signature algorithm — ECC-based signatures | [Digital signature](#digital-signature) · [ECC](#ecc) |
| **Encaps / Decaps** | KEM calls that create / recover a session key | [KEM](concepts/kem.md) |
| **Fault injection (FIA)** | Physical flips/glitches during crypto; distinct from power/EM SCA | [Fault attacks on hash-based signatures](concepts/fault-attacks-hash-sigs.md) · [Side-channel threat model](bridge/side-channel-threat-model.md) |
| **FORS** | Few-time hash-based signature layer inside SPHINCS+ | [Hash-based signatures](concepts/hash-based-signatures.md) |
| **Generator matrix $G$** | Builds codewords from short messages | [Generator and parity-check](bridge/generator-and-parity-check.md) |
| **Goppa code** | Classic algebraic secret code for McEliece | [Goppa and alternant](concepts/goppa-alternant.md) |
| **GRS** | Generalized Reed–Solomon — strong algebra, often unsafe raw in McEliece | [Goppa and alternant](concepts/goppa-alternant.md) |

## H–K

| Term | Plain meaning | See |
|------|---------------|-----|
| **Hamming distance** | How many positions two strings disagree | [Hamming metric](concepts/hamming-metric.md) |
| **Hamming weight** | How many nonzero positions (ones, for bits) | [Hamming metric](concepts/hamming-metric.md) |
| **HQC** | Hamming Quasi-Cyclic — code-based KEM using binary QC polynomials + coding layers | [Quasi-cyclic codes](concepts/quasi-cyclic-codes.md) · [Carryless polymul](concepts/carryless-polymul-f2.md) |
| **HPC (here)** | Hardware performance counters — CPU event counts used e.g. for ASA detection | [ASA / HPC fuzzing](concepts/asa-hpc-fuzzing.md) |
| <a id="hash"></a>**Hash / digest** | Usually an **unkeyed** fingerprint of data (e.g. SHA-2/3); building block for HMAC, signatures, and many PQC steps — not itself a shared-key cipher | [Crypto categories](orientation/crypto-categories.md) · [Hash / XOF](concepts/hash-xof-keccak.md) · [SHA-2 / SHA-3](#sha) |
| <a id="hmac"></a>**HMAC** | Hash-based message authentication code — keyed integrity check built from a hash | [MAC](#mac) · [Symmetric crypto](#symmetric-crypto) |
| <a id="https"></a>**HTTPS** | HTTP over TLS — everyday web encryption/authenticity bundle in the browser | [TLS](#tls) · [Crypto categories](orientation/crypto-categories.md) |
| **Independence heuristic** | Pretend noise coordinates are independent for easy tail bounds | [Independence heuristics](concepts/independence-heuristics.md) |
| <a id="integrity"></a>**Integrity** | Silent edits are detected (content was not changed unnoticed) | [Crypto categories](orientation/crypto-categories.md) · [Why cryptography?](fundamentals/why-cryptography.md) |
| **IND-CPA / IND-CCA** | Security games: chosen-plaintext vs also decryption-oracle powers | [IND-CPA / CCA](concepts/ind-cpa-cca.md) |
| **ISD** | Information-set decoding — main classical attack family on sparse decoding | [ISD](concepts/information-set-decoding.md) |
| <a id="kdf"></a>**KDF** | Key-derivation function — turns a secret (and maybe context) into one or more keys | [Crypto categories](orientation/crypto-categories.md) · [Hash](#hash) |
| <a id="kem"></a>**KEM** | Key encapsulation mechanism — API to ship a fresh session key ($\mathsf{Encaps}$ / $\mathsf{Decaps}$) | [KEM](concepts/kem.md) · [Crypto categories](orientation/crypto-categories.md) |
| **KEM accelerator** | HW datapath + control that runs Encaps/Decaps hot paths | [KEM accelerator anatomy](concepts/kem-accelerator-anatomy.md) |
| **Key** | Secret that controls scrambling / unscrambling | [Why cryptography?](fundamentals/why-cryptography.md) |
| <a id="key-agreement"></a>**Key agreement** | Both parties contribute to a shared secret (e.g. DH / ECDH); not the same API as encrypting a message | [Crypto categories](orientation/crypto-categories.md) · [PKC](#pkc) |
| **KL divergence** | Score for how badly model $Q$ describes reality $P$ | [KL divergence](concepts/kl-divergence.md) |

## L–N

| Term | Plain meaning | See |
|------|---------------|-----|
| **Latency (cycles)** | How many clock ticks until a result is ready | [Clocks, registers](bridge/clocks-registers-latency.md) |
| **Lattice** | Regular discrete grid of points | [Lattices](fundamentals/lattices-gentle.md) |
| **Linear code** | Code closed under XOR / field addition | [Linear codes](concepts/linear-codes.md) |
| **LRPC** | Low-rank parity-check codes (rank-metric family) | [LRPC](concepts/lrpc-codes.md) |
| **LWE** | Learning With Errors — noisy modular linear equations | [LWE](concepts/lwe.md) |
| <a id="mac"></a>**MAC** | Message authentication code — short tag proving integrity/authenticity under a shared key (not a public-key signature) | [Symmetric crypto](#symmetric-crypto) · [Crypto categories](orientation/crypto-categories.md) |
| **MAYO / UOV** | Multivariate quadratic signatures (oil–vinegar family) | [Oil–vinegar multivariate](concepts/oil-vinegar-multivariate.md) |
| **McEliece** | Public scramble of a secret easy code + intentional sparse error | [McEliece in plain words](bridge/mceliece-in-plain-words.md) |
| **MDPC / QC-MDPC** | Moderate-density parity-check; QC = quasi-cyclic blocks | [MDPC and QC-MDPC](concepts/mdpc-qc-mdpc.md) |
| **Minimum distance $d$** | Smallest Hamming distance between distinct codewords | [Hamming metric](concepts/hamming-metric.md) |
| **Min-sum (MDPC)** | Soft / message-passing cousin of bit-flipping on the same check graph | [Bit-flipping decoding](concepts/bit-flipping-decoding.md) |
| **MinRank** | Find a low-rank linear combination of given matrices | [MinRank and MPCitH](concepts/minrank-mpcitH.md) |
| <a id="ml-dsa"></a>**ML-DSA** | Module-lattice digital signature algorithm — NIST PQC signature standard (Dilithium family) | [PQC](#pqc) · [PQ signatures](concepts/pq-signatures-dilithium.md) |
| <a id="ml-kem"></a>**ML-KEM** | Module-lattice key-encapsulation mechanism — NIST PQC KEM standard (Kyber family) | [PQC](#pqc) · [KEM](#kem) · [Module-LWE](concepts/module-lwe.md) |
| **Modular arithmetic** | Clock / leftover wrap-around math | [Modular arithmetic](fundamentals/modular-arithmetic.md) |
| **Modular multiplier** | HW/SW unit for $a\cdot b \bmod q$ | [Modular multiplier](concepts/modular-multiplier.md) |
| **Module-LWE** | LWE with polynomial / module packaging (ML-KEM-shaped) | [Module-LWE](concepts/module-lwe.md) |
| **Motivation (PQC)** | Why migrate: quantum break of RSA/ECC + long-lived recorded traffic | [Motivation](orientation/motivation.md) |
| **MPCitH** | Multi-party computation in the head — proof/signature style from virtual parties | [MinRank and MPCitH](concepts/minrank-mpcitH.md) |
| **Niederreiter** | Syndrome / parity-check packaging twin of McEliece | [Niederreiter](concepts/niederreiter.md) |
| <a id="nist"></a>**NIST** | U.S. standards body that ran the PQC competition and publishes algorithm standards many products follow | [History](orientation/history.md) · [PQC](#pqc) |
| <a id="non-repudiation"></a>**Non-repudiation** | Third parties can check that a particular signer key authorized a message (with key-identity assumptions) — typically signatures, not MAC/AEAD | [Crypto categories](orientation/crypto-categories.md) · [Digital signature](#digital-signature) |
| **NTT / INTT** | Number-theoretic (inverse) transform — modular FFT for poly mul | [NTT butterfly](concepts/ntt-butterfly.md) |

## P–S

| Term | Plain meaning | See |
|------|---------------|-----|
| **Parity-check matrix $H$** | Checklist of linear constraints; syndrome fingerprint | [Generator and parity-check](bridge/generator-and-parity-check.md) |
| <a id="pkc"></a>**PKC** | Public-key cryptography (PKC) uses a mathematically related key pair: a public key that can be freely distributed and a private key that must remain secret. Public keys enable encryption, signature verification, or key agreement, depending on the cryptographic scheme. Classical PKC includes RSA, Diffie–Hellman (DH), and Elliptic-Curve Cryptography (ECC), which are widely used before the transition to post-quantum cryptography (PQC). | [Crypto categories](orientation/crypto-categories.md) · [Public-key picture](fundamentals/public-key-picture.md) · [History](orientation/history.md) · [Motivation](orientation/motivation.md) |
| **Plaintext** | Readable message before encryption | [Why cryptography?](fundamentals/why-cryptography.md) |
| **Poly-mul engine** | Schoolbook / Karatsuba / NTT organization for polynomial multiply | [Poly-mul engines](concepts/poly-mul-engines.md) |
| <a id="pqc"></a>**PQC** | Post-quantum cryptography — asymmetric / public-key algorithms meant to stay hard even for large quantum computers; runs on ordinary machines today (a subfamily of PKC). Best sorted by **hardness family** (lattice / LWE, hash-based, code-based, …) and tagged by **job** (KEM vs signature) | [Crypto categories](orientation/crypto-categories.md) · [Motivation](orientation/motivation.md) · [History](orientation/history.md) · [PKC](#pkc) |
| **Public / secret key** | Publishable padlock vs private opener | [Public-key picture](fundamentals/public-key-picture.md) |
| **PWM** | Pointwise multiply of NTT-domain coefficients | [Poly-mul engines](concepts/poly-mul-engines.md) |
| **Quasi-cyclic (QC)** | Structure from rotations / polynomials mod $X^n-1$ | [Quasi-cyclic codes](concepts/quasi-cyclic-codes.md) |
| **Rank metric** | Error size = matrix rank after expanding symbols | [Rank metric](concepts/rank-metric.md) |
| **Reaction attack** | Learn secrets from decrypt success/fail bits | [QC-MDPC reaction explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md) |
| **Redundancy** | Extra symbols so noise can be corrected | [From bits to codes](bridge/from-bits-to-codes.md) |
| <a id="rsa"></a>**RSA** | Classical public-key scheme for encryption and signatures; Shor-vulnerable | [PKC](#pkc) · [Motivation](orientation/motivation.md) |
| **Security bits** | Attack-work slogan (e.g. $\sim 2^{128}$), not DFR | [Security bits](bridge/security-bits-and-work.md) |
| <a id="sha"></a>**SHA-2 / SHA-3** | Common cryptographic hash families (fixed-length fingerprints of data) | [Bits, XOR](fundamentals/bits-xor-randomness.md) · [Hash / XOF](concepts/hash-xof-keccak.md) |
| **Shuffling / hiding** | SCA countermeasure that randomizes operation order (not share values) | [Shuffling / hiding](concepts/shuffling-hiding.md) · [Masking shares](concepts/masking-shares.md) |
| **SIKE** | Historical isogeny KEM (broken NIST path) — study as history, not new deployments | [Isogenies, CSIDH, SIKE](concepts/isogeny-csidh-sike.md) |
| <a id="slh-dsa"></a>**SLH-DSA** | Stateless hash-based digital signature algorithm — NIST PQC signature standard (SPHINCS+ family) | [PQC](#pqc) · [Hash-based signatures](concepts/hash-based-signatures.md) · [Track](tracks/hash-based-signatures/ROADMAP.md) |
| **SNDL** | Store now, decrypt later — record ciphertext today, break keys when quantum arrives | [Motivation](orientation/motivation.md) |
| **SPHINCS+** | Stateless hash-based signature family (WOTS+ / FORS / hypertrees); SLH-DSA standardized form | [Hash-based signatures](concepts/hash-based-signatures.md) |
| **Sparse** | Low Hamming weight (few ones) | [Hamming metric](concepts/hamming-metric.md) |
| <a id="symmetric-crypto"></a>**Symmetric crypto** | Same shared secret locks and unlocks (or MACs) both sides — fast bulk tool after a session key exists | [Why cryptography?](fundamentals/why-cryptography.md) · [Crypto categories](orientation/crypto-categories.md) |
| **Syndrome** | $He^\top$ — fingerprint of the error under checks $H$ | [Syndrome decoding](concepts/syndrome-decoding.md) |
| **Syndrome decoding** | Find sparse $e$ matching a published syndrome | [Syndrome decoding](concepts/syndrome-decoding.md) |
| **SVP** | Shortest nonzero lattice vector (slogan) | [Lattices](fundamentals/lattices-gentle.md) |

## T–Z

| Term | Plain meaning | See |
|------|---------------|-----|
| <a id="tls"></a>**TLS** | Transport Layer Security — protocol that bundles key setup, signatures/certs, and symmetric crypto (HTTPS uses TLS) | [Crypto categories](orientation/crypto-categories.md) · [HTTPS](#https) |
| **Trapdoor** | Secret that makes a hard reverse easy for the owner | [Hard problems](fundamentals/hard-problems.md) |
| **Twiddle** | Precomputed root-of-unity power used inside NTT butterflies | [NTT butterfly](concepts/ntt-butterfly.md) |
| <a id="vpn"></a>**VPN** | Virtual private network — encrypted tunnel for traffic; usually classical or hybrid PKC + symmetric crypto under the hood | [Crypto categories](orientation/crypto-categories.md) · [TLS](#tls) |
| <a id="xof"></a>**XOF / SHAKE** | Extendable-output function — hash-like primitive that can emit a long bitstream (common in PQC sampling) | [Hash](#hash) · [Hash / XOF](concepts/hash-xof-keccak.md) |
| **XOR $\oplus$** | Same bits → $0$, different → $1$; addition in $\mathbb{F}_2$ | [Bits, XOR](fundamentals/bits-xor-randomness.md) |
| **WOTS+** | Hash-chain one-time signature used under Merkle / SPHINCS+ leaves | [Hash-based signatures](concepts/hash-based-signatures.md) |
| **Wrap-around ($X^n\equiv 1$)** | Fold high powers back to fixed length $n$ | [Polynomial wrap-around](fundamentals/polynomials-wraparound.md) |

## Symbol cheat strip

| Symbol | Say aloud |
|--------|-----------|
| $\oplus$ | XOR |
| $\equiv\pmod{n}$ | congruent mod $n$ (same leftover) |
| $\mathrm{wt}(e)$ | weight of $e$ |
| $H\mathbf{e}^\top=\mathbf{s}$ | $H$ times $e$ equals syndrome $s$ |
| $\Pr[\ldots]$ | probability that … |
| $2^{-128}$ | astronomically small probability |
| $2^{128}$ | enormous attack work (different job!) |

More symbol practice: [How to read the math](fundamentals/reading-math-notation.md).

## Next steps

- [Orientation](orientation/README.md)  
- [Index](index.md)  
- [Code-based roadmap](tracks/code-based-kems/ROADMAP.md)  
- [Lattice / LWE roadmap](tracks/lattice-lwe/ROADMAP.md)  
- [PQC hardware roadmap](tracks/pqc-hardware/ROADMAP.md)  
