# PQ signatures — Dilithium slogan

**Prereqs:** [Module-LWE](module-lwe.md) · [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md)  
**Next:** [KEM](kem.md) (contrast) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Contrast a KEM with a signature in one table, walk Dilithium’s Sign loop in plain English (including “try again”), and see why HW papers sweat both NTT and SHAKE.

## The one idea

So far the lattice track emphasized **KEMs**: agree on a fresh shared secret ([KEM](kem.md)).  
**Dilithium** (ML-DSA family) is a **signature** scheme: prove a message came from the secret-key holder [[1]](#ref-1).

It still uses module-lattice arithmetic and NTTs — so poly engines return — but the **API and control flow** are different [[1]](#ref-1).

| | KEM (e.g. ML-KEM) | Signature (Dilithium) [[1]](#ref-1) |
|--|-------------------|------------------------|
| Goal | Shared secret | Authenticate a message |
| Hot verbs | Encaps / Decaps | Sign / Verify |
| May retry? | Usually not for the API call itself | Sign may **reject and restart** |

## Sign in plain English

Think of a non-interactive “prove you know the secret” chat, hashed into a signature (Fiat–Shamir style), with an abort valve. Following [[1]](#ref-1):

1. **Sample** a masking vector $y$ (from SHAKE — [hash / XOF](hash-xof-keccak.md) + [samplers](noise-samplers.md)).  
2. Compute $w = \mathbf{A}y$ (matrix–vector of polynomials; NTT territory).  
3. Hash high bits of $w$ together with the message $M$ → challenge $c$.  
4. Mix with the secret: roughly $z = c\cdot s_1 + y$ (plus hints $h$).  
5. **Check** sizes / correctness.  
   - Pass → output signature $(c, z, h)$.  
   - Fail → **go back to step 1** (rejection loop) [[1]](#ref-1).

Verify recomputes what it can from the public key and signature, re-hashes, and checks matches and norms [[1]](#ref-1).

### Mid-page self-check

Why is “rejection” not a bug?

<details><summary>Answer</summary>

It is part of the design: discard signatures that would be too revealing or malformed, then try again with fresh masking [[1]](#ref-1).

</details>

## KeyGen / Verify (one glance)

- **KeyGen:** expand seeds → public matrix $\mathbf{A}$ and small secret vectors $s_1,s_2$; set $t=\mathbf{A}s_1+s_2$; publish a verification key; keep the signing key [[1]](#ref-1).  
- **Verify:** rebuild high bits, re-hash with $M$, accept if the challenge matches and norms are valid [[1]](#ref-1).

You do not need every polynomial name on this card — hold the **Sign retry** picture.

## What hardware papers optimize

Lightweight Dilithium accelerators often [[1]](#ref-1):

- **Share** one datapath across KeyGen / Sign / Verify to fit small FPGAs.  
- Build a serious **SHAKE** unit because Sign is hash-heavy.  
- Keep NTT / decompose helpers for the lattice arithmetic.  
- Care about memory when Sign retries (recompute vs store large $\mathbf{A}$).

Read ATP numbers with [area–time honesty](../bridge/area-time-power-honesty.md). SCA-aware Dilithium work needs the [side-channel](../bridge/side-channel-threat-model.md) vocabulary first.

## Common confusions

- Dilithium is **not** “Kyber Encrypt renamed” [[1]](#ref-1).  
- Rejection sampling here is about Sign checks — related toolkit to CBD, different purpose.  
- Falcon is another PQ signature with a **different** math stack — not this card.

## Check yourself

1. KEM vs signature — one sentence each.  
<details><summary>Answer</summary>
KEM establishes a shared secret; a signature authenticates a message [[1]](#ref-1).
</details>

2. What happens when Dilithium’s Sign checks fail?  
<details><summary>Answer</summary>
Reject and restart sampling / signing [[1]](#ref-1).
</details>

3. Why might Sign be slow even with a fast NTT?  
<details><summary>Answer</summary>
SHAKE/hash work and possible retries can dominate [[1]](#ref-1).
</details>

## Next steps

- [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md) · [Module-LWE](module-lwe.md)  
- [KEM](kem.md) to contrast APIs  
- [Side-channel threat model](../bridge/side-channel-threat-model.md) before SCA-Dilithium leaves  

## References

<a id="ref-1"></a>[1] N. Gupta, A. Jati, A. Chattopadhyay, and G. Jha, “Lightweight hardware accelerator for post-quantum digital signature CRYSTALS-Dilithium,” *IEEE Trans. Circuits Syst. I*, vol. 70, no. 8, pp. 3234–3243, Aug. 2023, doi: [10.1109/TCSI.2023.3274599](https://doi.org/10.1109/TCSI.2023.3274599).
