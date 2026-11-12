# Crypto categories — a mindmap

**Prereqs:** [Motivation](motivation.md) · [History](history.md) · [Challenges](challenges.md) (recommended)  
**Next:** [How to read the math](../fundamentals/reading-math-notation.md) · [Why cryptography?](../fundamentals/why-cryptography.md) · [Public-key picture](../fundamentals/public-key-picture.md)

**Learning goals.** Place confidentiality vs authenticity, symmetric vs asymmetric (PKC), unkeyed hashes, encryption vs signatures vs key agreement vs KEMs, classical PKC and PQC *as asymmetric subfamilies*, and “protocols bundle tools” on one mental map — before the math pages.

## Why this map exists

Later pages dive into codes, lattices, and hardware. This page is the **folder tree**: what kinds of crypto tools exist, what job each does, and how PQC fits.

Skip freely; come back when a word feels fuzzy. Glossary: [PKC](../glossary.md#pkc) · [KEM](../glossary.md#kem) · [PQC](../glossary.md#pqc) · [AEAD](../glossary.md#aead) · [MAC](../glossary.md#mac) · [Hash](../glossary.md#hash).

## The maps

One giant mindmap is hard to read. This page uses:

1. a **roomy overview** (top folders + asymmetric subfamilies), then  
2. **one detailed map per folder** in tabs below.

### Overview

```pqc-mermaid
flowchart TB
  C(("Cryptography"))
  C --> G["Goals<br/>why we encrypt / sign"]
  C --> S["Symmetric<br/>shared secret - keyed"]
  C --> H["Hash / digests<br/>usually unkeyed"]
  C --> A["Asymmetric / PKC<br/>public + private key"]
  C --> PR["Protocols / hybrids<br/>TLS / HTTPS / VPN"]
  A --> CL["Classical PKC<br/>RSA / DH / ECC"]
  A --> P["PQC<br/>post-quantum public-key"]
  classDef hub fill:#0f766e,stroke:#5eead4,color:#ecfeff
  classDef leaf fill:#115e59,stroke:#99f6e4,color:#ecfeff
  class C hub
  class G,S,H,A,PR,CL,P leaf
```

### Detail maps (one folder at a time)

=== "Goals"

    Confidentiality vs authenticity — you can have one without the other.

    ```pqc-mermaid
    flowchart TB
      G["Goals"]
      G --> C["Confidentiality<br/>strangers cannot read"]
      G --> A["Authenticity / integrity<br/>strangers cannot forge or silently edit"]
      G --> B["Often both<br/>HTTPS / chat / banking"]
      C --> CT["Encryption"]
      A --> AT["Signatures / MACs"]
      B --> AE["AEAD<br/>secrecy + integrity together"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class G,C,A,B,CT,AT,AE n
    ```

=== "Symmetric"

    Keyed tools that share one secret on both sides — great after a session key exists. Ordinary hashes are *not* listed here (see Hash / digests).

    ```pqc-mermaid
    flowchart TB
      S["Symmetric - keyed"]
      S --> K["Same shared secret both sides"]
      S --> F["Fast bulk crypto"]
      S --> E["Encryption<br/>AES / ChaCha"]
      S --> M["MAC / HMAC / AEAD<br/>keyed integrity or both"]
      S --> Q["Quantum note<br/>Grover - larger keys / tags"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class S,K,F,E,M,Q n
    ```

=== "Hash / digests"

    Ordinary cryptographic hashes are **unkeyed** primitives (no shared secret). They feed many constructions — MACs, signatures, KEMs, transcripts — without being “symmetric crypto” themselves.

    ```pqc-mermaid
    flowchart TB
      H["Hash / digests<br/>usually unkeyed"]
      H --> S["SHA-2 / SHA-3<br/>fixed-length fingerprint"]
      H --> X["XOF / SHAKE<br/>extendable output"]
      H --> U["Used by<br/>HMAC / signatures / PQC / transcripts"]
      H --> N["Not a shared-key cipher<br/>and not a signature by itself"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class H,S,X,U,N n
    ```

=== "Asymmetric / PKC"

    Public + private key family. **Jobs** first; **classical** and **PQC** are subfamilies under this same branch (not peer folders next to “asymmetric”).

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
      PR["Protocols / hybrids<br/>TLS / HTTPS / VPN"]
      PR --> K["KEM or key agreement<br/>session setup"]
      PR --> S["Signatures<br/>authenticity / certificates"]
      PR --> Y["Symmetric<br/>bulk data"]
      PR --> H["Hashes<br/>transcripts / derivations"]
      PR --> X["Hybrid migration<br/>classical + PQC together"]
      classDef n fill:#115e59,stroke:#99f6e4,color:#ecfeff
      class PR,K,S,Y,H,X n
    ```

## Branch guide (read with the maps)

### 1. Goals (what crypto is *for*)

| Goal | Plain English | Typical tools |
|------|---------------|---------------|
| **Confidentiality** | Strangers cannot *read* the content | Encryption (symmetric or public-key) |
| **Authenticity / integrity** | Strangers cannot *forge or silently edit* | Signatures, [MACs](../glossary.md#mac) |
| **Often both** | Real apps usually need secrecy *and* authenticity | [AEAD](../glossary.md#aead) packages both; HTTPS / chat / banking |

You can have one without the other. Real apps usually need **both**.  
Deeper toys: [Why cryptography?](../fundamentals/why-cryptography.md).

### 2. Symmetric, hashes, and asymmetric (PKC)

| | **Symmetric** | **Hash / digests** | **Asymmetric / PKC** |
|--|---------------|--------------------|----------------------|
| Keys | Same secret both sides | Usually **unkeyed** | Public + private pair |
| Role | Fast bulk encrypt / MAC / AEAD | Fingerprint data; building block | First meeting, encrypt/sign/agree/KEM |
| Quantum slogan | Grover → larger keys/tags | Larger digests for margin | Shor breaks **classical** PKC |

**Classical PKC** and **PQC** are two subfamilies *under* asymmetric / PKC — not separate top-level folders beside it.  
**Asymmetric** and **public-key cryptography (PKC)** mean the same family here.  
Glossary: [Symmetric crypto](../glossary.md#symmetric-crypto) · [Hash](../glossary.md#hash) · [Asymmetric / PKC](../glossary.md#asymmetric-pkc) · [PKC](../glossary.md#pkc).

### 3. Four PKC *jobs* (do not mix the APIs)

| Job | Who uses which key | What you get |
|-----|--------------------|--------------|
| **Public-key encryption** | Encrypt with $\mathsf{pk}$; decrypt with $\mathsf{sk}$ | Confidentiality of a message |
| **Digital signature** | Sign with $\mathsf{sk}$; verify with $\mathsf{pk}$ | Authenticity / integrity |
| **Key agreement** (e.g. DH / ECDH) | Both contribute; output a **shared secret** | A session secret — *not* “encrypt this email” by itself |
| **KEM** | $\mathsf{Encaps}(\mathsf{pk})\to(\mathsf{ct},K)$; $\mathsf{Decaps}(\mathsf{sk},\mathsf{ct})\to K$ | Fresh session key $K$ under a clean API |

Modern deployments lean on **KEMs** (and signatures) more than raw “encrypt a whole file with RSA.”  
Story page: [Public-key picture](../fundamentals/public-key-picture.md) · concept: [KEM](../concepts/kem.md).

### Quick self-check

Diffie–Hellman gives two parties a shared secret. Is that the same API as “encrypt a message under Alice’s public key”?  
<details><summary>Answer</summary>
No — DH is <strong>key agreement</strong>. Message encryption and KEMs are different jobs (related story, different algorithms / APIs).
</details>

### 4. Classical PKC vs PQC (both under asymmetric)

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

### 5. Protocols are bundles

**HTTPS / TLS / VPN** are not one algorithm. They combine:

1. key establishment (KEM or key agreement, often **hybrid** classical + PQC during migration),  
2. **signatures** (and certificates) for who you are talking to,  
3. **symmetric** crypto for the bulk bytes.

PQC mainly replaces the **public-key** pieces; AES-like tools stay, often with larger margins.

## Common confusions

- “Encryption” in everyday speech often mixes confidentiality with authenticity — they differ.  
- A **KEM is not a signature**.  
- **DH is not RSA encryption**.  
- **PQC** is not a third peer next to “symmetric” and “asymmetric” — it is an asymmetric / PKC subfamily.  
- A bare **hash** (SHA-2/3) is usually unkeyed — not the same shelf as AES or a shared-key MAC.  
- **PQC ≠ quantum communication**; PQC runs on ordinary computers.  
- Publishing a **public** key is intentional; the **private** key must stay secret.

## Next steps

1. [How to read the math](../fundamentals/reading-math-notation.md) — if symbols feel scary  
2. [Why cryptography?](../fundamentals/why-cryptography.md) — slower toys for goals + symmetric vs PKC  
3. [Public-key picture](../fundamentals/public-key-picture.md) — padlock story + KEM API  
4. [Glossary](../glossary.md) — jump back whenever a label blurs  
