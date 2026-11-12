# Oil–vinegar and multivariate signatures (UOV / MAYO)

**Prereqs:** [Vectors and matrices](../fundamentals/vectors-matrices.md) · [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Public-key picture](../fundamentals/public-key-picture.md)  
**Next:** [MinRank in the head](minrank-mpcitH.md) · Track: [Multivariate](../tracks/multivariate/ROADMAP.md)  
**Tracks:** multivariate · pqc-hardware

**Learning goals.** After this page you can:

- Explain oil–vinegar as “secret partition of variables + quadratic public map”  
- Place UOV, Rainbow (historical NIST finalist), and MAYO on one postcard  
- Open curated AVX2 / GPU / threshold MAYO extracts with the right vocabulary  

## The one idea

**Multivariate** public-key signatures publish a system of **quadratic** equations over a small field. Signing uses a secret trapdoor that makes solving easy; verifying plugs the signature into the public polynomials [[1]](#ref-1).

The classic trapdoor slogan is **oil–vinegar** (OV):

1. Split variables into **oil** and **vinegar** sets.  
2. Build secret quadratic polynomials that are easy to invert when vinegar values are chosen first.  
3. Hide that structure with secret linear maps; publish the messy-looking public system.

**UOV** (Unbalanced Oil–Vinegar) is the modern workhorse of this family [[1]](#ref-1). **Rainbow** layered several OV stages (NIST Round-3 multivariate finalist; later cryptanalysis drove parameter / deployment caution — treat Rainbow leaves as historical + implementation study [[1]](#ref-1)).

## Toy picture (tiny, not secure)

Suppose three variables $(x,y,z)$ over $\mathbb{F}_q$. Call $\{x,y\}$ “oil” and $\{z\}$ “vinegar.”  
A secret polynomial might look linear in oil once $z$ is fixed — so you can solve for oil after picking vinegar. Public key = that system after a secret change of variables, so outsiders see only “random-looking” quadratics.

Real UOV uses many more variables and equations; the postcard is the **partition + hide** idea [[1]](#ref-1).

### Mid-page self-check

Is the public key a list of linear equations?

<details><summary>Answer</summary>

No. Public multivariate maps are **quadratic** (degree 2). Linearity appears only in the secret oil world after vinegar is fixed.

</details>

## What Sign looks like (UOV slogan)

High-level UOV Sign shape used in software papers [[1]](#ref-1):

1. Sample vinegar values (and related randomness).  
2. Build / solve a **linear** system in the oil variables (Gaussian elimination or faster block methods).  
3. Apply secret linear maps to produce the signature vector.  
4. Verify by evaluating the public quadratics on the signature and checking a hash relation.

[[1]](#ref-1) speeds the oil linear solve with **block matrix inversion (BMI)** and studies **message-independent precomputation** (dangerous if misused with key leakage — they also warn about equivalent-key / PV issues).

## MAYO in one paragraph

**MAYO** is a UOV-style multivariate signature engineered for smaller keys / practical performance; curated leaves include **threshold MAYO** (multi-party signing) [[2]](#ref-2) and a **GPU** implementation with matrix-computation reordering [[3]](#ref-3).  
Teaching moral: MAYO ≈ “UOV family engineering,” not a new hardness world.

## Side channels (pointer)

Matrix–vector products during multivariate Sign can leak under CPA; [[4]](#ref-4) recovers equivalent keys from Rainbow/UOV-style leakage. Read after [side-channel threat model](../bridge/side-channel-threat-model.md).

## Common confusions

- Multivariate ≠ “any system of equations” — PQC usually means **quadratic** maps over finite fields.  
- UOV oil–vinegar ≠ lattice Module-LWE.  
- Rainbow’s NIST history ≠ “safe to deploy yesterday’s parameters.” Prefer UOV/MAYO leaves for forward-looking study [[1]](#ref-1) [[2]](#ref-2).  
- MinRank is a **related** hardness story used in other MQ / rank designs — see [MinRank card](minrank-mpcitH.md).

## Check yourself

1. What secret partition does oil–vinegar name?  
<details><summary>Answer</summary>
Oil variables vs vinegar variables.
</details>

2. What does the verifier mainly evaluate?  
<details><summary>Answer</summary>
The public quadratic polynomials (plus scheme hash checks).
</details>

3. Name one curated MAYO leaf theme.  
<details><summary>Answer</summary>
Threshold MAYO [[2]](#ref-2) or GPU MAYO with matrix reordering [[3]](#ref-3).
</details>

## Next steps

- [MinRank in the head](minrank-mpcitH.md)  
- [Multivariate ROADMAP](../tracks/multivariate/ROADMAP.md)  
- SCA leaf: TCHES MQ signature attacks (see track table)

## References

<a id="ref-1"></a>[1] K.-A. Shim, S. Lee, and N. Koo, “Efficient implementations of Rainbow and UOV using AVX2,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2022, no. 1, pp. 245–269, 2022, doi: [10.46586/tches.v2022.i1.245-269](https://doi.org/10.46586/tches.v2022.i1.245-269).

<a id="ref-2"></a>[2] D. F. Aranha, G. Borin, S. Celi, and G. Niot, “Optimizing and implementing threshold MAYO,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2026, no. 3, pp. 489–517, 2026, doi: [10.46586/tches.v2026.i3.489-517](https://doi.org/10.46586/tches.v2026.i3.489-517).

<a id="ref-3"></a>[3] H. Chen, J. Huang, S. Jin, R. C. C. Cheung, D. Chen, and W. Dai, “High-throughput GPU design and implementation of MAYO with matrix computation reordering,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2026, no. 4, pp. 496–521, 2026, doi: [10.46586/tches.v2026.i4.496-521](https://doi.org/10.46586/tches.v2026.i4.496-521).

<a id="ref-4"></a>[4] A. Park, K.-A. Shim, N. Koo, and D.-G. Han, “Side-channel attacks on post-quantum signature schemes based on multivariate quadratic equations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2018, no. 3, pp. 500–523, 2018, doi: [10.13154/tches.v2018.i3.500-523](https://doi.org/10.13154/tches.v2018.i3.500-523).
