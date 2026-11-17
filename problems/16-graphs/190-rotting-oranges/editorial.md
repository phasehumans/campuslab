**Approach: multi-source BFS**

Put every rotten orange into the queue at time 0 and run BFS level by level; each level is one minute. Every fresh orange reached is marked rotten and its distance is the minute it rots. The answer is the last level that rotted something, or -1 if a fresh orange is never reached.

**Complexity:** O(R * C) time and space.
