**Approach: Monotonic Stack (Left to Right)**

1. Maintain a stack that stores indices of the days.
2. Iterate through each day `i` from `0` to `n-1`:
   - While the stack is not empty and the temperature at day `i` is greater than the temperature at the index at the top of the stack:
     - Pop the top index `prev_i`.
     - Set `res[prev_i] = i - prev_i`.
   - Push `i` onto the stack.
3. Any indices remaining in the stack will keep their default value of `0` since no warmer day was found.

**Time Complexity:** O(N) since each index is pushed and popped at most once.
**Space Complexity:** O(N) to store the result and the stack.
