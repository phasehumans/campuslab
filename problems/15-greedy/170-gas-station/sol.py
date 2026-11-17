import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    gas = list(map(int, d[1:1 + n]))
    cost = list(map(int, d[1 + n:1 + 2 * n]))
    # The tank level along the route, starting at 0 from station 0, is a prefix sum.
    # The answer is the station where that prefix sum is lowest (if the total is >= 0).
    total = 0
    best, best_idx = 0, 0
    for i in range(n):
        if total < best:
            best, best_idx = total, i
        total += gas[i] - cost[i]
    print(best_idx if total >= 0 else -1)

main()
