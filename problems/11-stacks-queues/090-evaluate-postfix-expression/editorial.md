**Approach: Stack Evaluation**

1. Initialize an empty stack.
2. Iterate through each token in the expression:
   - If the token is a number, convert it to an integer and push it to the stack.
   - If it is an operator, pop two operands `b` (the second popped) and `a` (the first popped), perform the operation `a operator b`, and push the result back onto the stack.
3. The final element remaining in the stack is the result.

**Time Complexity:** O(N) where N is the number of tokens.
**Space Complexity:** O(N) to store operands in the stack.
