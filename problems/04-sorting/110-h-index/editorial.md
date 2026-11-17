**Approach: Sorting**

Sort citations in ascending order. For each paper at index i, the number of papers with at least citations[i] citations is N - i. We find the maximum value of N - i such that citations[i] >= N - i.

**Time Complexity:** O(N log N)
**Space Complexity:** O(1) or O(N) depending on the sort algorithm
