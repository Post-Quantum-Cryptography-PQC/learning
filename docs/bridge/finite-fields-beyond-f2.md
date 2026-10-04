# Finite fields beyond $\mathbb{F}_2$

**Prereqs:** [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Polynomials Part A](../fundamentals/polynomials-gentle.md)  
**Next:** Concept: [Linear codes](../concepts/linear-codes.md) · Lattice: [Lattices (gentle)](../fundamentals/lattices-gentle.md) · [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md)

**Learning goals.** Explain why $\mathbb{F}_q$ appears, compute addition and multiplication in a tiny prime field with full tables, see why mod-$4$ is *not* a field, and know that extension fields exist without building them fully yet.

## Why this page exists

Many fundamentals stayed in $\mathbb{F}_2$ (bits). Real codes and rank-metric discussions use $\mathbb{F}_q$ for $q>2$. Lattice crypto often uses integers mod a large $q$ (related spirit: wrap-around arithmetic) even when the object is not always called a “field” in every sentence.

You only need a comfortable postcard of the idea before concepts say “over $\mathbb{F}_q$.”

## Intuition — what “field” buys you

$\mathbb{F}_2$ is the field with elements $\{0,1\}$.  
A **finite field** $\mathbb{F}_q$ is a finite set with addition and multiplication satisfying the usual nice rules:

- you can add and multiply, staying inside the set,  
- addition and multiplication behave “nicely” (associative, distributive, …),  
- every nonzero element has a **multiplicative inverse** (you can “divide”).

The simplest family: take a **prime** $p$ and use integers mod $p$. That is $\mathbb{F}_p$.  
Example: $\mathbb{F}_5=\{0,1,2,3,4\}$ with mod-5 arithmetic.

There are also fields with $q=p^m$ elements (extension fields), built from polynomials mod an irreducible. Classic Goppa codes and many algebraic constructions live there. You do **not** need the full construction to continue — just remember “symbols can be bigger than bits.”

## Worked world — full arithmetic in $\mathbb{F}_5$

Elements: $0,1,2,3,4$. Wrap at $5$.

### Addition table (complete)

| $+$ | 0 | 1 | 2 | 3 | 4 |
|-----|---|---|---|---|---|
| 0 | 0 | 1 | 2 | 3 | 4 |
| 1 | 1 | 2 | 3 | 4 | 0 |
| 2 | 2 | 3 | 4 | 0 | 1 |
| 3 | 3 | 4 | 0 | 1 | 2 |
| 4 | 4 | 0 | 1 | 2 | 3 |

Check: $3+4=7\equiv 2\pmod{5}$. Table says $2$. Good.

### Multiplication table (complete)

| $\times$ | 0 | 1 | 2 | 3 | 4 |
|----------|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 2 | 3 | 4 |
| 2 | 0 | 2 | 4 | 1 | 3 |
| 3 | 0 | 3 | 1 | 4 | 2 |
| 4 | 0 | 4 | 3 | 2 | 1 |

Highlights:

- $3\cdot 2=6\equiv 1\pmod{5}$, so $3^{-1}\equiv 2$ (and $2^{-1}\equiv 3$).  
- $4\cdot 4=16\equiv 1\pmod{5}$, so $4^{-1}=4$.

### Slow-motion inverse hunt

Find $x$ with $2x\equiv 1\pmod{5}$:

| $x$ | $2x$ | $2x\bmod 5$ |
|------|------|-------------|
| 0 | 0 | 0 |
| 1 | 2 | 2 |
| 2 | 4 | 4 |
| 3 | 6 | 1 ← bingo |
| 4 | 8 | 3 |

So $2^{-1}=3$ in $\mathbb{F}_5$.

### Vectors over $\mathbb{F}_5$

$(1,4,0,2)$ is a length-$4$ vector.  
Weight counts **nonzero** positions (here weight $3$), not the sum of the numbers.

## Why $\mathbb{Z}/4\mathbb{Z}$ is not a field (important trap)

Integers mod $4$ are $\{0,1,2,3\}$ with wrap at $4$.  
Try to invert $2$: find $x$ with $2x\equiv 1\pmod{4}$.

| $x$ | $2x\bmod 4$ |
|------|-------------|
| 0 | 0 |
| 1 | 2 |
| 2 | 0 |
| 3 | 2 |

Never $1$. So **no inverse for $2$**.  
Therefore $\mathbb{Z}/4\mathbb{Z}$ is **not** a field.

**Moral:** $\mathbb{F}_4$ (a real field with $4$ elements) is a different object, built from polynomials — **not** “integers mod 4.”

## Extension fields — postcard only

Sometimes $q=p^m$ (example $q=16=2^4$).  
Elements behave like small polynomials with bit coefficients, multiplied and reduced mod a fixed irreducible polynomial — similar *spirit* to [Polynomials (gentle)](../fundamentals/polynomials-gentle.md), but with a different modulus polynomial.

You do not need to build $\mathbb{F}_{16}$ by hand to read most of this curriculum. Remember:

- symbols can be “bigger than bits,”  
- every nonzero still has an inverse,  
- papers may say “work in $\mathbb{F}_{2^m}$.”

## Why codes leave $\mathbb{F}_2$

- More symbol choices can improve rate / distance tradeoffs.  
- Algebraic constructions (Reed–Solomon, Goppa, …) use extension fields.  
- Rank-metric codes treat matrices over $\mathbb{F}_q$ — [rank track](../tracks/rank-metric/ROADMAP.md).  
- Lattice schemes often use a large modulus $q$ for noisy equations — [lattice track](../tracks/lattice-lwe/ROADMAP.md).

Binary codes remain central for HQC/BIKE-style stories; still, papers will casually say $\mathbb{F}_q$.

## Bridge

When a concept page says “linear code over $\mathbb{F}_q$,” read: same subspace picture as over $\mathbb{F}_2$, but entries live in a $q$-ary alphabet. Matrix–vector products use that field’s $+$ and $\times$.

When a lattice page says “mod $q$,” read: wrap-around integers — related habit, even when the security story is LWE rather than coding.

## Common confusions

- $\mathbb{F}_4$ is **not** integers mod 4 (mod 4 is not a field).  
- “Characteristic 2” means $1+1=0$; many crypto fields are characteristic 2.  
- Hamming weight counts nonzeros, not the sum of symbol values.  
- Large modulus $q$ in lattices is wrap-around arithmetic; do not confuse “mod $q$ integers” with “must be a prime field” until the page says so (primes are common for nice inverses).

## Check yourself

1. Is $\mathbb{Z}/4\mathbb{Z}$ a field?  
2. In $\mathbb{F}_5$, what is $2+4$?  
3. In $\mathbb{F}_5$, what is $3\cdot 4$?  
4. Why might a code use $\mathbb{F}_{16}$ instead of $\mathbb{F}_2$?  
5. Weight of $(0,2,0,4)$ over $\mathbb{F}_5$?  

<details><summary>Answers</summary>

1. No — $2$ has no inverse.  
2. $6\equiv 1\pmod{5}$.  
3. $12\equiv 2\pmod{5}$.  
4. Richer algebraic structure / alphabet size for constructions (e.g. Goppa-style).  
5. $2$ (two nonzeros).

</details>

## Big practice set

1. In $\mathbb{F}_5$, compute $4+4$.  
2. Find $3^{-1}$ in $\mathbb{F}_5$.  
3. True or false: every nonzero in $\mathbb{F}_7$ has an inverse.  
4. True or false: $\mathbb{F}_9$ means integers mod $9$.  

<details><summary>Answers</summary>

1. $8\equiv 3\pmod{5}$.  
2. $2$, because $3\cdot 2\equiv 1$.  
3. True ($7$ is prime).  
4. False ($9$ is not prime; $\mathbb{F}_9$ is an extension field).

</details>

## Next steps

- [Generator and parity-check](generator-and-parity-check.md) (re-read over $\mathbb{F}_2$ first if needed)  
- Concept: [Linear codes](../concepts/linear-codes.md)  
- Rank fork: [From Hamming to rank](from-hamming-to-rank.md) · [Rank metric track](../tracks/rank-metric/ROADMAP.md)  
- Lattice fork: [Lattices (gentle)](../fundamentals/lattices-gentle.md) · [Lattice / LWE track](../tracks/lattice-lwe/ROADMAP.md)  
