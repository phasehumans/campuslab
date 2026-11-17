**Approach: Sieve of Eratosthenes**

1. Sieve prime numbers up to R (max 5 * 10^6).
2. Count all indices `i` in the range `[L, R]` where `isPrime[i]` is true.
3. Prefix sum over array indices can be used to count primes efficiently in under 0.05s.

**Time Complexity:** O(R log log R) for sieve, O(R - L) for counting
**Space Complexity:** O(R)
