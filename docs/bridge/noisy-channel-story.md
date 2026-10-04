# Noisy channel story

**Prereqs:** [From bits to codes](from-bits-to-codes.md) · [Probability](../fundamentals/probability-gentle.md)  
**Next:** [Generator and parity-check](generator-and-parity-check.md) · [What “security bits” means](security-bits-and-work.md)

**Learning goals.** Describe a binary symmetric channel, relate error rate to decoder failure with a fully counted toy, and contrast “channel noise” with “crypto noise” until the McEliece twist feels natural.

## Why this page exists

Papers talk about decryption failure as if it were a channel-decoding failure. That analogy is intentional. Here we make the communications story slow and verbal, then flip it into the crypto setting without new jargon overload.

## Story: Alice calls Bob on a bad line

Alice wants to send a codeword $c\in\{0,1\}^n$.  
Each bit flips independently with small probability $p$ (a **binary symmetric channel**, BSC).  
Bob sees $y = c \oplus e$, where $e$ is a random error vector with about $pn$ ones on average.

Bob runs a decoder: “Which codeword is closest to $y$?”  
If the noise weight is small compared to the code’s correcting power, Bob recovers $c$.  
If the noise is too heavy, Bob may output the wrong codeword — a **decoding failure** (or undetected error, depending on the decoder).

### Picture

$$
c \;\xrightarrow{\text{each bit flips w.p. }p}\; y = c \oplus e.
$$

**BSC slogan:** fair-ish noisy coin flips on each bit, independently (in the model).

### Quick self-check

If $p=0$, what is $y$?  
<details><summary>Answer</summary>
$y=c$ always — perfect channel.
</details>

## Worked numbers (tiny) — count carefully

Suppose $n=3$, repeat code, $p=0.1$.  
For $c=000$, Bob fails the majority vote if at least two bits flip.

Ways to get $\ge 2$ flips:

| Pattern of flips (positions) | Probability |
|------------------------------|-------------|
| exactly two flips | $\binom{3}{2}(0.1)^2(0.9)^1 = 3\cdot 0.01\cdot 0.9 = 0.027$ |
| three flips | $(0.1)^3 = 0.001$ |
| **total failure** | $0.028$ |

About $2.8\%$ failure for this toy — far too high for crypto, but the **shape** of the calculation is what DFR arguments look like (with much larger $n$ and tiny probabilities).

### Same toy, success probability

$\Pr[\text{at most one flip}] = 1 - 0.028 = 0.972$.  
Still “usually works,” but crypto wants failures like $2^{-128}$, not a few percent.

### Another $p$ (feel the sensitivity)

If $p=0.01$ instead:

$$
\Pr[\ge 2\text{ flips}] = 3(0.01)^2(0.99) + (0.01)^3 \approx 0.000297.
$$

Much smaller. Noise rate matters a lot.

## Slow-motion vocabulary map

| Communications word | Crypto cousin you will meet |
|---------------------|-----------------------------|
| Channel noise $e$ | Ephemeral error / noise in a KEM ciphertext |
| Decoding failure | Decryption / decapsulation failure (DFR) |
| Public code | Sometimes public; sometimes only a scrambled view is public |
| Encoder | Part of key generation / encapsulation |
| Decoder | Uses **secret** structure in code-based PKE/KEMs |
| Error rate $p$ | Designer’s noise weight / Bernoulli parameter |

## The crypto twist (read twice)

In communications, everyone may know the code; the enemy is nature’s noise.

In code-based public-key encryption (McEliece-style):

1. The **legitimate receiver** knows a secret code that is easy to decode.  
2. The **public key** looks like a random messy matrix.  
3. The sender adds a **sparse** error on purpose.  
4. An attacker without the secret faces a hard decoding problem.  
5. Even the legitimate receiver can fail if the error is heavier than designed — that probability is DFR.

So crypto **weaponizes** decoding hardness for attackers, while still needing decoding **reliability** for honest parties.

### Side-by-side

| | Communications BSC | McEliece-style crypto |
|--|--------------------|------------------------|
| Who makes $e$? | Nature (random flips) | Sender (samples sparse $e$) |
| Is $e$ the enemy? | Yes | Cloak for the message |
| Who decodes easily? | Anyone with the (public) code | Only secret-key owner |
| Failure name | Decoding failure | DFR / decapsulation failure |

## Independence (seed for later)

The BSC model assumes independent flips.  
Real KEM noise may be **dependent** across coordinates (shared polynomial randomness).  
Then DFR proofs need care — see [Independence heuristics](../concepts/independence-heuristics.md) and the optional [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) later.

For now: “independent coin flips” is a convenient story, not a law of nature.

## Bridge to later pages

- Linear view of encoding/decoding: [Generator and parity-check](generator-and-parity-check.md)  
- Attack hardness slogan: [Decoding as a puzzle](decoding-as-a-puzzle.md)  
- Full crypto narrative: [McEliece in plain words](mceliece-in-plain-words.md)  
- Concept DFR: [DFR](../concepts/dfr.md)

## Common confusions

- Low DFR is about honest decryption working — not the same as “secure against attacks.”  
- Independent bit-flip models are convenient; real structured noise may be dependent.  
- “Failure” might mean wrong key or explicit failure flag — scheme-dependent.  
- Smaller $p$ helps reliability but crypto also needs the attacker’s problem to stay hard.

## Check yourself

1. In $y=c\oplus e$, who chooses $e$ in a communications BSC vs in McEliece-style encryption?  
2. If average noise weight exceeds what the decoder can handle, what happens to failure rate?  
3. Why can a KEM care about a failure probability like $2^{-128}$?  
4. True or false: DFR $=2^{-128}$ means the same thing as “$128$-bit security.”  

<details><summary>Answers</summary>

1. BSC: random nature. McEliece-style: sender samples sparse $e$ (crypto randomness).  
2. It goes up — more often decoding/decryption fails.  
3. So failures are negligible for security reductions and real-world reliability.  
4. False — see [Security bits](security-bits-and-work.md); one is failure probability, the other is attack work.

</details>

## Big practice set

1. For $n=3$, $p=0$, what is $\Pr[\text{decoding failure}]$ for majority vote on repeat-3?  
2. Name one communications word and its crypto cousin.  
3. In one sentence, what is the “crypto twist” on noise?  

<details><summary>Answers</summary>

1. $0$.  
2. e.g. decoding failure ↔ DFR.  
3. Sender adds sparse noise on purpose so attackers face hard decoding while Alice still decodes with her trapdoor.

</details>

## Next steps

- [Generator and parity-check matrices](generator-and-parity-check.md)  
- [Decoding as a puzzle](decoding-as-a-puzzle.md)  
- [Security bits and attack work](security-bits-and-work.md)  
