**Approach: Prefix/Suffix Palindrome Hashing**

Map each word to its index. For each word w, split it into s1 and s2 at all indices 0..|w|. If s1 is a palindrome, we check if the reverse of s2 exists in our map. If it does and is at index k != i, then (k, i) forms a palindrome. Similarly, if s2 is a palindrome, check if the reverse of s1 exists in our map to form (i, k). Using a set/sorted container prevents duplicates and outputs pairs in sorted order.

**Time Complexity:** O(N * L^2) where N is the number of words and L is the max word length.
**Space Complexity:** O(N * L) to store the hash table.
