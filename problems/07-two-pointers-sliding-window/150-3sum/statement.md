Given an integer array `arr`, find all **distinct** triplets of values `(a, b, c)` taken from three different positions of the array such that `a + b + c = 0`.

Two triplets are the same if they contain the same values, regardless of which positions they came from, so each set of values is reported once.

Print every triplet with its values in non-decreasing order (`a <= b <= c`), one triplet per line, and list the triplets in lexicographic order (by `a`, then `b`). The input always contains at least one valid triplet.

**Input Format:**
- First line: integer `n`.
- Second line: `n` space-separated integers.

**Output Format:**
- One line per distinct triplet: three space-separated integers `a b c` with `a <= b <= c`, triplets sorted lexicographically.
