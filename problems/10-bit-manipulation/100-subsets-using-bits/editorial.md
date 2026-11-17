**Approach: Bitmask enumeration**

Iterate mask from 0 to 2^n - 1. For each mask, check each bit position j: if bit j is set, include arr[j] in the subset.

**Time Complexity:** O(n * 2^n)
**Space Complexity:** O(n) per subset
