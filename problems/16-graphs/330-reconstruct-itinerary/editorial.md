**Approach: Hierholzer's algorithm for an Eulerian path**

Each ticket is a directed edge, and a valid itinerary is a path that uses every edge exactly once (an Eulerian path) starting at JFK.

Sort every airport's outgoing destinations so the smallest is tried first. Run Hierholzer's algorithm: from the current airport keep taking the smallest unused ticket; when an airport has no unused tickets left, append it to the answer and backtrack. The answer is built in reverse. Taking the smallest ticket first and appending only at dead ends produces the lexicographically smallest Eulerian path: a "wrong" early choice that strands tickets ends up later in the reversed order, after all the tickets it leaves behind are spliced in.

**Complexity:** O(N log N) time for sorting, O(N) space.
