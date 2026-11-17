x = int(input())
if x < 0:
    print("false")
else:
    rev, y = 0, x
    while y > 0:
        rev = rev * 10 + y % 10
        y //= 10
    print("true" if rev == x else "false")
