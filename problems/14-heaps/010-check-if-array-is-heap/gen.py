import random


def heapify_max(a):
    import heapq
    b = [-x for x in a]
    heapq.heapify(b)
    return [-x for x in b]


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    t = []
    t.append(fmt([5]))
    t.append(fmt([-10**9]))
    t.append(fmt([3, 3]))
    t.append(fmt([2, 3]))
    t.append(fmt([7, 7, 7, 7, 7]))
    t.append(fmt(list(range(10, 0, -1))))
    t.append(fmt(list(range(1, 11))))
    t.append(fmt([10**9, -10**9, -10**9]))
    for i in range(30):
        n = rng.randint(1, 15 if i < 15 else 300)
        a = heapify_max([rng.randint(-20, 20) for _ in range(n)])
        if i % 2 == 1 and n > 1:
            # break the heap property at one random child
            c = rng.randint(1, n - 1)
            p = (c - 1) // 2
            a[c] = a[p] + rng.randint(1, 5)
        t.append(fmt(a))
    for i in range(6):
        n = rng.randint(1, 10)
        t.append(fmt([rng.randint(-5, 5) for _ in range(n)]))
    for i in range(4):
        n = 10**5
        a = heapify_max([rng.randint(-10**9, 10**9) for _ in range(n)])
        if i >= 2:
            c = rng.randint(n // 2, n - 1)
            a[c] = min(10**9, a[(c - 1) // 2] + 1)
            if a[c] <= a[(c - 1) // 2]:
                a[(c - 1) // 2] = a[c] - 1
        t.append(fmt(a))
    return t


def validate(inp: str) -> None:
    tok = inp.split()
    n = int(tok[0])
    assert 1 <= n <= 10**5
    a = list(map(int, tok[1:]))
    assert len(a) == n
    assert all(-10**9 <= x <= 10**9 for x in a)
