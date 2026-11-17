import random
from collections import deque

KINDS = ["random", "random", "random", "deep", "left", "right", "zigzag", "complete"]


def shape(rng, n, kind="random"):
    """Child arrays (L, R) for an n-node tree rooted at 0; -1 = no child."""
    L = [-1] * n
    R = [-1] * n
    if kind == "left":
        for i in range(1, n):
            L[i - 1] = i
    elif kind == "right":
        for i in range(1, n):
            R[i - 1] = i
    elif kind == "zigzag":
        for i in range(1, n):
            (L if i % 2 else R)[i - 1] = i
    elif kind == "complete":
        for i in range(1, n):
            (L if i % 2 else R)[(i - 1) // 2] = i
    else:
        free = [(0, 0), (0, 1)] if n else []
        for i in range(1, n):
            if kind == "deep":
                j = len(free) - 1 - rng.randrange(min(len(free), 3))
            else:
                j = rng.randrange(len(free))
            p, s = free[j]
            free[j] = free[-1]
            free.pop()
            (L if s == 0 else R)[p] = i
            free.append((i, 0))
            free.append((i, 1))
    return L, R


def serialize(vals, L, R):
    if not vals:
        return "null"
    out = []
    q = deque([0])
    while q:
        x = q.popleft()
        if x == -1:
            out.append("null")
        else:
            out.append(str(vals[x]))
            q.append(L[x])
            q.append(R[x])
    while out and out[-1] == "null":
        out.pop()
    return " ".join(out)


def parse(line):
    """BFS line -> (vals, L, R) in level order (parent index < child index)."""
    t = line.split()
    if not t or t[0] == "null":
        return [], [], []
    vals, L, R = [int(t[0])], [-1], [-1]
    q = deque([0])
    i = 1
    while i < len(t) and q:
        c = q.popleft()
        for side in (L, R):
            if i < len(t) and t[i] != "null":
                vals.append(int(t[i]))
                L.append(-1)
                R.append(-1)
                side[c] = len(vals) - 1
                q.append(len(vals) - 1)
            i += 1
    assert i >= len(t), "extra tokens after the tree"
    return vals, L, R


def inorder(L, R):
    res, st, x = [], [], (0 if L else -1)
    while st or x != -1:
        while x != -1:
            st.append(x)
            x = L[x]
        x = st.pop()
        res.append(x)
        x = R[x]
    return res


def height(L, R):
    """Number of levels (0 for empty)."""
    if not L:
        return 0
    d = [0] * len(L)
    d[0] = 1
    best = 1
    q = deque([0])
    while q:
        x = q.popleft()
        for c in (L[x], R[x]):
            if c != -1:
                d[c] = d[x] + 1
                best = max(best, d[c])
                q.append(c)
    return best


def rand_tree(rng, n, lo, hi, kind=None, distinct=False):
    kind = kind or rng.choice(KINDS)
    L, R = shape(rng, n, kind)
    if distinct:
        vals = rng.sample(range(lo, hi + 1), n)
    else:
        vals = [rng.randint(lo, hi) for _ in range(n)]
    return vals, L, R


def rand_bst(rng, n, lo, hi, kind=None):
    """Random BST: random shape, distinct sorted values placed in inorder."""
    kind = kind or rng.choice(KINDS)
    L, R = shape(rng, n, kind)
    vs = sorted(rng.sample(range(lo, hi + 1), n))
    vals = [0] * n
    for v, x in zip(vs, inorder(L, R)):
        vals[x] = v
    return vals, L, R


def bst_insert_order(rng, n, lo, hi):
    """BST built by inserting distinct random values (balanced-ish shape)."""
    vs = rng.sample(range(lo, hi + 1), n)
    vals, L, R = [], [], []
    for v in vs:
        vals.append(v); L.append(-1); R.append(-1)
        k = len(vals) - 1
        if k == 0:
            continue
        x = 0
        while True:
            side = L if v < vals[x] else R
            if side[x] == -1:
                side[x] = k
                break
            x = side[x]
    return vals, L, R


def check_vals(vals, lo, hi):
    for v in vals:
        assert lo <= v <= hi, f"value {v} out of range"


def std_trees(rng, nmin, nmax, lo, hi, distinct=False, big_kinds=("random", "deep", "left")):
    """A standard spread of trees: edge shapes, many small random, some medium, a few max-size."""
    out = []
    if nmin == 0:
        out.append(([], [], []))
    for n in (1, 2, 3, 4, 7, 15):
        if nmin <= n <= nmax:
            out.append(rand_tree(rng, n, lo, hi, "complete", distinct))
    for k in ("left", "right", "zigzag", "deep"):
        n = rng.randint(max(nmin, 2), max(nmin, min(nmax, 12)))
        out.append(rand_tree(rng, n, lo, hi, k, distinct))
    for _ in range(42):
        n = rng.randint(max(nmin, 1), max(nmin, min(nmax, 30)))
        out.append(rand_tree(rng, n, lo, hi, None, distinct))
    for _ in range(6):
        n = rng.randint(min(nmax, 31), max(min(nmax, 31), nmax // 4))
        out.append(rand_tree(rng, n, lo, hi, None, distinct))
    for k in big_kinds:
        out.append(rand_tree(rng, nmax, lo, hi, k, distinct))
    return out


def preorder(L, R):
    res, st = [], ([0] if L else [])
    while st:
        x = st.pop()
        res.append(x)
        if R[x] != -1:
            st.append(R[x])
        if L[x] != -1:
            st.append(L[x])
    return res


def generate(rng):
    return [serialize(*t) for t in std_trees(rng, 0, 10000, -100, 100)]


def validate(inp):
    vals, L, R = parse(inp.split("\n")[0])
    assert 0 <= len(vals) <= 10000
    check_vals(vals, -100, 100)


_generate_all = generate


def generate(rng):
    """The builder keeps only the first 50 distinct inputs: move the 10 largest to the front so the
    stress cases always survive; the cut then only drops some of the small random cases."""
    tests = list(dict.fromkeys(_generate_all(rng)))
    big = set(sorted(range(len(tests)), key=lambda i: -len(tests[i]))[:10])
    return [tests[i] for i in sorted(big)] + [t for i, t in enumerate(tests) if i not in big]
