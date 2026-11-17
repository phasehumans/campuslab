import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n = d[0]
    deg = [0] * (n + 1)
    for x in d[1:1 + 2 * (n - 1)]:
        deg[x] += 1
    print(max(range(1, n + 1), key=lambda v: deg[v]))  # the center has degree n - 1

main()
