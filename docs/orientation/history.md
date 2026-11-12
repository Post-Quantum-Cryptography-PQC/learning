# History — a short PQC timeline

**Prereqs:** [Motivation](motivation.md)  
**Next:** [Problems](problems.md)

**Learning goals.** After this page you can:

- Sketch when classical [public-key cryptography (PKC)](../glossary.md#pkc) (RSA / Diffie–Hellman / ECC) appeared
- Sketch when early PQC ideas, quantum algorithms (Shor / Grover), and later standardization arrived
- Name the main PQC hardness families, and that **NIST is not the only** standards path (e.g. ISO/IEC)

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
| **2024 onward** | More standardization continues (e.g. additional KEMs such as **HQC** on the NIST path; **ISO/IEC** work on KEMs including ML-KEM, Classic McEliece, FrodoKEM) | Research and other standards bodies do not stop when one FIPS lands |

## Hardness families you will meet (names only)

You do not need full definitions yet — only the postcard. These are **math families**, not “NIST winners vs losers.”

| Family | Hardness slogan (later pages unpack) | Examples / notes |
|--------|--------------------------------------|------------------|
| **Lattice / LWE** | Noisy linear equations stay hard | ML-KEM / ML-DSA; also FrodoKEM-style plain LWE designs |
| **Code-based** | Decoding a random-looking linear code is hard | McEliece / Classic McEliece; HQC-shaped; QC-MDPC ideas |
| **Hash-based** | Hash one-wayness + few-time / tree constructions | SLH-DSA (SPHINCS+) style |
| **Multivariate** | Solving systems of multivariate equations stays hard | Signature research and some competition / national tracks |
| **Isogeny-related** | Hard problems on isogenies of elliptic curves | Important historically (e.g. SIKE context); treat with care after breaks |

This curriculum spends the most time on **codes** and **lattices**, plus a **hardware** track for how chips implement the arithmetic. Multivariate and isogeny pages stay lighter unless you open those tracks.

## Standardization vs research

| Body / world | Role |
|--------------|------|
| **NIST** | Runs a major public process; FIPS / SP documents many products follow (ML-KEM, ML-DSA, SLH-DSA, …) |
| **ISO/IEC** | International standards (e.g. asymmetric ciphers / KEMs in the ISO/IEC 18033 family) — can include schemes beyond a single NIST primary pick |
| **IETF / TLS world** | Puts algorithms into internet protocols |
| **National guidance** | Some agencies recommend or allow additional algorithms for conservative use |
| **IACR + ePrint** | Theory, cryptanalysis, new schemes |
| **IEEE / CHES-style HW** | Accelerators, SCA, systems engineering |

**Not selected as a NIST primary standard ≠ “rejected by cryptography.”** Other standards bodies and national profiles may still standardize or recommend a scheme. **Standards freeze a snapshot**; research keeps attacking, improving, and measuring. Both matter: standards for deployers; papers for understanding *why* parameters look the way they do.

### Quick self-check

Was code-based public-key crypto invented *after* NIST’s PQC project?  
<details><summary>Answer</summary>
No — McEliece (1978) is much earlier. NIST popularized and stress-tested modern parameter sets and families; it did not invent the idea of “codes as crypto.”
</details>

### Quick self-check (standards)

If a scheme is not a NIST FIPS primary pick, does that mean no standard will ever use it?  
<details><summary>Answer</summary>
No — for example, ISO/IEC and some national guidance have paths for algorithms (such as Classic McEliece or FrodoKEM-style KEMs) alongside or beyond NIST’s first FIPS set.
</details>

## Next

[Problems](problems.md) — what “easy forward, hard backward” means before any matrices.
