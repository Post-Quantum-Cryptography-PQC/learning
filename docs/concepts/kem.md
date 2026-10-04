# Key encapsulation (KEM)

**Prereqs:** [From KEM API to noise](../bridge/from-kem-api-to-noise.md) · [McEliece in plain words](../bridge/mceliece-in-plain-words.md) · [Public-key picture](../fundamentals/public-key-picture.md)  
**Next:** [IND-CPA / IND-CCA](ind-cpa-cca.md) · [DFR](dfr.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
**Tracks:** code-based-kems · lattice-lwe

**Learning goals.** Recite KeyGen / Encaps / Decaps aloud, separate correctness from security, walk a hybrid-encryption story with AES, and name which PQC families share this API shape.

## Why this card exists

Modern PQC standards often standardize **KEMs**, not “encrypt an arbitrary file” APIs. Specs, NIST documents, and research papers all assume you know three calls. This card is the vocabulary sheet after the [bridge from API to noise](../bridge/from-kem-api-to-noise.md): slower wording, more examples, same facts.

## Intuition — what problem a KEM solves

Alice has a long-term **public key** $\mathsf{pk}$ (and keeps $\mathsf{sk}$ secret).  
Bob wants a **fresh shared secret** $K$ with Alice so they can encrypt bulk data with a fast symmetric cipher (AES-GCM, ChaCha, …).

A KEM does only the hard public-key step: ship a short session key under $\mathsf{pk}$.

| Party | Action |
|-------|--------|
| Bob | $\mathsf{Encaps}(\mathsf{pk})\to(\mathsf{ct}, K)$ — sends $\mathsf{ct}$, keeps $K$ |
| Alice | $\mathsf{Decaps}(\mathsf{sk},\mathsf{ct})\to K'$ — hope $K'=K$ |
| Both | Use $K$ as key material for AES (or similar) |

Bob never sends $K$ in the clear. Eve may copy $\mathsf{ct}$; without $\mathsf{sk}$ she should not learn $K$.

### Say each line aloud

1. “KeyGen makes a public key and a secret key.”  
2. “Encaps uses the public key and returns a ciphertext and a session key.”  
3. “Decaps uses the secret key and ciphertext and should return the same session key.”

### Quick self-check

Does Encaps return one thing or two?  
<details><summary>Answer</summary>
Two: ciphertext $\mathsf{ct}$ and session key $K$. Only $\mathsf{ct}$ goes on the wire.
</details>

## Formal API (three algorithms)

$$
\begin{align*}
\mathsf{KeyGen} &\to (\mathsf{pk},\mathsf{sk}) \\
\mathsf{Encaps}(\mathsf{pk}) &\to (\mathsf{ct}, K) \\
\mathsf{Decaps}(\mathsf{sk},\mathsf{ct}) &\to K' \quad\text{(or reject, scheme-dependent)}
\end{align*}
$$

**Correctness (honest parties):** $K'=K$ except with tiny probability — that failure rate is the [DFR](dfr.md).  
**Security (informal):** without $\mathsf{sk}$, seeing $\mathsf{pk}$ and $\mathsf{ct}$ should not reveal $K$. Precise games live on [IND-CPA / IND-CCA](ind-cpa-cca.md).

| Goal | Question in plain words |
|------|-------------------------|
| Correctness | Do Alice and Bob get the same $K$ almost always? |
| Security | Can Eve learn $K$ from public data alone? |

A scheme can be insecure with perfect correctness, or (badly designed) correct only rarely. Analyses track **both**.

## Worked story — hybrid encryption

1. Alice publishes $\mathsf{pk}$ (certificate, directory, …).  
2. Bob runs Encaps, obtains $(\mathsf{ct}, K)$.  
3. Bob sends $\mathsf{ct}$ to Alice, and encrypts the file with AES-GCM under a key derived from $K$.  
4. Alice runs Decaps, recovers $K$, and decrypts the file.

This pattern is often called **KEM + DEM** (data encapsulation / symmetric crypto). The KEM is small and expensive; AES is large and cheap.

### Tiny timeline (not real crypto sizes)

| Step | What happens | Who knows $K$? |
|------|--------------|----------------|
| After Encaps | Bob holds $K$ locally | Bob |
| On the wire | Only $\mathsf{ct}$ (and later AES ciphertext) | still Bob |
| After Decaps | Alice recovers $K$ | Alice and Bob |

### Quick self-check

Why not encrypt the whole file with the public-key primitive alone?  
<details><summary>Answer</summary>
Public-key crypto is slow and awkward for bulk data. The KEM only sets up a short secret; AES does the heavy lifting.
</details>

## Where it appears in PQC

| Example | Family | Role in this lab |
|---------|--------|------------------|
| ML-KEM (Kyber-shaped) | Lattices | NIST primary KEM API |
| Classic McEliece, HQC, BIKE | Codes | Code-based track focus |
| Other lattice / code designs | Mixed | Same three-call shape |

Different size, speed, and security profiles — **same API shape**. That is why one concept card covers both tracks.

**Noise postcard.** Many code-based and lattice KEMs hide sparse randomness inside $\mathsf{ct}$; Decaps recovers it with $\mathsf{sk}$. If recovery fails, you feel DFR. Details: [From KEM API to noise](../bridge/from-kem-api-to-noise.md).

## Common confusions

| Confusion | Clearer picture |
|-----------|-----------------|
| KEM = digital signature | No — signatures prove authorship; KEMs establish a shared key. |
| “Public-key encryption of files” in apps | Usually KEM + DEM under the hood. |
| DFR = “probability an attack works” | No — DFR is honest Decaps failure; attack cost is a different sticky note. |
| Encaps “sends $K$” | Encaps *computes* $K$; only $\mathsf{ct}$ is transmitted. |

## Check yourself

1. What two things does Encaps output?  
2. Why combine a KEM with AES?  
3. Is a signature the same as a KEM?  
4. Name the three KEM algorithms.  
5. Correctness vs security — which one asks “do Alice and Bob match?”  

<details><summary>Answers</summary>

1. Ciphertext $\mathsf{ct}$ and session key $K$.  
2. Speed for bulk data; KEM only sets up a short secret.  
3. No.  
4. KeyGen, Encaps, Decaps.  
5. Correctness.

</details>

## Big practice set

1. Alice already has Bob’s $\mathsf{pk}$. Write three short bullets: what Bob sends, what each party holds after success, what Eve sees.  
2. Fill the blank: “Wish: $K'=K$ always. Reality: $K'=K$ except with probability called ___.”  
3. True or false: ML-KEM and Classic McEliece use the same *API shape* even though the math objects differ.  

<details><summary>Answers</summary>

1. Bob sends $\mathsf{ct}$ (and later AES ciphertext); both hold $K$; Eve sees $\mathsf{pk}$, $\mathsf{ct}$, and public traffic — not $K$ if the KEM is secure.  
2. DFR (decryption failure rate).  
3. True.

</details>

## Next steps

- [IND-CPA / IND-CCA](ind-cpa-cca.md) — what “secure KEM” means as a game  
- [DFR](dfr.md) — when honest Decaps fails  
- [Quasi-cyclic codes](quasi-cyclic-codes.md) — structure used by some code-based KEMs  
- Bridge revisit: [From KEM API to noise](../bridge/from-kem-api-to-noise.md)  
- Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md) · [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md)  
