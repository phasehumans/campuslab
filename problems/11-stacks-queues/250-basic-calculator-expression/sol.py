import sys

# every number contributes +/- itself; its sign is the product of the operator in
# front of it and the signs applied to every enclosing parenthesised group
s = sys.stdin.readline().rstrip("\n")
group_sign = [1]
op = 1
total = 0
i, n = 0, len(s)
while i < n:
    c = s[i]
    if c.isdigit():
        j = i
        while j < n and s[j].isdigit():
            j += 1
        total += group_sign[-1] * op * int(s[i:j])
        op = 1
        i = j
        continue
    if c == "-":
        op = -1
    elif c == "+":
        op = 1
    elif c == "(":
        group_sign.append(group_sign[-1] * op)
        op = 1
    elif c == ")":
        group_sign.pop()
    i += 1
print(total)
