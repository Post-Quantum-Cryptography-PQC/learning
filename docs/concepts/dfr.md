# Decryption failure rate (DFR)

**Prereqs:** [From KEM API to noise](../bridge/from-kem-api-to-noise.md) · [Noisy channel story](../bridge/noisy-channel-story.md) · [KEM](kem.md)  
**Next:** [Independence heuristics](independence-heuristics.md) · [KL divergence](kl-divergence.md) · Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
**Tracks:** code-based-kems

**Learning goals.** Define DFR in one line, relate it to noise weight and a decoder threshold, separate DFR from attack success probability, and see why “coordinates independent” is a stronger claim than “weight concentrates.”

## Why this card exists

Code-based KEMs often decrypt by removing noise. If noise is too heavy, honest decapsulation fails. Papers obsess over making that probability tiny — and over whether their probability model is fair. This card sits between the [KEM API → noise bridge](../bridge/from-kem-api-to-noise.md) and the modeling cards ([independence](independence-heuristics.md), [KL](kl-divergence.md)).

## Intuition — when honest Decaps fails

Some code-based KEMs recover a session key by decoding a noisy word.  
If the noise is heavier than the decoder expects, **decapsulation fails** even with the correct secret key.  
That probability is the **decryption failure rate (DFR)**.

Designers want DFR astronomically small (often talked about at $2^{-128}$ scale) so failures are negligible for reliability and for many security-proof techniques — especially [CCA](ind-cpa-cca.md)-style arguments that dislike noisy failure behaviour.

| Word | Meaning here |
|------|----------------|
| Honest failure | Alice has $\mathsf{sk}$, Bob followed Encaps, yet Decaps does not return the right $K$ |
| DFR | Probability of that event (in the model) |
| Attack success | Different sticky note — cost/probability that Eve breaks the KEM |

### Quick self-check

Is DFR $=2^{-128}$ the same claim as “$128$-bit security”?  
<details><summary>Answer</summary>
No. DFR is honest failure probability. Security bits are about attack cost. Keep two sticky notes ([security bits bridge](../bridge/security-bits-and-work.md)).
</details>

## Formal definition (light)

$$
\mathrm{DFR}=\Pr[\mathrm{Decaps}(\mathsf{sk},\mathsf{ct})\neq\text{session key}].
$$

(Exact failure event may be “wrong key” or an explicit reject — scheme-dependent.)

Analyses often reduce DFR to **weight concentration**: if the effective noise weight stays below a threshold $t$ with overwhelming probability, decoding succeeds.

$$
\text{typical cartoon:}\quad
\mathrm{DFR} \approx \Pr[\|e\| > t]
\quad\text{(when that is the failure event)}.
$$

Real schemes may have more nuanced failure events; the cartoon is for orientation.

## Worked toy — count a failure probability

Decoder corrects weight $\le 2$.  
Usual noise weight is $1$, but with probability $10^{-6}$ it jumps to $3$ → failure.  
That $10^{-6}$ is a toy DFR (far too large for real KEMs, fine for intuition).

### Slightly richer toy

Suppose each Encaps independently samples weight:

| Weight $\|e\|$ | Probability | Decode? ($t=2$) |
|----------------|-------------|-----------------|
| $0$ or $1$ or $2$ | $1-10^{-6}$ | success |
| $\ge 3$ | $10^{-6}$ | failure |

Then $\mathrm{DFR}=10^{-6}$ in this model. Crypto targets replace $10^{-6}$ by something like $2^{-128}$ (or smaller), with careful analysis — not wishful simulation alone.

### Channel cousin

Same *shape* as decoding failure on a noisy line ([noisy channel story](../bridge/noisy-channel-story.md)): heavy noise → Bob fails. In KEMs the “noise” is often intentional sparse randomness Bob samples, not weather on a phone line.

### Quick self-check

If weight is usually safe but rarely huge, what does DFR measure?  
<details><summary>Answer</summary>
The probability of those rare too-heavy (or otherwise failing) cases in the model.
</details>

## Why papers care so much

| Reason | One-line why |
|--------|----------------|
| Reliability | Users hate silent wrong keys / rare rejects |
| Proof techniques | Tiny DFR helps CCA / Fujisaki–Okamoto-style reasoning (high level) |
| Modeling honesty | A beautiful DFR bound on a false noise model is not a real bound |

High DFR can hurt security proofs even if day-to-day decryption “usually works.” Small-scale simulations do **not** automatically prove cryptographic-scale DFR.

## Where it appears in PQC

HQC-style documents model noise from sparse polynomial products and argue concentration.  
ePrint 2025/018 asks whether the **independence modelling** behind some of those arguments is information-theoretically justified — without claiming HQC is broken. Read that after [independence heuristics](independence-heuristics.md) and [KL divergence](kl-divergence.md).

| Topic | Card / paper |
|-------|----------------|
| API ↔ noise | [From KEM API to noise](../bridge/from-kem-api-to-noise.md) |
| Independence assumption | [Independence heuristics](independence-heuristics.md) |
| Measuring model gap | [KL divergence](kl-divergence.md) |
| Research audit | [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) |

## Common confusions

| Confusion | Clearer picture |
|-----------|-----------------|
| DFR = attack probability | No — honest Decaps failure vs Eve’s break. |
| “Usually works” ⇒ DFR fine for proofs | Proofs often need *cryptographic-scale* tiny DFR. |
| Dependent coordinates ⇒ large DFR | Not automatic — weight might still concentrate. |
| Simulation at tiny $n$ ⇒ DFR at crypto $n$ | Extrapolation needs theory, not faith. |

Independence of coordinates is a **stronger** claim than concentration of weight. You can have dependence and still hope weight concentrates — but then you must prove it without pretending independence.

## Check yourself

1. Write DFR in one English sentence.  
2. If weight is usually safe but rarely huge, what does DFR measure?  
3. Does “coordinates are dependent” automatically mean DFR is large?  
4. Write the cartoon formula linking DFR to $\|e\|$ and $t$.  
5. Name one reason CCA-minded designers want tiny DFR.  

<details><summary>Answers</summary>

1. How often honest Decaps fails to return the session key.  
2. The probability of those rare too-heavy cases (in the model).  
3. No — weight might still concentrate; you need more analysis.  
4. $\mathrm{DFR}\approx\Pr[\|e\|>t]$ when that is the failure event.  
5. Reliability and/or proof techniques that dislike noisy failure behaviour (and reaction-style leakage).

</details>

## Big practice set

1. Translate “DFR $\le 2^{-64}$” into one English sentence.  
2. Alice has $\mathsf{sk}$ and Bob followed the spec; Decaps still fails once in a blue moon. Is that a security break by itself?  
3. Which follow-up card asks whether “treat noise bits as independent” is justified?  

<details><summary>Answers</summary>

1. Honest decryption fails at most about one in $2^{64}$ times in the model.  
2. No — that is a correctness / DFR event. Security asks whether Eve learns $K$ without $\mathsf{sk}$. (High DFR can still *interact* with security proofs.)  
3. [Independence heuristics](independence-heuristics.md).

</details>

## Next steps

- [Independence heuristics](independence-heuristics.md)  
- [KL divergence](kl-divergence.md)  
- [IND-CPA / IND-CCA](ind-cpa-cca.md) — if you skipped the security games  
- Paper: [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md)  
