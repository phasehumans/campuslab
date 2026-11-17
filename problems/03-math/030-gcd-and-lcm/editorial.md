**Approach: Euclidean Algorithm**

The Greatest Common Divisor (GCD) of two numbers can be found using the Euclidean Algorithm, which recursively computes gcd(a, b) = gcd(b, a % b). This runs in logarithmic time.

The Least Common Multiple (LCM) is related to GCD by the formula: `a * b = GCD(a, b) * LCM(a, b)`. Thus, `LCM(a, b) = (a / GCD(a, b)) * b`.

To prevent integer overflow during multiplication, division should be performed first. Using 64-bit integers (`long long` in C++) is mandatory.

**Time Complexity:** O(log(min(a, b)))
**Space Complexity:** O(1)
