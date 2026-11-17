You are given an array of strings products and a string searchWord.

Design a system that suggests at most three products from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix, return the three lexicographically minimum products.

Print the suggestions after each character of searchWord is typed.

**Input Format:**
- First line: integer n, the number of products.
- Next n lines: each contains a product string.
- Last line: string searchWord.

**Output Format:**
- For each character typed in searchWord (from prefix of length 1 to length |searchWord|), print the suggested products on a single line, space-separated, in lexicographical order. If no products match, print a blank line.
