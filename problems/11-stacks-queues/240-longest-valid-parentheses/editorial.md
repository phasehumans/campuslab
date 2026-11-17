**Approach: Stack using Sentinel Base Index**

1. Initialize a stack and push `-1` onto it. This `-1` acts as a base boundary for the current valid substring.
2. Initialize `max_len = 0`.
3. Iterate through each character `s[i]` in the string:
   - If `s[i]` is '(', push the index `i` onto the stack.
   - If `s[i]` is ')', pop the top index from the stack.
     - If the stack becomes empty, it means we have an unmatched ')', so we push the current index `i` onto the stack to serve as the new base boundary.
     - If the stack is not empty, the length of the currently matched valid parentheses substring is `i - st.top()`. Update `max_len = max(max_len, i - st.top())`.
4. Print `max_len`.

This single pass approach processes each character in O(1) time.

**Time Complexity:** O(N) where N is the length of the string.
**Space Complexity:** O(N) to store indices in the stack in the worst case.
