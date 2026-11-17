**Approach: Binary Search on Answer**

The speed K is at least 1 and at most the maximum elements in `piles`. We can binary search K in the range `[1, max(piles)]`.
For a candidate speed `mid`:
- Calculate total hours required to finish all bananas: `total = sum(ceil(pile / mid))`.
- If `total <= H`, Koko can finish all bananas at speed `mid`. This speed is feasible, so we record it and search for a smaller speed (`high = mid - 1`).
- If `total > H`, the speed is too slow, so we need a larger speed (`low = mid + 1`).

To compute `ceil(pile / mid)` without floats, use `(pile + mid - 1) / mid`.

**Time Complexity:** O(N log(max(piles)))
**Space Complexity:** O(1)
