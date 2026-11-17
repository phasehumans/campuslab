**Approach: Binary Search on Distance + Sliding Window**

1. Sort the input array `nums`. The minimum possible pair distance is `0`, and the maximum possible pair distance is `nums[N-1] - nums[0]`. This defines our binary search range `[low, high]`.
2. In each step, we calculate `mid = low + (high - low) / 2` and check the number of pairs with distance <= `mid`.
3. To count pairs with distance <= `mid` in O(N):
   - Use a sliding window with two pointers `l` and `r`.
   - For each right endpoint `r` from 0 to N - 1, advance the left pointer `l` until `nums[r] - nums[l] <= mid`.
   - The number of valid pairs ending at `r` is `r - l`. Sum these counts up across all `r`.
4. If the total count of pairs with distance <= `mid` is greater than or equal to `K`, it means the K-th smallest distance is at most `mid` (we search left: `high = mid`). Otherwise, the target distance is greater than `mid` (we search right: `low = mid + 1`).

**Time Complexity:** O(N log N + N log(max_dist)) where `max_dist = nums[N-1] - nums[0]`.
**Space Complexity:** O(1) auxiliary space.
