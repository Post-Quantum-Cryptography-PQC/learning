# Syndrome decoding

**Prereqs:** [Decoding as a puzzle](../bridge/decoding-as-a-puzzle.md) · [Linear codes](linear-codes.md) · [Hard problems](../fundamentals/hard-problems.md)  
**Next:** [Information-set decoding](information-set-decoding.md) · [KEM](kem.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md)  
**Tracks:** code-based-kems

**Learning goals.** State the sparse decoding problem in words and math, finish a weight-1 search on a toy $H$ by hand, feel why candidate counts explode, and explain easy-for-owner vs hard-for-attacker.

## Why this card exists

“Security reduces to syndrome decoding” appears everywhere in code-based PQC. This card is the problem statement you should be able to recite.

The bridge [Decoding as a puzzle](../bridge/decoding-as-a-puzzle.md) already made you *feel* the search. Here we keep that intuition and lock in the vocabulary papers use.

## Intuition

**Given** public matrix $H$, syndrome $\mathbf{s}$, and weight bound $w$,  
**find** a bit-string $\mathbf{e}$ of weight $\le w$ such that

$$
H\mathbf{e}^\top = \mathbf{s}^\top.
$$

Without the weight limit, many $e$ may work. With sparsity, the needle can be unique — but finding it among $\sum_{i\le w}\binom{n}{i}$ candidates is believed hard for random-looking $H$.

### Say it as a wanted poster

> Wanted: sparse $e$ (≤ $w$ ones) whose fingerprint under $H$ is exactly $s$.

Where does $s$ come from? If a legitimate codeword $c$ satisfies $Hc^\top=0$ and you receive $y=c\oplus e$, then

$$
Hy^\top = He^\top = s.
$$

So the syndrome is a fingerprint of the **error**, not of the message. That is why papers talk about “decoding from syndromes.” Refresh $H$ and syndromes on [Generator and parity-check](../bridge/generator-and-parity-check.md) or [Linear codes](linear-codes.md) if this step is fuzzy.

## Formal definition (informal SD)

**Syndrome Decoding:** inputs $(H,\mathbf{s},w)$; output sparse $\mathbf{e}$ with $He^\top=s$ and $\|\mathbf{e}\|\le w$ (Hamming weight).

**Information-set decoding (ISD)** is a family of classical attacks smarter than pure brute force — see the dedicated card [Information-set decoding](information-set-decoding.md). Parameter selection aims to make even the best ISD cost estimates infeasible (see [Security bits and attack work](../bridge/security-bits-and-work.md)).

## Worked example — exhaustive weight-1 search

$$
H=\begin{pmatrix}1&1&0&0\\0&1&1&0\end{pmatrix},\quad s=(1,0),\quad w=1.
$$

All weight-$\le 1$ candidates:

| $e$ | $He^\top$ (slow) | match $s$? |
|-----|------------------|------------|
| $0000$ | $(0,0)$ | no |
| $1000$ | first column → $(1,0)$ | **yes** |
| $0100$ | $(1,1)$ | no |
| $0010$ | $(0,1)$ | no |
| $0001$ | $(0,0)$ | no |

Answer $e=(1,0,0,0)$. Done.

**How $(1,0)$ appeared:** only the first column of $H$ is added — that column is $(1,0)^\top$.

### Mid-page self-check

Same $H$, now $s=(1,1)$, $w=1$. Which $e$ works?  
<details><summary>Answer</summary>
$e=(0,1,0,0)$ — the second column of $H$ is $(1,1)^\top$.
</details>

## Why the haystack explodes

Number of weight-exactly-$w$ bitstrings of length $n$ is $\binom{n}{w}$.

| $n$ | $w$ | $\binom{n}{w}$ (order of magnitude) |
|-----|-----|--------------------------------------|
| $4$ | $1$ | $4$ |
| $10$ | $2$ | $45$ |
| $100$ | $2$ | $4950$ |
| $1000$ | $50$ | astronomically huge |

At cryptographic sizes you cannot try all sparse patterns by hand — that explosion is the hardness intuition. Attackers use smarter methods (ISD), but the design goal is still: even the best known classical attacks stay infeasible.

### Quick self-check

Is brute force of all weight-$2$ errors for $n=100$ realistic *by hand*?  
<details><summary>Answer</summary>
No — about $4950$ candidates; fine for a computer, tedious by hand. Crypto parameters are far harder.
</details>

## Easy vs hard

| Who | What they see | Difficulty |
|-----|---------------|------------|
| Secret-key owner | Structured code + trapdoor decoder | Designed to be easy |
| Attacker | Public scrambled / random-looking $H$ | Aimed to be hard |

Public-key encryption packages that asymmetry. Details vary by scheme (McEliece, Niederreiter, HQC, BIKE, …), but the **easy-vs-hard decoding gap** is the shared plot — story version: [McEliece in plain words](../bridge/mceliece-in-plain-words.md).

## Where it appears in PQC

Niederreiter / McEliece turn ciphertext into a decoding instance.  
HQC, BIKE, Classic McEliece all live in the shadow of decoding-like hardness, with different public structures.

| Scheme flavor | Typical public object | Decoding role |
|---------------|----------------------|---------------|
| Classic McEliece / Niederreiter | Scrambled parity-check / generator | Core hardness |
| HQC / BIKE | Quasi-cyclic structured matrices | Decoding + structure tradeoffs |

## Common confusions

- Hard for *random-looking* public instances — not hard if you know the secret structure.  
- Quasi-cyclic structure shrinks keys but must not create a shortcut attack — see [Quasi-cyclic codes](quasi-cyclic-codes.md).  
- Side channels can steal keys without solving SD.  
- “NP-hard” slogans are asymptotic complexity language — concrete parameter estimates still matter ([Security bits](../bridge/security-bits-and-work.md)).  
- “Decoding is hard” does **not** mean the legitimate owner cannot decrypt.

## Check yourself

1. Why require low weight $w$?  
2. Name one attack family used to estimate SD hardness.  
3. Does “decoding is hard” mean the owner cannot decrypt?  
4. If $y=c\oplus e$ and $Hc^\top=0$, what is $Hy^\top$?  
5. Roughly how many weight-$2$ vectors of length $100$ are there?  

<details><summary>Answers</summary>

1. To make the solution sparse/meaningful (often unique) and define the search problem.  
2. Information-set decoding (ISD).  
3. No — the owner has a trapdoor / structured decoder.  
4. $He^\top=s$ (the syndrome of the error).  
5. About $4950$ ($\binom{100}{2}$).

</details>

## Big practice set

1. For the toy $H$ above and $s=(0,1)$, $w=1$, find $e$.  
2. True or false: without a weight bound, $He^\top=s$ usually has many solutions.  
3. In one sentence, what does an attacker try to recover from $(H,s,w)$?  
4. Why might designers still care about ISD even if brute force is clearly impossible?  

<details><summary>Answers</summary>

1. $e=(0,0,1,0)$ — third column is $(0,1)^\top$.  
2. True (the equation is underdetermined in the usual setup).  
3. A sparse error $e$ of weight $\le w$ with $He^\top=s$.  
4. Because ISD is much smarter than brute force; parameters must defeat *best known* attacks, not only naive search.

</details>

## Next steps

- [Information-set decoding](information-set-decoding.md)  
- [KEM](kem.md)  
- [Quasi-cyclic codes](quasi-cyclic-codes.md)  
- [DFR](dfr.md)  
- Bridge: [Decoding as a puzzle](../bridge/decoding-as-a-puzzle.md)  
- Work story: [Security bits and attack work](../bridge/security-bits-and-work.md)  
