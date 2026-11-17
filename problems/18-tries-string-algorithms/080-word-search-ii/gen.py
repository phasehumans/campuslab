import random

D = [(1, 0), (-1, 0), (0, 1), (0, -1)]

def walk(rng, board, L):
    m, n = len(board), len(board[0])
    r, c = rng.randrange(m), rng.randrange(n)
    seen = {(r, c)}; w = board[r][c]
    while len(w) < L:
        nb = [(r + a, c + b) for a, b in D if 0 <= r + a < m and 0 <= c + b < n and (r + a, c + b) not in seen]
        if not nb:
            break
        r, c = rng.choice(nb); seen.add((r, c)); w += board[r][c]
    return w

def found(board, word):
    m, n = len(board), len(board[0])
    def dfs(r, c, i, seen):
        if board[r][c] != word[i]:
            return False
        if i == len(word) - 1:
            return True
        seen.add((r, c))
        for a, b in D:
            x, y = r + a, c + b
            if 0 <= x < m and 0 <= y < n and (x, y) not in seen and dfs(x, y, i + 1, seen):
                return True
        seen.discard((r, c))
        return False
    return any(dfs(r, c, 0, set()) for r in range(m) for c in range(n))

def make(board, words):
    return f"{len(board)} {len(board[0])}\n" + "\n".join(board) + f"\n{len(words)}\n" + "\n".join(words)

def case(rng, m, n, w, alpha):
    while True:
        board = ["".join(rng.choice(alpha) for _ in range(n)) for _ in range(m)]
        words = set()
        tries = 0
        while len(words) < w and tries < 10 * w:
            tries += 1
            L = rng.randint(1, 10)
            if rng.random() < 0.5:
                words.add(walk(rng, board, L))
            else:
                words.add("".join(rng.choice(alpha) for _ in range(L)))
        words = sorted(words)
        rng.shuffle(words)
        if any(found(board, x) for x in words):
            return make(board, words)

def generate(rng):
    t = [make(["a"], ["a"]), make(["a"], ["a", "b", "aa"]), make(["ab", "ba"], ["ab", "ba", "aba", "bab", "abab", "aa"]),
         make(["abc", "fed", "ghi"], ["abcdefghi", "adg", "aei"]),
         make(["aaa", "aaa", "aaa"], ["a" * k for k in range(1, 11)]),
         make(["abcdefghijkl"], ["abcdefghij", "lkjihgfedc", "abd", "l"])]
    for _ in range(26):
        t.append(case(rng, rng.randint(1, 4), rng.randint(1, 4), rng.randint(1, 8), "abc"))
    for _ in range(14):
        t.append(case(rng, rng.randint(4, 10), rng.randint(4, 10), rng.randint(10, 100), "abcdefg"))
    for _ in range(3):
        t.append(case(rng, 12, 12, 100, "abcdefghijklmnopqrstuvwxyz"))
    t.append(case(rng, 12, 12, 100, "ab"))
    t.append(make(["a" * 12] * 12, ["a" * k for k in range(1, 11)] + ["b" * k for k in range(1, 11)]))
    return t

def validate(inp):
    lines = inp.rstrip("\n").split("\n")
    m, n = map(int, lines[0].split())
    assert 1 <= m <= 12 and 1 <= n <= 12
    board = lines[1:1 + m]
    assert all(len(r) == n and r.isalpha() and r.islower() for r in board)
    w = int(lines[1 + m]); words = lines[2 + m:]
    assert 1 <= w <= 100 and len(words) == w and len(set(words)) == w
    assert all(1 <= len(x) <= 10 and x.isalpha() and x.islower() for x in words)
    assert any(found(board, x) for x in words)
