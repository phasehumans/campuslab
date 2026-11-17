**Approach: Binary Search on Partition Index**

1. Ensure that the first array `A` is the smaller array (length `m <= n`). If not, swap `A` and `B`.
2. Do a binary search on the partition index of `A` in range `[0, m]`.
3. For a partition index `i` in `A`, the partition index `j` in `B` is `(m + n + 1) / 2 - i`.
4. Find the values left and right of the partitions: `maxLeftA`, `minRightA`, `maxLeftB`, `minRightB`.
5. If `maxLeftA <= minRightB` and `maxLeftB <= minRightA`, the partition is correct. The median is:
   - `max(maxLeftA, maxLeftB)` if `m + n` is odd.
   - `(max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0` if `m + n` is even.

**Time Complexity:** O(log(min(m, n)))
**Space Complexity:** O(1) auxiliary space.
