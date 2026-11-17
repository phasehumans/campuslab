**Approach: Euler's Product Formula in O(sqrt(n))**

Euler's product formula states that `phi(n) = n * product(1 - 1/p)` for distinct prime factors `p` dividing `n`.

1. Initialize `result = n`.
2. Iterate `p` from 2 up to `sqrt(n)`. If `p` divides `n`:
   - Subtract `result / p` from `result`.
   - Divide `n` by `p` repeatedly to divide out all copies of `p`.
3. If at the end `n` is greater than 1, then the remaining `n` is a prime factor of the original number. Subtract `result / n` from `result`.
4. Return `result`.

This yields an O(sqrt(n)) time complexity.

**Time Complexity:** O(sqrt(n))
**Space Complexity:** O(1)
