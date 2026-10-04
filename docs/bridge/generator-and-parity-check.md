# Generator and parity-check matrices

**Prereqs:** [From bits to codes](from-bits-to-codes.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md)  
**Next:** [Decoding as a puzzle](decoding-as-a-puzzle.md) · Concept: [Linear codes](../concepts/linear-codes.md)

**Learning goals.** Encode with a tiny generator matrix $G$, check membership with $H$, and compute a syndrome for an error — with encoding practiced **before** checks, so the two jobs do not blur.

## Symbols on this page

| Symbol | English |
|--------|---------|
| $G$ | Generator matrix — builds codewords from short messages |
| $H$ | Parity-check matrix — tests codewords / fingerprints errors |
| $\mathbf{m}$ | Short message |
| $\mathbf{c}=\mathbf{m}G$ | Codeword from message (this page’s row convention) |
| $s=He^\top$ | Syndrome — fingerprint of error $e$ |
| $y=c\oplus e$ | Received word = codeword XOR error |

## Why this page exists

Concept pages assume you are comfortable with $G$ and $H$. Fundamentals only multiplied one small matrix. Here we connect **encoding**, **parity checks**, and **syndromes** with full sentences and every arithmetic step.

You already met rows-as-codewords and matrix×vector on [Vectors and matrices](../fundamentals/vectors-matrices.md). This page puts both jobs in one story.

## Beat 1 — encoding with $G$ (build the codeword)

A **linear code** is a subspace: if $c$ and $c'$ are codewords, so is $c\oplus c'$.

**Generator matrix $G$** — rows span all codewords. Easy encoding: message $\mathbf{m}$ becomes codeword $\mathbf{c}=\mathbf{m}G$ (row-vector convention on this page).

### Worked codebook — even-weight length 3

Use the even-weight length-3 code over $\mathbb{F}_2$: codewords with $c_1+c_2+c_3=0$:

$$
C=\{000,110,101,011\}.
$$

One generator (messages length $k=2$):

$$
G = \begin{pmatrix} 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}.
$$

**Encode $\mathbf{m}=(1,0)$** — take row 1:

$$
\mathbf{c} = (1,0)\,G = (1,1,0).
$$

Slow motion: $1\cdot(1,1,0)\oplus 0\cdot(1,0,1)=(1,1,0)$.

**Encode $\mathbf{m}=(0,1)$** — take row 2: $\mathbf{c}=(1,0,1)$.

**Encode $\mathbf{m}=(1,1)$** — XOR both rows:

$$
(1,1,0)\oplus(1,0,1)=(0,1,1).
$$

**Encode $\mathbf{m}=(0,0)$:** $\mathbf{c}=(0,0,0)$.

| message $\mathbf{m}$ | codeword $\mathbf{c}$ |
|----------------------|------------------------|
| $(0,0)$ | $(0,0,0)$ |
| $(1,0)$ | $(1,1,0)$ |
| $(0,1)$ | $(1,0,1)$ |
| $(1,1)$ | $(0,1,1)$ |

That table **is** the whole code. Short message → longer protected word.

### Quick self-check (Beat 1)

For this $G$, encode $\mathbf{m}=(1,1)$ without looking at the table.  
<details><summary>Answer</summary>
$(0,1,1)$.
</details>

## Beat 2 — checking with $H$ (test the codeword)

**Parity-check matrix $H$** — every codeword obeys $H\mathbf{c}^\top=\mathbf{0}$. Like a checklist of XOR constraints.

For the same even-weight code, $n-k=1$, so one check row:

$$
H = (1\ 1\ 1).
$$

**Meaning in English:** the three bits must XOR to $0$ (even parity).

Check a few codewords:

| $\mathbf{c}$ | $H\mathbf{c}^\top = c_1+c_2+c_3$ |
|--------------|-----------------------------------|
| $(1,1,0)$ | $1+1+0=0$ |
| $(1,0,1)$ | $1+0+1=0$ |
| $(0,1,1)$ | $0+1+1=0$ |
| $(1,1,1)$ (not a codeword) | $1+1+1=1$ ≠ $0$ |

So $G$ **builds**; $H$ **tests**. Same code, two jobs.

### Quick self-check (Beat 2)

Compute $H(0,1,1)^\top$ with $H=(1\,1\,1)$.  
<details><summary>Answer</summary>
$0+1+1=0$ (it is a codeword).
</details>

## Beat 3 — syndrome from an error

If you receive $y=c\oplus e$, then

$$
H y^\top = H e^\top = s
$$

because $Hc^\top=0$. The vector $s$ is the **syndrome**. It depends on the error, not on which codeword was sent — a crucial fact.

### Error and syndrome (same toy)

Let $c=(1,1,0)$ and flip the last bit: $e=(0,0,1)$, so $y=(1,1,1)$.

$$
s = H y^\top = 1+1+1 = 1.
$$

Same as $He^\top=1$. The syndrome **detects** that an odd number of flips happened. With only one parity bit we cannot always **locate** the error — richer $H$ (more rows) gives more information.

**Wrong $H$ that fails the job:** suppose someone used $H'=(1\,0\,0)$. Then $H'(1,1,0)^\top=1\neq 0$, so a real codeword would fail the check. A valid $H$ must annihilate every codeword.

## Second tiny example — two checks

$$
H = \begin{pmatrix} 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \end{pmatrix}.
$$

If $e=(1,0,0,0)$, then $s=(1,0)^\top$.  
If $e=(0,1,0,0)$, then $s=(1,1)^\top$.  
Different sparse errors → different syndromes in this toy — decoding can look up $s$ and recover $e$ when weight is at most $1$.

That lookup idea scales badly; real attacks use smarter algorithms, but the **meaning** of $s$ stays: a linear fingerprint of $e$.

### Quick self-check (two checks)

With this $H$, what is $He^\top$ for $e=(0,0,1,0)$?  
<details><summary>Answer</summary>
$(0,1)^\top$.
</details>

## Bridge to PQC

- **Syndrome decoding problem:** given $H$ and $s$, find sparse $e$ with $He^\top=s$. Hard for random-looking $H$.  
- Secret key in many schemes: a structured $H$ (or equivalent) with an efficient decoder.  
- Public key: disguise that structure.

Continue with [Decoding as a puzzle](decoding-as-a-puzzle.md).  
The compact vocabulary card is [Linear codes](../concepts/linear-codes.md) — same toy, shorter wording.

## Common confusions

- $G$ builds codewords; $H$ tests them — different jobs.  
- Conventions differ on row vs column messages; always check the paper’s notation.  
- $s=0$ means “looks like a codeword,” not always “no error” if errors themselves form a codeword (rare for sparse random $e$, but conceptually possible).  
- One parity bit detects odd weight errors but may not locate which bit flipped.

## Check yourself

1. For $G$ above, encode $\mathbf{m}=(0,0)$.  
2. Compute $H(0,1,1)^\top$ with $H=(1\,1\,1)$.  
3. Why does $Hy^\top$ equal $He^\top$ when $y=c\oplus e$?  
4. If two different weight-1 errors give the same syndrome, what goes wrong for unique decoding?  
5. In one sentence: what does $G$ do that $H$ does not?  

<details><summary>Answers</summary>

1. $(0,0,0)$.  
2. $0+1+1=0$.  
3. $Hc^\top=0$, so $H(c\oplus e)^\top=He^\top$.  
4. The decoder cannot tell them apart from $s$ alone.  
5. $G$ builds codewords from short messages; $H$ only checks / fingerprints.

</details>

## Next steps

- [Decoding as a puzzle](decoding-as-a-puzzle.md)  
- [Finite fields beyond $\mathbb{F}_2$](finite-fields-beyond-f2.md)  
- Concept: [Linear codes](../concepts/linear-codes.md)  
