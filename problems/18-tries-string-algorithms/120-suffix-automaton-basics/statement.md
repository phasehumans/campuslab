Build a Suffix Automaton (SAM) for a given string s to answer queries.

Supported queries:
- `distinct`: Print the total number of distinct substrings in s.
- `count p`: Print the number of times pattern p appears as a substring in s.

**Input Format:**
- First line: string s.
- Second line: integer q, the number of queries.
- Next q lines: each contains a query in format `distinct` or `count <pattern>`.

**Output Format:**
- For each query, print the answer on a new line.
