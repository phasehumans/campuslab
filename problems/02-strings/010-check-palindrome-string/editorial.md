**Approach: Two Pointers**

Initialize `left = 0` and `right = s.length() - 1`. If `s[left] != s[right]`, return false. Increment left and decrement right until they meet. If all characters match, return true.

**Time Complexity:** O(s.length())
**Space Complexity:** O(1)
