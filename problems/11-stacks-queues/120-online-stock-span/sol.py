import sys

data = sys.stdin.read().split()
n = int(data[0])
p = list(map(int, data[1:1 + n]))
res = []
st = []  # indices with strictly decreasing prices
for i, x in enumerate(p):
    while st and p[st[-1]] <= x:
        st.pop()
    res.append(i - (st[-1] if st else -1))
    st.append(i)
print(" ".join(map(str, res)))
