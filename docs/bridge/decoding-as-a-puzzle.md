# Decoding as a puzzle

**Prereqs:** [Generator and parity-check](generator-and-parity-check.md) · [Hard problems](../fundamentals/hard-problems.md)  
**Next:** [McEliece in plain words](mceliece-in-plain-words.md) · Concept: [Syndrome decoding](../concepts/syndrome-decoding.md)

**Learning goals.** State the sparse-decoding puzzle in words, finish a tiny exhaustive search by hand, feel why candidate counts explode, and explain why structure can make decoding easy for the owner but hard for everyone else.

## Why this page exists

“Syndrome decoding is hard for random instances” appears early in concept notes. Before that slogan lands, you should **feel** the search problem with a small matrix.

You already compute $He^\top$ on [Generator and parity-check](generator-and-parity-check.md). Here the arrow reverses: given $H$ and $s$, hunt for sparse $e$.

## The puzzle statement (plain words)

**Given:**

- a public matrix $H$ with $r$ rows and $n$ columns (bits),  
- a syndrome $s$ of length $r$,  
- a weight limit $w$,

**Find:** a bit-string $e$ of length $n$ with at most $w$ ones such that $H e^\top = s$.

Without the weight limit, many $e$ may work. The weight limit makes the solution meaningful — and, for suitable parameters, unique — but finding it is like searching a huge haystack of sparse needles.

### Say it as a wanted poster

> Wanted: sparse $e$ (≤ $w$ ones) whose fingerprint under $H$ is exactly $s$.

## Worked exhaustive search

Take

$$
H = \begin{pmatrix} 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \end{pmatrix}, \quad s=(1,0)^\top, \quad w=1.
$$

All weight-$\le 1$ candidates:

| $e$ | $He^\top$ (slow) | match $s$? |
|-----|------------------|------------|
| $0000$ | $(0,0)$ | no |
| $1000$ | row1 col1 → $(1,0)$ | **yes** |
| $0100$ | $(1,1)$ | no |
| $0010$ | $(0,1)$ | no |
| $0001$ | $(0,0)$ | no |

Answer $e=(1,0,0,0)$.  

**How $(1,0)$ appeared for $e=1000$:** only the first column of $H$ is added — that column is $(1,0)^\top$.

For $n=4$, $w=1$, we tried $1+n=5$ vectors.  

### Second search (you try)

Same $H$, now $s=(1,1)^\top$, $w=1$.  
<details><summary>Answer</summary>
$e=(0,1,0,0)$ because that column of $H$ is $(1,1)^\top$.
</details>

## Why the haystack explodes

Number of weight-exactly-$w$ bitstrings of length $n$ is $\binom{n}{w}$.

| $n$ | $w$ | $\binom{n}{w}$ (order of magnitude) |
|-----|-----|--------------------------------------|
| $4$ | $1$ | $4$ |
| $10$ | $2$ | $45$ |
| $100$ | $2$ | $4950$ |
| $1000$ | $50$ | astronomically huge |

For cryptographic $n$ in the hundreds or thousands and $w$ dozens, $\sum_{i=0}^w \binom{n}{i}$ becomes astronomical. That explosion is the intuition behind “decoding is hard.”

### Quick self-check

Is brute force of all weight-$2$ errors for $n=100$ realistic *by hand*?  
<details><summary>Answer</summary>
No — about $4950$ candidates; fine for a computer, tedious by hand. Crypto parameters are far harder.
</details>

## Easy vs hard — the trapdoor idea

Imagine $H$ is built from a secret code with a fast decoder (like a well-designed graph code, Goppa code, …). Then:

- **Owner** of the secret: rewrite the syndrome into the secret domain, decode quickly, map back.  
- **Outsider** who only sees a scrambled public $H'$: seems to face a random decoding instance.

Public-key encryption packages that asymmetry. Details vary by scheme (McEliece, Niederreiter, HQC, BIKE, …), but the **easy-vs-hard decoding gap** is the shared plot.

| Who | Sees | Decoding |
|-----|------|----------|
| Alice | secret structure | Easy (trapdoor) |
| Eve | public scrambled matrix | Hard (search) |

## What attackers do (slogan level)

They do not always brute-force all weight-$w$ vectors. **Information-set decoding (ISD)** and variants cleverly guess which coordinates are error-free, solve a linear system, and check consistency. Parameter selection aims to make even the best ISD-cost estimates infeasible (see [Security bits](security-bits-and-work.md)).

After this bridge, read the concept card [Information-set decoding](../concepts/information-set-decoding.md). For now: “smarter than brute force, still exponential in the right parameters.”

## Bridge to concepts

Official concept page: [Syndrome decoding](../concepts/syndrome-decoding.md).  
Crypto story with keys: [McEliece in plain words](mceliece-in-plain-words.md).

## Common confusions

- Hard for **random-looking** public instances — not hard if you know the secret structure.  
- Quasi-cyclic / algebraic structure shrinks keys but must not create a shortcut attack.  
- Side channels can leak the secret decoder without solving the math puzzle.  
- “NP-hard” slogans are asymptotic complexity language — parameter estimates still matter for concrete security.

## Check yourself

1. Why impose a weight limit $w$ on $e$?  
2. If $n=100$ and $w=2$, roughly how many weight-2 candidates?  
3. Who is decoding supposed to be easy for in a public-key scheme?  
4. True or false: ISD is always slower than trying every weight-$w$ vector.  

<details><summary>Answers</summary>

1. To make the solution sparse/meaningful (often unique) and to define the hard search problem.  
2. $\binom{100}{2}=4950$.  
3. The secret-key owner (trapdoor / structured decoder).  
4. False — ISD is a *smarter* attack family; still costly at crypto sizes.

</details>

## Next steps

- [McEliece in plain words](mceliece-in-plain-words.md)  
- [Security bits and attack work](security-bits-and-work.md)  
- Concept: [Syndrome decoding](../concepts/syndrome-decoding.md)  
