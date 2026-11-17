**Approach: Sorted Backtracking**

By sorting the array, identical values are adjacent. When generating subsets, we can recursively build paths. If we decide not to include the element at the current index, we skip over all identical elements in the array to prevent duplicate subset counts. 

Time complexity is O(2^n), and space complexity is O(n) recursion stack.
