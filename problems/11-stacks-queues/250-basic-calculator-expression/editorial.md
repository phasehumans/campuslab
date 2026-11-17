**Approach: Stack-Based Evaluation**

1. Maintain two variables: `current_sum` for the expression sum so far, and `sign` (1 or -1) to represent the current operation sign.
2. Maintain a stack of integers.
3. Iterate through characters in the string:
   - If the character is a digit, parse the full integer `num` (which can be multi-digit), and add `sign * num` to `current_sum`.
   - If the character is '+', set `sign = 1`.
   - If it is '-', set `sign = -1`.
   - If it is '(', push `current_sum` then push `sign` to the stack. Then reset `current_sum = 0` and `sign = 1`.
   - If it is ')', pop the sign `prev_sign` from the stack and multiply with `current_sum`. Then pop the previous sum `prev_sum` and add it to get the updated `current_sum`.
4. Return `current_sum`.

**Time Complexity:** O(N) where N is the length of the string.
**Space Complexity:** O(N) to store states on parentheses nesting.
