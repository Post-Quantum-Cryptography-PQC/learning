# Track: Rank metric

**Prereqs:** [Code-based KEMs](../code-based-kems/ROADMAP.md) Stage 1 (or [Linear codes](../../concepts/linear-codes.md) + [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md))  
**Next:** [From Hamming to rank](../../bridge/from-hamming-to-rank.md) · [Code-based KEMs](../code-based-kems/ROADMAP.md) · [index](../../index.md)  
**Tracks:** rank-metric

## Who / outcomes

After this track you can:

- Say how **rank distance** differs from Hamming weight.  
- Place LRPC and rank syndrome decoding next to the Hamming code-based path.  
- Open curated TIT LRPC extracts plus the MinRank / MiRitH leaf.

## How to use

1. Enter from the **code-based** track after Hamming syndrome decoding feels solid — not from lattice / hash / MQ / isogeny.  
2. Walk Stages 1–2.  
3. Paper leaves (TIT LRPC core, then MiRitH).

## Shared entry

1. [Finite fields beyond F₂](../../bridge/finite-fields-beyond-f2.md)  
2. [Linear codes](../../concepts/linear-codes.md)  
3. [Syndrome decoding](../../concepts/syndrome-decoding.md) — Hamming twin for contrast  
4. Helpful: [Vectors and matrices](../../fundamentals/vectors-matrices.md)

## Stages

### Stage 1 — Metric change

1. [From Hamming to rank](../../bridge/from-hamming-to-rank.md)

**Checkpoint:** Replace “number of nonzero positions” with what matrix idea?

### Stage 2 — Rank concepts

1. [Rank metric](../../concepts/rank-metric.md)  
2. [LRPC codes](../../concepts/lrpc-codes.md)  
3. [Rank syndrome decoding](../../concepts/rank-syndrome-decoding.md)  
4. [MinRank and MPCitH (MiRitH)](../../concepts/minrank-mpcitH.md) before the MiRitH leaf.

**Checkpoint:** What does “low-rank parity-check” buy the decoder that a random code would not?

## Paper leaves

| Title (short) | Extract | Status |
|---------------|---------|--------|
| Blockwise rank decoding + $\ell$-LRPC | `papers/tit-pqc/blockwise-rank-decoding-problem-and-lrpc-codes-cryptosystems-with-smaller-sizes/paper.md` | extract only |
| Improved BD-LRPC decoding | `papers/tit-pqc/improved-decoding-algorithm-of-bd-lrpc-codes/paper.md` | extract only |
| MiRitH (MinRank in the head signatures) | `papers/tches-pqc/mirith-efficient-post-quantum-signatures-from-minrank-in-the-head/paper.md` | extract only |

## Course map (inspiration)

| Source | Theme | This track |
|--------|--------|------------|
| Code-based Stage 1 | Hamming SD | Shared entry |
| Rank bridge / concepts | Metric change | Stages 1–2 |
| TIT LRPC | Blockwise / BD-LRPC | Paper leaves |

## Cross-track forks

- Return: [Code-based KEMs](../code-based-kems/ROADMAP.md)  
- Not linked from lattice / hash / multivariate / isogeny (wrong metric family)
