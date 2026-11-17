n = int(input())
print("true" if n > 0 and n & (n - 1) == 0 else "false")
