import sys

data = sys.stdin.read().split()
n = int(data[0])
right_movers = []   # survivors so far; only the trailing run of positives can still be hit
for x in map(int, data[1:1 + n]):
    if x > 0:
        right_movers.append(x)
        continue
    size = -x
    while right_movers and right_movers[-1] > 0 and right_movers[-1] < size:
        right_movers.pop()
    if right_movers and right_movers[-1] > 0:
        if right_movers[-1] == size:
            right_movers.pop()
        continue
    right_movers.append(x)
print(" ".join(map(str, right_movers)))
