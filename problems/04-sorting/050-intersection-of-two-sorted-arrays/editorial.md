**Approach: Two Pointers**

Initialize two pointers `i = 0` (for array A) and `j = 0` (for array B). Compare `A[i]` and `B[j]`:
- If `A[i] == B[j]`, then we found a common element. To ensure uniqueness, check if this element is already in our intersection list. If not, add it. Then increment both `i` and `j`.
- If `A[i] < B[j]`, increment `i` to find a larger element in A.
- If `A[i] > B[j]`, increment `j` to find a larger element in B.

**Time Complexity:** O(M + N)
**Space Complexity:** O(min(M, N)) to store the output intersection.
