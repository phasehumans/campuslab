Let dp[i][j] represent the length of the LCS of text1[0...i-1] and text2[0...j-1]. If text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).
