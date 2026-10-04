# Rank syndrome decoding

**Prereqs:** [Rank metric](rank-metric.md) · [Syndrome decoding](syndrome-decoding.md) · [LRPC codes](lrpc-codes.md)  
**Next:** Track: [Rank metric](../tracks/rank-metric/ROADMAP.md) · [Information-set decoding](information-set-decoding.md) (Hamming twin)  
**Tracks:** rank-metric

**Learning goals.** State the rank-metric decoding problem in one line, contrast it side-by-side with Hamming syndrome decoding, and separate the owner’s structured decoder from the attacker’s hard public instance.

## Why this card exists

Hamming [syndrome decoding](syndrome-decoding.md) is the hardness slogan for the main KEM track. Rank-based schemes need the twin slogan: recover a **low-rank** error from a syndrome (or a related linear image).  

Papers will say “RSD / RD” casually; this card is the patient postcard — same shape as Hamming SD, different sparsity constraint.

## Intuition — same shape, new “smallness”

**Given** a public linear map (often a parity-check matrix over an extension field) and a syndrome $\mathbf{s}$,  
**find** an error $\mathbf{e}$ of **rank weight** at most $w$ that produces $\mathbf{s}$.

Same sentence as Hamming SD if you swap “Hamming weight” for “rank weight.” That swap is the whole point.

| | Hamming SD | Rank SD |
|--|------------|---------|
| Error “size” | Number of nonzero positions | Rank of the expanded matrix ([rank metric](rank-metric.md)) |
| Typical trapdoor | Algebraic / sparse $H$ (Goppa, MDPC, …) | Low-rank support structure (e.g. [LRPC](lrpc-codes.md)) |
| Attack flavour (names only) | [ISD](information-set-decoding.md) and variants | Rank-decoding / algebraic / combinatorial searches — **different cost models** |
| Do not reuse | — | Hamming ISD work-factor tables without a rank analysis |

Slogan:

> Public: hard low-rank decoding instance.  
> Owner: structured code (e.g. LRPC) makes decoding feasible when noise rank stays in range.

### Mid-page self-check

If an error vector over $\mathbb{F}_{q^m}$ has Hamming weight $2$, is its rank weight automatically $2$?

<details><summary>Answer</summary>

No. Rank weight is the rank of the $\mathbb{F}_q$-expansion matrix. Two nonzero symbols can still produce dependent columns (rank $1$) or independent ones (rank up to $2$ in that toy length). Low Hamming weight $\neq$ low rank automatically.

</details>

## Formal definition (light)

**Rank Syndrome Decoding (informal):** inputs $(H,\mathbf{s},w)$; output $\mathbf{e}$ with

$$
H\mathbf{e}^\top=\mathbf{s}^\top
$$

(or the paper’s equivalent form) and $\|\mathbf{e}\|_R\le w$.

Exact matrix sizes and field parameters $(q,m,n)$ are scheme-specific. Read them as “how big is the ambient space?” — **not** as Hamming $(n,k,t)$ recycled unchanged.

Minimum-rank-distance coding theory still uses familiar “correct errors of rank $< d/2$” language; the hardness slogan for PQC is the **search** problem above for random-looking public instances.

## Worked story (owner vs attacker)

**Owner (LRPC-shaped intuition).**  
Knows a secret low-dimensional support for the checks. Expands the syndrome in that support and peels off a low-rank error when parameters allow. Failures can still happen (rank-metric cousins of [DFR](dfr.md)) — that is correctness engineering, not “the problem became easy for attackers.”

**Attacker.**  
Sees a public matrix that should not reveal the support, and faces a search whose best known algorithms are meant to be infeasible at the chosen parameters.

| Who | Sees | Job |
|-----|------|-----|
| Owner | Secret structure (e.g. LRPC support) | Decode low-rank $\mathbf{e}$ efficiently |
| Attacker | Public $H$, syndrome $\mathbf{s}$, bound $w$ | Solve rank SD without the trapdoor |

Do **not** paste Hamming ISD work factors into a rank-parameter table without a rank-specific analysis. Structure (ideal / blockwise / quasi-cyclic-like) can change both key size and attack cost.

## Tiny conceptual toy (not an attack estimate)

Suppose the ambient expansion is $2\times 3$ over $\mathbb{F}_2$ and $w=1$. Then admissible errors are those whose expanded matrix has rank $\le 1$ — a much smaller menu than “all matrices,” but still combinatorially structured differently from “weight $\le 1$ bit strings of length $3$.”

You are not meant to count crypto-sized search spaces by hand. You are meant to feel:

> The constraint set changed; so did the best-known search methods.

## Where it appears in PQC

- Rank-metric KEMs / PKEs (RQC-shaped, LRPC-based, …).  
- TIT themes such as blockwise rank decoding and related cryptanalysis.  
- This lab’s ideal blockwise LRPC WIP — frontier reading after this card + [rank metric](rank-metric.md) + [LRPC](lrpc-codes.md).

## Common confusions

- Rank SD $\neq$ “run Hamming ISD on the bit expansion.”  
- Low Hamming weight of the extension-field vector does not automatically mean low rank.  
- Owner decoding failures are separate from attack cost.  
- Ideal / structured public keys can weaken or strengthen attacks — structure is not free security.  
- Naming (“RSD” vs “RD”) varies by paper; always check whether they mean syndrome form or a close cousin.

## Check yourself

1. What replaces “Hamming weight $\le w$” in rank SD?  
2. Name one structured code family that helps the owner decode.  
3. Should you reuse McEliece ISD tables for rank parameters?  
4. True or false: if the owner sometimes fails to decode, rank SD must be easy for attackers.  

<details><summary>Answers</summary>

1. Rank weight $\|\mathbf{e}\|_R\le w$ (rank of the expanded matrix).  
2. LRPC (low-rank parity-check) codes — see [LRPC](lrpc-codes.md).  
3. No — use rank-decoding cost models (and watch for structure).  
4. False — failure rate is a correctness / DFR-style issue for the legitimate decoder; attack cost is a separate question.

</details>

## Big practice set

1. Write Hamming SD and Rank SD each in one parallel sentence.  
2. Fill: trapdoor examples — Hamming _____ / _____ ; rank _____.  
3. Why might “blockwise” or “ideal” adjectives appear next to rank decoding in TIT papers?  
4. Which Hamming attack-family card is the *conceptual* twin (not interchangeable) of this one?  

<details><summary>Practice answers</summary>

1. Hamming: find low Hamming-weight $\mathbf{e}$ with $H\mathbf{e}^\top=\mathbf{s}^\top$. Rank: find low-rank $\mathbf{e}$ with the same linear shape.  
2. Goppa / MDPC (examples); LRPC.  
3. Structure changes representation, key size, and often the concrete attack surface — research studies those variants carefully.  
4. [Information-set decoding](information-set-decoding.md) for Hamming — different algorithms; similar “estimate attack work” role in parameter talk.

</details>

## Next steps

- Track: [Rank metric roadmap](../tracks/rank-metric/ROADMAP.md)  
- Revisit Hamming twin: [Syndrome decoding](syndrome-decoding.md) · [ISD](information-set-decoding.md)  
- Bridge: [From Hamming to rank](../bridge/from-hamming-to-rank.md)  
