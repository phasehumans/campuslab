**Approach: build a letter graph, then topological sort with a min-heap**

1. **Graph construction:** For each pair of adjacent words, find the first position where they differ; the two letters there give an edge `c1 -> c2` (`c1` comes before `c2`). Later positions tell us nothing. If one word is a prefix of the next, there is no information.
2. **Topological sort:** Run Kahn's algorithm over the letters that appear in the words. To get the lexicographically smallest valid order, always take the smallest available letter, using a min-priority queue for the letters with in-degree 0.

(If the input could be inconsistent, a cycle would show up as letters that never reach in-degree 0, and a word followed by its own proper prefix would also be invalid.)

**Complexity:** O(total length of the words + 26 log 26) time, O(26^2) space.
