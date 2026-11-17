A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement a Trie with the following operations:
- `insert <word>`: Inserts the string `word` into the trie.
- `search <word>`: Returns `true` if the string `word` is in the trie, and `false` otherwise.
- `startsWith <prefix>`: Returns `true` if there is a previously inserted string that has the prefix `prefix`, and `false` otherwise.

**Input Format:**
- First line: integer q, the number of operations.
- Next q lines: each contains an operation in one of the formats:
  - `insert <word>`
  - `search <word>`
  - `startsWith <prefix>`

**Output Format:**
- For each `search` and `startsWith` operation, print `true` or `false` on a new line.
