# Masking shares

**Prereqs:** [Side-channel threat model](../bridge/side-channel-threat-model.md) · [Bits, XOR, randomness](../fundamentals/bits-xor-randomness.md) · helpful: [Modular arithmetic](../fundamentals/modular-arithmetic.md)  
**Next:** [Ciphertext compress / encode](ciphertext-compress-encode.md) · [KEM accelerator anatomy](kem-accelerator-anatomy.md) · Track: [PQC hardware](../tracks/pqc-hardware/ROADMAP.md)  
**Tracks:** pqc-hardware

**Learning goals.** Explain masking as “split the secret so each piece looks random,” do a tiny boolean and arithmetic share by hand, and see why Kyber’s Compress step needs special care under masking.

## The one idea

From the [SCA bridge](../bridge/side-channel-threat-model.md): power/EM might correlate with a sensitive value $x$ sitting in a register.  
**Masking** answers: never leave $x$ alone in the clear. Split it into random **shares** that only rebuild $x$ when combined.

| Clear | Masked |
|-------|--------|
| One register holds $x$ | Several registers hold random-looking pieces |
| Leakage may track $x$ | Each piece alone should look like noise |

Masking hardens the **implementation**. It does **not** change Module-LWE itself.

## Toy 1 — boolean shares (XOR world)

Secret bit or bit-string $x$.

1. Pick a fresh random $x_1$ (same shape as $x$).  
2. Set $x_2 = x \oplus x_1$.  
3. Store $(x_1,x_2)$. Recover with $x = x_1 \oplus x_2$.

**Example:** $x=1$, pick $x_1=0$ → $x_2=1$.  
Alone, $0$ and $1$ are just bits; together they rebuild $1$.

## Toy 2 — arithmetic shares (mod $q$ world)

Lattice coefficients live in $\mathbb{Z}_q$, so addition fits better than XOR.

1. Pick random $x_1 \bmod q$.  
2. Set $x_2 \equiv x - x_1 \pmod{q}$.  
3. Recover $x \equiv x_1 + x_2 \pmod{q}$.

**Example:** $q=7$, $x=5$. Pick $x_1=2$ → $x_2\equiv 5-2=3$.  
Check: $2+3=5$. Each of $2$ and $3$ alone is uninformative without the pair.

### Mid-page self-check

If I publish only one arithmetic share $x_1$, have I published $x$?

<details><summary>Answer</summary>

No. One share is designed to look random; you need (enough of) the other shares to rebuild $x$.

</details>

## “Order” in one sentence

**First-order** masking often means a two-share split.  
**Higher-order** means more shares, aiming at adversaries who combine leakage from several places — and it costs more randomness and logic. You can treat “order” as a **cost dial**, not something to prove here.

## Why Compress becomes a research topic

Kyber needs $\mathrm{Compress}_q$ to turn coefficients into fewer bits (message bits or packed ciphertext) — see [compress / encode](ciphertext-compress-encode.md).  
That decision is naturally **bit-ish**, while LWE math is **mod $q$**. Under masking you typically:

1. Keep coefficients in **arithmetic** shares while doing poly arithmetic.  
2. Convert (**A2B**) when you need bit operations.  
3. Compute a **masked** version of Compress / compare so intermediates stay shared.

If any step peeks at the clear secret, the masking story collapses. That is why papers invent “masked Compress” gadgets.

## Masking vs shuffling (do not merge)

| | Masking | Shuffling / hiding |
|--|---------|---------------------|
| Randomizes | **Values** (shares) | **Order / timing** of ops |
| Feels like | Split the cookie | Shuffle the recipe steps |

Both are SCA countermeasures; different tools.

## Common confusions

- Masking ≠ IND-CCA proof.  
- “We masked the NTT” still needs the rest of FO/decapsulation to be careful.  
- More shares ≠ automatically “unbreakable” — engineering and models matter (paper-level detail).

## Check yourself

1. Give boolean shares for $x=0$ with your choice of $x_1$.  
<details><summary>Answer</summary>
Any $x_1$; $x_2=0\oplus x_1=x_1$. Example $x_1=1$, $x_2=1$.
</details>

2. For $q=5$, $x=4$, $x_1=3$, what is $x_2$?  
<details><summary>Answer</summary>
$x_2\equiv 4-3=1\pmod{5}$.
</details>

3. Why convert arithmetic → boolean around Compress?  
<details><summary>Answer</summary>
Compress’s decision is bit-oriented; arithmetic shares suit $\mathbb{Z}_q$ add/mul first.
</details>

## Next steps

- [Side-channel threat model](../bridge/side-channel-threat-model.md) (replay)  
- [Ciphertext compress / encode](ciphertext-compress-encode.md)  
- [KEM accelerator anatomy](kem-accelerator-anatomy.md)  

## Where this is grounded (optional)

Masked Kyber TCHES `paper.md` §2 (share notations, probing) and §3.1–3.2 (masked Compress / compare); shuffling contrast in TCAS-II Kyber brief §I.
