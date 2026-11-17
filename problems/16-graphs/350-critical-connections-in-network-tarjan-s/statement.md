Given a network of N servers (numbered 0 to N-1) and M connections, find all critical connections (bridges). The network is connected, has no self-loops and no repeated connections.

An edge is critical if its removal increases the number of connected components.

To make the output deterministic: for each critical connection [u, v], sort it so u < v. Then sort the list of connections lexicographically and print each connection on a new line.

**Input Format:**
- First line: N M
- Next M lines: u v (undirected connection)

**Output Format:**
- Critical connections printed as 'u v' (one per line, sorted).
