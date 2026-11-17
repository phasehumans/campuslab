import sys
from bisect import bisect_right

def main():
    d = sys.stdin.read().split()
    n, k = int(d[0]), int(d[1])
    a = sorted(map(int, d[2:2 + n]))
    if n <= 400:
        ds = sorted(a[j] - a[i] for i in range(n) for j in range(i + 1, n))
        print(ds[k - 1])
        return

    def count(x):
        # pairs (i<j) with a[j]-a[i] <= x
        return sum(bisect_right(a, a[i] + x, i + 1) - i - 1 for i in range(n))

    lo, hi = 0, a[-1] - a[0]
    while lo < hi:
        mid = (lo + hi) // 2
        if count(mid) >= k:
            hi = mid
        else:
            lo = mid + 1
    print(lo)

main()
