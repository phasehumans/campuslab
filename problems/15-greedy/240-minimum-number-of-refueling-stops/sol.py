import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    target, start = d[0], d[1]
    n = d[2]
    st = [(d[3 + 2 * i], d[4 + 2 * i]) for i in range(n)]
    # far[j] = furthest distance reachable using exactly j refuelling stops (DP, O(n^2)).
    far = [start] + [0] * n
    for pos, fuel in st:
        for j in range(n, 0, -1):
            if far[j - 1] >= pos:
                far[j] = max(far[j], far[j - 1] + fuel)
    for j in range(n + 1):
        if far[j] >= target:
            print(j)
            return
    print(-1)

main()
