Given a directed graph with N vertices (labeled 0 to N-1) and M edges, find the total number of Strongly Connected Components (SCCs) in the graph using Kosaraju's or Tarjan's algorithm.

A strongly connected component is a maximal set of vertices in which every vertex can reach every other vertex by following directed edges. A single vertex on its own always forms an SCC if it is not part of a larger one. Self-loops and repeated edges may appear.

**Input Format:**
- First line: N M
- Next M lines: u v (directed edge u -> v)

**Output Format:**
- A single integer representing the number of SCCs in the graph.
