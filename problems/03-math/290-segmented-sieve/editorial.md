**Approach: Segmented Sieve**

The standard Sieve of Eratosthenes is not feasible for R <= 10^12 due to space and time limits. However, since the range R - L is small (R - L <= 10^6), we can use a Segmented Sieve.

1. Find all primes up to sqrt(R) <= 10^6 using a simple Sieve of Eratosthenes.
2. Create a boolean array `isPrimeSeg` of size R - L + 1, initialized to true.
3. For each prime `p` in our precomputed primes, find the smallest multiple of `p` that is >= L and >= p^2. Let this be `start = max(p * p, ((L + p - 1) / p) * p)`.
4. Iterate `i` from `start` to `R` in steps of `p`, and set `isPrimeSeg[i - L] = false`.
5. If L = 1, mark `isPrimeSeg[0] = false` (as 1 is not prime).
6. The number of true values in `isPrimeSeg` is the count of primes in [L, R].

**Time Complexity:** O(sqrt(R) log log sqrt(R) + (R - L) log log R)
**Space Complexity:** O(sqrt(R) + (R - L))
