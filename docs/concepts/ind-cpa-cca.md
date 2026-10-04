# IND-CPA and IND-CCA (gentle)

**Prereqs:** [Public-key picture](../fundamentals/public-key-picture.md) · [KEM](kem.md) · [From KEM API to noise](../bridge/from-kem-api-to-noise.md)  
**Next:** [DFR](dfr.md) · [Independence heuristics](independence-heuristics.md) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
**Tracks:** code-based-kems · lattice-lwe

**Learning goals.** Separate “looking at ciphertexts” from “talking to a decryptor,” state IND-CPA vs IND-CCA in plain language, walk the challenge-bit game once slowly, and recognize why modern KEMs aim at CCA-style security.

## Why this card exists

Papers and standards casually say **IND-CPA** or **IND-CCA** (sometimes **IND-CCA2**). Without those letters, McEliece “encrypts” stories and modern KEM claims sound interchangeable — they are not. After the [KEM](kem.md) API card, this page is the security-vocabulary sheet.

## Intuition — what is the attacker allowed to do?

Security names answer one question first: **what powers does the attacker get?**

| Name | Attacker powers (slogan) | Goal |
|------|--------------------------|------|
| **IND-CPA** | Sees $\mathsf{pk}$; can ask for encryptions of chosen messages | Ciphertexts should not leak which of two messages was encrypted |
| **IND-CCA** | Same as CPA **plus** a **decryption / decapsulation oracle** on almost any ciphertext | Still should not leak which of two challenge messages was encrypted |

**IND** = *indistinguishability* (cannot tell which plaintext / which key).  
**CPA** = chosen-plaintext attack.  
**CCA** = chosen-ciphertext attack (the strong modern default for encryption and KEMs).

Think of CPA as: “I can send sealed letters of my choice and watch the envelopes.”  
CCA adds: “I can also hand almost any sealed envelope to a decrypting clerk and hear what comes out — except the one challenge envelope under test.”

### Quick self-check

Does CCA mean the attacker already knows $\mathsf{sk}$?  
<details><summary>Answer</summary>
No. CCA means an *oracle* that decrypts / decapsulates almost any ciphertext the attacker chooses — not possession of the secret key itself.
</details>

## Formal definition (light) — encryption game

1. Challenger generates $(\mathsf{pk},\mathsf{sk})$ and gives $\mathsf{pk}$ to the attacker.  
2. Attacker may make allowed oracle queries (encrypt freely; under CCA, also decrypt non-challenge ciphertexts).  
3. Attacker picks two equal-length messages $m_0,m_1$.  
4. Challenger flips a bit $b$, returns $c^\star=\mathsf{Enc}(\mathsf{pk},m_b)$.  
5. Attacker continues with allowed queries (under CCA: still **cannot** ask to decrypt $c^\star$).  
6. Attacker guesses $b$.  

**Security:** for every efficient attacker, $\Pr[\text{guess}=b]$ is only negligibly better than $\tfrac12$.

### Picture

```
CPA:  attacker + Enc oracle  →  guess which of m0, m1
CCA:  attacker + Enc + Dec oracles (except c*)  →  same guess
```

## KEM version (same spirit)

For a [KEM](kem.md), the challenge is usually: distinguish the **real** session key $K$ under a challenge encapsulation from a **uniform random** key of the same length — with or without a Decaps oracle depending on CPA vs CCA.

Exact labels (IND-CCA2, OW-CPA, …) vary by paper. The **oracle** distinction above is the first thing you need.

| Notion | Extra oracle? | Typical modern KEM goal |
|--------|---------------|-------------------------|
| IND-CPA KEM | Encaps / public ops only | Weaker baseline |
| IND-CCA KEM | + Decaps (except challenge) | What NIST-style KEMs aim for |

### Quick self-check

In the challenge phase, may a CCA attacker ask the oracle to decrypt $c^\star$?  
<details><summary>Answer</summary>
No — the challenge ciphertext is forbidden. Everything else (almost) is fair game under CCA.
</details>

## Worked story — the reaction bit

Suppose a scheme sometimes **rejects** bad noise and sometimes returns a key.  
An attacker who submits many slightly tweaked ciphertexts and learns only “success / fail” (a **reaction**) is already probing **CCA-shaped** information — even without seeing full plaintext.

That is why [DFR](dfr.md) and reaction-style thinking matter for code-based KEMs: failure behaviour can leak secret structure even when the “main” ciphertext looks opaque. This card does **not** invent a specific break; it only names the oracle shape those analyses live in.

### Tiny dialogue

- Attacker: “Decrypt this near-miss $\mathsf{ct}$?”  
- Oracle: “Reject.”  
- Attacker: “And this tweak?”  
- Oracle: “OK, here is a key / success bit.”  

Each answer is information CPA alone does not grant.

## Where it appears in PQC

- Classical McEliece textbook encryption is often discussed under weaker notions; modern deployments wrap it for CCA-style goals.  
- NIST KEMs (ML-KEM, HQC, …) target **CCA** security of the KEM API.  
- Some TIT / theory papers build standard-model CCA2 variants from McEliece-like pieces — read those only after this card and the KEM API feel natural.

| Setting | Typical claim language |
|---------|------------------------|
| Toy textbook PKE | Often CPA-flavoured discussion |
| Deployed / NIST KEM | CCA (or IND-CCA2) of the KEM |
| Research “CCA2 variant” | Stronger wrapping / proof goals |

## Common confusions

| Confusion | Clearer picture |
|-----------|-----------------|
| CPA = “ciphertext looks random” | CPA is a **game** with a challenger, not a visual slogan alone. |
| CCA = attacker knows $\mathsf{sk}$ | No — CCA is an oracle, not key possession. |
| DFR = CCA | [DFR](dfr.md) is *honest* failure; CCA is an *adversarial* decryptor. They interact in proofs and attacks, but they are different ideas. |
| Signatures in IND games | Different API — do not mix “forge a signature” with IND. |

## Check yourself

1. What extra power does CCA give beyond CPA?  
2. In the challenge phase, may a CCA attacker ask the oracle to decrypt $c^\star$?  
3. Why might a KEM care about CCA, not only CPA?  
4. What does **IND** stand for in one short phrase?  
5. True or false: a reaction (success/fail) bit can already be CCA-shaped information.  

<details><summary>Answers</summary>

1. A decryption / decapsulation oracle on (almost all) ciphertexts of its choice.  
2. No — the challenge ciphertext is forbidden.  
3. Real protocols expose decrypt-like behaviour (oracles, error handling, timing); CCA models that abuse.  
4. Indistinguishability (cannot tell which plaintext / which key).  
5. True.

</details>

## Big practice set

1. Fill the table in your head: CPA vs CCA — one row for “oracles,” one for “forbidden query.”  
2. Rewrite in one sentence: “attacker wins if $\Pr[\text{guess}=b]$ is noticeably above $1/2$.”  
3. Point to the concept that measures *honest* Decaps failure (not the CCA game).  

<details><summary>Answers</summary>

1. CPA: Enc (chosen plaintext); CCA: + Dec except $c^\star$. Forbidden under CCA: decrypting the challenge.  
2. Security fails if some efficient attacker’s advantage over random guessing is non-negligible.  
3. [DFR](dfr.md).

</details>

## Next steps

- [DFR](dfr.md) — honest failure rate, and why proofs care about tiny DFR  
- [Independence heuristics](independence-heuristics.md) — modeling noise for DFR arguments  
- Bridge revisit: [From KEM API to noise](../bridge/from-kem-api-to-noise.md)  
- Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md)  
