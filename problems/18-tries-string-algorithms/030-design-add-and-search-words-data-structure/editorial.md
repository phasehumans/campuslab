**Approach: Trie DFS Wildcard Matching**

The insertion matches standard Trie. For search, traverse recursively. If the current character is '.', try traversing down all 26 possible children and recursively evaluate. If it is a normal character, follow the matching branch.

**Time Complexity:** O(L) for normal search/insert, O(26^2 * L) for a search with at most two dots, since each dot branches into at most 26 children.
**Space Complexity:** O(U * 26) where U is the number of characters in the Trie.
