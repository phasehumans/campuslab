**Approach: Trie counting and DFS**

Build a Trie where each node records a count of words passing through it. After inserting all n strings, perform a DFS starting at the root. We only visit children where count >= k. Since we check children alphabetically from 'a' to 'z', the first candidate that hits the maximum depth will be our lexicographically smallest prefix.

**Time Complexity:** O(N * L) to build the Trie, and O(Alphabet_Size * L) to DFS, where L is the maximum string length.
**Space Complexity:** O(N * L * Alphabet_Size) Trie node storage.
