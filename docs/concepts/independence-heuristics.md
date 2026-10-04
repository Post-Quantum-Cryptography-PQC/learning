# Independence heuristics

**Prereqs:** [Bits, XOR](../fundamentals/bits-xor-randomness.md) · [Probability](../fundamentals/probability-gentle.md) · [DFR](dfr.md)  
**Next:** [KL divergence](kl-divergence.md) · Paper: [2025/018](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain what an independence heuristic claims, give a two-bit counterexample to “fair margins ⇒ independent,” separate $P$ from the product-of-marginals $Q$, and state clearly that dependence is not an automatic key-recovery break.

## Why this card exists

[DFR](dfr.md) arguments often pretend noise coordinates are independent so tails are easy (Chernoff / Hoeffding-style bounds). Research asks: when is that pretend move information-theoretically OK? This card is the vocabulary sheet before [KL divergence](kl-divergence.md) and the [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md).

## Intuition — the convenient pretend move

A heuristic says: “treat these random bits / noise coordinates as **independent** with the right one-bit probabilities.”

That makes product distributions and Chernoff-style bounds convenient when bounding $\Pr[\text{weight too large}]$.

Sometimes coordinates **look** fair alone but are **dependent** because they share underlying randomness (for example overlapping supports in a sparse polynomial product). Then the true joint law $P$ is **not** the product $Q$ of its marginals — even if every single coordinate has the “right” bias.

**Seed from fundamentals:** “each looks fair” ≠ independent ([Bits, XOR](../fundamentals/bits-xor-randomness.md)).

| Claim | Strength |
|-------|----------|
| Each coordinate has bias $p$ | About **marginals** |
| Coordinates are independent | About the **joint** law |
| Weight $\|e\|$ concentrates | About a **scalar** summary — can hold even under dependence |

### Quick self-check

If two bits each have $\Pr[b_i=1]=\tfrac12$, must they be independent?  
<details><summary>Answer</summary>
No. Marginals can be fair while the joint is tightly coupled (always equal, always opposite, …).
</details>

## Formal definition (light)

- $P$ = true joint law of the noise vector (or relevant coordinates).  
- $Q$ = product of the one-dimensional marginals of $P$.  

If $P\neq Q$, **independence fails**.  
Distances such as KL divergence $D(P\|Q)$ and total variation (statistical) distance measure how badly $Q$ models $P$ — that is the next card.

$$
Q(x_1,\ldots,x_n)=\prod_{i=1}^n P_i(x_i)
\quad\text{where }P_i\text{ is the }i\text{-th marginal of }P.
$$

Independence heuristic (slogan): “pretend the noise is drawn from $Q$ even if nature uses $P$.”

## Worked counterexample — fair but glued

Two bits always equal, each marginally fair:

| Outcome $(b_1,b_2)$ | True $P$ | Independent $Q$ |
|---------------------|----------|-----------------|
| $(0,0)$ | $1/2$ | $1/4$ |
| $(0,1)$ | $0$ | $1/4$ |
| $(1,0)$ | $0$ | $1/4$ |
| $(1,1)$ | $1/2$ | $1/4$ |

Marginals: $\Pr[b_1=1]=\tfrac12$, $\Pr[b_2=1]=\tfrac12$.  
But $\Pr[b_1=1,b_2=0]=0\neq\tfrac14$. Independence fails even though each bit “looks fine.”

### Always-opposite cousin

Same lesson with $b_2=1-b_1$: fair margins, zero probability on $(0,0)$ and $(1,1)$ under $P$, while $Q$ still puts $1/4$ on each corner.

### Quick self-check

In the always-equal table, is $P=Q$?  
<details><summary>Answer</summary>
No — several cells disagree ($0$ vs $1/4$, $1/2$ vs $1/4$).
</details>

## Why DFR analyses still might (or might not) be OK

Dependence does **not** automatically mean DFR is large. Weight can concentrate even when coordinates are dependent — but then the proof must use a tool that does not secretly assume independence.

| Situation | What you should think |
|-----------|------------------------|
| $P=Q$ | Independence model matches reality |
| $P\neq Q$ but weight concentrates | DFR might still be fine — needs a better argument |
| $P\neq Q$ and analysis only bound $Q$’s tails | Gap: you bounded the wrong distribution |
| Modeling gap found in a paper | Audit of assumptions — **not** by itself a key-recovery attack |

Some structures that break independence also make related worst-case decoding easy — important for reduction dreams. Label heuristics honestly.

## Where it appears in PQC

- HQC-style modelling of quasi-cyclic Bernoulli / sparse polynomial products.  
- Related lessons from lattice / FHE independence heuristics (same moral: convenient ≠ free).  
- ePrint 2025/018 turns the code-based claim into precise KL / TV statements for structured cases — pedagogic reading path, not an invented break of HQC.

| Next vocabulary | Role |
|-----------------|------|
| [KL divergence](kl-divergence.md) | Measure how far $P$ is from $Q$ |
| [Quasi-cyclic codes](quasi-cyclic-codes.md) | Structure behind many of these products |
| [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) | Research-shaped audit of the heuristic |

## Common confusions

| Confusion | Clearer picture |
|-----------|-----------------|
| Dependence ⇒ scheme insecure | No — modeling issue first. |
| Weight concentration ⇒ independence | No — concentration is weaker. |
| “Heuristic” = theorem | Heuristic means convenient assumption — say so. |
| Large KL ⇒ key recovery | No — see [KL](kl-divergence.md); more work needed for an attack. |

## Check yourself

1. What does the independence heuristic assume?  
2. Give a fair-but-dependent pair of bits.  
3. Does dependence automatically break HQC?  
4. What are $P$ and $Q$ in one short phrase each?  
5. True or false: bounding tails under $Q$ always bounds tails under $P$.  

<details><summary>Answers</summary>

1. Noise coordinates behave as independent with matching marginals.  
2. Always equal (or always opposite).  
3. No — 2025/018-style work audits modeling; it does not equal a key-recovery break.  
4. $P$: true joint; $Q$: product of $P$’s marginals (independent idealization).  
5. False — that is exactly when the heuristic can mislead.

</details>

## Big practice set

1. Fill in: “Independence is about the ___; bias of one bit is about a ___.”  
2. In the always-equal example, compute $\Pr_P[b_1\neq b_2]$ and $\Pr_Q[b_1\neq b_2]$.  
3. Name the next card that defines $D(P\|Q)$.  

<details><summary>Answers</summary>

1. Joint law; marginal.  
2. Under $P$: $0$. Under $Q$: $1/2$ (the two disagreeing corners).  
3. [KL divergence](kl-divergence.md).

</details>

## Next steps

- [KL divergence](kl-divergence.md) — how to *measure* the gap  
- [Quasi-cyclic codes](quasi-cyclic-codes.md)  
- Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
- Revisit: [DFR](dfr.md)  
