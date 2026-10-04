# Polynomials (gentle) — Part B: wrap-around

**Prereqs:** [Polynomials Part A (add and multiply)](polynomials-gentle.md)  
**Next:** [Quantum threat](quantum-threat.md) · Concept: [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md) · Bridge: [From bits to codes](../bridge/from-bits-to-codes.md)

**Learning goals.** Treat $X^n$ as $1$ (circular length $n$), reduce a product mod $X^n-1$ by hand, see that $\times X$ rotates coefficients, and meet the sparse×random slogan used later in QC KEMs.

## Why this page exists

Part A stopped before wrap-around on purpose.  
This page is **only** the crypto move: keep coefficient lists a **fixed length** $n$.

If Part A still feels shaky, redo its lab first — do not rush here.

## Symbols on this page

| Symbol | English |
|--------|---------|
| $X^n\equiv 1$ | Power $n$ folds back to the constant term |
| $\bmod (X^n-1)$ | Work on a circle of length $n$ |
| rotate | Multiplying by $X$ shifts coefficients around the circle |
| $t(X)R(X)$ | Sparse times random — structured noise slogan |

## Story first — conveyor belt

Imagine $n$ slots on a circular belt.  
Multiplying can produce $X^n$, which is “past the end,” so you fold it to the start: $X^n$ becomes $1$, $X^{n+1}$ becomes $X$, …

That is **not** the same as reducing coefficients mod 2 (you already do that in Part A). Wrap-around reduces **powers**. Both happen in quasi-cyclic crypto.

## Warm-up: $n=2$

Work modulo $X^2-1$. Then $X^2\equiv 1$.

From Part A: $(1+X)(1+X)=1+X^2$.  
Replace $X^2$ by $1$:

$$
1 + X^2 \equiv 1 + 1 = 0 \pmod{X^2-1}.
$$

Coefficient list length 2: $(0,0)$.  
**English:** after wrap-around, everything canceled.

## Fully worked: $n=3$

Work modulo $X^3-1$. Then $X^3\equiv 1$.

Take $1 + X + X^2 + X^3$ from Part A’s multiply.  
Replace $X^3$ by $1$:

$$
1 + X + X^2 + 1 = X + X^2,
$$

because $1+1=0$ in bits. List length 3: $(0,1,1)$.

### Quick self-check

Mod $X^3-1$, reduce $X^4$.  
<details><summary>Answer</summary>
$X^4 = X\cdot X^3 \equiv X\cdot 1 = X$.
</details>

## Multiplying by $X$ rotates

Still mod $X^3-1$. Let $a=1+X^2$ with coeffs $(1,0,1)$.

$$
X\cdot a = X + X^3 \equiv X + 1 = 1+X,
$$

coeffs $(1,1,0)$ — a **rotation**. This is why quasi-cyclic constructions like polynomials.

## Sparse × random (slogan for later)

Let $t(X)$ be sparse and $R(X)$ random.  
The product $tR$ (with wrap-around) is structured noise in some KEMs.  
Output coordinates can be **dependent** because they share pieces of $R$ — see later [independence heuristics](../concepts/independence-heuristics.md) and ePrint 2025/018.

## Slow-motion lab (Part B)

1. Mod $X^2-1$, simplify $X^2$.  
2. Mod $X^3-1$, reduce $X^4$.  
3. Mod $X^3-1$, reduce $1+X+X^2+X^3$.  
4. True or false: weight of $tR$ is always $(\mathrm{wt}\,t)\times(\mathrm{wt}\,R)$.  

<details><summary>Answers</summary>

1. $1$.  
2. $X$.  
3. $X+X^2$.  
4. False — cancellations and wrap-around change weight.

</details>

## Bridge to PQC

| Later page | Why wrap-around showed up |
|------------|---------------------------|
| [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md) | Compact keys via polynomial blocks |
| HQC-style noise | Products of sparse polynomials |
| [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) | Independence of product noise |

## Common confusions

- Wrap-around ($X^n\equiv 1$) ≠ coefficient mod 2 — both happen.  
- Fixed length $n$ is intentional — crypto wants fixed-size objects.  
- Skipping Part A and only reading this page usually backfires.

## Check yourself

1. Mod $X^4-1$, what is $X^4$? What is $X^5$?  
2. In one sentence, why does $\times X$ rotate?  
3. Where do you go if add/multiply still feels fuzzy?  

<details><summary>Answers</summary>

1. $1$; $X$.  
2. $X^n$ folds to $1$, so shifting powers wraps the coefficient list.  
3. [Polynomials Part A](polynomials-gentle.md).

</details>

## Next steps

- [Quantum threat](quantum-threat.md)  
- Concept: [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md)  
- Bridge: [From bits to codes](../bridge/from-bits-to-codes.md)  
- Lattice packaging later: [Module-LWE](../concepts/module-lwe.md)  
