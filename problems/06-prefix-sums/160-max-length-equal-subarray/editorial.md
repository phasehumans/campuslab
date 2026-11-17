**Approach: Prefix Sum and Hash Map**

If we treat 0 as -1, the problem becomes finding the longest subarray with sum 0.
We compute the prefix sums of this modified array. If a prefix sum value repeats at index `i` and index `j` (where `i > j`), it means the elements between `j + 1` and `i` sum up to 0 (meaning equal number of 0s and 1s).
To maximize this length, we store the first index where each prefix sum is encountered in a Hash Map. If we see the prefix sum again, we calculate the difference between the current index and the stored first index. The maximum of these differences is our answer.
We initialize our map with `0 -> -1` to handle subarrays starting from index 0.

**Time Complexity:** O(N) as we traverse the array of size N once.
**Space Complexity:** O(N) to store prefix sums in the map in the worst case.
