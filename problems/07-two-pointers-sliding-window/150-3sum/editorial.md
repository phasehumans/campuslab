**Approach: Sort and Two Pointers**

1. Sort the array in non-decreasing order.
2. Loop through the array from index 0 to n-3. Skip duplicate values to avoid duplicate triplets.
3. For each element at index `i`, set `left = i + 1` and `right = n - 1`.
4. While `left < right`, check if `arr[i] + arr[left] + arr[right] == 0`.
5. If it is 0, print the triplet, and increment `left` and decrement `right`, skipping duplicates for both.
6. If the sum is less than 0, increment `left`. Otherwise, decrement `right`.

**Time Complexity:** O(N^2)
**Space Complexity:** O(1) auxiliary space (excluding sorting space).
