import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    n, m = d[0], d[1]
    # adjacency matrix copy: neighbours of i in ascending order
    mat = [[0] * n for _ in range(n)]
    for i in range(m):
        u, v = d[2 + 2 * i], d[3 + 2 * i]
        mat[u][v] += 1
        mat[v][u] += 1
    out = []
    for i in range(n):
        nb = []
        for j in range(n):
            nb.extend([str(j)] * mat[i][j])
        out.append(f"{i}:" + ("" if not nb else " " + " ".join(nb)))
    print("\n".join(out))

main()
