**Approach: DP with O(1) Space**

Let `D(n)` be the number of derangements of a set of size `n`.

To find `D(n)`:
Consider where the first element `1` is placed. It cannot be in position 1. So it has `n - 1` choices. Suppose it is placed in position `i` (where `i != 1`).
Now, look at the element `i`:
1. If element `i` is placed in position 1: The two elements swap positions. The remaining `n - 2` elements can be deranged in `D(n - 2)` ways.
2. If element `i` is NOT placed in position 1: We can think of position 1 as the new 'forbidden' position for element `i`. This is equivalent to deranging `n - 1` elements, which can be done in `D(n - 1)` ways.

Therefore, we have the recurrence:
`D(n) = (n - 1) * (D(n - 1) + D(n - 2))`.

Base cases:
- `D(1) = 0`
- `D(2) = 1`

Using variables `prev2` and `prev1`, we can iteratively calculate `D(n)` in O(n) time and O(1) space.

**Time Complexity:** O(n)
**Space Complexity:** O(1)
