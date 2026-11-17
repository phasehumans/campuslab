import sys

s = list(sys.stdin.readline().strip())
# in-place two-pointer: s[0:w] is the reduced prefix
w = 0
for r in range(len(s)):
    if w > 0 and s[w - 1] == s[r]:
        w -= 1
    else:
        s[w] = s[r]
        w += 1
print("".join(s[:w]))
