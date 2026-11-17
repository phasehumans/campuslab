**Approach: Greedy Line Construction & Space Distribution**

1. Iterate through words, finding the maximum number of words that can fit in a line of length `maxWidth` (including a minimum of one space between words).
2. If it is the last line or a line with only one word, left-justify the words (separate by single spaces and pad the remaining spaces at the end).
3. Otherwise, calculate the total spaces needed, `spaces_to_add = maxWidth - total_words_len`. Distribute these spaces as evenly as possible between words: `base_spaces = spaces_to_add / (num_words - 1)` and the first `spaces_to_add % (num_words - 1)` gaps get an extra space.

**Time Complexity:** O(total characters of all words)
**Space Complexity:** O(maxWidth) to construct each line.
