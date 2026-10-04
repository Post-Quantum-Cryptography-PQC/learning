# From bits to codes

**Prereqs:** [Bits, XOR](../fundamentals/bits-xor-randomness.md) · [Vectors](../fundamentals/vectors-matrices.md) · [Probability](../fundamentals/probability-gentle.md)  
**Next:** [Noisy channel story](noisy-channel-story.md) · [Generator and parity-check](generator-and-parity-check.md)

**Learning goals.** Explain redundancy in plain language, encode and decode a tiny repeat code by hand, compute Hamming distances between codewords, and say why “more bits” can fight noise — without confusing reliability with secrecy.

## Why this page exists

Fundamentals taught you bits and XOR. Concepts will say “linear code,” “minimum distance,” “decoder.” This bridge slows down and builds the **reliability** story first — the original job of coding theory — before crypto hijacks the same math for secrecy.

Take this page slowly. Do the tables on paper.

## The problem in everyday language

You whisper a yes/no answer across a noisy room. Sometimes the listener hears the wrong bit. If you only say one bit, one mis-hear ruins everything.

So you **repeat** yourself: say the bit three times. The listener takes a majority vote. One mistake can be fixed; two mistakes might still fool them.

That is the seed of **error-correcting codes**: add structured extra bits (**redundancy**) so typical noise can be undone.

### Another everyday picture

Texting “YES” as `YYY EEE SSS` is wasteful English, but the idea is the same: extra symbols so a few typos do not destroy the meaning.

## Core ideas (still informal)

1. **Message** — the information you care about (short).  
2. **Codeword** — the longer string you actually send (message + redundancy).  
3. **Channel** — the noisy process that flips some bits.  
4. **Received word** — what arrives (codeword plus errors).  
5. **Decoder** — algorithm that guesses the original codeword / message.

A **code** is simply the set of allowed codewords. Good codes spread codewords far apart (in Hamming distance) so small noise cannot jump from one codeword to another.

### Picture the flow

$$
\text{message } m \;\xrightarrow{\text{encode}}\; \text{codeword } c \;\xrightarrow{\text{noise } e}\; y = c \oplus e \;\xrightarrow{\text{decode}}\; \hat m.
$$

Say aloud: “Encode, send through noise, decode.”

## Worked example — repeat-3

Encode one message bit $m$:

| $m$ | codeword $c$ |
|-----|----------------|
| 0 | $000$ |
| 1 | $111$ |

Only **two** allowed codewords. That is the whole code.

### One error — corrected

Suppose $c=000$ and the channel flips the last bit: received $y=001$.

Distances (Hamming):

| candidate | $y \oplus$ candidate | distance |
|-----------|----------------------|----------|
| $000$ | $001$ | $1$ |
| $111$ | $110$ | $2$ |

Nearest codeword is $000$, so decode $\hat m=0$. **One error corrected.**

### Two errors — fails

If two flips send $000\to 110$:

| candidate | distance from $110$ |
|-----------|---------------------|
| $000$ | $2$ |
| $111$ | $1$ |

Nearest is $111$ — **wrong** message $1$. Repeat-3 corrects $1$ error, not $2$.

### Majority-vote view (same toy)

For $y=001$: two zeros, one one → vote $0$.  
For $y=110$: two ones, one zero → vote $1$.  
Same answers as nearest-neighbor here.

### Quick self-check

If $c=111$ becomes $y=101$, what does nearest-neighbor decode?  
<details><summary>Answer</summary>
Distance to $111$ is $1$; to $000$ is $2$. Decode $\hat m=1$.
</details>

## Counting: why distance matters

If every pair of distinct codewords differs in at least $d$ positions (**minimum distance** $d$), then any pattern of fewer than $d/2$ flips cannot reach another codeword. Rough rule:

$$
t = \left\lfloor \frac{d-1}{2} \right\rfloor
$$

errors can always be corrected by nearest-neighbor decoding (when you can afford to search).

For repeat-3, the two codewords differ in $3$ places, so $d=3$ and $t=1$ — matches what we saw.

### Slow-motion: where $t$ comes from

If codewords are at least $d$ apart, balls of radius $t=\lfloor(d-1)/2\rfloor$ around each codeword do not overlap.  
A received word inside the correct ball is uniquely nearest (or at least uniquely decodable by nearest neighbor in the usual story).

You do not need geometry class — just: **space between codewords buys error room.**

## Rate — how much redundancy?

For repeat-3, you send $3$ bits to carry $1$ message bit.  
**Rate** roughly = (message length) / (codeword length) $= 1/3$.

Higher rate → less redundancy → usually weaker noise protection (tradeoff).  
Crypto schemes pick rates carefully for both efficiency and security stories — later.

## Bridge toward PQC (do not skip this)

In **communications**, noise is the enemy and the code is public.

In **code-based cryptography**, we often:

- keep a **secret** code (or secret decoder),  
- publish a scrambled view of it,  
- and treat a **sparse secret error** as part of the ciphertext.

Same linear algebra; different who knows what. The next pages make the linear-algebra version concrete; [McEliece in plain words](mceliece-in-plain-words.md) tells the crypto story.

| Setting | Noise | Who knows the code? | Goal |
|---------|-------|---------------------|------|
| Communications | Nature / channel | Often public | Reliability |
| Code-based PKE | Sender samples sparse $e$ | Secret trapdoor | Secrecy + honest decoding |

## Common confusions

- Longer transmissions are not automatically secure — here length buys **reliability**, not secrecy.  
- “Random looking” received words can still be close to a codeword.  
- Majority vote is only one decoder; better codes use smarter algorithms.  
- Distance $d$ is about the *code*, not about one unlucky received word.

## Check yourself

1. In repeat-3, what codeword encodes $m=1$?  
2. If $000$ becomes $010$, what does nearest-neighbor decode?  
3. If minimum distance is $5$, how many errors can you always correct (rule of thumb)?  
4. Does adding redundancy by itself hide a message from an eavesdropper?  
5. What is the rate of repeat-3?  

<details><summary>Answers</summary>

1. $111$.  
2. $000$ (one flip), so $m=0$.  
3. $t=\lfloor(5-1)/2\rfloor=2$.  
4. No — redundancy is for noise; secrecy needs keys / hard problems.  
5. $1/3$.

</details>

## Big practice set

1. List all codewords of repeat-3.  
2. Decode $y=011$ under repeat-3.  
3. True or false: minimum distance $d=1$ can correct $1$ error for sure.  
4. Invent a length-$2$ code with two codewords and say its $d$.  

<details><summary>Answers</summary>

1. $000$ and $111$.  
2. Closer to $111$ (distance $1$ vs $2$ to $000$) → $\hat m=1$.  
3. False — $t=\lfloor(1-1)/2\rfloor=0$.  
4. e.g. $\{00,11\}$ has $d=2$, so $t=0$ (detects 1 error, does not always correct).

</details>

## Next steps

- [Noisy channel story](noisy-channel-story.md)  
- [Generator and parity-check matrices](generator-and-parity-check.md)  
- Concepts: [Hamming metric](../concepts/hamming-metric.md) · [Error-correcting codes](../concepts/error-correcting-codes.md)  
