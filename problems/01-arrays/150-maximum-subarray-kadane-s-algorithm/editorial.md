**Approach: Kadane's Algorithm**

Iterate through the array and maintain `curr_max` (the maximum sum ending at the current index) and `max_so_far` (the overall maximum sum). At each step, update `curr_max = max(arr[i], curr_max + arr[i])` and `max_so_far = max(max_so_far, curr_max).

**Time Complexity:** O(n)
**Space Complexity:** O(1)
