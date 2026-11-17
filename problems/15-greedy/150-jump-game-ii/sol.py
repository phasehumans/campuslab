import sys
from collections import deque

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    a = list(map(int, d[1:1 + n]))
    # BFS over indices; every index is enqueued once because we only push
    # indices beyond the furthest one pushed so far.
    dist = [-1] * n
    dist[0] = 0
    furthest = 0
    q = deque([0])
    while q:
        i = q.popleft()
        if i == n - 1:
            break
        hi = min(n - 1, i + a[i])
        for j in range(furthest + 1, hi + 1):
            dist[j] = dist[i] + 1
            q.append(j)
        furthest = max(furthest, hi)
    print(dist[n - 1])

main()
