import sys
from bisect import bisect_left, bisect_right

def main():
    d = sys.stdin.read().split()
    n, t = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    l = bisect_left(a, t)
    if l == n or a[l] != t:
        print(-1, -1)
    else:
        print(l, bisect_right(a, t) - 1)

main()
