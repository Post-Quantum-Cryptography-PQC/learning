# From KEM API to noise

**Prereqs:** [McEliece in plain words](mceliece-in-plain-words.md) · [Public-key picture](../fundamentals/public-key-picture.md)  
**Next:** Concept: [KEM](../concepts/kem.md) · [DFR](../concepts/dfr.md) · [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md)

**Learning goals.** Connect $\mathsf{Encaps}/\mathsf{Decaps}$ to “hidden noise,” explain why correctness is probabilistic, walk a toy Encaps timeline, and preview why independence of noise coordinates matters in analyses.

## Why this page exists

Fundamentals introduced KEMs as an API. McEliece showed a concrete encryption story. Concepts will discuss DFR and independence heuristics. This bridge stitches **API ↔ noise ↔ failure** in one place with more wording.

## Recall the API

- $\mathsf{KeyGen}\to(\mathsf{pk},\mathsf{sk})$  
- $\mathsf{Encaps}(\mathsf{pk})\to(\mathsf{ct}, K)$  
- $\mathsf{Decaps}(\mathsf{sk},\mathsf{ct})\to K'$  

Wish: $K'=K$ always. Reality for many code-based KEMs: $K'=K$ except with tiny probability (DFR).

### Say each line aloud

1. “KeyGen makes a public key and a secret key.”  
2. “Encaps uses the public key and returns a ciphertext and a session key.”  
3. “Decaps uses the secret key and ciphertext and should return the same session key.”

### Quick self-check

Does Bob send $K$ in the clear on the network?  
<details><summary>Answer</summary>
No — he sends $\mathsf{ct}$; $K$ is derived / recovered via the trapdoor.
</details>

## Where the noise hides (mental model)

Different schemes hide randomness differently, but a useful cartoon for code-based KEMs is:

1. Encapsulation samples secret sparse randomness (errors, sparse polynomials, …).  
2. Ciphertext publishes a **linear image** of that randomness (plus message/key packaging).  
3. Decapsulation uses $\mathsf{sk}$ to recover the sparse object and rebuild $K$.  
4. If recovery fails, decapsulation fails or outputs a wrong key (scheme-dependent handling).

So when documents discuss “the noise vector,” they mean the sparse secret randomness that honest parties must reconstruct.

### Map to McEliece cartoon

| KEM language | McEliece story |
|--------------|----------------|
| sparse randomness | intentional error $e$ |
| ciphertext | $y = c \oplus e$ (or syndrome form) |
| Decaps success | Alice decodes $e$ and recovers the message / key material |

## Correctness vs security (say it out loud)

| Goal | Question |
|------|----------|
| **Correctness** | Does honest Decaps recover $K$ except with negligible DFR? |
| **Security** | Can an adversary without $\mathsf{sk}$ learn $K$ from $\mathsf{pk},\mathsf{ct}$? |

A scheme can be insecure with perfect correctness, or (badly designed) correct rarely. Analyses must track **both**. DFR arguments often use probability models of noise weight; security arguments use hardness of decoding-like problems (and more).

### Picture

```
correctness:  noise usually light enough for Alice
security:     decoding stays hard for Eve
```

Both must hold at once — that is why parameter selection is delicate.

## Why independence shows up

To bound $\Pr[\text{weight too large}]$, writers sometimes assume noise coordinates behave like independent biased coins. That makes Chernoff-style bounds easy.

But if coordinates share underlying polynomial randomness, they may be **dependent**. Then:

- the independent model might be false as a distribution,  
- yet weight might still concentrate,  
- so DFR might still be fine — or might need a better proof.

That subtlety is exactly why this lab includes the [2025/018 explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/eprint/2025-018/explainer.md) after you finish concepts on independence and KL.

**Seed from fundamentals:** “each looks fair” ≠ independent ([Bits, XOR](../fundamentals/bits-xor-randomness.md)).

## Worked toy timeline

1. Bob runs Encaps: samples sparse $e$, builds $\mathsf{ct}$, also learns $K$.  
2. Network delivers $\mathsf{ct}$ to Alice (Eve may copy $\mathsf{ct}$).  
3. Alice’s decoder expects $\|e\|\le t$.  
4. If $\|e\|\le t$, she recovers $e$, derives $K$.  
5. If $\|e\|>t$, she fails — contributes to DFR.

Replace “$e$” by “sparse polynomial noise” for HQC-shaped schemes; the timeline stays.

### Tiny numbers (not real crypto)

Suppose Alice can correct $t=2$ errors and Bob samples weight exactly $2$ always → honest failure $\approx 0$ in that toy.  
If Bob’s sampler sometimes outputs weight $3$, failures appear — that is DFR pressure.

## Lattice cousin (postcard)

Lattice KEMs also encapsulate a session key using **noise**, but the noise lives in modular equations ([LWE story](noisy-linear-equations-lwe.md)).  
Same API shape; different math object. You can learn either fork after fundamentals.

## Bridge to concepts

- Clean API card: [KEM](../concepts/kem.md)  
- Failure probability: [DFR](../concepts/dfr.md)  
- Modeling assumption: [Independence heuristics](../concepts/independence-heuristics.md)  
- Structure: [Quasi-cyclic codes](../concepts/quasi-cyclic-codes.md)

## Common confusions

- Encaps outputs both $\mathsf{ct}$ and $K$; $K$ is not sent in the clear — it is derived.  
- DFR is about honest failure, not “probability an attack works.”  
- CCA security proofs sometimes need extremely small DFR; that is why papers obsess over it.  
- Dependent noise ≠ automatic break — it means “check the proof assumptions.”

## Check yourself

1. Name the three KEM algorithms.  
2. Is DFR a security or correctness quantity first and foremost?  
3. Why might analysts assume independent noise coordinates?  
4. Does dependent noise automatically mean the KEM is broken?  
5. In the toy timeline, what happens if $\|e\|>t$?  

<details><summary>Answers</summary>

1. KeyGen, Encaps, Decaps.  
2. Correctness (honest failure rate), though it interacts with security proofs.  
3. To simplify weight-tail / DFR bounds.  
4. No — need more analysis; concentration might still hold.  
5. Alice may fail to recover $K$ (counts toward DFR).

</details>

## Next steps

- [Security bits and attack work](security-bits-and-work.md)  
- Concepts: [KEM](../concepts/kem.md) · [DFR](../concepts/dfr.md)  
- Track: continue [code-based roadmap](../tracks/code-based-kems/ROADMAP.md)  
