**Approach: Prefix & Suffix Products**

1. Create a `prefix` array where `prefix[i]` is the product of all elements to the left of `arr[i]`, modulo 10^9 + 7.
2. Create a `suffix` array where `suffix[i]` is the product of all elements to the right of `arr[i]`, modulo 10^9 + 7.
3. The answer for each index `i` is `(prefix[i] * suffix[i]) % MOD`.

**Time Complexity:** O(n)
**Space Complexity:** O(n) space for prefix/suffix arrays.
