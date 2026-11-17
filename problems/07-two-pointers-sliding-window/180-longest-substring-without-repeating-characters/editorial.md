**Approach: Sliding Window**

Maintain a sliding window `[start, i]`. For each character `c = s[i]`, if `c` has been seen within the current window (its stored index >= `start`), move `start` to `index + 1`. Update the last seen position of `c` to `i`, and compute the maximum length `i - start + 1`.

**Time Complexity:** O(n)
**Space Complexity:** O(min(m, n)) where m is the alphabet size.
