import sys

data = sys.stdin.read().split()
n = int(data[0])
st = []
for t in data[1:1 + n]:
    if t in ("+", "-", "*", "/"):
        b = st.pop()
        a = st.pop()
        if t == "+":
            st.append(a + b)
        elif t == "-":
            st.append(a - b)
        elif t == "*":
            st.append(a * b)
        else:
            q = abs(a) // abs(b)
            st.append(q if (a < 0) == (b < 0) else -q)
    else:
        st.append(int(t))
print(st[-1])
