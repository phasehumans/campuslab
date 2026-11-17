**Approach: Dynamic Programming (Iterative)**

Use three variables `a`, `b`, and `c` initialized to T0, T1, and T2 respectively.
Iterate from 3 to n, updating:
next = (a + b + c) % MOD
a = b
b = c
c = next

**Time Complexity:** O(n)
**Space Complexity:** O(1)
