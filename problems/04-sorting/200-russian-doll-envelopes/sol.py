import sys

# DP over widths in increasing order with a Fenwick tree (prefix max) over compressed heights.
# Envelopes with equal width are evaluated together before any of them is inserted.
def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    env = sorted((int(d[1 + 2 * i]), int(d[2 + 2 * i])) for i in range(n))
    hs = sorted(set(h for _, h in env))
    rank = {h: i + 1 for i, h in enumerate(hs)}
    m = len(hs)
    tree = [0] * (m + 1)
    best = 0
    i = 0
    while i < n:
        j = i
        while j < n and env[j][0] == env[i][0]:
            j += 1
        vals = []
        for k in range(i, j):
            r = rank[env[k][1]] - 1
            q = 0
            while r > 0:
                if tree[r] > q:
                    q = tree[r]
                r -= r & -r
            vals.append((rank[env[k][1]], q + 1))
        for r, v in vals:
            if v > best:
                best = v
            while r <= m:
                if tree[r] < v:
                    tree[r] = v
                r += r & -r
        i = j
    print(best)

main()
