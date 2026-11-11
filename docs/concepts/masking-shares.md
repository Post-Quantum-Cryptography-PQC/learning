# Masking shares

**Prereqs:** [Side-channel threat model](../bridge/side-channel-threat-model.md) · [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Ciphertext compress / encode](ciphertext-compress-encode.md)  
**Next:** [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** State arithmetic vs Boolean sharing as in the masked-Kyber extract, explain why one-bit $\mathrm{Compress}_q$ needs A2B + bit gadgets, and separate probing-order talk from “we broke MLWE.”

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| Arithmetic shares mod $q$; Boolean shares with XOR; $t$-probing; $t$-(S)NI | TCHES masked Kyber — §2 Side-Channel Notation (`papers/tches-pqc/masking-kyber-first-and-higher-order-implementations/paper.md`) |
| Why CCA decapsulation must mask secret-derived modules | same — §3 intro + §3.3 Masked CCA Kyber Decapsulation |
| Masked one-bit Compress: prime $q$, A2B, bitsliced binary search | same — §3.1 Higher-Order One-Bit Compression |
| Masked comparison of decompressed values | same — §3.2 Higher-Order Masked Comparison |
| Contrast: shuffling as hiding, not sharing | TCAS-II shuffling — §I (`.../a-hardware-friendly-shuffling-.../paper.md`) |

## Why this card exists

Masked Kyber’s contribution list (§1/§3) is exactly the curriculum cliff: **arithmetically masked polynomials → Boolean-masked bits** for Compress, plus masked comparison inside FO decapsulation. This card teaches the share vocabulary those sections assume.

## Shares as defined in §2

Sensitive $x$ becomes an $n_s$-tuple $x^{(\cdot)}$.

| Encoding | Combine rule (extract) |
|----------|-------------------------|
| **Arithmetic** $x^{(\cdot)A}$ | $x^{(0)A}+\cdots+x^{(n_s-1)A}\equiv x\pmod{q}$ |
| **Boolean** $x^{(\cdot)B}$ | $x^{(0)B}\oplus\cdots\oplus x^{(n_s-1)B}=x$ |

**Order slogan:** more shares → aimed at higher $t$ in the probing model; cost grows (the paper’s HO tables). $t$-NI / $t$-SNI notions argue about composing gadgets — know the names exist; proofs stay in the paper.

### Mid-page self-check

Does masking replace IND-CCA proofs?

<details><summary>Answer</summary>

No. §2–3 harden the **implementation** of CCA decapsulation against probes/traces; MLWE/FO math assumptions remain separate.

</details>

## Why Compress is the hard green box (§3.1)

Clear Compress (also on [compress card](ciphertext-compress-encode.md)):

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d.
$$

For $d=1$, this is a threshold on which half of $\mathbb{Z}_q$ the coefficient sits. With **prime** $q=3329$, you cannot treat “MSB of a power-of-two word” as the answer without care.

Masked Kyber §3.1 moral (pedagogic rewrite):

1. Start from **arithmetic** shares of the coefficient.  
2. Convert **A2B** to Boolean bit shares.  
3. Compute a **masked binary-search / bit formula** (their bitsliced SecAND/SecXOR network) so each coefficient becomes a Boolean-shared message bit.  
4. Higher-order: same shape, more expensive share gadgets.

§3.2: comparing an uncompressed masked polynomial to a compressed public ciphertext needs another dedicated masked gadget — again, because naive compare leaks.

## Masking vs shuffling

| | Masking (TCHES) | Shuffling (TCAS-II) |
|--|-----------------|---------------------|
| Randomizes | **Values** (shares) | **Order** of PWM/INTT/… |
| Typical cost | Randomness + share logic | Smaller area in that brief’s ATP story |

Both answer the [SCA bridge](../bridge/side-channel-threat-model.md); they are not interchangeable.

## Check yourself

1. Write the arithmetic share equation from §2.  
<details><summary>Answer</summary>
Sum of $n_s$ shares $\equiv x\pmod{q}$.
</details>

2. Why is one-bit Compress awkward under prime $q$?  
<details><summary>Answer</summary>
The decision boundary is not a simple power-of-two bit cut; §3.1 builds a dedicated masked bit test after A2B.
</details>

3. Name the two “green” modules §3 highlights before full FO masking.  
<details><summary>Answer</summary>
Masked one-bit Compress and masked DecompressedComparison.
</details>

## Next steps

- [Ciphertext compress / encode](ciphertext-compress-encode.md)  
- [Side-channel threat model](../bridge/side-channel-threat-model.md)  
- Later private explainer: full masked-Kyber walkthrough of §3.1–3.3  
