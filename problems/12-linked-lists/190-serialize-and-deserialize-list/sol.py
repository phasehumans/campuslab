import sys
d = sys.stdin.read().split()
n = int(d[0])
vals = d[1:1 + n]
rnd = d[1 + n:1 + 2 * n]

# serialize to a single string: "n|v0,v1,...|r0,r1,..."
blob = f"{n}|" + ",".join(vals) + "|" + ",".join(rnd)

# deserialize: build node objects, then link next/random by index
cnt, vs, rs = blob.split("|")
cnt = int(cnt)
nodes = [{"val": int(v), "next": None, "random": None} for v in vs.split(",")]
for i in range(cnt):
    if i + 1 < cnt:
        nodes[i]["next"] = nodes[i + 1]
ridx = [int(x) for x in rs.split(",")]
for i in range(cnt):
    if ridx[i] != -1:
        nodes[i]["random"] = nodes[ridx[i]]

pos = {id(nd): i for i, nd in enumerate(nodes)}
out_v, out_r = [], []
cur = nodes[0]
while cur is not None:
    out_v.append(str(cur["val"]))
    out_r.append(str(pos[id(cur["random"])]) if cur["random"] is not None else "-1")
    cur = cur["next"]
print(" ".join(out_v))
print(" ".join(out_r))
