Let dp[i] represent the minimum number of coins to make up amount i. To calculate dp[i], check all coins c: dp[i] = min(dp[i], dp[i-c] + 1).
