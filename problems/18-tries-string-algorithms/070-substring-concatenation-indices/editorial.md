**Approach: Sliding Window over Word Boundaries**

Instead of checking all substrings of size `word_len * m` from scratch, we can run a sliding window. Since word boundaries can start at any offset `i` from `0` to `word_len - 1`, we slide a window of size `word_len` at a time. We maintain a Hash Map of counts for words in the current window. If we encounter a word not in `words`, we reset the window. If a word's count exceeds the target count, we slide the left boundary of the window to the right until the count is valid. If we match all `m` words, the left boundary is added to the result.

**Time Complexity:** O(|s| * word_len) as we run the sliding window `word_len` times, and each run processes at most |s| / word_len words.
**Space Complexity:** O(m * word_len) to store the words in hash maps.
