import random

TMAX = 10**9


def make(rng, n, m, maxgap, top_level_bias=0.3):
    """Valid log: calls are properly nested, an end always closes the innermost running
    call, and the next log after an end at time t has timestamp >= t + 1."""
    logs, st = [], []
    cur = rng.randint(0, maxgap)  # earliest allowed timestamp for the next log
    remaining_starts = m // 2
    while remaining_starts or st:
        do_start = remaining_starts > 0 and (not st or rng.random() < 0.5)
        t = cur + rng.randint(0, maxgap)
        if do_start:
            f = rng.randrange(n)
            logs.append(f"{f}:start:{t}")
            st.append(f)
            remaining_starts -= 1
            cur = t
        else:
            f = st.pop()
            logs.append(f"{f}:end:{t}")
            cur = t + 1
    return logs


def fmt(n, logs):
    return f"{n} {len(logs)}\n" + "\n".join(logs)


def fits(logs):
    return all(int(l.rsplit(":", 1)[1]) <= TMAX for l in logs)


def generate(rng: random.Random) -> list[str]:
    tests = [fmt(1, ["0:start:0", "0:end:1000000000"]),
             fmt(3, ["0:start:0", "0:end:0", "2:start:1", "2:end:1"]),
             fmt(1, ["0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"]),
             fmt(2, ["0:start:0", "1:start:0", "1:end:0", "0:end:1"]),
             fmt(4, ["3:start:5", "2:start:7", "1:start:9", "0:start:11", "0:end:12", "1:end:13", "2:end:14", "3:end:15"])]
    big = []
    for maxgap in (0, 3, 10**6):
        big.append(fmt(100, make(rng, 100, 500, maxgap)))
    big.append(fmt(1, make(rng, 1, 500, 2)))
    tests = big + tests
    for _ in range(30):
        n = rng.randint(1, 4)
        tests.append(fmt(n, make(rng, n, 2 * rng.randint(1, 6), rng.choice([0, 1, 3, 10]))))
    for _ in range(15):
        n = rng.randint(1, 100)
        tests.append(fmt(n, make(rng, n, 2 * rng.randint(10, 250), rng.choice([2, 100, 10**5]))))
    return [t for t in tests if fits(t.split("\n")[1:])]


def validate(inp: str) -> None:
    lines = inp.strip("\n").split("\n")
    n, m = map(int, lines[0].split())
    assert 1 <= n <= 100 and 2 <= m <= 500 and m % 2 == 0 and len(lines) == m + 1
    st, cur = [], 0
    for ln in lines[1:]:
        f, kind, t = ln.split(":")
        f, t = int(f), int(t)
        assert 0 <= f < n and 0 <= t <= TMAX and kind in ("start", "end")
        assert t >= cur
        if kind == "start":
            st.append(f)
            cur = t
        else:
            assert st and st.pop() == f
            cur = t + 1
    assert not st
