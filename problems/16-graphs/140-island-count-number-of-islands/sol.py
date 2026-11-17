import sys

def main():
    d = sys.stdin.read().split()
    r, c = int(d[0]), int(d[1])
    g = d[2:2 + r * c]
    # union-find over land cells: islands = land cells - successful unions
    par = list(range(r * c))
    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    land = 0
    unions = 0
    for i in range(r):
        for j in range(c):
            k = i * c + j
            if g[k] != "1":
                continue
            land += 1
            for nk in ((k - c) if i > 0 else -1, (k - 1) if j > 0 else -1):
                if nk >= 0 and g[nk] == "1":
                    a, b = find(k), find(nk)
                    if a != b:
                        par[a] = b
                        unions += 1
    print(land - unions)

main()
