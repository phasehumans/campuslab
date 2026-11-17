**Approach: Divisor Sum in O(sqrt(n))**

Every divisor d of n that is less than or equal to sqrt(n) has a paired divisor n/d which is greater than or equal to sqrt(n).
1. Loop from i = 1 to sqrt(n).
2. If i divides n, add i to the sum. If i is not equal to n/i, add n/i to the sum as well.
3. Ensure all variables tracking the sum use 64-bit integer types (long long in C++) to prevent overflow.

**Time Complexity:** O(sqrt(n))
**Space Complexity:** O(1)
