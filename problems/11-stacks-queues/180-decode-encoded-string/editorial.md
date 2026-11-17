**Approach: Two Stacks**

1. Maintain a `countStack` to store repetition values and `stringStack` to store accumulated strings.
2. Iterate through each character in the string:
   - If the character is a digit, compute the value of the number `k` (it can have multiple digits).
   - If it is '[', push the current `k` to `countStack`, push the current `currentString` to `stringStack`, and reset both `k` and `currentString`.
   - If it is ']', pop the repeat count `count` from `countStack` and the previous string `prevString` from `stringStack`. Set `currentString = prevString + repeat(currentString, count)`.
   - If it is a character, append it to `currentString`.
3. Return `currentString`.

**Time Complexity:** O(L) where L is the length of the decoded string, as we build the string character by character.
**Space Complexity:** O(S) where S is the number of brackets (nested level) to store state in the stacks.
