## Goal

The goal here is to build a Mini Search Engine Indexer that indexes all .txt files in a folder and allows simple term search.

### Acceptance criteria

A TypeScript program that..

- [X] Traverses a directory to find all .txt files
- [X] Indexes files
    - [X] Tokenizes text content
    - [X] Normalizes tokens (lowercase, remove punctuation, etc.)
    - [X] Builds inverted index (Map<string, Set<docId>>)
- [X] Implements concurrency
    - [X] Indexes files in parallel
    - [X] Merges inverted indexes from parallel operations
- [X] Provides search functionality
    - [X] Accepts search terms
    - [X] Returns matching file names
- [X] Uses TypeScript modularity and clean-code conventions

### Skills practiced

- Modular TypeScript
- File I/O (directory traversal)
- Data structures (inverted index)
- Algorithms (tokenization + normalization)
- Concurrency (parallel file indexing, index merging)

## Artifacts produced

- artifacts/session.txt