from collections import Counter

n = int(input())
arr = list(map(int, input().split()))
ans = 1
for c in Counter(arr).values():
    ans *= c + 1
print(ans)
