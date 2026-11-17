**Approach: Stack of Scores**

We can maintain a stack to track scores at each nesting level. We start with a single `0` in the stack.
- When we see `(`, we push `0` onto the stack.
- When we see `)`, we pop the top value `v`. If the inner score `v` is `0`, it represents `()`, so its score is `1`. Otherwise, the inner score is `2 * v` (since it represents `(A)`). We then add this score to the new top of the stack.

**Time Complexity:** O(N) where N is the length of string.
**Space Complexity:** O(N) to store values in the stack.
