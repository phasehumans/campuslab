**Approach: Sorted String as Hash Map Key**

We iterate through the list of strings. For each string, we create a sorted copy of its characters. This sorted string is a unique key for its anagram group. We insert the original string into a hash map where the key is the sorted string. After grouping, we sort each group individually, then sort all the groups lexicographically based on their first word, ensuring deterministic output.

**Time Complexity:** O(n * L log L + n log n) where n is the number of strings and L is the maximum length of a string.
**Space Complexity:** O(n * L) to store the strings in the hash map.
