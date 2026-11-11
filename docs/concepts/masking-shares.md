# Masking shares

**Prereqs:** [Side-channel threat model](../bridge/side-channel-threat-model.md) · [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Modular arithmetic](../fundamentals/modular-arithmetic.md)  
**Next:** [Ciphertext compress / encode](ciphertext-compress-encode.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Explain masking as “split the secret so each piece looks random,” do a tiny boolean and arithmetic share by hand, and see why Kyber’s Compress step needs special care under masking.

## The one idea

[[1]](#ref-1) introduces masking as splitting a sensitive variable into multiple shares and transforming the circuit so those shared values are processed securely (argued in the $t$-probing model).

| Clear | Masked (per [[1]](#ref-1)) |
|-------|--------|
| One value $x$ | An $n_s$-tuple of shares $x^{(\cdot)}$ |
| Leakage may track $x$ | Security notions require tuples of intermediates not to reveal the secret |

Masking hardens the **implementation**. It does **not** replace Module-LWE as the hardness assumption [[1]](#ref-1).

## Toy 1 — boolean shares (XOR world)

[[1]](#ref-1) denotes a Boolean encoding $x^{(\cdot)B}$ of $x\in\mathbb{Z}_2^k$ by shares satisfying

$$
x^{(0)B}\oplus\cdots\oplus x^{(n_s-1)B}=x.
$$

**Two-share teaching toy:** pick random $x_1$, set $x_2=x\oplus x_1$, recover $x=x_1\oplus x_2$.  
Example: $x=1$, $x_1=0$ → $x_2=1$.

## Toy 2 — arithmetic shares (mod $q$ world)

[[1]](#ref-1) denotes an arithmetic encoding $x^{(\cdot)A}$ of $x\in\mathbb{Z}_q$ by shares satisfying

$$
x^{(0)A}+\cdots+x^{(n_s-1)A}\equiv x\pmod{q}.
$$

**Two-share teaching toy:** pick random $x_1\bmod q$, set $x_2\equiv x-x_1\pmod{q}$.  
Example: $q=7$, $x=5$, $x_1=2$ → $x_2=3$.

### Mid-page self-check

If I publish only one arithmetic share $x_1$, have I published $x$?

<details><summary>Answer</summary>

No. [[1]](#ref-1)’s sharing is built so individual shares alone are not the secret; you need the combine rule over the share tuple.

</details>

## “Order” in one sentence

[[1]](#ref-1) targets **first- and higher-order** masked Kyber: more shares / higher $t$ in the probing model, with $t$-NI / $t$-SNI used to reason about composing gadgets. Treat “order” as a **cost dial** here; the proofs live in that paper.

## Why Compress becomes a research topic

[[1]](#ref-1) defines Kyber’s

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d
$$

(and matching $\mathrm{Decompress}_q$). For CCA decapsulation they must mask secret-derived modules, and they highlight **masked one-bit Compress** (arithmetic shares → A2B → bitsliced bit formula) and **masked decompressed comparison** [[1]](#ref-1).

Teaching moral: Compress is bit-oriented while poly arithmetic is mod $q$, so masking needs conversions and dedicated gadgets — otherwise a clear intermediate reappears.

## Masking vs shuffling (do not merge)

[[2]](#ref-2) treats **hiding/shuffling** as an SCA countermeasure that randomizes operation order, while [[1]](#ref-1) develops **masking** via shares:

| | Masking [[1]](#ref-1) | Shuffling / hiding [[2]](#ref-2) |
|--|---------|---------------------|
| Randomizes | **Values** (shares) | **Order / timing** of ops |
| Example in corpus | Masked Kyber Compress/compare gadgets | HW Fisher–Yates-style shuffle of Kyber decrypt leakage points |

## Common confusions

- Masking ≠ IND-CCA proof [[1]](#ref-1).  
- Masking the NTT alone is not enough if FO/decapsulation still leaks elsewhere [[1]](#ref-1).  
- More shares ≠ automatically “unbreakable.”

## Check yourself

1. Write the Boolean combine equation from [[1]](#ref-1).  
<details><summary>Answer</summary>
XOR of all Boolean shares equals $x$.
</details>

2. Write the arithmetic combine equation from [[1]](#ref-1).  
<details><summary>Answer</summary>
Sum of arithmetic shares $\equiv x\pmod{q}$.
</details>

3. Name the two “green” modules [[1]](#ref-1) focuses on before full FO masking.  
<details><summary>Answer</summary>
Masked one-bit $\mathrm{Compress}_q$ and masked DecompressedComparison.
</details>

## Next steps

- [Side-channel threat model](../bridge/side-channel-threat-model.md) (replay)  
- [Ciphertext compress / encode](ciphertext-compress-encode.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  

## References

<a id="ref-1"></a>[1] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214).

<a id="ref-2"></a>[2] D. Xu, K. Wang, and J. Tian, “A hardware-friendly shuffling countermeasure against side-channel attacks for Kyber,” *IEEE Trans. Circuits Syst. II*, vol. 72, no. 3, pp. 504–508, Mar. 2025, doi: [10.1109/TCSII.2025.3528751](https://doi.org/10.1109/TCSII.2025.3528751).
