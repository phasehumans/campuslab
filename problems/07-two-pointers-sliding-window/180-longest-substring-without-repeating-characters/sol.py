import sys

s = sys.stdin.readline().rstrip("\n").rstrip("\r")
window = set()
left = best = 0
for ch in s:
    while ch in window:
        window.discard(s[left])
        left += 1
    window.add(ch)
    best = max(best, len(window))
print(best)
