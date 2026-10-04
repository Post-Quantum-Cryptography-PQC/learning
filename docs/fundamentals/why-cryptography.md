# Why cryptography?

**Prereqs:** [How to read the math](reading-math-notation.md) (optional but recommended)  
**Next:** [Modular arithmetic](modular-arithmetic.md)

**Learning goals.** After this page you can explain plaintext vs ciphertext, why keys matter more than secret recipes, name confidentiality vs authenticity, and tell symmetric from public-key at slogan level — slowly, with toys you can do on paper.

## Why this page exists

Before any hard math, we need a shared story: what cryptography is *for*. If this story is clear, later pages about modules, bits, and quantum computers will feel like tools for a job you already understand.

You do **not** need to be “good at math” to finish this page. You need patience with ordinary English and one tiny toy cipher.

## A story you already live

You send a message on your phone. Between you and your friend there are towers, cables, company servers, and possibly attackers. That path is **not** a private room.

Cryptography is the toolkit that still lets honest people:

- keep content private,  
- notice tampering,  
- and sometimes prove who wrote something,

even when the network is untrusted.

**Post-quantum cryptography (PQC)** is the next generation of that toolkit — designed so large quantum computers should not break it. This curriculum builds toward understanding PQC papers. We start with ordinary language.

### Who is Eve?

We will call the eavesdropper / attacker **Eve**.  
Eve can copy whatever travels on the wire. Eve is clever and patient. Eve is *not* magic — she still needs either your key or a break in the math.

## Two jobs (learn these names)

Imagine mailing a locked diary vs mailing a signed letter.

| Job | Plain English | Failure looks like |
|-----|---------------|-------------------|
| **Confidentiality** | Strangers cannot *read* the content | Eavesdropper understands your message |
| **Authenticity / integrity** | Strangers cannot *forge or silently edit* | Fake message accepted as yours |

You can have one without the other:

- A locked box of spam is confidential but not authentic.  
- A public signed announcement can be authentic but not secret.

Real apps (chat, banking, HTTPS) usually need **both**, using several tools together.

### Quick self-check

A public blog post with a verified author stamp, readable by everyone: confidentiality, authenticity, both, or neither?  
<details><summary>Answer</summary>
Authenticity (and integrity of the text) — not confidentiality.
</details>

## Four vocabulary words (memorize)

1. **Plaintext** — the readable message (`MEET AT NOON`).  
2. **Ciphertext** — the scrambled form that travels on the wire.  
3. **Key** — secret information that controls scrambling / unscrambling.  
4. **Algorithm** — the public recipe (the “how”).

### Picture the four together

$$
\text{ciphertext} = \mathsf{Encrypt}(\text{key},\;\text{plaintext})
$$

$$
\text{plaintext} = \mathsf{Decrypt}(\text{key},\;\text{ciphertext})
$$

Say aloud: “Encrypt takes a key and plaintext and returns ciphertext.”

### Kerckhoffs’s principle (important life lesson)

Assume the enemy knows the algorithm.  
Security should come from the **key**, not from hiding the recipe.

History is full of “secret algorithms” that collapsed the day the recipe leaked. Modern crypto publishes algorithms for review and keeps keys secret.

**Analogy:** everyone knows how padlocks work; your house is still safer if strangers lack *your* key.

## Symmetric vs public-key (preview only)

**Symmetric crypto:** the same secret key locks and unlocks (like a house key). Fast. Problem: how do two strangers share that house key the first time?

**Public-key crypto:** you publish an open padlock (public key); only you have the opening key (secret key). Strangers can lock a box to you without meeting you first. Slower. See [Public-key picture](public-key-picture.md) later.

Most real systems use **both**: public-key to set up a short session secret, then fast symmetric crypto for the bulk data.

| | Symmetric | Public-key |
|--|-----------|------------|
| Keys | Same secret both sides | Public + secret pair |
| Speed | Usually fast | Usually heavier |
| First meeting problem | Hard (need shared secret) | Designed for this |
| Bulk movie download | Great after key is shared | Rarely used alone |

## Tiny example — Caesar cipher (teaching toy)

Shift every letter forward by $k=3$ (wrap Z→A):

| Plain | H | E | L | L | O |
|-------|---|---|---|---|---|
| +3 | K | H | O | O | R |

Ciphertext: `KHOOR`.

Decrypt: shift backward by $3$. `KHOOR` → `HELLO`.

**What this teaches:** plaintext → ciphertext under a key.

**What this does *not* teach:** real security. There are only $25$ useful English shifts (or $26$ including identity). A laptop can try all of them instantly.

So: same *roles*, tiny *key space*. Real systems need enormous key spaces and hard math problems.

### Second Caesar (do on paper)

Encrypt `DOG` with shift $k=1$.  
<details><summary>Answer</summary>
`EPH`.
</details>

### Attacker’s view (practice thinking like Eve)

Eve sees `KHOOR` and knows the algorithm (“shift by some $k$”).  
She does **not** know $k$.  
In Caesar, she can still win by trying every $k$. In real crypto, trying every key must be hopeless.

**Brute force** = try all keys.  
Caesar: brute force wins.  
Modern crypto: brute force should be absurdly expensive.

## Slow-motion: Alice → Bob with Eve watching

1. Alice and Bob somehow share a key $k$ (how is a later topic).  
2. Alice computes $\mathsf{Encrypt}(k,\text{plaintext})\to\text{ciphertext}$.  
3. Ciphertext travels; Eve can copy it.  
4. Bob computes $\mathsf{Decrypt}(k,\text{ciphertext})\to\text{plaintext}$.  
5. Without $k$, Eve should learn essentially nothing useful about the plaintext.

### Same steps as a table

| Step | Who | What happens | Eve sees? |
|------|-----|--------------|-----------|
| 1 | Alice, Bob | Share / establish key $k$ | Maybe not $k$ (goal) |
| 2 | Alice | Encrypt plaintext → ciphertext | Ciphertext |
| 3 | Network | Deliver ciphertext | Copy ok |
| 4 | Bob | Decrypt → plaintext | Should not get plaintext |
| 5 | Eve | Try to break without $k$ | Should fail |

PQC changes the *math inside* Encrypt/Decrypt. It does not change this story shape.

## Bridge to later pages

| Later topic | How it connects |
|-------------|-----------------|
| Modular arithmetic | Clock math inside many algorithms |
| Bits / XOR | How computers actually store and mix messages |
| Hard problems | Why guessing the key is not feasible |
| Public-key picture | How strangers share secrets at first meeting |
| Quantum threat | Why today’s popular public-key math needs upgrading |
| Lattice / code tracks | Two families of PQC “padlock insides” |

## Common confusions

- Hiding the algorithm is not a substitute for a good key.  
- “Encryption” in casual speech often mixes confidentiality with authenticity — they are different.  
- Longer keys do not help if the underlying math problem is broken.  
- HTTPS is a *bundle* of tools (key exchange, signatures, symmetric encryption), not one magic button.  
- A toy cipher can teach vocabulary and still be completely insecure.

## Practice (more than a quiz)

**A. Vocabulary.** For each situation, say confidentiality, authenticity, both, or neither:

1. A sealed envelope (ignore that paper can be steamed open).  
2. A public PDF with a publisher’s digital signature, contents visible to all.  
3. A postcard.  
4. A locked diary only you can open, with no signature on the cover.  

**B. Caesar.** Encrypt `CAT` with shift $2$. Decrypt `ECV` with shift $2`.  

**C. Design thinking.** If Eve knows your algorithm and your ciphertext, what must still be hard for her?

**D. Symmetric vs public-key.** Which is better at “first meeting with a stranger on the internet,” and why (one sentence)?

<details><summary>Answers</summary>

A1. Mostly confidentiality (weak in real life).  
A2. Authenticity / integrity, not confidentiality.  
A3. Neither (readable and forgeable).  
A4. Confidentiality (authenticity not really provided by the lock alone).  
B. Encrypt → `ECV`. Decrypt `ECV` → `CAT`.  
C. Recovering the key or the plaintext without the key (and forging, if authenticity matters).  
D. Public-key — strangers can use your published padlock without a pre-shared house key.

</details>

## Check yourself (quick)

1. What travels on the public network: plaintext or ciphertext?  
2. Should the algorithm usually be secret?  
3. Which job stops an eavesdropper from *reading* the message?  
4. True or false: Caesar with $k=3$ is fine for banking.  
5. Name one difference between symmetric and public-key crypto.  

<details><summary>Answers</summary>

1. Ciphertext.  
2. No.  
3. Confidentiality.  
4. False — tiny key space.  
5. e.g. same key both ways vs public/secret pair; or first-meeting capability.

</details>

## Next steps

- [Modular arithmetic](modular-arithmetic.md) — clock math  
- [Bits, XOR, and randomness](bits-xor-randomness.md) — computer reality  
- [Public-key picture](public-key-picture.md) — after you meet hard problems  
- If symbols feel scary, skim [How to read the math](reading-math-notation.md) again anytime  
