Build a directed graph where an edge `u -> v` means letter `u` comes before letter `v`; only the first differing position of two adjacent words gives information.
Run topological sort using Kahn's algorithm, picking the smallest available letter with a priority queue.
