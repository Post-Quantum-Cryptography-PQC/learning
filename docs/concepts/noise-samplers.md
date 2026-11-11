# Noise samplers

**Prereqs:** [Probability (gentle)](../fundamentals/probability-gentle.md) · [LWE](lwe.md) · helpful: [Module-LWE](module-lwe.md)  
**Next:** [Ciphertext compress / encode](ciphertext-compress-encode.md) · [Hash / XOF](hash-xof-keccak.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Restate CBD sampling as written for Kyber-family schemes, contrast Dilithium’s XOF-fed rejection sampling, and spot a binary sampler block in a lightweight Ring-Binary-LWE accelerator — all from in-repo `paper.md` extracts.

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| CBD definition $a_i-b_i$ sums | TCHES masked Kyber — §2 Background (`papers/tches-pqc/masking-kyber-first-and-higher-order-implementations/paper.md`) |
| ML-KEM $\mathcal{B}_{\eta}$ noise + compress bit widths | TCHES tailorable codes — §3.1 Parameters (`.../tailorable-codes-for-lattice-based-kems-.../paper.md`) |
| Dilithium Sign: SHAKE → $y$, rejection loop | TCAS-I Dilithium accelerator — §II.B Protocol, §III.E Sampling (`.../lightweight-hardware-accelerator-...-dilithium/paper.md`) |
| Binary sampler / `samp1`·`samp8` instructions | TVLSI RBLWE instruction-set accelerator — §III.G Binary Sampler, Table II (`.../High-Performance Instruction-Set.../paper.md`) |

## Why this card exists

Accelerator and masking papers assume you already know how coefficients get **small and random**. The extracts below spell that out; this card only retells it for newcomers (no large verbatim paste).

## CBD — centered binomial (Kyber / ML-KEM line)

From the masked-Kyber extract (§2): for positive integer $\eta$, sample $2\eta$ bits $\{(a_i,b_i)\}$ uniform in $\{0,1\}$ and output

$$
\sum_{i=0}^{\eta-1}(a_i - b_i).
$$

That is $\mathrm{CBD}_\eta$. The same extract notes a $\mathrm{CBD}$ routine that turns uniform bytes into polynomials with those coefficient laws. Tailorable-codes §3.1 names the ML-KEM parameters $\eta_1,\eta_2$ that pick which CBD widths feed KeyGen/Encrypt noise.

**Newcomer moral:** noise is **small on purpose**; CBD is one concrete recipe used by Kyber-shaped KEMs.

### Mid-page self-check

Does CBD draw uniform coefficients in $\{0,\ldots,q-1\}$?

<details><summary>Answer</summary>

No. It draws **small** integers near $0$ (difference of bit counts). Uniform mod $q$ would not match the LWE “small $e$” story.

</details>

## Dilithium — sampling modules + rejection (TCAS-I extract)

§II.B Sign: expand a masking vector $y$ with SHAKE-256, form $w=\mathbf{A}y$, hash high bits of $w$ with the message to get challenge $c$, set $z=cs_1+y$, then **re-compute in a rejection loop** if correctness/security checks fail.

§III.E: four sampling logics (matrix $\mathbf{A}$, $s_1$/$s_2$, challenge $c$, masking $y$) all consume a SHAKE/XOF stream; the HW “sampler” is mostly **control that accepts/rejects coefficients** from that stream (Listing 1 in the extract shows rejection sampling for $s_1$/$s_2$).

**Newcomer moral:** Dilithium Sign is hash-heavy and may **retry**; samplers are not only CBD.

## Binary sampler — RBLWE lightweight line (TVLSI extract)

RBLWE-ENC uses **binary** secrets/errors (§II.A Table I). The accelerator’s §III.G **Binary Sampler** draws binary polynomials/errors from a TRNG into RAM; ISA opcodes `samp1` / `samp8` (Table II) expose that block. §II.C still frames the hot path as a **schoolbook-style** poly-mul reformulation — sampling is a separate building block beside the mul core.

**Newcomer moral:** “Sampler” can mean CBD, rejection-from-SHAKE, or binary TRNG bits — read which scheme you are in.

## Bridge to other cards

- Bytes for CBD / Dilithium samples often come from [hash / XOF](hash-xof-keccak.md).  
- After noise + arithmetic, Kyber **compresses** coefficients ([compress / encode](ciphertext-compress-encode.md)).  
- Anatomy lists Sampler next to NTT/hash ([kem-accelerator-anatomy](kem-accelerator-anatomy.md)).

## Check yourself

1. Write the CBD output formula from the masked-Kyber §2 extract in words.  
<details><summary>Answer</summary>
Sum of $\eta$ terms $(a_i-b_i)$ with random bits $a_i,b_i$.
</details>

2. Where does the Dilithium TCAS-I extract put the rejection loop?  
<details><summary>Answer</summary>
In Sign (§II.B): if checks fail, re-compute the signature.
</details>

3. What does TVLSI §III.G’s binary sampler produce?  
<details><summary>Answer</summary>
Binary errors/polynomials (via TRNG), not CBD$_\eta$ over large $q$.
</details>

## Next steps

- [Hash / XOF](hash-xof-keccak.md) · [Ciphertext compress / encode](ciphertext-compress-encode.md)  
- [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md)  
- Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)
