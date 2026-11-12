# Code-based signatures (CFS / QC-LDGM / LEDAsig)

**Prereqs:** [McEliece in plain words](../bridge/mceliece-in-plain-words.md) · [Niederreiter](niederreiter.md) · [Constant-weight coding](constant-weight-coding.md) · [Digital signature](../glossary.md#digital-signature)  
**Next:** [KEM](kem.md) (contrast API) · [Hash-based signatures](hash-based-signatures.md) · [Oil–vinegar multivariate](oil-vinegar-multivariate.md) · Track: [Code-based KEMs](../tracks/code-based-kems/ROADMAP.md) (Stage 3b) · [PQC hardware § code](../tracks/pqc-hardware/ROADMAP.md#family-hw-leaves-code)  
**Tracks:** code-based-kems · pqc-hardware

**Learning goals.** After this page you can:

- Separate **code-based KEMs** (McEliece / HQC / BIKE) from **code-based signatures**  
- Place CFS, QC-LDGM, and LEDAsig as “sign with a code trapdoor” slogans  
- Open curated signature HW leaves without expecting a KEM Encaps API  

## The one idea

The code-based **KEM** track ships a session key with Encaps/Decaps ([KEM](kem.md)).  
A **code-based signature** instead uses a code trapdoor so the owner can produce a publicly verifiable **Sign** string; verification checks a code / hash relation without the secret [[1]](#ref-1) [[2]](#ref-2).

Same hardness *neighborhood* (syndrome decoding / structured codes), **different job**.

| Job | API slogan | Curriculum core |
|-----|------------|-----------------|
| KEM | Encaps / Decaps → shared secret | Stages 1–3 on the code-based track |
| Signature | Sign / Verify | Optional fork after Niederreiter + CW coding |

## Three names you will see on leaves

| Name | Postcard |
|------|----------|
| **CFS** | Classical “hash-and-decode” style code signature: try to decode a hash-derived syndrome with the secret code (often expensive; few-times / parameter tension) |
| **QC-LDGM** | Quasi-cyclic low-density generator-matrix constructions aimed at more practical signatures; [[1]](#ref-1) is an embedded HW leaf |
| **LEDAsig** | Code-based signature family with compact FPGA / SCA-aware implementations; [[2]](#ref-2) is the curated resilience leaf |

Treat these as **engineering + historical NIST-era** study objects unless a leaf says otherwise. Prefer reading the extract’s security section before copying parameters.

## Pipeline sketch (not a full scheme)

1. Hash the message (and randomness) into something the code world understands — often a **syndrome-shaped** or **constant-weight** object ([CW coding](constant-weight-coding.md)).  
2. Use the **secret** structured code to invert / decode / sample a signature witness.  
3. Publish the witness; verifier checks public equations / code membership / hash binding.

That is why signature HW papers spend area on **matrix arithmetic**, **CW codecs**, and **SCA hardening** rather than on NTT butterflies.

### Mid-page self-check

Is LEDAsig “just Classic McEliece Encaps with a different name”?

<details><summary>Answer</summary>

No. McEliece-shaped KEMs encapsulate keys; LEDAsig / QC-LDGM leaves implement **Sign/Verify** for a code-based signature scheme.

</details>

## Where the track puts them

- **Core path** stays KEM-shaped (McEliece → QC-MDPC / HQC / BIKE → DFR).  
- **Signature leaves** hang off Stage 4 after this card + [constant-weight coding](constant-weight-coding.md).  
- Shared silicon (PQPU / RePQC) may still omit signatures — check the leaf label.

## Common confusions

- Code-based signature ≠ SPHINCS+ (hash-based) and ≠ Dilithium (lattice).  
- CFS history ≠ “deploy yesterday’s CFS parameters.”  
- Constant-weight engines help signatures **and** Niederreiter packaging — shared tool, not the trapdoor.  
- “Code-based KEMs” track id is historical; signatures are a **fork**, not a replacement of Stages 1–3.

## Check yourself

1. What API difference separates KEM leaves from signature leaves?  
<details><summary>Answer</summary>
Encaps/Decaps vs Sign/Verify.
</details>

2. Name two curated signature HW themes.  
<details><summary>Answer</summary>
QC-LDGM embedded HW [[1]](#ref-1) and compact LEDAsig with SCA resilience [[2]](#ref-2).
</details>

## Next steps

- [Constant-weight coding](constant-weight-coding.md) · [Niederreiter](niederreiter.md)  
- Naming trap: CED “signatures” ≠ this card — [CED / composite-field Goppa](ced-composite-goppa.md)  
- Other Sign families: [Hash-based signatures](hash-based-signatures.md) · [Oil–vinegar multivariate](oil-vinegar-multivariate.md)  
- KEM core contrast: [KEM](kem.md) · [Bit-flipping](bit-flipping-decoding.md)  
- Extracts: QC-LDGM embedded HW · LEDAsig SCA resilience (see code-based circuit table)  

## References

<a id="ref-1"></a>[1] J. Hu and R. C. C. Cheung, “Toward practical code-based signature: Implementing fast and compact QC-LDGM signature scheme on embedded hardware,” *IEEE Trans. Circuits Syst. I*, vol. 64, no. 8, pp. 2086–2097, Aug. 2017, doi: [10.1109/TCSI.2017.2684828](https://doi.org/10.1109/TCSI.2017.2684828).

<a id="ref-2"></a>[2] J. Hu, Y. Liu, R. C. C. Cheung, S. Bhasin, S. Ling, and H. Wang, “Compact code-based signature for reconfigurable devices with side channel resilience,” *IEEE Trans. Circuits Syst. I*, vol. 67, no. 7, pp. 2305–2316, Jul. 2020, doi: [10.1109/TCSI.2020.2984026](https://doi.org/10.1109/TCSI.2020.2984026).
