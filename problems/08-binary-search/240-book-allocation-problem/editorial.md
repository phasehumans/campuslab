**Approach: Binary Search on Answer**

We define search space: low = max(A) (since a student must take the largest book), high = sum(A) (if 1 student takes all books). For each mid, check if we can allocate books using at most M students. If yes, search left for a smaller maximum (high = mid - 1). If no, search right (low = mid + 1).

**Time Complexity:** O(N log(sum(A)))
**Space Complexity:** O(1)
