Create a prefix sum array. Maintain a monotonic deque storing indices of prefix sums. For each index, check if the current prefix sum minus the prefix sum at the front of the deque is >= k.
