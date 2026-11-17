import sys

# every innermost "()" at nesting depth d contributes 2^d
s = sys.stdin.readline().strip()
depth = 0
total = 0
for i, c in enumerate(s):
    if c == "(":
        depth += 1
    else:
        depth -= 1
        if s[i - 1] == "(":
            total += 1 << depth
print(total)
