# Noisy linear equations (LWE story)

**Prereqs:** [Lattices (gentle)](../fundamentals/lattices-gentle.md) · [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md) · [Probability](../fundamentals/probability-gentle.md)  
**Next:** Concept: [LWE](../concepts/lwe.md) · [Module-LWE](../concepts/module-lwe.md) · Track: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md)

**Learning goals.** Write a tiny noisy modular equation by hand, see why many such equations with a short secret form a puzzle, and connect the story to lattices without needing a formal LWE definition yet (that waits for the concept card).

## Why this page exists

Lattice KEMs are usually explained as “LWE” — Learning With Errors.  
In English: **learning a secret from noisy linear equations**.

This bridge is the story and the tiny arithmetic. The compact definition lives in [LWE](../concepts/lwe.md).

## Story first — secret number with noisy hints

Alice picks a secret number $s$ mod $q$ (think: a locked combination on a big clock).  
She publishes pairs $(a, b)$ where

$$
b \equiv a\cdot s + e \pmod{q},
$$

and $e$ is a **small** noise (often $-1,0,1$ or similar).

- If you know $s$, checking a hint is easy.  
- If you do not know $s$, each hint is a cloudy clue.  
- Many hints still should not reveal $s$ easily — that is the hardness hope.

### Fully worked toy ($q=7$, one hint)

Secret $s=3$.  
Sample $a=2$, noise $e=1$:

$$
b \equiv 2\cdot 3 + 1 = 7 \equiv 0 \pmod{7}.
$$

Published hint: $(a,b)=(2,0)$.  
An attacker sees $(2,0)$ and must somehow recover $s$ among $\{0,1,\ldots,6\}$ with noise muddying the equation.

One hint is not enough to pin $s$ uniquely (try $s=3$ and $s=10$ wait — mod 7 secrets are only $0..6$).  
Try $s'=3$: $2\cdot 3=6$, need $e=1$ to reach $0$ because $6+1=7\equiv 0$. Good.  
Try $s'=6$: $2\cdot 6=12\equiv 5$, need $e\equiv -5\equiv 2\pmod{7}$ to reach $0$ — noise $2$ may be “too big” if we only allow tiny $e$.  
**Moral:** small-noise constraint is what makes the puzzle structured.

## Many equations (vector secret)

In real LWE, the secret is a **vector** $\mathbf{s}$ of several numbers mod $q$.  
Each sample looks like:

$$
b \equiv \langle \mathbf{a}, \mathbf{s}\rangle + e \pmod{q},
$$

where $\langle \mathbf{a}, \mathbf{s}\rangle$ is the dot product (sum of $a_i s_i$), then wrap mod $q$, then add small $e$.

### Tiny vector example ($q=5$, length 2)

Secret $\mathbf{s}=(1,2)$.  
Sample $\mathbf{a}=(2,1)$, noise $e=0$:

$$
\langle \mathbf{a},\mathbf{s}\rangle = 2\cdot 1 + 1\cdot 2 = 4, \qquad b\equiv 4\pmod{5}.
$$

Published: $\mathbf{a}=(2,1)$, $b=4$.

Another sample $\mathbf{a}'=(1,1)$, $e=1$:

$$
1\cdot 1 + 1\cdot 2 + 1 = 4, \qquad b'\equiv 4\pmod{5}.
$$

Attacker gets many $(\mathbf{a},b)$ pairs and should not easily recover $\mathbf{s}$.

### Quick self-check

With $q=5$, $\mathbf{s}=(1,0)$, $\mathbf{a}=(3,2)$, $e=1$, what is $b$?  
<details><summary>Answer</summary>
$\langle a,s\rangle=3\cdot 1 + 2\cdot 0=3$, then $b\equiv 3+1=4\pmod{5}$.
</details>

## Why “learning with errors”?

Without noise ($e=0$), enough equations become ordinary linear algebra — often solvable.  
**Noise** blocks clean Gaussian elimination.  
The secret stays hidden if noise is large enough to spoil algebra but small enough for the legitimate party (who knows $\mathbf{s}$) to still recover shared values in a KEM.

That tension — noise too small vs too large — reappears as correctness / DFR-style worries in lattice KEMs, analogous in spirit to code-based decryption failure (different math).

## Link back to lattices (postcard)

Noisy linear equations of this shape are closely related to finding short / close vectors in certain lattices.  
You do not need the reduction details to continue. Hold the slogan:

> LWE ≈ “solve for a short secret given noisy modular linear equations.”

## Where KEMs use this

A lattice KEM roughly:

1. Public key encodes LWE-like samples.  
2. Encapsulation mixes fresh noise to make a ciphertext.  
3. Decapsulation uses the secret to cancel structure and recover a shared key — if noise stays in range.

API-level KEM vocabulary is shared: [KEM](../concepts/kem.md).  
Noise packaging for ML-KEM uses Module-LWE: [Module-LWE](../concepts/module-lwe.md).

## Bridge to PQC

| Page | Role |
|------|------|
| [LWE](../concepts/lwe.md) | Compact definition + decision vs search slogans |
| [Module-LWE](../concepts/module-lwe.md) | Polynomial / module packaging used by ML-KEM |
| [Security bits](security-bits-and-work.md) | Attack-cost language (shared) |
| Hardware NTT / modmul papers | Fast $+$ / $\times$ mod $q$ implementations |

## Common confusions

- Noise $e$ is small **on purpose** — not “any random mod $q$.”  
- Dot product is mod $q$ after summing (or reduce along the way).  
- LWE is not the same problem as syndrome decoding (codes), though both are “linear + noise.”  
- One sample rarely determines the secret; security talks about many samples and high dimension.

## Check yourself

1. In English, what does an LWE sample $(a,b)$ claim about $s$?  
2. Why does zero noise make life easier for an attacker?  
3. Compute $b$ for $q=7$, $s=5$, $a=3$, $e=-1$.  
4. True or false: lattice KEMs usually publish the secret $\mathbf{s}$.  

<details><summary>Answers</summary>

1. Roughly $b \approx a\cdot s$ mod $q$, up to small noise.  
2. Exact linear equations can be solved by linear algebra.  
3. $3\cdot 5 + (-1)=15-1=14\equiv 0\pmod{7}$.  
4. False — secret stays private; public key is noisy samples / related data.

</details>

## Next steps

- Concept: [LWE](../concepts/lwe.md)  
- Concept: [Module-LWE](../concepts/module-lwe.md)  
- Track: [Lattice / LWE ROADMAP](../tracks/lattice-lwe/ROADMAP.md)  
- Shared: [KEM](../concepts/kem.md) · [IND-CPA / CCA](../concepts/ind-cpa-cca.md)  
