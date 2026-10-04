# Security bits and attack work

**Prereqs:** [Hard problems](../fundamentals/hard-problems.md) · [Decoding as a puzzle](decoding-as-a-puzzle.md) · [Probability](../fundamentals/probability-gentle.md)  
**Next:** [Information-set decoding](../concepts/information-set-decoding.md) · [Error-correcting codes](../concepts/error-correcting-codes.md) · [Code-based roadmap](../tracks/code-based-kems/ROADMAP.md) · [index](../index.md)

**Learning goals.** Interpret phrases like “$128$-bit security,” compare attack cost to DFR-scale probabilities without mixing them up, read asymptotic big-O at slogan level, and ask the right questions when a paper claims a security level.

## Why this page exists

PQC papers mix three languages: probability (DFR), hardness (attack cost), and asymptotics ($O$, $\Theta$). Fundamentals mentioned $2^{128}$ once. Here we unpack the wording so concept pages do not feel like a foreign dialect.

## Security bits (informal)

Saying a parameter set aims at **$128$-bit security** roughly means:

> The best known attack is estimated to need about $2^{128}$ units of work
> (bit operations, gate counts, or a comparable cost model).

It is an **estimate**, tied to a model of attackers and algorithms. New cryptanalysis can revise it.

Compare:

| Quantity | Typical scale | Meaning |
|----------|---------------|---------|
| Attack cost | $\sim 2^{128}$ | How hard to break |
| DFR | $\le 2^{-128}$ (example target) | How often honest decrypt fails |
| Birthday collision | $\sim 2^{n/2}$ for $n$-bit hash | Different formula, same exponential language |

Notice DFR uses **negative** exponents (probabilities), security uses **positive** work exponents. Mixing them up is a common reading mistake.

### Say it twice

- $2^{128}$ **work** → “attack is huge.”  
- $2^{-128}$ **probability** → “failure is tiny.”  

Same $128$, opposite jobs.

### Quick self-check

Is DFR $=2^{-128}$ the same claim as “$128$-bit security”?  
<details><summary>Answer</summary>
No — failure probability vs attack cost.
</details>

## Worked intuition — powers of two

| Power | Rough feel |
|-------|------------|
| $2^{10}\approx 10^3$ | thousand |
| $2^{20}\approx 10^6$ | million |
| $2^{30}\approx 10^9$ | billion (ops per second ballpark for a fast core, very roughly) |
| $2^{40}$ | tens of minutes to hours of heavy compute territory (order-of-magnitude cartoon) |
| $2^{64}$ | far beyond casual brute force on one machine |
| $2^{128}$ | cosmically large for classical brute force |

These are for orientation, not precise benchmarks. Real attack-cost models count specific operations and parallelism assumptions.

### Tiny compare-out-loud

Which is more work: $2^{40}$ or $2^{80}$?  
$2^{80}$ is $2^{40}$ times larger than $2^{40}$ — not “twice as big.” Exponents add when you multiply powers of two.

## Asymptotics in one breath

When writers say an attack runs in $O(2^{0.08n})$ time, they mean: as $n$ grows, the cost scales like a constant times $2^{0.08n}$ (ignoring lower-order details).  
$\Theta(\cdot)$ means “tight order”; $o(\cdot)$ means “smaller order.”

**Reading habit:** treat these as **growth rates** first. Return later for precise definitions if you do theory work.

| Notation | Slogan |
|----------|--------|
| $O(f)$ | at most order $f$ (up to constants) |
| $\Theta(f)$ | tightly order $f$ |
| $o(f)$ | smaller than order $f$ |
| $2^{\Theta(n)}$ | exponential in $n$ |
| $n^{O(1)}$ | polynomial in $n$ |

Polynomial-time and exponential-time are different worlds.

## How this shows up in code-based PQC

1. Pick code length $n$, error weight $w$, etc.  
2. Estimate [ISD](../concepts/information-set-decoding.md) (or other) attack cost → aim above the security level.  
3. Separately estimate DFR under a noise model → aim below a tiny threshold.  
4. Watch for structure (quasi-cyclic, algebraic) that might give better attacks than the random-code formula.

### Lattice cousin

Lattice schemes estimate costs of lattice-reduction / dual / primal attacks instead of ISD — same “work vs failure” split, different algorithms ([Lattice track](../tracks/lattice-lwe/ROADMAP.md)).

## Two questions that prevent false confidence

When a concept or paper says “security level,” ask: **which attack model?**  
When it says “negligible DFR,” ask: **under which noise distribution?**

Write those two questions on a sticky note if you read papers.

## Quantum cost cartoons (do not overfit)

- **Grover** roughly halves exponents for some brute-force settings (e.g. idealized $2^{128}$ classical ↔ about $2^{64}$ quantum queries) — one reason AES-256 is popular.  
- **Shor** is a different, devastating break for RSA/ECC — not a “halve the exponent” story ([Quantum threat](../fundamentals/quantum-threat.md)).

## Common confusions

- “$128$-bit security” is not a theorem; it is a claim about known attacks.  
- DFR and security bits are not interchangeable.  
- Polynomial-time ($n^{O(1)}$) is a different world from $2^{\Theta(n)}$.  
- “More bits in the key” does not automatically mean “more security bits” if structure yields a shortcut.

## Check yourself

1. Is DFR $=2^{-128}$ the same statement as “$128$-bit security”?  
2. Roughly, which is larger work: $2^{40}$ or $2^{80}$?  
3. What should you ask when you see a security-level claim?  
4. True or false: $O(2^{0.1n})$ grows exponentially in $n$.  

<details><summary>Answers</summary>

1. No — one is honest failure probability, the other is attack cost.  
2. $2^{80}$.  
3. Which attack / cost model / assumptions?  
4. True.

</details>

## Big practice set

1. Translate “attack cost $\approx 2^{64}$” into one English sentence.  
2. Translate “DFR $\le 2^{-64}$” into one English sentence.  
3. Name one attack family used to estimate code-based costs.  

<details><summary>Answers</summary>

1. Best known break needs about $2^{64}$ work units in the model.  
2. Honest decryption fails at most about one in $2^{64}$ times in the model.  
3. Information-set decoding (ISD), among others.

</details>

## Next steps

- Return to [index](../index.md) and enter [Concepts](../index.md#3-concepts)  
- [Code-based roadmap](../tracks/code-based-kems/ROADMAP.md)  
- Concept: [Information-set decoding](../concepts/information-set-decoding.md)  
- Paper skills later: read limitations sections with the two sticky-note questions in mind  
