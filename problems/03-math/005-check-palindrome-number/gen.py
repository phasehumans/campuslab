def generate(rng):
    t = ["0", "1", "-1", "9", "11", "12", "100", "101", "1001", "2147483647", "-2147483648", "2147447412",
         "1000000001", "1000000002", "123321", "123421", "-7", "7", "22", "1234567899"]
    while len(t) < 60:
        kind = rng.randint(0, 3)
        if kind <= 1:
            half = str(rng.randint(1, 99999))
            s = half + (half[::-1] if kind == 0 else half[-2::-1])
            v = int(s)
            if v > 2**31 - 1:
                continue
            if rng.random() < 0.15:
                v = -v
            t.append(str(v))
        elif kind == 2:
            t.append(str(rng.randint(-2**31, 2**31 - 1)))
        else:
            t.append(str(rng.randint(0, 10**rng.randint(1, 6))))
    return t

def validate(inp):
    v = inp.split()
    assert len(v) == 1 and -2**31 <= int(v[0]) <= 2**31 - 1
