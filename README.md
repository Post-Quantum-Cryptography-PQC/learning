# PQC Learn (public)

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-green?logo=creativecommons&logoColor=white)](https://creativecommons.org/licenses/by/4.0/)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-3776ab.svg)](https://www.python.org/downloads/)
[![MkDocs](https://img.shields.io/badge/docs-MkDocs%20Material-526CFE?logo=materialformkdocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)

**Repository:** [Post-Quantum-Cryptography-PQC/pqc-learning-public](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public)

Public teaching curriculum for **post-quantum cryptography**: orientation, fundamentals, bridge explainers, concept cards, curated track roadmaps, glossary, and an interactive paper map. This repository is the Markdown / MkDocs **source module**. The live website is built from a separate Pages host named [`learning`](https://github.com/Post-Quantum-Cryptography-PQC/learning) so the site URL stays at `/learning/`.

- **Website**: https://post-quantum-cryptography-pqc.github.io/learning/
- **Sibling (private)**: [pqc-learning-private](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private) — paper explainers and gap graphs
- **Org profile / paper map**: [`.github`](https://github.com/Post-Quantum-Cryptography-PQC/.github)
- **Parent lab**: [pqc-lab](https://github.com/Post-Quantum-Cryptography-PQC/pqc-lab) (consumes this tree as `share/public`)
- **License**: CC BY 4.0 (see `LICENSE`)

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Clone and preview this module](#clone-and-preview-this-module)
  - [Preview from the parent lab](#preview-from-the-parent-lab)
  - [Publish the website](#publish-the-website)
  - [Refresh the paper map](#refresh-the-paper-map)
- [Project layout](#project-layout)
- [Related repositories](#related-repositories)
- [License](#license)
- [Contact](#contact)

## Features

| Area | What you get |
|------|----------------|
| Orientation | 6 pages — motivation, history, problems, challenges, crypto-categories mindmap |
| Fundamentals | 12 starter pages (notation, modular arithmetic, soft lattices, …) |
| Bridge | 13 story-first pages plus `bridge/README.md` (14 Markdown files) |
| Concepts | 42 compact cards (LWE, KEM, NTT, ISD, masking, SPHINCS+, UOV/MAYO, code signatures, agile SoC, ASA, …) |
| Tracks | 7 roadmaps: `code-based-kems`, `lattice-lwe`, `rank-metric`, `hash-based-signatures`, `multivariate`, `isogeny`, `pqc-hardware` |
| Glossary | Plain-English term lookup (`docs/glossary.md`) |
| Paper map | `docs/papers.md` + `docs/data/papers.json` (catalog refreshed from the lab index) |
| Site chrome | MkDocs Material with **Cipher Mist** theme (`docs/stylesheets/pqc-learn.css`): teal/amber hub hero, sticky tabs, path cards, KaTeX, pan/zoom Mermaid |

Paper explainers and research-gap YAML stay in **pqc-learning-private** and are not published on the public site.

## Requirements

- Python 3.10+ (3.12 recommended)
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 9.5+

```bash
pip install "mkdocs-material>=9.5.0"
```

## Quick start

### Clone and preview this module

```bash
git clone https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public.git
cd pqc-learning-public
pip install "mkdocs-material>=9.5.0"
mkdocs serve
```

Open the local preview at http://127.0.0.1:8000/learning/ (`site_url` includes the `/learning/` path). Teaching pages live under `docs/`; start at [`docs/index.md`](docs/index.md).

### Preview from the parent lab

```bash
cd pqc-lab
git submodule update --init --recursive
pip install "mkdocs-material>=9.5.0"
mkdocs serve
```

The monorepo root `mkdocs.yml` points `docs_dir` at `share/public/docs` and matches this module’s theme features.

### Publish the website

Mirror this tree to the Pages host [`learning`](https://github.com/Post-Quantum-Cryptography-PQC/learning) from the parent lab:

```bash
bash share/sync_learning_repos.sh
```

GitHub Pages for free organizations must run on that public host so the URL remains https://post-quantum-cryptography-pqc.github.io/learning/.

### Refresh the paper map

After updating [`docs/PAPERS.md`](https://github.com/Post-Quantum-Cryptography-PQC/pqc-lab/blob/main/docs/PAPERS.md) in the lab:

```bash
python3 share/export_papers_catalog.py
```

## Project layout

```text
pqc-learning-public/
├── docs/                      # MkDocs docs_dir (edit teaching pages here)
│   ├── index.md               # Hub home (Cipher Mist hero + path cards)
│   ├── glossary.md
│   ├── papers.md              # Interactive paper map
│   ├── data/
│   │   └── papers.json
│   ├── orientation/
│   ├── fundamentals/
│   ├── bridge/
│   ├── concepts/
│   ├── tracks/<id>/ROADMAP.md
│   ├── javascripts/           # katex.js, papers-catalog.js, pqc-learn.js
│   └── stylesheets/           # papers-catalog.css, pqc-learn.css
├── mkdocs.yml
├── LICENSE
└── README.md
```

## Related repositories

| Repo | Role |
|------|------|
| [pqc-learning-public](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public) | This module — public curriculum source |
| [pqc-learning-private](https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-private) | Private paper explainers + `graph/` ledgers |
| [`.github`](https://github.com/Post-Quantum-Cryptography-PQC/.github) | Org profile + interactive paper-map Pages |
| [learning](https://github.com/Post-Quantum-Cryptography-PQC/learning) | Public Pages host for `/learning/` |
| [pqc-lab](https://github.com/Post-Quantum-Cryptography-PQC/pqc-lab) | Lab monorepo; pins learning modules as submodules |

## License

This project is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See [LICENSE](LICENSE).

**Third-party assets** (publisher links in the paper map) remain under their respective terms. This module does not host paper PDFs.

## Contact

- **Issues**: https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public/issues
- **Organization**: https://github.com/Post-Quantum-Cryptography-PQC
- **Repository**: https://github.com/Post-Quantum-Cryptography-PQC/pqc-learning-public
