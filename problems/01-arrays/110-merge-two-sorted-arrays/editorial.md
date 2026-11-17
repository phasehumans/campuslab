**Approach: Two Pointers**

Maintain two pointers `i = 0` and `j = 0` for both arrays. Compare `arr1[i]` and `arr2[j]`, print the smaller one, and advance that pointer. If one array is exhausted, print the remaining elements of the other.

**Time Complexity:** O(n + m)
**Space Complexity:** O(1) auxiliary space if printed directly, or O(n + m) to store the result.
