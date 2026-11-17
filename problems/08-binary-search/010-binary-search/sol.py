import sys
from bisect import bisect_left

def main():
    d = sys.stdin.read().split()
    n, k = int(d[0]), int(d[1])
    a = list(map(int, d[2:2 + n]))
    i = bisect_left(a, k)
    print(i if i < n and a[i] == k else -1)

main()
