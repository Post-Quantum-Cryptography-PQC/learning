# Information-set decoding (ISD)

**Prereqs:** [Syndrome decoding](syndrome-decoding.md) · [Security bits and attack work](../bridge/security-bits-and-work.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md)  
**Next:** [Quasi-cyclic codes](quasi-cyclic-codes.md) · [DFR](dfr.md) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain what an “information set” is, sketch why ISD beats naive sparse search, walk a tiny guess-and-check story, and connect ISD cost estimates to “security bits.”

## Symbols on this page

| Symbol | English |
|--------|---------|
| $H$ | Public parity-check matrix |
| $\mathbf{s}$ | Syndrome |
| $w$ | Weight limit on the error |
| $I$ | Guessed information set (coordinates hoped to be nearly error-free) |
| $[n,k]$ | Length $n$, dimension about $k$ |
| $2^{128}$ | Enormous attack-work slogan (not a failure probability) |

## Why this card exists

Almost every code-based parameter table silently answers: “How expensive is the best **information-set decoding** attack?” [Syndrome decoding](syndrome-decoding.md) named the problem; this card names the main classical attack family.

You do **not** need a full research paper to use this card. You need the **guess-set → linear algebra → check weight** loop, plus the habit of reading “security bits” as attack-work estimates ([Security bits and attack work](../bridge/security-bits-and-work.md)).

## Intuition

**Syndrome decoding** asks for a sparse error $\mathbf{e}$ with $H\mathbf{e}^\top=\mathbf{s}^\top$.  
Brute force tries all weight-$w$ patterns — impossible at crypto sizes (see the haystack table on the syndrome-decoding card or the bridge [Decoding as a puzzle](../bridge/decoding-as-a-puzzle.md)).

**Information-set decoding** guesses a set of coordinates that is likely to contain **few** (or zero) error bits, treats those coordinates as an “information set,” reduces the problem with linear algebra, and checks a much smaller leftover pattern. Repeat with fresh guesses until success.

Slogan:

> Guess where the errors are *not*, solve a smaller linear system, verify the sparse leftover.

### Everyday analogy (imperfect but useful)

You lost a few keys on a long keyring. Instead of trying every subset of $w$ keys, you repeatedly grab a large stretch you *hope* is mostly empty of lost keys, then check a small leftover. Bad grabs waste a little work; good grabs finish fast. ISD is that idea with matrices.

## Formal definition (light)

For an $[n,k]$ code with parity-check matrix $H$ of size roughly $(n-k)\times n$:

1. Pick a candidate **information set** $I\subset\{1,\ldots,n\}$ with $|I|=k$ (or a related size in variants).  
2. Put $H$ into a form that isolates the complementary positions (Gaussian elimination / systematic form).  
3. Enumerate sparse patterns on a small split of coordinates (Stern-style collisions, Lee–Brickell, … — names differ; spirit is the same).  
4. Accept if the reconstructed $\mathbf{e}$ has weight $\le w$ and matches the syndrome.

**Cost** is (roughly)

$$
(\text{number of trials}) \times (\text{cost per trial}).
$$

Designers choose $n,k,w$ so even optimized ISD estimates sit near the target security level (e.g. work on the order of $2^{128}$) — see [Security bits](../bridge/security-bits-and-work.md). This card does **not** invent concrete attack costs; it explains what those tables are estimating.

## Worked toy (conceptual, not optimized)

Suppose $n=6$, $k=3$, $w=1$, and the true error is a single $1$ in position $4$.

| Idea | What happens |
|------|----------------|
| Guess an information set of size $3$ that **avoids** position $4$ | The error sits in the redundancy part; after systematic form, the syndrome often points straight at that sparse pattern |
| Guess a set that **includes** position $4$ | The “leftover” looks wrong — reject and resample |

Slow-motion loop:

1. Choose $I$ (size $k$).  
2. Run linear algebra on $H$ relative to $I$.  
3. Try a small family of sparse leftovers on the complementary coordinates.  
4. If weight $\le w$ and syndrome matches → success; else new $I$.

Real ISD papers tune how you split and collide patterns so fewer trials are needed — that is where Stern / Canteaut–Chabaud-style improvements live. You need the **loop**, not the Markov analysis, to read parameter discussions.

### Mid-page self-check

In the toy above, if the single error is in position $4$, should a “lucky” information set of size $3$ include position $4$?  
<details><summary>Answer</summary>
No — lucky sets **avoid** the error position so the leftover is sparse and easy to spot.
</details>

## Why ISD beats naive search (slogan level)

| Approach | Rough search space |
|----------|--------------------|
| Brute force | All weight-$w$ patterns: $\binom{n}{w}$ |
| ISD | Many trials of smaller enumerations + linear algebra |

ISD does **not** make decoding polynomial-time for random codes at crypto sizes. It makes the best *known classical* attack cheaper than pure brute force — so designers size parameters against ISD estimates, not against $\binom{n}{w}$ alone.

### Quick self-check

True or false: ISD is the legitimate owner’s decryption algorithm.  
<details><summary>Answer</summary>
False — ISD is an **attack**. Owners use trapdoor structure / designed decoders.
</details>

## Where it appears in PQC

| Setting | Role of ISD |
|---------|-------------|
| Classic McEliece / Niederreiter | Primary public-key attack cost model |
| HQC / BIKE (structured codes) | Still a baseline; structure may allow *better* attacks too |
| Parameter selection | Pick $(n,k,w)$ so ISD work exceeds the security target |
| Research gaps | “Recompute under modern ISD cost models” in this lab’s [gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml) |

Story packaging of the trapdoor: [McEliece in plain words](../bridge/mceliece-in-plain-words.md).

## Common confusions

- ISD is an **attack**, not the legitimate owner’s decoder (owners use trapdoor structure).  
- Quasi-cyclic / algebraic structure can break the “random $H$” cost formulas — ISD numbers are necessary, not always sufficient ([Quasi-cyclic codes](quasi-cyclic-codes.md)).  
- Old published work factors are **not** today’s recommended parameter guidance by themselves; models and machines changed.  
- Quantum algorithms may change best-known costs; classical ISD remains the baseline story in most TIT / code-based parameter discussions.  
- “Fewer trials than $\binom{n}{w}$” does not mean “practical at NIST sizes” — exponents still matter.

## Check yourself

1. In one sentence, what does ISD guess?  
2. Why is ISD cheaper than trying all weight-$w$ errors?  
3. If a paper improves ISD, what happens to old McEliece parameters?  
4. Who is ISD aiming at — Alice or Eve?  
5. What rough product describes ISD cost?  

<details><summary>Answers</summary>

1. A set of coordinates that (hopefully) contains few error bits — an information set.  
2. Linear algebra + structured enumeration on a smaller pattern replaces full $\binom{n}{w}$ search.  
3. Their estimated security drops; designers must enlarge parameters or accept less security.  
4. Eve (the attacker).  
5. (number of trials) × (cost per trial).

</details>

## Big practice set

1. Restate syndrome decoding in one line, then say where ISD sits relative to it.  
2. True or false: for structured codes, quoting only random-code ISD costs is always enough.  
3. If your guessed information set includes an error bit (weight-$1$ toy), what do you do next in the ISD loop?  
4. Point to the bridge page that explains how “$128$-bit security” relates to attack work.  

<details><summary>Answers</summary>

1. Find sparse $e$ with $He^\top=s$; ISD is the main classical attack family for that search.  
2. False — structure may enable better attacks; ISD is a baseline.  
3. Reject that trial and sample a new information set (or try another leftover pattern, depending on the variant).  
4. [Security bits and attack work](../bridge/security-bits-and-work.md).

</details>

## Next steps

- Re-read [Syndrome decoding](syndrome-decoding.md) with ISD in mind  
- [Security bits and attack work](../bridge/security-bits-and-work.md)  
- [Quasi-cyclic codes](quasi-cyclic-codes.md) (structure vs random-code cost models)  
- Bridge refresh: [Decoding as a puzzle](../bridge/decoding-as-a-puzzle.md)  
- TIT leaf (when expanded): Canteaut–Chabaud minimum-weight / ISD paper  
