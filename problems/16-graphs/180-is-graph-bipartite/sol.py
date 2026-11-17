import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    # union-find with parity: par_bit[x] = colour of x relative to its parent
    par = list(range(n))
    bit = [0] * n
    def find(x):
        path = []
        while par[x] != x:
            path.append(x)
            x = par[x]
        root = x
        # compress, accumulating parity from the top down
        acc = 0
        for y in reversed(path):
            acc ^= bit[y]
            bit[y] = acc
            par[y] = root
        return root
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        ru, rv = find(u), find(v)
        pu, pv = bit[u] if u != ru else 0, bit[v] if v != rv else 0
        if ru == rv:
            if pu == pv:
                print("false")
                return
        else:
            par[ru] = rv
            bit[ru] = pu ^ pv ^ 1
    print("true")

main()
