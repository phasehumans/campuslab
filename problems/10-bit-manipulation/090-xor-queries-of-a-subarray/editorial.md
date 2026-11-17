**Approach: Prefix XOR**

Precompute prefix XORs where `pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i-1]`. The query `[left, right]` can then be answered in O(1) time as `pref[right + 1] ^ pref[left]`, because the prefix XOR up to `left-1` cancels out.

**Time Complexity:** O(n + q)
**Space Complexity:** O(n)
