Given two integers n and r, calculate the number of combinations C(n, r) modulo 10^9 + 7.

Formula:
- C(n, r) = n! / (r! * (n - r)!) if 0 <= r <= n
- C(n, r) = 0 if r > n

**Input Format:**
- A single line containing two space-separated integers n and r.

**Output Format:**
- A single line containing the value of C(n, r) % 1000000007.
