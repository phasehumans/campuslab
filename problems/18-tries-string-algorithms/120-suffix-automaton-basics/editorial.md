**Approach: Suffix Automaton (SAM)**

Build the SAM in O(|s|) time. Each node represents a set of equivalent substrings. The number of distinct substrings is computed by summing (len[i] - len[link[i]]) over all states. To answer occurrences, we set the count of suffix paths for prefix states to 1, and propagate this count via link transitions in length-descending order. Queries then traverse the matching characters starting at root.

**Time Complexity:** O(|s| + q * |pattern|) total execution time.
**Space Complexity:** O(|s| * Alphabet_Size) for transitions.
