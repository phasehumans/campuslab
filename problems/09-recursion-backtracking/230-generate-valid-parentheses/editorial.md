**Approach: Backtracking**

By ensuring that we always attempt to place '(' before ')', we naturally generate combinations in lexicographically sorted order. We keep track of how many open and close parentheses have been placed. 
- If open < n: we can place '('
- If close < open: we can place ')'
- If the string reaches length 2 * n, we output it.

Time complexity is bounded by the n-th Catalan number, which is O(4^n / (n * sqrt(n))). Space complexity is O(n) due to recursion stack depth.
