You are given two integer arrays nums1 and nums2 sorted in non-decreasing order, and an integer k.

Define a pair (u, v) which consists of one element from nums1 and one element from nums2. Find the k pairs with the smallest sums.

To ensure a unique output:
- Sort the pairs by their sum in ascending order.
- If two pairs have the same sum, sort them lexicographically (i.e., by their first element, then by their second element).

**Input Format:**
- First line: two integers, the size of nums1 (n1) and nums2 (n2)
- Second line: n1 space-separated integers representing nums1
- Third line: n2 space-separated integers representing nums2
- Fourth line: integer k

**Output Format:**
- k lines (or fewer if total pairs is less than k), each containing two space-separated integers representing a pair.
