**Approach: Recursion**

The Fibonacci sequence is defined recursively as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

Because n is small (n <= 30), a simple recursive solution runs quickly. Time complexity is O(2^n) and space complexity is O(n) due to recursion stack depth.
