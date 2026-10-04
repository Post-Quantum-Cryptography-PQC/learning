# How to read the math in this curriculum

**Prereqs:** none (start here if symbols feel scary)  
**Next:** [Why cryptography?](why-cryptography.md)

**Learning goals.** Recognize common symbols ($=$, $\equiv$, $\oplus$, $\Pr$, vectors), know that you can skip a formula on first read and come back, and practice translating several lines of math into English — slowly, on purpose.

## Symbols on this page (starter kit)

| Symbol | English |
|--------|---------|
| $=$ | Ordinary equals |
| $\equiv\pmod{n}$ | Same leftover mod $n$ |
| $\oplus$ | XOR |
| $\Pr[\ldots]$ | Probability that … |
| $\mathbf{e}$ | A whole list (vector), not one number |
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

### 3. Lists of bits (vectors)

$(1,0,1)$ is just three bits in a row.  
Bold letters like $\mathbf{e}$ usually mean “a whole list,” not one number.

Length of $(1,0,1)$ is $3$.  
Weight (number of ones) of $(1,0,1)$ is $2$.

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

<details><summary>Answers</summary>

1. “Ciphertext equals message XOR pad” (or similar).  
2. $1$.  
3. $011$.  
4. “The probability that bit $b$ is one equals one fourth.”  
5. $8$.

</details>

## Check yourself

1. Write in English: $m \oplus p = c$.  
2. What is $7 \bmod 5$?  
3. What is $101 \oplus 001$?  
4. Say out loud what $\Pr[W\ge 3]$ is asking.  
5. Translate aloud: $K = \mathsf{Decaps}(\mathsf{sk},\mathsf{ct})$.  
6. True or false: you must understand every symbol on first sight before continuing.  

<details><summary>Answers</summary>

1. Message XOR pad equals ciphertext (or similar wording).  
2. $2$.  
3. $100$.  
4. “Probability that the weight $W$ is at least 3.”  
5. “The session key $K$ is what Decaps returns from the secret key and ciphertext.”  
6. False — English first, symbols on the second pass.

</details>

## Emotional contract

Feeling slow is normal. Cryptography professionals still unpack formulas line by line. Speed is not the goal — **accurate English meaning** is.

If a later page piles up symbols, open this page in another tab and translate one line at a time.

## Next steps

- [Why cryptography?](why-cryptography.md)  
- Then [Modular arithmetic](modular-arithmetic.md) when you are ready for clock math  
- Return here anytime a formula feels opaque  
