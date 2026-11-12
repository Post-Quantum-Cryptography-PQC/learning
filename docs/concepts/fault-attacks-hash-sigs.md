# Fault attacks on hash-based signatures

**Prereqs:** [Hash-based signatures](hash-based-signatures.md) · [Side-channel threat model](../bridge/side-channel-threat-model.md)  
**Next:** Track: [Hash-based signatures](../tracks/hash-based-signatures/ROADMAP.md) · [Masking shares](masking-shares.md) (different threat)  
**Tracks:** hash-based-signatures · pqc-hardware

**Learning goals.** After this page you can:

- Separate **side-channel leakage** from **fault injection**  
- Sketch why a faulty SPHINCS+ signature can still verify  
- Open the curated TCHES fault paper without treating it as an SCA masking paper  

## The one idea

[Side-channel threat model](../bridge/side-channel-threat-model.md) already splits:

| Threat | Adversary gets… | Typical countermeasure slogan |
|--------|-----------------|-------------------------------|
| **SCA** | Power / EM / timing traces | Masking, shuffling |
| **FIA (faults)** | Wrong intermediates from bit flips, clock glitches, lasers, … | Detection, redundancy, recompute |

[[1]](#ref-1) studies **faults on SPHINCS+ signing**: flip bits during Sign, then ask whether the **faulty signature still verifies** under the honest public key — and what that leaks about one-time material.

This is **not** the same as masking Kyber shares.

## Tree-grafting intuition (teaching sketch)

Hash-based signatures authenticate many one-time keys under Merkle / hypertree structure ([hash-based card](hash-based-signatures.md)).  
A classical line of attack (Castelnovi et al., extended by [[1]](#ref-1) to SPHINCS+) is often nicknamed **tree grafting**:

1. Induce a fault while the signer builds an authentication path / hypertree layer.  
2. Obtain a signature that **still verifies** but corresponds to a **different** internal opening than the honest tree intended.  
3. Combine honest and faulty openings to forge on a colliding path — security collapses far below the nominal hash bits [[1]](#ref-1).

[[1]](#ref-1) stresses that SPHINCS+ features meant to harden other attacks (randomized signing, including the public key in the signature hash) do **not** automatically stop this fault story: a random bit flip during signing often still yields a verifiable faulty signature.

### Mid-page self-check

If Verify accepts a signature produced under a fault, is the scheme “fine”?

<details><summary>Answer</summary>

No. Acceptance under a fault can be exactly the bad event that enables grafting / forgery analysis in [[1]](#ref-1). Verify succeeding is part of the attack surface, not a clean bill of health.

</details>

## What mitigations try to do (high level)

[[1]](#ref-1) discusses counters such as detecting faults, recomputing, and noting that **WOTS+ caching** of layers/branches only helps **marginally** against random bit-flip grafting in their model. Teaching moral: caching for speed ≠ fault security.

Curriculum rule: we describe **threat shape and paper claims**, not lab recipes for inducing faults.

## Common confusions

- Fault ≠ side-channel power analysis.  
- Masking / shuffling target SCA; they are not automatic FIA fixes.  
- “Constant-time” software does not imply fault resilience.  
- Dilithium rejection loops are a **lattice Sign** mechanism — unrelated to SPHINCS+ grafting [[1]](#ref-1).

## Check yourself

1. Name the two physical threat classes from the SCA bridge that this card separates.  
<details><summary>Answer</summary>
Side-channel attacks (SCA) vs fault injection attacks (FIA).
</details>

2. Why is “signature still verifies after a fault” dangerous for hash-based trees?  
<details><summary>Answer</summary>
It can expose alternate openings usable for tree-grafting forgeries [[1]](#ref-1).
</details>

3. Point to the curated extract for this topic.  
<details><summary>Answer</summary>
`papers/tches-pqc/on-protecting-sphincs-against-fault-attacks/paper.md` (Genêt, TCHES 2023).
</details>

## Next steps

- Read the extract abstract + threat sections in the TCHES leaf on the [hash track](../tracks/hash-based-signatures/ROADMAP.md).  
- Contrast with [masking](masking-shares.md) / [shuffling](shuffling-hiding.md) for SCA.  

## References

<a id="ref-1"></a>[1] A. Genêt, “On protecting SPHINCS+ against fault attacks,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2023, no. 2, pp. 80–114, 2023, doi: [10.46586/tches.v2023.i2.80-114](https://doi.org/10.46586/tches.v2023.i2.80-114).
