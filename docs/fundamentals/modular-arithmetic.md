# Modular arithmetic

**Prereqs:** [Why cryptography?](why-cryptography.md) · [Reading math](reading-math-notation.md)  
**Next:** [Bits, XOR, and randomness](bits-xor-randomness.md)

**Learning goals.** Compute remainders confidently, use “clock math,” add and multiply wrapping around $n$, and meet the bit world where $1+1=0$ — without needing the word “field” on day one.

## Symbols on this page

| Symbol | English |
|--------|---------|
| $a \bmod n$ | Leftover when $a$ is divided by $n$ |
| $a \equiv b \pmod{n}$ | Same leftover mod $n$ (congruent) |
| $\mathbb{F}_2$ | Bit world $\{0,1\}$ with $1+1=0$ |
| inverse | Number that undoes multiplication mod $n$ (when it exists) |

## Why this page exists

Almost every modern crypto example eventually says “mod $n$.” That phrase scares people who only remember it as a calculator button. Here we treat it as **wrap-around arithmetic**, with many tiny examples. Take your time.

## Intuition — clocks and leftovers

### Clocks

On a 12-hour clock, start at 10, add 3 hours: you land on 1, not 13.

$$
10 + 3 \equiv 1 \pmod{12}.
$$

Read out loud: “10 plus 3 is congruent to 1 modulo 12.”

**Another clock walk:** start at 9, add 5 hours → land on 2, because $9+5=14$ and $14-12=2$.

$$
9 + 5 \equiv 2 \pmod{12}.
$$

### Leftovers (same idea)

15 eggs packed by dozens: 1 dozen, **3 left over**.  
So $15$ and $3$ are “the same mod 12.”

23 minutes past an hour, thinking in “mod 60”: leftover is just $23$.  
If you add 50 minutes to 40 minutes past: $40+50=90$, and $90\bmod 60=30$ — half past.

## The remainder habit

To compute $a \bmod n$ (as a single leftover in $\{0,1,\ldots,n-1\}$):

1. Divide $a$ by $n$.  
2. Keep the remainder.

Examples:

| Computation | Leftover |
|-------------|----------|
| $15 \div 4 = 3$ rem $3$ | $15 \bmod 4 = 3$ |
| $20 \div 7 = 2$ rem $6$ | $20 \bmod 7 = 6$ |
| $12 \div 12 = 1$ rem $0$ | $12 \bmod 12 = 0$ |
| $17 \div 5 = 3$ rem $2$ | $17 \bmod 5 = 2$ |
| $8 \div 2 = 4$ rem $0$ | $8 \bmod 2 = 0$ |

**Congruence:** $a \equiv b \pmod{n}$ means $a$ and $b$ leave the **same** leftover mod $n$.  
So $15 \equiv 3 \pmod{4}$, and also $15 \equiv 7 \pmod{4}$ because $7\bmod 4=3$ too.

### Quick self-check

What is $23\bmod 5$?  
<details><summary>Answer</summary>
$3$ ($5\cdot 4=20$, leftover $3$).
</details>

## Working rule for + and ×

To add or multiply mod $n$:

1. Do ordinary + or ×.  
2. Replace the answer by its leftover mod $n$.

### Example — mod 7

$(5+4)=9$, and $9\bmod 7=2$, so $5+4\equiv 2\pmod{7}$.  
$(5\cdot 4)=20$, and $20\bmod 7=6$, so $5\cdot 4\equiv 6\pmod{7}$.

### Practice table — doubles mod 7

| $a$ | $2a$ | $2a \bmod 7$ |
|------|------|----------------|
| 0 | 0 | 0 |
| 1 | 2 | 2 |
| 2 | 4 | 4 |
| 3 | 6 | 6 |
| 4 | 8 | 1 |
| 5 | 10 | 3 |
| 6 | 12 | 5 |

Notice row $a=4$: $2\cdot 4=8\equiv 1\pmod{7}$.  
So multiplying by 4 undoes multiplying by 2 mod 7. We call 4 an **inverse** of 2 mod 7.

You do **not** need inverses for every later page. Just know: sometimes we can “divide” by multiplying by an inverse.

### Practice table — add 3 mod 5 (before inverses)

| $a$ | $a+3$ | $(a+3)\bmod 5$ |
|------|-------|----------------|
| 0 | 3 | 3 |
| 1 | 4 | 4 |
| 2 | 5 | 0 |
| 3 | 6 | 1 |
| 4 | 7 | 2 |

Wrapping is just “subtract $5$ when you pass it.” Same habit as the clock.

## When inverses fail (honest warning)

Mod 8, can we find $x$ with $2x\equiv 1\pmod{8}$?  
Even times anything is even; $1$ is odd. **Impossible.**

So “division by 2” breaks mod 8.  
When the modulus is a **prime** (2, 3, 5, 7, 11, …), nonzero numbers behave more nicely: inverses exist.

Crypto likes these nice systems. For this curriculum’s binary codes, we especially love modulus **2**.

## The bit world $\mathbb{F}_2$ (say “F two”)

Only two numbers: $0$ and $1$. Arithmetic mod 2:

**Addition (same as XOR):**

| $+$ | 0 | 1 |
|-----|---|---|
| 0 | 0 | 1 |
| 1 | 1 | **0** |

Yes: $1+1=0$. That feels weird on day one and becomes normal by day three.

**Multiplication:**

| $\times$ | 0 | 1 |
|----------|---|---|
| 0 | 0 | 0 |
| 1 | 0 | 1 |

### Same tables, read as XOR / AND

| ordinary words | mod-2 symbol |
|----------------|--------------|
| XOR | $+$ in $\mathbb{F}_2$ |
| AND | $\times$ in $\mathbb{F}_2$ |

So “flip a bit if the mask is 1” is exactly adding in $\mathbb{F}_2$.

### Tiny XOR chain

$1+1+1$ in $\mathbb{F}_2$:

$$
(1+1)+1 = 0+1 = 1.
$$

Three ones → leftover one (odd count).

### Why crypto cares

Computers store bits. Adding bits mod 2 is XOR. Coding theory and much of code-based crypto live in this world.

We may call $\{0,1\}$ with these rules a **finite field** $\mathbb{F}_2$.  
If the word “field” is stressful, ignore it for now and just remember the two tables above.

## Slow-motion worked problems

**Problem 1.** Compute $100 \bmod 9$.  
$9\cdot 11=99$, leftover $1$. Answer: $1$.

**Problem 2.** Does $15\equiv 0\pmod{5}$?  
$15\div 5$ leftover $0$, yes.

**Problem 3.** In $\mathbb{F}_2$, what is $1+1+1$?  
$(1+1)+1=0+1=1$.

**Problem 4.** Reduce $2\cdot 6$ mod 5.  
$12\bmod 5=2$.

**Problem 5.** On a 12-hour clock, $11+4$?  
$15\equiv 3\pmod{12}$.

## Bridge to PQC (light)

| Later idea | Modular link |
|------------|--------------|
| Bit-strings | Entries in $\mathbb{F}_2$ |
| Matrices over bits | All $+$ and $\times$ use the tables above |
| Polynomials with bit coefficients | Same $+$, with wrap-around of powers later |
| Lattice crypto (other track) | Often uses a large modulus $q$ |

## Common confusions

- Mod is a whole number system, not only a calculator key.  
- $-1 \equiv n-1\pmod{n}$ (example: $-1\equiv 6\pmod{7}$).  
- “Division” means “× inverse” when an inverse exists.  
- Integers mod 4 are **not** a field (because 2 has no inverse) — that matters later for $\mathbb{F}_4$ vs $\mathbb{Z}/4\mathbb{Z}$.  
- $\mathbb{F}_2$ addition is XOR, not ordinary “$1+1=2$.”

## Big practice set

1. $17\bmod 5=$?  
2. $3+6$ mod 7?  
3. $3\cdot 6$ mod 7?  
4. In $\mathbb{F}_2$, fill: $1\oplus 1=\ $? (same as $1+1$)  
5. Find an inverse of $3$ mod 7 (find $x$ with $3x\equiv 1\pmod{7}$).  
6. Explain in one sentence why $2$ has no inverse mod 6.  
7. Compute $1+0+1+1$ in $\mathbb{F}_2$.  

<details><summary>Answers</summary>

1. $2$.  
2. $2$.  
3. $4$ (because $18=2\cdot 7+4$).  
4. $0$.  
5. $5$, because $15\equiv 1\pmod{7}$.  
6. Multiples of 2 mod 6 are only $0,2,4$ — never $1$.  
7. $1+0+1+1=1$ (three ones → odd → $1$).

</details>

## Check yourself (quick)

1. What is $15\bmod 4$?  
2. In $\mathbb{F}_2$, what is $1+1$?  
3. True or false: $10\equiv 2\pmod{8}$.  
4. True or false: adding bits mod 2 is the same operation as XOR.  

<details><summary>Answers</summary>

1. $3$.  
2. $0$.  
3. True ($10=8+2$).  
4. True.

</details>

## Next steps

- [Bits, XOR, and randomness](bits-xor-randomness.md)  
- [Vectors and matrices](vectors-matrices.md) after bits  
- [Polynomials Part A](polynomials-gentle.md) when comfortable with $\mathbb{F}_2$  
- Then [Polynomial wrap-around](polynomials-wraparound.md) before QC pages  
