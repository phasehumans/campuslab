**Approach: Stack**

1. Initialize an empty stack (or use the result string as a stack).
2. For each character in the string `s`:
   - If the stack is not empty and the top of the stack is equal to the current character, pop from the stack.
   - Otherwise, push the current character onto the stack.
3. The characters remaining in the stack from bottom to top form the final string.

**Time Complexity:** O(N) where N is the length of the string, since we push and pop each character at most once.
**Space Complexity:** O(N) to store the result stack.
