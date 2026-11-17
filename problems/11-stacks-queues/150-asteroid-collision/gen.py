import random

NMAX = 10**5


def survivors(a):
    st = []
    for x in a:
        alive = True
        while alive and x < 0 and st and st[-1] > 0:
            if st[-1] < -x:
                st.pop()
            elif st[-1] == -x:
                st.pop()
                alive = False
            else:
                alive = False
        if alive:
            st.append(x)
    return st


def rnd(rng, n, v, pos_bias=0.5):
    return [rng.randint(1, v) * (1 if rng.random() < pos_bias else -1) for _ in range(n)]


def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"


def generate(rng: random.Random) -> list[str]:
    cand = [[5], [-1000], [1000, -999], [-2, -1, 1, 2], [10, 2, -5], [1, -2, -2, -2], [3, 3, -3],
            [1, 2, 3, -10, 4], [-5, 5], [7, -3, -4, 8, -8, 1], [1000] * 3 + [-1000] * 2]
    for _ in range(35):
        cand.append(rnd(rng, rng.randint(1, 12), rng.choice([3, 10, 1000]), rng.random()))
    for _ in range(12):
        cand.append(rnd(rng, rng.randint(100, 5000), 1000, rng.uniform(0.3, 0.7)))
    big = [rng.randint(1, 999) for _ in range(NMAX - 1)]
    cand.append(big[: NMAX // 2] + [-x for x in big[NMAX // 2:]] + [1000])
    cand.append(rnd(rng, NMAX, 1000))
    cand.append([1000] + [rng.randint(1, 999) for _ in range(NMAX // 2 - 1)] + [-rng.randint(1, 999) for _ in range(NMAX // 2)])
    cand.append([-1000] * (NMAX // 2) + [1000] * (NMAX // 2))
    cand.append(rnd(rng, NMAX, 5))
    cand = cand[-17:] + cand[:-17]  # large tests first so they are always used
    return [fmt(a) for a in cand if survivors(a)]


def validate(inp: str) -> None:
    t = inp.split()
    n = int(t[0])
    assert 1 <= n <= NMAX and len(t) == n + 1
    a = list(map(int, t[1:]))
    assert all(-1000 <= x <= 1000 and x != 0 for x in a)
    assert survivors(a), "at least one asteroid must survive"
