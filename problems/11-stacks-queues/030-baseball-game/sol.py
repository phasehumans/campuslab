import sys

data = sys.stdin.read().split()
n = int(data[0])
rec = []
for op in data[1:1 + n]:
    if op == "+":
        rec.append(rec[-1] + rec[-2])
    elif op == "D":
        rec.append(rec[-1] * 2)
    elif op == "C":
        rec.pop()
    else:
        rec.append(int(op))
print(sum(rec))
