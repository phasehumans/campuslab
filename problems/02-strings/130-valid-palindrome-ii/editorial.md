**Approach: Two Pointers with Choice**

Start two pointers, left = 0 and right = |s| - 1. When characters match, increment left and decrement right. If they mismatch, check if deleting s[left] or s[right] creates a palindrome. Checking either substring takes O(N) time.

**Time Complexity:** O(N) where N is the length of s.
**Space Complexity:** O(1).
