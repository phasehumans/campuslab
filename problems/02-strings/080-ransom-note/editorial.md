**Approach: Character Count Array**

Since the characters are only lowercase English letters, we can use an integer array of size 26 (acting as a fixed-size Hash Map) to count the frequencies of characters in `magazine`. Next, we iterate through `ransomNote` and decrement the counts. If any character frequency becomes negative, it means we don't have enough characters in the magazine, so we output `false`.

**Time Complexity:** O(N + M) where N = |ransomNote| and M = |magazine|.
**Space Complexity:** O(1) space, since we use a fixed-size array of 26 integers.
