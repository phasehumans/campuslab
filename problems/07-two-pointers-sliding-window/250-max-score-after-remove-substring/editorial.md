Without loss of generality, assume x >= y. First, run a stack-based greedy pass to remove all occurrences of "ab" and gain x points per removal. Then, run a second pass on the remaining characters in the stack to remove all occurrences of "ba" and gain y points per removal.

**Time Complexity:** O(|s|)
**Space Complexity:** O(|s|) for the stack.
