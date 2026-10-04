# Public-key crypto in one picture

**Prereqs:** [Why cryptography?](why-cryptography.md) · [Hard problems](hard-problems.md)  
**Next:** [Quantum threat](quantum-threat.md) · [Vectors](vectors-matrices.md)

**Learning goals.** Explain public vs secret keys with the padlock story, walk Encaps/Decaps in plain English, say why real systems combine public-key crypto with AES-like tools, and separate correctness from security.

## Why this page exists

The internet constantly asks: “How do I start a private conversation with someone I have never met?”  
Public-key cryptography is the standard answer. This page is almost all story — math comes in later pages.

If [Why cryptography?](why-cryptography.md) was “what crypto is for,” this page is “how strangers start.”

## The padlock story (read slowly)

You want strangers to send you secrets.

1. You buy many identical open **padlocks** and hang them on a public hook. Anyone may take one.  
2. Only you own the physical **key** that opens those padlocks.  
3. Bob writes a session password on paper, locks it in a box with your padlock, and ships the box.  
4. You open the box. Now both of you know the session password.  
5. You switch to fast everyday locks (symmetric crypto) for the rest of the chat.

In crypto language:

| Story object | Crypto name | Symbol |
|--------------|-------------|--------|
| open padlock | public key | $\mathsf{pk}$ |
| physical opening key | secret key | $\mathsf{sk}$ |
| locked box | ciphertext | $\mathsf{ct}$ |
| session password | shared / session key | $K$ |

### Limits of the analogy

- Real “padlocks” are math functions, not metal.  
- Signatures are a different story (“only I can stamp; anyone can check the stamp”).  
- You still need a way to believe a padlock truly belongs to the bank (certificates / PKI) — protocol layer above this page.  
- Eve can copy the locked box; she should still fail to learn $K$.

### Quick self-check

Which one do you publish on a website: $\mathsf{pk}$ or $\mathsf{sk}$?  
<details><summary>Answer</summary>
$\mathsf{pk}$ (public key).
</details>

## Key pairs

$\mathsf{KeyGen}$ produces $(\mathsf{pk},\mathsf{sk})$.

- Publish $\mathsf{pk}$ widely.  
- Guard $\mathsf{sk}$ like a password (usually better than a password — hardware, limited access).

If $\mathsf{sk}$ leaks, the padlock is useless for secrecy going forward (and maybe backward for recorded traffic — see store-now-decrypt-later on the [quantum threat](quantum-threat.md) page).

### Slow-motion KeyGen (English only)

1. Run a randomized algorithm.  
2. Receive a matching pair $(\mathsf{pk},\mathsf{sk})$.  
3. Publish $\mathsf{pk}$. Store $\mathsf{sk}$ privately.  
4. Never email $\mathsf{sk}$ to yourself “for backup” on an unsafe channel.

## KEM — the modern API (still English)

A **key encapsulation mechanism** is a clean interface for “send me a fresh session key under my public key.”

1. $\mathsf{Encaps}(\mathsf{pk})\to (\mathsf{ct}, K)$  
   - $\mathsf{ct}$: ciphertext to send  
   - $K$: fresh random session key (Bob learns it immediately)  
2. $\mathsf{Decaps}(\mathsf{sk},\mathsf{ct})\to K$  
   - Alice recovers the **same** $K$ (except with tiny failure probability in some schemes)

Bob does **not** send $K$ in the clear. He sends $\mathsf{ct}$; $K$ is recovered through the trapdoor.

### Walkthrough with names

| Step | Who | Action | Result |
|------|-----|--------|--------|
| 0 | Alice | KeyGen | $(\mathsf{pk},\mathsf{sk})$; publish $\mathsf{pk}$ |
| 1 | Bob | Encaps$(\mathsf{pk})$ | $(\mathsf{ct}, K)$; send $\mathsf{ct}$ |
| 2 | Alice | Decaps$(\mathsf{sk},\mathsf{ct})$ | recovers $K$ |
| 3 | Both | Use $K$ | Symmetric encrypt the chat / file |

### Why not encrypt a whole movie with the padlock?

Public-key operations are typically heavier. Symmetric crypto (AES, ChaCha) is extremely fast.

**Hybrid pattern (almost universal):**

1. Use a KEM (or similar) to agree on a short $K$.  
2. Encrypt the movie under $K$ with symmetric crypto.

**Analogy:** use the fancy bank padlock once to deliver a house key; then use the house key for every door inside.

## Roles table

| Who | Knows | Goal |
|-----|-------|------|
| Alice | $\mathsf{sk}$, publishes $\mathsf{pk}$ | Recover $K$ from $\mathsf{ct}$ |
| Bob | $\mathsf{pk}$ | Produce $(\mathsf{ct},K)$ |
| Eve | $\mathsf{pk}$, sees $\mathsf{ct}$ | Should not learn $K$ |

### What Eve is allowed to know

- The algorithm (Kerckhoffs).  
- $\mathsf{pk}$.  
- $\mathsf{ct}$ on the wire.  

What Eve should **not** learn: $K$ or $\mathsf{sk}$.

## Correctness vs security (say it twice)

- **Correctness:** honest Alice usually recovers Bob’s $K$.  
- **Security:** Eve without $\mathsf{sk}$ should not learn $K$.

Some code-based KEMs allow an astronomically small chance Alice fails (**DFR**). That is a correctness detail with security-proof consequences — see [Probability](probability-gentle.md) and later [DFR](../concepts/dfr.md).

Lattice KEMs also need noise small enough for Alice to round correctly — different math, similar “correctness budget” idea.

### Quick self-check

If Alice recovers the wrong $K$ once in a blue moon, is that mainly a correctness issue or an Eve-broke-it issue?  
<details><summary>Answer</summary>
Correctness (honest failure) — unless the failure somehow helps Eve; that interaction is a later, subtler topic.
</details>

## Signatures (postcard only)

Public-key crypto also does **signatures**: only the secret-key owner can stamp a message; anyone with $\mathsf{pk}$ can verify the stamp.  
That is authenticity, not confidentiality.  
KEMs and signatures are sibling tools — do not mix their APIs in your head.

## Bridge to PQC

The padlock story stays the same when the padlock internals become post-quantum (lattices, codes, …).  

| Track | “Padlock insides” slogan |
|-------|--------------------------|
| Code-based | McEliece / decoding-shaped KEMs |
| Lattice / LWE | LWE / Module-LWE-shaped KEMs (ML-KEM) |

This lab’s TIT paper explainers are currently densest on the **code-based** track; the [lattice track](../tracks/lattice-lwe/ROADMAP.md) builds the ML-KEM vocabulary.

## Common confusions

- Publishing $\mathsf{pk}$ is intentional.  
- A KEM is not a signature.  
- “Public-key encryption” in apps is usually hybrid under the hood.  
- Authenticated messaging needs more than a raw KEM (signatures, protocols like TLS/Signal).  
- Encaps outputs **two** things: ciphertext and session key — beginners often forget $K$.

## Big practice set

1. Which key goes on a website?  
2. What two things does Encaps output?  
3. Why use AES after a KEM?  
4. If Eve has $\mathsf{pk}$ and $\mathsf{ct}$, what should still be hard?  
5. Name one difference between confidentiality and authenticity.  
6. True or false: Bob sends the session key $K$ as readable text next to $\mathsf{ct}$.  
7. Who runs Decaps — Alice or Bob in our story?  

<details><summary>Answers</summary>

1. Public key.  
2. Ciphertext $\mathsf{ct}$ and session key $K$.  
3. Speed for bulk data.  
4. Learning $K$ (breaking the KEM).  
5. Reading vs forging/editing (wording may vary).  
6. False — only $\mathsf{ct}$ is sent; $K$ is recovered via the trapdoor.  
7. Alice (the secret-key holder).

</details>

## Next steps

- [Why quantum computers change crypto](quantum-threat.md)  
- [Vectors and matrices](vectors-matrices.md) — math language inside many padlocks  
- Concept later: [KEM](../concepts/kem.md)  
- Bridge later: [McEliece in plain words](../bridge/mceliece-in-plain-words.md) · [From KEM API to noise](../bridge/from-kem-api-to-noise.md)  
- Lattice: [Lattices (gentle)](lattices-gentle.md)  
