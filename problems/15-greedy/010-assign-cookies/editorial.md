**Approach: Greedy + Sorting**

By sorting both arrays, we can align the children and the cookies. For each child, we want to find the smallest cookie that satisfies their greed. Since both arrays are sorted, a two-pointer approach works optimally.

**Complexity:**
- Time Complexity: O(n log n + m log m) due to sorting.
- Space Complexity: O(1) if sorting in place.
