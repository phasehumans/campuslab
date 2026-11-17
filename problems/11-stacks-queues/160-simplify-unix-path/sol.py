import sys

s = sys.stdin.readline().strip()
dirs = []
for part in s.split("/"):
    if part == "..":
        if dirs:
            dirs.pop()
    elif part not in ("", "."):
        dirs.append(part)
print("/" + "/".join(dirs))
