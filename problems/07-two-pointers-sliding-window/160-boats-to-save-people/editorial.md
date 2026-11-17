Sort the weights array. Maintain two pointers: left = 0 (lightest) and right = n - 1 (heaviest). If people[left] + people[right] <= limit, they share a boat and we increment left. In all cases, the heaviest person gets a boat, so we decrement right and increment the boat count.

**Time Complexity:** O(n log n) for sorting.
**Space Complexity:** O(log n) or O(n) for sorting depending on the language.
