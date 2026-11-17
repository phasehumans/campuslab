You are given an array of CPU tasks, each represented by a letter from A to Z, and a cooling interval n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling. This means there must be a local quarantine of at least n units of time between any two identical tasks.

Return the minimum number of intervals required to complete all the given tasks.

**Input Format:**
- First line: space-separated integers k (number of tasks) and n (cooling interval)
- Second line: k space-separated uppercase characters representing the tasks

**Output Format:**
- A single integer: the minimum number of intervals needed
