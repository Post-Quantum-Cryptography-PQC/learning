# McEliece in plain words

**Prereqs:** [Decoding as a puzzle](decoding-as-a-puzzle.md) · [Public-key picture](../fundamentals/public-key-picture.md)  
**Next:** [Niederreiter](../concepts/niederreiter.md) · [Goppa and alternant](../concepts/goppa-alternant.md) · [From KEM API to noise](from-kem-api-to-noise.md) · Concept: [KEM](../concepts/kem.md)  

**Learning goals.** Tell the McEliece story with public/secret roles, explain why the error is intentional, contrast Niederreiter packaging, and locate HQC/BIKE as cousins (not identical twins).

## Why this page exists

Concepts jump into KEMs and quasi-cyclic polynomials quickly. Historically and pedagogically, **McEliece** is the clearest code-based public-key story. Once you can retell it, HQC/BIKE make more sense as “different packaging of decoding + noise.”

If you can explain this page to a friend without notes, you are ready for the API ↔ noise bridge.

## The story (slow)

### Key generation (Alice)

1. Alice chooses a secret code with an efficient decoder (classically: a Goppa code) and matrices that describe it.  
2. She **scrambles** the generator (or parity-check) matrix with random secret transformations so the public matrix looks unstructured.  
3. **Public key:** the scrambled matrix (and parameters).  
4. **Secret key:** the unscrambling maps + the efficient decoder.

**English:** publish a messy-looking photocopy; keep the glasses that make it readable again.

### Encryption (sender Bob)

1. Bob encodes his message into a codeword $c$ using the public matrix (details depend on variant).  
2. Bob samples a **sparse random error** $e$ of weight $w$.  
3. Ciphertext is essentially $y = c \oplus e$ (McEliece) or a syndrome-like value (Niederreiter variant).  

The error is **not** an accident — it is the cloak.

$$
y = c \oplus e \qquad (\text{McEliece cartoon})
$$

### Decryption (Alice)

1. Alice undoes the scrambling using her secret.  
2. She runs her efficient decoder to remove $e$ and recover $c$ / the message.  
3. An attacker without the secret faces a hard decoding instance ([Decoding as a puzzle](decoding-as-a-puzzle.md)).

### Timeline table

| Step | Who | Action |
|------|-----|--------|
| KeyGen | Alice | Build secret easy code; publish scrambled matrix |
| Encrypt | Bob | Codeword + intentional sparse $e$ → ciphertext |
| Decrypt | Alice | Unscramble + decode → message |
| Attack | Eve | Try to decode without trapdoor |

## Worked micro-analogy (not real parameters)

Think of a secret “easy crossword type” Alice knows how to solve. She publishes a photocopy that has been randomly permuting rows/columns so it looks like a nonsense puzzle. Bob adds a few intentional ink blots (errors). Alice knows how to permute back and clean blots; strangers see a stained scrambled puzzle.

### Quick self-check

Who adds the ink blots — Alice, Bob, or Eve?  
<details><summary>Answer</summary>
Bob (the sender) — on purpose.
</details>

## Niederreiter cousin (same family album)

**Niederreiter** uses a parity-check / syndrome packaging instead of “codeword XOR error” as the main public object.  
Same spirit: public linear map + sparse secret + trapdoor decoder.  
This lab’s TIT explainer on McEliece ↔ Niederreiter equivalence sits later on the [code-based track](../tracks/code-based-kems/ROADMAP.md).

## Where modern KEMs fit

| Scheme flavor | One-sentence relation to the story |
|---------------|-------------------------------------|
| Classic McEliece | Closest to the classical Goppa + scramble story; large public keys, strong track record |
| Niederreiter | Dual packaging: work with syndromes / parity-check form |
| HQC / BIKE | Use **quasi-cyclic** structure for smaller keys; security still tied to decoding-like problems and noise modeling |
| This lab’s track | Emphasizes QC / modeling / cryptanalysis after you know the McEliece plot |

Exact hardness assumptions differ; do not pretend they are identical. The **shared intuition** is: public linear map + sparse secret noise + trapdoor decoder.

## Failure events

If Bob’s error is heavier than Alice’s decoder can handle (or randomness is unlucky), Alice may fail to decrypt. Schemes choose parameters so this is extremely rare (**DFR**). That is reliability engineering on top of the hardness story — see [Noisy channel story](noisy-channel-story.md) and [DFR](../concepts/dfr.md).

**Two goals at once:**

1. Attacker’s decoding stays hard.  
2. Honest Alice almost never fails.

## Bridge to concepts

- API view: [From KEM API to noise](from-kem-api-to-noise.md) · [KEM](../concepts/kem.md)  
- Hardness name: [Syndrome decoding](../concepts/syndrome-decoding.md)  
- Structure for smaller keys: [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md)

## Common confusions

- McEliece is encryption; a KEM is often built from similar ideas with a cleaner API.  
- “Error” in the ciphertext is deliberate.  
- Large public keys in Classic McEliece are a feature of the design space, not a misunderstanding.  
- Quantum computers are not known to destroy this family the way Shor destroys RSA — that is why it is a PQC candidate family — but cryptanalysis still evolves.  
- Scrambling must hide structure *well* — bad disguises get attacked.

## Check yourself

1. Who knows the efficient decoder in McEliece?  
2. Why does Bob add a sparse error?  
3. What does the attacker roughly have to solve?  
4. Name one reason HQC/BIKE differ from Classic McEliece at a high level.  
5. True or false: the public matrix is meant to look unstructured.  

<details><summary>Answers</summary>

1. Alice (secret-key owner).  
2. To hide the codeword; creates a decoding instance for attackers.  
3. A hard decoding / sparse-recovery problem from the public matrix.  
4. Quasi-cyclic structure for smaller keys / different noise algebra (among other differences).  
5. True.

</details>

## Next steps

- [From KEM API to noise](from-kem-api-to-noise.md)  
- [Security bits and attack work](security-bits-and-work.md)  
- Concepts: [KEM](../concepts/kem.md) · [Syndrome decoding](../concepts/syndrome-decoding.md)  
