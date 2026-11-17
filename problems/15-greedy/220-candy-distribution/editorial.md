**Approach: Two passes (Left & Right)**

Initialize candies array with 1s. In the left-to-right pass, if rating[i] > rating[i-1], update candies[i] = candies[i-1] + 1. In the right-to-left pass, if rating[i] > rating[i+1], update candies[i] = max(candies[i], candies[i+1] + 1). Sum up the candies array for the final answer.

**Complexity:**
- Time Complexity: O(n) for two passes.
- Space Complexity: O(n) for the candies array.
