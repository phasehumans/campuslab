left, right = map(int, input().split())
if right - left <= 2000:
    r = right
    for x in range(left, right + 1):
        r &= x
    print(r)
else:
    # keep bit b only if it is set in left and no multiple of 2^b lies in (left, right]
    res = 0
    for b in range(61):
        if (left >> b) & 1:
            nxt = (left | ((1 << b) - 1)) + 1  # first number after left where bit b turns off
            if nxt > right:
                res |= 1 << b
    print(res)
