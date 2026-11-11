# Ciphertext compress / encode

**Prereqs:** [Module-LWE](module-lwe.md) · [KEM](kem.md) · helpful: [Noise samplers](noise-samplers.md) · [DFR](dfr.md)  
**Next:** [Masking shares](masking-shares.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Error-correcting codes](error-correcting-codes.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** State $\mathrm{Compress}/\mathrm{Decompress}$ as in the Kyber/ML-KEM extracts, relate $(d_u,d_v)$ to ciphertext size vs DFR, and separate built-in compress from Minal **extra** ECC in the tailorable-codes paper.

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| $\mathrm{Compress}_q$/$\mathrm{Decompress}_q$ formulas; per-coefficient | TCHES masked Kyber — §2 Compression… (`papers/tches-pqc/masking-kyber-first-and-higher-order-implementations/paper.md`) |
| Drop LSBs; DFR security concern; $\mathrm{Compress}(x,d)$ same formula | TCHES tailorable codes — Abstract + §2 Background (`.../tailorable-codes-for-lattice-based-kems-.../paper.md`) |
| ML-KEM table: $d_u,d_v$, CBD $\eta$, ciphertext sizes, DFR | same — §3.1 Parameters and algorithms |
| Encrypt: Encode bits as $b\lceil q/2\rceil$ then compress $u,v$ | same — §3.1 Encryption |
| Minal codes = extra ECC to allow more dropping without wrecking DFR | same — §1 Contributions, §4 Minal codes |
| Masked one-bit Compress under sharing | Masked Kyber — §3.1 (see [masking](masking-shares.md)) |

## Why this card exists

Both Kyber extracts treat compression as a **named primitive**, not a vague “pack bytes.” Tailorable-codes §1 explains why: drop too many LSBs → DFR rises → failure-oracle risk.

## Built-in compress (shared formula)

Masked Kyber §2 / tailorable §2 agree on the lossy map (pedagogic copy of the idea):

$$
\mathrm{Compress}_q(x,d)=\big\lfloor(2^d/q)\,x\big\rceil\bmod 2^d,
\qquad
\mathrm{Decompress}_q(y,d)=\big\lfloor(q/2^d)\,y\big\rceil.
$$

Decompressed $x'$ stays within about $B_q=\lfloor q/2^{d+1}\rceil$ of $x$ (masked Kyber §2). Apply coefficient-wise on polynomials.

**ML-KEM parameters (tailorable §3.1 Table 1):** public $(d_u,d_v)$ choose how many bits keep for the two ciphertext parts; $\eta_1,\eta_2$ pick CBD widths; DFR targets listed per NIST level.

### Encrypt sketch (§3.1)

Encode each message bit $b$ as $b\lceil q/2\rceil$, add Module-LWE noise, then

$$
\mathbf{c}_u=\mathrm{Compress}(\mathbf{u},d_u),\qquad c_v=\mathrm{Compress}(v,d_v).
$$

Decrypt decompresses, peels Module-LWE, and recovers bits — residual $\Delta m$ must stay small enough ([DFR](dfr.md)).

### Mid-page self-check

If I shrink $d_u$ (fewer bits kept), what usually happens to DFR?

<details><summary>Answer</summary>

More compression distortion → larger residual noise → **higher** DFR risk (tailorable §1).

</details>

## Extra ECC ≠ built-in Compress (tailorable §4)

**Minal codes** (§4): higher-dimensional ECC tailored to ML-KEM noise, aiming for **shorter** ciphertexts/public keys while keeping DFR near targets — **without** changing $n,q$ so NTT still works (§1). That is an **encoding layer on top of** (or beside) the stock Compress knobs, not a rename of $\mathrm{Compress}_q$.

| Tool | Role in the extract |
|------|---------------------|
| $\mathrm{Compress}_q(\cdot,d)$ | Drop coefficient precision inside ML-KEM |
| Minal / tailorable codes | Extra ECC so you can drop more / shrink blobs with controlled DFR |

## Masking hook

When Compress becomes one-bit message recovery under FO, masked Kyber §3.1 must reimplement it under shares — [masking shares](masking-shares.md).

## Check yourself

1. Write Compress/Decompress as in §2 of the extracts.  
<details><summary>Answer</summary>
$\lfloor(2^d/q)x\rceil\bmod 2^d$ and $\lfloor(q/2^d)y\rceil$.
</details>

2. What do $d_u,d_v$ control in ML-KEM §3.1?  
<details><summary>Answer</summary>
Bit widths for compressing the two ciphertext pieces $\mathbf{u}$ and $v$.
</details>

3. Do Minal codes replace NTT-friendly $q=3329$?  
<details><summary>Answer</summary>
No — §1 stresses keeping core parameters so NTT multiplication remains.
</details>

## Next steps

- [DFR](dfr.md) · [Error-correcting codes](error-correcting-codes.md) · [Masking shares](masking-shares.md)  
- [Noise samplers](noise-samplers.md) (CBD $\eta$ next to $d_u,d_v$ in Table 1)  
- Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)
