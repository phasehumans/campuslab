**Approach: Modulo Prefix Sum Frequency Map**

We track the running sum of the array, `curr_sum`. For any subarray `nums[i..j]` to have a sum divisible by `k`, the condition `(prefixSum[j] - prefixSum[i-1]) % k == 0` must hold. This is equivalent to `prefixSum[j] % k == prefixSum[i-1] % k`.
Thus, we can keep track of the occurrences of each remainder when the prefix sums are divided by `k`.
At each index, we compute `rem = curr_sum % k`. In C++, `curr_sum % k` can be negative. We normalize it to a positive value in `[0, k-1]` using `((curr_sum % k) + k) % k`.
We add the current frequency of `rem` to our result and then increment its count in our map. We initialize the map with `0 -> 1` to represent a prefix sum of 0 having been seen once.

**Time Complexity:** O(N) since we perform a single pass through the array of size N.
**Space Complexity:** O(min(N, K)) to store the frequencies of the remainders in the hash map.
