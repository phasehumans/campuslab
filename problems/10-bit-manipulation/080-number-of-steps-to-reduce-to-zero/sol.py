s = input().strip().lstrip("0")
steps = 0
# walk from least significant bit: a 1 costs subtract + shift, a 0 costs one shift
for i, ch in enumerate(reversed(s)):
    if ch == "1":
        steps += 1
    if i != len(s) - 1:
        steps += 1
print(steps)
