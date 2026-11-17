Design a way to pack a list of strings into a single string so that it can be sent over a network and unpacked back into exactly the same list. The strings may contain any printable characters, including spaces, digits and `#`, and may be empty, so a plain separator character is not enough.

Use **length-prefix encoding**: each string `s` is written as its length in decimal, followed by the character `#`, followed by `s` itself. The encoded string is the concatenation of these pieces in order. For example, `["hello", "world"]` becomes `5#hello5#world`, and `["", "a#"]` becomes `0#2#a#`.

Then decode the encoded string again (read the number up to the first `#`, take exactly that many characters, repeat) to show that the original list comes back.

**Input Format:**
- First line: integer `n` (number of strings)
- Subsequent `n` lines: each line contains a string (which can be empty, or contain spaces, but no newlines).

**Output Format:**
- First line: the encoded string length
- Second line: the encoded string
- Next `n` lines: the decoded strings (one per line).
