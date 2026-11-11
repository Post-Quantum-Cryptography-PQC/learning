# Ciphertext compress / encode

**Prereqs:** [Module-LWE](module-lwe.md) · [KEM](kem.md) · helpful: [Noise samplers](noise-samplers.md) · [DFR](dfr.md)  
**Next:** [Masking shares](masking-shares.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Error-correcting codes](error-correcting-codes.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Explain why lattice KEMs drop coefficient bits, try a tiny compress/decompress by hand, and separate “built-in compress” from optional extra error-correcting codes that shrink blobs further.

## The one idea

Module-LWE objects are polynomials with coefficients mod $q$ (for Kyber-shaped schemes, $q$ is a few thousand).  
Shipping every coefficient at full precision makes **public keys and ciphertexts large**.

**Compress** = keep only a coarse sketch of each coefficient (fewer bits).  
**Decompress** = inflate the sketch back to a value near the original.  
**Encode** (here) often also means “turn message bits into $\mathbb{Z}_q$ symbols” or “pack bytes” — context matters.

Trade-off in one line:

> Fewer bits → smaller blobs → more rounding noise → higher risk of decryption failure ([DFR](dfr.md)).

## Tiny compress toy

Imagine $q=17$ and we keep only **2 bits** of sketch (values $0,1,2,3$).  
Think of the circle $0..16$ cut into four bins; compress maps $x$ to a bin index; decompress returns a **center** of that bin.

Moral (without memorizing Kyber tables):

- Many different $x$ share one sketch.  
- After decompress you are **close**, not exact.  
- The scheme’s noise budget must absorb that extra fuzz **and** the LWE noise from [samplers](noise-samplers.md).

Kyber-family papers write essentially:

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d,
\qquad
\mathrm{Decompress}_q(y,d)=\big\lfloor(q/2^d)\,y\big\rceil.
$$

Here $d$ is “how many bits we keep.” Larger $d$ → finer sketch → bigger ciphertext piece.

### Mid-page self-check

If I decrease $d$ (keep fewer bits), what happens to size and to failure risk?

<details><summary>Answer</summary>

Ciphertext/public material gets **smaller**; compression distortion grows, so **DFR risk tends to rise** unless something else compensates.

</details>

## Where it sits in a KEM

Sketch of encaps (Module-LWE shaped):

1. Sample small secrets/errors ([noise samplers](noise-samplers.md)).  
2. Form noisy polynomials / vectors.  
3. **Encode** the message bits into large $\mathbb{Z}_q$ symbols (often bit $b\mapsto b\lceil q/2\rceil$).  
4. **Compress** some polynomials to $d_u$ / $d_v$ bits and ship them as the ciphertext.

Decaps decompresses, cancels with the secret, and rounds back to message bits — if total noise stayed small enough.

## Built-in compress vs extra ECC

| Tool | Job |
|------|-----|
| **Built-in Compress$_q$** | Drop precision inside the standard scheme |
| **Extra ECC** (e.g. “tailorable” / Minal-style codes) | Add coding so you can shrink further while chasing the same DFR targets |

Both care about size vs failures. Extra ECC is **not** “just another name for Compress.” It is an additional coding layer discussed in research papers; learn [error-correcting codes](error-correcting-codes.md) before those leaves.

## Hardware and masking hooks

Accelerators include a **compress/encode** block next to NTT and hash ([anatomy](kem-accelerator-anatomy.md)).  
Under [masking](masking-shares.md), Compress’s bit decisions need shared gadgets — a common research cliff.

## Check yourself

1. Why compress at all?  
<details><summary>Answer</summary>
To shrink public keys / ciphertexts by storing fewer bits per coefficient.
</details>

2. What must still work after decompress + LWE noise?  
<details><summary>Answer</summary>
Rounding back to the correct message with only rare failures (DFR story).
</details>

3. True or false: adding Minal-style codes is identical to increasing $d$.  
<details><summary>Answer</summary>
False — extra ECC is a different mechanism from choosing compress bit-width $d$.
</details>

## Next steps

- [DFR](dfr.md) · [Noise samplers](noise-samplers.md)  
- [Masking shares](masking-shares.md) if you care about SCA + Compress  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  

## Where this is grounded (optional)

Masked Kyber §2 (Compress/Decompress formulas); tailorable-codes TCHES `paper.md` §1–§3 (size vs DFR; $d_u,d_v$; Encode sketch) and §4 (Minal as extra ECC).
