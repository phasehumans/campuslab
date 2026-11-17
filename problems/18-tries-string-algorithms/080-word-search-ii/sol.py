import sys
sys.setrecursionlimit(10000)
def main():
    d = sys.stdin.read().split()
    m, n = int(d[0]), int(d[1])
    board = d[2:2 + m]
    w = int(d[2 + m]); words = d[3 + m:3 + m + w]
    cells = {}
    for r in range(m):
        for c in range(n):
            cells.setdefault(board[r][c], []).append((r, c))
    used = [[False] * n for _ in range(m)]

    def dfs(r, c, word, i):
        if i == len(word):
            return True
        used[r][c] = True
        ch = word[i]
        res = False
        for x, y in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= x < m and 0 <= y < n and not used[x][y] and board[x][y] == ch and dfs(x, y, word, i + 1):
                res = True
                break
        used[r][c] = False
        return res

    found = []
    for word in words:
        # search from the rarer end to prune faster
        cand = word if len(cells.get(word[0], ())) <= len(cells.get(word[-1], ())) else word[::-1]
        if any(dfs(r, c, cand, 1) for r, c in cells.get(cand[0], ())):
            found.append(word)
    print("\n".join(sorted(found)))
main()
