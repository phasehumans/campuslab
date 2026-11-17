**Approach: Double Character Mapping**

We can track character maps using two arrays or hash maps: `mapS` maps characters in `s` to characters in `t`, and `mapT` maps characters in `t` to characters in `s`. If at any index `i`, the mapping does not match the previously stored values, then the strings are not isomorphic.

**Time Complexity:** O(n) where n is the length of string `s`.
**Space Complexity:** O(K) where K is the size of the character set (ASCII size = 256).
