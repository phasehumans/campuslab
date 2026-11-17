There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are sorted lexicographically according to the rules of this new language. (As usual, a word that is a proper prefix of another word comes before it.)

Return a string of the unique letters that appear in `words`, sorted in increasing order of the alien language. The input is guaranteed to be consistent: at least one such order exists.

The words may not pin down the order completely. If there are multiple valid orders, return the one that is lexicographically smallest when compared as standard English strings.

**Input Format:**
- First line: integer `n` (number of words)
- Next `n` lines: each line contains a word from the alien dictionary.

**Output Format:**
- A single string containing the sorted alien letters.
