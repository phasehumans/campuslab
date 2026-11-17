import sys

data = sys.stdin.read().split()
q = int(data[0])
st = []  # (value, minimum of the stack up to and including this entry)
out = []
i = 1
for _ in range(q):
    op = data[i]
    i += 1
    if op == "push":
        x = int(data[i])
        i += 1
        st.append((x, x if not st or x < st[-1][1] else st[-1][1]))
    elif op == "pop":
        st.pop()
    elif op == "top":
        out.append(st[-1][0])
    else:
        out.append(st[-1][1])
print("\n".join(map(str, out)))
