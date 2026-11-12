# Crypto-agile multi-family SoC (PQPU / RePQC / ARV-Q)

**Prereqs:** [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [KEM](kem.md) · helpful: [Carryless $\mathbb{F}_2$ polymul](carryless-polymul-f2.md) · [Hash / XOF](hash-xof-keccak.md)  
**Next:** Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md) · [Code-based](../tracks/code-based-kems/ROADMAP.md) · [Hash-based](../tracks/hash-based-signatures/ROADMAP.md) · [Multivariate](../tracks/multivariate/ROADMAP.md)  
**Tracks:** pqc-hardware · code-based-kems · hash-based-signatures · multivariate

**Learning goals.** After this page you can:

- Explain **crypto-agility** as “one chip, many PQC families / parameter sets”  
- Contrast a **single-scheme accelerator** with a **multi-family SoC**  
- Open PQPU / RePQC / ARV-Q / PHOENIX leaves with shared vocabulary  

## The one idea

A lattice **KEM accelerator** often hard-wires ML-KEM-shaped NTT + sampler + hash ([anatomy](kem-accelerator-anatomy.md)).  
A **crypto-agile SoC** (or tightly coupled multi-scheme processor) instead keeps **shared datapaths** — arithmetic clusters, hash/XOF engines, memory banks, task schedulers — and **reconfigures** them for several NIST-era schemes across families [[1]](#ref-1) [[2]](#ref-2).

| Scope | Example | What you measure |
|-------|---------|------------------|
| Leaf / single scheme | Kyber NTT only, HQC CLMUL only | Cycles for that kernel or that scheme |
| Agile sharing | PHOENIX (ML-KEM + HQC) | Shared modules + dual-family throughput |
| Multi-family silicon | PQPU, RePQC, ARV-Q | Many schemes on one taped-out / FPGA fabric |

## Postcard architecture

Papers in this class usually describe:

1. **Coefficient / vector datapaths** that can be NTT-ish *or* binary / GF / matrix modes.  
2. **Hash / PRNG clusters** (Keccak, sometimes AES/ChaCha) shared by every scheme.  
3. **Task-level scheduling** — config → run → communicate → update — so Encaps of scheme A and Sign of scheme B reuse the same PE array.  
4. **Per-algorithm microcode / TLS-style task lists** rather than a single fixed FSM.

Teaching moral: agility trades some peak efficiency for **migration flexibility** when standards and parameters move [[1]](#ref-1).

### Mid-page self-check

If PQPU reports Kyber-512 kOPS, does that number also describe its SPHINCS+ speed?

<details><summary>Answer</summary>

No. Multi-family chips quote **per-scheme** throughput/energy. Hash-based Sign is often orders of magnitude slower than lattice KEM on the same die.

</details>

## How curriculum lists these leaves

Under rule 9, a multi-family extract may appear on **every family track it substantially implements**, labeled *multi-family silicon*:

- Code: BIKE / HQC / McEliece rows on PQPU / RePQC / ARV-Q  
- Hash: SPHINCS+ on PQPU  
- Multivariate: Rainbow on RePQC (historical scheme — see [oil–vinegar](oil-vinegar-multivariate.md))  
- Hardware: full table under family HW sections  

## Common confusions

- Agile SoC ≠ “one number beats every paper.” Normalize process / voltage before comparing [[1]](#ref-1).  
- Supporting Rainbow or SIKE for study ≠ recommending deployment.  
- PHOENIX-style **two-family sharing** is agility at smaller scope than PQPU/RePQC.  
- SCA stories differ: some agile chips prioritize throughput over deep masking — read the security section.

## Check yourself

1. What does crypto-agility buy that a Kyber-only core does not?  
<details><summary>Answer</summary>
Runtime (or firmware) support for multiple schemes / families on shared silicon.
</details>

2. Name two curated multi-family leaves.  
<details><summary>Answer</summary>
PQPU [[1]](#ref-1) and RePQC [[2]](#ref-2) (ARV-Q / PHOENIX are related agile/sharing leaves).
</details>

## Next steps

- [PQC hardware ROADMAP](../tracks/pqc-hardware/ROADMAP.md)  
- Extracts under JSSC / TCAS-I agile rows on family track tables  

## References

<a id="ref-1"></a>[1] PQPU — agile post-quantum crypto processor across multiple mathematical problems, *IEEE J. Solid-State Circuits* — `papers/jssc-pqc/pqpu-a-4-4-uj-op-69-4-kops-agile-post-quantum-crypto-processor-across-multiple-mathematical-problems/paper.md`.  

<a id="ref-2"></a>[2] RePQC — post-quantum crypto processor for multiple mathematical problems, *IEEE J. Solid-State Circuits* — `papers/jssc-pqc/repqc-a-3-4-uj-op-48-kops-post-quantum-crypto-processor-for-multiple-mathematical-problems/paper.md`.
