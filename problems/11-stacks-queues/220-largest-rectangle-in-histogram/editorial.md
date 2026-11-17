**Approach: Monotonic Stack**

1. Maintain a stack that stores indices of the bars in increasing order of heights.
2. Iterate through all bars (including a dummy bar of height 0 at index `n` to flush the remaining items in the stack):
   - While the stack is not empty and the current height is less than the height at `stack.top()`:
     - Pop the top index `h_idx`.
     - The height of the rectangle is `heights[h_idx]`.
     - The width is `i` if the stack is empty, otherwise `i - stack.top() - 1`.
     - Update the maximum area: `max_area = max(max_area, height * width)`.
   - Push the current index `i` to the stack.
3. Return `max_area`.

**Time Complexity:** O(N) as each bar is pushed and popped at most once.
**Space Complexity:** O(N) to store indices in the stack.
