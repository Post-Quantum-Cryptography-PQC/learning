# Building $\mathrm{GF}(2^3)$ — eight elements by hand

**Prereqs:** [Finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md) · [Polynomials Part A](../fundamentals/polynomials-gentle.md) · [Bits, XOR](../fundamentals/bits-xor-randomness.md)  
**Next:** Lattice fork: [From fields to $R_q$](from-fields-to-rq.md) · [Linear codes](../concepts/linear-codes.md) · [Goppa and alternant](../concepts/goppa-alternant.md) · [From Hamming to rank](from-hamming-to-rank.md)

**Learning goals.** After this page you can:

- Read the construction slogan $\mathrm{GF}(p^m)\cong \mathrm{GF}(p)[x]/(f(x))$ in plain English
- Explain why extension-field elements look like polynomials (or powers of a root $\alpha$)
- Build $\mathrm{GF}(2^2)$ and $\mathrm{GF}(2^3)$ by hand; choose / check a small irreducible
- Multiply with expand-then-reduce (including a binary bitstring example)
- Spot reducible traps (zero divisors; degree-$4$ “no root but still factors”)

## Why this page exists

[Finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md) gave the postcard: extension fields exist; $\mathbb{F}_4$ is **not** integers mod 4.  
This page is the **lab**: first build the tiny field with **four** elements ($\mathrm{GF}(2^2)$), then the field with **eight** ($\mathrm{GF}(2^3)$), see why $X$ or $\alpha$ appears, and unpack the paper notation that packages the whole recipe.

Papers and hardware notes often write $\mathrm{GF}(2^m)$ (Galois field). Same object as $\mathbb{F}_{2^m}$. Classic McEliece arithmetic lives in larger cousins such as $\mathrm{GF}(2^{13})$; the **pattern** is identical to what you do here at toy size.

**Study tip:** do every multiply on paper. Reading the tables alone is not enough.

## Reminder — what “field” means here

A **finite field** (also called a **Galois field**, written $\mathrm{GF}(q)$ or $\mathbb{F}_q$) is a finite number system where you can:

- **add** and **subtract**,  
- **multiply**, and  
- **divide** by every **nonzero** element  

and stay inside the same finite set. (Division by zero is never allowed.)

[Modular arithmetic](../fundamentals/modular-arithmetic.md) already showed: **not every** wrap-around number system is a field. Integers mod $4$ fail because $2$ has no inverse. The same honesty applies to polynomials: the modulus must be chosen carefully.

## The construction slogan (paper notation)

You will eventually see a boxed line like:

$$
\mathrm{GF}(p^m)\;\cong\;\mathrm{GF}(p)[x]\big/\bigl(f(x)\bigr).
$$

Same idea with $\mathbb{F}$ spelling: $\mathbb{F}_{p^m}\cong\mathbb{F}_p[x]/(f(x))$.

**Read it left to right in English:**

| Piece | Plain meaning |
|-------|----------------|
| $\mathrm{GF}(p^m)$ | The finite field with $p^m$ elements (here usually $p=2$) |
| $\cong$ | “is the same structure as” (isomorphic — same arithmetic up to relabeling) |
| $\mathrm{GF}(p)[x]$ | Polynomials whose **coefficients** live in the small field $\mathrm{GF}(p)$ (for us: bit-polynomials) |
| $/(f(x))$ | Work **modulo** a fixed polynomial $f$ of degree $m$: expand products, then take remainders of degree $<m$ |
| $f$ irreducible | Required so the result is a **field**, not merely a wrap-around ring |

So the slogan is exactly the recipe you practice below: pick irreducible $f$ of degree $m$ over $\mathrm{GF}(p)$, then elements = remainders of degree $<m$, with $+,\times$ mod $f$.

**Toy instances of the same slogan:**

$$
\mathrm{GF}(2^2)\;\cong\;\mathrm{GF}(2)[x]\big/(x^2+x+1),
\qquad
\mathrm{GF}(2^3)\;\cong\;\mathrm{GF}(2)[x]\big/(x^3+x+1).
$$

(You may also write $X$ instead of $x$; same placeholder.)

## Why do elements look like polynomials — or like $\alpha$?

Bits alone give only $\mathrm{GF}(2)=\{0,1\}$. To get more symbols while keeping field rules, we invent a new “number” that is **not** already in $\mathbb{F}_2$, then close under $+,\times$ with wrap rules.

The standard construction (same as the slogan):

1. Fix an **irreducible** bit-polynomial $f(X)$ of degree $m$.  
2. Pretend $f$ has a root $\alpha$ in a bigger world: $f(\alpha)=0$.  
3. Every field element is then a short polynomial in that root:

$$
a_0 + a_1\alpha + a_2\alpha^2 + \cdots + a_{m-1}\alpha^{m-1}, \qquad a_i\in\{0,1\}.
$$

That is why you see $X$, $\alpha$, or $X^2$ in the element list — they are **basis labels**, not “variables to solve for.” Writing $a_0+a_1 X+\cdots$ (polynomial representation) or $a_0+a_1\alpha+\cdots$ (root notation) is the **same** list of bits; only the letter changes.

High powers of $\alpha$ are rewritten using $f(\alpha)=0$, exactly like reducing a polynomial modulo $f(X)$.

### Equality vs congruence (important)

As **ordinary polynomials**, $X^3$ and $X+1$ are different.  
In the **field** $\mathrm{GF}(2)[X]/(X^3+X+1)$, they are the **same element**:

$$
X^3 \equiv X+1 \pmod{X^3+X+1}.
$$

People often write “$X^3=X+1$ in the field” as shorthand. Mentally keep the $\equiv\pmod{f}$ when that helps.

## Warm-up — build $\mathrm{GF}(2^2)$ (four elements)

We want $m=2$, so $q=2^2=4$. Integers mod $4$ are **not** a field ([postcard](finite-fields-beyond-f2.md)). Instead: degree-$<2$ bit-polynomials, reduce mod a degree-$2$ irreducible — the slogan $\mathrm{GF}(4)\cong\mathrm{GF}(2)[x]/(f)$ with $\deg f=2$.

### How to choose the irreducible (degree $2$)

List every monic degree-$2$ polynomial over $\mathbb{F}_2$ and ask: does it factor?

| Candidate | Factors? | Verdict |
|-----------|----------|---------|
| $X^2$ | $X\cdot X$ | reducible |
| $X^2+1$ | $(X+1)^2$ over $\mathbb{F}_2$ (check: $(X+1)^2=X^2+1$) | reducible |
| $X^2+X$ | $X(X+1)$ | reducible |
| $X^2+X+1$ | no root in $\{0,1\}$ (see below) | **irreducible** |

Root check for $X^2+X+1$:

| trial | value |
|-------|--------|
| $0$ | $1$ |
| $1$ | $1+1+1=1$ |

No root $\Rightarrow$ no linear factor $\Rightarrow$ irreducible (for degree $2$).  
So the **only** monic irreducible of degree $2$ over $\mathbb{F}_2$ is $f(X)=X^2+X+1$. Easy choice.

### Four elements — polynomials and $\alpha$

Reduce mod $f$: keep degree $<2$. Elements:

| Bits $(a_0,a_1)$ | As polynomial in $X$ | As root $\alpha$ |
|-----------------|----------------------|-----------------|
| $(0,0)$ | $0$ | $0$ |
| $(1,0)$ | $1$ | $1$ |
| $(0,1)$ | $X$ | $\alpha$ |
| $(1,1)$ | $1+X$ | $1+\alpha$ |

From $f(\alpha)=0$:

$$
\alpha^2+\alpha+1=0 \quad\Rightarrow\quad \alpha^2=\alpha+1
$$

(in characteristic $2$, moving a term is the same as adding it).

So $\alpha$ is **not** a mystery letter: it is “a root of the field polynomial,” and $\alpha^2$ is rewritten as $\alpha+1$.

### Tiny multiply in $\mathrm{GF}(2^2)$

$$
\alpha\cdot\alpha=\alpha^2=\alpha+1.
$$

$$
\alpha\cdot(1+\alpha)=\alpha+\alpha^2=\alpha+(\alpha+1)=1
$$

(after $\alpha+\alpha=0$). So $\alpha^{-1}=1+\alpha$ in this field.

Same arithmetic with the letter $X$: $X\cdot X=X^2=X+1$.

### Powers of $\alpha$ — why $\alpha^4=\alpha$

Keep multiplying by $\alpha$, always reducing:

| Power | Reduce | Element |
|-------|--------|---------|
| $\alpha^1$ | — | $\alpha$ |
| $\alpha^2$ | $\alpha+1$ | $\alpha+1$ |
| $\alpha^3$ | $\alpha\cdot(\alpha+1)=\alpha^2+\alpha=1$ | $1$ |
| $\alpha^4$ | $\alpha\cdot 1=\alpha$ | $\alpha$ |

So $\alpha^4=\alpha$, and the nonzero elements cycle as $\alpha \to \alpha+1 \to 1 \to \alpha \to \cdots$.  
There are $4-1=3$ nonzero field elements; the cycle length of $\alpha$ is $3$.

**Postcard:** a **primitive** element generates all nonzero field elements by powers. Here $\alpha$ is primitive in $\mathrm{GF}(4)$. A **primitive polynomial** is an irreducible whose root is primitive. Irreducible $\Rightarrow$ you get a field; primitive $\Rightarrow$ one extra convenience for power tables / LFSR-style stories. This curriculum mostly needs **irreducible**; remember the name “primitive” when a paper uses it.

## How to choose an irreducible — checklist

For toy fields over $\mathbb{F}_2$:

1. **Fix the degree $m$** you need ($m=2$ for $\mathrm{GF}(4)$, $m=3$ for $\mathrm{GF}(8)$, …). The field will have $2^m$ elements.  
2. **List monic** degree-$m$ candidates (or look them up once $m$ is large).  
3. **Reject anything with a root in $\{0,1\}$** — that always means a factor $(X)$ or $(X+1)$.  
4. For **degree $2$ or $3$**, “no root in $\mathbb{F}_2$” is enough: such a polynomial is automatically irreducible over $\mathbb{F}_2$.  
5. For **degree $\ge 4$**, no-root is necessary but not always enough (it might factor into two irreducibles of degree $\ge 2$). See the $X^4+X^2+1$ trap below. Papers / standards usually **name one fixed** irreducible; hardware copies that same $f$.  
6. **Any** monic irreducible of degree $m$ builds a field isomorphic to $\mathrm{GF}(2^m)$ — that is the $\cong$ in the slogan. Different $f$ only change the bit labels.

**Practical rule for this curriculum:** for $m=2,3$, enumerate and keep the ones with no root in $\{0,1\}$. For McEliece-sized $m$ (e.g. $13$), trust the paper’s stated $f(X)$ and practice reduce-by-$f$, not a full search.

### Degree-$4$ trap — no root, still reducible

Try $g(X)=X^4+X^2+1$.

| trial | $g(0)$ / $g(1)$ |
|-------|-----------------|
| $0$ | $1$ |
| $1$ | $1+1+1=1$ |

No root in $\mathbb{F}_2$. But over $\mathbb{F}_2$:

$$
(X^2+X+1)^2 = X^4 + X^2 + 1
$$

(cross terms vanish in characteristic $2$). So $g$ **factors** — it is reducible.  
Using $g$ as a modulus does **not** give $\mathrm{GF}(16)$. Moral: for degree $\ge 4$, “no root” is not enough; you need a true irreducible (or a named one from a paper).

## Goal — a field with $2^3=8$ elements

Same recipe / slogan, now $m=3$:

$$
\mathrm{GF}(2^3)\;\cong\;\mathrm{GF}(2)[x]\big/(f(x)),\qquad \deg f=3,\ f\text{ irreducible}.
$$

1. Bit-polynomials; addition is XOR.  
2. Keep degrees **less than** $3$ (eight coefficient triples).  
3. Reduce products modulo a fixed **irreducible** degree-$3$ $f(X)$.

### Choosing $f$ for degree $3$

All monic degree-$3$ polynomials over $\mathbb{F}_2$:

| Candidate | Root in $\{0,1\}$? | Verdict |
|-----------|--------------------|---------|
| $X^3$ | yes ($0$) | reducible |
| $X^3+1$ | yes ($1$) | reducible |
| $X^3+X$ | yes ($0$) | reducible |
| $X^3+X+1$ | no | **irreducible** |
| $X^3+X^2$ | yes ($0$) | reducible |
| $X^3+X^2+1$ | no | **irreducible** |
| $X^3+X^2+X$ | yes ($0$) | reducible |
| $X^3+X^2+X+1$ | yes ($1$) | reducible |

So two good moduli: $X^3+X+1$ and $X^3+X^2+1$.  
We pick $f(X)=X^3+X+1$ for the rest of this page (common toy choice).

Double-check the winner:

| trial | $X^3+X+1$ |
|-------|-----------|
| $0$ | $1$ |
| $1$ | $1+1+1=1$ |

## The eight elements — $X$ and $\alpha$ side by side

Every element is a unique polynomial of degree at most $2$:

$$
a_0 + a_1 X + a_2 X^2, \qquad a_i\in\{0,1\}.
$$

Equivalently, if $\alpha$ is a root of $f$ ($f(\alpha)=0$), write $a_0+a_1\alpha+a_2\alpha^2$.

| Bits $(a_0,a_1,a_2)$ | Polynomial in $X$ | Root form |
|---------------------|-------------------|-----------|
| $(0,0,0)$ | $0$ | $0$ |
| $(1,0,0)$ | $1$ | $1$ |
| $(0,1,0)$ | $X$ | $\alpha$ |
| $(1,1,0)$ | $1+X$ | $1+\alpha$ |
| $(0,0,1)$ | $X^2$ | $\alpha^2$ |
| $(1,0,1)$ | $1+X^2$ | $1+\alpha^2$ |
| $(0,1,1)$ | $X+X^2$ | $\alpha+\alpha^2$ |
| $(1,1,1)$ | $1+X+X^2$ | $1+\alpha+\alpha^2$ |

From $f(\alpha)=0$:

$$
\alpha^3+\alpha+1=0 \quad\Rightarrow\quad \alpha^3=\alpha+1.
$$

So high powers collapse: $\alpha^3$ is **not** a ninth independent symbol — it is already in the table as $\alpha+1$.

That is the **polynomial representation**: the field element **is** the short polynomial (or its three bits). The letter $X$ is the placeholder; $\alpha$ is “the same placeholder, thought of as a root.”

## Addition — XOR the coefficients

$$
(1+X) + (X+X^2) = 1 + (X+X) + X^2 = 1 + 0\cdot X + X^2 = 1+X^2
$$

in characteristic $2$ ($X+X=0$). Subtraction is the same as addition here: $-a=a$ because $a+a=0$.

No reduction needed for addition: degrees stay $<3$.

## Multiplication — expand, then reduce (not bitwise AND)

### Binary example — why $010\times 100 = 011$, not $000$

Write bits low-degree first: $(a_0,a_1,a_2)$.

| Bits | Polynomial |
|------|------------|
| $010$ | $X$ |
| $100$ | $X^2$ |

**Wrong reflex:** bitwise AND of $010$ and $100$ is $000$. That is **not** field multiplication.

**Correct:** multiply as polynomials, then reduce mod $f(X)=X^3+X+1$:

$$
X\cdot X^2 = X^3 \equiv X+1 \pmod{f}.
$$

Bits of $X+1$: $(1,1,0)$ if you list $(a_0,a_1,a_2)$ — often written $011$ when people print high bit first as $a_2a_1a_0$. Either endianness is fine if you stay consistent; the polynomial is $1+X$.

**Moral:** XOR is field **addition**; field **multiplication** is poly product + reduce.

### Step A — ordinary bit-polynomial multiply

Compute $(1+X)\cdot X^2$:

$$
(1+X)\cdot X^2 = X^2 + X^3.
$$

Degree $3$ appears — too big. Reduce.

### Step B — replace $X^3$ using the modulus

From $f(X)=X^3+X+1=0$ in the field:

$$
X^3 \equiv X+1 \pmod{f}
$$

(again characteristic $2$: move terms by adding). Same rule as $\alpha^3=\alpha+1$.

So

$$
X^2 + X^3 \equiv X^2 + (X+1) = 1 + X + X^2 \pmod{f}.
$$

**Result:** $(1+X)\cdot X^2 = 1+X+X^2$ in $\mathrm{GF}(2^3)$ with this $f$.

### Another multiply — fully written

$(X)\cdot(X) = X^2$ — already degree $<3$. Done.

$(X)\cdot(X^2) = X^3 \equiv X+1$ after reduction.

### Slow-motion: $(1+X)(1+X^2)$

$$
\begin{align*}
(1+X)(1+X^2)
&= 1\cdot 1 + 1\cdot X^2 + X\cdot 1 + X\cdot X^2 \\
&= 1 + X^2 + X + X^3 \\
&= 1 + X + X^2 + (X+1) \\
&= (1+1) + (X+X) + X^2 \\
&= 0 + 0 + X^2 \\
&= X^2.
\end{align*}
$$

## How “division” works

To divide by a nonzero $a$, multiply by $a^{-1}$ (the unique element with $a\cdot a^{-1}=1$).

Tiny hunt: find the inverse of $X$. We need $b$ with $X\cdot b = 1$.

Try $b=X^2+1$:

$$
X\cdot(X^2+1)=X^3+X\equiv (X+1)+X=1 \pmod{f}
$$

after reduction. So $X^{-1}=1+X^2$ in this field (same as $\alpha^{-1}=1+\alpha^2$).

Every nonzero row of a full multiply table would contain a $1$ — that is the field promise. You do not need the full $8\times 8$ table memorized; you need the **reduce-by-$f$** habit.

## What would go wrong with a reducible modulus?

### Worked zero-divisor (degree $3$)

Suppose someone used $r(X)=X^3+X=X(X^2+1)$ (this **factors**).  
Representatives of degree $<3$ include the nonzero elements $X$ and $X^2+1$. Their product is

$$
X\cdot(X^2+1)=X^3+X,
$$

which is **exactly** the modulus — so the product is $0$ in the quotient.  
Two nonzero elements multiply to zero: a **zero divisor**. Then inverses cannot exist for those elements, and you do **not** have a field.

Same moral as “integers mod $4$”: wrap-around alone is not enough — the modulus must be prime / irreducible. In slogan language: only then is $\mathrm{GF}(2)[x]/(f)$ actually $\mathrm{GF}(2^m)$.

## Bridge to PQC

| Toy here | Where it shows up later |
|----------|-------------------------|
| $\mathrm{GF}(p^m)\cong\mathrm{GF}(p)[x]/(f)$ | How papers name the field construction |
| $\mathrm{GF}(2^2)$ then $\mathrm{GF}(2^3)$ | Same construction scaled to $\mathrm{GF}(2^m)$ |
| Elements as $a_0+a_1\alpha+\cdots$ | Symbols in $\mathbb{F}_{2^m}$ for algebraic codes |
| Choose / fix irreducible $f$ | Field polynomial in Goppa / McEliece HW ($\mathrm{GF}(2^{13})$, …) |
| XOR add + reduce mul | Same skeleton as polynomial-basis GF multipliers |

Binary QC schemes (HQC / BIKE) often stay in $\mathbb{F}_2[X]/(X^n-1)$ — related **polynomial** habit, different modulus story. Do not mix “QC wrap at $X^n-1$” with “field extension mod irreducible” until the page says which one it is.

**Lattice fork:** ML-KEM-shaped crypto uses a **ring** $R_q=\mathbb{Z}_q[x]/(x^n+1)$, which looks like the GF slogan but is **not** a field — [From fields to $R_q$](from-fields-to-rq.md).

## Common confusions

- $\mathrm{GF}(4)$ is **not** integers mod $4$; $\mathrm{GF}(8)$ is **not** integers mod $8$.  
- $\mathrm{GF}(8)=\mathrm{GF}(2^3)$: the $3$ is the **extension degree**, not “based on $\mathrm{GF}(3)$.”  
- $X$ / $\alpha$ are **basis labels** (or a root of $f$), not unknowns to solve for in an equation homework sense.  
- $X^3\equiv X+1\pmod{f}$ is congruence in the quotient; not an identity of free polynomials.  
- Field mul $\neq$ bitwise AND; XOR is addition.  
- Irreducible $\Rightarrow$ field; primitive $\Rightarrow$ a root generates all nonzero elements (stronger).  
- For degree $2$–$3$, “no root in $\mathbb{F}_2$” picks the irreducibles; $X^4+X^2+1$ shows degree $\ge 4$ can still factor.  
- $\mathrm{GF}(q)$ and $\mathbb{F}_q$ name the same idea; papers pick one spelling.

## Check yourself

1. In one sentence, what does $\mathrm{GF}(2^3)\cong\mathrm{GF}(2)[x]/(x^3+x+1)$ claim?  
2. Why is $\alpha$ allowed to appear as a field element in $\mathrm{GF}(2^2)$?  
3. In $\mathrm{GF}(2^2)$ with $f(X)=X^2+X+1$, what is $\alpha^4$?  
4. Bits $010$ and $100$ (low bit = $a_0$): what is their field product mod $X^3+X+1$?  
5. Why is $X^4+X^2+1$ a bad modulus for $\mathrm{GF}(16)$ even though it has no root in $\mathbb{F}_2$?  
6. Give a zero-divisor pair mod $X^3+X$.

<details><summary>Answers</summary>

1. The field with $8$ elements is the same as bit-polynomials modulo that irreducible cubic.  
2. It stands for a root of the irreducible field polynomial; short polynomials in $\alpha$ are the elements.  
3. $\alpha$ (from the power table).  
4. $X\cdot X^2=X^3\equiv X+1$ (bits of $1+X$).  
5. It factors as $(X^2+X+1)^2$ over $\mathbb{F}_2$.  
6. $X$ and $X^2+1$ (product $X^3+X\equiv 0$).

</details>

## Big practice set

1. In $\mathrm{GF}(2^2)$, compute $(1+\alpha)+(1+\alpha)$.  
2. In $\mathrm{GF}(2^2)$, compute $\alpha\cdot(1+\alpha)$ (should be $1$).  
3. True or false: $X^2+1$ is a valid field polynomial for $\mathrm{GF}(2^2)$.  
4. True or false: $X^3$ and $X+1$ are equal as free polynomials.  
5. Add $(1+X)+(1+X+X^2)$ in $\mathrm{GF}(2^3)$.  
6. Reduce $X^4$ in $\mathrm{GF}(2^3)$ using $X^3\equiv X+1$.  
7. Find $y$ with $(1+X)\cdot y = 1$ in this $\mathrm{GF}(2^3)$ (show one successful $y$).

<details><summary>Answers</summary>

1. $0$ (each coefficient doubles $\equiv 0$ mod $2$).  
2. $\alpha+\alpha^2=\alpha+(\alpha+1)=1$.  
3. False — $(X+1)^2$ over $\mathbb{F}_2$.  
4. False — they are congruent mod $X^3+X+1$, not identical polynomials.  
5. $X^2$ (the $1$s cancel; $X+X=0$).  
6. $X^4=X\cdot X^3\equiv X(X+1)=X+X^2$.  
7. One answer: $y=X+X^2$. Check: $(1+X)(X+X^2)=X+X^2+X^2+X^3\equiv X+(X+1)=1$.

</details>

## Next steps

- Lattice fork: [From fields to $R_q$](from-fields-to-rq.md) — field ≠ ring, toy $R_q$, ML-KEM slogan  
- Re-read the postcard: [Finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md)  
- Concept: [Linear codes](../concepts/linear-codes.md) (now “over $\mathbb{F}_q$” includes extension symbols)  
- Algebraic codes: [Goppa and alternant](../concepts/goppa-alternant.md) · HW: [CED / composite-field Goppa](../concepts/ced-composite-goppa.md)  
- Rank fork: [From Hamming to rank](from-hamming-to-rank.md)  
