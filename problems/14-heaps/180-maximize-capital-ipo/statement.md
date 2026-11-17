You are given `n` projects where the `i`-th project has a pure profit `profits[i]` and a minimum capital `capital[i]` needed to start it.

Initially, you have `w` capital. When you finish a project, you will obtain its pure profit and your capital will be increased by that profit.

Pick a list of at most `k` distinct projects from the given projects to maximize your final capital, and return the final maximized capital.

**Input Format:**
- First line: three space-separated integers `n`, `k`, and `w` (initial capital).
- Second line: `n` space-separated integers representing the profits of each project.
- Third line: `n` space-separated integers representing the capital required for each project.

**Output Format:**
- A single integer representing the maximum capital after completing at most `k` projects.
