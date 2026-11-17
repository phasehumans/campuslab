import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n = d[0]
    g = d[1:1 + n * n]
    if g[0] or g[-1]:
        print(-1)
        return
    # BFS by frontiers over flattened indices
    dist = [0] * (n * n)
    dist[0] = 1
    frontier = [0]
    step = 1
    while frontier and not dist[-1]:
        step += 1
        nxt = []
        for k in frontier:
            i, j = divmod(k, n)
            for di in (-1, 0, 1):
                x = i + di
                if not 0 <= x < n:
                    continue
                for dj in (-1, 0, 1):
                    y = j + dj
                    if 0 <= y < n:
                        nk = x * n + y
                        if not g[nk] and not dist[nk]:
                            dist[nk] = step
                            nxt.append(nk)
        frontier = nxt
    print(dist[-1] if dist[-1] else -1)

main()
