**Approach: Factorization and Combinatorics in O(sqrt(L/G))**

1. If L % G != 0, return 0 because LCM must be a multiple of GCD.
2. Otherwise, let d = L / G. We want to find the number of coprime pairs (a, b) such that a * b = d. Any such pair corresponds to a unique solution (A, B) = (G*a, G*b).
3. Since gcd(a, b) = 1, each prime power component p^e in the factorization of d must be fully assigned to either a or b.
4. Thus, if d has k distinct prime factors, there are 2^k possible choices to distribute the prime factors.
5. We can find the distinct prime factors of d in O(sqrt(d)) time using trial division. Since d <= 10^12, sqrt(d) <= 10^6, which easily runs within time limits.

**Time Complexity:** O(sqrt(L/G))
**Space Complexity:** O(1)
