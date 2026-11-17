Given n and r, calculate the number of permutations P(n, r) modulo 10^9 + 7.

Formula:
- P(n, r) = n! / (n - r)! if 0 <= r <= n
- P(n, r) = 0 if r > n

**Input Format:**
- A single line containing two space-separated integers n and r.

**Output Format:**
- A single line containing the value of P(n, r) % 1000000007.
