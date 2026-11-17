import sys

# row-by-row DP: for each column keep the height of the run of 1s ending here and
# the left/right limits of the widest rectangle of that height
data = sys.stdin.read().split()
r, c = int(data[0]), int(data[1])
rows = data[2:2 + r]
height = [0] * c
left = [0] * c
right = [c] * c
best = 0
for row in rows:
    cur_left, cur_right = 0, c
    for j in range(c):
        if row[j] == "1":
            height[j] += 1
            left[j] = max(left[j], cur_left)
        else:
            height[j] = 0
            left[j] = 0
            cur_left = j + 1
    for j in range(c - 1, -1, -1):
        if row[j] == "1":
            right[j] = min(right[j], cur_right)
        else:
            right[j] = c
            cur_right = j
    for j in range(c):
        a = height[j] * (right[j] - left[j])
        if a > best:
            best = a
print(best)
