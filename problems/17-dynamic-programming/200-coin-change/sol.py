import sys

data = sys.stdin.read().split()
n, amount = int(data[0]), int(data[1])
coins = sorted(set(c for c in map(int, data[2:2 + n]) if c <= amount))
# BFS over amounts: the level at which `amount` is first reached is the coin count
dist = [-1] * (amount + 1)
dist[0] = 0
frontier = [0]
while frontier and dist[amount] == -1:
    nxt = []
    for v in frontier:
        d = dist[v] + 1
        for c in coins:
            w = v + c
            if w > amount:
                break
            if dist[w] == -1:
                dist[w] = d
                nxt.append(w)
    frontier = nxt
print(dist[amount])
