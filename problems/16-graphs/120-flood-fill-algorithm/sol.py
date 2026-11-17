import sys

def main():
    d = list(map(int, sys.stdin.read().split()))
    r, c = d[0], d[1]
    g = [d[2 + i * c:2 + (i + 1) * c] for i in range(r)]
    sr, sc, color = d[2 + r * c:5 + r * c]
    orig = g[sr][sc]
    # iterative DFS over a visited set (works even when color == orig)
    seen = {(sr, sc)}
    stack = [(sr, sc)]
    while stack:
        x, y = stack.pop()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < r and 0 <= ny < c and (nx, ny) not in seen and g[nx][ny] == orig:
                seen.add((nx, ny))
                stack.append((nx, ny))
    for x, y in seen:
        g[x][y] = color
    print("\n".join(" ".join(map(str, row)) for row in g))

main()
