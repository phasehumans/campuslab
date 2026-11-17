import sys

data = sys.stdin.read().split()
s, p = data[0], data[1]
n, m = len(s), len(p)
# dp[i][j]: does the prefix s[:i] match the prefix p[:j]?  (bottom-up over prefixes)
dp = [[False] * (m + 1) for _ in range(n + 1)]
dp[0][0] = True
for i in range(n + 1):
    for j in range(1, m + 1):
        if p[j - 1] == "*":
            prev = p[j - 2]
            res = dp[i][j - 2]  # use the starred element zero times
            if not res and i > 0 and (prev == "." or prev == s[i - 1]):
                res = dp[i - 1][j]  # consume one more character with it
            dp[i][j] = res
        elif i > 0 and (p[j - 1] == "." or p[j - 1] == s[i - 1]):
            dp[i][j] = dp[i - 1][j - 1]
print("true" if dp[n][m] else "false")
