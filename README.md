# PQC Learn (public)

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-green?logo=creativecommons&logoColor=white)](https://creativecommons.org/licenses/by/4.0/)
[![MkDocs](https://img.shields.io/badge/docs-MkDocs%20Material-526CFE?logo=materialformkdocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)

**Repository:** [Post-Quantum-Cryptography-PQC/pqc-learning-public](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public)

Public teaching curriculum for **post-quantum cryptography**: fundamentals, bridge explainers, concept cards, and curated track roadmaps. This repo is the Markdown / MkDocs **source module**. The live website is hosted from a separate Pages repo named [`learning`](https://github.com/Post-Quantum-Cryptography-PQC/learning) so the site URL stays at `/learning/`.

- **Website**: https://post-quantum-cryptography-pqc.github.io/learning/
- **Sibling (private)**: [pqc-learning-private](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private) — paper explainers and gap graphs
- **Parent lab**: [pqc-lab](https://github.com/Post-Quantum-Cryptography-PQC/pqc-lab) (consumes this tree as `learn/public` submodule)
- **License**: CC BY 4.0 (see `LICENSE`)

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Project layout](#project-layout)
- [Related repositories](#related-repositories)
- [License](#license)

## Features

| Area | What you get |
|------|----------------|
| Fundamentals | 12 starter pages (notation, modular arithmetic, soft lattices, …) |
| Bridge | 13 story-first pages closing the gap to PQC vocabulary |
| Concepts | 25 compact cards (LWE, KEM, NTT, ISD, …) |
| Tracks | Roadmaps: `code-based-kems`, `lattice-lwe`, `rank-metric`, `pqc-hardware` |
| Site build | MkDocs Material + KaTeX (`mkdocs.yml`, `docs/`) |

Paper explainers and research-gap YAML stay in **pqc-learning-private** and are not published on the public site.

## Requirements

- Python 3.10+ (3.12 recommended)
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 9.5+

```bash
pip install "mkdocs-material>=9.5.0"
```

## Quick start

```bash
git clone https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public.git
cd pqc-learning-public
pip install "mkdocs-material>=9.5.0"
mkdocs serve
```

Open the local preview (typically http://127.0.0.1:8000/). Teaching pages live under `docs/`; start at [`docs/index.md`](docs/index.md).

To publish the website, mirror this tree to the Pages host [`learning`](https://github.com/Post-Quantum-Cryptography-PQC/learning) (from the parent lab: `bash learn/sync_learning_repos.sh`). GitHub Pages for free organizations must run on that public host so the URL remains https://post-quantum-cryptography-pqc.github.io/learning/.

## Project layout

```text
pqc-learning-public/
├── docs/                 # MkDocs docs_dir (edit teaching pages here)
│   ├── index.md
│   ├── glossary.md
│   ├── fundamentals/
│   ├── bridge/
│   ├── concepts/
│   ├── tracks/<id>/ROADMAP.md
│   └── javascripts/katex.js
├── mkdocs.yml
├── LICENSE
└── README.md
```

## Related repositories

| Repo | Role |
|------|------|
| [pqc-learning-public](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public) | This module — public curriculum source |
| [pqc-learning-private](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private) | Private paper explainers + `graph/` ledgers |
| [learning](https://github.com/Post-Quantum-Cryptography-PQC/learning) | Public Pages host for `/learning/` |
| [pqc-lab](https://github.com/Post-Quantum-Cryptography-PQC/pqc-lab) | Lab monorepo; pins both learning modules as submodules |

## License

This project is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See [LICENSE](LICENSE).
