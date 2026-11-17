**Approach: Trial Division up to sqrt(n)**

To find the prime factorization of a number n:
1. Iterate `i` from 2 up to `sqrt(n)`.
2. If `i` divides `n` perfectly, count how many times it divides (`count`). Print `i^count`.
3. Update `n = n / (i^count)`.
4. After examining all candidate divisors up to `sqrt(n)`, if the remaining `n` is greater than 1, it must be prime. In this case, print `n^1`.

**Time Complexity:** O(sqrt(n))
**Space Complexity:** O(1)
