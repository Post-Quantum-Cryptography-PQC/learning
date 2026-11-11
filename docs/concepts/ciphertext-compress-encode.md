# Ciphertext compress / encode

**Prereqs:** [Module-LWE](module-lwe.md) · [KEM](kem.md) · helpful: [Noise samplers](noise-samplers.md) · [DFR](dfr.md)  
**Next:** [Masking shares](masking-shares.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Error-correcting codes](error-correcting-codes.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Explain why lattice KEMs drop coefficient bits, try a tiny compress/decompress by hand, and separate “built-in compress” from optional extra error-correcting codes that shrink blobs further.

## The one idea

Module-LWE objects are polynomials with coefficients mod $q$ (for Kyber-shaped schemes, $q$ is a few thousand).  
Shipping every coefficient at full precision makes **public keys and ciphertexts large** [[2]](#ref-2).

**Compress** = keep only a coarse sketch of each coefficient (fewer bits) [[1]](#ref-1) [[2]](#ref-2).  
**Decompress** = inflate the sketch back to a value near the original [[1]](#ref-1).  
**Encode** (here) often also means “turn message bits into $\mathbb{Z}_q$ symbols” or “pack bytes” — context matters [[2]](#ref-2).

Trade-off in one line [[2]](#ref-2):

> Fewer bits → smaller blobs → more rounding noise → higher risk of decryption failure ([DFR](dfr.md)).

## Tiny compress toy

Imagine $q=17$ and we keep only **2 bits** of sketch (values $0,1,2,3$).  
Think of the circle $0..16$ cut into four bins; compress maps $x$ to a bin index; decompress returns a **center** of that bin.

Moral (without memorizing Kyber tables):

- Many different $x$ share one sketch.  
- After decompress you are **close**, not exact [[1]](#ref-1).  
- The scheme’s noise budget must absorb that extra fuzz **and** the LWE noise from [samplers](noise-samplers.md) [[2]](#ref-2).

Kyber-family papers write essentially [[1]](#ref-1) [[2]](#ref-2):

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d,
\qquad
\mathrm{Decompress}_q(y,d)=\big\lfloor(q/2^d)\,y\big\rceil.
$$

Here $d$ is “how many bits we keep.” Larger $d$ → finer sketch → bigger ciphertext piece. ML-KEM uses concrete $(d_u,d_v)$ for the two ciphertext pieces [[2]](#ref-2).

### Mid-page self-check

If I decrease $d$ (keep fewer bits), what happens to size and to failure risk?

<details><summary>Answer</summary>

Ciphertext/public material gets **smaller**; compression distortion grows, so **DFR risk tends to rise** unless something else compensates [[2]](#ref-2).

</details>

## Where it sits in a KEM

Sketch of encaps (Module-LWE shaped) [[2]](#ref-2):

1. Sample small secrets/errors ([noise samplers](noise-samplers.md)).  
2. Form noisy polynomials / vectors.  
3. **Encode** the message bits into large $\mathbb{Z}_q$ symbols (often bit $b\mapsto b\lceil q/2\rceil$).  
4. **Compress** some polynomials to $d_u$ / $d_v$ bits and ship them as the ciphertext.

Decaps decompresses, cancels with the secret, and rounds back to message bits — if total noise stayed small enough [[2]](#ref-2).

## Built-in compress vs extra ECC

| Tool | Job |
|------|-----|
| **Built-in Compress$_q$** [[1]](#ref-1) [[2]](#ref-2) | Drop precision inside the standard scheme |
| **Extra ECC** (e.g. Minal / tailorable codes) [[2]](#ref-2) | Add coding so you can shrink further while chasing the same DFR targets |

Both care about size vs failures. Extra ECC is **not** “just another name for Compress.” It is an additional coding layer [[2]](#ref-2); learn [error-correcting codes](error-correcting-codes.md) before those leaves.

## Hardware and masking hooks

Accelerators include a **compress/encode** block next to NTT and hash ([anatomy](kem-accelerator-anatomy.md)).  
Under [masking](masking-shares.md), Compress’s bit decisions need shared gadgets — a common research cliff in [[1]](#ref-1).

## Check yourself

1. Why compress at all?  
<details><summary>Answer</summary>
To shrink public keys / ciphertexts by storing fewer bits per coefficient [[2]](#ref-2).
</details>

2. What must still work after decompress + LWE noise?  
<details><summary>Answer</summary>
Rounding back to the correct message with only rare failures (DFR story) [[2]](#ref-2).
</details>

3. True or false: adding Minal-style codes is identical to increasing $d$.  
<details><summary>Answer</summary>
False — extra ECC is a different mechanism from choosing compress bit-width $d$ [[2]](#ref-2).
</details>

## Next steps

- [DFR](dfr.md) · [Noise samplers](noise-samplers.md)  
- [Masking shares](masking-shares.md) if you care about SCA + Compress  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  

## References

<a id="ref-1"></a>[1] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214).

<a id="ref-2"></a>[2] T. B. Paiva, M. A. Simplicio Jr., S. M. Hafiz, B. Yildiz, E. L. Cominetti, and H. S. Ogawa, “Tailorable codes for lattice-based KEMs with applications to compact ML-KEM instantiations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2025, no. 3, pp. 139–163, 2025, doi: [10.46586/tches.v2025.i3.139-163](https://doi.org/10.46586/tches.v2025.i3.139-163).
