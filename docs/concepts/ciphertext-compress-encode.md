# Ciphertext compress / encode

**Prereqs:** [Module-LWE](module-lwe.md) · [KEM](kem.md) · helpful: [Noise samplers](noise-samplers.md) · [DFR](dfr.md)  
**Next:** [Masking shares](masking-shares.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Error-correcting codes](error-correcting-codes.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** After this page you can:

- Explain why lattice KEMs drop coefficient bits
- Try a tiny compress/decompress by hand
- Separate “built-in compress” from optional extra error-correcting codes that shrink blobs further

## The one idea

[[2]](#ref-2) opens with a primary drawback of lattice KEMs vs ECC: **larger public keys and ciphertexts**. A common compression method is dropping least-significant bits — but dropping too many raises the **decryption failure rate (DFR)**, which is a security concern [[2]](#ref-2).

**Compress** / **Decompress** = that lossy coefficient sketch [[1]](#ref-1) [[2]](#ref-2).  
**Encode** (in [[2]](#ref-2)’s ML-KEM sketch) = map message bits into $\mathbb{Z}_q$ before adding noise.

## Formulas from the papers

[[1]](#ref-1) and [[2]](#ref-2) both use the standard Kyber/ML-KEM maps (notation differs only slightly):

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d,
\qquad
\mathrm{Decompress}_q(y,d)=\big\lfloor(q/2^d)\,y\big\rceil.
$$

[[1]](#ref-1) states that after compress→decompress, $x'$ stays within about $B_q=\lfloor q/2^{d+1}\rceil$ of $x$ (centered mod $q$).  
[[2]](#ref-2) likewise notes the (de)compression error is almost uniform in a small interval around $0$.

**Teaching toy** (not a paper parameter): $q=17$, keep a 2-bit sketch — many $x$ share one bin; decompress returns a bin center; noise budgets must absorb that fuzz.

### Mid-page self-check

If I decrease $d$ (keep fewer bits), what happens to size and to failure risk?

<details><summary>Answer</summary>

[[2]](#ref-2): more aggressive dropping shrinks blobs but can make DFR noticeable / dangerous if taken too far.

</details>

## ML-KEM parameters and encrypt sketch [[2]](#ref-2)

[[2]](#ref-2) §3.1:

- Public parameters include $k$, $\eta_1$, $\eta_2$, $d_u$, $d_v$.  
- $\eta_1,\eta_2$ select centered-binomial widths for small coefficients.  
- $d_u,d_v$ are the bit widths used to compress the two ciphertext pieces.  

Encryption sketch in the same section:

1. Sample small $\mathbf{r},\mathbf{e}_1,e_2$ from the $\mathcal{B}_\eta$ laws.  
2. Form $\mathbf{u}$ and $z$ with Module-LWE-style arithmetic.  
3. $\mathrm{Encode}(b)=b\lceil q/2\rceil$ for each message bit; set $v=\mathrm{Encode}(m)+z$.  
4. $\mathbf{c}_u=\mathrm{Compress}(\mathbf{u},d_u)$, $c_v=\mathrm{Compress}(v,d_v)$.  

Decryption decompresses, cancels with the secret, and faces residual noise $\Delta m$ that determines failures [[2]](#ref-2).

## Built-in compress vs Minal (extra ECC)

| Tool | What [[2]](#ref-2) claims |
|------|---------------------------|
| Built-in Compress | Drop coefficient bits via $d_u,d_v$ |
| **Minal codes** | A family of higher-dimensional ECC tailored to lattice noise; can yield ~4–8% shorter ciphertexts (or ~8% shorter public keys) while chasing ML-KEM DFR targets, without changing core $n,q$ so NTT stays usable |

Extra ECC is **not** “another name for Compress” [[2]](#ref-2). Learn [error-correcting codes](error-correcting-codes.md) before those leaves.

## Hardware and masking hooks

[[1]](#ref-1) shows why Compress matters under SCA: masked CCA decapsulation needs **masked one-bit Compress** and masked comparison gadgets ([masking shares](masking-shares.md)).  
Accelerator block diagrams in this curriculum place compress/encode next to NTT/hash ([anatomy](kem-accelerator-anatomy.md)) — that map is pedagogical; the Compress math itself is from [[1]](#ref-1) [[2]](#ref-2).

## Check yourself

1. Write Compress/Decompress as in [[1]](#ref-1)/[[2]](#ref-2).  
<details><summary>Answer</summary>
$\lfloor(2^d/q)x\rceil\bmod 2^d$ and $\lfloor(q/2^d)y\rceil$.
</details>

2. What do $d_u,d_v$ control in [[2]](#ref-2)?  
<details><summary>Answer</summary>
Bit widths for compressing the two ciphertext components.
</details>

3. Do Minal codes require changing Kyber’s $n$ or $q$ according to [[2]](#ref-2)?  
<details><summary>Answer</summary>
No — that paper emphasizes keeping core parameters so NTT multiplication remains.
</details>

## Next steps

- [DFR](dfr.md) · [Noise samplers](noise-samplers.md)  
- [Masking shares](masking-shares.md) if you care about SCA + Compress  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  

## References

<a id="ref-1"></a>[1] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214). (§2 Compress/Decompress; §3.1 masked one-bit Compress)

<a id="ref-2"></a>[2] T. B. Paiva, M. A. Simplicio Jr., S. M. Hafiz, B. Yildiz, E. L. Cominetti, and H. S. Ogawa, “Tailorable codes for lattice-based KEMs with applications to compact ML-KEM instantiations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2025, no. 3, pp. 139–163, 2025, doi: [10.46586/tches.v2025.i3.139-163](https://doi.org/10.46586/tches.v2025.i3.139-163). (§1 size/DFR; §2–§3 Compress/Encode/$d_u$/$d_v$; §4 Minal)
