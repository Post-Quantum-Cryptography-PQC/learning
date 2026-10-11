# History — a short PQC timeline

**Prereqs:** [Motivation](motivation.md)  
**Next:** [Problems](problems.md)

**Learning goals.** Place classical public-key crypto, early PQC ideas, the NIST competition, and today’s standards on one mental timeline — without memorizing every year.

## Why a timeline helps

PQC is not a brand-new idea that appeared the day NIST finished. Some families (especially **code-based** McEliece-style crypto) are decades old. What changed is **urgency** (quantum threat + recorded traffic) and **standardization** (shared parameters, test vectors, protocol drafts).

## Postcard timeline

| Era | What mattered | Plain takeaway |
|-----|---------------|----------------|
| **1970s** | Public-key crypto becomes practical (Diffie–Hellman, RSA ideas) | Honest parties can agree on secrets without a prior shared key |
| **1978** | McEliece proposes public-key encryption from **error-correcting codes** | “Hard decoding” as a crypto puzzle — a PQC ancestor *before* “PQC” was a buzzword |
| **1990s–2000s** | Lattice / LWE-style hardness enters crypto seriously; more code-based and hash-based designs | Alternative public-key families mature in research |
| **1994 / 1996** | Shor / Grover quantum algorithms (theory) | RSA/ECC face a future quantum break; symmetric needs larger margins |
| **2010s** | “Store now, decrypt later” becomes a planning slogan; hybrid thinking grows | Migration is a multi-year systems problem, not a weekend patch |
| **2016–2024** | NIST Post-Quantum Cryptography project: call → rounds → selections | Community stress-tests candidates in public |
| **2024 onward** | Standards such as **ML-KEM**, **ML-DSA**, **SLH-DSA**; more KEMs (e.g. code-based paths) continue | Deployers get concrete algorithms; research does not stop |

Dates above are **orientation slogans**, not a legal chronology. When a paper cites a year, trust that paper’s bibliography.

## Four families you will meet (names only)

You do not need definitions yet — only the postcard:

| Family | Hardness slogan (later pages unpack) | Flavor |
|--------|--------------------------------------|--------|
| **Lattice / LWE** | Noisy linear equations stay hard | Basis of ML-KEM / ML-DSA-style designs |
| **Code-based** | Decoding a random-looking linear code is hard | McEliece / QC-MDPC / HQC-shaped ideas |
| **Hash-based** | Hash preimages / few-time signatures | SLH-DSA (SPHINCS+) style |
| **Others** | Multivariate, isogeny-adjacent, … | Important in research; fewer “default deploy” slots today |

This curriculum spends the most time on **codes** and **lattices**, plus a **hardware** track for how chips implement the arithmetic.

## Standardization vs research

| Body / world | Role |
|--------------|------|
| **NIST** | Selects / standardizes algorithms many products will ship |
| **IETF / TLS world** | Puts algorithms into protocols |
| **IACR + ePrint** | Theory, cryptanalysis, new schemes |
| **IEEE / CHES-style HW** | Accelerators, SCA, systems engineering |

**Standards freeze a snapshot.** Research keeps attacking, improving, and measuring. Both matter: standards for deployers; papers for understanding *why* parameters look the way they do.

### Quick self-check

Was code-based public-key crypto invented *after* NIST’s PQC project?  
<details><summary>Answer</summary>
No — McEliece (1978) is much earlier. NIST popularized and stress-tested modern parameter sets and families; it did not invent the idea of “codes as crypto.”
</details>

## Next

[Problems](problems.md) — what “easy forward, hard backward” means before any matrices.
