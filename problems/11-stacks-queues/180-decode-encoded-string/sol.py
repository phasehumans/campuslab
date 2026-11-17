import sys

sys.setrecursionlimit(10000)
s = sys.stdin.readline().strip()
pos = 0


def parse():
    """Recursive descent: decode until the end of input or an unmatched ']'."""
    global pos
    pieces = []
    while pos < len(s) and s[pos] != "]":
        if s[pos].isdigit():
            k = 0
            while s[pos].isdigit():
                k = k * 10 + ord(s[pos]) - 48
                pos += 1
            pos += 1  # '['
            inner = parse()
            pos += 1  # ']'
            pieces.append(inner * k)
        else:
            pieces.append(s[pos])
            pos += 1
    return "".join(pieces)


print(parse())
