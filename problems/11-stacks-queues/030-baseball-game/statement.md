You are keeping the scores for a baseball game with strange rules. The game starts with an empty record.

You are given a list of operations ops, where each operation is one of the following:
- An integer x: Record a new score of x.
- "+": Record a new score that is the sum of the previous two scores. It is guaranteed there will always be at least two previous scores.
- "D": Record a new score that is double the previous score. It is guaranteed there will always be at least one previous score.
- "C": Invalidate the previous score, removing it from the record. It is guaranteed there will always be at least one previous score.

Return the sum of all the scores on the record after applying all the operations.

**Input Format:**
- First line: an integer n (the number of operations)
- Second line: n space-separated strings representing the operations

**Output Format:**
- A single integer representing the sum of all the scores.
