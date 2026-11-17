import sys

def main():
    d = sys.stdin.read().split()
    n, m = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    if m > n:
        print(-1)
        return

    def students_needed(cap):
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
        if students_needed(mid) <= m:
            hi = mid
        else:
            lo = mid + 1
    print(lo)

main()
