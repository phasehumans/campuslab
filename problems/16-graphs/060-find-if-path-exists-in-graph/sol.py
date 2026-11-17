import sys

def main():
    d = list(map(int, sys.stdin.buffer.read().split()))
    n, m = d[0], d[1]
    par = list(range(n))
    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x
    for i in range(m):
        a, b = find(d[2 + 2 * i]), find(d[3 + 2 * i])
        if a != b:
            par[a] = b
    s, t = d[2 + 2 * m], d[3 + 2 * m]
    print("true" if find(s) == find(t) else "false")

main()
