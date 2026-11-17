**Approach: LIS in O(N log N)**

1. Sort envelopes by width ascending. If widths are equal, sort height descending.
2. This sorting ensures that for the same width, we cannot choose more than one envelope because we are looking for a strictly increasing subsequence of heights.
3. Run the standard LIS algorithm using binary search (patience sorting) on the heights.

**Time Complexity:** O(N log N)
**Space Complexity:** O(N)
