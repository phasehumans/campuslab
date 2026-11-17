**Approach: Common Prefix**

The AND of all numbers in [left, right] is the common prefix of left and right in binary, followed by zeros. This is because whenever a bit position changes within the range, it will have both 0 and 1, making the AND 0 at that position.

Shift both left and right to the right until they are equal, counting the number of shifts. The result is left << shifts.

**Time Complexity:** O(log(right))
**Space Complexity:** O(1)
