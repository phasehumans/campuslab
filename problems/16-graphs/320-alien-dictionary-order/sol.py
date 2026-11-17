import sys

def main():
    d = sys.stdin.read().split()
    n = int(d[0])
    words = d[1:1 + n]
    letters = sorted(set("".join(words)))
    before = {c: set() for c in letters}  # before[c] = letters that must precede c
    for a, b in zip(words, words[1:]):
        for x, y in zip(a, b):
            if x != y:
                before[y].add(x)
                break
    # repeatedly take the smallest letter whose predecessors are all placed
    placed = []
    done = set()
    while len(placed) < len(letters):
        for c in letters:
            if c not in done and before[c] <= done:
                placed.append(c)
                done.add(c)
                break
    print("".join(placed))

main()
