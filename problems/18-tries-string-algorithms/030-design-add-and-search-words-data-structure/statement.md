Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:
- `add <word>`: Adds `word` to the data structure.
- `search <word>`: Returns `true` if there is any string in the data structure that matches `word`, or `false` otherwise. `word` may contain dots `.` where a dot can be matched with any letter (a search word contains at most two dots).

**Input Format:**
- First line: integer q, the number of operations.
- Next q lines: each contains an operation in one of the formats:
  - `add <word>`
  - `search <word>`

**Output Format:**
- For each `search` operation, print `true` or `false` on a new line.
