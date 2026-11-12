# Carryless polynomial multiply over $\mathbb{F}_2$ (HQC / BIKE-shaped)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [Polynomials with wraparound](../fundamentals/polynomials-wraparound.md) · [Quasi-cyclic codes](quasi-cyclic-codes.md) · helpful: [Poly-mul engines](poly-mul-engines.md)  
**Next:** [KEM](kem.md) · [Crypto-agile SoC](crypto-agile-soc.md) · [Poly-mul engines](poly-mul-engines.md) (lattice contrast) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** code-based-kems · pqc-hardware

**Learning goals.** After this page you can:

- Contrast **carryless** $\mathbb{F}_2[x]$ multiply with integer or $\mathbb{Z}_q$ poly mul  
- See why HQC / BIKE-style KEMs need big binary polynomial products  
- Open Ibex HQC CLMUL leaves **and** BIKE sparse–dense polymul leaves with shared vocabulary  

## The one idea

Lattice engines often multiply in $\mathbb{Z}_q[x]/(x^n+1)$ with NTTs ([poly-mul engines](poly-mul-engines.md)).  
**HQC**-shaped code-based KEMs multiply **binary** polynomials — coefficients in $\{0,1\}$, addition is XOR, and there is **no integer carry** [[1]](#ref-1).

That product is often called **carryless multiply** (CPU ISA: `CLMUL`-style ops). Hardware can share a carryless datapath for:

- Large-degree products in $\mathbb{F}_2[x]/(x^n-1)$ (circulant / QC view)  
- Smaller $\mathbb{F}_{2^8}$ multiplies used inside HQC’s coding layers [[1]](#ref-1)

## Toy — multiply without carries

In $\mathbb{F}_2[x]$:

$$
(1+x)\cdot(1+x)=1+x^2
$$

because the middle $x+x$ cancels (XOR), not “$2x$.”  
Schoolbook still does AND (bit product) + XOR (sum); Karatsuba-style splits reduce AND count at the cost of more XORs and scheduling [[1]](#ref-1).

### Mid-page self-check

Is Barrett / Montgomery reduction the star of this multiply?

<details><summary>Answer</summary>

Not for pure $\mathbb{F}_2[x]$ carryless products — there is no odd prime $q$. Reduction is polynomial modular wrap ($x^n-1$ / ring choice), not $\mathbb{Z}_q$ Barrett.

</details>

## Why IoT papers couple RISC-V + CLMUL

[[1]](#ref-1) co-optimizes HQC on a 32-bit **Ibex** core with tightly coupled accelerators:

- Unified **Karatsuba carryless** multiplier for large PM and $\mathbb{F}_{2^8}$  
- Keccak-$f[1600]$ accelerator for XOF/hash needs  
- Software **TC3 + Karatsuba** hybrid with careful schoolbook thresholds  

Teaching moral: HQC performance is often **binary poly mul + hashing**, not NTT butterflies.

## Relation to QC codes

Quasi-cyclic structure means multiplies by fixed vectors become **circulant** actions — still binary polynomial arithmetic under the hood ([quasi-cyclic codes](quasi-cyclic-codes.md)). Sparse secrets help key size; the encaps/decaps hot path still leans on these products and the code’s decoder [[1]](#ref-1).

## BIKE cousin — sparse × dense pipelines

**BIKE**-shaped KEMs also live in binary / QC polynomial arithmetic, but many HW leaves optimize **sparse–dense** products: one operand has low Hamming weight, so only a few rotated copies of the dense operand are XORed [[2]](#ref-2).

| Theme | HQC Ibex / LEAP-style | BIKE BPM-style [[2]](#ref-2) |
|-------|----------------------|-----------------------------|
| Algebra | Carryless $\mathbb{F}_2[x]$ / QC ring | Same neighborhood |
| Hot trick | Unified CLMUL / Karatsuba (dense×dense + small-field) | **Inter- / inner-wise sparsity** + block-by-block pipeline |
| Read next | Ibex HQC · LEAP sparse HQC | BIKE binary polymul · area–time BIKE KEM |

**Slogan:** same XOR-multiply world; BIKE papers often schedule around **support sparsity**, not only wide CLMUL units.

## Common confusions

- Carryless ≠ “ignore modular reduction forever” — you still reduce in the polynomial ring.  
- HQC CLMUL ≠ Kyber NTT.  
- BIKE sparsity pipeline ≠ a different hardness assumption — it is an implementation schedule for sparse×dense products [[2]](#ref-2).  
- $\mathbb{F}_{2^8}$ mul inside HQC is related but smaller than the big QC polymul [[1]](#ref-1).  
- This card does not teach HQC’s full decoder (RS/RM concatenation) — see code-based track leaves later.

## Check yourself

1. What replaces “+ with carry” for bit coefficients?  
<details><summary>Answer</summary>
XOR (characteristic 2).
</details>

2. Name two tightly coupled pieces in the Ibex HQC leaf.  
<details><summary>Answer</summary>
Carryless (Karatsuba) multiplier and Keccak-$f[1600]$ accelerator [[1]](#ref-1).
</details>

3. Which track defers deep HQC HW until lattice core is walkable?  
<details><summary>Answer</summary>
[PQC hardware ROADMAP](../tracks/pqc-hardware/ROADMAP.md) (code-based HW fork note).
</details>

## Next steps

- [Quasi-cyclic codes](quasi-cyclic-codes.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [Crypto-agile SoC](crypto-agile-soc.md)  
- Contrast lattice engines: [Poly-mul engines](poly-mul-engines.md) · [NTT butterfly](ntt-butterfly.md)  
- Contrast McEliece GF CED: [CED / composite-field Goppa](ced-composite-goppa.md)  
- [Code-based KEMs ROADMAP](../tracks/code-based-kems/ROADMAP.md) · [PQC hardware § code](../tracks/pqc-hardware/ROADMAP.md#family-hw-leaves-code)  
- Extract (HQC): `papers/tcas-ii-pqc/a-hardware-software-co-optimization-of-hqc-using-tightly-coupled-accelerators-on-a-32-bit-ibex-core/paper.md`  
- Extract (BIKE): `papers/tvlsi-pqc/A Scalable and Efficient Architecture for Binary Polynomial Multiplication in BIKE Utilizing Inter-Inner-Wise Sparsity and Block-by-Block Pipeline/paper.md`  

## References

<a id="ref-1"></a>[1] S. C. Seo and Y. Kim, “A hardware/software co-optimization of HQC using tightly-coupled accelerators on a 32-bit Ibex core,” *IEEE Trans. Circuits Syst. II*, vol. 73, no. 5, pp. 583–587, May 2026, doi: [10.1109/TCSII.2026.3668482](https://doi.org/10.1109/TCSII.2026.3668482).

<a id="ref-2"></a>[2] J. Hou, J. Wang, Y. Meng, F. Zhang, Y. Su, and C. Yang, “A scalable and efficient architecture for binary polynomial multiplication in BIKE utilizing inter-/inner-wise sparsity and block-by-block pipeline,” *IEEE Trans. Very Large Scale Integr. (VLSI) Syst.*, vol. 33, no. 5, pp. 1457–1461, May 2025, doi: [10.1109/TVLSI.2024.3510541](https://doi.org/10.1109/TVLSI.2024.3510541).
