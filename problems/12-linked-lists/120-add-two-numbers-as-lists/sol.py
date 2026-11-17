import sys
sys.set_int_max_str_digits(0)
d = sys.stdin.read().split()
n1, n2 = int(d[0]), int(d[1])
a = d[2:2 + n1]
b = d[2 + n1:2 + n1 + n2]
s = int("".join(reversed(a))) + int("".join(reversed(b)))
print(" ".join(reversed(str(s))))
