**Approach: Linear Basis**

Maintain an array `basis` of size 62. For each number x, insert it into the basis by iterating from bit 61 down to 0: if bit i is set, either place x at `basis[i]` if empty (and stop) or update `x = x ^ basis[i]`. After inserting all elements, find the maximum XOR sum greedily starting from `ans = 0`.

**Time Complexity:** O(n * 60)
**Space Complexity:** O(60) = O(1)
