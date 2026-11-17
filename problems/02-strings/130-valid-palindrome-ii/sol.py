s = input().strip()
n = len(s)
# hash-free check: find first mismatch from both ends, then try both skips
def is_pal(x):
    return x == x[::-1]

i, j = 0, n - 1
while i < j and s[i] == s[j]:
    i += 1
    j -= 1
if i >= j:
    print("true")
else:
    print("true" if is_pal(s[i + 1:j + 1]) or is_pal(s[i:j]) else "false")
