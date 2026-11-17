**Approach: Two Pointers**

1. Initialize pointer `i = 0` for `s` and pointer `j = 0` for `t`.
2. Loop while both pointers are within bounds. If `s[i] == t[j]`, increment `i`.
3. Always increment `j`.
4. After the loop, if `i` equals the length of `s`, it means all characters of `s` were matched in order. Return true, otherwise false.

**Time Complexity:** O(T) where T is the length of string `t`.
**Space Complexity:** O(1) auxiliary space.
