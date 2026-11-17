**Approach: BFS over words**

Treat each word as a vertex, with an edge between words that differ in one position. BFS from beginWord gives the shortest sequence. To find neighbours quickly, put the list in a hash set and, for each position, try all 25 other letters; alternatively, group words by patterns such as `h*t` so that words sharing a pattern are neighbours.

Mark words as visited when they are enqueued so each is processed once. If endWord is not in the list, the answer is 0.

**Complexity:** O(K * L * 26) hash lookups (L = word length), O(K * L) space.
