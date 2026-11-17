import sys

# for each bar, find how far it extends left and right while bars are >= it
data = sys.stdin.read().split()
n = int(data[0])
h = list(map(int, data[1:1 + n]))
left = [0] * n   # index of nearest bar to the left that is lower, -1 if none
right = [n] * n  # index of nearest bar to the right that is lower, n if none
for i in range(n):
    j = i - 1
    while j >= 0 and h[j] >= h[i]:
        j = left[j]
    left[i] = j
for i in range(n - 1, -1, -1):
    j = i + 1
    while j < n and h[j] >= h[i]:
        j = right[j]
    right[i] = j
print(max(h[i] * (right[i] - left[i] - 1) for i in range(n)))
