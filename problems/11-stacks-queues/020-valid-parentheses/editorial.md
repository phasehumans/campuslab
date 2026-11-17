**Approach: Stack**

1. Initialize an empty stack.
2. Iterate through each character in the string.
3. If it is an opening bracket ('(', '{', '['), push it onto the stack.
4. If it is a closing bracket, check if the stack is empty. If it is empty, or if the top of the stack doesn't match the closing bracket, return false.
5. Otherwise, pop the opening bracket from the stack.
6. After iterating through the entire string, return true if the stack is empty, and false otherwise.

**Time Complexity:** O(N) where N is the length of the string.
**Space Complexity:** O(N) in the worst case to store the stack.
