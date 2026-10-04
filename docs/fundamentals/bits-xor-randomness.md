# Bits, XOR, and randomness

**Prereqs:** [Modular arithmetic](modular-arithmetic.md)  
**Next:** [Probability (gentle)](probability-gentle.md)

**Learning goals.** XOR two bit-strings by hand, count Hamming weight and distance, and explain the difference between “looks random,” “fair coins,” and “independent” — with enough practice that the habits feel boring.

## Why this page exists

Phones and servers do not store letters as letters deep down — they store **bits**. Code-based cryptography treats messages and errors as lists of bits and mixes them with XOR. Lattice schemes also use bits and modular integers; XOR is still the first mixing operation to master.

If XOR is comfortable, half of later notation becomes readable.

## What is a bit?

A bit is a tiny switch:

- $0$ = off  
- $1$ = on  

A **bit-string** (also called a binary string) is a row of switches, like $10110$.  
Length = number of bits. Here length is $5$.

We often write the same object as a **vector**:

$$
\mathbf{v} = (1,0,1,1,0).
$$

Same information; two notations.

### Slow-motion: read a string aloud

$1101$ means:

| position | 1 | 2 | 3 | 4 |
|----------|---|---|---|---|
| bit | 1 | 1 | 0 | 1 |

Length $4$. Ones in positions 1, 2, and 4.

### Quick self-check

What is the length of $(0,1,1)$? How many ones?  
<details><summary>Answer</summary>
Length $3$; weight (ones) $=2$.
</details>

## XOR — the most important operation on this page

XOR is written $\oplus$. Rule:

| $a$ | $b$ | $a\oplus b$ | Memory trick |
|------|------|-------------|--------------|
| 0 | 0 | 0 | same → 0 |
| 0 | 1 | 1 | different → 1 |
| 1 | 0 | 1 | different → 1 |
| 1 | 1 | 0 | same → 0 |

**Picture:** think of $b$ as a flip-mask.  
Wherever $b$ has a $1$, flip that bit of $a$. Wherever $b$ has $0$, leave $a$ alone.

### Connection to mod 2

In $\mathbb{F}_2$, addition **is** XOR: $1+1=0$.  
So when later pages say “add vectors over $\mathbb{F}_2$,” they mean XOR, coordinate by coordinate.

### Tiny warm-ups

| $a$ | $b$ | $a\oplus b$ |
|------|------|-------------|
| $0$ | $0$ | $0$ |
| $1$ | $1$ | $0$ |
| $101$ | $001$ | $100$ |
| $111$ | $010$ | $101$ |

## Worked example — encrypt with a pad (toy)

Message $m = 1010$.  
Pad $p = 1100$ (pretend this is a shared secret).

| position | 1 | 2 | 3 | 4 |
|----------|---|---|---|---|
| $m$ | 1 | 0 | 1 | 0 |
| $p$ | 1 | 1 | 0 | 0 |
| $c=m\oplus p$ | 0 | 1 | 1 | 0 |

Ciphertext $c=0110$.

Decrypt with the same pad: $c\oplus p$:

| $c$ | 0 | 1 | 1 | 0 |
| $p$ | 1 | 1 | 0 | 0 |
| $m$ | 1 | 0 | 1 | 0 |

Recovered.  

**Why it works:** $c\oplus p = (m\oplus p)\oplus p = m\oplus (p\oplus p) = m\oplus 0 = m$,  
because $p\oplus p$ is all zeros (every bit flips twice).

If the pad is truly random, used once, and as long as the message (**one-time pad**), this is information-theoretically hiding. Real systems rarely ship huge one-time pads; they use shorter keys and hard problems. But XOR remains inside many designs.

### Another encrypt (you try after looking once)

$m=0110$, $p=1010$.  
<details><summary>Show ciphertext</summary>
$m\oplus p = 1100$.
</details>

## Hamming weight — counting the ones

The **Hamming weight** of a bit-string is the number of $1$s.

| string | weight |
|--------|--------|
| $0000$ | 0 |
| $1000$ | 1 |
| $1010$ | 2 |
| $1111$ | 4 |
| $110110$ | 4 |

**Sparse** means “low weight” — few ones.  
Code-based crypto loves sparse errors and sparse secret keys because they are structured enough to use, yet searching for an unknown sparse string can still be hard.

### Quick self-check

Weight of $100101$?  
<details><summary>Answer</summary>
$3$.
</details>

## Hamming distance — how different are two strings?

Distance between $\mathbf{x}$ and $\mathbf{y}$ = weight of $\mathbf{x}\oplus\mathbf{y}$  
= number of positions where they disagree.

Example: $1010$ vs $1110$:

$$
1010 \oplus 1110 = 0100 \quad \Rightarrow \quad \text{distance }1.
$$

### Second example (every step)

$x=0011$, $y=0101$:

| pos | $x$ | $y$ | disagree? |
|-----|-----|-----|-----------|
| 1 | 0 | 0 | no |
| 2 | 0 | 1 | yes |
| 3 | 1 | 0 | yes |
| 4 | 1 | 1 | no |

Distance $2$. Same as weight of $x\oplus y = 0110$.

## Randomness — three ideas people mix up

### 1. Fair (uniform) bit

$\Pr[b=1]=\tfrac12$. Like a fair coin.

### 2. Independent bits

Knowing some bits does not change the probabilities of the others.  
Fair *and* independent is the ideal “random string” model.

### 3. “Looks random to me”

Human intuition is bad at this. A string can look messy and still be badly biased or predictable by a computer.

### Dependence warning (seed for later papers)

Suppose two bits are **always equal**, each looking fair alone.  
Then $\Pr[b_1=1]=\tfrac12$, but they are **not** independent: knowing $b_1$ tells you $b_2$.

| $b_1$ | $b_2$ (forced equal) | fair alone? | independent? |
|-------|----------------------|-------------|--------------|
| 0 | 0 | yes (half the time 0) | no |
| 1 | 1 | yes (half the time 1) | no |

Later, research papers ask whether noise coordinates in real schemes can honestly be treated as independent. You only need the *idea* now.

## Bias

If $\Pr[b=1]=0.6$, the bit is **biased**.  
Even small bias can leak information if an attacker sees many samples.

**Toy:** a “coin” that lands heads $60\%$ of the time is not a fair random bit for crypto pads.

## Pseudo-randomness (preview)

A **PRG** stretches a short secret seed into a long string that *looks* random to efficient attackers. The algorithm can be public; the seed must stay secret. Details later.

## Slow-motion lab (do on paper)

1. Compute $111000 \oplus 101010$.  
2. Weight of your answer?  
3. Distance between $000111$ and $111000$?  
4. Invent two bits that are each fair but not independent.  
5. Encrypt $m=1001$ with pad $p=0110$; then decrypt.  

<details><summary>Answers</summary>

1. $010010$.  
2. Weight $2$.  
3. $000111\oplus 111000=111111$, weight $6$.  
4. Example: always equal; or always opposite ($b_2=1-b_1$).  
5. Ciphertext $1111$; decrypt recovers $1001$.

</details>

## Bridge to PQC

| Later topic | Bit connection |
|-------------|----------------|
| Linear codes | Codewords are special bit-strings closed under XOR |
| Syndrome decoding | Find a sparse $\mathbf{e}$ matching an equation |
| HQC / BIKE noise | Sparse polynomials → bitlists with structure |
| DFR | “Is the noise weight too big?” |
| Lattice / LWE track | Still uses random bits and modular “noise,” but on integers mod $q$ |

## Common confusions

- XOR is not English “or” (inclusive or).  
- Weight counts ones; it is not binary interpreted as an integer ($101$ as bits ≠ the number five for weight — weight of $101$ is $2$).  
- Independent ≠ “each looks fair.”  
- Random-looking ≠ cryptographically secure.  
- Distance is not “subtract the strings as numbers.”

## Big practice set

1. $1001 \oplus 0101=$?  
2. Weight of $1001$?  
3. True or false: if every bit is fair, the bits must be independent.  
4. Explain one-time pad in one sentence.  
5. Why might a cryptosystem want a *sparse* error?  
6. Distance between $1110$ and $1101$?  
7. True or false: $a\oplus a$ is always the all-zero string.  

<details><summary>Answers</summary>

1. $1100$.  
2. $2$.  
3. False.  
4. XOR message with a fresh truly random pad of equal length; ciphertext hides the message.  
5. So legitimate decoders can handle it / so the hard search problem is “find the sparse needle.”  
6. $1110\oplus 1101=0011$, distance $2$.  
7. True.

</details>

## Next steps

- [Probability (gentle)](probability-gentle.md) — language for “how often”  
- [Vectors and matrices](vectors-matrices.md) — organize bits into equations  
- Later: [Independence heuristics](../concepts/independence-heuristics.md)  
- Lattice fork (after more fundamentals): [Lattices (gentle)](lattices-gentle.md)  
