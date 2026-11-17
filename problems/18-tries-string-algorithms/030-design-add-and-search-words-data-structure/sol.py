import sys
from itertools import product
def main():
    d = sys.stdin.read().split()
    q = int(d[0])
    words = set()
    out = []
    letters = "abcdefghijklmnopqrstuvwxyz"
    for i in range(q):
        op, w = d[1 + 2 * i], d[2 + 2 * i]
        if op == "add":
            words.add(w)
            continue
        dots = [k for k, c in enumerate(w) if c == "."]
        if not dots:
            out.append("true" if w in words else "false")
            continue
        lst = list(w)
        ok = False
        for combo in product(letters, repeat=len(dots)):
            for k, c in zip(dots, combo):
                lst[k] = c
            if "".join(lst) in words:
                ok = True
                break
        out.append("true" if ok else "false")
    print("\n".join(out))
main()
