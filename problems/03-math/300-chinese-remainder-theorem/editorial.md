**Approach: Chinese Remainder Theorem (CRT)**

We have a system of congruences:
`x = rem[i] (mod num[i])` for `0 <= i < k`.

Algorithm:
1. Compute the product `M = num[0] * num[1] * ... * num[k-1]`.
2. For each `i`:
   - Compute `M_i = M / num[i]`.
   - Find the modular inverse `t_i` of `M_i` modulo `num[i]` using the Extended Euclidean Algorithm.
   - Add `rem[i] * t_i * M_i` to the sum.
3. Return `sum % M`.

To prevent intermediate 64-bit integer overflow during calculations, we can:
- Compute `term = (rem[i] * t_i) % num[i]`.
- Then multiply `term * M_i` and add to sum modulo `M`.
- Use `__int128` in C++.

**Time Complexity:** O(k log(max(num[i])))
**Space Complexity:** O(k)
