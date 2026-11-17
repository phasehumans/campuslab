**Approach: Split in Half (Meet-in-the-middle)**

Checking all four combinations takes O(n^4), which is too slow. Instead, we can precompute the sum of elements from A and B: `sumAB = A[i] + B[j]` and store the frequencies of these sums in a Hash Map. Next, we iterate through every pair in C and D, calculating `sumCD = C[k] + D[l]`. If `-sumCD` exists in our Hash Map, we add its frequency to the total count. This reduces complexity to O(n^2).

**Time Complexity:** O(n^2) to compute A+B and C+D combinations.
**Space Complexity:** O(n^2) to store combinations of A and B in the Hash Map.
