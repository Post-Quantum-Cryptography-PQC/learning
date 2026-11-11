# Noise samplers

**Prereqs:** [Probability (gentle)](../fundamentals/probability-gentle.md) · [LWE](lwe.md) · helpful: [Module-LWE](module-lwe.md) · [Noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
**Next:** [Hash / XOF](hash-xof-keccak.md) · [Ciphertext compress / encode](ciphertext-compress-encode.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** After this page you can (1) say in one sentence what a noise sampler *does*, (2) build a tiny CBD sample by hand, and (3) recognize named sampling blocks when HW papers describe them.

## The one idea

On the [LWE](lwe.md) card you met cloudy equations

$$
b \equiv \langle \mathbf{a}, \mathbf{s}\rangle + e \pmod{q}
$$

with a **small** noise $e$.  
Someone (software or a chip) must **actually pick** those small $e$ values — and often whole vectors or polynomials of them.

That “someone” is the **noise sampler**.

| Without a sampler | With a sampler |
|-------------------|----------------|
| You know $e$ should be small | You have a concrete random recipe that outputs small $e$ |
| Specs write “draw from $\chi$ / CBD / …” | Implementations add a routine or HW block that produces coefficients |

**This page teaches the recipe idea**, not a full Kyber parameter sheet.

## Why small random noise (30-second replay)

From the [LWE bridge](../bridge/noisy-linear-equations-lwe.md):

- **Too little / zero noise** → equations become ordinary linear algebra; secrets leak.  
- **Too much noise** → even the legitimate owner cannot recover the message (failures).  
- Schemes therefore sample from a distribution that **likes values near zero**.

A sampler is how KeyGen / Encaps / Sign **implement** that distribution in real code or silicon.

## Worked toy — centered binomial (CBD)

Kyber-shaped writeups define a **centered binomial** $\mathrm{CBD}_\eta$: sample $2\eta$ bits $\{(a_i,b_i)\}$ uniform in $\{0,1\}$ and output [[1]](#ref-1)

$$
\sum_{i=0}^{\eta-1}(a_i - b_i).
$$

Plain English: flip a few fair coins, subtract two small counts, get a number near $0$.  
[[1]](#ref-1) also notes a $\mathrm{CBD}$ routine that turns uniform random bytes into polynomials with those coefficient laws.

**Teaching toy** (parameter $\eta=2$ — *not* claiming this is Kyber’s deployed $\eta$):

1. Draw four fair bits: $a_0,a_1$ and $b_0,b_1$.  
2. Output $e=(a_0+a_1)-(b_0+b_1)\in\{-2,-1,0,1,2\}$.

### Slow-motion example

Bits: $a=(1,0)$, $b=(0,1)$ → $e=(1+0)-(0+1)=0$.  
Another: $a=(1,1)$, $b=(0,0)$ → $e=2$.  
Another: $a=(0,0)$, $b=(1,1)$ → $e=-2$.

ML-KEM parameter sets publish concrete $\eta_1,\eta_2$ that select which centered-binomial widths generate small coefficients [[2]](#ref-2).

### Mid-page self-check

Is CBD the same as “pick a uniform random number mod $q$”?

<details><summary>Answer</summary>

No. Uniform mod $q$ is usually huge. CBD piles up a few $\pm 1$ coin flips so the result stays **near zero** [[1]](#ref-1).

</details>

## Where do the random bits come from?

- For Dilithium HW, sampling modules **fetch coefficients from a SHAKE/Keccak wrapper** (XOF output → sampling logic) [[3]](#ref-3).  
- For a Ring-Binary-LWE instruction-set accelerator, a **binary sampler** draws binary errors/polynomials from a **TRNG** into memory [[4]](#ref-4).  

The sampler’s job is still: **random bits → the coefficients the scheme needs** (small CBD values, binary bits, or rejected candidates).

## Same job, other recipes (so papers do not confuse you)

| Recipe | What the cited paper actually describes |
|--------|----------------------------------------|
| **CBD** [[1]](#ref-1) [[2]](#ref-2) | Kyber/ML-KEM small noise via centered binomial / $\mathcal{B}_\eta$ |
| **Rejection sampling** [[3]](#ref-3) | Dilithium: reject bad $s_1$/$s_2$ candidates from SHAKE; Sign may re-enter a **rejection loop** if checks fail |
| **Binary sampler** [[4]](#ref-4) | RBLWE-ENC: binary errors/polynomials from TRNG (`samp1` / `samp8` style instructions) |

All three are “samplers.” The shared slogan:

> Produce the **random coefficients** the scheme’s math assumes.

Details of Dilithium’s Sign control flow live on [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) [[3]](#ref-3).

## Bridge to hardware

[KEM accelerator anatomy](kem-accelerator-anatomy.md) is this curriculum’s map of recurring units. Matching named blocks in the cited HW papers:

- Dilithium: dedicated **sampling modules** beside the SHAKE wrapper [[3]](#ref-3).  
- RBLWE accelerator: a **Binary Sampler** building block [[4]](#ref-4).  

When you read “sampling module” in an FPGA paper, ask:

1. Which distribution? (CBD / binary / rejection)  
2. Where do bits come from? (SHAKE / TRNG)  
3. Is it one polynomial, or part of a Sign retry loop?

## Common confusions

- Sampler ≠ modular multiplier. Multipliers compute $ab\bmod q$; samplers **draw** random coefficients.  
- SHAKE output bits look uniform; CBD/rejection logic shapes them [[1]](#ref-1) [[3]](#ref-3).  
- Compressing ciphertext bits ([compress / encode](ciphertext-compress-encode.md)) is a later step — not sampling.

## Check yourself

1. In one sentence, what does a noise sampler do?  
<details><summary>Answer</summary>
It randomly produces the coefficients (noise / secrets / related samples) the scheme needs.
</details>

2. With $\eta=1$, bits $a_0=1$, $b_0=0$, what is $e$ in the CBD formula of [[1]](#ref-1)?  
<details><summary>Answer</summary>
$e=1-0=1$.
</details>

3. Why might Dilithium Sign “sample again”?  
<details><summary>Answer</summary>
[[3]](#ref-3): if correctness/security checks fail, the signature is re-computed (rejection loop); coefficient sampling can also reject candidates (e.g. $s_1$/$s_2$).
</details>

4. Name one HW paper’s sampler block from the table above.  
<details><summary>Answer</summary>
Dilithium sampling modules [[3]](#ref-3) or RBLWE Binary Sampler [[4]](#ref-4).
</details>

## Next steps

- Practice more LWE toys: [LWE](lwe.md) · [noisy linear equations](../bridge/noisy-linear-equations-lwe.md)  
- Follow the bit stream: [Hash / XOF](hash-xof-keccak.md)  
- See the chip map: [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Signatures that retry: [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md)  

## References

<a id="ref-1"></a>[1] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214). (§2: $\mathrm{CBD}_\eta$ definition and byte→polynomial sampling)

<a id="ref-2"></a>[2] T. B. Paiva *et al.*, “Tailorable codes for lattice-based KEMs with applications to compact ML-KEM instantiations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2025, no. 3, pp. 139–163, 2025, doi: [10.46586/tches.v2025.i3.139-163](https://doi.org/10.46586/tches.v2025.i3.139-163). (§3.1: $\eta_1,\eta_2$ select $\mathcal{B}_\eta$ widths)

<a id="ref-3"></a>[3] N. Gupta, A. Jati, A. Chattopadhyay, and G. Jha, “Lightweight hardware accelerator for post-quantum digital signature CRYSTALS-Dilithium,” *IEEE Trans. Circuits Syst. I*, vol. 70, no. 8, pp. 3234–3243, Aug. 2023, doi: [10.1109/TCSI.2023.3274599](https://doi.org/10.1109/TCSI.2023.3274599). (§II.B rejection loop; §III.D–E SHAKE wrapper + sampling modules / rejection sampling)

<a id="ref-4"></a>[4] P. He, T. Bao, and J. Xie, “High-performance instruction-set hardware accelerator for ring-binary-LWE-based lightweight PQC,” *IEEE Trans. Very Large Scale Integr. (VLSI) Syst.*, vol. 33, no. 5, pp. 1417–1421, May 2025, doi: [10.1109/TVLSI.2025.3538874](https://doi.org/10.1109/TVLSI.2025.3538874). (§III.G Binary Sampler; Table II `samp1`/`samp8`)
