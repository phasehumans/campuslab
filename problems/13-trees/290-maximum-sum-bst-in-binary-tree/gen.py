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


V = 4 * 10**4


def mixed(rng, n, kind=None, lo=-V, hi=V, bst_prob=0.5):
    vals, L, R = rand_tree(rng, n, lo, hi, kind)
    # turn a few random subtrees into BSTs by writing sorted values along their inorder
    for _ in range(rng.randint(0, 4)):
        root = rng.randrange(n)
        sub, st = [], [root]
        while st:
            x = st.pop()
            sub.append(x)
            st += [c for c in (L[x], R[x]) if c != -1]
        # inorder of the subtree
        order, st2, x = [], [], root
        while st2 or x != -1:
            while x != -1:
                st2.append(x)
                x = L[x]
            x = st2.pop()
            order.append(x)
            x = R[x]
        if len(order) > hi - lo + 1:
            continue
        vs = sorted(rng.sample(range(lo, hi + 1), len(order)))
        if rng.random() < 0.3:
            vs = sorted(rng.sample(range(max(lo, 0), hi + 1), len(order))) if hi > 0 and hi - max(lo, 0) + 1 >= len(order) else vs
        for v, x in zip(vs, order):
            vals[x] = v
    return vals, L, R


def generate(rng):
    tests = ["1 4 3 2 4 2 5 null null null null null null 4 6", "4 3 null 1 2", "-4 -2 -5", "2 1 3",
             "5 4 8 3 null 6 3", "1 1", "0"]
    for i in range(38):
        n = rng.randint(1, 30)
        if i % 4 == 0:
            tests.append(serialize(*rand_bst(rng, n, -50, 50)))
        else:
            tests.append(serialize(*mixed(rng, n, None, -20, 20)))
    for _ in range(4):
        tests.append(serialize(*mixed(rng, rng.randint(200, 3000))))
    tests.append(serialize(*rand_bst(rng, 40000, 0, V, "random")))
    tests.append(serialize(*mixed(rng, 40000, "random")))
    tests.append(serialize(*rand_bst(rng, 40000, -V, V, "deep")))
    tests.append(serialize(*mixed(rng, 40000, "complete", -V, -1)))
    return tests


def validate(inp):
    vals, L, R = parse(inp.split("\n")[0])
    assert 1 <= len(vals) <= 4 * 10**4
    check_vals(vals, -V, V)


_generate_all = generate


def generate(rng):
    """The builder keeps only the first 50 distinct inputs: move the 10 largest to the front so the
    stress cases always survive; the cut then only drops some of the small random cases."""
    tests = list(dict.fromkeys(_generate_all(rng)))
    big = set(sorted(range(len(tests)), key=lambda i: -len(tests[i]))[:10])
    return [tests[i] for i in sorted(big)] + [t for i, t in enumerate(tests) if i not in big]
