**Approach: Top-Down DP with Memoization**

We define `dp(i, j)` to check if `s[i...]` matches `p[j...]`.
- Base Case: If `j == p.length()`, matching is successful if `i == s.length()`.
- Check if first characters match: `first_match = (i < s.length() && (p[j] == s[i] || p[j] == '.'))`
- If `p[j+1] == '*'`, we have two options:
  1. Match zero times: `dp(i, j+2)`
  2. Match one or more times: `first_match && dp(i+1, j)`
- Else, match one character: `first_match && dp(i+1, j+1)`

**Time Complexity:** O(s.length * p.length)
**Space Complexity:** O(s.length * p.length)
