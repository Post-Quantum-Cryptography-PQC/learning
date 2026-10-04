# From Hamming distance to rank distance

**Prereqs:** [Linear codes](../concepts/linear-codes.md) · [Finite fields beyond F₂](finite-fields-beyond-f2.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md)  
**Next:** Concept: [Rank metric](../concepts/rank-metric.md) · Track: [Rank metric](../tracks/rank-metric/ROADMAP.md)

**Learning goals.** Contrast Hamming weight with rank weight, see a vector over $\mathbb{F}_{q^m}$ as a matrix over $\mathbb{F}_q$, work a tiny rank example by hand, and know why a second metric exists before meeting LRPC / RQC-shaped schemes.

## Why this page exists

The main [code-based KEM track](../tracks/code-based-kems/ROADMAP.md) lives in the **Hamming** world: count how many positions differ.  
Another PQC family measures errors by **matrix rank**. Jumping straight into “LRPC” or “blockwise rank decoding” without this bridge feels like a new language. Here is the slow story.

You do **not** need to finish the whole Hamming track first — but you do need [finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md) and linear-code intuition.

## Story — two ways to say “how large is the error?”

**Hamming (familiar).**  
Error $\mathbf{e}=(1,0,1,0)$ over bits has **weight** $2$ — two nonzero positions.  
Distance between $x$ and $y$ = weight of $x-y$ (XOR when bits).

**Rank (new).**  
Now each symbol lives in an extension field $\mathbb{F}_{q^m}$.  
A length-$n$ vector can be rewritten as an $m\times n$ matrix with entries in the small field $\mathbb{F}_q$ (each column expands one symbol in a fixed basis).  
The **rank weight** of the vector is the **rank** of that matrix — how many independent “directions” the error uses — not merely how many columns are nonzero.

Two errors can have the same Hamming weight but different ranks (or the reverse intuition: few nonzero columns that still span a tall space).

### One-sentence contrast

| Metric | “Size” of an error means… |
|--------|----------------------------|
| Hamming | How many positions are nonzero |
| Rank | How many independent directions the expanded matrix has |

## Worked postcard over a tiny field

Take $q=2$, $m=2$, so $\mathbb{F}_4$ has four elements. Fix a basis $\{1,\alpha\}$ of $\mathbb{F}_4$ over $\mathbb{F}_2$.  
A length-$2$ vector $(e_1,e_2)$ becomes a $2\times 2$ binary matrix whose columns are the coordinates of $e_1$ and $e_2$.

Example pattern (coordinates only — exact $\mathbb{F}_4$ labels vary by basis choice):

$$
\begin{pmatrix}
1 & 0 \\
0 & 1
\end{pmatrix}
\quad\text{has rank }2,
\qquad
\begin{pmatrix}
1 & 1 \\
0 & 0
\end{pmatrix}
\quad\text{has rank }1.
$$

**Why ranks differ:**  
- Left: two independent columns → rank $2$.  
- Right: second column is a copy of the first pattern in the top row only — columns are dependent → rank $1$.

Both can correspond to “two nonzero symbols” or not, depending on expansion — the point is: **rank is a different yardstick**.

### Slow-motion: what “rank 1” feels like

A rank-$1$ matrix’s columns all point along one line (in the $\mathbb{F}_q$ vector-space sense).  
A rank-$2$ matrix needs two independent directions.  
Crypto often wants **low-rank** errors so a trapdoor decoder can recover the support.

### Quick self-check

Does rank weight count the number of $1$s in the matrix?  
<details><summary>Answer</summary>
No — it counts the matrix rank (independent directions), not the Hamming weight of the entries.
</details>

## Expansion recipe (remember this)

1. Start with a vector over $\mathbb{F}_{q^m}$.  
2. Expand each symbol into an $\mathbb{F}_q$-coordinate column (fixed basis).  
3. Get an $m\times n$ matrix over $\mathbb{F}_q$.  
4. **Rank weight** = rank of that matrix.

You do not need fluent $\mathbb{F}_{q^m}$ arithmetic yet. Remember:

> Expand symbols → matrix over $\mathbb{F}_q$ → weight = matrix rank.

## Why cryptographers care

- Some code constructions (Gabidulin, LRPC, …) correct **low-rank** errors efficiently with a trapdoor.  
- Public scrambling aims to hide that structure so attackers face a hard **rank syndrome decoding**-type problem.  
- Key sizes and decoder stories differ from Hamming MDPC / HQC — hence a separate [rank-metric track](../tracks/rank-metric/ROADMAP.md).

### Side-by-side with Hamming McEliece story

| | Hamming track | Rank track |
|--|---------------|------------|
| Error size | Number of flips / nonzero positions | Rank of expanded matrix |
| Hard puzzle slogan | Sparse syndrome decoding | Rank syndrome decoding |
| Famous families | Goppa / MDPC / HQC / BIKE | Gabidulin / LRPC / RQC-shaped |

## Bridge

When a paper says “rank weight at most $r$,” read: “the error matrix has $\mathrm{rank}\le r$,” not “at most $r$ bit flips” unless they explicitly switch metrics.

## Common confusions

- Rank metric still uses linear codes — the **distance** changed, not the whole of linear algebra.  
- $\mathbb{F}_{q^m}$ is not “integers mod $q^m$.”  
- Low Hamming weight $\neq$ low rank automatically.  
- This lab’s WIP on ideal blockwise LRPC lives on this track, not on the Hamming KEM core path.  
- Lattice LWE is yet another fork — not the same as rank metric ([Lattice track](../tracks/lattice-lwe/ROADMAP.md)).

## Check yourself

1. Hamming weight counts what? Rank weight counts what?  
2. Why rewrite an $\mathbb{F}_{q^m}$-vector as a matrix over $\mathbb{F}_q$?  
3. Is McEliece-as-taught-in-the-main-track using rank distance by default?  
4. True or false: a matrix with many $1$s must have high rank.  

<details><summary>Answers</summary>

1. Number of nonzero positions; rank of the expanded error matrix.  
2. So that “size of error” can be measured as matrix rank.  
3. No — that track is Hamming / bit-oriented unless a paper says otherwise.  
4. False — many $1$s can still lie in a low-dimensional column space.

</details>

## Big practice set

1. Rank of $\begin{pmatrix}1&0\\0&0\end{pmatrix}$ over $\mathbb{F}_2$?  
2. Rank of $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ over $\mathbb{F}_2$?  
3. In one sentence, why does a second metric exist in PQC?  

<details><summary>Answers</summary>

1. $1$.  
2. $1$ (columns are equal).  
3. So designers can use low-rank-error codes with different size/security tradeoffs than Hamming schemes.

</details>

## Next steps

- Concept: [Rank metric](../concepts/rank-metric.md)  
- Concept: [LRPC codes](../concepts/lrpc-codes.md) · [Rank syndrome decoding](../concepts/rank-syndrome-decoding.md)  
- Track: [Rank metric ROADMAP](../tracks/rank-metric/ROADMAP.md)  
- Return anytime to [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
