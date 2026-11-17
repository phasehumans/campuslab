1. Find the first pair from right to left where arr[i] < arr[i+1]. This is the pivot.
2. If no pivot is found, reverse the entire array.
3. Otherwise, find the next greater element to the right of the pivot, swap them, and reverse the suffix.
