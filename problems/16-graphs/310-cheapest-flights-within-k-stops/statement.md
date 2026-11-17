There are N cities (labeled 0 to N-1) connected by M one-way flights. Each flight goes from city u to city v and costs w.

Given src, dst, and a maximum stop budget K, find the cheapest total price to travel from src to dst using a route with at most K stops (a stop is an intermediate city, so the route may use at most K + 1 flights). If no such route exists, return -1.

**Input Format:**
- First line: N M
- Next M lines: u v w (a flight from u to v with price w)
- Last line: src dst K

**Output Format:**
- A single integer representing the cheapest flight cost, or -1.
