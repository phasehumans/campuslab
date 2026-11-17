**Approach: Backward Traversal**

Start at index |s| - 1. Loop backward to skip all trailing spaces. Once you find a non-space character, continue backward counting each character until you hit a space or the start of the string. Return this count.

**Time Complexity:** O(N) where N is the length of s.
**Space Complexity:** O(1).
