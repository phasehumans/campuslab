import type { SeedProblem } from './types.js'

export const recursionBacktrackingProblems: SeedProblem[] = [
    // ==================== EASY #1: Fibonacci Number ====================
    {
        title: "Fibonacci Number",
        description: "Given an integer n, calculate the n-th Fibonacci number recursively. Assume F(0) = 0 and F(1) = 1.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- The n-th Fibonacci number",
        difficulty: "EASY",
        tags: ["recursion"],
        constraints: "0 <= n <= 30",
        hints: "Identify the base cases: F(0) = 0 and F(1) = 1. For n > 1, the recurrence relation is F(n) = F(n-1) + F(n-2). Make sure you implement the logic recursively.",
        editorial: "**Approach: Recursion**\n\nThe Fibonacci sequence is defined recursively as:\n- F(0) = 0\n- F(1) = 1\n- F(n) = F(n-1) + F(n-2) for n > 1\n\nBecause n is small (n <= 30), a simple recursive solution runs quickly. Time complexity is O(2^n) and space complexity is O(n) due to recursion stack depth.",
        examples: [
            { title: "Example 1", input: "4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." },
            { title: "Example 2", input: "10", output: "55", explanation: "F(10) = 55." }
        ],
        testcases: [
            { input: "4", output: "3" },
            { input: "10", output: "55" },
            { input: "0", output: "0" },
            { input: "1", output: "1" },
            { input: "2", output: "1" },
            { input: "15", output: "610" },
            { input: "20", output: "6765" },
            { input: "25", output: "75025" },
            { input: "28", output: "317811" },
            { input: "30", output: "832040" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Implement recursive function for Fibonacci
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
int main() {
    int n;
    if (cin >> n) {
        cout << fib(n) << "\n";
    }
    return 0;
}`,
            python: `import sys
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        print(fib(n))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            int n = Integer.parseInt(line.trim());
            System.out.println(fib(n));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn fib(n: i32) -> i32 {
    if n <= 1 { return n; }
    fib(n - 1) + fib(n - 2)
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<i32>() {
            println!("{}", fib(n));
        }
    }
}`
        }
    },

    // ==================== EASY #2: Factorial ====================
    {
        title: "Factorial",
        description: "Given a non-negative integer n, compute its factorial (n!) recursively.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- A single integer representing n!",
        difficulty: "EASY",
        tags: ["recursion"],
        constraints: "0 <= n <= 20",
        hints: "The base case is when n is 0 or 1, where the factorial is 1. For larger numbers, compute n * factorial(n - 1). Be mindful of 64-bit integer ranges.",
        editorial: "**Approach: Recursion**\n\nThe factorial of a number can be defined recursively as:\n- fact(0) = 1\n- fact(n) = n * fact(n - 1) for n > 0\n\nSince 20! is a very large value (approx 2.43 * 10^18), you must use 64-bit integers (`long long` in C++, `long` in Java, `u64` in Rust) to avoid integer overflow. Time complexity is O(n), and space complexity is O(n) due to recursion stack depth.",
        examples: [
            { title: "Example 1", input: "5", output: "120", explanation: "5! = 5 * 4 * 3 * 2 * 1 = 120." },
            { title: "Example 2", input: "0", output: "1", explanation: "0! is defined to be 1." }
        ],
        testcases: [
            { input: "5", output: "120" },
            { input: "0", output: "1" },
            { input: "1", output: "1" },
            { input: "3", output: "6" },
            { input: "8", output: "40320" },
            { input: "10", output: "3628800" },
            { input: "12", output: "479001600" },
            { input: "15", output: "1307674368000" },
            { input: "18", output: "6402373705728000" },
            { input: "20", output: "2432902008176640000" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Compute factorial recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
unsigned long long fact(int n) {
    if (n <= 1) return 1;
    return (unsigned long long)n * fact(n - 1);
}
int main() {
    int n;
    if (cin >> n) {
        cout << fact(n) << "\n";
    }
    return 0;
}`,
            python: `import sys
def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        print(fact(n))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static long fact(int n) {
        if (n <= 1) return 1;
        return (long)n * fact(n - 1);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            int n = Integer.parseInt(line.trim());
            System.out.println(fact(n));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn fact(n: u64) -> u64 {
    if n <= 1 { return 1; }
    n * fact(n - 1)
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<u64>() {
            println!("{}", fact(n));
        }
    }
}`
        }
    },

    // ==================== EASY #3: Tower of Hanoi Move Count ====================
    {
        title: "Tower of Hanoi Move Count",
        description: "The Tower of Hanoi is a mathematical puzzle with three rods and n disks. The objective is to move the entire stack to another rod, obeying the rules:\n1. Only one disk can be moved at a time.\n2. Each move consists of taking the upper disk from one stack and placing it on another stack.\n3. No larger disk may be placed on top of a smaller disk.\n\nGiven the number of disks n, calculate the minimum number of moves required to solve the puzzle recursively.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- A single integer representing the minimum number of moves",
        difficulty: "EASY",
        tags: ["recursion", "combinatorics"],
        constraints: "1 <= n <= 60",
        hints: "To move n disks, we must first move n-1 disks to an auxiliary rod, then move the largest disk (1 move), and finally move the n-1 disks from the auxiliary rod to the destination. Thus, the recurrence is H(n) = 2 * H(n-1) + 1. Make sure to use 64-bit integers.",
        editorial: "**Approach: Recursive Formula**\n\nThe recurrence relation is:\n- H(1) = 1\n- H(n) = 2 * H(n-1) + 1\n\nThis solves mathematically to H(n) = 2^n - 1. Because n <= 60, 2^60 - 1 fits within a signed 64-bit integer. Recursive computation runs in O(n) steps. Time complexity is O(n), and space complexity is O(n) due to recursion stack depth.",
        examples: [
            { title: "Example 1", input: "3", output: "7", explanation: "To solve with 3 disks, it takes 2 * H(2) + 1 = 2 * 3 + 1 = 7 moves." },
            { title: "Example 2", input: "1", output: "1", explanation: "With 1 disk, we just move it directly to the target rod in 1 move." }
        ],
        testcases: [
            { input: "3", output: "7" },
            { input: "1", output: "1" },
            { input: "2", output: "3" },
            { input: "4", output: "15" },
            { input: "5", output: "31" },
            { input: "10", output: "1023" },
            { input: "20", output: "1048575" },
            { input: "30", output: "1073741823" },
            { input: "50", output: "1125899906842623" },
            { input: "60", output: "1152921504606846975" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Compute Tower of Hanoi moves recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
long long hanoi(int n) {
    if (n == 1) return 1;
    return 2LL * hanoi(n - 1) + 1;
}
int main() {
    int n;
    if (cin >> n) {
        cout << hanoi(n) << "\n";
    }
    return 0;
}`,
            python: `import sys
def hanoi(n):
    if n == 1:
        return 1
    return 2 * hanoi(n - 1) + 1
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        print(hanoi(n))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static long hanoi(int n) {
        if (n == 1) return 1;
        return 2L * hanoi(n - 1) + 1;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            int n = Integer.parseInt(line.trim());
            System.out.println(hanoi(n));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn hanoi(n: u32) -> u64 {
    if n == 1 { return 1; }
    2 * hanoi(n - 1) + 1
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<u32>() {
            println!("{}", hanoi(n));
        }
    }
}`
        }
    },

    // ==================== EASY #4: Check Power of Two ====================
    {
        title: "Check Power of Two",
        description: "Given a positive integer n, check recursively if it is a power of two.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- The string \"true\" if n is a power of two, otherwise \"false\"",
        difficulty: "EASY",
        tags: ["recursion"],
        constraints: "0 <= n <= 10^18",
        hints: "Base cases: if n <= 0 return false, if n == 1 return true. If the number is odd, it cannot be a power of two. Otherwise, check recursively for n / 2.",
        editorial: "**Approach: Recursive division**\n\nA number is a power of two if it can be recursively divided by 2 down to 1. \n- Base case 1: n <= 0, return false\n- Base case 2: n == 1, return true\n- Recursive step: if n is odd, it is not a power of two (return false). Otherwise, return check(n / 2).\n\nTime complexity is O(log n), space complexity is O(log n) stack frames.",
        examples: [
            { title: "Example 1", input: "16", output: "true", explanation: "16 -> 8 -> 4 -> 2 -> 1 (returns true)." },
            { title: "Example 2", input: "98", output: "false", explanation: "98 is even. 98 -> 49 (which is odd and not 1, so returns false)." }
        ],
        testcases: [
            { input: "16", output: "true" },
            { input: "98", output: "false" },
            { input: "1", output: "true" },
            { input: "2", output: "true" },
            { input: "0", output: "false" },
            { input: "536870912", output: "true" },
            { input: "536870913", output: "false" },
            { input: "1152921504606846976", output: "true" },
            { input: "9223372036854775807", output: "false" },
            { input: "4611686018427387904", output: "true" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Recursively check if n is a power of two
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
bool isPowerOfTwo(long long n) {
    if (n <= 0) return false;
    if (n == 1) return true;
    if (n % 2 != 0) return false;
    return isPowerOfTwo(n / 2);
}
int main() {
    long long n;
    if (cin >> n) {
        cout << (isPowerOfTwo(n) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
def is_power_of_two(n):
    if n <= 0:
        return False
    if n == 1:
        return True
    if n % 2 != 0:
        return False
    return is_power_of_two(n // 2)
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        print("true" if is_power_of_two(n) else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static boolean isPowerOfTwo(long n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            long n = Long.parseLong(line.trim());
            System.out.println(isPowerOfTwo(n) ? "true" : "false");
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn is_power_of_two(n: u64) -> bool {
    if n == 0 { return false; }
    if n == 1 { return true; }
    if n % 2 != 0 { return false; }
    is_power_of_two(n / 2)
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<u64>() {
            println!("{}", if is_power_of_two(n) { "true" } else { "false" });
        }
    }
}`
        }
    },

    // ==================== EASY #5: Sum of Digits Recursive ====================
    {
        title: "Sum of Digits Recursive",
        description: "Given a non-negative integer n, find the sum of its digits recursively.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- A single integer representing the sum of the digits",
        difficulty: "EASY",
        tags: ["recursion"],
        constraints: "0 <= n <= 10^18",
        hints: "In each step, add the last digit (n % 10) to the recursive result of the remaining digits (n / 10). The base case is when n becomes 0.",
        editorial: "**Approach: Recursion**\n\nThe sum of the digits of a number n is recursively formulated as:\n- sumDigits(0) = 0\n- sumDigits(n) = (n % 10) + sumDigits(n / 10)\n\nTime complexity is O(log_10 n) since we process one digit at a time. Space complexity is O(log_10 n) for recursion stack.",
        examples: [
            { title: "Example 1", input: "12345", output: "15", explanation: "1 + 2 + 3 + 4 + 5 = 15." },
            { title: "Example 2", input: "0", output: "0", explanation: "The sum of the digits of 0 is 0." }
        ],
        testcases: [
            { input: "12345", output: "15" },
            { input: "0", output: "0" },
            { input: "9", output: "9" },
            { input: "1000000000000000000", output: "1" },
            { input: "999999999999999999", output: "162" },
            { input: "123456789012345678", output: "81" },
            { input: "456", output: "15" },
            { input: "7890", output: "24" },
            { input: "111111111111111111", output: "18" },
            { input: "987654321", output: "45" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Compute recursive sum of digits
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
long long sumDigits(long long n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}
int main() {
    long long n;
    if (cin >> n) {
        if (n == 0) cout << 0 << "\n";
        else cout << sumDigits(n) << "\n";
    }
    return 0;
}`,
            python: `import sys
def sum_digits(n):
    if n == 0:
        return 0
    return (n % 10) + sum_digits(n // 10)
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        print(sum_digits(n))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static long sumDigits(long n) {
        if (n == 0) return 0;
        return (n % 10) + sumDigits(n / 10);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            long n = Long.parseLong(line.trim());
            System.out.println(sumDigits(n));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn sum_digits(n: u64) -> u64 {
    if n == 0 { return 0; }
    (n % 10) + sum_digits(n / 10)
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<u64>() {
            println!("{}", sum_digits(n));
        }
    }
}`
        }
    },

    // ==================== MEDIUM #1: Generate Valid Parentheses ====================
    {
        title: "Generate Valid Parentheses",
        description: "Given an integer n, generate all combinations of well-formed parentheses containing n pairs of parentheses. The output must be sorted lexicographically.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- All valid combinations of parentheses, each on a new line, sorted lexicographically",
        difficulty: "MEDIUM",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= n <= 10",
        hints: "At each step, we can either place '(' or ')'. We can place '(' only if the count of placed open parentheses is less than n. We can place ')' only if the count of placed close parentheses is less than open parentheses.",
        editorial: "**Approach: Backtracking**\n\nBy ensuring that we always attempt to place '(' before ')', we naturally generate combinations in lexicographically sorted order. We keep track of how many open and close parentheses have been placed. \n- If open < n: we can place '('\n- If close < open: we can place ')'\n- If the string reaches length 2 * n, we output it.\n\nTime complexity is bounded by the n-th Catalan number, which is O(4^n / (n * sqrt(n))). Space complexity is O(n) due to recursion stack depth.",
        examples: [
            {
                title: "Example 1",
                input: "3",
                output: "((()))\n(()())\n(())()\n()(())\n()()()",
                explanation: "For n = 3, there are 5 well-formed parenthesis combinations."
            },
            {
                title: "Example 2",
                input: "1",
                output: "()",
                explanation: "For n = 1, only '()' is possible."
            }
        ],
        testcases: [
            { input: "3", output: "((()))\n(()())\n(())()\n()(())\n()()()" },
            { input: "1", output: "()" },
            { input: "2", output: "(())\n()()" },
            { input: "4", output: "(((())))\n((()()))\n((())())\n((()))()\n(()(()))\n(()()())\n(()())()\n(())(())\n(())()()\n()((()))\n()(()())\n()(())()\n()()(())\n()()()()" },
            { input: "5", output: "((((()))))\n((((()()))))\n((((())())))\n((((()))))\n((((()))))()\n((()(())))\n((()()()))\n((()())())\n((()()))()\n((())(()))\n((())()())\n((())())()\n((()))(())\n((()))()()\n(()((())))\n(()(()()))\n(()(())())\n(()(()))()\n(()()(()))\n(()()()())\n(()()())()\n(()())(())\n(()())()()\n(())((()))\n(())(()())\n(())(())()\n(())()(())\n(())()()()\n()(((())))\n()((()()))\n()((())())\n()((()))()\n()(()(()))\n()(()()())\n()(()())()\n()(())(())\n()(())()()\n()()((()))\n()()(()())\n()()(())()\n()()()(())\n()()()()()" },
            { input: "1", output: "()" },
            { input: "2", output: "(())\n()()" },
            { input: "3", output: "((()))\n(()())\n(())()\n()(())\n()()()" },
            { input: "4", output: "(((())))\n((()()))\n((())())\n((()))()\n(()(()))\n(()()())\n(()())()\n(())(())\n(())()()\n()((()))\n()(()())\n()(())()\n()()(())\n()()()()" },
            { input: "5", output: "((((()))))\n((((()()))))\n((((())())))\n((((()))))\n((((()))))()\n((()(())))\n((()()()))\n((()())())\n((()()))()\n((())(()))\n((())()())\n((())())()\n((()))(())\n((()))()()\n(()((())))\n(()(()()))\n(()(())())\n(()(()))()\n(()()(()))\n(()()()())\n(()()())()\n(()())(())\n(()())()()\n(())((()))\n(())(()())\n(())(())()\n(())()(())\n(())()()()\n()(((())))\n()((()()))\n()((())())\n()((()))()\n()(()(()))\n()(()()())\n()(()())()\n()(())(())\n()(())()()\n()()((()))\n()()(()())\n()()(())()\n()()()(())\n()()()()()" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Generate valid parenthesis recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
void backtrack(string current, int open, int close, int max_val) {
    if (current.length() == max_val * 2) {
        cout << current << "\n";
        return;
    }
    if (open < max_val) {
        backtrack(current + "(", open + 1, close, max_val);
    }
    if (close < open) {
        backtrack(current + ")", open, close + 1, max_val);
    }
}
int main() {
    int n;
    if (cin >> n) {
        backtrack("", 0, 0, n);
    }
    return 0;
}`,
            python: `import sys
def backtrack(current, open_count, close_count, max_val):
    if len(current) == max_val * 2:
        print(current)
        return
    if open_count < max_val:
        backtrack(current + "(", open_count + 1, close_count, max_val)
    if close_count < open_count:
        backtrack(current + ")", open_count, close_count + 1, max_val)
def main():
    line = sys.stdin.read().split()
    if line:
        n = int(line[0])
        backtrack("", 0, 0, n)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    public static void backtrack(StringBuilder current, int open, int close, int max) {
        if (current.length() == max * 2) {
            System.out.println(current.toString());
            return;
        }
        if (open < max) {
            current.append('(');
            backtrack(current, open + 1, close, max);
            current.setLength(current.length() - 1);
        }
        if (close < open) {
            current.append(')');
            backtrack(current, open, close + 1, max);
            current.setLength(current.length() - 1);
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            int n = Integer.parseInt(line.trim());
            backtrack(new StringBuilder(), 0, 0, n);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn backtrack(current: &mut String, open: usize, close: usize, max: usize) {
    if current.len() == max * 2 {
        println!("{}", current);
        return;
    }
    if open < max {
        current.push('(');
        backtrack(current, open + 1, close, max);
        current.pop();
    }
    if close < open {
        current.push(')');
        backtrack(current, open, close + 1, max);
        current.pop();
    }
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<usize>() {
            let mut s = String::new();
            backtrack(&mut s, 0, 0, n);
        }
    }
}`
        }
    },

    // ==================== MEDIUM #2: Count All Subsets ====================
    {
        title: "Count All Subsets",
        description: "Given an array of n integers (which may contain duplicate elements), count the total number of unique subsets (the power set) that can be generated.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer representing the count of unique subsets",
        difficulty: "MEDIUM",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= n <= 15\n-50 <= arr[i] <= 50",
        hints: "Sort the array first to group duplicates. Use backtracking to find unique subsets. In each step, if you skip the current element, skip all subsequent duplicates of that element to avoid counting the same subset multiple times.",
        editorial: "**Approach: Sorted Backtracking**\n\nBy sorting the array, identical values are adjacent. When generating subsets, we can recursively build paths. If we decide not to include the element at the current index, we skip over all identical elements in the array to prevent duplicate subset counts. \n\nTime complexity is O(2^n), and space complexity is O(n) recursion stack.",
        examples: [
            { title: "Example 1", input: "3\n1 2 2", output: "6", explanation: "Unique subsets are: {}, {1}, {2}, {1, 2}, {2, 2}, {1, 2, 2}." },
            { title: "Example 2", input: "4\n1 1 1 1", output: "5", explanation: "Unique subsets are: {}, {1}, {1, 1}, {1, 1, 1}, {1, 1, 1, 1}." }
        ],
        testcases: [
            { input: "3\n1 2 2", output: "6" },
            { input: "4\n1 1 1 1", output: "5" },
            { input: "1\n42", output: "2" },
            { input: "5\n1 2 3 4 5", output: "32" },
            { input: "6\n1 1 2 2 3 3", output: "27" },
            { input: "10\n1 2 3 1 2 3 1 2 3 4", output: "128" },
            { input: "8\n0 0 0 0 0 0 0 0", output: "9" },
            { input: "6\n-1 -1 -1 2 2 5", output: "24" },
            { input: "12\n1 2 3 4 5 6 7 8 9 10 11 12", output: "4096" },
            { input: "15\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", output: "16" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Count unique subsets recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int countSubsets(int idx, const vector<int>& arr) {
    int cnt = 1;
    for (int i = idx; i < arr.size(); i++) {
        if (i > idx && arr[i] == arr[i-1]) continue;
        cnt += countSubsets(i + 1, arr);
    }
    return cnt;
}
int main() {
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        sort(arr.begin(), arr.end());
        cout << countSubsets(0, arr) << "\n";
    }
    return 0;
}`,
            python: `import sys
def count_subsets(idx, arr):
    cnt = 1
    for i in range(idx, len(arr)):
        if i > idx and arr[i] == arr[i-1]:
            continue
        cnt += count_subsets(i + 1, arr)
    return cnt
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    arr = [int(x) for x in input_data[1:n+1]]
    arr.sort()
    print(count_subsets(0, arr))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static int countSubsets(int idx, int[] arr) {
        int cnt = 1;
        for (int i = idx; i < arr.length; i++) {
            if (i > idx && arr[i] == arr[i-1]) continue;
            cnt += countSubsets(i + 1, arr);
        }
        return cnt;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(arr);
        System.out.println(countSubsets(0, arr));
    }
}`,
            rust: `use std::io::{self, BufRead};
fn count_subsets(idx: usize, arr: &[i32]) -> i32 {
    let mut cnt = 1;
    for i in idx..arr.len() {
        if i > idx && arr[i] == arr[i-1] {
            continue;
        }
        cnt += count_subsets(i + 1, arr);
    }
    cnt
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut arr: Vec<i32> = line2.trim().split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            arr.sort();
            println!("{}", count_subsets(0, &arr));
        }
    }
}`
        }
    },

    // ==================== MEDIUM #3: Count Permutations ====================
    {
        title: "Count Permutations",
        description: "Given a string S (which may contain duplicate characters), return the number of unique permutations of S using recursion/backtracking.\n\n**Input Format:**\n- A single line containing the string S\n\n**Output Format:**\n- A single integer representing the count of unique permutations",
        difficulty: "MEDIUM",
        tags: ["backtracking", "recursion", "permutations"],
        constraints: "1 <= |S| <= 10\nS consists of lowercase English letters",
        hints: "Sort the string. Keep a 'used' array to track visited character indices. During backtracking, if you encounter duplicates, only branch on the first unused duplicate character.",
        editorial: "**Approach: Unique Backtracking Permutations**\n\nSort the characters of the string. In the backtracking function, we maintain a `used` boolean array. At each position of the permutation, we loop through all characters. We skip character `i` if it's already used, or if `S[i] == S[i-1]` and `S[i-1]` is not used (which implies the current choice would generate a duplicate branch).\n\nTime complexity is O(N!), space complexity is O(N) due to recursion stack depth.",
        examples: [
            { title: "Example 1", input: "aab", output: "3", explanation: "Unique permutations are: 'aab', 'aba', 'baa'." },
            { title: "Example 2", input: "abc", output: "6", explanation: "Unique permutations: 'abc', 'acb', 'bac', 'bca', 'cab', 'cba'." }
        ],
        testcases: [
            { input: "aab", output: "3" },
            { input: "abc", output: "6" },
            { input: "a", output: "1" },
            { input: "aaaaa", output: "1" },
            { input: "aba", output: "3" },
            { input: "abcd", output: "24" },
            { input: "aabbcc", output: "90" },
            { input: "mississip", output: "2520" },
            { input: "abcdefgh", output: "40320" },
            { input: "aaabbbccc", output: "1680" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Count unique permutations of a string recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read S and solve
    
    return 0;
}`,
            python: `def main():
    # Read S and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read S and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read S and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int countPerms(string& s, vector<bool>& used) {
    int count = 0;
    bool is_leaf = true;
    for (int i = 0; i < s.length(); i++) {
        if (used[i]) continue;
        if (i > 0 && s[i] == s[i-1] && !used[i-1]) continue;
        used[i] = true;
        count += countPerms(s, used);
        used[i] = false;
        is_leaf = false;
    }
    return is_leaf ? 1 : count;
}
int main() {
    string s;
    if (cin >> s) {
        sort(s.begin(), s.end());
        vector<bool> used(s.length(), false);
        cout << countPerms(s, used) << "\n";
    }
    return 0;
}`,
            python: `import sys
def count_perms(s, used):
    count = 0
    is_leaf = True
    for i in range(len(s)):
        if used[i]:
            continue
        if i > 0 and s[i] == s[i-1] and not used[i-1]:
            continue
        used[i] = True
        count += count_perms(s, used)
        used[i] = False
        is_leaf = False
    return 1 if is_leaf else count
def main():
    line = sys.stdin.read().split()
    if line:
        s = list(line[0])
        s.sort()
        used = [False] * len(s)
        print(count_perms(s, used))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static int countPerms(char[] s, boolean[] used) {
        int count = 0;
        boolean isLeaf = true;
        for (int i = 0; i < s.length; i++) {
            if (used[i]) continue;
            if (i > 0 && s[i] == s[i-1] && !used[i-1]) continue;
            used[i] = true;
            count += countPerms(s, used);
            used[i] = false;
            isLeaf = false;
        }
        return isLeaf ? 1 : count;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            char[] s = line.trim().toCharArray();
            Arrays.sort(s);
            boolean[] used = new boolean[s.length];
            System.out.println(countPerms(s, used));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn count_perms(s: &[char], used: &mut [bool]) -> i32 {
    let mut count = 0;
    let mut is_leaf = true;
    for i in 0..s.len() {
        if used[i] { continue; }
        if i > 0 && s[i] == s[i-1] && !used[i-1] { continue; }
        used[i] = true;
        count += count_perms(s, used);
        used[i] = false;
        is_leaf = false;
    }
    if is_leaf { 1 } else { count }
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        let mut s: Vec<char> = line.trim().chars().collect();
        s.sort();
        let mut used = vec![false; s.len()];
        println!("{}", count_perms(&s, &mut used));
    }
}`
        }
    },

    // ==================== MEDIUM #4: Combination Sum ====================
    {
        title: "Combination Sum",
        description: "Given an array of distinct integers candidates and a target integer, return the number of unique combinations where the chosen numbers sum to the target. You can choose any candidate integer an unlimited number of times.\n\n**Input Format:**\n- First line: two space-separated integers n and target\n- Second line: n space-separated candidate integers\n\n**Output Format:**\n- A single integer representing the number of unique combinations that sum to target",
        difficulty: "MEDIUM",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= n <= 30\n1 <= candidates[i] <= 200\n1 <= target <= 500\nAll candidates are distinct",
        hints: "Use recursion. For candidates[idx], you can either take it (and call the function again at the same index since candidates can be repeated) or skip it (move to index + 1). Use memoization to speed up.",
        editorial: "**Approach: Recursion with Memoization (Knapsack-like DP)**\n\nWe define a function `solve(idx, target)` which calculates the number of ways to form target sum using a subset of candidates starting from `candidates[idx]`. \n- Base case: if target == 0, return 1 (successfully formed the sum)\n- Base case: if target < 0 or idx >= n, return 0\n- Transition: `solve(idx, target) = solve(idx, target - candidates[idx]) + solve(idx + 1, target)`\n\nWe memoize the state `(idx, target)` using a 2D table or hash map. Time complexity is O(n * target) and space complexity is O(n * target).",
        examples: [
            {
                title: "Example 1",
                input: "4 7\n2 3 6 7",
                output: "2",
                explanation: "The unique combinations are [2, 2, 3] and [7]."
            },
            {
                title: "Example 2",
                input: "3 8\n2 3 5",
                output: "3",
                explanation: "The unique combinations are [2, 2, 2, 2], [2, 3, 3], and [3, 5]."
            }
        ],
        testcases: [
            { input: "4 7\n2 3 6 7", output: "2" },
            { input: "3 8\n2 3 5", output: "3" },
            { input: "1 4\n2", output: "1" },
            { input: "1 3\n2", output: "0" },
            { input: "5 10\n1 2 3 4 5", output: "30" },
            { input: "4 20\n2 4 6 8", output: "23" },
            { input: "4 50\n5 10 15 20", output: "23" },
            { input: "2 15\n3 5", output: "2" },
            { input: "3 100\n10 20 50", output: "10" },
            { input: "2 100\n25 50", output: "3" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Find combinations count recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read candidates and solve
    
    return 0;
}`,
            python: `def main():
    # Read candidates and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read candidates and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read candidates and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int memo[35][505];
int solve(int idx, int target, const vector<int>& candidates) {
    if (target == 0) return 1;
    if (target < 0 || idx >= candidates.size()) return 0;
    if (memo[idx][target] != -1) return memo[idx][target];
    int take = solve(idx, target - candidates[idx], candidates);
    int skip = solve(idx + 1, target, candidates);
    return memo[idx][target] = take + skip;
}
int main() {
    int n, target;
    if (cin >> n >> target) {
        vector<int> candidates(n);
        for (int i = 0; i < n; i++) cin >> candidates[i];
        memset(memo, -1, sizeof(memo));
        cout << solve(0, target, candidates) << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    target = int(input_data[1])
    candidates = [int(x) for x in input_data[2:n+2]]
    memo = {}
    def solve(idx, target):
        if target == 0:
            return 1
        if target < 0 or idx >= len(candidates):
            return 0
        state = (idx, target)
        if state in memo:
            return memo[state]
        take = solve(idx, target - candidates[idx])
        skip = solve(idx + 1, target)
        memo[state] = take + skip
        return memo[state]
    print(solve(0, target))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int[][] memo = new int[35][505];
    public static int solve(int idx, int target, int[] candidates) {
        if (target == 0) return 1;
        if (target < 0 || idx >= candidates.length) return 0;
        if (memo[idx][target] != -1) return memo[idx][target];
        int take = solve(idx, target - candidates[idx], candidates);
        int skip = solve(idx + 1, target, candidates);
        return memo[idx][target] = take + skip;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        int n = Integer.parseInt(st1.nextToken());
        int target = Integer.parseInt(st1.nextToken());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st2 = new StringTokenizer(line2);
        int[] candidates = new int[n];
        for (int i = 0; i < n; i++) {
            candidates[i] = Integer.parseInt(st2.nextToken());
        }
        for (int[] row : memo) Arrays.fill(row, -1);
        System.out.println(solve(0, target, candidates));
    }
}`,
            rust: `use std::io::{self, BufRead};
fn solve(idx: usize, target: i32, candidates: &[i32], memo: &mut [[i32; 505]; 35]) -> i32 {
    if target == 0 { return 1; }
    if target < 0 || idx >= candidates.len() { return 0; }
    if memo[idx][target as usize] != -1 {
        return memo[idx][target as usize];
    }
    let take = solve(idx, target - candidates[idx], candidates, memo);
    let skip = solve(idx + 1, target, candidates, memo);
    memo[idx][target as usize] = take + skip;
    memo[idx][target as usize]
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let mut parts = line1.trim().split_whitespace();
        let n: usize = parts.next().unwrap().parse().unwrap();
        let target: i32 = parts.next().unwrap().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let candidates: Vec<i32> = line2.trim().split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut memo = [[-1; 505]; 35];
            println!("{}", solve(0, target, &candidates, &mut memo));
        }
    }
}`
        }
    },

    // ==================== MEDIUM #5: Word Search Exists ====================
    {
        title: "Word Search Exists",
        description: "Given an m x n board of characters and a string word, check if the word exists in the grid. The word can be formed from letters of horizontally or vertically adjacent cells. The same cell may not be used more than once in a single word path.\n\n**Input Format:**\n- First line: two integers m and n\n- Next m lines: n space-separated characters representing the board\n- Last line: the string word\n\n**Output Format:**\n- The string \"true\" if the word exists in the board, otherwise \"false\"",
        difficulty: "MEDIUM",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= m, n <= 6\n1 <= word.length <= 15\nBoard and word contain English letters",
        hints: "Search the grid for the first letter of the word. Start a recursive DFS search from that cell. To prevent using the same cell twice, replace it with a sentinel character (like '#') before recursing, and restore it when backtracking.",
        editorial: "**Approach: Backtracking DFS**\n\nFor each grid position, if the character matches the start of the word, we initiate a Depth First Search (DFS). \nDuring DFS:\n- Check boundaries and if the current character matches `word[idx]`.\n- Mark the cell as visited by temporarily modifying the board cell: `board[r][c] = '#'`.\n- Explore the 4 neighbors (up, down, left, right).\n- If any branch is successful, return `true`.\n- Otherwise, restore the cell: `board[r][c] = temp` (backtrack) and return `false`.\n\nTime complexity is O(m * n * 4^L) where L is word length. Space complexity is O(L) for recursion stack.",
        examples: [
            {
                title: "Example 1",
                input: "3 4\nA B C E\nS F C S\nA D E E\nABCCED",
                output: "true",
                explanation: "The path A -> B -> C -> C -> E -> D exists on the board."
            },
            {
                title: "Example 2",
                input: "3 4\nA B C E\nS F C S\nA D E E\nABCB",
                output: "false",
                explanation: "The path ABCB requires using the 'B' at (0,1) again, which is invalid."
            }
        ],
        testcases: [
            { input: "3 4\nA B C E\nS F C S\nA D E E\nABCCED", output: "true" },
            { input: "3 4\nA B C E\nS F C S\nA D E E\nABCB", output: "false" },
            { input: "1 1\nA\nA", output: "true" },
            { input: "1 1\nA\nB", output: "false" },
            { input: "2 2\na b\nc d\nabdc", output: "true" },
            { input: "2 2\na b\nc d\nabcd", output: "false" },
            { input: "3 3\nC A T\nA X X\nT X X\nCAT", output: "true" },
            { input: "3 3\nC A T\nA X X\nT X X\nTAX", output: "true" },
            { input: "3 3\nC A T\nA X X\nT X X\nCATA", output: "false" },
            { input: "4 4\nA B C D\nE F G H\nI J K L\nM N O P\nAFK", output: "false" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Check if word exists in grid recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read board and solve
    
    return 0;
}`,
            python: `def main():
    # Read board and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read board and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read board and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int m, n;
vector<string> board;
string word;
bool dfs(int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word[idx]) return false;
    char temp = board[r][c];
    board[r][c] = '#';
    bool found = dfs(r-1, c, idx+1) || dfs(r+1, c, idx+1) || dfs(r, c-1, idx+1) || dfs(r, c+1, idx+1);
    board[r][c] = temp;
    return found;
}
int main() {
    if (cin >> m >> n) {
        board.resize(m);
        for (int i = 0; i < m; i++) {
            board[i].resize(n);
            for (int j = 0; j < n; j++) {
                cin >> board[i][j];
            }
        }
        cin >> word;
        bool exists = false;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(i, j, 0)) {
                    exists = true;
                    break;
                }
            }
            if (exists) break;
        }
        cout << (exists ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
def dfs(r, c, idx, board, word, m, n):
    if idx == len(word):
        return True
    if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:
        return False
    temp = board[r][c]
    board[r][c] = '#'
    found = (dfs(r-1, c, idx+1, board, word, m, n) or
             dfs(r+1, c, idx+1, board, word, m, n) or
             dfs(r, c-1, idx+1, board, word, m, n) or
             dfs(r, c+1, idx+1, board, word, m, n))
    board[r][c] = temp
    return found
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    m = int(input_data[0])
    n = int(input_data[1])
    board = []
    idx = 2
    for _ in range(m):
        row = input_data[idx:idx+n]
        board.append(row)
        idx += n
    word = input_data[idx]
    exists = False
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0, board, word, m, n):
                exists = True
                break
        if exists:
            break
    print("true" if exists else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int m, n;
    static char[][] board;
    static String word;
    public static boolean dfs(int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != word.charAt(idx)) return false;
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = dfs(r-1, c, idx+1) || dfs(r+1, c, idx+1) || dfs(r, c-1, idx+1) || dfs(r, c+1, idx+1);
        board[r][c] = temp;
        return found;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        m = Integer.parseInt(st.nextToken());
        n = Integer.parseInt(st.nextToken());
        board = new char[m][n];
        for (int i = 0; i < m; i++) {
            StringTokenizer rowSt = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) {
                board[i][j] = rowSt.nextToken().charAt(0);
            }
        }
        word = br.readLine().trim();
        boolean exists = false;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(i, j, 0)) {
                    exists = true;
                    break;
                }
            }
            if (exists) break;
        }
        System.out.println(exists ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
fn dfs(r: i32, c: i32, idx: usize, board: &mut Vec<Vec<char>>, word: &Vec<char>) -> bool {
    if idx == word.len() { return true; }
    let m = board.len() as i32;
    let n = board[0].len() as i32;
    if r < 0 || r >= m || c < 0 || c >= n || board[r as usize][c as usize] != word[idx] {
        return false;
    }
    let temp = board[r as usize][c as usize];
    board[r as usize][c as usize] = '#';
    let found = dfs(r-1, c, idx+1, board, word) ||
                dfs(r+1, c, idx+1, board, word) ||
                dfs(r, c-1, idx+1, board, word) ||
                dfs(r, c+1, idx+1, board, word);
    board[r as usize][c as usize] = temp;
    found
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let mut parts = line1.trim().split_whitespace();
        let m: usize = parts.next().unwrap().parse().unwrap();
        let n: usize = parts.next().unwrap().parse().unwrap();
        let mut board = vec![vec![' '; n]; m];
        for i in 0..m {
            if let Some(Ok(line)) = lines.next() {
                let mut char_parts = line.trim().split_whitespace();
                for j in 0..n {
                    board[i][j] = char_parts.next().unwrap().chars().next().unwrap();
                }
            }
        }
        if let Some(Ok(line_word)) = lines.next() {
            let word: Vec<char> = line_word.trim().chars().collect();
            let mut exists = false;
            for i in 0..m {
                for j in 0..n {
                    if dfs(i as i32, j as i32, 0, &mut board, &word) {
                        exists = true;
                        break;
                    }
                }
                if exists { break; }
            }
            println!("{}", if exists { "true" } else { "false" });
        }
    }
}`
        }
    },

    // ==================== HARD #1: N-Queens All Arrangements Count ====================
    {
        title: "N-Queens All Arrangements Count",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions.\n\n**Input Format:**\n- A single integer n\n\n**Output Format:**\n- A single integer: the total number of valid board configurations",
        difficulty: "HARD",
        tags: ["backtracking", "recursion", "combinatorics"],
        constraints: "1 <= n <= 11",
        hints: "Place queens row by row. Maintain state for occupied columns, positive diagonals (row + col), and negative diagonals (row - col). Use bitmasks or boolean arrays to do O(1) checks.",
        editorial: "**Approach: Backtracking with Bitmasks**\n\nPlacing queens row by row allows us to avoid checking row collisions. For column and diagonal collisions:\n- A column `col` is blocked if bit `col` is set in `cols` mask.\n- A positive diagonal is blocked if bit `row + col` is set in `diag2` mask.\n- A negative diagonal is blocked if bit `row - col + n - 1` is set in `diag1` mask.\n\nWe recursively traverse column index in current row, apply masks, and recurse. If row == n, increment solution count. Backtrack by resetting masks.\n\nTime complexity is O(N!), space complexity is O(N) due to recursion stack depth.",
        examples: [
            { title: "Example 1", input: "4", output: "2", explanation: "There are 2 distinct configurations to place 4 queens safely on a 4x4 chessboard." },
            { title: "Example 2", input: "1", output: "1", explanation: "1 queen on a 1x1 board has exactly 1 valid solution." }
        ],
        testcases: [
            { input: "4", output: "2" },
            { input: "1", output: "1" },
            { input: "2", output: "0" },
            { input: "3", output: "0" },
            { input: "5", output: "10" },
            { input: "6", output: "4" },
            { input: "7", output: "40" },
            { input: "8", output: "92" },
            { input: "9", output: "352" },
            { input: "10", output: "724" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Compute N-Queens count recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and solve
    
    return 0;
}`,
            python: `def main():
    # Read n and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int total = 0;
int cols = 0, diag1 = 0, diag2 = 0;
void solve(int row, int n) {
    if (row == n) {
        total++;
        return;
    }
    for (int col = 0; col < n; col++) {
        int cBit = 1 << col;
        int d1Bit = 1 << (row - col + n - 1);
        int d2Bit = 1 << (row + col);
        if (!(cols & cBit) && !(diag1 & d1Bit) && !(diag2 & d2Bit)) {
            cols |= cBit;
            diag1 |= d1Bit;
            diag2 |= d2Bit;
            solve(row + 1, n);
            cols &= ~cBit;
            diag1 &= ~d1Bit;
            diag2 &= ~d2Bit;
        }
    }
}
int main() {
    int n;
    if (cin >> n) {
        solve(0, n);
        cout << total << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    line = sys.stdin.read().split()
    if not line:
        return
    n = int(line[0])
    cols = 0
    diag1 = 0
    diag2 = 0
    total = 0
    def solve(row):
        nonlocal cols, diag1, diag2, total
        if row == n:
            total += 1
            return
        for col in range(n):
            c_bit = 1 << col
            d_bit1 = 1 << (row - col + n - 1)
            d_bit2 = 1 << (row + col)
            if not (cols & c_bit) and not (diag1 & d_bit1) and not (diag2 & d_bit2):
                cols |= c_bit
                diag1 |= d_bit1
                diag2 |= d_bit2
                solve(row + 1)
                cols &= ~c_bit
                diag1 &= ~d_bit1
                diag2 &= ~d_bit2
    solve(0)
    print(total)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
public class Main {
    static int total = 0;
    static int cols = 0, diag1 = 0, diag2 = 0;
    public static void solve(int row, int n) {
        if (row == n) {
            total++;
            return;
        }
        for (int col = 0; col < n; col++) {
            int cBit = 1 << col;
            int d1Bit = 1 << (row - col + n - 1);
            int d2Bit = 1 << (row + col);
            if ((cols & cBit) == 0 && (diag1 & d1Bit) == 0 && (diag2 & d2Bit) == 0) {
                cols |= cBit;
                diag1 |= d1Bit;
                diag2 |= d2Bit;
                solve(row + 1, n);
                cols &= ~cBit;
                diag1 &= ~d1Bit;
                diag2 &= ~d2Bit;
            }
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            int n = Integer.parseInt(line.trim());
            solve(0, n);
            System.out.println(total);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
struct Solver {
    n: usize,
    cols: i32,
    diag1: i32,
    diag2: i32,
    total: i32,
}
impl Solver {
    fn solve(&mut self, row: usize) {
        if row == self.n {
            self.total += 1;
            return;
        }
        for col in 0..self.n {
            let c_bit = 1 << col;
            let d1_bit = 1 << (row as i32 - col as i32 + self.n as i32 - 1);
            let d2_bit = 1 << (row + col);
            if (self.cols & c_bit) == 0 && (self.diag1 & d1_bit) == 0 && (self.diag2 & d2_bit) == 0 {
                self.cols |= c_bit;
                self.diag1 |= d1_bit;
                self.diag2 |= d2_bit;
                self.solve(row + 1);
                self.cols &= !c_bit;
                self.diag1 &= !d1_bit;
                self.diag2 &= !d2_bit;
            }
        }
    }
}
fn main() {
    let stdin = io::stdin();
    if let Some(Ok(line)) = stdin.lock().lines().next() {
        if let Ok(n) = line.trim().parse::<usize>() {
            let mut solver = Solver { n, cols: 0, diag1: 0, diag2: 0, total: 0 };
            solver.solve(0);
            println!("{}", solver.total);
        }
    }
}`
        }
    },

    // ==================== HARD #2: Sudoku Solver Unique ====================
    {
        title: "Sudoku Solver Unique",
        description: "Write a program to solve a Sudoku puzzle. You are given a 9 x 9 board of space-separated characters. Digits '1'-'9' represent filled values and '.' represents empty cells. You may assume there is always a unique solution.\n\n**Input Format:**\n- 9 lines, each containing 9 space-separated characters\n\n**Output Format:**\n- 9 lines of 9 space-separated digits representing the solved puzzle",
        difficulty: "HARD",
        tags: ["backtracking", "recursion"],
        constraints: "Board is 9x9, solution is unique",
        hints: "Locate an empty cell (represented by '.'). Try placing numbers 1-9. Check if the placed number is valid in its row, column, and 3x3 block. If valid, recursively solve the rest. If not, backtrack by resetting the cell to '.' and try the next value.",
        editorial: "**Approach: Backtracking Sudoku Search**\n\nWe scan the 9x9 board for the first empty cell '.'. \nFor that empty cell, we iterate through characters '1' to '9'. For each digit:\n- Check if it violates Sudoku rules (checking the current row, column, and 3x3 grid containing the cell).\n- If valid, write it to the board, and recursively invoke `solve()`.\n- If the recursive call returns `true`, then the puzzle is solved.\n- Otherwise, backtrack by resetting the cell to '.' and try the next digit.\n\nTime complexity is O(9^k) where k is the number of empty cells. Space complexity is O(81) for board state.",
        examples: [
            {
                title: "Example 1",
                input: "5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9",
                output: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9",
                explanation: "The completed Sudoku grid satisfying row, column, and 3x3 box rules."
            },
            {
                title: "Example 2",
                input: ". . . 2 6 . 7 . 1\n6 8 . . 7 . . 9 .\n1 9 . . . 4 5 . .\n8 2 . 1 . . . 4 .\n. . 4 6 . 2 9 . .\n. 5 . . . 3 . 2 8\n. . 9 3 . . . 7 4\n. 4 . . 5 . . 3 6\n7 . 3 . 1 8 . . .",
                output: "4 3 5 2 6 9 7 8 1\n6 8 2 5 7 1 4 9 3\n1 9 7 8 3 4 5 6 2\n8 2 6 1 9 5 3 4 7\n3 7 4 6 8 2 9 1 5\n9 5 1 7 4 3 6 2 8\n5 1 9 3 2 6 8 7 4\n2 4 8 9 5 7 1 3 6\n7 6 3 4 1 8 2 5 9",
                explanation: "A second Sudoku board resolved correctly."
            }
        ],
        testcases: [
            { input: "5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", output: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9" },
            { input: ". . . 2 6 . 7 . 1\n6 8 . . 7 . . 9 .\n1 9 . . . 4 5 . .\n8 2 . 1 . . . 4 .\n. . 4 6 . 2 9 . .\n. 5 . . . 3 . 2 8\n. . 9 3 . . . 7 4\n. 4 . . 5 . . 3 6\n7 . 3 . 1 8 . . .", output: "4 3 5 2 6 9 7 8 1\n6 8 2 5 7 1 4 9 3\n1 9 7 8 3 4 5 6 2\n8 2 6 1 9 5 3 4 7\n3 7 4 6 8 2 9 1 5\n9 5 1 7 4 3 6 2 8\n5 1 9 3 2 6 8 7 4\n2 4 8 9 5 7 1 3 6\n7 6 3 4 1 8 2 5 9" },
            { input: ". . 3 . 2 . 6 . .\n9 . . 3 . 5 . . 1\n. . 1 8 . 6 4 . .\n. . 8 1 . 2 9 . .\n7 . . . . . . . 8\n. . 6 7 . 8 2 . .\n. . 2 6 . 9 5 . .\n8 . . 2 . 3 . . 9\n. . 5 . 1 . 3 . .", output: "4 8 3 9 2 1 6 5 7\n9 6 7 3 4 5 8 2 1\n2 5 1 8 7 6 4 9 3\n5 4 8 1 3 2 9 7 6\n7 2 9 5 6 4 1 3 8\n1 3 6 7 9 8 2 4 5\n3 7 2 6 8 9 5 1 4\n8 1 4 2 5 3 7 6 9\n6 9 5 4 1 7 3 8 2" },
            { input: "3 . 6 5 . 8 4 . 2\n5 2 . . . . . 1 3\n. . . . . . . . .\n. . . 3 . 1 . . .\n9 . . 8 6 2 . . 5\n. . . 7 . 9 . . .\n. . . . . . . . .\n8 6 . . . . . 2 4\n1 . 2 6 . 7 9 . 8", output: "3 1 6 5 7 8 4 9 2\n5 2 7 4 9 6 8 1 3\n4 8 9 1 2 3 5 6 7\n2 5 8 3 4 1 6 7 9\n9 7 1 8 6 2 3 4 5\n6 3 4 7 5 9 2 8 1\n7 9 5 2 8 4 1 3 6\n8 6 3 9 1 5 7 2 4\n1 4 2 6 3 7 9 5 8" },
            { input: "5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", output: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9" },
            { input: ". . . 2 6 . 7 . 1\n6 8 . . 7 . . 9 .\n1 9 . . . 4 5 . .\n8 2 . 1 . . . 4 .\n. . 4 6 . 2 9 . .\n. 5 . . . 3 . 2 8\n. . 9 3 . . . 7 4\n. 4 . . 5 . . 3 6\n7 . 3 . 1 8 . . .", output: "4 3 5 2 6 9 7 8 1\n6 8 2 5 7 1 4 9 3\n1 9 7 8 3 4 5 6 2\n8 2 6 1 9 5 3 4 7\n3 7 4 6 8 2 9 1 5\n9 5 1 7 4 3 6 2 8\n5 1 9 3 2 6 8 7 4\n2 4 8 9 5 7 1 3 6\n7 6 3 4 1 8 2 5 9" },
            { input: ". . 3 . 2 . 6 . .\n9 . . 3 . 5 . . 1\n. . 1 8 . 6 4 . .\n. . 8 1 . 2 9 . .\n7 . . . . . . . 8\n. . 6 7 . 8 2 . .\n. . 2 6 . 9 5 . .\n8 . . 2 . 3 . . 9\n. . 5 . 1 . 3 . .", output: "4 8 3 9 2 1 6 5 7\n9 6 7 3 4 5 8 2 1\n2 5 1 8 7 6 4 9 3\n5 4 8 1 3 2 9 7 6\n7 2 9 5 6 4 1 3 8\n1 3 6 7 9 8 2 4 5\n3 7 2 6 8 9 5 1 4\n8 1 4 2 5 3 7 6 9\n6 9 5 4 1 7 3 8 2" },
            { input: "3 . 6 5 . 8 4 . 2\n5 2 . . . . . 1 3\n. . . . . . . . .\n. . . 3 . 1 . . .\n9 . . 8 6 2 . . 5\n. . . 7 . 9 . . .\n. . . . . . . . .\n8 6 . . . . . 2 4\n1 . 2 6 . 7 9 . 8", output: "3 1 6 5 7 8 4 9 2\n5 2 7 4 9 6 8 1 3\n4 8 9 1 2 3 5 6 7\n2 5 8 3 4 1 6 7 9\n9 7 1 8 6 2 3 4 5\n6 3 4 7 5 9 2 8 1\n7 9 5 2 8 4 1 3 6\n8 6 3 9 1 5 7 2 4\n1 4 2 6 3 7 9 5 8" },
            { input: "5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", output: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9" },
            { input: ". . . 2 6 . 7 . 1\n6 8 . . 7 . . 9 .\n1 9 . . . 4 5 . .\n8 2 . 1 . . . 4 .\n. . 4 6 . 2 9 . .\n. 5 . . . 3 . 2 8\n. . 9 3 . . . 7 4\n. 4 . . 5 . . 3 6\n7 . 3 . 1 8 . . .", output: "4 3 5 2 6 9 7 8 1\n6 8 2 5 7 1 4 9 3\n1 9 7 8 3 4 5 6 2\n8 2 6 1 9 5 3 4 7\n3 7 4 6 8 2 9 1 5\n9 5 1 7 4 3 6 2 8\n5 1 9 3 2 6 8 7 4\n2 4 8 9 5 7 1 3 6\n7 6 3 4 1 8 2 5 9" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Implement Sudoku solver
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read 9 lines of 9 space-separated characters and solve
    
    return 0;
}`,
            python: `def main():
    # Read 9 lines of 9 space-separated characters and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read 9 lines of 9 space-separated characters and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read 9 lines of 9 space-separated characters and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
char board[9][9];
bool isValid(int r, int c, char val) {
    for (int i = 0; i < 9; i++) {
        if (board[r][i] == val) return false;
        if (board[i][c] == val) return false;
        if (board[3*(r/3) + i/3][3*(c/3) + i%3] == val) return false;
    }
    return true;
}
bool solve() {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') {
                for (char val = '1'; val <= '9'; val++) {
                    if (isValid(r, c, val)) {
                        board[r][c] = val;
                        if (solve()) return true;
                        board[r][c] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}
int main() {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            cin >> board[r][c];
        }
    }
    if (solve()) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                cout << board[r][c] << (c == 8 ? "" : " ");
            }
            cout << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
def is_valid(board, r, c, val):
    for i in range(9):
        if board[r][i] == val: return False
        if board[i][c] == val: return False
        if board[3*(r//3) + i//3][3*(c//3) + i%3] == val: return False
    return True
def solve(board):
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                for val in '123456789':
                    if is_valid(board, r, c, val):
                        board[r][c] = val
                        if solve(board):
                            return True
                        board[r][c] = '.'
                return False
    return True
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    board = []
    idx = 0
    for _ in range(9):
        board.append(list(input_data[idx:idx+9]))
        idx += 9
    if solve(board):
        for row in board:
            print(' '.join(row))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static char[][] board = new char[9][9];
    public static boolean isValid(int r, int c, char val) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == val) return false;
            if (board[i][c] == val) return false;
            if (board[3*(r/3) + i/3][3*(c/3) + i%3] == val) return false;
        }
        return true;
    }
    public static boolean solve() {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char val = '1'; val <= '9'; val++) {
                        if (isValid(r, c, val)) {
                            board[r][c] = val;
                            if (solve()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        for (int r = 0; r < 9; r++) {
            String line = br.readLine();
            if (line == null) return;
            StringTokenizer st = new StringTokenizer(line);
            for (int c = 0; c < 9; c++) {
                board[r][c] = st.nextToken().charAt(0);
            }
        }
        if (solve()) {
            for (int r = 0; r < 9; r++) {
                for (int c = 0; c < 9; c++) {
                    System.out.print(board[r][c] + (c == 8 ? "" : " "));
                }
                System.out.println();
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
fn is_valid(board: &[[char; 9]; 9], r: usize, c: usize, val: char) -> bool {
    for i in 0..9 {
        if board[r][i] == val { return false; }
        if board[i][c] == val { return false; }
        if board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == val { return false; }
    }
    true
}
fn solve(board: &mut [[char; 9]; 9]) -> bool {
    for r in 0..9 {
        for c in 0..9 {
            if board[r][c] == '.' {
                for val in vec!['1', '2', '3', '4', '5', '6', '7', '8', '9'] {
                    if is_valid(board, r, c, val) {
                        board[r][c] = val;
                        if solve(board) { return true; }
                        board[r][c] = '.';
                    }
                }
                return false;
            }
        }
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let mut board = [['.'; 9]; 9];
    for r in 0..9 {
        if let Some(Ok(line)) = lines.next() {
            let parts: Vec<char> = line.trim().split_whitespace()
                .map(|x| x.chars().next().unwrap()).collect();
            for c in 0..9 {
                board[r][c] = parts[c];
            }
        }
    }
    if solve(&mut board) {
        for r in 0..9 {
            let row_str: Vec<String> = board[r].iter().map(|&x| x.to_string()).collect();
            println!("{}", row_str.join(" "));
        }
    }
}`
        }
    },

    // ==================== HARD #3: Word Break Combinations ====================
    {
        title: "Word Break Combinations",
        description: "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return the total number of unique sentences that can be formed.\n\n**Input Format:**\n- First line: the string s\n- Second line: an integer m (size of dictionary)\n- Next m lines: one word per line representing the dictionary\n\n**Output Format:**\n- A single integer representing the count of unique valid sentences",
        difficulty: "HARD",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= s.length <= 30\n1 <= m <= 20\nEach word in wordDict length <= 10",
        hints: "Use recursion. For a given state (string suffix), iterate through all dictionary words. If a word is a prefix of the current suffix, recurse on the remaining suffix. Use memoization to avoid TLE.",
        editorial: "**Approach: Backtracking with Memoization**\n\nWe define a function `solve(current)` which returns the count of valid sentences that can be formed using the string `current`. \nInside `solve(current)`:\n- If `current` is empty, we found a valid sentence layout. Return 1.\n- Check if `current` has been computed before in our memoization map. If so, return the cached count.\n- Iterate through the dictionary. If a dictionary word is a prefix of `current`, add `solve(current[len(word):])` to our total count.\n- Store the total count for the string `current` in our memoization map.\n\nTime complexity is O(N * M) where N = s.length and M = dict.size, and space complexity is O(N) due to recursion stack and storage.",
        examples: [
            {
                title: "Example 1",
                input: "catsanddog\n5\ncat\ncats\nand\nsand\ndog",
                output: "2",
                explanation: "The sentences are 'cats and dog' and 'cat sand dog'."
            },
            {
                title: "Example 2",
                input: "pineapplepenapple\n5\napple\npen\napplepen\npine\npineapple",
                output: "3",
                explanation: "The sentences are:\n1) 'pine apple pen apple'\n2) 'pineapple pen apple'\n3) 'pine applepen apple'"
            }
        ],
        testcases: [
            { input: "catsanddog\n5\ncat\ncats\nand\nsand\ndog", output: "2" },
            { input: "pineapplepenapple\n5\napple\npen\napplepen\npine\npineapple", output: "3" },
            { input: "catsandog\n5\ncat\ncats\nand\nsand\ndog", output: "0" },
            { input: "a\n1\na", output: "1" },
            { input: "a\n1\nb", output: "0" },
            { input: "aaaaaaa\n3\na\naa\naaa", output: "44" },
            { input: "catsanddog\n6\ncat\ncats\nand\nsand\ndog\ncatsanddog", output: "3" },
            { input: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n1\na", output: "1" },
            { input: "abc\n4\nab\nbc\na\nc", output: "2" },
            { input: "abcde\n7\na\nb\nc\nd\ne\nab\ncd", output: "4" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Find combinations count recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read string, dictionary size, and dictionary words. Print combinations count.
    
    return 0;
}`,
            python: `def main():
    # Read string, dictionary size, and dictionary words. Print combinations count.
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read string, dictionary size, and dictionary words. Print combinations count.
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read string, dictionary size, and dictionary words. Print combinations count.
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
unordered_map<string, long long> memo;
unordered_set<string> dict;
long long solve(string s) {
    if (s.empty()) return 1;
    if (memo.count(s)) return memo[s];
    long long ans = 0;
    for (int i = 1; i <= s.length(); i++) {
        string prefix = s.substr(0, i);
        if (dict.count(prefix)) {
            ans += solve(s.substr(i));
        }
    }
    return memo[s] = ans;
}
int main() {
    string s;
    if (cin >> s) {
        int m;
        if (cin >> m) {
            for (int i = 0; i < m; i++) {
                string word;
                cin >> word;
                dict.insert(word);
            }
            cout << solve(s) << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    s = input_data[0]
    m = int(input_data[1])
    dict_words = set(input_data[2:2+m])
    memo = {}
    def solve(current):
        if not current:
            return 1
        if current in memo:
            return memo[current]
        ans = 0
        for i in range(1, len(current) + 1):
            prefix = current[:i]
            if prefix in dict_words:
                ans += solve(current[i:])
        memo[current] = ans
        return ans
    print(solve(s))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static HashMap<String, Long> memo = new HashMap<>();
    static HashSet<String> dict = new HashSet<>();
    public static long solve(String s) {
        if (s.isEmpty()) return 1;
        if (memo.containsKey(s)) return memo.get(s);
        long ans = 0;
        for (int i = 1; i <= s.length(); i++) {
            String prefix = s.substring(0, i);
            if (dict.contains(prefix)) {
                ans += solve(s.substring(i));
            }
        }
        memo.put(s, ans);
        return ans;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        String mLine = br.readLine();
        if (mLine == null) return;
        int m = Integer.parseInt(mLine.trim());
        for (int i = 0; i < m; i++) {
            dict.add(br.readLine().trim());
        }
        System.out.println(solve(s));
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashSet, HashMap};
fn solve(s: &str, dict: &HashSet<String>, memo: &mut HashMap<String, u64>) -> u64 {
    if s.is_empty() { return 1; }
    if let Some(&val) = memo.get(s) { return val; }
    let mut ans = 0;
    for i in 1..=s.len() {
        let prefix = &s[0..i];
        if dict.contains(prefix) {
            ans += solve(&s[i..], dict, memo);
        }
    }
    memo.insert(s.to_string(), ans);
    ans
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(s)) = lines.next() {
        let s = s.trim();
        if let Some(Ok(m_str)) = lines.next() {
            let m: usize = m_str.trim().parse().unwrap();
            let mut dict = HashSet::new();
            for _ in 0..m {
                if let Some(Ok(word)) = lines.next() {
                    dict.insert(word.trim().to_string());
                }
            }
            let mut memo = HashMap::new();
            println!("{}", solve(s, &dict, &mut memo));
        }
    }
}`
        }
    },

    // ==================== HARD #4: Knight Tour Possible ====================
    {
        title: "Knight Tour Possible",
        description: "Given a chessboard of size R x C and a starting position (r, c) of a knight, determine if there is a sequence of moves for the knight such that it visits every cell on the board exactly once. The knight moves in a standard L-shape (2 squares in one direction and 1 square in a perpendicular direction).\n\n**Input Format:**\n- First line: two space-separated integers R and C\n- Second line: two space-separated integers r and c representing the starting coordinates (0-indexed)\n\n**Output Format:**\n- The string \"true\" if a complete knight's tour is possible, otherwise \"false\"",
        difficulty: "HARD",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= R, C <= 5\nR * C <= 25\n0 <= r < R, 0 <= c < C",
        hints: "Implement a backtracking search starting at (r, c). Keep track of visited cells. In each recursive step, try moving to one of the 8 valid L-shaped neighbors. If you successfully visit R * C cells, return true. Backtrack if a move leads to a dead end.",
        editorial: "**Approach: Backtracking search**\n\nSince the board dimensions are very small (at most 25 cells), a simple DFS with backtracking is highly effective. \nWe initialize a `visited` board. Our DFS function accepts coordinates `(curr_r, curr_c)` and a count of visited cells. At each step:\n- If `count == R * C`, return `true`.\n- Loop through the 8 possible knight moves: `(-2,-1), (-2,1), (-1,-2), (-1,2), (1,-2), (1,2), (2,-1), (2,1)`.\n- If a move stays within the board boundaries and target cell is unvisited, mark it visited, recurse with `count + 1`, and if that succeeds, return `true`.\n- If all 8 moves fail, unmark the cell (backtrack) and return `false`.\n\nTime complexity is O(8^(R*C)) worst case, but terminates extremely fast because the small board limit restricts branches. Space complexity is O(R*C).",
        examples: [
            { title: "Example 1", input: "3 4\n0 0", output: "true", explanation: "Starting at (0,0) on a 3x4 board, there exists a sequence of moves visiting all 12 cells exactly once." },
            { title: "Example 2", input: "3 4\n1 1", output: "false", explanation: "On a 3x4 board, starting from (1,1) cannot cover all cells." }
        ],
        testcases: [
            { input: "3 4\n0 0", output: "true" },
            { input: "3 4\n1 1", output: "false" },
            { input: "1 1\n0 0", output: "true" },
            { input: "3 3\n0 0", output: "false" },
            { input: "4 4\n0 0", output: "false" },
            { input: "5 5\n0 0", output: "true" },
            { input: "5 5\n2 2", output: "true" },
            { input: "3 4\n2 0", output: "true" },
            { input: "3 4\n1 2", output: "false" },
            { input: "5 5\n1 1", output: "true" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Determine if knight's tour is possible recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read R, C, r, c and solve
    
    return 0;
}`,
            python: `def main():
    # Read R, C, r, c and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read R, C, r, c and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read R, C, r, c and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int R, C;
bool visited[10][10];
int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
bool tour(int r, int c, int count) {
    if (count == R * C) return true;
    for (int i = 0; i < 8; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr][nc]) {
            visited[nr][nc] = true;
            if (tour(nr, nc, count + 1)) return true;
            visited[nr][nc] = false;
        }
    }
    return false;
}
int main() {
    int r, c;
    if (cin >> R >> C >> r >> c) {
        memset(visited, 0, sizeof(visited));
        visited[r][c] = true;
        cout << (tour(r, c, 1) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
sys.setrecursionlimit(2000)
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    R = int(input_data[0])
    C = int(input_data[1])
    r = int(input_data[2])
    c = int(input_data[3])
    visited = [[False]*C for _ in range(R)]
    visited[r][c] = True
    dr = [-2, -2, -1, -1, 1, 1, 2, 2]
    dc = [-1, 1, -2, 2, -2, 2, -1, 1]
    def tour(curr_r, curr_c, count):
        if count == R * C:
            return True
        for i in range(8):
            nr = curr_r + dr[i]
            nc = curr_c + dc[i]
            if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc]:
                visited[nr][nc] = True
                if tour(nr, nc, count + 1):
                    return True
                visited[nr][nc] = False
        return False
    print("true" if tour(r, c, 1) else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int R, C;
    static boolean[][] visited = new boolean[10][10];
    static int[] dr = {-2, -2, -1, -1, 1, 1, 2, 2};
    static int[] dc = {-1, 1, -2, 2, -2, 2, -1, 1};
    public static boolean tour(int r, int c, int count) {
        if (count == R * C) return true;
        for (int i = 0; i < 8; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr][nc]) {
                visited[nr][nc] = true;
                if (tour(nr, nc, count + 1)) return true;
                visited[nr][nc] = false;
            }
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        R = Integer.parseInt(st1.nextToken());
        C = Integer.parseInt(st1.nextToken());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st2 = new StringTokenizer(line2);
        int r = Integer.parseInt(st2.nextToken());
        int c = Integer.parseInt(st2.nextToken());
        visited[r][c] = true;
        System.out.println(tour(r, c, 1) ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
fn tour(r: i32, c: i32, count: i32, R: i32, C: i32, visited: &mut Vec<Vec<bool>>) -> bool {
    if count == R * C { return true; }
    let dr = [-2, -2, -1, -1, 1, 1, 2, 2];
    let dc = [-1, 1, -2, 2, -2, 2, -1, 1];
    for i in 0..8 {
        let nr = r + dr[i];
        let nc = c + dc[i];
        if nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr as usize][nc as usize] {
            visited[nr as usize][nc as usize] = true;
            if tour(nr, nc, count + 1, R, C, visited) { return true; }
            visited[nr as usize][nc as usize] = false;
        }
    }
    false
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let mut parts1 = line1.trim().split_whitespace();
        let R: i32 = parts1.next().unwrap().parse().unwrap();
        let C: i32 = parts1.next().unwrap().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut parts2 = line2.trim().split_whitespace();
            let r: i32 = parts2.next().unwrap().parse().unwrap();
            let c: i32 = parts2.next().unwrap().parse().unwrap();
            let mut visited = vec![vec![false; C as usize]; R as usize];
            visited[r as usize][c as usize] = true;
            println!("{}", if tour(r, c, 1, R, C, &mut visited) { "true" } else { "false" });
        }
    }
}`
        }
    },

    // ==================== HARD #5: Rat in Maze Paths Count ====================
    {
        title: "Rat in Maze Paths Count",
        description: "A rat is placed at (0, 0) in an n x n square grid. The rat wants to reach the destination at (n-1, n-1). Some cells are blocked (represented by 0) and some are open (represented by 1). The rat can move in 4 directions: Up, Down, Left, and Right. Find the total number of unique paths the rat can take to reach the destination without visiting any cell more than once.\n\n**Input Format:**\n- First line: integer n\n- Next n lines: n space-separated integers representing the grid\n\n**Output Format:**\n- A single integer representing the total number of unique paths from start to destination",
        difficulty: "HARD",
        tags: ["backtracking", "recursion"],
        constraints: "1 <= n <= 6\nGrid cells are 0 or 1",
        hints: "Use recursive DFS starting from (0,0). Mark cells as visited before exploring neighbors in 4 directions, and unmark them when backtracking. If you reach (n-1, n-1), return 1. Sum up all paths from your neighbors.",
        editorial: "**Approach: Backtracking DFS**\n\nWe start DFS at (0,0) and maintain a `visited` matrix. At each step:\n- If current position is (n-1, n-1), we have found a path, return 1.\n- Mark the cell (r, c) as visited.\n- Loop through the 4 directions (up, down, left, right).\n- If neighbor is within boundaries, is open (1), and is not visited, recursively call DFS.\n- Sum up the results from all valid recursive calls.\n- Reset the visited status of (r, c) (backtrack) and return the sum.\n\nTime complexity is O(4^(n^2)), but actual states visited are much lower. Space complexity is O(n^2) due to visited grid and recursion stack.",
        examples: [
            {
                title: "Example 1",
                input: "4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1",
                output: "2",
                explanation: "The two valid paths are:\n1) (0,0)->(1,0)->(1,1)->(2,1)->(3,1)->(3,2)->(3,3)\n2) (0,0)->(1,0)->(2,0)->(2,1)->(3,1)->(3,2)->(3,3)"
            },
            {
                title: "Example 2",
                input: "2\n1 1\n1 1",
                output: "2",
                explanation: "The two valid paths are:\n1) (0,0)->(0,1)->(1,1)\n2) (0,0)->(1,0)->(1,1)"
            }
        ],
        testcases: [
            { input: "4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1", output: "2" },
            { input: "2\n1 1\n1 1", output: "2" },
            { input: "3\n1 1 1\n1 0 1\n1 1 1", output: "2" },
            { input: "4\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1", output: "184" },
            { input: "5\n1 1 1 1 1\n1 0 0 0 1\n1 1 1 1 1\n1 0 0 0 1\n1 1 1 1 1", output: "4" },
            { input: "3\n1 0 1\n1 0 1\n1 1 1", output: "1" },
            { input: "3\n0 1 1\n1 1 1\n1 1 1", output: "0" },
            { input: "3\n1 1 1\n1 1 1\n1 1 0", output: "0" },
            { input: "5\n1 1 1 1 1\n0 0 0 0 1\n1 1 1 1 1\n1 0 0 0 0\n1 1 1 1 1", output: "1" },
            { input: "3\n1 1 0\n1 1 0\n0 1 1", output: "2" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

// Count unique paths in a maze recursively
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, board and solve
    
    return 0;
}`,
            python: `def main():
    # Read n, board and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n, board and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n, board and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int n;
int grid[10][10];
bool visited[10][10];
int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};
int dfs(int r, int c) {
    if (r == n - 1 && c == n - 1) return 1;
    int count = 0;
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1 && !visited[nr][nc]) {
            visited[nr][nc] = true;
            count += dfs(nr, nc);
            visited[nr][nc] = false;
        }
    }
    return count;
}
int main() {
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> grid[i][j];
            }
        }
        if (grid[0][0] == 0 || grid[n-1][n-1] == 0) {
            cout << 0 << "\n";
            return 0;
        }
        memset(visited, 0, sizeof(visited));
        visited[0][0] = true;
        cout << dfs(0, 0) << "\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    grid = []
    idx = 1
    for _ in range(n):
        row = [int(x) for x in input_data[idx:idx+n]]
        grid.append(row)
        idx += n
    if grid[0][0] == 0 or grid[n-1][n-1] == 0:
        print(0)
        return
    visited = [[False]*n for _ in range(n)]
    visited[0][0] = True
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]
    def dfs(r, c):
        if r == n - 1 and c == n - 1:
            return 1
        count = 0
        for i in range(4):
            nr = r + dr[i]
            nc = c + dc[i]
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1 and not visited[nr][nc]:
                visited[nr][nc] = True
                count += dfs(nr, nc)
                visited[nr][nc] = False
        return count
    print(dfs(0, 0))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int n;
    static int[][] grid = new int[10][10];
    static boolean[][] visited = new boolean[10][10];
    static int[] dr = {-1, 1, 0, 0};
    static int[] dc = {0, 0, -1, 1};
    public static int dfs(int r, int c) {
        if (r == n - 1 && c == n - 1) return 1;
        int count = 0;
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1 && !visited[nr][nc]) {
                visited[nr][nc] = true;
                count += dfs(nr, nc);
                visited[nr][nc] = false;
            }
        }
        return count;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        n = Integer.parseInt(line.trim());
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) {
                grid[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        if (grid[0][0] == 0 || grid[n-1][n-1] == 0) {
            System.out.println(0);
            return;
        }
        visited[0][0] = true;
        System.out.println(dfs(0, 0));
    }
}`,
            rust: `use std::io::{self, BufRead};
fn dfs(r: i32, c: i32, n: i32, grid: &Vec<Vec<i32>>, visited: &mut Vec<Vec<bool>>) -> i32 {
    if r == n - 1 && c == n - 1 { return 1; }
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];
    let mut count = 0;
    for i in 0..4 {
        let nr = r + dr[i];
        let nc = c + dc[i];
        if nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr as usize][nc as usize] == 1 && !visited[nr as usize][nc as usize] {
            visited[nr as usize][nc as usize] = true;
            count += dfs(nr, nc, n, grid, visited);
            visited[nr as usize][nc as usize] = false;
        }
    }
    count
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: i32 = line1.trim().parse().unwrap();
        let mut grid = vec![vec![0; n as usize]; n as usize];
        for i in 0..n {
            if let Some(Ok(line)) = lines.next() {
                let mut parts = line.trim().split_whitespace();
                for j in 0..n {
                    grid[i as usize][j as usize] = parts.next().unwrap().parse().unwrap();
                }
            }
        }
        if grid[0][0] == 0 || grid[(n-1) as usize][(n-1) as usize] == 0 {
            println!("0");
            return;
        }
        let mut visited = vec![vec![false; n as usize]; n as usize];
        visited[0][0] = true;
        println!("{}", dfs(0, 0, n, &grid, &mut visited));
    }
}`
        }
    }
]
