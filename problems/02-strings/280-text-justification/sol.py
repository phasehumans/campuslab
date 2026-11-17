import sys

data = sys.stdin.read().split()
n, W = int(data[0]), int(data[1])
words = data[2:2 + n]

lines = []
cur = []
cur_len = 0  # letters only
for w in words:
    if cur and cur_len + len(cur) + len(w) > W:
        lines.append(cur)
        cur, cur_len = [], 0
    cur.append(w)
    cur_len += len(w)
lines.append(cur)

out = []
for idx, ln in enumerate(lines):
    if idx == len(lines) - 1 or len(ln) == 1:
        out.append(" ".join(ln).ljust(W))
    else:
        gaps = len(ln) - 1
        spaces = W - sum(len(w) for w in ln)
        q, r = divmod(spaces, gaps)
        parts = []
        for g in range(gaps):
            parts.append(ln[g] + " " * (q + (1 if g < r else 0)))
        parts.append(ln[-1])
        out.append("".join(parts))
sys.stdout.write("\n".join(out) + "\n")
