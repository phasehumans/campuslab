Let dp(i, j) be the boolean answer for s[i...] and p[j...]. If p[j+1] == '*', we can either skip the pattern (dp(i, j+2)) or match s[i] (if s[i] matches p[j]) and check dp(i+1, j).
