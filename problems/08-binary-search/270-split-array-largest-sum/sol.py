import sys

def main():
    d = sys.stdin.read().split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    if n <= 60:
        # small inputs: exact DP over prefixes
        pre = [0]
        for x in a:
            pre.append(pre[-1] + x)
        INF = float("inf")
        dp = [[INF] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        for i in range(1, n + 1):
            for j in range(1, min(i, k) + 1):
                best = INF
                for p in range(j - 1, i):
                    v = max(dp[p][j - 1], pre[i] - pre[p])
                    if v < best:
                        best = v
                dp[i][j] = best
        print(dp[n][k])
        return

    def pieces(cap):
        cnt, cur = 1, 0
        for x in a:
            if cur + x > cap:
                cnt += 1
                cur = x
            else:
                cur += x
        return cnt

    lo, hi = max(a), sum(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if pieces(mid) <= k:
            hi = mid
        else:
            lo = mid + 1
    print(lo)

main()
