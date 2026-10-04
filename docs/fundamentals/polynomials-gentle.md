# Polynomials (gentle) — Part A: add and multiply

**Prereqs:** [Modular arithmetic](modular-arithmetic.md) · [Vectors](vectors-matrices.md) · [Bits, XOR](bits-xor-randomness.md)  
**Next:** [Polynomial wrap-around (Part B)](polynomials-wraparound.md) · [Quantum threat](quantum-threat.md)

**Learning goals.** See a bit-string as a polynomial, add two bit-polynomials by XOR of coefficients, and multiply by distributing — **without** wrap-around yet.

## Why this page exists

Polynomials are the steepest fundamental topic. We split them on purpose:

- **Part A (this page):** labels, add, multiply.  
- **Part B:** [wrap-around mod $X^n-1$](polynomials-wraparound.md) — the crypto move for quasi-cyclic schemes.

You do **not** need calculus. You need the FOIL habit from algebra class, plus bits.  
**Study tip:** do every tiny example on paper.

## Symbols on this page

| Symbol | English |
|--------|---------|
| $X$ | Placeholder for position (not “solve for $X$”) |
| $a(X)$ | Polynomial whose coefficients are bits |
| $+$ | XOR of matching coefficients (mod 2) |
| $\times$ / juxtaposition | Distribute, then XOR like terms |
| weight | Number of nonzero coefficients |

## Part 1 — a polynomial is a labeled bit-string

Take bits $(a_0,a_1,a_2)=(1,0,1)$.  
Write:

$$
a(X) = 1 + 0\cdot X + 1\cdot X^2 = 1 + X^2.
$$

| power | $X^0=1$ | $X^1$ | $X^2$ |
|-------|----------|--------|-------|
| coefficient | $a_0$ | $a_1$ | $a_2$ |

**Weight** of a polynomial = number of nonzero coefficients = Hamming weight of the coefficient list.  
$1+X^2$ has weight $2$.

### Same idea, another string

Bits $(1,1,0)$ mean $1+X$. Weight $2$.  
**Weight ≠ degree.** Degree is highest power; weight counts how many terms are on.

## Part 2 — adding polynomials

Addition is **coefficient-wise XOR** (same as adding vectors of bits).

| power | $1$ (const) | $X$ | $X^2$ |
|-------|-------------|-----|-------|
| first poly $1+X$ | $1$ | $1$ | $0$ |
| second poly $1+X^2$ | $1$ | $0$ | $1$ |
| **sum (XOR)** | $0$ | $1$ | $1$ |

$$
(1+X) + (1+X^2) = X + X^2.
$$

### Cancel a middle term

$$
(1+X) + (X+X^2) = 1 + X^2,
$$

because $X+X=0$ in bits.

### Quick self-check

Add $1+X^2$ and $X+X^2$ over $\mathbb{F}_2$.  
<details><summary>Answer</summary>
$1 + X$ (the $X^2$ terms cancel).
</details>

## Part 3 — multiplying polynomials

Ordinary algebra: $(1+X)(1+X^2)=1\cdot 1 + 1\cdot X^2 + X\cdot 1 + X\cdot X^2$.

Over bits, same expansion, coefficients mod 2:

$$
(1+X)(1+X^2) = 1 + X^2 + X + X^3 = 1 + X + X^2 + X^3.
$$

Coefficient list length 4: $(1,1,1,1)$.

**Slow motion of the four terms:** $1$, $X^2$, $X$, $X^3$ — then XOR (nothing cancels yet).

### Watch cancellations

$$
(1+X)(1+X) = 1 + X + X + X^2 = 1 + X^2,
$$

because $X+X=0$. This surprises everyone once.

### Quick self-check

Expand $(1+X^2)(1+X)$ over $\mathbb{F}_2$ (no wrap-around yet).  
<details><summary>Answer</summary>
$1 + X + X^2 + X^3$.
</details>

## Slow-motion lab (Part A only)

1. Write $(1,1,0)$ as a polynomial.  
2. Add $(1+X)$ and $(X+X^2)$ over $\mathbb{F}_2$.  
3. Expand $(1+X)(1+X)$ over $\mathbb{F}_2$ (no wrap yet).  

<details><summary>Answers</summary>

1. $1+X$.  
2. $1 + X^2$.  
3. $1+X^2$.

</details>

## Common confusions (Part A)

- $X$ is a formal placeholder, not “plug in $X=7$.”  
- Weight ≠ degree.  
- Polynomial multiply ≠ XOR of coefficient vectors (that would be addition).

## Check yourself

1. Weight of $1+X+X^3$?  
2. Over $\mathbb{F}_2$, expand $(1+X^2)(1+X)$.  
3. True or false: you must finish wrap-around before leaving this page.  

<details><summary>Answers</summary>

1. $3$.  
2. $1 + X + X^2 + X^3$.  
3. False — wrap-around is [Part B](polynomials-wraparound.md).

</details>

## Next steps

- **Required next for QC / HQC-shaped reading:** [Polynomial wrap-around (Part B)](polynomials-wraparound.md)  
- Or continue the main path: [Quantum threat](quantum-threat.md)  
- Bridge: [From bits to codes](../bridge/from-bits-to-codes.md)  
