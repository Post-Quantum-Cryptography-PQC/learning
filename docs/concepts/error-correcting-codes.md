# Error-correcting codes (intuition)

**Prereqs:** [From bits to codes](../bridge/from-bits-to-codes.md) · [Bits, XOR](../fundamentals/bits-xor-randomness.md) · [Vectors](../fundamentals/vectors-matrices.md)  
**Next:** [Hamming metric](hamming-metric.md) · [Linear codes](linear-codes.md) · [Syndrome decoding](syndrome-decoding.md)  
**Tracks:** code-based-kems

**Learning goals.** Explain redundancy vs secrecy, encode and decode a tiny repeat code by hand, compute Hamming distance between two strings, and state the crypto twist (intentional sparse noise + secret decoder).

## Why this card exists

The bridge [From bits to codes](../bridge/from-bits-to-codes.md) already told the reliability story slowly. This card is the **compact vocabulary** version you can return to while reading papers — still patient, but denser than a bridge.

If a sentence here feels fast, open the bridge, do one table on paper, then come back.

## Intuition

When you send bits through a noisy channel, some flip. An **error-correcting code** adds structured redundancy so the receiver can recover the original message despite a limited number of flips.

Five names you will meet everywhere:

| Name | Plain meaning |
|------|----------------|
| Message | The short information you care about |
| Codeword | The longer string you actually send |
| Channel | The process that flips some bits |
| Received word | What arrives (codeword plus errors) |
| Decoder | Algorithm that guesses the original message / codeword |

A **code** is simply the set of allowed codewords. Good codes spread those codewords far apart so small noise cannot jump from one to another.

**Crypto flip:** the “noise” is often intentional and secret; the public sees a scrambled linear view of a structured code. Reliability tools become hardness tools. Details live on [McEliece in plain words](../bridge/mceliece-in-plain-words.md).

### Picture the flow

$$
\text{message } m \;\xrightarrow{\text{encode}}\; \text{codeword } c \;\xrightarrow{\text{noise } e}\; y = c \oplus e \;\xrightarrow{\text{decode}}\; \hat m.
$$

Say aloud: “Encode, send through noise, decode.”

## Formal definition (light)

A **binary code** of length $n$ is a subset $C \subseteq \{0,1\}^n$ (the allowed codewords).  
A **linear code** is closed under XOR: if $c,c'\in C$ then $c\oplus c'\in C$. Encoding is often $\mathbf{m}\mapsto \mathbf{m}G$ for a generator matrix $G$ — see [Linear codes](linear-codes.md) and the bridge [Generator and parity-check](../bridge/generator-and-parity-check.md).

**Hamming distance** between two strings is the number of positions where they differ (equivalently, the weight of their XOR).  
**Minimum distance** $d$ = smallest Hamming distance between distinct codewords. Rough correcting power:

$$
t=\left\lfloor\frac{d-1}{2}\right\rfloor
$$

errors can always be corrected by nearest-neighbor decoding when you can afford to search.

## Worked example — repeat-3

Encode one message bit $m$:

| message bit $m$ | codeword $c$ |
|-----------------|--------------|
| 0 | $000$ |
| 1 | $111$ |

Only **two** allowed codewords. That is the whole code. They differ in all three positions, so $d=3$ and $t=1$.

### One error — corrected

Receive $y=001$. Distances:

| candidate | $y \oplus$ candidate | distance |
|-----------|----------------------|----------|
| $000$ | $001$ | $1$ |
| $111$ | $110$ | $2$ |

Nearest is $000$, so decode $\hat m=0$. **One error corrected.**

### Two errors — fails

If two flips send $000\to 110$:

| candidate | distance from $110$ |
|-----------|---------------------|
| $000$ | $2$ |
| $111$ | $1$ |

Nearest is $111$ — **wrong** message. Repeat-3 corrects one error, not two.

### Majority-vote view (same toy)

For $y=001$: two zeros, one one → vote $0$.  
For $y=110$: two ones, one zero → vote $1$.  
Same answers as nearest-neighbor here.

### Mid-page self-check

If $c=111$ becomes $y=101$, what does nearest-neighbor decode?  
<details><summary>Answer</summary>
Distance to $111$ is $1$; to $000$ is $2$. Decode $\hat m=1$.
</details>

## Rate — how much redundancy?

For repeat-3 you send $3$ bits to carry $1$ message bit.  
**Rate** roughly = (message length) / (codeword length) $= 1/3$.

Higher rate → less redundancy → usually weaker noise protection. Crypto schemes pick rates carefully for both efficiency and security stories — later.

## Communications vs crypto (do not skip)

| Setting | Noise | Who knows the code? | Goal |
|---------|-------|---------------------|------|
| Communications | Nature / channel | Often public | Reliability |
| Code-based PKE | Sender samples sparse $e$ | Secret trapdoor | Secrecy + honest decoding |

Same linear algebra; different who knows what. The noisy-channel story is retold slowly in [Noisy channel story](../bridge/noisy-channel-story.md).

## Where it appears in PQC

- **McEliece-style:** hide a code with an efficient decoder; publish a scrambled matrix; ciphertext looks like codeword + sparse error.  
- **HQC / BIKE-style:** structured (often quasi-cyclic) codes; decoding tolerates designed noise.  

Same math family; different packaging and key sizes. Next vocabulary stop after linear algebra: [Syndrome decoding](syndrome-decoding.md).

## Common confusions

- Codes were invented for reliability, not secrecy — crypto reuses the math.  
- More redundancy helps decoding but enlarges keys/ciphertexts.  
- “Random code” decoding is hard; “structured code” decoding can be easy for the key holder.  
- Distance $d$ is a property of the *code*, not of one unlucky received word.  
- Longer transmissions are not automatically secret — length buys reliability unless you add keys / hard problems.

## Check yourself

1. What does redundancy buy you in communications?  
2. In repeat-3, can you always fix two flips?  
3. If minimum distance is $5$, how many errors can you always correct (rule of thumb)?  
4. In one sentence, what is the crypto twist?  
5. What is the rate of repeat-3?  

<details><summary>Answers</summary>

1. Ability to recover after limited noise.  
2. No.  
3. $t=\lfloor(5-1)/2\rfloor=2$.  
4. Intentional sparse noise + secret structure / decoder for public-key hardness.  
5. $1/3$.

</details>

## Big practice set

1. List all codewords of repeat-3.  
2. Decode $y=011$ under repeat-3 (nearest neighbor).  
3. True or false: minimum distance $d=1$ can correct $1$ error for sure.  
4. Invent a length-$2$ code with two codewords and say its $d$.  
5. Compute the Hamming distance between $1010$ and $1111$.  

<details><summary>Answers</summary>

1. $000$ and $111$.  
2. Closer to $111$ (distance $1$ vs $2$ to $000$) → $\hat m=1$.  
3. False — $t=\lfloor(1-1)/2\rfloor=0$.  
4. e.g. $\{00,11\}$ has $d=2$, so $t=0$ (detects 1 error, does not always correct).  
5. Differ in positions 2 and 4 → distance $2$.

</details>

## Next steps

- [Linear codes](linear-codes.md)  
- [Syndrome decoding](syndrome-decoding.md)  
- Bridge refresh: [From bits to codes](../bridge/from-bits-to-codes.md)  
- Channel story: [Noisy channel story](../bridge/noisy-channel-story.md)  
- Crypto packaging: [McEliece in plain words](../bridge/mceliece-in-plain-words.md)  
