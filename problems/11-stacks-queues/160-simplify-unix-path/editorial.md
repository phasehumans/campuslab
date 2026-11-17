**Approach: Stack with Delimiter Splitting**

1. Split the input string using '/' as a delimiter.
2. Maintain a stack of strings representing the directory path.
3. Iterate through each token from the split:
   - If the token is empty or ".", ignore it.
   - If the token is "..", pop from the stack (if the stack is not empty) to go up one level.
   - For any other token, push it to the stack.
4. Join the elements in the stack with '/' as a separator and prefix with '/'. If the stack is empty, return "/".

**Time Complexity:** O(N) where N is the length of the string.
**Space Complexity:** O(N) to store directory names in the stack.
