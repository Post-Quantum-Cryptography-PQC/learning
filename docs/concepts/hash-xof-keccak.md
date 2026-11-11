# Hash / XOF (Keccak–SHAKE slogan)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Noise samplers](noise-samplers.md) · [KEM](kem.md)  
**Next:** [Noise samplers](noise-samplers.md) · [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md)  
**Tracks:** lattice-lwe · pqc-hardware

**Learning goals.** Tell a hash from an XOF in plain words, see why PQC schemes expand a short seed into long bitstreams, and recognize SHAKE/Keccak as the usual engine — including why Sign HW can be “hash-bound.”

## The one idea

Lattice schemes need **lots of random-looking bits**: matrix entries, noise coins, challenges, shared-secret digests.  
Storing all of that randomness would be huge. Instead they store a **short seed** and **stretch** it with a public function.

That stretch tool is usually an **XOF** (extendable-output function). In ML-KEM / Dilithium land the XOF is often **SHAKE**, built from the **Keccak** sponge.

| Tool | Picture | Output length |
|------|---------|---------------|
| **Hash** | Fingerprint of a message | Fixed (e.g. 256 bits) |
| **XOF (SHAKE)** | Same sponge family, “keep squeezing” | As long as you need |

## Story — seed in, polynomials out

1. Alice picks a short random seed (a few dozen bytes).  
2. SHAKE **absorbs** the seed (plus a domain label so “matrix expand” ≠ “noise expand”).  
3. SHAKE **squeezes** thousands of output bits.  
4. A [noise sampler](noise-samplers.md) or unpacker turns bits into coefficients.

So: **XOF = fire hose of bits**; **sampler = shapes those bits into small noise**.

### Tiny mental demo (not real crypto sizes)

Seed `01 02 …`.  
After absorb, squeeze 16 bits: `11010011 01011100`.  
CBD with $\eta=1$ might consume two bits at a time as $(a_0,b_0)$ pairs → a few small $e$ values.  
Real schemes squeeze far more; the *pattern* is the same.

### Mid-page self-check

Does SHAKE itself make coefficients “small”?

<details><summary>Answer</summary>

No. SHAKE outputs bits that look uniform. CBD / rejection / packing rules make them small or structured. See [noise samplers](noise-samplers.md).

</details>

## Why Dilithium HW talks about SHAKE so much

Signing repeatedly:

- expands matrices / masks from seeds,  
- hashes message material into a **challenge**,  
- may **retry** and ask for more XOF output.

So a Dilithium accelerator often has a serious **SHAKE/Keccak unit** next to NTT. A chip can be fast at butterflies and still slow at Sign if the hash pipe starves.

Hardware wrappers typically support at least:

1. Absorb then squeeze  
2. Squeeze more (extra bits after a rejection)  
3. Sometimes expose the Keccak state so other blocks reuse it

You only need those three slogans to read HW block diagrams.

## KEMs use hashes too

Kyber/ML-KEM CCA transforms use hashes / KDFs around encapsulation (often called $G$, $H$, KDF in specs). Same moral: **public hash functions bind transcripts and derive keys** — separate from the LWE noise sampler, but same Keccak family appears often.

## Common confusions

- SHAKE ≠ AES. Different job (stretch/fingerprint vs encrypt blocks).  
- “Hash domain” vs “poly domain” on a chip = two factories ([accelerator anatomy](kem-accelerator-anatomy.md)).  
- Faster NTT does not automatically mean faster Sign if SHAKE is the bottleneck.

## Check yourself

1. Hash vs XOF — one sentence each.  
<details><summary>Answer</summary>
Hash: fixed-length fingerprint. XOF: squeeze as many bits as you need from one input.
</details>

2. Why expand from a seed instead of storing a whole matrix?  
<details><summary>Answer</summary>
Seeds are short; XOF regenerates long public material when needed.
</details>

3. Who turns SHAKE bits into CBD noise?  
<details><summary>Answer</summary>
The noise sampler (this curriculum’s previous/next card).
</details>

## Next steps

- [Noise samplers](noise-samplers.md) — shape the bits  
- [PQ signatures (Dilithium slogan)](pq-signatures-dilithium.md) — Sign’s hash-heavy flow  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md) — where the hash unit sits  

## Where this is grounded (optional)

Dilithium TCAS-I `paper.md` §II.B / §III.D–E (SHAKE jobs and wrapper modes); masked Kyber §2 (FO/KDF next to CCA decapsulation). Read those after the slogans click.
