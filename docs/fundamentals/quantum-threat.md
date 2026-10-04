# Why quantum computers change crypto

**Prereqs:** [Hard problems](hard-problems.md) · [Public-key picture](public-key-picture.md)  
**Next:** [Bridge overview](../bridge/README.md) · [Lattices (gentle)](lattices-gentle.md)

**Learning goals.** Explain “store now, decrypt later,” what Shor vs Grover change in plain language, what post-quantum cryptography means, why you do **not** need a quantum computer to *use* PQC, and where code-based vs lattice families fit.

## Why this page exists

You now know why crypto exists, how keys work, and what hard problems are for.  
This page answers: **why are people changing the internet’s cryptography at all?**

No quantum physics homework. Only slogans you need for PQC motivation.

## The threat in one story

Today, many websites use RSA or elliptic-curve methods so your browser can set up keys.

A powerful enough **quantum computer** (if built at scale) could break those methods using **Shor’s algorithm**.

An adversary can:

1. record ciphertext **today**,  
2. wait until a big quantum machine exists,  
3. decrypt the old recording **later**.

That is **store now, decrypt later** (sometimes called SNDL).  

Long-lived secrets (medical files, state archives, identity keys) are especially exposed. That is why migration planning started early — not because a world-breaking machine ships next Tuesday, but because recorded traffic lasts.

### Slow-motion timeline

| When | What happens |
|------|----------------|
| Today | Eve records HTTPS / VPN ciphertext under RSA/ECC |
| Years later | Large quantum computer exists |
| Then | Eve runs Shor-style attacks on recorded handshakes / ciphertexts |
| Result | Old “secret” traffic may become readable |

### Quick self-check

Does store-now-decrypt-later require Eve to break the crypto *today*?  
<details><summary>Answer</summary>
No — she only needs to record today and break later.
</details>

## Two quantum algorithms (only slogans)

### Shor (the breaker of RSA/ECC)

Shor’s algorithm efficiently factors large integers and solves discrete logarithms.  
Those are exactly the hard problems behind widely deployed public-key crypto today.

**Result:** RSA and elliptic-curve Diffie–Hellman are not quantum-safe.

**Picture:** the classical “hard backward” directions for RSA/ECC become easy for a large quantum computer.

### Grover (the square-root search speedup)

Grover speeds up unstructured search. Rough cartoon: an effort that felt like $2^{128}$ classical tries might behave more like $2^{64}$ quantum queries in idealized models.

**Result:** symmetric crypto (AES) is **weakened**, not destroyed. People use larger keys (e.g. AES-256) to keep comfortable margins.

| Algorithm | Targets | Informal effect |
|-----------|---------|-----------------|
| Shor | Factoring / discrete log (RSA, ECC) | Breaks those public-key schemes |
| Grover | Generic search (e.g. brute-force key search) | Square-root speedup; enlarge symmetric keys |

Do not mix Shor and Grover in your head: they are different threats.

### Quick self-check

Which one breaks RSA: Shor or Grover?  
<details><summary>Answer</summary>
Shor.
</details>

## What “post-quantum cryptography” means

**PQC** = algorithms that run on **ordinary classical computers** (phones, laptops, servers) but are designed to resist both classical and quantum attacks.

You install PQC software the same way you install any crypto library.  
You do **not** need to own a quantum computer to be safe from one.

### Not the same as QKD

**Quantum key distribution** uses special quantum communication hardware.  
Different topic. PQC is classical algorithms with quantum-resistant assumptions.

| | PQC | QKD |
|--|-----|-----|
| Runs on | Classical computers | Needs quantum channel / hardware |
| Goal | Quantum-resistant algorithms | Key distribution using quantum physics |
| This curriculum | Yes — main topic | Out of scope |

## New hard problems (families)

| Family | Slogan | Role today |
|--------|--------|------------|
| Lattices (LWE-style) | noisy linear equations | NIST primary KEM/signatures (ML-KEM, ML-DSA) |
| Codes | sparse decoding / related | Classic McEliece, HQC, … — this curriculum’s TIT focus |
| Hashes | hash-based signatures | SLH-DSA / SPHINCS+ family |
| Multivariate | systems of equations | some signatures / research |
| Isogenies | maps between elliptic curves | several candidates broken — reminder that PQC needs cryptanalysis |

“Quantum-resistant” is a **belief based on cryptanalysis**, not a magic sticker.

### Where this lab takes you

- **Code-based track:** densest beginner paper explainers today.  
- **Lattice track:** grids → LWE → Module-LWE vocabulary for ML-KEM-shaped schemes.  
- Both matter; you can learn either fork after fundamentals.

## Comparison table (keep this)

| Scheme family | Hard problem flavor | Quantum status (informal) |
|---------------|---------------------|---------------------------|
| RSA | Factoring | Broken by Shor |
| ECC DH | Discrete log | Broken by Shor |
| AES-256 | Symmetric cipher | Still used; sized with Grover in mind |
| Code-based KEM | Decoding-like | Believed PQC family |
| Lattice KEM | LWE-style | Believed PQC; NIST primary |
| Hash-based signature | Hash properties | Believed PQC |

## Hybrid migration (real world)

Many systems temporarily run **classical + PQC** together so that an attacker must break both.  
That is engineering caution during transition.

**Picture:** two padlocks on the box; Eve must open both. If either remains strong, the secret holds (under that design).

## What you should / should not fear

**Do take seriously:** long-term confidentiality of data encrypted under RSA/ECC today.  
**Do not conclude:** “all crypto is dead” or “my chat app is doomed tomorrow morning.”  
**Do learn:** which mathematical assumptions your tools are moving toward.

### Emotional contract

PQC migration is a multi-year engineering project for the whole internet.  
Your job as a learner is to understand the *why* and the *new puzzles* — not to panic.

## Bridge into this curriculum

You now have motivation.  

**Code-based path:** [Bridge README](../bridge/README.md) → codes, syndromes, McEliece → concepts → TIT explainers.  

**Lattice path:** [Lattices (gentle)](lattices-gentle.md) → [LWE story](../bridge/noisy-linear-equations-lwe.md) → [Lattice track](../tracks/lattice-lwe/ROADMAP.md).

## Common confusions

- Quantum computers do not break every algorithm.  
- Using PQC ≠ owning quantum hardware.  
- Post-quantum ≠ “uses quantum physics in the protocol.”  
- A broken PQC candidate means cryptanalysis worked — not that the whole field failed.  
- Grover does not “Shor-break” AES.

## Big practice set

1. What does “store now, decrypt later” mean?  
2. Which algorithm threatens RSA?  
3. Does AES become useless under Grover?  
4. Name one PQC family besides lattices.  
5. Do you need a quantum laptop to run ML-KEM or HQC?  
6. True or false: PQC and QKD are the same thing.  
7. Why might a hospital care about SNDL more than a one-time lunch plan emoji?  

<details><summary>Answers</summary>

1. Record ciphertext now; decrypt when a quantum attacker exists.  
2. Shor’s algorithm.  
3. No — usually increase key sizes; it is not an RSA-style break.  
4. Codes (or hashes / multivariate).  
5. No.  
6. False.  
7. Medical data must stay confidential for many years; lunch plans age fast.

</details>

## Check yourself (quick)

1. Shor vs Grover: which breaks RSA?  
2. What does PQC run on?  
3. Why migrate before huge quantum machines exist?  
4. Name NIST’s primary KEM family flavor (lattice or codes)?  

<details><summary>Answers</summary>

1. Shor.  
2. Classical computers.  
3. Store-now-decrypt-later risk for long-lived secrets.  
4. Lattice (ML-KEM / LWE-style) — codes remain important too.

</details>

## Next steps

- **Code-based next:** [Bridge overview](../bridge/README.md) · [Code-based KEMs roadmap](../tracks/code-based-kems/ROADMAP.md)  
- **Lattice next:** [Lattices (gentle)](lattices-gentle.md) · [Lattice / LWE roadmap](../tracks/lattice-lwe/ROADMAP.md)  
- Index: [learn/index.md](../index.md)  
