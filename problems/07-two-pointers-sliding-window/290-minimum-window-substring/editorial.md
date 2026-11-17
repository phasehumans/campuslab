**Approach: Sliding Window (Two Pointers)**

1. Maintain a frequency map `count_t` of characters in string `t`.
2. Keep a sliding window `[left, right]` and a frequency map `count_w` of characters in the current window.
3. Keep track of how many unique characters in `t` have their frequency requirements met in `count_w` (`formed` count).
4. Expand `right` and update `formed`. When `formed` matches the total number of unique characters required, contract the window from the `left` while it remains valid, updating the minimum window length and start position.

**Time Complexity:** O(|s| + |t|)
**Space Complexity:** O(|s| + |t|) where space is used for the character frequency counts.

Record a window only when it is strictly shorter than the best so far; that keeps the leftmost window among those of minimum length.
