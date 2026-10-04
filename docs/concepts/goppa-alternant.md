# Goppa and alternant codes (intuition)

**Prereqs:** [Hamming metric](hamming-metric.md) · [Linear codes](linear-codes.md) · [Finite fields beyond F₂](../bridge/finite-fields-beyond-f2.md) · [McEliece in plain words](../bridge/mceliece-in-plain-words.md)  
**Next:** [Niederreiter](niederreiter.md) · [Syndrome decoding](syndrome-decoding.md) · Paper: [McEliece↔Niederreiter explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md)  
**Tracks:** code-based-kems

**Learning goals.** Place GRS, alternant, and Goppa codes on one spectrum, say why Classic McEliece likes binary Goppa codes, and know that “algebraic shortcut for smaller keys” is historically dangerous — without deriving a full Goppa decoder.

## Why this card exists

Classic McEliece’s secret code is traditionally a **binary Goppa code**. Papers also say **alternant**, **GRS**, and “subfield subcode.” This card is the family album so those words do not feel like separate languages.

You do **not** need to build a Goppa parity-check matrix from scratch here. You need the **roles**: strong algebraic decoder for Alice, public scramble for Eve.

## Story in six lines (no math yet)

1. Alice owns a special crossword style she can solve fast (Goppa / alternant structure).  
2. She photocopies it, then randomly shuffles rows/columns so strangers cannot see the style.  
3. She hangs the messy photocopy in public (public key).  
4. Bob writes a message, adds a few intentional ink blots (sparse error), and mails the stained page.  
5. Alice unshuffles with her secret, cleans the blots with her decoder, reads the message.  
6. Eve only has the messy public photocopy — cleaning blots is hard without Alice’s style.

## Intuition — three nested ideas

Think of a ladder from “too much structure” to “conservative McEliece choice”:

| Name | Rough idea | Crypto reputation (slogan) |
|------|------------|----------------------------|
| **GRS** (generalized Reed–Solomon) | Highly algebraic codes over $\mathbb{F}_{q}$ with great distance | Excellent decoding; usually **breakable** if used raw as a McEliece public code |
| **Alternant** | Subfield / related constructions derived from GRS-like objects | Middle ground; includes Goppa as a famous case |
| **Binary Goppa** | Alternant-style codes over bits with a Goppa polynomial / locator structure | Classic McEliece secret family — long cryptanalytic track record |

**Slogan:**

> Alice keeps an algebraic code she can decode. She publishes only a scrambled matrix that should look random.

### Quick self-check

Who is supposed to know the Goppa structure — Alice or Eve?  
<details><summary>Answer</summary>
Alice (secret-key owner). Eve should see only the scrambled public matrix.
</details>

## Formal postcard (light)

- Work over an extension field $\mathbb{F}_{q^m}$ for the algebraic description, then often take a **binary** (or subfield) code for the public scheme.  
- A **Goppa code** is associated with a Goppa polynomial and a support (locator set); the owner uses that structure for efficient decoding of Hamming-weight-bounded errors.  
- An **alternant code** is a broader umbrella that includes many Goppa-like constructions.

Exact generator / parity-check formulas vary by textbook. For this curriculum, hold:

$$
\text{secret algebraic description} \;\Rightarrow\; \text{fast decoder},
$$
$$
\text{public scrambled } G' \text{ or } H' \;\Rightarrow\; \text{hard decoding for Eve}.
$$

## Worked story (no heavy algebra)

1. Alice samples a Goppa (or alternant) code with designed error-correcting capability $t$.  
2. She builds a generator (or parity-check) matrix for that code.  
3. She multiplies by secret invertible / permutation matrices so the public matrix hides the algebraic fingerprints.  
4. Bob encrypts with the public matrix + sparse error of weight $\le t$ ([McEliece](../bridge/mceliece-in-plain-words.md)).  
5. Alice undoes the scramble and runs her Goppa decoder.

If Bob’s error weight exceeds $t$, Alice may fail — a correctness / DFR-style issue for encryption variants, separate from Eve’s attack cost.

## Where it appears in PQC

| Scheme / topic | Link |
|----------------|------|
| Classic McEliece | Binary Goppa + scramble story |
| Niederreiter form | Same codes, parity-check packaging — [Niederreiter](niederreiter.md) |
| Structural attacks | Bad disguises or too-algebraic public codes historically fall |
| TIT leaf | McEliece↔Niederreiter equivalence explainer |

## Common confusions

- Goppa ≠ “any random code” — the *public* view aims to look random; the *secret* is structured.  
- GRS-based McEliece proposals have a long history of breaks; binary Goppa remains the conservative classic.  
- Alternant / Goppa fluency is not required to understand KEMs later — it is required to understand *why Classic McEliece keys are large and trusted*.  
- Rank-metric Gabidulin stories are a different metric ([rank metric](rank-metric.md)).

## Check yourself

1. Why does Alice keep a Goppa description secret?  
2. What goes wrong if the public matrix still leaks algebraic structure?  
3. Name one code family that is “too algebraic” for naive McEliece use.  
4. True or false: Classic McEliece’s large public key is unrelated to the choice of Goppa parameters.  

<details><summary>Answers</summary>

1. So she can decode efficiently while Eve cannot.  
2. Structural attacks can recover the trapdoor / break the scheme.  
3. Raw GRS (among others).  
4. False — Goppa parameters drive large matrices / keys.

</details>

## Big practice set

1. Place in order from “more algebraic / historically fragile if raw” toward “classic McEliece choice”: binary Goppa, GRS.  
2. In one sentence, what does scrambling do?  
3. Which Hamming notion limits Bob’s intentional error: weight or rank?  

<details><summary>Answers</summary>

1. GRS → (alternant umbrella) → binary Goppa.  
2. Hides the algebraic secret so the public matrix looks unstructured.  
3. Hamming weight (this family is Hamming-metric).

</details>

## Next steps

- [Niederreiter](niederreiter.md)  
- [Syndrome decoding](syndrome-decoding.md) · [ISD](information-set-decoding.md)  
- Bridge: [McEliece in plain words](../bridge/mceliece-in-plain-words.md)  
- Paper: [McEliece↔Niederreiter explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/on-the-equivalence-of-mceliece-s-and-niederreiter-s-public-key-cryptosystems/explainer.md)  
