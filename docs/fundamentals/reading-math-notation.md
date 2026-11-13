# How to read the math in this curriculum

**Prereqs:** [Orientation](../orientation/README.md) recommended (Motivation → Challenges) · or none if jumping straight to symbols  
**Next:** [Why cryptography?](why-cryptography.md)

**Learning goals.** After this page you can:

- Recognize common symbols ($=$, $\equiv$, $\oplus$, $\Pr$, vectors, $\mathrm{wt}$)
- Read assignment / sampling arrows ($\leftarrow$, $\gets$)
- Recognize field and ring letters ($\mathbb{F}_2$, $\mathbb{Z}_q$, $R_q$) without fear
- Know that hats / tildes / bars are **labels**, not new arithmetic
- Read floors, ceilings, sums, and $\cdot$ / $\circ$ as English sentences
- Know that you can skip a formula on first read and come back
- Practice translating several lines of math into English — slowly, on purpose

## Symbols on this page (starter kit)

| Symbol | English |
|--------|---------|
| $=$ | Ordinary equals |
| $\equiv\pmod{n}$ | Same leftover mod $n$ |
| $\oplus$ | XOR |
| $\Pr[\ldots]$ | Probability that … |
| $\mathbf{e}$ | A whole list (vector), not one number |
| $\mathrm{wt}(e)$ | Weight = number of ones (nonzero entries) in $e$ |
| $x \leftarrow y$ | Assign: “set $x$ to $y$” |
| $x \stackrel{\$}{\leftarrow} S$ | Sample: “draw $x$ at random from set $S$” |
| $\mathbb{F}_2$, $\mathbb{Z}_q$, $R_q$ | Alphabets / wrap-around polynomial rings (see below) |
| $\hat{a}$, $\tilde{f}$, $\bar{c}$ | Same object in another “costume” (label, not new math) |
| $\lfloor x\rfloor$, $\lceil x\rceil$ | Floor / ceiling (round down / up to an integer) |
| $\sum$, $\cdot$, $\circ$ | Sum; multiply; same-index (pointwise) multiply |
| $2^{10}$ | Two×itself ten times ($1024$), not “twenty” |

Full curriculum dictionary: [Glossary](../glossary.md).

## Why this page exists

PQC uses symbols. That does **not** mean you must already love advanced math. It means we need a shared shorthand. This page is a **symbol survival guide**. Read it once; return whenever a later page feels dense.

You are allowed to:

1. Read the English first.  
2. Ignore a displayed formula on the first pass.  
3. Come back and translate the formula word-by-word.  
4. Write your own English under every line until it feels boring.

Feeling slow is normal. Professionals unpack formulas the same way.

Curated paper extracts lean on the same handful of habits below — codes, lattices, and hardware leaves all recycle them.

## Story first — one noisy message

Imagine Alice sends a protected bit-string $c$. Noise flips some bits; call that noise $e$. Bob sees

$$
y = c \oplus e.
$$

Say that out loud: “received word equals codeword XOR error.”  
If you can say that, the symbols are already doing their job. Everything below is vocabulary for the same habit.

### Same story, slower

| Symbol | Role in the story |
|--------|-------------------|
| $c$ | What Alice meant to send (clean) |
| $e$ | What the channel flipped (noise) |
| $y$ | What Bob actually got |
| $\oplus$ | “Combine by flipping where $e$ has ones” |

You do not need to *solve* for $e$ yet. Just name the pieces.

## The only rules we really need early

### 1. Equals vs congruence

- $a = b$ means “same number” in ordinary arithmetic.  
- $a \equiv b \pmod{n}$ means “same remainder when divided by $n$” (clock math).  

Example: $15 \equiv 3 \pmod{12}$ because both leave remainder $3$ on a 12-hour clock.

**Say it:** “fifteen is congruent to three mod twelve.”

Another: $10 + 3 = 13$, but $10 + 3 \equiv 1 \pmod{12}$.  
Ordinary sum and clock-sum can disagree — that is intentional.

### 2. Bits and XOR

A **bit** is $0$ or $1$.  
$a \oplus b$ means XOR: same bits → $0$, different bits → $1$.  
In $\mathbb{F}_2$ (our bit world), XOR is the same as addition: $1+1=0$.

| $a$ | $b$ | $a\oplus b$ |
|------|------|-------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### 3. Lists of bits (vectors) and weight

$(1,0,1)$ is just three bits in a row.  
Bold letters like $\mathbf{e}$ usually mean “a whole list,” not one number.

Length of $(1,0,1)$ is $3$.  
**Weight** $\mathrm{wt}(1,0,1)=2$ — count the ones. Papers also write $\mathrm{HW}(e)$ for the same idea (Hamming weight).

You will see weight again with syndromes: a sparse error $\mathbf{e}$ still leaves a fingerprint $H\mathbf{e}^\top=\mathbf{s}$. More practice: [Vectors and matrices](vectors-matrices.md).

### 4. Probability

$\Pr[\text{something}]$ means “probability that something happens,” a number between $0$ and $1$.  
Example: fair coin $\Pr[\text{Heads}]=\tfrac12$.

Read $\tfrac12$ as “one half,” not “twelve.”

### 5. Subscripts and superscripts

- $a_1, a_2, a_3$ — first, second, third piece.  
- $2^{10}$ — two multiplied by itself ten times ($1024$), not “twenty.”  
- $X^2$ in a polynomial — the placeholder $X$ squared (a label for position), not “mystery variable you must solve for” in our early examples.

### 6. Fractions and “at most”

$\Pr[W \ge t] \le 2^{-128}$ uses:

- $\ge$ “at least / greater or equal”  
- $\le$ “at most / less or equal”  
- $2^{-128}$ “one over two-to-the-one-hundred-twenty-eight” (tiny)

You do not compute that number by hand. Hear: “astronomically small.”

### 7. Set braces (light)

$\{0,1\}$ means “the set containing only $0$ and $1$.”  
$\mathbf{e}\in\{0,1\}^n$ means “$e$ is a length-$n$ bit list.”  
Skip set notation on first read if it stresses you; return later.

### 8. Arrows — assign vs sample

Crypto papers love left arrows. Two jobs:

| Writing | English |
|---------|---------|
| $x \leftarrow y$ or $x \gets y$ | **Assign:** set $x$ equal to $y$ (deterministic) |
| $x \stackrel{\$}{\leftarrow} S$ or $x \gets_{\$} S$ | **Sample:** draw $x$ at random from set $S$ |
| $\tilde{f} \leftarrow \mathrm{NTT}(f)$ | Assign the result of a named recipe |

The dollar sign is a “randomness” badge, not money.  
**Say it:** “sample $x$ from $S$” vs “set $x$ to $y$.”

### 9. Alphabets — $\mathbb{F}_2$, $\mathbb{Z}_q$, $R_q$

Think **alphabet of legal numbers**, not abstract algebra class.

| Symbol | English (survival level) |
|--------|--------------------------|
| $\mathbb{F}_2$ | Bits $\{0,1\}$ with wrap $1+1=0$ |
| $\mathbb{F}_q$ / $\mathrm{GF}(q)$ | A finite alphabet of size $q$ (codes over larger fields) |
| $\mathbb{Z}_q$ | Integers mod $q$ — leftovers $0,1,\ldots,q-1$ |
| $R_q = \mathbb{Z}_q[X]/(X^n\pm 1)$ | Fixed-length polynomials whose coefficients live in $\mathbb{Z}_q$, with wrap-around on $X^n$ |

Kyber-shaped slogan you will meet later:

$$
R_q = \mathbb{Z}_{3329}[X]/(X^{256}+1).
$$

**Say it:** “degree-$255$ polynomials, coefficients mod $3329$, wrap with $X^{256}+1$.”  
Deepen later: [Modular arithmetic](modular-arithmetic.md) · [Polynomials](polynomials-gentle.md) · [Wrap-around](polynomials-wraparound.md).

### 10. Hats, tildes, bars — costumes, not new operators

| Mark | Typical English in PQC papers |
|------|-------------------------------|
| $\hat{a}$ | “hat-$a$” — often a transformed / estimated copy |
| $\tilde{f}$ | “tilde-$f$” — often **NTT-domain** (same poly, different view) |
| $\bar{c}$ | “bar-$c$” — often compressed / related / average |

$$
\tilde{f} \leftarrow \mathrm{NTT}(f)
$$

**Full sentence:** “Set tilde-$f$ to the NTT of $f$.”  
You do **not** need the butterfly graph yet — only the habit that accents rename a related object. NTT as a concept: later cards such as [NTT butterfly](../concepts/ntt-butterfly.md).

### 11. Floor, ceiling, bit-width

| Symbol | English |
|--------|---------|
| $\lfloor x\rfloor$ | Floor: largest integer $\le x$ (round down) |
| $\lceil x\rceil$ | Ceiling: smallest integer $\ge x$ (round up) |

Examples: $\lfloor 3.7\rfloor=3$, $\lceil 3.2\rceil=4$, $\lceil\log_2 3329\rceil=12$.

Hardware papers write bit-width slogans like $W_q=\lceil\log q\rceil$ — “how many bits to hold leftovers mod $q$.” Compress/Decompress in KEMs also leans on floors; see [Ciphertext compress / encode](../concepts/ciphertext-compress-encode.md) when you get there.

### 12. Sums, dots, and little circles

| Symbol | English |
|--------|---------|
| $\sum_{i=0}^{n-1} f_i X^i$ | “Add up term $f_i X^i$ for each $i$” — how papers write a polynomial |
| $f\cdot g$ | Multiply (for polys: usually “multiply then reduce mod the ring”) |
| $\tilde{f}\circ\tilde{g}$ | **Same-index** multiply (coefficient-wise / CWM in NTT domain) |

Tiny poly aloud:

$$
f = \sum_{i=0}^{2} f_i X^i = f_0 + f_1 X + f_2 X^2.
$$

**Say it:** “$f$ is $f_0$ plus $f_1$ times $X$ plus $f_2$ times $X$ squared.”  
Treat $\circ$ as “multiply matching slots,” not as a new number system.

## How to translate a formula (method)

**Recipe:** (1) name each symbol in English, (2) name the operation, (3) restate the whole line as one sentence.

### Worked example — aloud #1

$$
y = c \oplus e.
$$

| Piece | English |
|-------|---------|
| $y$ | received word |
| $c$ | codeword (clean protected message) |
| $e$ | error / noise bit-string |
| $\oplus$ | XOR, position by position |

**Full sentence:** “The received word $y$ is the codeword $c$ XOR the error $e$.”

### Worked aloud #2

$$
H\mathbf{e}^\top = \mathbf{s}^\top.
$$

| Piece | English |
|-------|---------|
| $H$ | a table of parity checks (a matrix) |
| $\mathbf{e}$ | the error list |
| $\mathbf{s}$ | the syndrome (fingerprint of the error) |
| $\top$ | “stand the list up as a column” (some books omit it) |

**Full sentence:** “Matrix $H$ times the error list $\mathbf{e}$ produces the syndrome list $\mathbf{s}$.”

### Worked aloud #3 (probability)

$$
\Pr[W \ge t] \le 2^{-128}.
$$

**Full sentence:** “The probability that the weight $W$ is at least $t$ is at most about one in $2^{128}$.”  
You do not need to compute $2^{128}$ yet — just hear “astronomically small.”

### Worked aloud #4 (modular)

$$
a + b \equiv c \pmod{q}.
$$

**Full sentence:** “$a$ plus $b$ leaves the same remainder as $c$ when you wrap around modulus $q$.”

### Worked aloud #5 (KEM slogan)

$$
K = \mathsf{Decaps}(\mathsf{sk},\mathsf{ct}).
$$

**Full sentence:** “The session key $K$ is what Decaps returns from the secret key and the ciphertext.”  
Sans-serif names like $\mathsf{Decaps}$ are just function names — “a recipe with that label.”

### Worked aloud #6 (sample vs assign)

$$
\mathbf{e} \stackrel{\$}{\leftarrow} \{0,1\}^n,\qquad \mathbf{s} \leftarrow H\mathbf{e}^\top.
$$

**Full sentence:** “Draw a random length-$n$ bit error $\mathbf{e}$; then set the syndrome $\mathbf{s}$ to $H$ times that error.”

### Worked aloud #7 (weight)

$$
\mathrm{wt}(1,0,1,1)=3.
$$

**Full sentence:** “The weight of that bit list is three — three ones.”

### Worked aloud #8 (ring + NTT label)

$$
\tilde{f} \leftarrow \mathrm{NTT}(f),\quad f\in R_q.
$$

**Full sentence:** “$f$ lives in the wrap-around polynomial ring $R_q$; set tilde-$f$ to its NTT.”

## Displayed math vs inline math

- Inline: $1+1=0$ sits inside a sentence.  
- Displayed:

$$
1+1=0
$$

is the same idea, just centered for breathing room.

On GitHub or MkDocs with KaTeX, both should render as pretty math. If you see raw `$...$` text, use `mkdocs serve` for a better view. This curriculum uses `$...$` / `$$...$$` on purpose (GitHub-friendly).

## Slow-motion lab (do on paper)

1. Translate aloud: $c = m \oplus p$.  
2. What is $11 \bmod 5$?  
3. Compute $110 \oplus 101$.  
4. Write one English sentence for $\Pr[b=1]=\tfrac14$.  
5. Is $2^3$ equal to $6$ or $8$?  
6. Translate: $x \stackrel{\$}{\leftarrow}\{0,1\}^8$.  
7. What is $\mathrm{wt}(1,0,1,0)$?  
8. What is $\lceil 3.2\rceil$? $\lfloor\log_2 8\rfloor$?  

<details><summary>Answers</summary>

1. “Ciphertext equals message XOR pad” (or similar).  
2. $1$.  
3. $011$.  
4. “The probability that bit $b$ is one equals one fourth.”  
5. $8$.  
6. “Sample an 8-bit string $x$ uniformly at random.”  
7. $2$.  
8. $4$; $3$.

</details>

## Check yourself

1. Write in English: $m \oplus p = c$.  
2. What is $7 \bmod 5$?  
3. What is $101 \oplus 001$?  
4. Say out loud what $\Pr[W\ge 3]$ is asking.  
5. Translate aloud: $K = \mathsf{Decaps}(\mathsf{sk},\mathsf{ct})$.  
6. True or false: you must understand every symbol on first sight before continuing.  
7. Assign or sample? $sk \leftarrow \mathsf{KeyGen}()$ vs $e \stackrel{\$}{\leftarrow}\{0,1\}^n$.  
8. Translate: $R_q=\mathbb{Z}_q[X]/(X^n+1)$ in one sentence.  
9. What does $\tilde{f}$ usually signal next to $\mathrm{NTT}$?  
10. $\mathrm{wt}(0,1,1,1)=$?  

<details><summary>Answers</summary>

1. Message XOR pad equals ciphertext (or similar wording).  
2. $2$.  
3. $100$.  
4. “Probability that the weight $W$ is at least 3.”  
5. “The session key $K$ is what Decaps returns from the secret key and ciphertext.”  
6. False — English first, symbols on the second pass.  
7. First is assign (deterministic KeyGen output); second is sample.  
8. “Polynomials with coefficients mod $q$, wrapped so $X^n$ folds with $+1$.”  
9. NTT-domain / transformed copy of $f$ — a label, not a new field.  
10. $3$.

</details>

## Emotional contract

Feeling slow is normal. Cryptography professionals still unpack formulas line by line. Speed is not the goal — **accurate English meaning** is.

If a later page piles up symbols, open this page in another tab and translate one line at a time.

## What this page deliberately skips

Full NTT butterflies, Module-LWE matrix slogans, and Compress/Decompress bit-packing belong on concept cards — not here. Use this page to **unlock the alphabet**, then follow:

- [NTT butterfly](../concepts/ntt-butterfly.md)  
- [Module-LWE](../concepts/module-lwe.md)  
- [Ciphertext compress / encode](../concepts/ciphertext-compress-encode.md)

## Next steps

- [Why cryptography?](why-cryptography.md)  
- Then [Modular arithmetic](modular-arithmetic.md) when you are ready for clock math  
- Return here anytime a formula feels opaque  
