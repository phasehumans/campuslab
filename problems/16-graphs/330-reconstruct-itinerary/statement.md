Given a list of N airline tickets where each ticket consists of a pair of [from, to] airports, reconstruct the itinerary in order and return it. The itinerary must begin with 'JFK' and must use every ticket exactly once. It is guaranteed that at least one such itinerary exists.

If there are multiple valid itineraries, return the one that has the smallest lexical order, comparing itineraries airport by airport (for example, JFK LGA is smaller than JFK LGB). Every airport code consists of exactly 3 uppercase letters, so this is the same as comparing the itineraries as single strings.

**Input Format:**
- First line: N
- Next N lines: from to

**Output Format:**
- A single line containing the space-separated sequence of airport codes representing the itinerary.
