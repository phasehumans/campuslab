**Approach 1 (arithmetic):** if `x < 0`, the answer is `false`. Otherwise repeatedly take the last digit (`x % 10`), append it to a running reverse (`rev = rev * 10 + digit`) and drop it from `x` (`x /= 10`). The number is a palindrome exactly when the reverse equals the original value. Use a 64-bit integer for `rev`.

**Approach 2 (string):** convert `x` to a string and compare characters from both ends with two pointers. The minus sign automatically makes negative numbers fail.

**Time Complexity:** O(d), where d is the number of digits (at most 10)
**Space Complexity:** O(1) for the arithmetic approach, O(d) for the string approach
