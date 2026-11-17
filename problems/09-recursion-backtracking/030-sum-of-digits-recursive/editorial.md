**Approach: Recursion**

The sum of the digits of a number n is recursively formulated as:
- sumDigits(0) = 0
- sumDigits(n) = (n % 10) + sumDigits(n / 10)

Time complexity is O(log_10 n) since we process one digit at a time. Space complexity is O(log_10 n) for recursion stack.
