**Approach: Two Pointers**

Since the array is sorted, the squares of the numbers at the ends (extremely negative or extremely positive) will be the largest. Initialize two pointers: `left = 0` and `right = N - 1`. Compare `arr[left] * arr[left]` and `arr[right] * arr[right]`. Place the larger square at the end of the result array and move the respective pointer inward. Repeat until the result array is filled.

**Time Complexity:** O(N)
**Space Complexity:** O(N) to store the result
