from collections import Counter

s = input().strip()
cnt = Counter(s)
ans = -1
for i, c in enumerate(s):
    if cnt[c] == 1:
        ans = i
        break
print(ans)
