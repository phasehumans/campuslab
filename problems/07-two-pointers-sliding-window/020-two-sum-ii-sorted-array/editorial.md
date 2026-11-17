**Approach: Two Pointers**

Initialize `left = 0` and `right = N - 1`. In each step, calculate the sum of elements at these pointers: `current_sum = numbers[left] + numbers[right]`.
- If `current_sum == target`, output `left + 1` and `right + 1` (since the output is 1-indexed).
- If `current_sum < target`, increment `left` to increase the sum.
- If `current_sum > target`, decrement `right` to decrease the sum.

**Time Complexity:** O(N)
**Space Complexity:** O(1)
