import sys
line = sys.stdin.readline().rstrip("\n")
words = line.split(" ")
words = [w for w in words if w]
print(len(words[-1]))
