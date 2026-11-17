**Approach: Expand Around Center**

1. For each index `i` in string `s`, treat it as the center of a potential palindromic substring.
2. Expand outwards for both odd-length (centered at `i`) and even-length (centered at `i` and `i+1`) palindromes.
3. Keep track of the longest palindromic substring. If a new palindrome is strictly longer than the current maximum, update the start position and length.
4. Print the longest palindromic substring.

**Time Complexity:** O(N^2)
**Space Complexity:** O(1) auxiliary space.
