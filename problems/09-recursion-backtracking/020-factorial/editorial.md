**Approach: Recursion**

The factorial of a number can be defined recursively as:
- fact(0) = 1
- fact(n) = n * fact(n - 1) for n > 0

Since 20! is a very large value (approx 2.43 * 10^18), you must use 64-bit integers (`long long` in C++) to avoid integer overflow. Time complexity is O(n), and space complexity is O(n) due to recursion stack depth.
