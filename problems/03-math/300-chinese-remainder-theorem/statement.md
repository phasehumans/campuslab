Given two arrays num and rem of size k, where elements of num are pairwise coprime. Find the smallest non-negative integer x such that:
- x % num[i] == rem[i] for all 0 <= i < k

Output the answer modulo the product of all elements of num.

**Input Format:**
- First line: integer k (number of congruence equations)
- Second line: k space-separated integers representing the array num
- Third line: k space-separated integers representing the array rem

**Output Format:**
- A single line containing the smallest non-negative integer x.
