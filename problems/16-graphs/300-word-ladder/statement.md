Given beginWord, endWord and a wordList of size K, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

A transformation sequence is beginWord -> w1 -> w2 -> ... -> endWord where:
- consecutive words differ in exactly one position (one character is changed at a time),
- every word after beginWord (including endWord) must appear in wordList. beginWord itself does not need to be in the list.

The answer counts every word in the sequence, including beginWord and endWord.

**Input Format:**
- First line: beginWord
- Second line: endWord
- Third line: K
- Next K lines: words in wordList

**Output Format:**
- An integer representing the ladder length.
