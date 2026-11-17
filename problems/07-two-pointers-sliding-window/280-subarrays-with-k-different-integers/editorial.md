**Approach: Sliding Window (atMostK)**

1. Define a helper function `atMostK(arr, K)` which returns the number of subarrays with at most `K` distinct integers.
2. Inside `atMostK`, use a sliding window with a frequency map. Expand the right pointer. If the distinct count exceeds `K`, shrink the left pointer until distinct count is `K` or less.
3. The number of valid subarrays ending at `right` is `right - left + 1`. Sum these up.
4. The final answer is `atMostK(arr, K) - atMostK(arr, K - 1)`.

**Time Complexity:** O(N)
**Space Complexity:** O(N) for the frequency counts map.
