# Problems — what crypto rests on

**Prereqs:** [History](history.md)  
**Next:** [Challenges](challenges.md)

**Learning goals.** Explain “easy forward, hard backward,” why parameters matter, that “secure” always means “hard for whom, under what puzzle, at what size,” and name RSA vs code vs lattice hardness at slogan level.

## Crypto is puzzle design

Public-key cryptography is not magic ink. It is a **puzzle**:

- **easy** if you know a secret (or a trapdoor),  
- believed **hard** if you do not.

Honest parties use the easy direction. Attackers are stuck with the hard direction — at the sizes we choose.

**Study tip:** every time someone says “secure,” ask: “hard for whom, under what puzzle, at what size?”

## Everyday analogies

| Puzzle | Easy direction | Hard direction (felt) |
|--------|----------------|------------------------|
| Mix paint | Red + blue → purple | Recover the exact recipe from purple |
| Padlock | Snap it shut | Open without the key |
| Multiply primes | $13\times 17=221$ | Factor $221$ (easy here; hard when huge) |
| Scramble a deck | Shuffle | Recover the exact shuffle from the final order alone |

Crypto chooses puzzles where the hard direction stays hard for powerful computers — and, for PQC, for quantum attackers too.

### Quick self-check

For “multiply two primes / factor the product,” which direction is easy?  
<details><summary>Answer</summary>
Multiplying is easy; factoring is the hard direction (at cryptographic sizes).
</details>

## Three hardness slogans (orientation only)

| Family | Easy direction (honest) | Hard direction (attacker slogan) |
|--------|-------------------------|----------------------------------|
| **RSA-style** | Multiply / exponentiate with trapdoor | Factor / invert without trapdoor |
| **Code-based** | Encode + add intentional errors (with secret code structure) | Decode a random-looking linear code |
| **Lattice / LWE** | Sample noisy linear equations with a secret | Recover the secret (or distinguish) from the noise |

Later pages unpack each slogan with pictures and tiny examples:

- [What is a hard problem?](../fundamentals/hard-problems.md)  
- [Public-key picture](../fundamentals/public-key-picture.md)  
- [LWE](../concepts/lwe.md) · [Syndrome decoding](../concepts/syndrome-decoding.md)

## Average case vs “one lucky hard instance”

Crypto needs puzzles that are hard **almost always** for random instances of the size we use — not only for a few special numbers. Papers often talk about **average-case** hardness and **reductions** (“if you break my scheme, you solve problem $P$”).

At orientation level, remember:

- A toy size is for learning.  
- A cryptographic size is chosen so known attacks cost absurd work (see [Security bits and work](../bridge/security-bits-and-work.md) later).

## Problems vs challenges

| Word in this curriculum | Meaning |
|-------------------------|---------|
| **Problem** (this page) | The mathematical puzzle hardness rests on |
| **Challenge** ([next page](challenges.md)) | Engineering, modelling, and deployment difficulties *around* those puzzles |

Both matter. A beautiful hard problem that makes huge keys, fails too often, or leaks through power traces is not “done.”

### Quick self-check

If an attacker’s best known attack costs about $2^{40}$ steps on your parameters, is that “128-bit security”?  
<details><summary>Answer</summary>
No — 128-bit security slogans aim near $2^{128}$ work. $2^{40}$ is in feasible territory for well-funded attackers.
</details>
