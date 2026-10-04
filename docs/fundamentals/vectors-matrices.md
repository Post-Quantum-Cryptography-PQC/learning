# Vectors and matrices (gentle)

**Prereqs:** [Modular arithmetic](modular-arithmetic.md) · [Bits, XOR](bits-xor-randomness.md)  
**Next:** [Polynomials Part A](polynomials-gentle.md) · [Polynomial wrap-around](polynomials-wraparound.md) · Bridge: [From bits to codes](../bridge/from-bits-to-codes.md)

**Learning goals.** Treat a bit-string as a vector, compute a dot product over bits, multiply a small matrix by a vector with every step written out, see a **row as a codeword**, and — only after that arithmetic is comfortable — meet a syndrome as “fingerprint of the error.”

## Symbols on this page

| Symbol | English |
|--------|---------|
| $\mathbf{e}$ | A list of bits (a vector) |
| $\oplus$ | XOR, position by position |
| $\cdot$ | Dot product (XOR of ANDs, over bits) |
| $H$ | A stack of rows (a matrix of checks) |
| $H\mathbf{e}^\top$ | Each output bit = one row dotted with $\mathbf{e}$ |
| syndrome | Fingerprint $He^\top$ of the error (after Part 5) |

## Why this page exists

If matrices scared you in school, you are not alone. For this curriculum you need only a **tiny slice**:

- a vector = a list of bits,  
- a matrix = a stack of lists,  
- multiply = several XOR-sums.

We will go slowly with full arithmetic. No determinants, no eigenvalues, no geometry required.

## Story first — lists that talk to each other

You will eventually want a short fingerprint of noise on a long bit-string. Coding theory builds that fingerprint with a table of checks.  

**But first:** we only need to get comfortable with lists, dots, and “stack of lists × one list.” The fingerprint slogan waits until Part 5, after you can compute by hand.

## Part 1 — vectors are lists

A vector of length 4 over bits:

$$
\mathbf{e} = (1,0,1,0).
$$

Read: “position 1 is 1, position 2 is 0, …”

**Addition of vectors** = XOR each position:

$$
(1,0,1,0) \oplus (1,1,0,0) = (0,1,1,0).
$$

### Slow-motion table

| position | first | second | XOR |
|----------|-------|--------|-----|
| 1 | 1 | 1 | 0 |
| 2 | 0 | 1 | 1 |
| 3 | 1 | 0 | 1 |
| 4 | 0 | 0 | 0 |

Same answer: $(0,1,1,0)$.

### Quick self-check (Part 1)

Compute $(1,1,0)\oplus(0,1,1)$.  
<details><summary>Answer</summary>
$(1,0,1)$.
</details>

## Part 2 — dot product (one number from two lists)

For $\mathbf{a}=(a_1,a_2,a_3)$ and $\mathbf{b}=(b_1,b_2,b_3)$ over $\mathbb{F}_2$:

$$
\mathbf{a}\cdot\mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3,
$$

where $+$ is XOR and $a_ib_i$ is multiplication (AND for bits).

**English:** multiply matching positions, then XOR the products into a single bit.

### Example

$\mathbf{a}=(1,1,0)$, $\mathbf{b}=(1,0,1)$:

$$
1\cdot 1 + 1\cdot 0 + 0\cdot 1 = 1 + 0 + 0 = 1.
$$

| $i$ | $a_i$ | $b_i$ | $a_ib_i$ |
|-----|-------|-------|----------|
| 1 | 1 | 1 | 1 |
| 2 | 1 | 0 | 0 |
| 3 | 0 | 1 | 0 |
| XOR of products | | | **1** |

### Example that surprises beginners

$(1,1)\cdot(1,1)=1\cdot 1 + 1\cdot 1=1+1=0$ in $\mathbb{F}_2$.  
Two ones XOR to zero.

### Quick self-check (Part 2)

Dot $(1,0,1)$ with $(0,1,1)$ over $\mathbb{F}_2$.  
<details><summary>Answer</summary>
$0+0+1=1$.
</details>

## Part 3 — a matrix is a stack of rows

Example:

$$
H = \begin{pmatrix}
1 & 1 & 0 & 0 \\
0 & 1 & 1 & 0
\end{pmatrix}.
$$

- 2 rows, 4 columns.  
- Row 1 is $(1,1,0,0)$.  
- Row 2 is $(0,1,1,0)$.

Think: “two check-lists, each of length 4.” We have not used the word syndrome yet — just a table of bits.

## Part 3b — a row as a codeword (worked example)

Flip the story: sometimes a matrix **builds** allowed messages instead of checking them.

$$
G = \begin{pmatrix}
1 & 0 & 1 \\
0 & 1 & 1
\end{pmatrix}.
$$

Each **row** of $G$ is itself a length-3 bit-string — a **codeword**.  
Any XOR of rows is also a codeword (that is the “linear” idea, slowly):

| Message bits $(m_1,m_2)$ | Codeword $= m_1\cdot(\text{row1}) \oplus m_2\cdot(\text{row2})$ |
|--------------------------|------------------------------------------------------------------|
| $(0,0)$ | $(0,0,0)$ |
| $(1,0)$ | $(1,0,1)$ |
| $(0,1)$ | $(0,1,1)$ |
| $(1,1)$ | $(1,1,0)$ |

**How $(1,1)$ was built:**

$$
(1,0,1)\oplus(0,1,1)=(1,1,0).
$$

So: **row = one allowed protected word**; combining rows builds the whole codebook.  
Later pages call $G$ a **generator matrix**. You only need the picture for now.

## Part 4 — matrix times vector (the whole point)

To compute $H\mathbf{e}^\top$ (read: “$H$ times $e$”):

**Each output bit = that row dotted with $\mathbf{e}$.**

Let $\mathbf{e}=(1,0,1,0)$.

**Output bit 1:**

Row1 $\cdot \mathbf{e} = 1\cdot1 + 1\cdot0 + 0\cdot1 + 0\cdot0 = 1$.

| column | row1 | $e$ | product |
|--------|------|-----|---------|
| 1 | 1 | 1 | 1 |
| 2 | 1 | 0 | 0 |
| 3 | 0 | 1 | 0 |
| 4 | 0 | 0 | 0 |
| XOR | | | **1** |

**Output bit 2:**

Row2 $\cdot \mathbf{e} = 0\cdot1 + 1\cdot0 + 1\cdot1 + 0\cdot0 = 1$.

So

$$
H\mathbf{e}^\top = \begin{pmatrix} 1 \\ 1 \end{pmatrix}.
$$

(The $\top$ means “treat $e$ as a column.” If a book writes $He$ with columns from the start, it is the same idea.)

### Another fully labeled multiply

Same $H$, now $\mathbf{e}=(0,1,0,0)$:

- Row1 $\cdot e = 1\cdot0 + 1\cdot1 + 0\cdot0 + 0\cdot0 = 1$  
- Row2 $\cdot e = 0\cdot0 + 1\cdot1 + 1\cdot0 + 0\cdot0 = 1$  

Result: $(1,1)^\top$.

### Quick self-check (Part 4)

For the same $H$, compute $H(0,0,1,0)^\top$.  
<details><summary>Answer</summary>
$(0,1)^\top$.
</details>

## Part 5 — what is a syndrome? (after the arithmetic)

You can already compute $H\mathbf{e}^\top$. Coding theory gives that vector a name when $H$ is used as a **parity-check** table.

If $H$ is a **parity-check matrix** and $c$ is a codeword, then $Hc^\top=\mathbf{0}$ (all-zero).  
Read: every allowed word passes every check.

If you receive $y=c\oplus e$, then

$$
Hy^\top = H(c\oplus e)^\top = He^\top,
$$

because $Hc^\top=\mathbf{0}$.  

That vector $He^\top$ is called the **syndrome**.  
It depends on the **error**, not on which codeword was sent. That is a big deal — and it is just the matrix×vector skill from Part 4 with a story attached.

### Tiny syndrome practice

Using the same $H$:

| $e$ | syndrome $He^\top$ |
|-----|---------------------|
| $(1,0,0,0)$ | $(1,0)^\top$ |
| $(0,1,0,0)$ | $(1,1)^\top$ |
| $(0,0,1,0)$ | $(0,1)^\top$ |
| $(0,0,0,1)$ | $(0,0)^\top$ |

Different single-bit errors → different syndromes here (except the last column of $H$ is zeros, so the fourth bit is invisible — a reminder that $H$ must be designed carefully in real life).

## Part 6 — equations picture

$H\mathbf{e}^\top=\mathbf{s}^\top$ is just a system of XOR equations.

For our $H$ and $\mathbf{s}=(1,0)^\top$:

\begin{align*}
e_1 + e_2 &= 1,\\
e_2 + e_3 &= 0.
\end{align*}

(with $e_4$ unused).  

Many bit solutions may exist. Adding “$\mathbf{e}$ has low weight” picks a sparse solution — the decoding puzzle. You will meet that puzzle on the bridge pages; here you only need to see that matrix×vector is a stack of XOR equations.

## Check yourself

1. Dot $(1,0,1)$ with $(0,1,1)$ over $\mathbb{F}_2$.  
2. For $H$ above, compute $H(0,0,1,0)^\top$.  
3. If $Hc^\top=0$ and $y=c\oplus e$, why is $Hy^\top=He^\top$?  
4. Invent a length-3 vector of weight 2.  
5. Using $G$ from Part 3b, what codeword comes from message $(1,1)$?  
6. In one sentence (no formulas): what is a syndrome?  

<details><summary>Answers</summary>

1. $0+0+1=1$.  
2. $(0,1)^\top$.  
3. Because $H(c\oplus e)^\top=Hc^\top+He^\top=He^\top$.  
4. e.g. $(1,1,0)$.  
5. $(1,0,1)\oplus(0,1,1)=(1,1,0)$.  
6. A short fingerprint of the error computed by the parity-check table $H$.

</details>

## Bridge to PQC

This page’s equation $H\mathbf{e}^\top=\mathbf{s}^\top$ with sparse $\mathbf{e}$ **is** the syndrome-decoding slogan.  
Next: [Polynomials Part A](polynomials-gentle.md) then [wrap-around Part B](polynomials-wraparound.md) for quasi-cyclic packing, then bridge [From bits to codes](../bridge/from-bits-to-codes.md) for redundancy stories.  
When you want $G$ and $H$ in one sitting with encoding: [Generator and parity-check](../bridge/generator-and-parity-check.md).

## Common confusions

- Length = number of symbols, not geometric length.  
- All arithmetic here is mod 2 unless said otherwise.  
- “Matrix” does not require geometry class.  
- A **row of $G$** is a codeword; a **row of $H$** is a parity check — same shape, different job.  
- More equations than unknowns does not automatically mean a unique sparse solution.  
- You do not need to memorize “syndrome” before you can multiply $H$ by $e$ — the name comes after the skill.

## More practice (try it)

1. $(1,1,1)\cdot(1,1,0)$ over $\mathbb{F}_2$?  
2. Weight of $(1,0,1,1)$?  
3. With $H=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$, compute $H(1,0,0)^\top$.  
4. In one sentence, what is a syndrome?  
5. True or false: every XOR of rows of $G$ is still a codeword (for a linear code).  
6. Using Part 3b’s $G$, encode message $(0,1)$.  

<details><summary>Answers</summary>

1. $1+1+0=0$.  
2. $3$.  
3. $(1,0)^\top$.  
4. The linear fingerprint $He^\top$ of the error (under parity checks $H$).  
5. True — that is the subspace / linear-code picture.  
6. $(0,1,1)$.

</details>

## Next steps

- [Polynomials Part A](polynomials-gentle.md) · [Part B wrap-around](polynomials-wraparound.md)  
- Bridge: [From bits to codes](../bridge/from-bits-to-codes.md)  
- Bridge: [Generator and parity-check](../bridge/generator-and-parity-check.md)  
