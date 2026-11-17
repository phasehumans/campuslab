**Approach: Sieve of Eratosthenes**

The Sieve of Eratosthenes is an ancient and efficient algorithm for finding all prime numbers up to any given limit. It runs in O(n log log n) time complexity.

1. Create a boolean array `isPrime` of size `n + 1` and initialize all entries as `true`. Set `isPrime[0]` and `isPrime[1]` to `false`.
2. Loop from `p = 2` to `sqrt(n)`. If `isPrime[p]` is true, then mark all multiples of `p` starting from `p*p` as `false`.
3. Finally, collect and print all indices `p` where `isPrime[p]` is true.

**Time Complexity:** O(n log log n)
**Space Complexity:** O(n)
