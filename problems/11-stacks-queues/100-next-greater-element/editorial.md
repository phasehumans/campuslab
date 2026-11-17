**Approach: Monotonic Stack (Right to Left)**

1. Create a stack and a result array `res` of size `n` initialized to -1.
2. Iterate through the array from `n-1` down to `0`:
   - While the stack is not empty and the top of the stack is less than or equal to the current element, pop from the stack.
   - If the stack is not empty, the next greater element for `arr[i]` is the top of the stack.
   - Push the current element `arr[i]` onto the stack.
3. Print the result array.

This approach ensures each element is pushed and popped from the stack at most once.

**Time Complexity:** O(N) where N is the size of the array.
**Space Complexity:** O(N) to store the result and stack.
