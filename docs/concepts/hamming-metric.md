# Hamming metric

**Prereqs:** [Bits, XOR](../fundamentals/bits-xor-randomness.md) · [From bits to codes](../bridge/from-bits-to-codes.md) · [Vectors](../fundamentals/vectors-matrices.md)  
**Next:** [Error-correcting codes](error-correcting-codes.md) · [Linear codes](linear-codes.md) · [Goppa and alternant](goppa-alternant.md) · [Syndrome decoding](syndrome-decoding.md)  
**Tracks:** code-based-kems

**Learning goals.** Compute Hamming weight and Hamming distance by hand, state the Hamming metric as “count disagreements,” connect distance to correcting radius $t$, and contrast briefly with the rank metric so you never mix the two.

## Why this card exists

Almost every page on the [code-based KEM track](../tracks/code-based-kems/ROADMAP.md) silently uses the **Hamming** yardstick: how many positions differ. Weight, distance, sparse errors, and “correct $t$ errors” all live here.

Fundamentals taught weight on [Bits, XOR](../fundamentals/bits-xor-randomness.md); the bridge [From bits to codes](../bridge/from-bits-to-codes.md) used distance for repeat-3. This card is the **named metric** papers assume you already know.

## Intuition — count the disagreements

Fix two bit-strings of the same length. Walk position by position. Every place they disagree scores $1$. The total score is the **Hamming distance**.

The **Hamming weight** of one string is how many $1$s it has — the same as its distance to the all-zero string.

**Slogan:**

> Hamming size = number of nonzero positions (for bits: number of flips from zero).

### Picture

| position | 1 | 2 | 3 | 4 | 5 |
|----------|---|---|---|---|---|
| $x$ | 1 | 0 | 1 | 1 | 0 |
| $y$ | 1 | 1 | 1 | 0 | 0 |
| disagree? | no | **yes** | no | **yes** | no |

Distance $d(x,y)=2$.

## Formal definition (light)

For $x,y\in\{0,1\}^n$ (or more generally over an alphabet, counting nonzero coordinate differences):

$$
\mathrm{wt}(x) = \#\{i: x_i \neq 0\},
$$

$$
d(x,y) = \mathrm{wt}(x-y)
$$

(over bits, $x-y$ is XOR: $x\oplus y$).

Properties you will use constantly:

1. $d(x,y)=0$ iff $x=y$.  
2. $d(x,y)=d(y,x)$.  
3. Triangle inequality: $d(x,z)\le d(x,y)+d(y,z)$.  

That is why it is called a **metric**.

### Quick self-check

Weight of $11010$? Distance between $11010$ and $10011$?  
<details><summary>Answer</summary>
$\mathrm{wt}=3$; $11010\oplus 10011=01001$, distance $2$.
</details>

## Worked examples

### Weight table

| string | $\mathrm{wt}$ |
|--------|---------------|
| $0000$ | 0 |
| $1000$ | 1 |
| $1010$ | 2 |
| $1111$ | 4 |

### Distance via XOR

$x=1011$, $y=0010$:

$$
x\oplus y = 1001, \qquad d(x,y)=2.
$$

### Sparse errors (crypto language)

An error $e$ with $\mathrm{wt}(e)\le w$ is a **weight-$w$ (or at most $w$) error**.  
Code-based schemes often sample **sparse** $e$ on purpose — few flips, hard to find if you only see a linear fingerprint ([Syndrome decoding](syndrome-decoding.md)).

## Minimum distance and correcting radius

For a code $C$, the **minimum distance** $d$ is the smallest Hamming distance between any two distinct codewords.

Nearest-neighbor decoding can always correct

$$
t = \left\lfloor \frac{d-1}{2} \right\rfloor
$$

errors (when you can afford the search) — balls of radius $t$ around codewords do not overlap.

### Repeat-3 reminder

Codewords $000$ and $111$: $d=3$, so $t=1$.  
One flip → still closer to the true codeword; two flips can fool you.  
Full story: [From bits to codes](../bridge/from-bits-to-codes.md) · [Error-correcting codes](error-correcting-codes.md).

### Quick self-check

If $d=7$, what is $t$?  
<details><summary>Answer</summary>
$t=\lfloor(7-1)/2\rfloor=3$.
</details>

## Where it appears in PQC

| Phrase in papers | Hamming meaning |
|------------------|-----------------|
| Weight-$w$ error | At most $w$ nonzero positions |
| Bounded-distance decoding | Recover if $\mathrm{wt}(e)\le t$ |
| Syndrome decoding | Find sparse $e$ with $He^\top=s$ |
| ISD cost models | Search over sparse patterns in Hamming weight |

The entire Hamming [code-based track](../tracks/code-based-kems/ROADMAP.md) — McEliece, QC-MDPC, HQC/BIKE-shaped stories — uses this metric unless a paper says otherwise.

## Contrast: not the rank metric

| | Hamming | Rank |
|--|---------|------|
| “Size” of error | Number of nonzero positions | Rank of an expanded matrix |
| Typical track | Code-based KEMs (this card) | [Rank metric](rank-metric.md) |
| Bridge | [From bits to codes](../bridge/from-bits-to-codes.md) | [From Hamming to rank](../bridge/from-hamming-to-rank.md) |

**Do not** paste Hamming ISD tables into a rank-parameter paper unchanged.

## Common confusions

- Weight counts ones (nonzeros); it is not the integer value of the bit-string ($101$ has weight $2$, not five).  
- Distance is not “subtract as decimal numbers.”  
- Low weight $\neq$ low rank automatically ([rank metric](rank-metric.md)).  
- Minimum distance $d$ is a property of the *whole code*, not of one received word.  
- Larger $n$ alone does not mean larger $d$ — design matters.

## Check yourself

1. Compute $\mathrm{wt}(01101)$ and $d(01101,00111)$.  
2. In one sentence, what is the Hamming metric measuring?  
3. If minimum distance is $5$, how many errors can you always correct (rule of thumb)?  
4. True or false: Hamming weight of $e$ is the number of bit flips from the zero string.  
5. Name the twin metric used by LRPC / RQC-shaped schemes.  

<details><summary>Answers</summary>

1. Weight $3$; XOR $01010$ has weight $2$.  
2. How many positions two strings disagree (size = count of nonzeros).  
3. $t=\lfloor(5-1)/2\rfloor=2$.  
4. True (for bits).  
5. Rank metric.

</details>

## Big practice set

1. Fill: $d(x,y)=\mathrm{wt}(?)$.  
2. Two codewords differ in $9$ places and nowhere less for any other pair. What are $d$ and $t$?  
3. Why do McEliece-style senders want *sparse* $e$ but not *too* sparse to be unique for Alice? (one careful sentence is enough)  

<details><summary>Answers</summary>

1. $x\oplus y$ (or $x-y$ in the alphabet).  
2. $d=9$, $t=4$.  
3. Sparse enough that Alice’s decoder can remove it / the instance stays in the designed radius, but the sparse-search problem stays hard for attackers without the trapdoor — parameter choice balances both.

</details>

## Next steps

- [Error-correcting codes](error-correcting-codes.md)  
- [Linear codes](linear-codes.md) · [Syndrome decoding](syndrome-decoding.md)  
- Rank fork: [From Hamming to rank](../bridge/from-hamming-to-rank.md) · [Rank metric](rank-metric.md)  
- Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
