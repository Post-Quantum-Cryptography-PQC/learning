# Hash / XOF (Keccak–SHAKE slogan)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [KEM](kem.md) · helpful: [Noise samplers](noise-samplers.md)  
**Next:** [KEM accelerator anatomy](kem-accelerator-anatomy.md) · [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) · [Side-channel threat model](../bridge/side-channel-threat-model.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Use the Dilithium accelerator extract to name SHAKE-128/256 jobs, absorb/squeeze modes, and why Sign schedules care about Keccak as much as NTT.

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| SHAKE-128/256 roles in Dilithium; unified wrapper modes | TCAS-I Dilithium — §III.D SHAKE (`papers/tcas-i-pqc/lightweight-hardware-accelerator-for-post-quantum-digital-signature-crystals-dilithium/paper.md`) |
| Sign uses SHAKE-256 for $y$; expand $\mathbf{A},s_1,s_2$ with SHAKE-128 variants | same file — §II.B Protocol Description |
| Sampling modules only fetch from Keccak wrapper | same file — §III.E Sampling Modules |
| FO / KDF hashes sit next to masked Kyber CCA decapsulation | TCHES masked Kyber — §2 Kyber KEM / Algorithm 7 pointer (`.../masking-kyber-.../paper.md`) |

## Why this card exists

Without §III.D of the Dilithium extract, “hash domain” in accelerator talks is vague. That section is an explicit HW postcard for Keccak-based XOFs.

## What the Dilithium extract says SHAKE is for

§III.D: Dilithium uses **SHAKE-128** and **SHAKE-256** XOFs from SHA-3 / Keccak, with small domain variants.

| Job (from §II.B + §III.D) | Typical XOF |
|---------------------------|-------------|
| Expand public seed $\rho$ → matrix $\mathbf{A}$; noise seeds → $s_1,s_2$; masking vector $y$ | SHAKE-128 variants / SHAKE-256 as stated in extract |
| Hashing $H$, challenge $c$, seed derivation | SHAKE-256 variants |

§III.D’s **unified SHAKE wrapper** exposes modes the curriculum should name:

1. Absorb then one squeeze  
2. Squeeze only (needed when rejection sampling asks for more bits — unknown squeeze count)  
3. Read Keccak state (reuse 1600-bit state without extra copies)

Absorb path in the extract: 64-bit chunks, rate/padding handled in control FSMs — enough detail to see why Dilithium HW is **hash-heavy**, not only NTT-heavy.

### Mid-page self-check

Why does mode “squeeze only” matter for Dilithium sampling?

<details><summary>Answer</summary>

Rejection sampling may need more XOF output without re-absorbing; §III.D calls this out explicitly.

</details>

## Link to Kyber / FO (masked-Kyber extract)

Masked Kyber §2 reminds that CCA Kyber wraps CPA PKE with a Fujisaki–Okamoto-style transform; hashes $G$, $H$, $\mathrm{KDF}$ appear in decapsulation (Algorithm 7 in that extract). Pedagogy moral only: **FO paths are hash-shaped** and become masking targets — details stay on the [masking](masking-shares.md) card.

## Common confusions

- SHAKE is an **XOF** (variable output), not “AES with a new name.”  
- A fast NTT with a slow SHAKE still yields a slow Dilithium Sign (see parallel timeline remarks in TCAS-I §III.C).  
- Poly-mul TCAD papers may barely mention SHAKE — they optimize NTT/CWM leaves ([poly-mul engines](poly-mul-engines.md)), while full Sign/KEM chips cannot ignore this card.

## Check yourself

1. Name two Dilithium objects expanded from SHAKE in §II.B.  
<details><summary>Answer</summary>
Examples: matrix $\mathbf{A}$, vectors $s_1$/$s_2$, masking $y$, challenge hashing — any two from the extract.
</details>

2. What are the three SHAKE wrapper modes in §III.D?  
<details><summary>Answer</summary>
Absorb+squeeze; squeeze-only; read Keccak state.
</details>

3. True or false: the TCAD Kyber poly-mul extract is the primary source for this card.  
<details><summary>Answer</summary>
False — this card is anchored on the Dilithium §III.D / §II.B extract; TCAD is about NTT/CWM.
</details>

## Next steps

- [Noise samplers](noise-samplers.md) · [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)
