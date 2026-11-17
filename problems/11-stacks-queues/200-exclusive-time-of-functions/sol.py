import sys

# exclusive time = inclusive duration of each call minus the inclusive
# durations of its direct child calls
lines = sys.stdin.read().split()
n, m = int(lines[0]), int(lines[1])
res = [0] * n
st = []  # [function id, start time, total inclusive time of direct children]
for log in lines[2:2 + m]:
    f, kind, t = log.split(":")
    f, t = int(f), int(t)
    if kind == "start":
        st.append([f, t, 0])
    else:
        fid, start, children = st.pop()
        inclusive = t - start + 1
        res[fid] += inclusive - children
        if st:
            st[-1][2] += inclusive
print(" ".join(map(str, res)))
