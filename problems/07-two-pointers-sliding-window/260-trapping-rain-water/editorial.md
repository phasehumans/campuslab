**Approach: Two Pointers**

1. Maintain a `left` pointer at index 0 and a `right` pointer at index `n - 1`.
2. Keep track of `left_max` and `right_max` representing the maximum heights seen so far from left and right respectively.
3. At each step, if `height[left] < height[right]`, then the trapped water at the `left` position is determined by `left_max - height[left]`. Update `left_max` and increment `left`.
4. Otherwise, the trapped water at the `right` position is determined by `right_max - height[right]`. Update `right_max` and decrement `right`.

**Time Complexity:** O(n)
**Space Complexity:** O(1) auxiliary space.
