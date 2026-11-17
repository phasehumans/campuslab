**Approach: Partitioning with Lowest Set Bit**

1. XOR all numbers in the array to get `diff = x ^ y`.
2. Find the lowest set bit in `diff` using `diff & -diff`.
3. Partition all numbers in the array into two groups: those that have this bit set, and those that do not. x and y will end up in different groups, and all duplicate pairs will cancel out within their respective groups.
4. Print the remaining numbers in ascending order.

**Time Complexity:** O(n)
**Space Complexity:** O(1)
