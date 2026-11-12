# Crypto categories — a mindmap

**Prereqs:** [Motivation](motivation.md) · [History](history.md) · [Challenges](challenges.md) (recommended)  
**Next:** [How to read the math](../fundamentals/reading-math-notation.md) · [Why cryptography?](../fundamentals/why-cryptography.md) · [Public-key picture](../fundamentals/public-key-picture.md)

**Learning goals.** Place security *goals* (confidentiality, integrity, authentication, non-repudiation), symmetric vs asymmetric (PKC), shared unkeyed building blocks, encryption vs signatures vs key agreement vs KEMs, classical PKC and PQC *as asymmetric subfamilies*, AEAD vs MAC vs signature, and “protocols bundle tools” on one mental map — before the math pages.

## Why this map exists

Later pages dive into codes, lattices, and hardware. This page is a **teaching folder tree** (conceptual organization, not a rigid ontology): what kinds of crypto tools exist, what job each does, and how PQC fits. Shared primitives (hashes, XOFs, KDFs, randomness) can serve **both** symmetric and asymmetric schemes.

Skip freely; come back when a word feels fuzzy. Glossary: [PKC](../glossary.md#pkc) · [KEM](../glossary.md#kem) · [PQC](../glossary.md#pqc) · [AEAD](../glossary.md#aead) · [MAC](../glossary.md#mac) · [Hash](../glossary.md#hash) · [Integrity](../glossary.md#integrity) · [Authentication](../glossary.md#authentication) · [Non-repudiation](../glossary.md#non-repudiation).

## The maps

One giant mindmap is hard to read. This page uses:

1. a **roomy overview** matching the tool stack below, then  
2. **one detailed map per folder** in tabs (including Goals — *what crypto is for*, not a peer tool family).

### Overview

Symmetric and asymmetric are the two main tool families. Shared building blocks feed both. Protocols sit on top of the stack.

```pqc-mermaid
flowchart TB
  C(("Cryptography"))
  C --> S["Symmetric / keyed<br/>• AES / ChaCha20<br/>• AEAD<br/>• HMAC / CMAC"]
  C --> A["Asymmetric / PKC<br/>• Classical: RSA, ECC, DH<br/>• PQC: ML-KEM, ML-DSA, SLH-DSA"]
  S --> B["Shared building blocks<br/>Hash functions · XOFs · KDFs · Randomness"]
  A --> B
  B --> PR["Protocols and applications<br/>TLS · HTTPS · VPN · Secure Boot · IoT"]
  classDef hub fill:#0f766e,stroke:#5eead4,color:#ecfeff
  classDef leaf fill:#115e59,stroke:#99f6e4,color:#ecfeff
  class C hub
  class S,A,B,PR leaf
```

### Detail maps (one folder at a time)

=== "Goals"

    Not a tool shelf — four security *objectives* the tools above aim for.

    ```pqc-mermaid
    flowchart TB
      G["Goals"]
      G --> C["Confidentiality<br/>strangers cannot read"]
      G --> I["Integrity<br/>silent edits are detected"]
      G --> A["Authentication<br/>who/which key is speaking"]
      G --> N["Non-repudiation<br/>third-party evidence of signing"]
      C --> CE["Encryption / AEAD"]
      I --> IM["MAC / AEAD / signature"]
      A --> AM["MAC-AEAD shared key<br/>or signature public verify"]
      N --> NS["Digital signatures<br/>not plain MAC/AEAD"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class G,C,I,A,N,CE,IM,AM,NS n
    ```

=== "Symmetric"

    Keyed tools that share one secret on both sides. Ordinary unkeyed hashes live under Shared building blocks.

    ```pqc-mermaid
    flowchart TB
      S["Symmetric / keyed"]
      S --> E["AES / ChaCha<br/>encryption"]
      S --> AE["AEAD<br/>encrypt + integrity tag"]
      S --> M["HMAC / CMAC<br/>keyed MAC only"]
      S --> Q["Quantum note<br/>Grover - larger keys / tags"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class S,E,AE,M,Q n
    ```

=== "Shared building blocks"

    Usually **unkeyed** (or randomness) primitives reused by *both* symmetric and asymmetric schemes — conceptual shelf, not “a kind of PKC.”

    ```pqc-mermaid
    flowchart TB
      B["Shared building blocks"]
      B --> H["Hash / digest<br/>SHA-2 / SHA-3"]
      B --> X["XOF / SHAKE<br/>extendable output"]
      B --> K["KDF<br/>derive keys from secrets"]
      B --> R["Randomness<br/>fresh keys / nonces"]
      B --> N["Used by<br/>HMAC / signatures / KEMs / TLS"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class B,H,X,K,R,N n
    ```

=== "Asymmetric / PKC"

    Public + private key family. **Jobs** first; **classical** and **PQC** are subfamilies under this same branch.

    ```pqc-mermaid
    flowchart TB
      A["Asymmetric / PKC"]
      A --> J["Jobs"]
      J --> E["Public-key encryption"]
      J --> D["Digital signatures"]
      J --> K["Key agreement"]
      J --> M["KEM"]
      A --> CL["Classical PKC<br/>RSA / DH / ECC<br/>Shor-vulnerable"]
      A --> P["PQC<br/>ML-KEM / ML-DSA / SLH-DSA<br/>and more research families"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class A,J,E,D,K,M,CL,P n
    ```

=== "Classical PKC"

    Subcategory of asymmetric / PKC — widely used before the PQC transition; Shor-vulnerable.

    ```pqc-mermaid
    flowchart TB
      CL["Classical PKC<br/>under asymmetric"]
      CL --> R["RSA<br/>encryption and signatures"]
      CL --> DH["Diffie-Hellman DH<br/>shared secret only"]
      CL --> ECC["ECC<br/>ECDH agreement / ECDSA signatures"]
      CL --> SH["Shor-vulnerable<br/>migrate motivation"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class CL,R,DH,ECC,SH n
    ```

=== "PQC"

    Subcategory of asymmetric / PKC — algorithms for ordinary computers today; public-key layer meant to resist large quantum computers.

    ```pqc-mermaid
    flowchart TB
      P["PQC<br/>under asymmetric"]
      P --> N["NIST-era standards"]
      N --> K["ML-KEM - lattices"]
      N --> D["ML-DSA - lattices"]
      N --> H["SLH-DSA - hash-based"]
      P --> R["More KEMs / research<br/>code-based / multivariate / isogeny-adjacent"]
      P --> F["Hardness families<br/>lattice LWE / codes / hashes"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class P,N,K,D,H,R,F n
    ```

=== "Protocols"

    Real apps are bundles, not one algorithm.

    ```pqc-mermaid
    flowchart TB
      PR["Protocols / apps"]
      PR --> T["TLS / HTTPS"]
      PR --> V["VPN"]
      PR --> B["Secure Boot"]
      PR --> I["IoT / constrained links"]
      PR --> X["Hybrid migration<br/>classical + PQC together"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class PR,T,V,B,I,X n
    ```

## Branch guide (read with the maps)

### 1. Goals (what crypto is *for*)

| Goal | Plain English | Typical tools |
|------|---------------|---------------|
| **Confidentiality** | Strangers cannot *read* the content | Encryption; often [AEAD](../glossary.md#aead) |
| **Integrity** | Silent edits are *detected* | [MAC](../glossary.md#mac), AEAD tag, or signature |
| **Authentication** | You know *which key* produced the data | Shared-key MAC/AEAD **or** public-key signature |
| **Non-repudiation** | Third parties can check a signer’s mark (with key-identity assumptions) | [Digital signatures](../glossary.md#digital-signature) — **not** plain MAC/AEAD |

Real apps usually need several of these together.  
Deeper toys: [Why cryptography?](../fundamentals/why-cryptography.md).

### 2. AEAD vs MAC vs digital signature

This is the distinction that most helps when moving into PQC (where you will meet KEMs **and** signatures).

| Capability | [AEAD](../glossary.md#aead) | [MAC](../glossary.md#mac) | [Signature](../glossary.md#digital-signature) |
|------------|------|-----|-----------|
| Encryption (confidentiality) | Yes | No | No |
| Integrity | Yes | Yes | Yes |
| Shared-key authentication | Yes | Yes | No |
| Public verification | No | No | Yes |
| Third-party evidence of signer authorization | No | No | Yes — subject to key identity and security assumptions |

**Read-out:** AEAD/MAC prove “someone who knows the shared secret touched this.” A signature proves “the holder of this public verification key signed this,” which strangers can check without that secret.

### Quick self-check (auth)

Can a TLS record’s AEAD tag replace a certificate signature for proving the server’s long-term identity to a browser?  
<details><summary>Answer</summary>
No — AEAD is shared-key authentication for the session traffic. Long-term server identity uses <strong>signatures</strong> (and certificates) that outsiders can verify with a public key.
</details>

### 3. Symmetric, shared blocks, and asymmetric (PKC)

| | **Symmetric / keyed** | **Shared building blocks** | **Asymmetric / PKC** |
|--|----------------------|----------------------------|----------------------|
| Keys | Same secret both sides | Usually unkeyed (or RNG) | Public + private pair |
| Role | AES/ChaCha, AEAD, HMAC/CMAC | Hash, XOF, KDF, randomness | Encrypt / sign / agree / KEM |
| Quantum slogan | Grover → larger keys/tags | Larger digests / margins | Shor breaks **classical** PKC |

**Classical PKC** and **PQC** are two subfamilies *under* asymmetric / PKC — not separate top-level folders beside it.  
Glossary: [Symmetric crypto](../glossary.md#symmetric-crypto) · [Hash](../glossary.md#hash) · [KDF](../glossary.md#kdf) · [Asymmetric / PKC](../glossary.md#asymmetric-pkc) · [PKC](../glossary.md#pkc).

### 4. Four PKC *jobs* (do not mix the APIs)

| Job | Who uses which key | What you get |
|-----|--------------------|--------------|
| **Public-key encryption** | Encrypt with $\mathsf{pk}$; decrypt with $\mathsf{sk}$ | Confidentiality of a message |
| **Digital signature** | Sign with $\mathsf{sk}$; verify with $\mathsf{pk}$ | Integrity + authentication; often non-repudiation |
| **Key agreement** (e.g. DH / ECDH) | Both contribute; output a **shared secret** | A session secret — *not* “encrypt this email” by itself |
| **KEM** | $\mathsf{Encaps}(\mathsf{pk})\to(\mathsf{ct},K)$; $\mathsf{Decaps}(\mathsf{sk},\mathsf{ct})\to K$ | Fresh session key $K$ under a clean API |

Modern deployments lean on **KEMs** (and signatures) more than raw “encrypt a whole file with RSA.”  
Story page: [Public-key picture](../fundamentals/public-key-picture.md) · concept: [KEM](../concepts/kem.md).

### Quick self-check (PKC jobs)

Diffie–Hellman gives two parties a shared secret. Is that the same API as “encrypt a message under Alice’s public key”?  
<details><summary>Answer</summary>
No — DH is <strong>key agreement</strong>. Message encryption and KEMs are different jobs (related story, different algorithms / APIs).
</details>

### 5. Classical PKC vs PQC (both under asymmetric)

Both are **asymmetric / PKC** subfamilies.

**Classical PKC** (widely used *before* the PQC transition):

- **RSA** — public-key encryption and digital signatures  
- **Diffie–Hellman (DH)** — key agreement (shared secret), not direct encryption/signing  
- **Elliptic-curve cryptography (ECC)** — e.g. **ECDH** (agreement) and **ECDSA** (signatures)

A large enough quantum computer running **Shor’s algorithm** breaks these. That is a main reason for **PQC**.  
See [Motivation](motivation.md) · [History](history.md).

**Post-quantum cryptography (PQC)** — still public-key style algorithms classical computers can run *today*, designed so large quantum computers should not break that public-key layer.

| Role (NIST-era postcard) | Example slogan | Family |
|--------------------------|----------------|--------|
| KEM | ML-KEM | Lattices / Module-LWE |
| Signature | ML-DSA | Lattices |
| Signature | SLH-DSA | Hash-based |
| More KEMs / research | code-based, multivariate, … | See tracks |

Hardness-family postcard: [History](history.md). Tracks: [code-based](../tracks/code-based-kems/ROADMAP.md) · [lattice](../tracks/lattice-lwe/ROADMAP.md) · [hash-based signatures](../tracks/hash-based-signatures/ROADMAP.md) · [hardware](../tracks/pqc-hardware/ROADMAP.md).

### 6. Protocols are bundles

**TLS / HTTPS / VPN / Secure Boot / IoT stacks** are not one algorithm. They combine:

1. key establishment (KEM or key agreement, often **hybrid** classical + PQC during migration),  
2. **signatures** (and certificates) for long-term identity / authorization evidence,  
3. **symmetric** crypto (often AEAD) for bulk bytes,  
4. **hashes / KDFs** for transcripts and key derivation.

PQC mainly replaces the **public-key** pieces; AES-like tools and shared building blocks stay, often with larger margins.

## Common confusions

- “Encryption” in everyday speech often mixes confidentiality with integrity/authentication — they differ.  
- **Integrity ≠ authentication ≠ non-repudiation** — see the goals table and AEAD/MAC/signature comparison.  
- A **KEM is not a signature**.  
- **DH is not RSA encryption**.  
- **PQC** is not a third peer next to “symmetric” and “asymmetric” — it is an asymmetric / PKC subfamily.  
- A bare **hash** (SHA-2/3) is usually unkeyed — not the same shelf as AES or a shared-key MAC.  
- **AEAD/MAC** = shared-key authentication; **signatures** = public verification (and usually non-repudiation assumptions).  
- **PQC ≠ quantum communication**; PQC runs on ordinary computers.  
- Publishing a **public** key is intentional; the **private** key must stay secret.

## Next steps

1. [How to read the math](../fundamentals/reading-math-notation.md) — if symbols feel scary  
2. [Why cryptography?](../fundamentals/why-cryptography.md) — slower toys for goals + symmetric vs PKC  
3. [Public-key picture](../fundamentals/public-key-picture.md) — padlock story + KEM API  
4. [Glossary](../glossary.md) — jump back whenever a label blurs  
