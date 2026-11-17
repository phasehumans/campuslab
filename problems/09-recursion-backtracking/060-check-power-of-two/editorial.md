**Approach: Recursive division**

A number is a power of two if it can be recursively divided by 2 down to 1. 
- Base case 1: n <= 0, return false
- Base case 2: n == 1, return true
- Recursive step: if n is odd, it is not a power of two (return false). Otherwise, return check(n / 2).

Time complexity is O(log n), space complexity is O(log n) stack frames.
