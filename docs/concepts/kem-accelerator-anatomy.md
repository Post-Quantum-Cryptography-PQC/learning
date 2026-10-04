# KEM accelerator anatomy

**Prereqs:** [NTT butterfly](ntt-butterfly.md) · [Polynomial multiply engines](poly-mul-engines.md) · [KEM](kem.md) · helpful: [Module-LWE](module-lwe.md)  
**Next:** Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md) · [Lattice / LWE](../tracks/lattice-lwe/ROADMAP.md) · [index](../index.md)  
**Tracks:** pqc-hardware

**Learning goals.** Sketch what a lattice KEM accelerator must do for Encaps/Decaps, name the recurring units (NTT, PWM, sampling, hash), and separate leaf modules from system architecture (FSM, HW/SW split, configurable parameters).

## Why this card exists

Modules (modmul, butterfly) are necessary but not sufficient. IEEE “Kyber / ML-KEM accelerator” papers compose those modules into a **datapath + controller** that runs the KEM API. This card is the anatomy poster so new architectures map onto a shared skeleton.

## Recall the software API

From [KEM](kem.md):

| Call | Job |
|------|-----|
| **KeyGen** | Make public/secret key material |
| **Encaps** | Produce ciphertext + shared secret |
| **Decaps** | Recover shared secret from ciphertext + secret key |

Hardware may accelerate all three, or only the hot Encaps/Decaps inner loops, with KeyGen partly in software.

## Recurring units (lattice / ML-KEM-shaped)

| Unit | Role |
|------|------|
| **NTT / INTT engine** | Fast poly transforms ([butterfly](ntt-butterfly.md)) |
| **PWM / modmul lanes** | Pointwise coefficient products ([modmul](modular-multiplier.md)) |
| **Sampler** | CBD / rejection / other noise sampling into coefficients |
| **Hash / XOF (often Keccak)** | Seed expand, FO transform, shared-secret KDF |
| **Compress / encode** | Pack polynomials into ciphertext / key bytes |
| **Memory + DMA** | Banks for polys, twiddles, intermediates |
| **Control FSM** | Sequence Encaps/Decaps steps; maybe runtime parameter $k$ |

**Anatomy slogan:** hash domain and poly domain are two “factories”; good architectures keep both busy (dual-issue / superscalar leaves are optional advanced reading — deferred on this track).

### Leaf module vs full KEM accelerator

| Scope | What ships | What you still need for Encaps/Decaps |
|-------|------------|----------------------------------------|
| **Leaf** (e.g. Barrett modmul, dual-butterfly + SRAM) | Hot arithmetic + local memory | Sampler, hash/XOF, compress, top-level FSM, KEM API |
| **Poly-mul engine** | NTT / CWM / INTT as a block | Glue into Module-LWE matrix–vector steps; still not FO hashing alone |
| **Full KEM accelerator** | End-to-end (or HW/SW) KeyGen / Encaps / Decaps path | Matches the table above |

A TCAD-style “polynomial multiplication accelerator for Kyber” is typically a **strong leaf / engine**, not a complete KEM SoC. When reading claims, ask: cycles for **one poly mul**, or for **full Encaps**?

### Mid-page self-check

If a paper only speeds up modular multiply, is it already a KEM accelerator?

<details><summary>Answer</summary>

No — that is a leaf module. A KEM accelerator composes engines, memory, hashing, and control around Encaps/Decaps.

</details>

## Controllers and configurability

- **Fixed ML-KEM-512-only** core vs **configurable $k$** (module rank) — more muxing, wider address maps.  
- **HW/SW co-design:** CPU (e.g. Ibex-class) + tightly coupled accelerator for poly/hash; software owns protocol glue.  
- **Security extras:** masking, shuffling — separate cautionary leaves (not core path here).

## How IEEE exploration should grow this card

When you digest a new TCAS-II / circuit paper:

1. List which **units** it touches.  
2. Ask whether novelty is a **new leaf**, a **new schedule**, or a **new system topology**.  
3. If a reusable idea is untaught, add/deepen a concept (modmul variant, memory schedule, dual-issue, …) **before** an explainer.  
4. Hang the paper as an optional ROADMAP leaf.

Do **not** auto-add every `docs/PAPERS.md` circuit row to the core path.

## Story recap

1. KEM API → sequence of poly/hash/sample/encode steps.  
2. Accelerators are compositions of named units + FSM + memory.  
3. Leaf wins ≠ system wins.  
4. New IEEE architectures feed **modules first**, then leaves.

## Check yourself

1. Name four units you expect in a lattice KEM accelerator.  
<details><summary>Answer</summary>
Any four of: NTT/INTT, PWM/modmul, sampler, hash/XOF, compress/encode, memory/DMA, control FSM.
</details>

2. What is a HW/SW split?  
<details><summary>Answer</summary>
CPU runs some protocol/software; a tightly coupled accelerator runs hot poly/hash kernels.
</details>

3. Should every new accelerator paper become a mandatory track step?  
<details><summary>Answer</summary>
No — papers are optional leaves; reusable architectures become concepts.
</details>

4. Is a “Kyber poly-mul accelerator” the same as a full Kyber KEM chip?  
<details><summary>Answer</summary>
Usually no — it is an engine leaf (NTT/CWM/INTT). Full KEM still needs sampling, hashing, encoding, and top-level control.
</details>

## Next steps

- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Theory: [Module-LWE](module-lwe.md) · [Lattice / LWE roadmap](../tracks/lattice-lwe/ROADMAP.md)  
- [NTT parallel memory](ntt-parallel-memory.md)  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
- Lab RTL (when you implement): `projects/papers/` via `research-circuit-implementation`  
- Deferred leaves: explainer for the TCAS-II modmul brief; Super-K / CIM / SCA — see [pedagogy-gaps.yaml](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/graph/pedagogy-gaps.yaml)  
