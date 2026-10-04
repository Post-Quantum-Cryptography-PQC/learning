# What is a hard problem?

**Prereqs:** [Bits, XOR](bits-xor-randomness.md) · [Probability](probability-gentle.md)  
**Next:** [Public-key crypto in one picture](public-key-picture.md)

**Learning goals.** Explain “easy forward, hard backward,” why crypto cares about average cases, what parameters are for, tell reductions from heuristic cost estimates, and name RSA vs code-based vs lattice at slogan level.

## Why this page exists

Public-key cryptography is not magic ink. It is a **puzzle design**:

- easy if you know a secret,  
- believed hard if you do not.

This page is about that idea in plain language — before we meet matrices, McEliece, or LWE.

**Study tip:** every time someone says “secure,” ask: “hard for whom, under what puzzle, at what size?”

## Everyday analogies

| Puzzle | Easy direction | Hard direction (felt) |
|--------|----------------|------------------------|
| Mixing paint | Mix red+blue → purple | From purple, recover exact recipe (messy) |
| Padlock | Snap it shut | Open without the key |
| Sudoku | Check a finished grid | Fill an empty grid |
| Multiply primes | $13\times 17=221$ | Factor $221$ (easy at this size; hard when huge) |
| Scramble a deck | Shuffle cards | Recover the exact shuffle from the final order alone (harder than it looks) |

Crypto chooses puzzles where the hard direction stays hard even for powerful computers, at the sizes we pick.

### Quick self-check

For “multiply two primes / factor the product,” which direction is easy?  
<details><summary>Answer</summary>
Multiplying is easy; factoring is the hard direction (at cryptographic sizes).
</details>

## One-way flavor (informal)

A function feels **one-way** if:

- computing $y=f(x)$ is easy,  
- finding any valid $x$ from $y$ alone is hard.

A **trapdoor** is secret extra information that makes the reverse easy for the owner.

Public-key crypto: publish a description that lets anyone do the easy forward operation (encrypt / encapsulate); keep the trapdoor (decrypt / decapsulate).

### Slow-motion picture

| Role | Has | Can do |
|------|-----|--------|
| Public | Description of $f$ / public key | Compute forward (lock box) |
| Owner | Trapdoor / secret key | Reverse easily (open box) |
| Attacker | Public description only | Should struggle to reverse |

## Average-case vs freak cases

Some puzzles have rare nightmarish instances and many easy ones.  
Attackers get **random-looking** public keys. So we need hardness for typical instances — **average-case** hardness — not only for a few cursed examples.

**Analogy:** a teacher who only writes one evil exam question, and ninety easy ones, does not make a hard course on average. Crypto needs the “random homework” to stay hard.

(You do not need complexity theory here. Just remember: “hard on average for the keys we actually sample.”)

## Reductions vs heuristics (honesty)

**Reduction (gold standard idea):**  
“If you break my scheme, you break problem $P$.”  
Then believing $P$ is hard supports believing the scheme is hard.

**Heuristic estimate (very common):**  
“Best known attack costs about $2^{128}$ steps at these parameters.”  
Useful engineering; weaker than a tight reduction. New attacks can change the estimate.

Both appear in PQC papers. Neither is “just vibes,” but they are different strengths of evidence.

| Kind of claim | Feels like | Weakness |
|---------------|------------|----------|
| Reduction to $P$ | “Break me ⇒ break $P$” | Relies on $P$ staying hard |
| Attack-cost estimate | “Best known attack ≈ $2^{128}$” | New algorithms can lower it |

## Parameters — turning hardness into numbers

Hardness usually grows when sizes grow (bigger primes, longer codes, larger weight bounds carefully chosen…).  
**Parameters** are those sizes.

Slogan: choose parameters so the best known attack needs absurd work (see also [Security bits](../bridge/security-bits-and-work.md) in the bridge layer).

### Tiny scaling story for factoring

- $N=15=3\times 5$ — easy.  
- $N$ with a few digits — still easy for a computer.  
- $N$ with hundreds of digits — trial division is hopeless; even better classical algorithms become infeasible at RSA sizes.

Hardness is about **growth**, not about one classroom example.

### Tiny scaling story for codes (preview)

- Tiny matrix, tiny weight — exhaustive search finds the sparse error.  
- Cryptographic sizes — exhaustive search is absurd; smarter attacks still aim for huge cost.

Same moral: **size matters**.

## Families you will hear (slogans only)

| Family | Hard problem slogan | Note |
|--------|---------------------|------|
| RSA | Factoring large integers | Broken by Shor on a large quantum computer |
| ECC | Discrete log on elliptic curves | Also broken by Shor |
| Code-based | Find a sparse error from linear equations (decoding) | Main TIT paper track in this curriculum |
| Lattice | LWE-style “noisy linear equations” | NIST’s primary KEM path |
| Hash-based | Properties of hash functions | Used in signatures like SLH-DSA |

### Quick self-check

Which family is “noisy linear equations”?  
<details><summary>Answer</summary>
Lattice / LWE-style.
</details>

## Preview: decoding as a hard problem (code track)

Someone publishes a matrix $H$ and a syndrome $\mathbf{s}$.  
You must find a sparse bit-string $\mathbf{e}$ with $H\mathbf{e}^\top=\mathbf{s}^\top$.

Computing $\mathbf{s}$ from $\mathbf{e}$ is easy (multiply).  
Finding sparse $\mathbf{e}$ from $\mathbf{s}$ can be hard.  

**Easy forward:** pick sparse $e$, compute $s = He^\top$.  
**Hard backward:** given $H$ and $s$, find that sparse $e$.

Details wait for vectors + bridge pages. The slogan is enough now.

## Preview: noisy equations as a hard problem (lattice track)

Someone publishes many noisy modular equations that secretly use a short secret vector $\mathbf{s}$.  
Computing the noisy right-hand sides from $\mathbf{s}$ is easy.  
Recovering $\mathbf{s}$ from the equations alone is believed hard — the **LWE** slogan.

**Easy forward:** pick secret $s$, publish noisy samples.  
**Hard backward:** recover $s$ from the samples.

Details wait for [Lattices (gentle)](lattices-gentle.md) and the [lattice track](../tracks/lattice-lwe/ROADMAP.md).

## Side channels (honest warning)

Even if the math puzzle is hard, a device might leak the key through timing, power use, or mistakes in implementation.  
That does **not** mean the math problem was solved — it means the *implementation* was attacked.

This curriculum focuses on the math stories first; keep side channels in the back of your mind.

## Bridge to PQC

PQC keeps public-key storytelling but swaps puzzles for ones believed safe against quantum attackers.  
[Quantum threat](quantum-threat.md) explains why RSA/ECC puzzles fail against Shor.

## Common confusions

- Hard ≠ mathematically impossible; it means infeasible for realistic attackers at these sizes.  
- “Nobody broke it yet” is evidence, not eternal proof.  
- Side-channel attacks (power, timing) can steal keys without solving the math puzzle.  
- A heuristic security claim can still be responsible engineering — just label it honestly.  
- Bigger parameters are not free — keys and ciphertexts grow too.

## Big practice set

1. Easy vs hard direction for “multiply two primes / factor the product”?  
2. Why do we care about average-case hardness for public keys?  
3. Name one PQC family besides lattices.  
4. Is “$2^{128}$ security” a theorem or an estimate about known attacks?  
5. In one sentence, what is a trapdoor?  
6. True or false: if a scheme has a reduction to problem $P$, then $P$ is automatically easy.  

<details><summary>Answers</summary>

1. Easy multiply; hard factor (at cryptographic sizes).  
2. Attackers see typical random-looking keys, not hand-picked freaks.  
3. Codes (or hashes / multivariate).  
4. Estimate about known attacks (model-dependent).  
5. Secret info that makes the hard reverse easy for the owner.  
6. False — the reduction says breaking the scheme would break $P$; we hope $P$ stays hard.

</details>

## Check yourself (quick)

1. What is a trapdoor in one sentence?  
2. Does hard mean impossible?  
3. Which classical public-key problems does Shor threaten?  
4. Name the hard-backward slogan for code-based crypto (plain English).  

<details><summary>Answers</summary>

1. Secret info that makes the hard reverse easy for the owner.  
2. No — infeasible in practice at these parameters.  
3. Factoring and discrete log (RSA/ECC world).  
4. Find a sparse error matching published linear equations / a syndrome.

</details>

## Next steps

- [Public-key crypto in one picture](public-key-picture.md)  
- [Why quantum computers change crypto](quantum-threat.md)  
- [Vectors and matrices](vectors-matrices.md)  
- Lattice fork: [Lattices (gentle)](lattices-gentle.md) · [Lattice / LWE track](../tracks/lattice-lwe/ROADMAP.md)  
- Code fork later: [Bridge overview](../bridge/README.md)  
