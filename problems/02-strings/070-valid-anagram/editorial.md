**Approach: Frequency Counting**

1. If lengths of the two strings are different, they cannot be anagrams. Return false.
2. Count the occurrences of each character in the first string, and decrement the counts using the second string.
3. If all counts are zero, return true. Otherwise, return false.

**Time Complexity:** O(N) where N is the length of the strings.
**Space Complexity:** O(1) auxiliary space as the character set size is fixed (26 lowercase English letters).
