Use two pointers: one reader pointer scanning the array and one writer pointer incrementing only when the current element is not equal to val. Finally, sort the first k elements to match the requested output format.

**Time Complexity:** O(n log n) due to sorting for printing, but O(n) for the in-place deletion.
**Space Complexity:** O(1) auxiliary space.
