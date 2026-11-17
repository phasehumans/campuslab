**Approach: Primality Test in O(sqrt(n))**

To determine if a number n is prime:
1. If n <= 1, it is not prime, return false.
2. Loop from i = 2 up to the square root of n. If i divides n, then n is composite, so return false.
3. If no divisors are found in the loop, then n is prime, so return true.

**Time Complexity:** O(sqrt(n))
**Space Complexity:** O(1)
