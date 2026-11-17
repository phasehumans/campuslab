n, target = map(int, input().split())
cands = list(map(int, input().split()))
ways = [0] * (target + 1)
ways[0] = 1
for c in cands:
    for t in range(c, target + 1):
        ways[t] += ways[t - c]
print(ways[target])
