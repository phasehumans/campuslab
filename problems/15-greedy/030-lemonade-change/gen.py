import random

def fmt(a):
    return f"{len(a)}\n{' '.join(map(str, a))}"

def rand_seq(rng, n, w):
    return rng.choices([5, 10, 20], weights=w, k=n)

def generate(rng: random.Random) -> list[str]:
    t = [fmt([5]), fmt([10]), fmt([20]), fmt([5, 10]), fmt([5, 20]), fmt([5, 5, 5, 20]),
         fmt([5, 5, 10, 20]), fmt([5, 10, 5, 20]), fmt([5, 5, 10, 10, 20]), fmt([5, 5, 5, 10, 20, 20])]
    N = 10**5
    t.append(fmt([5] * N))
    t.append(fmt([5] * (N // 2) + [10] * (N // 2)))
    t.append(fmt([5] * (N - 1) + [20]))
    t.append(fmt([5] + [10, 5] * ((N - 1) // 2)))
    big = rand_seq(rng, N, [6, 2, 1])
    t.append(fmt(big))
    for _ in range(10):
        t.append(fmt(rand_seq(rng, rng.randint(100, 5000), [5, 2, 1])))
    for _ in range(60):
        t.append(fmt(rand_seq(rng, rng.randint(1, 12), [4, 2, 1])))
    return t

def validate(inp: str) -> None:
    d = inp.split()
    n = int(d[0]); a = list(map(int, d[1:]))
    assert 1 <= n <= 10**5 and len(a) == n
    assert all(x in (5, 10, 20) for x in a)
