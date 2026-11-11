# Hash / XOF (Keccak–SHAKE slogan)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Noise samplers](noise-samplers.md) · [KEM](kem.md)  
**Next:** [Noise samplers](noise-samplers.md) · [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Tell a hash from an XOF in plain words, see why PQC schemes expand a short seed into long bitstreams, and recognize SHAKE/Keccak as the usual engine — including why Sign HW can be “hash-bound.”

## The one idea

Lattice schemes need **lots of random-looking bits**: matrix entries, noise coins, challenges, shared-secret digests.  
Storing all of that randomness would be huge. Instead they store a **short seed** and **stretch** it with a public function.

That stretch tool is usually an **XOF** (extendable-output function). Dilithium’s HW description uses **SHAKE-128** and **SHAKE-256** XOFs of the SHA-3 family, based on the **Keccak** permutation [[1]](#ref-1).

| Tool | Picture | Output length |
|------|---------|---------------|
| **Hash** | Fingerprint of a message | Fixed (e.g. 256 bits) |
| **XOF (SHAKE)** | Same sponge family, “keep squeezing” | As long as you need |

## Story — seed in, polynomials out

Per Dilithium’s protocol/HW extract [[1]](#ref-1):

1. Start from short seeds (e.g. public seed $\rho$, noise seed $\rho'$).  
2. Expand with SHAKE variants (absorb domain separator + input, then squeeze).  
3. Sampling modules turn XOF output into matrix $\mathbf{A}$, vectors $s_1,s_2$, challenge material, masking vector, etc.  

So: **XOF = fire hose of bits**; **sampler = shapes those bits into scheme objects** ([noise samplers](noise-samplers.md)).

### Tiny mental demo (not real crypto sizes)

Seed `01 02 …`.  
After absorb, squeeze 16 bits: `11010011 01011100`.  
A CBD toy with $\eta=1$ might consume two bits as $(a_0,b_0)$ — that CBD shaping is from Kyber-family text [[2]](#ref-2), not from the Dilithium SHAKE section.  
Real schemes squeeze far more; the *pattern* (seed → XOF → coefficients) matches [[1]](#ref-1).

### Mid-page self-check

Does SHAKE itself make coefficients “small”?

<details><summary>Answer</summary>

No. SHAKE outputs bits/bytes for later sampling logic [[1]](#ref-1). Smallness comes from CBD / rejection rules (see [noise samplers](noise-samplers.md), [[2]](#ref-2) for CBD).

</details>

## What [[1]](#ref-1) assigns to SHAKE-128 vs SHAKE-256

From the Dilithium accelerator paper’s SHAKE section [[1]](#ref-1):

- **SHAKE-256** (and variants): derive random seeds from an initial seed; hashing $H$; generate challenge $c$.  
- **SHAKE-128** variants: generate matrix $\mathbf{A}$, vectors $s_1$, $s_2$, and masking vector $y_1$.  

(Sign’s narrative in the same paper also says the masking vector $y$ is generated using SHAKE-256 [[1]](#ref-1)—read the section you are in; both statements appear in that extract.)

## Why Dilithium HW talks about SHAKE so much

[[1]](#ref-1) implements a unified SHAKE wrapper with three modes:

1. Absorb then one squeeze (`mode = 1`)  
2. Squeeze only (`mode = 2`) — useful when more output is needed and the squeeze count is unknown (e.g. rejection sampling)  
3. Read Keccak state (`mode = 3`) — reuse the 1600-bit state without extra copies  

Sampling modules in that design **only** contain sampling/control logic and fetch coefficients from this Keccak wrapper [[1]](#ref-1). A chip can be fast at NTT and still slow at Sign if the hash/XOF pipe is busy or retries.

## KEMs use hashes too

Masked Kyber focuses on CCA **decapsulation** obtained via a Fujisaki–Okamoto-style transform and notes that details of $G$, $H$, and $\mathrm{KDF}$ are in the Kyber specification it cites [[2]](#ref-2).  
Curriculum moral only: **CCA KEMs also rely on public hashes/XOFs around encaps/decaps**, separate from the LWE noise sampler — do not treat [[2]](#ref-2) as defining those hash algorithms itself.

## Common confusions

- SHAKE ≠ AES. Different job (stretch/fingerprint vs encrypt blocks).  
- “Hash domain” vs “poly domain” on a chip = two factories ([accelerator anatomy](kem-accelerator-anatomy.md)).  
- Faster NTT does not automatically mean faster Sign if SHAKE is the bottleneck [[1]](#ref-1).

## Check yourself

1. Hash vs XOF — one sentence each.  
<details><summary>Answer</summary>
Hash: fixed-length fingerprint. XOF: squeeze as many bits as you need from one input [[1]](#ref-1).
</details>

2. Name one Dilithium object expanded with SHAKE-128 variants in [[1]](#ref-1).  
<details><summary>Answer</summary>
Matrix $\mathbf{A}$, or $s_1$/$s_2$, or masking vector $y_1$.
</details>

3. Why does [[1]](#ref-1) need a squeeze-only mode?  
<details><summary>Answer</summary>
Rejection sampling may need more XOF output without knowing the squeeze count in advance.
</details>

## Next steps

- [Noise samplers](noise-samplers.md) — shape the bits  
- [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) — Sign’s hash-heavy flow  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md) — where the hash unit sits  

## References

<a id="ref-1"></a>[1] N. Gupta, A. Jati, A. Chattopadhyay, and G. Jha, “Lightweight hardware accelerator for post-quantum digital signature CRYSTALS-Dilithium,” *IEEE Trans. Circuits Syst. I*, vol. 70, no. 8, pp. 3234–3243, Aug. 2023, doi: [10.1109/TCSI.2023.3274599](https://doi.org/10.1109/TCSI.2023.3274599). (§II.B seeds/SHAKE roles; §III.D three wrapper modes; §III.E sampling from Keccak)

<a id="ref-2"></a>[2] J. W. Bos, M. Gourjon, J. Renes, T. Schneider, and C. van Vredendaal, “Masking Kyber: First- and higher-order implementations,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2021, no. 4, pp. 173–214, 2021, doi: [10.46586/tches.v2021.i4.173-214](https://doi.org/10.46586/tches.v2021.i4.173-214). (§2: CBD from uniform bytes; FO CCA wrap; $G$/$H$/$\mathrm{KDF}$ deferred to Kyber spec [SAB+20])
