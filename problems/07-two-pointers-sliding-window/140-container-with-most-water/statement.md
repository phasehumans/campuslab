You are given `n` vertical lines. Line `i` (0-based) stands at x-coordinate `i` and has height `height[i]`.

Choose two of the lines. Together with the x-axis they form a container whose water level can rise only up to the shorter of the two lines. The amount of water it holds is `min(height[i], height[j]) * (j - i)`.

Find the maximum amount of water a container can hold.

**Input Format:**
- First line: integer `n`.
- Second line: `n` space-separated integers `height[0], ..., height[n-1]`.

**Output Format:**
- A single integer: the maximum amount of water.
