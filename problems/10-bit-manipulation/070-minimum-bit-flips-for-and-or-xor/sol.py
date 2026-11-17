a, b, c = map(int, input().split())
# bits that must be removed from a and b, plus positions that need a 1 nobody has
must_clear = (a | b) & ~c
need_set = c & ~(a | b)
print(bin(a & must_clear).count("1") + bin(b & must_clear).count("1") + bin(need_set).count("1"))
