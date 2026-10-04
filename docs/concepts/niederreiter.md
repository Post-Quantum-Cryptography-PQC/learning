# Niederreiter cryptosystem (intuition)

**Prereqs:** [McEliece in plain words](../bridge/mceliece-in-plain-words.md) · [Goppa and alternant](goppa-alternant.md) · [Syndrome decoding](syndrome-decoding.md) · [Linear codes](linear-codes.md)  
**Next:** [KEM](kem.md) · [ISD](information-set-decoding.md) · Paper: [McEliece↔Niederreiter explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md)  
**Tracks:** code-based-kems

**Learning goals.** Contrast McEliece’s “codeword + error” ciphertext with Niederreiter’s “syndrome of a sparse vector,” explain why they are twins for the same code, and know that security should be judged together.

## Why this card exists

Papers casually say “Niederreiter form” or “parity-check packaging.” It is not a different hardness world — it is a different **public object** for the same Hamming decoding puzzle.

The TIT correspondence on equivalence is the research leaf; this card is the vocabulary.

## Story in six lines (no math yet)

1. McEliece mails a **stained full page** (noisy codeword).  
2. Niederreiter mails only a **short checksum fingerprint** of a sparse ink pattern (syndrome).  
3. Same secret glasses can recover the pattern either way.  
4. Same hard “find the sparse blots” puzzle for strangers.  
5. So “which envelope is safer?” is the wrong question when the underlying code matches.  
6. Judge the twins **together** — that is the TIT equivalence lesson.

## Intuition — two envelopes, same letter

**McEliece cartoon:**

$$
y = c \oplus e,
$$

where $c$ is a codeword from the public generator story and $e$ is sparse.

**Niederreiter cartoon:**

$$
s = H' e^\top,
$$

where $H'$ is a scrambled public parity-check matrix and $e$ is a sparse vector that encodes the message (or message-carrying payload).

Same sparse $e$, same underlying code family (often Goppa/alternant), different published matrix type.

### Side-by-side

| | McEliece | Niederreiter |
|--|----------|--------------|
| Typical public matrix | Scrambled generator $G'$ | Scrambled parity-check $H'$ |
| Ciphertext flavor | Noisy codeword | Syndrome of sparse $e$ |
| Attacker puzzle | Decode / recover sparse $e$ | Syndrome decoding of sparse $e$ |
| Owner | Unscramble + structured decoder | Same spirit |

### Quick self-check

In Niederreiter, is the ciphertext usually a full length-$n$ noisy word or a shorter syndrome-like vector?  
<details><summary>Answer</summary>
Syndrome-like (parity-check image) — typically shorter than a full codeword.
</details>

## Formal postcard (light)

Given a public $H'$ of size about $(n-k)\times n$ and a weight bound $t$:

1. Map the message into a sparse vector $e$ of weight $t$ (or $\le t$).  
2. Ciphertext $s = H' e^\top$.  
3. Decrypt: use secret structure to recover $e$ from $s$, then unmap to the message.

If you already understand [syndrome decoding](syndrome-decoding.md), Niederreiter encryption *is* “publish an SD instance whose sparse solution carries the message.”

## Equivalence slogan (why the TIT paper matters)

If McEliece and Niederreiter use the **same** underlying $[n,k]$ code and designed error weight, breaking one lets you break the other by linear algebra (build $H'$ from $G'$ or vice versa, transform ciphertexts).  

So “Niederreiter is safer than McEliece” (or the reverse) is the wrong instinct when parameters match — judge them **jointly**.  
Details: [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md).

## Worked micro-analogy

McEliece: mail a stained photocopy of a filled crossword.  
Niederreiter: mail only the **checksum fingerprint** of a sparse ink pattern.  
Alice’s secret glasses recover the pattern either way; Eve faces a hard sparse-recovery problem either way.

## Where it appears in PQC

- Classic code-based PKE discussions and many textbook treatments  
- Some KEM constructions prefer Niederreiter-style encapsulations  
- Attack-cost tables must consider both generator- and parity-check-oriented ISD variants when relevant  

## Common confusions

- Niederreiter ≠ a different metric — still Hamming sparse decoding.  
- Shorter ciphertext does not automatically mean weaker or stronger security.  
- Message encoding into constant-weight vectors is part of the scheme engineering — do not skip it when reading specs.  
- Equivalence assumes comparable parameters / the same code — do not mix unrelated families.

## Check yourself

1. What does Niederreiter publish that McEliece usually does not emphasize?  
2. What hard problem does Eve face in both stories?  
3. True or false: if two schemes use the same code and $t$, their securities are independent.  
4. Name one reason a designer might prefer syndrome ciphertexts.  

<details><summary>Answers</summary>

1. A scrambled parity-check matrix / syndrome packaging.  
2. Sparse (Hamming) decoding / syndrome decoding.  
3. False — they should be judged together under equivalence.  
4. e.g. shorter ciphertext (among engineering reasons).

</details>

## Big practice set

1. Write the Niederreiter ciphertext equation in symbols.  
2. If $H'e^\top=s$ and Alice recovers $e$, what does she still need to do to finish decryption?  
3. Which concept card is the “hard problem name” for Niederreiter?  

<details><summary>Answers</summary>

1. $s=H'e^\top$ (or paper-equivalent).  
2. Unmap the sparse $e$ back to the message (and undo any secret transforms as designed).  
3. [Syndrome decoding](syndrome-decoding.md).

</details>

## Next steps

- Paper: [McEliece↔Niederreiter explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md)  
- [ISD](information-set-decoding.md) · [KEM](kem.md)  
- [Goppa and alternant](goppa-alternant.md)  
