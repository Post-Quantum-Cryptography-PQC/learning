# Bit-flipping decoding (intuition)

**Prereqs:** [MDPC and QC-MDPC](mdpc-qc-mdpc.md) · [Hamming metric](hamming-metric.md) · [Generator and parity-check](../bridge/generator-and-parity-check.md) · [Noisy channel story](../bridge/noisy-channel-story.md)  
**Next:** [DFR](dfr.md) · [QC-MDPC reaction attack explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md) · [Syndrome decoding](syndrome-decoding.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain bit-flipping as “flip bits that look guilty under many failed checks,” run a tiny iteration by hand, and connect decoder failure to DFR and reaction-attack lessons.

## Why this card exists

MDPC / QC-MDPC schemes rarely use Classic McEliece’s algebraic Goppa decoder. They use **iterative bit-flipping** (Gallager-style ideas and crypto variants). Papers will say “bit-flipping fails” without slowing down — this card is that slowdown.

## Story in six lines (no math yet)

1. You receive a bit-string and a list of parity “quizzes.”  
2. Each failed quiz points at the bits it asked about — “one of you is wrong.”  
3. Bits accused by many failed quizzes look guilty.  
4. Flip the guiltiest bits; re-grade the quizzes.  
5. Repeat a few rounds; hope every quiz eventually passes.  
6. Sometimes it never clears — that honest failure feeds DFR; observable fail/success can feed reaction attacks.

## Intuition — majority guilt

You have a parity-check matrix $H$ and a received word $y$.  
Each row of $H$ is a check: “these positions should XOR to $0$” for a codeword.

Compute the syndrome $s = Hy^\top$.  
Failed checks ($1$s in $s$) vote against the bits that participate in them.  
Bits that collect many “guilty” votes get **flipped**. Repeat for a few iterations.

**Slogan:**

> Flip the bits the failed checks complain about most; hope the syndrome goes to zero.

### Quick self-check

If the syndrome is already all-zero, what should bit-flipping do?  
<details><summary>Answer</summary>
Nothing — $y$ already looks like a codeword (under these checks).
</details>

## Tiny worked iteration (toy)

Take even-parity length-3 style checks — reuse the spirit of the bridge toy.

Suppose $n=4$ and

$$
H = \begin{pmatrix} 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 1 & 1 \end{pmatrix},
\quad y=(1,0,0,0).
$$

Syndrome (each row dotted with $y$):

| check | involves | value |
|-------|----------|-------|
| row1 | bits 1,2 | $1$ (fail) |
| row2 | bits 2,3 | $0$ (ok) |
| row3 | bits 3,4 | $0$ (ok) |

Votes against bits (count failed checks touching them):

| bit | failed-check votes |
|-----|--------------------|
| 1 | 1 |
| 2 | 1 |
| 3 | 0 |
| 4 | 0 |

A simple rule: flip every bit with vote $\ge 1$ (aggressive toy). Flip bits 1 and 2 → $y'=(0,1,0,0)$.  
Recompute syndrome — may still be nonzero; real algorithms use thresholds, iteration caps, and better rules.

**Moral:** you saw the **vote → flip → recompute** loop. Crypto papers tune thresholds so that designed noise usually clears, but not always.

## Why it can fail (DFR link)

If the error is too heavy, or unlucky relative to the secret checks, iterations may not reach syndrome zero within the allowed rounds.  
That honest failure probability is part of [DFR](dfr.md) for MDPC-style KEMs.

Unlike a Goppa decoder with a crisp designed $t$, bit-flipping success is **statistical**.

## Why reactions leak (attack link)

Whether a ciphertext “decodes cleanly” can depend on how the error pattern sits on the **secret support** of $H$.  
If Eve learns only success/fail on many probes against a **static** key, she may estimate that support — the lesson of the [QC-MDPC reaction-attack explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md).

| Goal | Question |
|------|----------|
| Correctness | Does bit-flipping usually clear honest noise? |
| Security | Does observable fail/success leak the secret $H$? |

## Where it appears in PQC

- QC-MDPC / BIKE-shaped decapsulation  
- Some iterative attacks on algebraic McEliece (different setting — still “flip under checks”)  
- Hardware / constant-time implementations must be careful with timing of iterations and failure handling  

## Common confusions

- Bit-flipping is an **algorithm**, not a metric.  
- It is the owner’s (or attacker’s iterative) tool — not the same as ISD’s information-set search ([ISD](information-set-decoding.md)).  
- More iterations ≠ always more security; failures and side channels matter.  
- Thresholds and “which bits flip” are scheme-specific — read the paper’s decoder section slowly.

## Check yourself

1. What does a failed parity check contribute in bit-flipping?  
2. Why can MDPC decapsulation fail even with the correct secret key?  
3. True or false: bit-flipping always corrects any weight-$t$ error like a designed Goppa bound.  
4. What oracle bit matters for reaction attacks?  

<details><summary>Answers</summary>

1. Votes against the bits in that check.  
2. Iterative decoding is probabilistic — unlucky noise may not clear.  
3. False — success is statistical, not a crisp algebraic guarantee in the MDPC story.  
4. Success vs failure of decrypt / decaps.

</details>

## Big practice set

1. In one sentence, describe one iteration of bit-flipping.  
2. Name the concept card for “how often honest Decaps fails.”  
3. Which structure card pairs with this decoder for BIKE-shaped schemes?  

<details><summary>Answers</summary>

1. Compute syndrome / failed checks, score bits, flip high-score bits, repeat.  
2. [DFR](dfr.md).  
3. [MDPC and QC-MDPC](mdpc-qc-mdpc.md).

</details>

## Next steps

- [DFR](dfr.md)  
- [MDPC and QC-MDPC](mdpc-qc-mdpc.md)  
- Paper: [QC-MDPC reaction attack](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tit-pqc/a-key-recovery-reaction-attack-on-qc-mdpc/explainer.md)  
- Contrast algebraic path: [Goppa and alternant](goppa-alternant.md)  
