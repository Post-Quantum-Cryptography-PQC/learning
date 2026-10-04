# Linear codes over finite fields

**Prereqs:** [Generator and parity-check](../bridge/generator-and-parity-check.md) · [Finite fields beyond F₂](../bridge/finite-fields-beyond-f2.md)  
**Next:** [Syndrome decoding](syndrome-decoding.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md)  
**Tracks:** code-based-kems · rank-metric

**Learning goals.** Read $[n,k]$ notation, explain $G$ vs $H$, and compute a syndrome $Hy^\top=He^\top$ on a tiny example — recognizing that you already did this on the bridge.

## Why this card exists

Papers say “let $C$ be an $[n,k]$ linear code over $\mathbb{F}_q$” without slowing down. This card is that sentence unpacked.

**You already did the hard work** on [Generator and parity-check](../bridge/generator-and-parity-check.md): the even-weight length-3 toy, encoding with $G$, checking with $H$, and a syndrome. This page mostly **names** what you computed and writes the paper-style definition.

## Intuition (same picture, shorter)

A **linear code** is a carefully chosen subspace of $\mathbb{F}_q^n$ (lists of length $n$ with entries in a finite field).  

Two descriptions of the same object:

- **Generator matrix $G$:** builds every codeword from a short message.  
- **Parity-check matrix $H$:** every codeword satisfies $H\mathbf{c}^\top=\mathbf{0}$.

If you receive $y=c+e$ (XOR when $q=2$), then

$$
Hy^\top = He^\top = s,
$$

the **syndrome** — a fingerprint of the error.

## Formal definition (after the toy)

An $[n,k]$ linear code over $\mathbb{F}_q$ is a $k$-dimensional subspace of $\mathbb{F}_q^n$.  

| Symbol | Meaning in plain words |
|--------|------------------------|
| $n$ | Length — how many symbols in each codeword |
| $k$ | Dimension — roughly how many information symbols (message length) |
| $q$ | Field size — $q=2$ means bits |
| $n-k$ | Roughly how many independent parity checks |

Typically $H$ has about $n-k$ independent rows, and

$$
C=\{\mathbf{c}: H\mathbf{c}^\top=\mathbf{0}\}.
$$

**Reading tip:** when a paper writes $[n,k]_q$ or “binary $[n,k]$,” unpack it with the table above before chasing theorems.

## Worked example (binary parity) — expanded

This is the **same** even-parity toy as the bridge.

Over $\mathbb{F}_2$, length $n=3$, one parity: $c_1+c_2+c_3=0$.

**All codewords** (list them once more):

| codeword | even parity? |
|----------|--------------|
| $(0,0,0)$ | yes |
| $(1,1,0)$ | yes |
| $(1,0,1)$ | yes |
| $(0,1,1)$ | yes |
| $(1,0,0)$ | no (odd) |
| $(0,1,0)$ | no |
| $(0,0,1)$ | no |
| $(1,1,1)$ | no |

So there are $2^k=4$ codewords with $k=2$.  
Thus $[n,k]=[3,2]$ and $H=(1\,1\,1)$.

One generator (messages length $2$):

$$
G = \begin{pmatrix} 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}.
$$

Encode $\mathbf{m}=(1,0)$: $\mathbf{c}=(1,1,0)$.

### Syndromes for a few errors

| error $e$ | $He^\top = e_1+e_2+e_3$ | meaning |
|-----------|-------------------------|---------|
| $(0,0,0)$ | $0$ | looks like a codeword |
| $(1,0,0)$ | $1$ | odd weight — detected |
| $(0,0,1)$ | $1$ | also detected; same syndrome as $(1,0,0)$ |
| $(1,1,0)$ | $0$ | this “error” is itself a codeword — invisible to $H$ |

With only one parity bit, different weight-1 errors can share the same syndrome ($1$). Locating the flip needs a richer $H$ (more rows) — the bridge’s two-check example.

### Second worked table — two checks (locate the flip)

Over $\mathbb{F}_2$, length $n=3$, take

$$
H=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}.
$$

This is the bridge’s two-check spirit: each column of $H$ is a distinct nonzero syndrome fingerprint for a weight-$1$ error.

| error $e$ | $He^\top$ | reading |
|-----------|-----------|---------|
| $(0,0,0)$ | $(0,0)$ | no error detected |
| $(1,0,0)$ | $(1,0)$ | matches column 1 |
| $(0,1,0)$ | $(1,1)$ | matches column 2 |
| $(0,0,1)$ | $(0,1)$ | matches column 3 |
| $(1,1,0)$ | $(0,1)$ | weight $2$ — same syndrome as $(0,0,1)$ |

**Moral:** richer $H$ can separate weight-$1$ patterns; colliding syndromes still appear once weight grows. That tension returns in [syndrome decoding](syndrome-decoding.md).

### Mid-page self-check

For the two-row $H$ above, which single-bit error produces syndrome $(1,1)$?

<details><summary>Answer</summary>

$e=(0,1,0)$ — the middle column of $H$.

</details>

## Where it appears in PQC

Public keys often look like matrices derived from $G$ or $H$. Security hinges on the attacker **not** knowing the secret structure that makes decoding easy for the owner.

Rank-metric codes (later track) keep the linear-algebra spirit but measure distance by matrix rank instead of Hamming weight.

## Common confusions

- Dimension $k$ is roughly message length, not “difficulty.”  
- $G$ encodes; $H$ checks — different jobs.  
- $\mathbb{F}_4$ is not “integers mod 4.”  
- $[n,k]$ is notation, not a fraction $n/k$.  
- If this card feels sudden, go back to the bridge worked example — do not grind the formal sentence alone.

## Check yourself

1. If $Hc^\top=0$ and $y=c\oplus e$, why is $Hy^\top=He^\top$?  
2. What does $[n,k]$ roughly mean?  
3. Who needs the secret structured decoder in a public-key scheme?  
4. For the $[3,2]$ toy, how many codewords are there?  
5. Why can $(1,0,0)$ and $(0,0,1)$ give the same syndrome under $H=(1\,1\,1)$?  
6. For the two-row $H$ above, what syndrome does $e=(1,0,0)$ produce?  

<details><summary>Answers</summary>

1. Because $H(c\oplus e)^\top=Hc^\top+He^\top=He^\top$.  
2. Length $n$, dimension $k$ (about $k$ information symbols).  
3. The secret-key owner.  
4. $4$ (namely $2^k$).  
5. Both have odd weight $1$, so both sum to $1$ under the single parity check.  
6. $(1,0)$ — the first column of $H$.

</details>

## Big practice set

1. Encode $\mathbf{m}=(0,1)$ with the $G$ above; what codeword do you get?  
2. Using the two-row $H$, compute the syndrome of $y=(1,1,1)$.  
3. True or false: $[n,k]$ means the fraction $n/k$.  
4. Rank-metric codes later keep $G$/$H$ spirit but change which distance?  

<details><summary>Practice answers</summary>

1. Second row of $G$: $\mathbf{c}=(1,0,1)$.  
2. $Hy^\top=(1+1,\,1+1)=(0,0)$ — $y$ is a codeword (even under both checks).  
3. False — length $n$, dimension $k$.  
4. Hamming distance → rank distance (see [rank metric](rank-metric.md)).

</details>

## Next steps

- [Syndrome decoding](syndrome-decoding.md)  
- [Quasi-cyclic codes](quasi-cyclic-codes.md)  
- Bridge: [Generator and parity-check](../bridge/generator-and-parity-check.md)  
