## Goal

The goal here is to build a Mini Search Engine Indexer that indexes all .txt files in a folder and allows simple term search.

### Acceptance criteria

A TypeScript program that..

- [ ] Traverses a directory to find all .txt files
- [ ] Indexes files
    - [ ] Tokenizes text content
    - [ ] Normalizes tokens (lowercase, remove punctuation, etc.)
    - [ ] Builds inverted index (Map<string, Set<docId>>)
- [ ] Implements concurrency
    - [ ] Indexes files in parallel
    - [ ] Merges inverted indexes from parallel operations
- [ ] Provides search functionality
    - [ ] Accepts search terms
    - [ ] Returns matching document IDs
- [ ] Uses TypeScript modularity and clean-code conventions

### Skills practiced

- Modular TypeScript
- File I/O (directory traversal)
- Data structures (inverted index)
- Algorithms (tokenization + normalization)
- Concurrency (parallel file indexing, index merging)

## Artifacts produced
