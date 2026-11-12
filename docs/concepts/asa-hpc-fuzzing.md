# Algorithm subversion (ASA) and HPC fuzzing

**Prereqs:** [Side-channel threat model](../bridge/side-channel-threat-model.md) · [Public-key picture](../fundamentals/public-key-picture.md) · helpful: [Hash-based signatures](hash-based-signatures.md) · [Oil–vinegar multivariate](oil-vinegar-multivariate.md)  
**Next:** [Fault attacks on hash sigs](fault-attacks-hash-sigs.md) · [Crypto-agile SoC](crypto-agile-soc.md) · Track: [Hash-based signatures](../tracks/hash-based-signatures/ROADMAP.md) · [Multivariate](../tracks/multivariate/ROADMAP.md) · [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** hash-based-signatures · multivariate · pqc-hardware

**Learning goals.** After this page you can:

- Distinguish **algorithm subversion / Kleptography** from power SCA or fault injection  
- Explain why **hardware performance counters (HPCs)** can fingerprint tampered crypto code  
- Open the TCAD HPC-fuzzing leaf on hash / MQ tables with the right threat question  

## The one idea

Most curriculum SCA pages ask: *does the device leak secrets while running the real algorithm?*  
**Algorithm-substitution attacks (ASA)** ask a different question: *did someone ship a maliciously modified implementation* that still looks almost correct but weakens security (bad PRNG, shrunk parameters, swapped ciphers, …) [[1]](#ref-1)?

Classic slogan: **Kleptography** — crypto that hides a backdoor in the algorithm or its parameters.

| Threat | What changes | Typical evidence |
|--------|--------------|------------------|
| Power / EM SCA | Nothing in the code; physics leaks | Traces vs intermediates |
| Fault injection | Transient flips during execution | Wrong outputs / glitches |
| **ASA** | The **implementation or parameters** themselves | Behavior / counters / fuzz oracles |

## HPC fingerprint postcard

[[1]](#ref-1) detects subverted post-quantum **signature** implementations (Dilithium, Falcon, Rainbow, SPHINCS+, …) by watching **hardware performance counters** — how often micro-architectural events fire during `crypto_sign()` — then combining that with fuzzing-style probes.

Teaching moral:

1. Trusted and tampered binaries can hit different PC / HPC signatures even when tests still “pass.”  
2. Families differ: multivariate Rainbow-style code may expose different subversion knobs than SPHINCS+ tree parameters [[1]](#ref-1).  
3. This leaf is **detection / assurance**, not a new signature scheme.

### Mid-page self-check

If HPC fuzzing flags a Rainbow binary, did Rainbow’s math hardness break?

<details><summary>Answer</summary>

Not necessarily. The alert is about a **subverted implementation** (or parameters), not a new algebraic attack on the public MQ map.

</details>

## Where curriculum hangs the leaf

- [Hash-based](../tracks/hash-based-signatures/ROADMAP.md) — SPHINCS+ among ASA targets  
- [Multivariate](../tracks/multivariate/ROADMAP.md) — Rainbow among ASA targets (historical scheme)  
- [Hardware](../tracks/pqc-hardware/ROADMAP.md) — family HW tables (multi-family detection)

Read after you know Sign APIs for those families; you do **not** need a full OS security course first.

## Common confusions

- ASA ≠ side-channel leakage of an honest binary.  
- HPC ≠ “hash performance counter” — here it means **CPU hardware performance counters**.  
- Fuzzing here stresses / compares implementations; it is not information-set decoding.  
- Presence on the multivariate track does not revive Rainbow as a deployment recommendation.

## Check yourself

1. What does an ASA change that ordinary SCA does not?  
<details><summary>Answer</summary>
The algorithm implementation or security parameters (subversion), not only physical leakage of a correct implementation.
</details>

2. What sensor class does the curated TCAD leaf emphasize?  
<details><summary>Answer</summary>
Hardware performance counters (plus fuzzing-style measurement) [[1]](#ref-1).
</details>

## Next steps

- Family cards: [Hash-based signatures](hash-based-signatures.md) · [Oil–vinegar multivariate](oil-vinegar-multivariate.md)  
- [Crypto-agile SoC](crypto-agile-soc.md) — multi-family silicon (assurance ≠ agility)  
- Contrast: [Fault attacks on hash sigs](fault-attacks-hash-sigs.md) · [Masking shares](masking-shares.md) · [CED / composite-field Goppa](ced-composite-goppa.md)  
- Extract: `papers/tcad-pqc/fuzzinghardware-performance-counters-based-detection-of-algorithm-subversion-attacks-on-postquantum-signature-schemes/paper.md`  

## References

<a id="ref-1"></a>[1] A. B. Chowdhury, A. Mahapatra, D. Soni, and R. Karri, “Fuzzing+hardware performance counters-based detection of algorithm subversion attacks on postquantum signature schemes,” *IEEE Trans. Comput.-Aided Design Integr. Circuits Syst.*, vol. 42, no. 2, pp. 384–396, Feb. 2023, doi: [10.1109/TCAD.2022.3159749](https://doi.org/10.1109/TCAD.2022.3159749).
