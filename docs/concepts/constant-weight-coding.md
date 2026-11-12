# Constant-weight coding (code-based)

**Prereqs:** [Hamming metric](hamming-metric.md) · [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Niederreiter](niederreiter.md)  
**Next:** [Code-based signatures](code-based-signatures.md) · [Niederreiter](niederreiter.md) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
**Tracks:** code-based-kems · pqc-hardware

**Learning goals.** After this page you can:

- Explain why code-based schemes map messages into **fixed Hamming-weight** bitstrings  
- Separate the **coding engine** (encode/decode constant-weight) from the crypto trapdoor  
- Open constant-weight HW leaves without treating them as full KEMs  

## The one idea

Many code-based designs need a short message (or hash payload) turned into a **sparse** vector of exact weight $t$ — or the reverse map after decoding [[1]](#ref-1).  
That map is **constant-weight coding** (also: combinatorial / binomial coding, Sendrier-style enumerative coding, and related engines).

It is **not** the public-key trapdoor. It is a **format layer**:

| Layer | Job |
|-------|-----|
| Constant-weight codec | Bits ↔ fixed-weight vectors (or lists of support indices) |
| Code / KEM / signature | Use those vectors as errors, messages, or signature ingredients |

Niederreiter’s “map the message into sparse $e$” step is the textbook place this appears ([Niederreiter](niederreiter.md)). Signature schemes such as CFS / QC-LDGM / LEDAsig also lean on constant-weight encodings in the pipeline ([code-based signatures](code-based-signatures.md)).

## Toy picture

Suppose you need weight-$2$ vectors of length $4$. There are $\binom{4}{2}=6$ such vectors.  
A codec numbers them $0,\ldots,5$ and maps a short integer (or bitstring) to one support pair, e.g. $3 \mapsto (1,0,1,0)$.  
Real schemes use huge $\binom{n}{t}$ tables or streaming algorithms so they never materialize the full list [[1]](#ref-1).

### Mid-page self-check

If a paper’s “constant-weight engine” is fast, did it break syndrome decoding?

<details><summary>Answer</summary>

No. Speeding the **format** layer does not solve the hard sparse-decoding problem. It only makes KeyGen / Encaps / Sign packaging cheaper.

</details>

## Why hardware papers care

[[1]](#ref-1) builds compact **constant-weight coding engines** aimed at code-based cryptography on reconfigurable devices: encode and decode fixed-weight strings with small area and predictable latency.  
Teaching moral: when a BIKE / McEliece / signature datapath quotes “CW encode” cycles, that block is this card — then follow the scheme’s own decoder / polymul leaves.

## Common confusions

- Constant-weight ≠ error-correcting code by itself.  
- Fixed weight $t$ ≠ “random Bernoulli noise” (different samplers; HQC/BIKE may use related but not identical formats).  
- Enumerative coding algorithms are engineering detail — schemes differ; read the paper’s CW section slowly.  
- CED / reliability papers are a different topic (fault detection on arithmetic), not CW coding.

## Check yourself

1. What does a constant-weight codec exchange between?  
<details><summary>Answer</summary>
Ordinary bitstrings (or integers) and vectors of fixed Hamming weight $t$.
</details>

2. Name one crypto packaging step that uses CW coding.  
<details><summary>Answer</summary>
Niederreiter message → sparse $e$, or CFS / QC-LDGM / LEDAsig signature pipelines.
</details>

## Next steps

- [Code-based signatures](code-based-signatures.md)  
- Extract: `papers/tcas-ii-pqc/compact-constant-weight-coding-engines-for-the-code-based-cryptography/paper.md`  
- [Code-based ROADMAP](../tracks/code-based-kems/ROADMAP.md)

## References

<a id="ref-1"></a>[1] Compact constant-weight coding engines for code-based cryptography, *IEEE Trans. Circuits Syst. II* — extract: `papers/tcas-ii-pqc/compact-constant-weight-coding-engines-for-the-code-based-cryptography/paper.md`.
