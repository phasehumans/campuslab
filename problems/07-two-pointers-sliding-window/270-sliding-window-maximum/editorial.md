**Approach: Monotonic Deque**

1. Initialize a double-ended queue (deque) which will store indices of array elements.
2. For each element `arr[i]`:
   - Remove indices from the front of the deque if they are out of the current window (i.e. `index + k <= i`).
   - Remove indices from the back of the deque if their corresponding value is less than or equal to the current element `arr[i]`.
   - Add the current index `i` to the back of the deque.
   - The maximum element for the current window is at the front of the deque. Add it to results if `i >= k - 1$.

**Time Complexity:** O(N) because each element index is pushed and popped from the deque at most once.
**Space Complexity:** O(K) for the deque.
