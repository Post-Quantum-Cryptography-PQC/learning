# Isogenies, CSIDH, and SIKE (historical)

**Prereqs:** [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Public-key picture](../fundamentals/public-key-picture.md) · [Orientation — Challenges](../orientation/challenges.md)  
**Next:** Track: [Isogeny](../tracks/isogeny/ROADMAP.md) · [PQC hardware § isogeny leaves](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** isogeny · pqc-hardware

**Learning goals.** After this page you can:

- Give a newcomer picture of an **isogeny** as a structured map between elliptic curves  
- Separate **SIKE** (broken NIST candidate KEM) from **CSIDH / CTIDH** (group-action style)  
- Open curated SIKE/CTIDH extracts with an explicit **historical / broken-KEM** label where needed  

## The one idea

Most PQC families in this curriculum hide secrets in **codes**, **lattices**, **hashes**, or **multivariate maps**.  
**Isogeny** cryptography hides secrets in **paths** (isogenies) between elliptic curves over finite fields.

Very rough postcard:

- An elliptic curve is a set of points with a geometric addition law (details deferred).  
- An **isogeny** is a special map $\phi: E\to E'$ that respects that structure.  
- A secret can be “which isogeny / which walk,” while the public object is a curve (or related data) that does not obviously reveal the walk.

This card stays qualitative so you can read HW/SW leaves; it is **not** a course in elliptic curves.

## Two deployment shapes

| Name | Role in the lab corpus | Status slogan for learners |
|------|------------------------|----------------------------|
| **SIKE** | Isogeny-based **KEM** with FPGA/ASIC-style accelerators in curated leaves [[2]](#ref-2) [[3]](#ref-3) | **Broken** as a NIST PQC KEM path — study as **history + implementation archaeology** |
| **CSIDH** | Non-interactive key exchange via class-group actions on supersingular curves; tiny keys, timing risks | Still a research object; needs **constant-time** care [[1]](#ref-1) |
| **CTIDH** | Faster **constant-time** CSIDH via new key space + CT evaluation [[1]](#ref-1) | Implementation / CT research leaf |

### Mid-page self-check

Should a new project treat SIKE accelerators as a drop-in ML-KEM alternative?

<details><summary>Answer</summary>

No. SIKE’s NIST KEM story ended in break; curated SIKE papers are labeled historical on the [isogeny track](../tracks/isogeny/ROADMAP.md). Prefer ML-KEM / HQC for modern KEM deployment study.

</details>

## Why HW papers still exist

Before the break, SIKE needed heavy modular arithmetic (large prime fields, Montgomery multipliers, isogeny pipelines). Papers such as [[2]](#ref-2) [[3]](#ref-3) optimized area–time on FPGA.  
They remain useful for **arithmetic accelerator** reading — with the security outcome labeled honestly.

## CSIDH / CTIDH (constant-time angle)

CSIDH offers small keys but naive evaluation can be **variable-time**, leaking through timing [[1]](#ref-1).  
**CTIDH** couples a redesigned key space with a constant-time group-action algorithm and reports large cycle improvements vs prior CT CSIDH software [[1]](#ref-1).

Teaching moral: isogeny performance papers often trade **mathematics**, **constant-time scheduling**, and **big-integer / field HW**.

## Common confusions

- Isogeny ≠ lattice NTT.  
- SIKE ≠ CSIDH (different protocols and security histories).  
- “Elliptic curves” here are **not** classical ECDH security — the hard problem is isogeny-related, and SIKE’s concrete KEM was broken.  
- CTIDH constant-time ≠ fault immunity ([fault card](fault-attacks-hash-sigs.md) is a different family).

## Check yourself

1. What hidden object does isogeny crypto roughly use?  
<details><summary>Answer</summary>
A secret isogeny / walk between curves (structure-preserving map).
</details>

2. How should SIKE leaves be labeled in this curriculum?  
<details><summary>Answer</summary>
Historical / broken-KEM context — not a modern KEM recommendation.
</details>

3. What problem does CTIDH emphasize beyond raw speed?  
<details><summary>Answer</summary>
Constant-time evaluation of the CSIDH group action [[1]](#ref-1).
</details>

## Next steps

- [Isogeny ROADMAP](../tracks/isogeny/ROADMAP.md) (historical leaves)  
- Modern KEMs: [KEM](kem.md) · [Lattice track](../tracks/lattice-lwe/ROADMAP.md) · [Code-based track](../tracks/code-based-kems/ROADMAP.md)  

## References

<a id="ref-1"></a>[1] G. Banegas et al., “CTIDH: faster constant-time CSIDH,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 351–387, 2021, doi: [10.46586/tches.v2021.i4.351-387](https://doi.org/10.46586/tches.v2021.i4.351-387).

<a id="ref-2"></a>[2] P. M. C. Massolino, P. Longa, J. Renes, and L. Batina, “A compact and scalable hardware/software co-design of SIKE,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2020, no. 2, pp. 245–271, 2020, doi: [10.13154/tches.v2020.i2.245-271](https://doi.org/10.13154/tches.v2020.i2.245-271).

<a id="ref-3"></a>[3] High-performance SIKE FPGA accelerators — see TCAS-II / TVLSI leaves on the [isogeny](../tracks/isogeny/ROADMAP.md) and [hardware](../tracks/pqc-hardware/ROADMAP.md) tracks.
