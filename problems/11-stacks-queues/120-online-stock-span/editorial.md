**Approach: Monotonic Stack of Pairs**

1. Use a stack to store pairs of `(price, span)`.
2. For each day's price:
   - Initialize `span = 1`.
   - While the stack is not empty and the top element's price is less than or equal to the current price:
     - Accumulate its span: `span += stack.top().span`.
     - Pop the element from the stack.
   - Push the pair `(current_price, span)` onto the stack.
   - The current span is the answer for this day.
3. Print the span values for all days.

**Time Complexity:** O(N) since each price is pushed and popped at most once.
**Space Complexity:** O(N) to store pairs in the stack.
