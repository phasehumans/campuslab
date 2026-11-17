import sys

def main():
    d = sys.stdin.read().split()
    n, h = int(d[0]), int(d[1])
    piles = list(map(int, d[2:2 + n]))

    def hours(k):
        return sum((p + k - 1) // k for p in piles)

    # invariant: hours(lo) > h (or lo == 0), hours(hi) <= h
    lo, hi = 0, max(piles)
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if hours(mid) <= h:
            hi = mid
        else:
            lo = mid
    print(hi)

main()
