import sys

data = sys.stdin.read().split("\n")
n = int(data[0].strip()) if data[0].strip() else 0
strs = data[1:1 + n]
strs = [x.rstrip("\r") for x in strs] + [""] * (n - len(strs))

encoded = "".join(str(len(x)) + "#" + x for x in strs)
out = [str(len(encoded)), encoded]

# decode by reading the length prefix, then jumping over the payload
decoded = []
pos = 0
while pos < len(encoded):
    hash_at = encoded.index("#", pos)
    ln = int(encoded[pos:hash_at])
    decoded.append(encoded[hash_at + 1:hash_at + 1 + ln])
    pos = hash_at + 1 + ln
out.extend(decoded)
sys.stdout.write("\n".join(out) + "\n")
