# History — a short PQC timeline

**Prereqs:** [Motivation](motivation.md)  
**Next:** [Problems](problems.md)

**Learning goals.** After this page you can:

- Put classical [PKC](../glossary.md#pkc) (Diffie–Hellman, RSA, ECC), McEliece (1978), Shor / Grover, and later PQC standards in the right historical order
- Name the main hardness families: lattice / LWE, code-based, hash-based, multivariate, and isogeny-related
- Explain what **NIST** and **ISO/IEC** each focus on when they standardize PQC algorithms

## Why a timeline helps

PQC is not a brand-new idea that appeared the day NIST finished. Some families (especially **code-based** McEliece-style crypto) are decades old. What changed is **urgency** (quantum threat + recorded traffic) and **standardization** (shared parameters, test vectors, protocol drafts).

## Short chronology

| Year / era | What happened | Plain takeaway |
|------------|---------------|----------------|
| **1976** | Diffie–Hellman public-key agreement | Parties can agree on a secret without a prior shared key |
| **1977–1978** | RSA public-key encryption / signatures | Classical PKC becomes practical for many products |
| **1978** | McEliece proposes public-key encryption from **error-correcting codes** | “Hard decoding” as a crypto puzzle — a PQC ancestor *before* the name “PQC” |
| **1994** | Shor’s algorithm (theory) | Factoring / discrete log — and thus RSA / ECC — face a future quantum break |
| **1996** | Grover’s algorithm (theory) | Symmetric search gets a milder square-root speedup → larger keys / margins |
| **mid-1990s–2000s** | Lattice / LWE-style hardness enters crypto; more code-based and hash-based designs | Alternative public-key families mature in research |
| **2016** | NIST opens the Post-Quantum Cryptography standardization project | Public call → multi-round evaluation of candidates |
| **2022–2024** | First NIST selections; **ML-KEM**, **ML-DSA**, **SLH-DSA** published as standards (FIPS 203/204/205) | Deployers get concrete algorithms for KEM + signatures |
| **2024 onward** | More work continues (e.g. additional KEMs such as **HQC** on the NIST path; **ISO/IEC** KEMs including ML-KEM, Classic McEliece, FrodoKEM) | Different standards bodies keep refining the toolbox |

## Hardness families you will meet (names only)

You do not need full definitions yet — only the postcard. These rows are **math families** (where the hardness comes from).

| Family | Hardness slogan (later pages unpack) | Examples / notes |
|--------|--------------------------------------|------------------|
| **Lattice / LWE** | Noisy linear equations stay hard | ML-KEM / ML-DSA; also FrodoKEM-style plain LWE designs |
| **Code-based** | Decoding a random-looking linear code is hard | McEliece / Classic McEliece; HQC-shaped; QC-MDPC ideas |
| **Hash-based** | Hash one-wayness + few-time / tree constructions | SLH-DSA (SPHINCS+) style |
| **Multivariate** | Solving systems of multivariate equations stays hard | Signature research and some competition / national tracks |
| **Isogeny-related** | Hard problems on isogenies of elliptic curves | Important historically (e.g. SIKE context); treat with care after breaks |

This curriculum spends the most time on **codes** and **lattices**, plus a **hardware** track for how chips implement the arithmetic. Multivariate and isogeny pages stay lighter unless you open those tracks.

## Standardization vs research

Two large standards paths beginners hear about first:

| Body | What its PQC selection tends to focus on | Examples you will see named |
|------|------------------------------------------|-----------------------------|
| **NIST** | A **public multi-round competition** aimed at algorithms many general-purpose products can ship: strong security analysis, plus practical size/speed for broad IT and internet use. Results appear as U.S. **FIPS** / SP documents that many vendors follow worldwide. | ML-KEM, ML-DSA, SLH-DSA; further KEMs (e.g. HQC) on the same program |
| **ISO/IEC** | **International** algorithm standards (e.g. asymmetric ciphers / KEMs in the ISO/IEC 18033 family). The portfolio can include high-performance choices **and** more conservative or niche profiles (different key/ciphertext size trade-offs), for countries and industries that adopt ISO/IEC documents. | ML-KEM together with Classic McEliece and FrodoKEM-style KEMs in that work |

Other rooms in the same building:

| Body / world | Role |
|--------------|------|
| **IETF / TLS world** | Puts algorithms into internet protocols |
| **National guidance** | Country-level recommendations for government and industry migration |
| **IACR + ePrint** | Theory, cryptanalysis, new schemes |
| **IEEE / CHES-style HW** | Accelerators, SCA, systems engineering |

**Standards freeze a snapshot** for implementers. Research keeps attacking, improving, and measuring — that is how parameter choices and later revisions stay honest.

### Quick self-check

Was code-based public-key crypto invented *after* NIST’s PQC project?  
<details><summary>Answer</summary>
No — McEliece (1978) is much earlier. NIST stress-tested modern parameter sets in a public competition; it did not invent the idea of “codes as crypto.”
</details>

### Quick self-check (standards)

In one sentence each, what do NIST and ISO/IEC mainly optimize for when they standardize PQC?  
<details><summary>Answer</summary>
NIST: a public competition for broadly deployable general-purpose algorithms (FIPS/SP). ISO/IEC: international algorithm standards that can cover several KEM profiles (performance and conservative / niche trade-offs) for global adoption.
</details>

## Next

[Problems](problems.md) — what “easy forward, hard backward” means before any matrices.
