# KL divergence (gentle)

**Prereqs:** [Independence heuristics](independence-heuristics.md) · [Probability](../fundamentals/probability-gentle.md)  
**Next:** Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) · [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml) · [DFR](dfr.md)  
**Tracks:** code-based-kems

**Learning goals.** Read $D(P\|Q)$ as “how badly $Q$ models $P$,” compute a tiny discrete example by hand, connect the independence case to an entropy gap, and know that large KL is about distributions — not an automatic attack.

## Symbols on this page

| Symbol | English |
|--------|---------|
| $P$ | True distribution (reality) |
| $Q$ | Reference / model distribution (often “independent pretend”) |
| $D(P\|Q)$ | KL divergence — penalty for using $Q$ when truth is $P$ |
| $H(P)$ | Entropy of $P$ (uncertainty; appears in the independence special case) |
| $\Theta(\cdot)$ | Growth-rate slogan in asymptotics (order of magnitude) |

## Why this card exists

When a paper says “the KL divergence to the product-Bernoulli idealization is $\Theta(n\cdot 2^{-2\omega})$,” you need a gentle meaning of KL before diving into the [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md). This card follows [independence heuristics](independence-heuristics.md): there $P$ was reality and $Q$ the independent pretend model; here we measure the gap.

## Intuition — a score for “bad model”

**Kullback–Leibler (KL) divergence** $D(P\|Q)$ measures how different distribution $P$ is from a reference model $Q$, in information units (bits or nats depending on the log base).

Use it to say: “the independence model $Q$ is a bad description of reality $P$.”

It is **not** a symmetric distance: $D(P\|Q)$ need not equal $D(Q\|P)$. Think “penalty for coding samples from $P$ as if they came from $Q$,” not “Euclidean length between two points.”

| Symbol | Role in independence audits |
|--------|------------------------------|
| $P$ | True joint law of noise (or relevant bits) |
| $Q$ | Product of $P$’s marginals (independent idealization) |
| $D(P\|Q)$ | How badly that idealization fits |

### Quick self-check

If $P=Q$, what is $D(P\|Q)$?  
<details><summary>Answer</summary>
Zero (when the divergence is defined). Perfect match ⇒ no penalty.
</details>

## Formal definition

For discrete laws (when defined — need $Q(x)>0$ whenever $P(x)>0$),

$$
D(P\|Q)=\sum_x P(x)\log\frac{P(x)}{Q(x)}.
$$

**Special case used in independence audits:** if $Q$ is the product of $P$’s marginals, then under mild conditions

$$
D(P\|Q)=H(Q)-H(P),
$$

an **entropy gap** — dependence reduces entropy below the independent ideal. Here $H$ denotes Shannon entropy (same log base as in the KL sum).

**Pinsker / reverse-Pinsker (postcard):** inequalities relate KL to total variation (statistical) distance. Reverse forms need extra assumptions — used carefully in 2025/018-style arguments. You do not need the full inequality list to read this curriculum card.

## Tiny worked examples

### Example A — identical laws

If $P=Q$, every term has $\log 1=0$, so $D=0$.

### Example B — point mass vs uniform

$P$ puts mass $1$ on one point; $Q$ is uniform on $N$ points. Then

$$
D(P\|Q)=\log N
$$

(up to log-base convention). $Q$ is a terrible model for a deterministic $P$ when $N$ is large.

### Example C — always-equal bits (from the independence card)

Recall $P$: always $b_1=b_2$, fair; $Q$: independent fair bits.

On the support of $P$, the outcomes are $(0,0)$ and $(1,1)$ with probability $1/2$ each, and

$$
\frac{P(0,0)}{Q(0,0)}=\frac{1/2}{1/4}=2,\qquad
\frac{P(1,1)}{Q(1,1)}=2.
$$

So

$$
D(P\|Q)=\tfrac12\log 2+\tfrac12\log 2=\log 2
$$

(one bit of divergence if $\log=\log_2$). The independent model is wrong by a clear, computable gap — even though each bit looked fair.

### Quick self-check

Is $D(P\|Q)$ always equal to $D(Q\|P)$?  
<details><summary>Answer</summary>
No. KL is directed; swap $P$ and $Q$ and you generally get a different number (and $D(Q\|P)$ may even be infinite if supports disagree).
</details>

## How papers use the language (without inventing attacks)

A statement like “$D(P\|Q)=\Theta(n\cdot 2^{-2\omega})$” is a **distribution** claim: as parameters grow, the independence idealization drifts from $P$ at that asymptotic scale.

What it does **not** automatically say:

- that a concrete KEM is broken,  
- that DFR is large,  
- that an attacker has a key-recovery algorithm.

Turning a modeling gap into an attack needs more work. Small KL suggests closeness; it is not by itself a security proof either. At first reading, asymptotics $\Theta(\cdot)$ matter more than the log-base constant.

| Reading | OK takeaway | Overreach |
|---------|-------------|-----------|
| Large $D(P\|Q)$ | $Q$ is a poor model for $P$ | “Therefore the KEM falls” |
| Small $D(P\|Q)$ | Idealization is close as a distribution | “Therefore the scheme is secure” |
| Entropy gap form | Dependence costs entropy vs $Q$ | “Entropy gap = stolen key bits” |

## Where it appears in PQC

Exact KL for invertible sparse polynomial products vs product-Bernoulli noise in quasi-cyclic settings — see the analysis route in the [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md). This lab’s pedagogy stops at “what KL means” and “dependence ≠ break”; the paper digests the structured calculation.

| Link | Why |
|------|-----|
| [Independence heuristics](independence-heuristics.md) | Defines $P$ vs $Q$ |
| [DFR](dfr.md) | Why people wanted independence for tails |
| [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) | Research-shaped KL / TV statements |
| [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml) | Open research edges (not pedagogy holes) |

## Common confusions

| Confusion | Clearer picture |
|-----------|-----------------|
| $D=0$ always means “secure” | $D=0$ means $P=Q$ (when defined) — a modeling statement. |
| Large KL = key recovery | Modeling gap ≠ attack by itself. |
| Small KL = security proof | Closeness of distributions is not a full KEM proof. |
| Symmetric distance | KL is directed; use TV if you need a metric slogan. |

## Check yourself

1. In one sentence, what is $D(P\|Q)$ measuring?  
2. If $Q$ is the independent model for $P$, what does a large $D(P\|Q)$ mean?  
3. Does large KL automatically break a KEM?  
4. In the always-equal example with $\log_2$, what is $D(P\|Q)$?  
5. What entropy identity links $D(P\|Q)$ to $H(Q)-H(P)$ in the independence case?  

<details><summary>Answers</summary>

1. How poorly $Q$ describes $P$ (information divergence).  
2. Independence is a bad description of the true joint law.  
3. No — modeling gap ≠ key recovery by itself.  
4. $1$ bit ($\log_2 2$).  
5. When $Q$ is the product of $P$’s marginals, under mild conditions $D(P\|Q)=H(Q)-H(P)$.

</details>

## Big practice set

1. Write the discrete KL sum from memory, then check against the formula above.  
2. True or false: if coordinates are dependent, $D(P\|Q)$ must be infinite.  
3. Point to the card that introduced the always-equal counterexample before KL.  

<details><summary>Answers</summary>

1. $D(P\|Q)=\sum_x P(x)\log\bigl(P(x)/Q(x)\bigr)$.  
2. False — the always-equal example has finite $D=\log 2$. Infinity appears when $P$ puts mass where $Q$ is zero.  
3. [Independence heuristics](independence-heuristics.md).

</details>

## Next steps

- Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
- [Independence heuristics](independence-heuristics.md) (re-read $P$ vs $Q$ if needed)  
- [DFR](dfr.md) · [Gaps](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/gaps.yaml)  
- Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
