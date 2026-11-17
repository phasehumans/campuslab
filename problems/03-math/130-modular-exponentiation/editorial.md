**Approach: Binary Exponentiation**

To compute `(x^n) % m` efficiently, we can use binary exponentiation. Instead of multiplying `x` `n` times (which is O(n) and too slow), we can express the exponent in binary.

For example, to compute `x^13`, we can write `13` in binary as `1101_2`, so `x^13 = x^8 * x^4 * x^1`.

Algorithm:
1. If `m == 1`, return 0.
2. Initialize `res = 1` and `x = x % m`.
3. While `n > 0`:
   - If the least significant bit of `n` is 1 (i.e. `n % 2 == 1`), update `res = (res * x) % m`.
   - Update `x = (x * x) % m`.
   - Right-shift `n` by 1 (`n = n / 2`).
4. Return `res`.

**Time Complexity:** O(log n)
**Space Complexity:** O(1)
