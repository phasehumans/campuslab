import sys

s = sys.stdin.readline().strip()
match = {")": "(", "]": "[", "}": "{"}
stack = []
ok = True
for ch in s:
    if ch in match:
        if not stack or stack[-1] != match[ch]:
            ok = False
            break
        stack.pop()
    else:
        stack.append(ch)
print("true" if ok and not stack else "false")
