# From finite fields to $R_q$ — lattice PQC rings

**Prereqs:** [Building $\mathrm{GF}(2^3)$](building-gf-8.md) · [Polynomial wrap-around](../fundamentals/polynomials-wraparound.md) · [Noisy linear equations (LWE story)](noisy-linear-equations-lwe.md) · helpful: [Modular arithmetic](../fundamentals/modular-arithmetic.md)  
**Next:** [Module-LWE](../concepts/module-lwe.md) · [Poly-mul engines](../concepts/poly-mul-engines.md) · [NTT butterfly](../concepts/ntt-butterfly.md) · Track: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md)

**Learning goals.** After this page you can:

- State the distinction **finite field ≠ polynomial ring**
- Read $R_q=\mathbb{Z}_q[x]/(x^n+1)$ next to $\mathrm{GF}(p^m)\cong\mathrm{GF}(p)[x]/(f(x))$
- Add, multiply, and scalar-multiply in a tiny toy ring $\mathbb{Z}_5[x]/(x^4+1)$
- See where ring arithmetic sits inside an ML-KEM-shaped $\mathbf{t}=\mathbf{A}\mathbf{s}+\mathbf{e}$ slogan

## Why this page exists

You just built **fields** with an **irreducible** modulus:

$$
\mathrm{GF}(p^m)\;\cong\;\mathrm{GF}(p)[x]\big/\bigl(f(x)\bigr).
$$

Lattice PQC (ML-KEM / Dilithium lineage) uses something that **looks** almost the same:

$$
R_q=\mathbb{Z}_q[x]\big/(x^n+1).
$$

Same “polynomials modulo a fixed $f$” habit — but $R_q$ is generally a **ring**, not a finite field. This bridge is that fork, with a hand-sized toy, then the link to Module-LWE.

**Central takeaway:** finite-field skill is a foundation for reading modular poly arithmetic; ML-KEM builds on **rings**, modular linear algebra, and **noise** — not on “every nonzero has an inverse.”

## Field vs ring — the table that matters

| Feature | Finite field | PQC-style polynomial ring |
|---------|--------------|---------------------------|
| Example | $\mathrm{GF}(2^8)$ | $\mathbb{Z}_q[x]/(x^{256}+1)$ |
| Coefficients | In $\mathrm{GF}(p)$ (often bits) | Integers mod $q$ |
| Modulus polynomial | **Must** be irreducible | **Need not** be irreducible |
| $+$, $-$, $\times$ | Yes | Yes |
| Divide by every nonzero | Yes | **Not** necessarily |
| What designers need | Field arithmetic (codes, GF HW, …) | Fast ring $+/\times$ + noise |

Why skip irreducibility? Lattice schemes mainly need **add**, **subtract**, and **multiply** of polynomials (and small errors). They do **not** need every nonzero polynomial to have a multiplicative inverse. A ring is enough.

## Two slogans side by side

$$
\underbrace{\mathrm{GF}(2)[x]/(f(x))}_{\text{finite field (}f\text{ irreducible)}}
\quad\longrightarrow\quad
\underbrace{\mathbb{Z}_q[x]/(x^n+1)}_{\text{PQC polynomial ring }R_q}.
$$

| Slogan | Read as |
|--------|---------|
| $\mathrm{GF}(p^m)\cong\mathrm{GF}(p)[x]/(f)$ | Extension **field**; $f$ irreducible of degree $m$ |
| $R_q=\mathbb{Z}_q[x]/(x^n+1)$ | Coefficient wrap mod $q$, power wrap mod $x^n+1$ |

[Polynomial wrap-around Part B](../fundamentals/polynomials-wraparound.md) used $X^n\equiv 1$ (circle / QC codes).  
Here the lattice default is **negacyclic**: $x^n+1=0$ means

$$
x^n \equiv -1 \pmod{x^n+1}.
$$

Same reduce-high-powers habit; different fold rule.

## ML-KEM-shaped parameters (public slogan)

ML-KEM (FIPS 203 / Kyber lineage) uses a ring of the form

$$
R_q=\mathbb{Z}_{3329}[x]\big/(x^{256}+1).
$$

| Symbol | Meaning |
|--------|---------|
| $q=3329$ | Coefficients live in $\{0,1,\ldots,3328\}$ |
| $n=256$ | Degree $<256$ representatives (256 coeffs) |
| $\mathbb{Z}_{3329}$ | Integers mod $q$; $q$ is prime, so coeffs form a **prime field** |
| $x^{256}+1$ | Power modulus (negacyclic wrap) |
| $R_q$ | The **ring** of those polynomials |

A typical element:

$$
a(x)=a_0+a_1 x+\cdots+a_{255}x^{255},\qquad a_i\in\{0,1,\ldots,3328\}.
$$

**Important:** coefficients use a prime field $\mathbb{Z}_q$; the **whole** object $R_q$ is still a ring. In the standardized choice, $x^{256}+1$ is reducible mod $3329$ on purpose — that supports fast multiply via the Number-Theoretic Transform (NTT). Details: [NTT butterfly](../concepts/ntt-butterfly.md) · [poly-mul engines](../concepts/poly-mul-engines.md).

Official parameter text: [NIST FIPS 203](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf).

## Toy lab — $R=\mathbb{Z}_5[x]/(x^4+1)$

Four coefficients only (real ML-KEM uses 256). Rules:

$$
5\equiv 0,\qquad x^4\equiv -1\equiv 4\pmod{5}.
$$

### A — Polynomial addition

$$
a(x)=4+3x,\qquad b(x)=3+4x.
$$

$$
a+b=7+7x\equiv 2+2x \pmod{5}.
$$

No power reduction needed — degrees already $<4$.

### B — Polynomial multiplication (negacyclic)

$$
a(x)=x^3,\qquad b(x)=x^2 \quad\Rightarrow\quad ab=x^5.
$$

Use $x^4\equiv -1$:

$$
x^5=x\cdot x^4\equiv x\cdot(-1)=-x\equiv 4x \pmod{5}.
$$

So $x^3\cdot x^2=4x$ in this toy ring. Same expand-then-reduce skill as the GF lab; different modulus story.

### C — Scalar multiplication

$$
a(x)=1+2x,\qquad 3a=3+6x\equiv 3+x \pmod{5}.
$$

Useful even when you are not multiplying two non-constant polynomials.

### Quick self-check

In $R=\mathbb{Z}_5[x]/(x^4+1)$, reduce $x^4$.  
<details><summary>Answer</summary>
$x^4\equiv -1\equiv 4$ (the constant $4$).
</details>

## Where this shows up in ML-KEM (slogan)

Key generation (simplified polynomial / module form) looks like

$$
\mathbf{t}=\mathbf{A}\mathbf{s}+\mathbf{e},
$$

with entries in the polynomial ring (or short vectors of ring elements — Module-LWE packaging):

| Object | Role |
|--------|------|
| $\mathbf{A}$ | Public matrix of ring elements |
| $\mathbf{s}$ | Secret (small) vector |
| $\mathbf{e}$ | Small error / noise |
| $\mathbf{t}$ | Public-key material |

All of the $+$, matrix–vector style products, and poly muls live in $R_q$.  
**Security** is not “multiplying polynomials is hard.” It is recovering secrets from many **noisy** linear equations — Module Learning With Errors. Story: [LWE bridge](noisy-linear-equations-lwe.md) · card: [Module-LWE](../concepts/module-lwe.md).

## Why NTT (one paragraph)

Schoolbook multiply of two degree-$<256$ polynomials costs a lot of coefficient muls.  
The **NTT** (Number-Theoretic Transform) moves polynomials into a domain where multiply is much cheaper, then INTT brings the result back — same idea as FFT, but with modular integers and roots of unity. Hardware cards unpack butterflies; here you only need: **ring mul is the hot path; NTT is the accelerator**.

Next: [Poly-mul engines](../concepts/poly-mul-engines.md) · [NTT butterfly](../concepts/ntt-butterfly.md).

## What finite-field math you still use

| Tool | Role in lattice PQC |
|------|---------------------|
| Modular arithmetic | Coefficient $+,-,\times$ mod $q$ |
| Inverses mod $q$ | NTT scaling / modular steps when needed |
| Poly add / mul / reduce | Core ring arithmetic |
| Vectors / matrices | $\mathbf{A}\mathbf{s}+\mathbf{e}$ packaging |
| Noise / probability | Why MLWE is hard |
| $\mathrm{GF}(2^m)$ / GF HW | More for **code-based** and some accelerators — parallel track |

**Not every PQC family is lattice.** Hash-based signatures (SLH-DSA / SPHINCS+) lean on hash trees, not this $R_q$ multiply story — [Hash-based signatures](../concepts/hash-based-signatures.md).

## Common confusions

- Looking like $\mathrm{GF}(p)[x]/(f)$ does **not** make $R_q$ a field.  
- Coefficient field $\mathbb{Z}_q$ (prime $q$) ≠ “$R_q$ is a field.”  
- Part B’s $X^n\equiv 1$ (QC) ≠ lattice $x^n\equiv -1$ (negacyclic).  
- Irreducible matters for GF construction; ML-KEM’s $x^{256}+1$ is chosen for **NTT**, not for being a field modulus.  
- Poly mul is one operation inside MLWE — not the whole cryptosystem.

## Check yourself

1. Must the modulus of $R_q$ be irreducible?  
2. In the toy ring, what is $x^4$?  
3. Compute $(4+3x)+(3+4x)$ in $\mathbb{Z}_5[x]/(x^4+1)$.  
4. True or false: ML-KEM security is “polynomial multiplication is hard.”  
5. Name one PQC family that does **not** center on $R_q$ mul.

<details><summary>Answers</summary>

1. No — a ring only needs $+/-/\times$; inverses for all nonzero elements are not required.  
2. $-1\equiv 4\pmod{5}$.  
3. $2+2x$.  
4. False — hardness is noisy equations (MLWE), not schoolbook mul.  
5. Hash-based signatures (e.g. SLH-DSA), among others.

</details>

## Big practice set

1. In the toy ring, compute $x\cdot x^4$.  
2. Scalar: $4\cdot(2+3x)$ mod $5$.  
3. True or false: $x^{256}+1$ must be irreducible mod $3329$ for ML-KEM to work.  
4. Rewrite $\mathrm{GF}(2^3)\cong\mathrm{GF}(2)[x]/(x^3+x+1)$ vs $R_q=\mathbb{Z}_q[x]/(x^n+1)$ in one contrast sentence each.  
5. In $\mathbf{t}=\mathbf{A}\mathbf{s}+\mathbf{e}$, which symbol is the small noise?

<details><summary>Answers</summary>

1. $x^5=x\cdot x^4\equiv -x\equiv 4x$.  
2. $8+12x\equiv 3+2x$.  
3. False — it is reducible in the standardized setting; that helps NTT.  
4. Field: irreducible $f$, every nonzero invertible. Ring: wrap mod $q$ and $x^n+1$; mul without full division.  
5. $\mathbf{e}$.

</details>

## Next steps

- Concept: [Module-LWE](../concepts/module-lwe.md) · [LWE](../concepts/lwe.md)  
- Multiply path: [Poly-mul engines](../concepts/poly-mul-engines.md) · [NTT butterfly](../concepts/ntt-butterfly.md)  
- Track: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md)  
- Code / GF fork stays on [Building $\mathrm{GF}(2^3)$](building-gf-8.md) · [Linear codes](../concepts/linear-codes.md)  
