**Approach: Two-pass Frequency Count**

We count the occurrences of each character in the string. Since the alphabet is lowercase English letters, we can use a frequency array of size 26 or a hash map. In the first pass, we populate the frequency table. In the second pass, we scan the string from left to right, checking the frequency of each character. The first character that has a frequency of 1 is the first non-repeating character, and we print its index. If we scan the entire string and find no such character, we print -1.

**Time Complexity:** O(N) where N is the length of `s`, as we do two linear scans.
**Space Complexity:** O(1) because the size of the alphabet is constant (26).
