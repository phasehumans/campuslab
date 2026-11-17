You have k lists of sorted integers in non-decreasing order. Find the smallest range [a, b] that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c, or b - a == d - c and a < c.

**Input Format:**
- First line: integer k (number of sorted lists)
- Each of the next k lines represents a list: first value is an integer m_i (size of the list), followed by m_i space-separated sorted integers.

**Output Format:**
- Two space-separated integers representing the boundaries of the smallest range [a, b].
