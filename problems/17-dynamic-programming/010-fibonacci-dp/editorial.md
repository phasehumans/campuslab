**Approach: Dynamic Programming (Iterative)**

Maintain two variables `a` and `b` initialized to F(0)=0 and F(1)=1. Iterate from 2 to n, updating the variables:
next = (a + b) % MOD
a = b
b = next

**Time Complexity:** O(n)
**Space Complexity:** O(1)
