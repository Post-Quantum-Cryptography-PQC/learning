# Quasi-cyclic codes

**Prereqs:** [Linear codes](linear-codes.md) · [Syndrome decoding](syndrome-decoding.md) · [Polynomials Part A](../fundamentals/polynomials-gentle.md) · [Polynomial wrap-around](../fundamentals/polynomials-wraparound.md)  
**Next:** [MDPC and QC-MDPC](mdpc-qc-mdpc.md) · [DFR](dfr.md) · [Independence heuristics](independence-heuristics.md) · Paper: [2025/018](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain why QC structure shrinks keys, identify bitlists with polynomials mod $X^n-1$, multiply a tiny example by hand, and see why product noise can create dependent coordinates.

## Why this card exists

HQC and BIKE live in the quasi-cyclic world. Without this card, “polynomial noise” in papers feels unmotivated.

You already met linear codes and syndrome decoding. Here the new ingredient is **structure**: rotations / polynomials that let designers store a few polynomials instead of a huge unstructured matrix.

If polynomial reduction is fuzzy, pause on [Polynomials Part A](../fundamentals/polynomials-gentle.md) then [wrap-around Part B](../fundamentals/polynomials-wraparound.md), then return.

## Intuition

A **cyclic** code looks the same if you rotate every codeword.  
**Quasi-cyclic** codes are built from blocks that behave like cyclic polynomials — usually elements of

$$
\mathbb{F}_2[X]/(X^n-1).
$$

Benefit: store a few polynomials instead of a huge unstructured matrix → **much smaller public keys**.  
Cost: extra algebraic structure that cryptanalysis must respect.

### Picture: matrix vs polynomial

| View | What you store |
|------|----------------|
| Unstructured linear code | Roughly a big $r\times n$ matrix of bits |
| Quasi-cyclic block | A few length-$n$ polynomials (or one row of each circulant block) |

Circulant blocks are exactly “multiplication by a fixed polynomial” written as a matrix. That is why papers switch freely between bitlists and polynomials.

## Formal definition (light)

Identify $(a_0,\ldots,a_{n-1})$ with

$$
a(X)=a_0+a_1X+\cdots+a_{n-1}X^{n-1}.
$$

Addition is bit-wise XOR on coefficients.  
Multiplication is ordinary polynomial multiplication, then reduce with $X^n\equiv 1$ (because you work modulo $X^n-1$).

Multiplication by a fixed sparse $t(X)$ is a quasi-cyclic linear map.  
Products $t(X)R(X)$ with random $R$ create structured noise — the setting audited in ePrint 2025/018 (see the lab [explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)).

### Mid-page self-check

What ring is the usual home for binary QC blocks?  
<details><summary>Answer</summary>
$\mathbb{F}_2[X]/(X^n-1)$.
</details>

## Worked reminder ($n=3$)

Take $t=1+X$ and $R=1+X^2$.

1. Expand the product without reducing:

$$
(1+X)(1+X^2)=1+X^2+X+X^3=1+X+X^2+X^3.
$$

2. Reduce mod $X^3-1$: use $X^3\equiv 1$, so $X^3$ becomes $1$, and

$$
1+X+X^2+X^3 \equiv 1+X+X^2+1 = X+X^2
$$

(over $\mathbb{F}_2$, $1+1=0$).

3. As a bitlist of length $3$ (coefficients of $1,X,X^2$): $tR$ corresponds to $(0,1,1)$.

Rotations appear because multiplying by $X$ cycles coefficients. Overlapping support of the same $R$ across related outputs creates **dependence** — different output bits are not independent coin flips.

### Second tiny multiply (you try)

Same $n=3$, compute $(1+X^2)(1+X)$ and reduce.  
<details><summary>Answer</summary>
Same product as above — multiplication is commutative here — so again $X+X^2$.
</details>

### Weight is not always a product

Weight of $tR$ is **not** always $(\mathrm{wt}\,t)\times(\mathrm{wt}\,R)$. Cancellations (even characteristic $2$) and wrap-around can change the weight. That matters when papers model “noise weight” after polynomial products.

| Claim | Verdict |
|-------|---------|
| $\mathrm{wt}(tR)=(\mathrm{wt}\,t)(\mathrm{wt}\,R)$ always | False |
| Shared $R$ can make output bits dependent | True |
| QC alone means the scheme is broken | False — it is a structured tradeoff |

## Where it appears in PQC

- Compact keys: HQC, BIKE, QC-MDPC variants.  
- Security analyses must account for rotations / ideals, not only random-code [ISD](information-set-decoding.md) formulas.  
- Noise modeling (independence vs concentration) becomes a research topic — next cards: [Independence heuristics](independence-heuristics.md) and [DFR](dfr.md).

| Design choice | Upside | Careful point |
|---------------|--------|----------------|
| Quasi-cyclic public key | Smaller keys / ciphertexts | Extra algebraic attack surface |
| Sparse polynomial multipliers | Efficient encode / structured noise | Dependent coordinates; weight quirks |
| Random-looking unstructured $H$ | Closer to classical ISD models | Huge keys |

## Common confusions

- Quasi-cyclic ≠ automatically broken; it is a structured tradeoff.  
- Independence heuristics can fail *because* of shared polynomial randomness.  
- Weight of $tR$ is not always $(\mathrm{wt}\,t)\times(\mathrm{wt}\,R)$.  
- Quoting only random-code ISD costs can be incomplete for QC schemes — structure may enable better attacks.  
- “Polynomial” here is still bits-with-wraparound, not real-number calculus.

## Check yourself

1. Why do designers like quasi-cyclic public keys?  
2. What ring is the usual home for binary QC blocks?  
3. Why might output bits of $tR$ be dependent?  
4. Reduce $X^3$ in $\mathbb{F}_2[X]/(X^3-1)$.  
5. True or false: ISD cost formulas for random codes automatically apply unchanged to every QC scheme.  

<details><summary>Answers</summary>

1. Much smaller keys (store polynomials, not full matrices).  
2. $\mathbb{F}_2[X]/(X^n-1)$.  
3. They share overlapping pieces of the same $R$.  
4. $X^3\equiv 1$.  
5. False — structure can change the attack landscape; ISD is still a baseline.

</details>

## Big practice set

1. Identify $(1,0,1)$ with a polynomial in $\mathbb{F}_2[X]/(X^3-1)$.  
2. Compute $(1+X)(1+X)$ mod $X^3-1$.  
3. In one sentence, what is the main security *cost* of using QC structure?  
4. Name two PQC scheme families that use QC-style structure (from this card).  

<details><summary>Answers</summary>

1. $1+X^2$.  
2. $1+X^2$ (because $(1+X)^2=1+X^2$ over $\mathbb{F}_2$, and no $X^3$ term appears).  
3. Extra algebraic structure that cryptanalysis must respect (possible shortcuts beyond random-code ISD).  
4. HQC and BIKE (also QC-MDPC variants).

</details>

## Next steps

- [DFR](dfr.md)  
- [Independence heuristics](independence-heuristics.md)  
- Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
- Revisit hardness: [Syndrome decoding](syndrome-decoding.md) · [Information-set decoding](information-set-decoding.md)  
- Polynomial refresh: [Part A](../fundamentals/polynomials-gentle.md) · [Part B wrap-around](../fundamentals/polynomials-wraparound.md)  
