# Probability (gentle)

**Prereqs:** [Bits, XOR, and randomness](bits-xor-randomness.md)  
**Next:** [What is a hard problem?](hard-problems.md)

**Learning goals.** Use probability in ordinary sentences, compute tiny coin-flip examples by counting, understand average number of ones in a random string, and meet the idea of a rare failure event — without calculus.

## Why this page exists

Later you will see sentences like “decryption fails with probability at most $2^{-128}$.”  
That is ordinary probability in fancy clothes. This page builds the clothes from counting and fractions — with lots of wording.

You do **not** need calculus. You need patience with fractions.

**Study tip:** every time you see $\Pr[\ldots]$, say “how often …” out loud.

## Probability in one sentence

$\Pr[A]$ is “how often $A$ happens” in an idealized repeat of a random experiment, written as a number from $0$ to $1$ (or $0\%$ to $100\%$).

Examples:

- Fair coin: $\Pr[\text{Heads}]=\tfrac12$.  
- Never: $\Pr[\text{roll a 7 on a standard die}]=0$.  
- Always: $\Pr[\text{bit is 0 or 1}]=1$ for a single bit.

### Counting picture (fair coin twice)

Possible outcomes, all equally likely: HH, HT, TH, TT.  
Four outcomes total.

$\Pr[\text{exactly one Heads}] = \Pr[\text{HT or TH}] = 2/4 = \tfrac12$.

**Recipe:** count favorable outcomes ÷ count all equally likely outcomes (when that model fits).

### Quick self-check

Fair coin three times. How many outcomes total?  
<details><summary>Answer</summary>
$2^3=8$ (HHH, HHT, HTH, THH, HTT, THT, TTH, TTT).
</details>

## Independent events (plain English)

Two events are **independent** if knowing one does not change the chances of the other.

Fair coins flipped separately: 

$$
\Pr[\text{first Heads and second Heads}]=\tfrac12\cdot\tfrac12=\tfrac14.
$$

**Picture:** first coin does not whisper to the second coin.

### Dependent events (also plain English)

Suppose you have one fair bit $b_1$, and you **set** $b_2=b_1$.  
Then each bit alone is fair, but they are dependent:

$$
\Pr[b_1=1]=\tfrac12, \quad \Pr[b_1=1\text{ and }b_2=0]=0.
$$

If they were independent, that joint probability would be $\tfrac14$.  
**Moral:** “each looks fair” is weaker than “independent.”

### Table — equal bits (dependent)

| outcome $(b_1,b_2)$ | probability if always equal | if independent fair |
|---------------------|-----------------------------|------------------------|
| $(0,0)$ | $1/2$ | $1/4$ |
| $(0,1)$ | $0$ | $1/4$ |
| $(1,0)$ | $0$ | $1/4$ |
| $(1,1)$ | $1/2$ | $1/4$ |

Same “fair looking” margins; different joints.

## Bernoulli bits

A **Bernoulli** bit is $1$ with probability $p$ and $0$ with probability $1-p$.  
Fair coin = Bernoulli with $p=\tfrac12$.  
Biased coin example: $p=\tfrac14$ means ones are rarer.

**Crypto noise** is often “mostly zeros, rare ones” — Bernoulli with small $p$, or a related sparse model.

### Tiny biased example

One bit with $p=\tfrac14$:

| value | probability |
|-------|-------------|
| 0 | $3/4$ |
| 1 | $1/4$ |

## Weight as a random count

Flip $n$ fair independent bits. Let $W$ be the number of ones (Hamming weight).

**Average (expectation):**

$$
\mathbb{E}[W] = n\cdot \tfrac12 = \frac{n}{2}.
$$

Read: “On average you get half ones.”  
Expectation is an average over many imaginary repeats — not a promise about one sample.

### Tiny exact calculation ($n=3$ fair bits)

All $8$ strings equally likely:

| string | $W$ |
|--------|-----|
| 000 | 0 |
| 001, 010, 100 | 1 |
| 011, 101, 110 | 2 |
| 111 | 3 |

| $W$ | how many strings | probability |
|-----|------------------|-------------|
| 0 | 1 | $1/8$ |
| 1 | 3 | $3/8$ |
| 2 | 3 | $3/8$ |
| 3 | 1 | $1/8$ |

Average: $0\cdot\tfrac18+1\cdot\tfrac38+2\cdot\tfrac38+3\cdot\tfrac18=\tfrac{12}{8}=1.5=\tfrac{3}{2}$. Matches $n/2$.

### Another exact calculation ($n=2$)

| $W$ | strings | $\Pr$ |
|-----|---------|-------|
| 0 | 00 | $1/4$ |
| 1 | 01, 10 | $1/2$ |
| 2 | 11 | $1/4$ |

$\mathbb{E}[W]=0\cdot\tfrac14+1\cdot\tfrac12+2\cdot\tfrac14=1$.

## Rare events and “failure rate” toys

Suppose a toy decoder succeeds only if $W\le 1$ for $n=3$ fair bits.  
It fails when $W\ge 2$:

$$
\Pr[W\ge 2]=\tfrac38+\tfrac18=\tfrac12.
$$

Failure half the time — terrible for crypto, fine for learning.

Now imagine a much longer string and a decoder that fails only if weight is huge. Designers want failure probabilities like $2^{-64}$ or $2^{-128}$ — so small we treat them as negligible for practical purposes. That is the spirit of **decryption failure rate (DFR)** you will meet later.

### Powers of two (reading aid)

| value | rough feel |
|-------|------------|
| $2^{-1}=\tfrac12$ | half |
| $2^{-10}\approx 1/1000$ | rare |
| $2^{-20}\approx 1/\text{million}$ | very rare |
| $2^{-40}$ | absurdly rare for everyday life |
| $2^{-128}$ | astronomically rare (crypto budget talk) |

### Slow-motion: $n=4$, fail if $W=4$

Only one string $1111$ out of $16$.  
$\Pr[W=4]=1/16$.  
Still not tiny — crypto needs far smaller failure rates, hence longer codes / careful design.

## Concentration (informal, no theorems yet)

If you flip many independent fair bits, $W$ is *usually* near its average.  
Wild outcomes still possible, just uncommon.  

**Picture:** flip $100$ fair coins. Getting about $50$ heads is normal. Getting $100$ heads is possible but extremely rare.

Crypto proofs sometimes need careful bounds on those tails. For now: “usually near average” is enough intuition.

## Union bound (optional tool)

$\Pr[A\text{ or }B]\le \Pr[A]+\Pr[B]$.  
Sometimes loose, always easy. Appears in security arguments.

**Toy:** if $\Pr[A]=\Pr[B]=\tfrac1{10}$, then $\Pr[A\text{ or }B]\le \tfrac15$.  
The true value might be smaller if $A$ and $B$ overlap — the bound does not care.

## Bridge to PQC

| Phrase in papers | Your translation |
|------------------|------------------|
| DFR | How often honest decryption fails |
| Bernoulli noise | Bits that are 1 with probability $p$ |
| Independence heuristic | “Pretend coordinates are independent so tails are easy” |
| Negligible probability | So small we ignore it for the argument |
| LWE noise | Small random integers (not always bits) — same “noise is usually small” spirit |

Remember: dependent noise can still have concentrated weight. “Independence fails” $\neq$ “scheme broken.”

## Common confusions

- Expectation is an average, not “what must happen this time.”  
- Independent is stronger than identical fair margins.  
- $2^{-128}$ is not zero — it is “ignore for practical security budgets.”  
- Heuristic probability models need honesty about assumptions.  
- “Rare” in everyday life ≠ “negligible” in crypto (crypto is stricter).

## Big practice set

1. Fair coin twice, independent: $\Pr[\text{HT}]$?  
2. For 4 fair independent bits, $\mathbb{E}[W]$?  
3. For 4 fair independent bits, $\Pr[W=0]$?  
4. Give an example of dependent fair bits.  
5. In one sentence, what is a toy DFR measuring?  
6. For $n=3$ fair bits, $\Pr[W=1]$?  
7. True or false: if $\mathbb{E}[W]=5$, then $W$ is always $5$.  

<details><summary>Answers</summary>

1. $\tfrac14$.  
2. $2$.  
3. $1/16$.  
4. Always equal (or always opposite).  
5. How often the decoder/decryption fails in the model.  
6. $3/8$.  
7. False.

</details>

## Check yourself (quick)

1. Range of a probability?  
2. If $\mathbb{E}[W]=10$, must $W=10$ always?  
3. Does “each bit fair” imply independence?  
4. Rough feel of $2^{-10}$?  

<details><summary>Answers</summary>

1. $0$ to $1$.  
2. No.  
3. No.  
4. About one in a thousand.

</details>

## Next steps

- [What is a hard problem?](hard-problems.md)  
- Later concepts: [DFR](../concepts/dfr.md) · [Independence heuristics](../concepts/independence-heuristics.md)  
- Optional bridge: [Noisy channel story](../bridge/noisy-channel-story.md)  
- Lattice fork: [Lattices (gentle)](lattices-gentle.md) after vectors  
