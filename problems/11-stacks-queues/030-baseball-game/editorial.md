**Approach: Stack Simulation**

1. Initialize an empty stack `scores` to keep track of the record.
2. Iterate through each operation in the input:
   - If the operation is an integer, parse it and push it onto `scores`.
   - If it is "+", get the top two elements, sum them, and push the sum onto `scores`.
   - If it is "D", double the top element and push the result onto `scores`.
   - If it is "C", pop the top element from `scores`.
3. Sum all the values in the stack and print the result.

**Time Complexity:** O(N) where N is the number of operations.
**Space Complexity:** O(N) to store the scores in the stack.
