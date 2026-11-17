import random


def fmt(pts):
    return f"{len(pts)}\n" + "".join(f"{x} {y}\n" for x, y in pts)


def uniq(rng, pts, n, lo, hi):
    s = list(dict.fromkeys(pts))
    seen = set(s)
    while len(s) < n:
        p = (rng.randint(lo, hi), rng.randint(lo, hi))
        if p not in seen:
            seen.add(p); s.append(p)
    s = s[:n]
    rng.shuffle(s)
    return s


def on_line(rng, k, B):
    while True:
        dx, dy = rng.randint(-20, 20), rng.randint(-20, 20)
        if dx or dy:
            break
    x0, y0 = rng.randint(-B // 2, B // 2), rng.randint(-B // 2, B // 2)
    pts = []
    for t in range(-k, k):
        x, y = x0 + t * dx, y0 + t * dy
        if -B <= x <= B and -B <= y <= B:
            pts.append((x, y))
    rng.shuffle(pts)
    return pts[:k]


def generate(rng):
    B = 10**4
    t = [fmt([(0, 0)]), fmt([(0, 0), (B, B)]), fmt([(-B, -B), (B, B), (0, 0)]),
         fmt([(0, 0), (0, 1), (0, 2), (1, 0)]), fmt([(0, 0), (1, 0), (2, 0), (0, 1)]),
         fmt([(1, 2), (2, 4), (4, 1), (8, 2)]),
         fmt([(x, y) for x in range(17) for y in range(17)][:289]),
         fmt([(i, i * i) for i in range(-100, 100)])]
    for _ in range(18):
        n = rng.randint(1, 8)
        t.append(fmt(uniq(rng, [], n, -3, 3)))
    for _ in range(14):
        n = rng.randint(10, 120)
        t.append(fmt(uniq(rng, on_line(rng, rng.randint(2, n // 2 + 2), 50) + on_line(rng, rng.randint(2, 10), 50), n, -50, 50)))
    for _ in range(6):
        t.append(fmt(uniq(rng, on_line(rng, rng.randint(3, 100), B) + on_line(rng, 60, B), 300, -B, B)))
    for _ in range(3):
        t.append(fmt(uniq(rng, [], 300, -B, B)))
    t.append(fmt(uniq(rng, [], 300, -9, 9)))
    return t


def validate(inp):
    d = list(map(int, inp.split()))
    n = d[0]
    assert 1 <= n <= 300 and len(d) == 1 + 2 * n
    pts = list(zip(d[1::2], d[2::2]))
    assert len(set(pts)) == n
    assert all(-10**4 <= v <= 10**4 for v in d[1:])
