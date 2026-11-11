# PQ signatures — Dilithium slogan

**Prereqs:** [Module-LWE](module-lwe.md) · [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md)  
**Next:** [KEM](kem.md) (contrast) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Retell KeyGen/Sign/Verify from the TCAS-I Dilithium `paper.md`, including the Sign rejection loop and why §III.D SHAKE + §III.E sampling dominate HW cost discussions.

**Sources (`paper.md` anchors):**

| Idea on this card | Extract |
|-------------------|---------|
| KeyGen / Sign / Verify algorithms | TCAS-I Dilithium — §II.B Protocol Description (`papers/tcas-i-pqc/lightweight-hardware-accelerator-for-post-quantum-digital-signature-crystals-dilithium/paper.md`) |
| Shared KeyGen+Sign+Verify datapath; rejection vs storing $\mathbf{A}$ | same — §III.A–B Architecture / Memory |
| SHAKE wrapper; sampling modules | same — §III.D–E |
| Area×Time on Zynq / small LUT budget | same — Abstract + §IV |

## Why this card exists

That extract is a **signature** accelerator, not a KEM. §II.B is the protocol postcard this curriculum needs before Dilithium HW leaves.

## Protocol as written in §II.B

1. **KeyGen:** seeds $\rho,\rho'$ → SHAKE expand matrix $\mathbf{A}$ and noise vectors $s_1,s_2$; set $t=\mathbf{A}s_1+s_2$; publish $pk$, keep $sk$.  
2. **Sign$(sk,M)$:** sample masking vector $y$ (SHAKE-256); $w=\mathbf{A}y$; hash high-order bits $w_1$ with $M$ → challenge $c$; $z=cs_1+y$; also hints $h$. If checks fail → **rejection loop** (re-compute). Else output $(c,z,h)$.  
3. **Verify:** recompute high bits from $\mathbf{A}z-ct_1$, re-hash with $M$, check challenge match and norm of $z$.

This is the Fiat–Shamir-with-aborts **shape** newcomers should hold: commit-like $w$ → hash challenge → respond → **abort/retry** if needed.

### Mid-page self-check

Is Sign the same control flow as Kyber Encaps?

<details><summary>Answer</summary>

No. Encaps agrees on a KEM shared secret; Sign authenticates a message and may reject/retry (§II.B).

</details>

## What the HW extract emphasizes

- §III.A: **one** combined architecture for KeyGen/Sign/Verify (small Zynq fit — Abstract’s ~13.9k LUT story).  
- §III.B: Sign’s rejection loop drives the memory trade-off (store full $\mathbf{A}$ vs recompute).  
- §III.D–E: SHAKE + sampling control are first-class modules — see [hash / XOF](hash-xof-keccak.md) and [samplers](noise-samplers.md).  
- §III.F–H: Decompose/Power2Round, modular reduction, NTT — lattice arithmetic shared with KEM engines, different top FSM.

## Common confusions

- ML-KEM vs Dilithium/ML-DSA: KEM vs signature (this extract’s title is explicit).  
- “Rejection sampling” here is the Sign loop / coefficient filters in §III.E — related toolkit to CBD, different API.  
- Falcon is out of scope for this card (different `paper.md` cluster).

## Check yourself

1. What triggers Dilithium’s rejection loop in §II.B?  
<details><summary>Answer</summary>
Failed correctness/security checks on the candidate signature — then re-compute.
</details>

2. Why store full $\mathbf{A}$ in their Sign design (§III.B)?  
<details><summary>Answer</summary>
Multiple rejections make recomputing $\mathbf{A}$ expensive; they trade RAM for cycles.
</details>

3. Name two modules §III.D–E dedicate to randomness/hashing.  
<details><summary>Answer</summary>
Unified SHAKE wrapper; sampling modules that pull coefficients from it.
</details>

## Next steps

- [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md) · [Module-LWE](module-lwe.md)  
- [Side-channel threat model](../bridge/side-channel-threat-model.md) before SCA-Dilithium leaves  
- Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)
