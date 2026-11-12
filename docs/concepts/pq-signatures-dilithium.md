# PQ signatures — Dilithium slogan

**Prereqs:** [Module-LWE](module-lwe.md) · [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md)  
**Next:** [KEM](kem.md) (contrast) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Tracks: [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** After this page you can:

- Contrast a KEM with a signature in one table
- Walk Dilithium’s Sign loop as written in [[1]](#ref-1) (including “try again”)
- See why that HW paper sweats both NTT and SHAKE

## The one idea

So far the lattice track emphasized **KEMs**: agree on a fresh shared secret ([KEM](kem.md)).  
[[1]](#ref-1) implements **CRYSTALS-Dilithium**, a **post-quantum digital signature** with algorithms KeyGen, Sign, and Verify.

It still uses polynomial / NTT arithmetic — so poly engines return — but the **API is Sign/Verify**, not Encaps/Decaps [[1]](#ref-1).

| | KEM (curriculum) | Dilithium in [[1]](#ref-1) |
|--|-------------------|------------------------|
| Goal | Shared secret | Authenticate a message via $sig$ |
| Hot verbs | Encaps / Decaps | KeyGen / Sign / Verify |
| May retry? | Not the focus here | Sign has an explicit **rejection loop** |

## Sign as written in [[1]](#ref-1) §II.B

1. Generate masking vector $y$ using **SHAKE-256**.  
2. Compute $w=\mathbf{A}y$.  
3. Hash the high-order bits $w_1$ with message $M$ to get challenge $c$.  
4. Set $z=c s_1 + y$; also generate hints $h$ for the verifier.  
5. If correctness and security checks pass → output $sig=(c,z,h)$; **otherwise re-compute** (rejection loop) [[1]](#ref-1).

Verify (same section): compute $\mathbf{A}z - c t_1$, take high-order bits as $w_1$, re-hash with $M$ to a challenge, accept if challenges match and the norm of $z$ is valid [[1]](#ref-1).

(Curriculum note: this is the same *shape* often nicknamed “Fiat–Shamir with aborts” in textbooks; [[1]](#ref-1) does **not** use that phrase — we follow their KeyGen/Sign/Verify wording.)

### Mid-page self-check

Why is “rejection” not a bug in [[1]](#ref-1)?

<details><summary>Answer</summary>

§II.B: if checks fail, the signature is re-computed in the rejection loop — that is part of Sign, not a hardware glitch.

</details>

## KeyGen (one glance) [[1]](#ref-1)

Expand public seed $\rho$ and noise seed $\rho'$ with a SHAKE-128 variant to get matrix $\mathbf{A}$ and vectors $s_1,s_2$; set $t=\mathbf{A}s_1+s_2$; publish $pk$, keep $sk$ [[1]](#ref-1).

## What the HW paper optimizes [[1]](#ref-1)

- **One combined architecture** for KeyGen, Sign, and Verify with shared modules (small Zynq fit; ~13.9k LUT-class resource story in abstract/results).  
- **SHAKE wrapper** with absorb/squeeze/state-read modes; sampling modules fetch from Keccak [[1]](#ref-1).  
- **Memory trade-off** under Sign’s multiple rejections: store full $\mathbf{A}$ once vs recompute partial rows [[1]](#ref-1).  
- NTT/INTT, Decompose/Power2Round, modular reduction as arithmetic helpers [[1]](#ref-1).  

Read ATP numbers with [area–time honesty](../bridge/area-time-power-honesty.md). SCA-aware Dilithium work needs the [side-channel](../bridge/side-channel-threat-model.md) vocabulary first (not claimed in [[1]](#ref-1)’s main results).

## Common confusions

- Dilithium is a **signature** accelerator in [[1]](#ref-1), not a Kyber KEM.  
- Rejection appears both as Sign’s loop and as coefficient rejection sampling from SHAKE [[1]](#ref-1).  
- Falcon is another PQ signature — not this card / not [[1]](#ref-1).

## Check yourself

1. List the three Dilithium algorithms in [[1]](#ref-1).  
<details><summary>Answer</summary>
KeyGen, Sign, Verify.
</details>

2. What happens when Sign’s checks fail in §II.B?  
<details><summary>Answer</summary>
Re-compute the signature (rejection loop).
</details>

3. Why might Sign be slow even with a fast NTT, according to [[1]](#ref-1)’s design emphasis?  
<details><summary>Answer</summary>
SHAKE/sampling dominate timelines; rejections may repeat work / affect memory strategy.
</details>

## Next steps

- [Hash / XOF](hash-xof-keccak.md) · [Noise samplers](noise-samplers.md) · [Module-LWE](module-lwe.md)  
- [KEM](kem.md) to contrast APIs  
- [Side-channel threat model](../bridge/side-channel-threat-model.md) before SCA-Dilithium leaves  

## References

<a id="ref-1"></a>[1] N. Gupta, A. Jati, A. Chattopadhyay, and G. Jha, “Lightweight hardware accelerator for post-quantum digital signature CRYSTALS-Dilithium,” *IEEE Trans. Circuits Syst. I*, vol. 70, no. 8, pp. 3234–3243, Aug. 2023, doi: [10.1109/TCSI.2023.3274599](https://doi.org/10.1109/TCSI.2023.3274599).
