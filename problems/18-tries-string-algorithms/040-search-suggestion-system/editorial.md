**Approach: Sorted Array with Binary Search**

Sort the products in O(N log N * L) time. When matching a typed prefix, perform a binary search (lower bound) to find the first product. Check if the product and the subsequent two products share the prefix. If they do, collect them. This matches the standard Trie prefix autocomplete query but is easier to write.

**Time Complexity:** O(N * log N * L + S * log N * L) where S is the length of searchWord.
**Space Complexity:** O(1) beyond storing products.
