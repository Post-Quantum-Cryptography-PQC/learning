# MinRank and MPCitH signatures (MiRitH)

**Prereqs:** [Rank metric](rank-metric.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md) · helpful: [Oil–vinegar multivariate](oil-vinegar-multivariate.md)  
**Next:** Track: [Rank metric](../tracks/rank-metric/ROADMAP.md) · [Multivariate](../tracks/multivariate/ROADMAP.md)  
**Tracks:** rank-metric · multivariate

**Learning goals.** After this page you can:

- State the MinRank problem as “find a low-rank combination of matrices”  
- Sketch MPCitH as “prove you know a secret by simulating a multi-party protocol in the head”  
- Place **MiRitH** as MinRank + MPCitH among curated rank / MQ leaves  

## The one idea

[Rank metric](rank-metric.md) already taught “low rank = sparse in a matrix sense.”  
**MinRank** asks: given matrices $M_0,\ldots,M_k$ over a finite field, find field elements $x_1,\ldots,x_k$ (not all zero, with size constraints in crypto) such that

$$
\mathrm{rank}\Big(M_0 + x_1 M_1 + \cdots + x_k M_k\Big)
$$

is at most some small target $r$ [[1]](#ref-1).

That search problem is believed hard for suitable parameters and anchors several multivariate / rank signature designs.

## Toy MinRank (postcard)

Take $2\times 2$ matrices over $\mathbb{F}_2$. Suppose

$$
M_0=\begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
M_1=\begin{pmatrix}1&0\\0&0\end{pmatrix}.
$$

For $x_1=1$, $M_0+M_1$ has rank $1$. Finding such an $x$ by hand is easy at toy size; crypto sizes make exhaustive search and algebraic attacks expensive [[1]](#ref-1).

### Mid-page self-check

Is MinRank the same as “Hamming syndrome decoding”?

<details><summary>Answer</summary>

No. Syndrome decoding is about sparse **vectors** under Hamming weight. MinRank is about sparse **rank** of a linear combination of matrices ([rank metric](rank-metric.md)).

</details>

## MPCitH in one metaphor

**MPC-in-the-head** (MPCitH) signatures roughly:

1. Imagine several virtual parties hold shares of a secret witness (e.g. a MinRank solution).  
2. They run a multi-party computation that checks the witness is valid.  
3. The signer commits to the parties’ views, opens a random subset, and builds a Fiat–Shamir signature from that proof [[1]](#ref-1).

Verifiers check the opened views are consistent — without learning the full witness.

## MiRitH

[[1]](#ref-1) presents **MiRitH**: a post-quantum signature from **MinRank in the head** (MPCitH), with hypercube optimizations, concrete parameter sets, and quantum security discussion via Grover-amplified MinRank search.  
Reported Category-I signatures are on the order of ~5.7 kB (short) / ~7.9 kB (fast variants) in that paper’s tables — read numbers from the extract, not from memory.

Curriculum use: this card unlocks the [rank-metric track](../tracks/rank-metric/ROADMAP.md) MiRitH leaf; it does **not** replace LRPC / rank-SD cards.

## Common confusions

- MinRank ≠ LRPC decoding (related rank world, different problem statement).  
- MPCitH ≠ “real network MPC among devices” — the parties are usually **virtual** inside the proof.  
- MiRitH ≠ UOV oil–vinegar; both can live under “multivariate / algebraic” umbrellas but hardness stories differ [[1]](#ref-1).

## Check yourself

1. Complete: MinRank seeks a _______ combination of matrices with small _______.  
<details><summary>Answer</summary>
Linear combination; rank.
</details>

2. What does “in the head” emphasize about the MPC?  
<details><summary>Answer</summary>
The multi-party protocol is simulated / proven inside the signature, not run as a live network ceremony.
</details>

3. Where is the curated MiRitH extract?  
<details><summary>Answer</summary>
`papers/tches-pqc/mirith-efficient-post-quantum-signatures-from-minrank-in-the-head/paper.md`
</details>

## Next steps

- [Rank-metric ROADMAP](../tracks/rank-metric/ROADMAP.md)  
- Contrast with [oil–vinegar](oil-vinegar-multivariate.md) for MQ Sign without MinRank proofs  

## References

<a id="ref-1"></a>[1] G. Adj et al., “MiRitH: Efficient post-quantum signatures from MinRank in the head,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2024, no. 2, pp. 304–328, 2024, doi: [10.46586/tches.v2024.i2.304-328](https://doi.org/10.46586/tches.v2024.i2.304-328).
