# Hash-based signatures (WOTS+, Merkle, SPHINCS+)

**Prereqs:** [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · [Hash / XOF](hash-xof-keccak.md) · [Public-key picture](../fundamentals/public-key-picture.md)  
**Next:** [Fault attacks on hash-based signatures](fault-attacks-hash-sigs.md) · Track: [Hash-based signatures](../tracks/hash-based-signatures/ROADMAP.md) · [PQC hardware § hash leaves](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** hash-based-signatures · pqc-hardware

**Learning goals.** After this page you can:

- Place WOTS+, Merkle trees, XMSS, FORS, and SPHINCS+ / SLH-DSA in one ladder  
- Say what “stateless hash-based signature” leans on (hashes, not lattices/codes)  
- Open curated SPHINCS+ / SLH-DSA HW extracts without drowning in acronyms  

## The one idea

Lattice and code KEMs hide secrets behind noisy equations or sparse decoding.  
**Hash-based signatures** build Sign/Verify from **hash chains and trees** whose security story is “hashes behave like random oracles / collision resistance,” not Module-LWE.

NIST’s standardized family is often nicknamed **SPHINCS+**; the federal name is **SLH-DSA** [[4]](#ref-4). Curated HW papers implement that stack end-to-end [[1]](#ref-1) [[4]](#ref-4).

| Layer | Slogan | Role |
|-------|--------|------|
| **Hash / XOF** | Fingerprint or stretch bits | Building block ([Hash / XOF](hash-xof-keccak.md)) |
| **WOTS+** | One-time signature from hash chains | Sign one message “digest chunk” |
| **Merkle tree / XMSS** | Many one-time keys under one root | Reuse a tree of WOTS+ leaves |
| **FORS** | Few-time signature from trees | SPHINCS+ few-time layer |
| **SPHINCS+ / SLH-DSA** | Stateless hypertree of the above | Full public-key signature |

## Toy 1 — a hash chain (WOTS+ intuition)

Pick a secret seed $s_0$ and a public hash $H$. Build a chain

$$
s_0 \xrightarrow{H} s_1 \xrightarrow{H} s_2 \xrightarrow{H}\cdots\xrightarrow{H} s_w.
$$

Publish $s_w$ as a **public key piece**. To “sign” a small integer $i$, reveal $s_i$ (or a prefix of the chain). The verifier hashes forward until they match $s_w$.

**WOTS+** packages many such chains so you can sign a digest once [[1]](#ref-1) [[2]](#ref-2). After that one use, that leaf is spent — hence **one-time**.

### Mid-page self-check

If I reuse the same WOTS+ leaf for two different digests, what goes wrong conceptually?

<details><summary>Answer</summary>

Two openings of the same chain can let an observer stitch a forgery for a third digest. One-time leaves must not be reused.

</details>

## Toy 2 — Merkle authentication path

Many WOTS+ public keys sit as **leaves** of a binary tree. Interior nodes are hashes of children; the **root** is the compact public value.

To prove leaf $i$ belongs to the tree, publish the **authentication path** (sibling hashes up to the root). Verifiers recompute the root and compare [[2]](#ref-2).

**XMSS** (extended Merkle signature scheme) is this idea with careful addressing and WOTS+ leaves. [[2]](#ref-2) builds an **XMSS / EMSS** FPGA accelerator tailored to SPHINCS+ parameters (e.g. $h'=8$, $w=16$, $n=32$).

## FORS and the hypertree (SPHINCS+ shape)

SPHINCS+ does **not** keep a stateful “next unused leaf” counter in the way classical XMSS deployments often do. Instead it layers:

1. A **few-time** signature (FORS — forest of random subsets) for the message.  
2. A **hypertree** of Merkle/XMSS-like trees that authenticates FORS public keys up to a master root [[1]](#ref-1).

[[1]](#ref-1) emphasizes engineering levers that match this shape: on-the-fly WOTS+ public-key generation, FORS subtree grouping, and streaming large signatures so the FPGA need not buffer the full tens-of-kilobyte signature at once.

## SLH-DSA on a CPU (RVSLH postcard)

[[4]](#ref-4) accelerates **SLH-DSA** on a customized RISC-V by speeding **SHAKE-256 / Keccak** (SIMD register file + contiguous layout that removes `memcpy` of seeds/addresses). Teaching moral: for hash-based signatures, **hash throughput often dominates** arithmetic.

## Common confusions

- Hash-based ≠ “just hash the message and call it a signature.” You need one-time / few-time structure + trees.  
- **XMSS** can be stateful; **SPHINCS+ / SLH-DSA** targets a **stateless** deployment model [[1]](#ref-1) [[4]](#ref-4).  
- Dilithium ([PQ signatures slogan](pq-signatures-dilithium.md)) is a **lattice** signature — different family.  
- Faults during signing are a separate threat — see [fault card](fault-attacks-hash-sigs.md) [[3]](#ref-3).

## Check yourself

1. Name the one-time building block under Merkle leaves.  
<details><summary>Answer</summary>
WOTS+ (hash-chain one-time signature).
</details>

2. What compact value does a Merkle tree publish?  
<details><summary>Answer</summary>
The root hash (plus scheme-specific public metadata).
</details>

3. Why might an SLH-DSA accelerator sweat Keccak more than NTT?  
<details><summary>Answer</summary>
The scheme is hash/XOF-heavy; [[4]](#ref-4) focuses on SHAKE-256 SIMD, not lattice NTT.
</details>

## Next steps

- [Fault attacks on hash-based signatures](fault-attacks-hash-sigs.md)  
- Track leaves: [Hash-based signatures ROADMAP](../tracks/hash-based-signatures/ROADMAP.md)  
- HW fork: [PQC hardware — hash family leaves](../tracks/pqc-hardware/ROADMAP.md)

## References

<a id="ref-1"></a>[1] T. Huang, J. Lu, D. Liu, Z. Luo, C. Cheng, et al., “An efficient and reconfigurable post-quantum crypto-processor for SPHINCS+,” *IEEE Trans. Circuits Syst. I*, 2025, doi: [10.1109/TCSI.2025.3544341](https://doi.org/10.1109/TCSI.2025.3544341).

<a id="ref-2"></a>[2] B. Yu, K. Zhao, W. Wang, Z. Liu, and H. Huang, “Efficient hardware implementation of extended Merkle signature scheme for SPHINCS+,” *IEEE Trans. Circuits Syst. I*, 2026, doi: [10.1109/TCSI.2026.3667602](https://doi.org/10.1109/TCSI.2026.3667602).

<a id="ref-3"></a>[3] A. Genêt, “On protecting SPHINCS+ against fault attacks,” *IACR Trans. Cryptogr. Hardw. Embed. Syst.*, vol. 2023, no. 2, pp. 80–114, 2023, doi: [10.46586/tches.v2023.i2.80-114](https://doi.org/10.46586/tches.v2023.i2.80-114).

<a id="ref-4"></a>[4] Z. Ye, X. Li, C. Wang, R. C. C. Cheung, and K. Huang, “RVSLH: Acceleration of postquantum standard SLH-DSA with customized RISC-V processor,” *IEEE Trans. Very Large Scale Integr. (VLSI) Syst.*, 2025, doi: [10.1109/TVLSI.2025.3543352](https://doi.org/10.1109/TVLSI.2025.3543352).
