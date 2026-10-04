# Learning With Errors (LWE)

**Prereqs:** [Noisy linear equations (LWE story)](../bridge/noisy-linear-equations-lwe.md) · [Lattices (gentle)](../fundamentals/lattices-gentle.md) · [Vectors and matrices](../fundamentals/vectors-matrices.md)  
**Next:** [Module-LWE](module-lwe.md) · [KEM](kem.md) · Track: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md)  
**Tracks:** lattice-lwe

**Learning goals.** State search-LWE and decision-LWE in plain words, write sample equations by hand, and explain why small noise is essential — building on the bridge arithmetic you already did.

## Why this card exists

Papers say “LWE$_{n,q,\chi}$” without slowing down.  
You already computed tiny noisy equations on the [LWE story bridge](../bridge/noisy-linear-equations-lwe.md) and met lattices gently in [Lattices (gentle)](../fundamentals/lattices-gentle.md). This card **names** the problem, separates search vs decision slogans, and points to Module-LWE for ML-KEM-shaped schemes.

If anything feels sudden, redo the bridge toys first — then return here for vocabulary.

## Intuition — learning a secret from cloudy linear hints

**Search LWE (slogan):** recover a secret vector $\mathbf{s}\in\mathbb{Z}_q^n$ given many samples

$$
(\mathbf{a},\; b),\qquad b \equiv \langle \mathbf{a}, \mathbf{s}\rangle + e \pmod{q},
$$

where each $\mathbf{a}$ looks random mod $q$ and each noise $e$ is drawn from a distribution $\chi$ that prefers **small** values.

**Decision LWE (slogan):** tell apart genuine LWE samples from uniform random $(\mathbf{a},b)$ pairs.  
Many security proofs use the decision version; search and decision are closely related for typical parameter regimes (treat that as a research-level fact, not something to prove here).

| Version | You are asked to… |
|---------|-------------------|
| Search | Find the secret $\mathbf{s}$ |
| Decision | Distinguish LWE samples from uniform junk |

### Link back to lattices (one sentence)

Noisy modular linear equations of this shape connect to finding short / close vectors in related lattices — the gentle postcard is in [Lattices (gentle)](../fundamentals/lattices-gentle.md). You do not need the reduction details to continue.

## Worked examples (extend the bridge)

### Example A — scalar warm-up ($q=7$)

Secret $s=3$, sample $a=2$, noise $e=1$:

$$
b \equiv 2\cdot 3 + 1 = 7 \equiv 0 \pmod{7}.
$$

Published: $(a,b)=(2,0)$. Same arithmetic as the bridge — now you can call it “one LWE sample in dimension $1$.”

### Example B — vector secret ($q=5$, $n=2$)

Secret $\mathbf{s}=(1,2)$.  
Sample $\mathbf{a}=(2,1)$, $e=0$:

$$
b \equiv 2\cdot 1 + 1\cdot 2 = 4 \pmod{5}.
$$

Sample: $((2,1), 4)$.

Second sample $\mathbf{a}'=(1,1)$, $e=1$:

$$
b' \equiv 1\cdot 1 + 1\cdot 2 + 1 = 4 \pmod{5}.
$$

Attacker collects many such pairs and should not easily recover $\mathbf{s}$.

### Example C — why noise matters

If $e=0$ always, enough independent samples become ordinary linear algebra over $\mathbb{Z}_q$ — often solvable for $\mathbf{s}$.  
**Small noise** blocks clean elimination while still letting a legitimate party (who knows $\mathbf{s}$) cancel structure in a KEM. That tension reappears as correctness engineering in lattice KEMs.

### Mid-page self-check

With $q=5$, $\mathbf{s}=(1,0)$, $\mathbf{a}=(3,2)$, $e=1$, what is $b$?

<details><summary>Answer</summary>

$\langle\mathbf{a},\mathbf{s}\rangle=3\cdot 1 + 2\cdot 0=3$, then $b\equiv 3+1=4\pmod{5}$.

</details>

## Parameters (what the subscripts mean)

| Symbol | Role | Plain words |
|--------|------|-------------|
| $n$ | Dimension | Length of $\mathbf{s}$ |
| $q$ | Modulus | Clock size for wrap-around |
| $\chi$ | Noise law | Prefers small $e$ |

Larger $n$ and carefully chosen $q,\chi$ aim at higher attack cost. Exact security estimates are engineering + cryptanalysis — see [Security bits](../bridge/security-bits-and-work.md). This card does **not** invent concrete attack costs.

## Where it appears in PQC

- Public keys / ciphertexts in lattice KEMs are built from LWE-like samples.  
- ML-KEM uses a **module** variant (polynomial vectors) — [Module-LWE](module-lwe.md).  
- Hardware papers about NTT and modular multipliers implement the fast arithmetic under these schemes.

API vocabulary is shared with code-based KEMs: [KEM](kem.md).

## Common confusions

- Noise is small — not uniform on all of $\mathbb{Z}_q$.  
- LWE $\neq$ [syndrome decoding](syndrome-decoding.md) (codes), though both mix linear algebra with noise.  
- “Learning” means learning the secret from samples — not machine-learning hype.  
- Decision LWE is not “a different KEM API” — it is a hardness slogan used in proofs.  
- If this card feels sudden, redo the bridge worked toys before memorizing notation.

## Check yourself

1. Write the sample equation for search LWE in English.  
2. What goes wrong for attackers if $e=0$ always?  
3. Name one parameter besides the secret itself.  
4. Decision LWE asks you to distinguish samples from what?  

<details><summary>Answers</summary>

1. Each $b$ is roughly the dot product of $\mathbf{a}$ with secret $\mathbf{s}$, plus small noise, mod $q$.  
2. Exact linear algebra can recover $\mathbf{s}$.  
3. e.g. $n$, $q$, or the noise law $\chi$.  
4. Uniform random $(\mathbf{a},b)$ pairs.

</details>

## Big practice set

1. Compute $b$ for $q=11$, $\mathbf{s}=(2,3)$, $\mathbf{a}=(4,1)$, $e=-1$.  
2. True or false: bigger noise always makes KEMs more correct.  
3. In one sentence, how does this card relate to [lattices-gentle](../fundamentals/lattices-gentle.md)?  
4. Why does the curriculum send you to [Module-LWE](module-lwe.md) before ML-KEM details?  

<details><summary>Practice answers</summary>

1. $\langle\mathbf{a},\mathbf{s}\rangle=4\cdot 2 + 1\cdot 3=11\equiv 0$, then $b\equiv 0+(-1)\equiv 10\pmod{11}$.  
2. False — too much noise breaks legitimate recovery; designers balance hardness vs correctness.  
3. LWE-type noisy equations connect to short / close vector problems on related lattices (postcard-level).  
4. Real schemes package LWE as short vectors of polynomials for efficiency — Module-LWE is that packaging.

</details>

## Next steps

- [Module-LWE](module-lwe.md)  
- [KEM](kem.md) · [IND-CPA / CCA](ind-cpa-cca.md)  
- Track: [Lattice / LWE ROADMAP](../tracks/lattice-lwe/ROADMAP.md)  
- Bridge replay: [Noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
