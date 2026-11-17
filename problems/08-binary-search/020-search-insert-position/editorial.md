**Approach: Binary Search for Lower Bound**

We want to find the first index mid where arr[mid] >= target. If we find such an element, we search left (high = mid - 1) to find a smaller index that still satisfies the condition. If arr[mid] < target, we search right (low = mid + 1). The answer is the smallest index that satisfies the condition.

**Time Complexity:** O(log N)
**Space Complexity:** O(1)
