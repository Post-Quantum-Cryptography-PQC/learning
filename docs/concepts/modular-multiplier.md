# Modular multiplier

**Prereqs:** [Modular arithmetic](../fundamentals/modular-arithmetic.md) · [Clocks, registers, latency](../bridge/clocks-registers-latency.md) · [Area–time honesty](../bridge/area-time-power-honesty.md)  
**Next:** [Polynomial multiply engines](poly-mul-engines.md) · [NTT butterfly](ntt-butterfly.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** State what a modular multiplier computes, contrast Barrett / Montgomery / sparse-prime Karatsuba-style approaches at slogan level, sketch Barrett for Kyber-shaped primes $q=\delta\cdot 2^e+1$, and explain why LBC/HE coefficient mul is a bottleneck — without reading Verilog.

## Why this card exists

Lattice schemes multiply integers **modulo a prime $q$** millions of times (inside NTT butterflies and pointwise products). Hardware papers therefore obsess over the **modular multiplier** block: $c \equiv a\cdot b \pmod{q}$ with small area and short delay.

This card is the reusable vocabulary. A famous TCAS-II brief on high-speed modular multiply for lattice cryptosystems is summarized in-repo under `papers/tcas-ii-pqc/high-speed-modular-multiplier-for-lattice-based-cryptosystems/analysis.md` — pedagogy here; RTL lab later under `projects/papers/` when you choose.

## What it computes

Inputs $a,b$ in $\{0,\ldots,q-1\}$ (or a known bitwidth), output

$$
c \equiv a\cdot b \pmod{q},\qquad 0 \le c < q
$$

(or a congruent representative the rest of the datapath accepts).

**Bridge to crypto:** in [Module-LWE](module-lwe.md) / ML-KEM-shaped designs, $q$ is a fixed NTT-friendly prime (or a small family). Polynomial multiply is many coefficient muls plus butterflies — so this unit is the “leaf” arithmetic engine.

### Symbols (say aloud)

| Symbol | Say |
|--------|-----|
| $q$ | modulus (often a sparse / NTT-friendly prime) |
| $a\cdot b \bmod q$ | multiply then reduce into $\{0,\ldots,q-1\}$ |
| $v$ | half-width slogan when splitting $2v$-bit primes |

## Families you will hear (slogans only)

| Family | Slogan |
|--------|--------|
| **Schoolbook + subtract** | Multiply wide, then subtract multiples of $q$ until in range |
| **Barrett** | Approximate division by $q$ with a precomputed factor; correct with a few subtracts |
| **Montgomery** | Work in a Montgomery domain; replace division by cheap shifts/adds (domain conversion cost matters) |
| **Sparse-prime / Solinas-like** | Choose $q$ with few nonzero bits so reduction is mostly add/sub + MUX |
| **Karatsuba / semi-Karatsuba for mod $q$** | Split operands, fewer small muls, then fold using $q$’s structure |

A TCAS-II-style design in the lab corpus combines **semi-Karatsuba partial products** with **sparse-prime reduction**, keeps intermediates shorter than a naive $4v$-bit expand-then-reduce path, and evaluates **mul+reduce in the same cycle** (timing-attack motivated in that brief). Details belong to the paper digest — hold the moral: **exploit $q$’s shape + divide-and-conquer multiply**.

### Barrett for Kyber-shaped primes ($q=\delta\cdot 2^e+1$)

Kyber / ML-KEM uses $q=3329$. That prime (and cousins in some HE settings) fits the sparse form

$$
q = \delta\cdot 2^e + 1
$$

with small $\delta$ and $e$. **Barrett reduction** approximates $z \bmod q$ without a general divider: precompute a factor $\mu \approx 2^k/q$, estimate the quotient $\lfloor z\cdot\mu / 2^k\rfloor$, then $z - q\cdot\mathrm{quot}$ with a few corrective subtracts.

**Why the form helps hardware:** multiplying by $\delta$ and shifting by $e$ can replace a dense multiply-by-$q$ in the correction path. A TCAD-style Kyber poly-mul leaf (lab digest under `papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/`) builds a **Barrett modular multiplier (BMM)** that shares one integer mul array across NTT butterflies and coefficient-wise mul — pedagogy slogan: **one leaf arithmetic unit, many modes**.

Hold: Barrett is still “approximate then correct”; the sparse $q$ only cheapens the correction arithmetic.

### Tiny arithmetic postcard ($q=17$)

$a=6$, $b=7$: product $42$.  
$42 = 2\cdot 17 + 8$, so $c=8$.  
Hardware’s job is to get to $8$ without a general-purpose divider on the critical path.

### Mid-page self-check

Why might a designer prefer a sparse $q$ even if software could use any prime?

<details><summary>Answer</summary>

Sparse structure turns reduction into cheap add/sub/MUX patterns; arbitrary $q$ often needs heavier Barrett/Montgomery-style logic.

</details>

## Add / sub / conditional reduce

Modmul is not only a multiplier array:

- **Modular add/sub:** $(a\pm b)\bmod q$ with a compare and optional $\pm q$.  
- **Final conditional subtract:** after folding, one more “if $\ge q$ then subtract $q$” (often a MUX).

Papers count **adder widths** and **multiplier counts** because those dominate area and critical path.

## Metrics (reuse the honesty bridge)

When a table claims area / delay / ADP wins:

1. Same technology story?  
2. Same bitwidth and modulus class (e.g. 14-bit PQC-like vs 32-bit HE-like)?  
3. Pipelined vs same-cycle — apples to apples?  

See [Area–time honesty](../bridge/area-time-power-honesty.md).

## Story recap

1. Lattice poly arithmetic hammers $a\cdot b \bmod q$.  
2. HW picks an algorithm family (Barrett / Montgomery / sparse Karatsuba / …).  
3. Bitwidths and pipeline choices trade area vs delay vs cycles.  
4. Open-lab numbers and foundry tables need one shared ruler.

## Check yourself

1. What does a modular multiplier output?  
<details><summary>Answer</summary>
$c \equiv a\cdot b \pmod{q}$ in a agreed range (usually $[0,q)$).
</details>

2. Name two algorithm families besides schoolbook.  
<details><summary>Answer</summary>
Any two of: Barrett, Montgomery, sparse-prime/Solinas-like, Karatsuba-for-mod-$q$.
</details>

3. Does “same-cycle mul+reduce” always mean highest throughput?  
<details><summary>Answer</summary>
No — it can lengthen the critical path; throughput also depends on clock period and whether new ops can start every cycle.
</details>

4. What does $q=\delta\cdot 2^e+1$ buy a Barrett HW path?  
<details><summary>Answer</summary>
Cheap multiply-by-$\delta$ and shifts instead of a dense multiply-by-$q$ in the correction step (Kyber’s $q=3329$ is the running example).
</details>

## Next steps

- [Polynomial multiply engines](poly-mul-engines.md) — schoolbook / Karatsuba / NTT as engines built from muls  
- [NTT butterfly](ntt-butterfly.md) — where butterflies call modmul  
- [NTT parallel memory](ntt-parallel-memory.md) — feeding butterflies without port conflicts  
- Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
- Theory: [Module-LWE](module-lwe.md)  
- Paper leaf: [Reconfigurable Kyber poly-mul explainer](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private/blob/main/papers/tcad-pqc/reconfigurable-and-high-efficiency-polynomial-multiplication-accelerator-for-crystals-kyber/explainer.md)  
