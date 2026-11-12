# Motivation — why post-quantum cryptography?

**Prereqs:** none  
**Next:** [History](history.md)

**Learning goals.** Explain what cryptography is for in one breath, why large quantum computers threaten today’s public-key tools, what “store now, decrypt later” means, and why PQC migration started before a world-breaking machine ships.

## The job cryptography already does

You send a message; the path is not a private room. Cryptography is the toolkit that still lets honest people:

- keep content **private**,  
- notice **tampering**,  
- and sometimes prove **who wrote** something,

even when the network is untrusted.

**Post-quantum cryptography (PQC)** is the next generation of that toolkit — designed so large quantum computers should not break the *public-key* parts we rely on for key setup and signatures.

You do **not** need a quantum computer to *use* PQC. You need new algorithms that classical computers can run, but that (we believe) stay hard even for quantum attackers.

## Why change anything?

Much of today’s web and VPN security uses **RSA** or **elliptic-curve** public-key methods so browsers and servers can agree on keys.

A powerful enough quantum computer could break those methods with **Shor’s algorithm**. The threat is not a new kind of network — it is that the **math puzzles** behind RSA/ECC key setup can become easy for that attacker.

An attacker can:

1. record ciphertext **today**,  
2. wait until a large quantum machine exists,  
3. decrypt the old recording **later**.

That is **store now, decrypt later** (SNDL). Long-lived secrets — medical archives, state records, identity keys, firmware roots — are especially exposed. Migration planning started early because **recorded traffic lasts**, not because a world-breaking machine ships next Tuesday.

Early migration does **not** erase copies an attacker already stored under RSA/ECC — those old recordings may still fall later. What it buys is: **new** traffic (and freshly protected archives) use a public-key layer Shor is not expected to break that way, so *further* recordings stay useless.

### Slow-motion timeline

| When | What happens |
|------|----------------|
| Today | Attacker records HTTPS / VPN ciphertext under RSA/ECC |
| Years later | A large enough quantum computer exists |
| Then | Attacker runs Shor-style attacks on old handshakes |
| Result | Old “secret” traffic may become readable |

### Quick self-check

Why is it a **bad idea** to wait until “quantum day” (a big quantum computer exists) before migrating away from RSA/ECC?  
<details><summary>Answer</summary>
Because an attacker can record ciphertext <em>now</em> and decrypt it <em>later</em>. Waiting only protects traffic after you finally migrate. Anything still encrypted under RSA/ECC — including years of recordings already on disk — may become readable on quantum day. Early migration limits how much new valuable traffic gets added to that pile.
</details>

## What about symmetric crypto?

Symmetric tools (AES, SHA-2/3, …) are in a different boat. **Grover’s algorithm** gives a quadratic speedup for some search-style attacks, which usually means “use larger keys / digests,” not “throw the whole design away.”

PQC is mainly about replacing **public-key** building blocks (key encapsulation, signatures) whose hardness collapses under Shor.

## Motivation in one sentence

We need cryptography that honest devices can run **today**, that still protects data **decades from now**, even if large quantum computers arrive.

## Where this curriculum goes next

| Next | Why |
|------|-----|
| [History](history.md) | How classical PKC, the quantum threat, and NIST PQC fit on one timeline |
| Later: [Why cryptography?](../fundamentals/why-cryptography.md) | Deeper toys for confidentiality / authenticity / keys |
| Later: [Quantum threat](../fundamentals/quantum-threat.md) | Shor vs Grover slogans and family map |

### Quick self-check

Do you need a quantum computer to *deploy* ML-KEM-style PQC?  
<details><summary>Answer</summary>
No — PQC algorithms are classical algorithms. The “quantum” part is the *attacker* we design against.
</details>
