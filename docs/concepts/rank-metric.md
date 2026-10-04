# Rank metric

**Prereqs:** [From Hamming to rank](../bridge/from-hamming-to-rank.md) · [Linear codes](linear-codes.md) · [Finite fields beyond F₂](../bridge/finite-fields-beyond-f2.md)  
**Next:** [LRPC codes](lrpc-codes.md) · [Rank syndrome decoding](rank-syndrome-decoding.md)  
**Tracks:** rank-metric

**Learning goals.** Define rank weight and rank distance, contrast them with Hamming twins on a tiny worked matrix, and recognize “low-rank error” as the sparsity slogan used in rank-based PQC.

## Why this card exists

You already walked the [bridge story](../bridge/from-hamming-to-rank.md): expand symbols → matrix → weight = matrix rank.  
Papers will still say “rank weight $w$” in one breath. This card is the **vocabulary postcard** — denser than the bridge, still patient, with tables and drills.

## Intuition — same linear code, different yardstick

A vector $\mathbf{x}\in\mathbb{F}_{q^m}^n$ (length $n$, symbols in an extension field) can be rewritten as an $m\times n$ matrix $X$ over the small field $\mathbb{F}_q$: expand each coordinate in a fixed $\mathbb{F}_q$-basis of $\mathbb{F}_{q^m}$.

| Name | Definition | Hamming twin |
|------|------------|--------------|
| **Rank weight** $\|\mathbf{x}\|_R$ | $\mathrm{rank}(X)$ | Hamming weight = number of nonzero positions |
| **Rank distance** $d_R(\mathbf{x},\mathbf{y})$ | $\|\mathbf{x}-\mathbf{y}\|_R$ | Hamming distance = weight of $\mathbf{x}-\mathbf{y}$ |
| **Low-rank error** | $\|\mathbf{e}\|_R$ small | Low Hamming-weight (sparse) error |

A **rank-metric code** is a subset $C\subseteq\mathbb{F}_{q^m}^n$ (often a linear subspace) with distance $d_R$. Minimum rank distance plays the same *design* role as minimum Hamming distance: it limits how large an error you can uniquely correct — but the “size” number means something different.

### One-sentence contrast

> Hamming asks “how many positions flipped?” Rank asks “how many independent directions does the expanded error matrix use?”

## Worked example — two matrices, two stories

Fix $q=2$, $m=2$, $n=2$ (tiny postcard, same spirit as the bridge). Columns are $\mathbb{F}_2$-coordinates of two symbols.

$$
X_1=\begin{pmatrix}1&0\\0&1\end{pmatrix},\qquad
X_2=\begin{pmatrix}1&1\\0&0\end{pmatrix}.
$$

| Matrix | Rank weight | What a Hamming-minded glance might miss |
|--------|-------------|------------------------------------------|
| $X_1$ | $2$ | Two independent columns — “large” in rank |
| $X_2$ | $1$ | Columns are dependent — “small” in rank |

Both can arise from vectors with one or two nonzero *extension-field* symbols depending on the basis. The lesson is not a specific field label — it is:

> Same ambient length $n$ can hide very different “sizes” once you switch metrics.

### Slow-motion: what “rank 1” feels like

All columns of a rank-$1$ matrix live on one line in $\mathbb{F}_q^m$ (as an $\mathbb{F}_q$-vector space).  
A rank-$2$ matrix needs two independent directions. Crypto often wants **low-rank** noise so a trapdoor decoder can recover that small support space.

### Mid-page self-check

Does rank weight equal the number of $1$s in the expanded matrix?

<details><summary>Answer</summary>

No. Rank weight is the **matrix rank** (independent directions), not the Hamming weight of the entries. A dense-looking matrix can still have small rank if its columns are dependent.

</details>

## Formal definition (light)

Let $C\subseteq\mathbb{F}_{q^m}^n$. Equip $C$ with $d_R$. If $C$ is a $k$-dimensional $\mathbb{F}_{q^m}$-linear subspace, papers still write $[n,k]$ (or similar) — the **length/dimension** language is familiar from [linear codes](linear-codes.md); only the distance changed.

Minimum rank distance $d$ suggests unique correction of errors with $\|\mathbf{e}\|_R < d/2$ in the usual coding sense — same inequality shape as Hamming, different metric.

## Hamming twin table (keep this)

| Idea | Hamming world | Rank world |
|------|---------------|------------|
| Error size | Weight $\|\mathbf{e}\|$ (nonzero positions) | Rank $\|\mathbf{e}\|_R=\mathrm{rank}(X)$ |
| Hard puzzle (postcard) | [Syndrome decoding](syndrome-decoding.md) | [Rank syndrome decoding](rank-syndrome-decoding.md) |
| Structured trapdoor examples | Goppa, MDPC, … | Gabidulin, [LRPC](lrpc-codes.md), … |
| Main lab track | [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md) | [Rank metric](../tracks/rank-metric/ROADMAP.md) |

Do **not** paste Hamming ISD cost formulas into a rank parameter table without a rank-specific analysis.

## Where it appears in PQC

Gabidulin-based schemes, LRPC / RQC-shaped designs, and “blockwise rank decoding” variants all use this metric.  
This lab’s ideal blockwise LRPC WIP sits on the [rank-metric track](../tracks/rank-metric/ROADMAP.md), not on the Hamming KEM core path.

## Common confusions

- Rank metric still uses **linear codes** — the distance changed, not linear algebra itself.  
- Low Hamming weight of the extension-field vector does **not** automatically mean low rank (and conversely).  
- “Support” in rank papers often means a **span** (row/column space language), not only a list of nonzero positions.  
- Binary McEliece stories in the main track stay Hamming unless a paper says otherwise.  
- Lattice [LWE](lwe.md) is a different fork — not the same as rank metric.

## Check yourself

1. What matrix’s rank is the rank weight of a vector in $\mathbb{F}_{q^m}^n$?  
2. Low-rank error is analogous to what Hamming notion?  
3. True or false: two vectors with the same number of nonzero symbols must have the same rank weight.  
4. Which track owns this card?  

<details><summary>Answers</summary>

1. The $m\times n$ expansion of the vector over $\mathbb{F}_q$ (fixed basis).  
2. Low Hamming-weight (sparse) error.  
3. False — dependent vs independent columns can change the rank with the same Hamming-looking pattern.  
4. [Rank metric](../tracks/rank-metric/ROADMAP.md).

</details>

## Big practice set

1. Expand (in words) the recipe: vector over $\mathbb{F}_{q^m}$ → matrix over $\mathbb{F}_q$ → rank weight.  
2. Fill the blank: rank distance $d_R(\mathbf{x},\mathbf{y})=\|\,\_\_\_\,\|_R$.  
3. Why might a designer prefer a **different** metric than Hamming for a KEM family?  
4. Name one structured code family that corrects low-rank errors with a trapdoor (hint: next card).  

<details><summary>Practice answers</summary>

1. Fix a basis of $\mathbb{F}_{q^m}/\mathbb{F}_q$; write each symbol as an $m$-tall column; stack $n$ columns; take matrix rank.  
2. $\mathbf{x}-\mathbf{y}$.  
3. Different algebraic constructions (and attack landscapes) become available; key sizes / decoders differ from Hamming MDPC-style stories.  
4. LRPC (or Gabidulin) — see [LRPC codes](lrpc-codes.md).

</details>

## Next steps

- [LRPC codes](lrpc-codes.md)  
- [Rank syndrome decoding](rank-syndrome-decoding.md)  
- Revisit bridge: [From Hamming to rank](../bridge/from-hamming-to-rank.md)  
