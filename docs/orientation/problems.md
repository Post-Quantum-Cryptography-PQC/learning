# Problems — what crypto rests on

**Prereqs:** [History](history.md)  
**Next:** [Challenges](challenges.md)

**Learning goals.** After this page you can:

- Explain “easy forward, hard backward”
- Explain what **parameters** are and why they matter
- Break the word “secure” into **whom**, **which puzzle**, and **what size**
- Name RSA vs code vs lattice hardness at slogan level

## Crypto is puzzle design

Public-key cryptography is not magic ink. It is a **puzzle**:

- **easy** if you know a secret (or a trapdoor),  
- believed **hard** if you do not.

Honest parties use the easy direction. Attackers are stuck with the hard direction — at the sizes we choose.

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

## What “secure” means here

“Secure” is not a yes/no sticker. It is shorthand for three questions:

| Question | Plain English | Tiny example |
|----------|---------------|--------------|
| **Hard for whom?** | Which attacker are we talking about — a laptop, a big classical cluster, or also a future quantum machine? | Factoring $221$ is easy for anyone; factoring a huge RSA modulus is aimed at powerful computers |
| **Under what puzzle?** | Which hard problem is the scheme betting on? | RSA-style factoring ≠ code decoding ≠ lattice / LWE |
| **At what size?** | How large is the instance (the knobs we set below)? | Same puzzle can be a classroom toy or a cryptographic instance |

Whenever a claim says “secure,” try to fill in those three blanks.

### Quick self-check

Someone says “this code-based KEM is secure.” Which three blanks should you ask them to fill?  
<details><summary>Answer</summary>
Hard for <em>whom</em>, under <em>which puzzle</em> (here: decoding-style hardness), at <em>what size / parameters</em>.
</details>

## Parameters — the knobs that set the size

**Parameters** are the numbers that define one concrete instance of a puzzle: how big the primes are, how long the code is, how large the lattice dimension is, how much noise is added, and so on.

Why they matter:

- **Too small** → even the “hard” direction becomes easy; attacks finish.  
- **Large enough** → known attacks cost absurd work (the usual security goal).  
- **Larger still** → often **bigger keys, ciphertexts, or slower code** — so designers pick a size that is hard enough *and* still usable.

| Kind of size | Role |
|--------------|------|
| **Toy size** | For learning by hand (like $13\times 17$) |
| **Cryptographic size** | Chosen so best known attacks stay out of reach for the attackers you named above |

Later: [Security bits and work](../bridge/security-bits-and-work.md).

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

Crypto needs puzzles that are hard **almost always** for random instances at the parameters we use — not only for a few special numbers. Papers often talk about **average-case** hardness and **reductions** (“if you break my scheme, you solve problem $P$”).

At orientation level: a toy instance teaches the idea; cryptographic parameters are chosen so known attacks cost absurd work for the attackers you care about.

## Problems vs challenges

| Word in this curriculum | Meaning |
|-------------------------|---------|
| **Problem** (this page) | The mathematical puzzle hardness rests on |
| **Challenge** ([next page](challenges.md)) | Engineering, modelling, and deployment difficulties *around* those puzzles |

Both matter. A beautiful hard problem that makes huge keys, fails too often, or leaks through power traces is not “done.”

### Quick self-check

If an attacker’s best known attack costs about $2^{40}$ steps on your parameters, is that “128-bit security”?  
<details><summary>Answer</summary>
No — 128-bit security slogans aim near $2^{128}$ work. $2^{40}$ is in feasible territory for well-funded attackers. The size / parameters were not large enough for that claim.
</details>
