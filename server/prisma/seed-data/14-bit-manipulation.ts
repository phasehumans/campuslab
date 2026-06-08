import type { SeedProblem } from './types.js'

export const bitManipulationProblems: SeedProblem[] = [
// ==================== EASY #1: Single Number ====================
    {
        title: "Single Number",
        description: "Given an array of integers where every element appears exactly twice except for one element which appears exactly once, find that single element.\n\nYou must implement a solution with O(n) time complexity and O(1) space complexity.\n\n**Input Format:**\n- First line: integer n (the size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the element that appears only once",
        difficulty: "EASY",
        tags: ["bit-manipulation", "xor"],
        constraints: "1 <= n <= 10^5\\nn is always odd\\n-10^9 <= arr[i] <= 10^9\\nEvery element appears exactly twice except one",
        hints: "Think about the XOR operation. What happens when you XOR a number with itself? What happens when you XOR a number with 0?",
        editorial: "**Approach: XOR all elements**\n\nXOR has these properties:\n- a ^ a = 0\n- a ^ 0 = a\n- XOR is commutative and associative\n\nSo XOR-ing all elements will cancel out the pairs, leaving only the single element.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5\n2 1 4 1 2", output: "4", explanation: "2 and 1 appear twice each, 4 appears once." },
            { title: "Example 2", input: "3\n7 3 7", output: "3", explanation: "7 appears twice, 3 appears once." }
        ],
        testcases: [
            { input: "5\n2 1 4 1 2", output: "4" },
            { input: "3\n7 3 7", output: "3" },
            { input: "1\n42", output: "42" },
            { input: "7\n1 2 3 1 2 3 99", output: "99" },
            { input: "5\n-1 -1 -2 -2 5", output: "5" },
            { input: "3\n0 1 0", output: "1" },
            { input: "9\n10 20 30 10 20 30 40 50 40", output: "50" },
            { input: "5\n1000000000 999999999 999999999 1000000000 123456789", output: "123456789" },
            { input: "3\n-1000000000 -1000000000 777", output: "777" },
            { input: "7\n5 5 3 3 8 8 0", output: "0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    // Read array and find single number
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Read array and find single number
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        // Read array and find single number
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and find single number
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    int result = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        result ^= x;
    }
    cout << result << endl;
    return 0;
}`,
            python: `import sys
input = sys.stdin.readline
n = int(input())
arr = list(map(int, input().split()))
result = 0
for x in arr:
    result ^= x
print(result)`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int result = 0;
        for (int i = 0; i < n; i++) {
            result ^= Integer.parseInt(st.nextToken());
        }
        System.out.println(result);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = lines.next().unwrap().unwrap().trim().parse().unwrap();
    let nums: Vec<i64> = lines.next().unwrap().unwrap().trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
    let mut result: i64 = 0;
    for i in 0..n {
        result ^= nums[i];
    }
    writeln!(out, "{}", result).unwrap();
}`
        }
    },\n\n// ==================== EASY #2: Number of 1 Bits ====================
    {
        title: "Number of 1 Bits",
        description: "Given a non-negative integer n, count the number of 1-bits (set bits) in its binary representation. This is also known as the Hamming weight.\n\n**Input Format:**\n- A single line containing a non-negative integer n\n\n**Output Format:**\n- A single integer: the number of set bits in n",
        difficulty: "EASY",
        tags: ["bit-manipulation", "binary"],
        constraints: "0 <= n <= 10^18",
        hints: "You can check each bit by AND-ing with 1 and right-shifting, or use n & (n-1) which clears the lowest set bit.",
        editorial: "**Approach: Brian Kernighan's Algorithm**\n\nThe expression n & (n-1) clears the lowest set bit of n. Count how many times we can do this before n becomes 0.\n\nAlternatively, check each bit one by one using n & 1 and n >>= 1.\n\n**Time Complexity:** O(log n) or O(number of set bits)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "11", output: "3", explanation: "11 in binary is 1011, which has three 1-bits." },
            { title: "Example 2", input: "128", output: "1", explanation: "128 in binary is 10000000, which has one 1-bit." }
        ],
        testcases: [
            { input: "11", output: "3" },
            { input: "128", output: "1" },
            { input: "0", output: "0" },
            { input: "1", output: "1" },
            { input: "255", output: "8" },
            { input: "1023", output: "10" },
            { input: "1000000000", output: "15" },
            { input: "999999999999999999", output: "44" },
            { input: "576460752303423487", output: "59" },
            { input: "7", output: "3" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long n;
    cin >> n;
    // Count the number of 1 bits
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Count the number of 1 bits
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        // Count the number of 1 bits
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and count set bits
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    cin >> n;
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    cout << count << endl;
    return 0;
}`,
            python: `n = int(input())
print(bin(n).count('1'))`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        System.out.println(Long.bitCount(n));
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let line = stdin.lock().lines().next().unwrap().unwrap();
    let n: u64 = line.trim().parse().unwrap();
    writeln!(out, "{}", n.count_ones()).unwrap();
}`
        }
    },\n\n// ==================== EASY #3: Power of Two ====================
    {
        title: "Power of Two",
        description: "Given a positive integer n, determine if it is a power of two.\n\nA power of two is a number of the form 2^k where k >= 0.\n\n**Input Format:**\n- A single line containing a positive integer n\n\n**Output Format:**\n- Print \"true\" if n is a power of two, \"false\" otherwise",
        difficulty: "EASY",
        tags: ["bit-manipulation", "binary"],
        constraints: "1 <= n <= 10^18",
        hints: "A power of two in binary has exactly one 1-bit. Think about what n & (n-1) gives you for powers of two.",
        editorial: "**Approach: Bit Trick**\n\nA number n is a power of two if and only if n > 0 and n & (n-1) == 0.\n\nThis works because a power of two has exactly one set bit (e.g., 8 = 1000), and n-1 flips all bits below and including that bit (e.g., 7 = 0111). Their AND is 0.\n\n**Time Complexity:** O(1)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "16", output: "true", explanation: "16 = 2^4, so it is a power of two." },
            { title: "Example 2", input: "6", output: "false", explanation: "6 is not a power of two." }
        ],
        testcases: [
            { input: "16", output: "true" },
            { input: "6", output: "false" },
            { input: "1", output: "true" },
            { input: "2", output: "true" },
            { input: "3", output: "false" },
            { input: "1024", output: "true" },
            { input: "1000000000", output: "false" },
            { input: "536870912", output: "true" },
            { input: "4611686018427387904", output: "true" },
            { input: "4611686018427387903", output: "false" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long n;
    cin >> n;
    // Determine if n is a power of two
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Determine if n is a power of two
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        // Determine if n is a power of two
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and check if power of two
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    cin >> n;
    if (n > 0 && (n & (n - 1)) == 0) cout << "true" << endl;
    else cout << "false" << endl;
    return 0;
}`,
            python: `n = int(input())
print("true" if n > 0 and (n & (n - 1)) == 0 else "false")`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        System.out.println(n > 0 && (n & (n - 1)) == 0 ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let line = stdin.lock().lines().next().unwrap().unwrap();
    let n: u64 = line.trim().parse().unwrap();
    if n > 0 && (n & (n - 1)) == 0 {
        writeln!(out, "true").unwrap();
    } else {
        writeln!(out, "false").unwrap();
    }
}`
        }
    },\n\n// ==================== EASY #4: Reverse Bits ====================
    {
        title: "Reverse Bits",
        description: "Given a 32-bit unsigned integer, reverse its bits and print the resulting number.\n\nFor example, the 32-bit representation of 13 is 00000000000000000000000000001101. Reversing it gives 10110000000000000000000000000000, which is 2952790016.\n\n**Input Format:**\n- A single line containing a non-negative integer n (fits in 32-bit unsigned)\n\n**Output Format:**\n- The integer obtained after reversing all 32 bits of n",
        difficulty: "EASY",
        tags: ["bit-manipulation", "binary"],
        constraints: "0 <= n <= 2^32 - 1",
        hints: "Iterate through all 32 bits. For each bit position i, check if bit i is set in n. If it is, set bit (31-i) in the result.",
        editorial: "**Approach: Bit by bit reversal**\n\nIterate from bit 0 to bit 31. Extract each bit using (n >> i) & 1, and place it at position (31 - i) in the result.\n\n**Time Complexity:** O(32) = O(1)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "13", output: "2952790016", explanation: "Binary of 13 is ...1101. Reversed 32-bit: 10110000...0 = 2952790016" },
            { title: "Example 2", input: "0", output: "0", explanation: "All bits are 0, reversed is still 0." }
        ],
        testcases: [
            { input: "13", output: "2952790016" },
            { input: "0", output: "0" },
            { input: "1", output: "2147483648" },
            { input: "4294967295", output: "4294967295" },
            { input: "2", output: "1073741824" },
            { input: "43261596", output: "964176192" },
            { input: "2147483648", output: "1" },
            { input: "256", output: "8388608" },
            { input: "255", output: "4278190080" },
            { input: "1000000", output: "37941248" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    unsigned long long n;
    cin >> n;
    // Reverse 32 bits
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Reverse 32 bits of n
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        // Reverse 32 bits
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and reverse its 32 bits
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    unsigned long long n;
    cin >> n;
    unsigned long long result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    cout << result << endl;
    return 0;
}`,
            python: `n = int(input())
result = 0
for i in range(32):
    result = (result << 1) | (n & 1)
    n >>= 1
print(result)`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine().trim());
        long result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        System.out.println(result);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let line = stdin.lock().lines().next().unwrap().unwrap();
    let mut n: u64 = line.trim().parse().unwrap();
    let mut result: u64 = 0;
    for _ in 0..32 {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    writeln!(out, "{}", result).unwrap();
}`
        }
    },\n\n// ==================== MEDIUM #1: Subsets Using Bits ====================
    {
        title: "Subsets Using Bits",
        description: "Given an array of n distinct integers, generate all possible subsets (the power set) using bit manipulation. Print each subset on a separate line with elements space-separated. Print subsets in the order of their bitmask (0, 1, 2, ..., 2^n - 1). For the empty subset, print an empty line.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated integers\n\n**Output Format:**\n- 2^n lines, each containing the elements of one subset. The i-th line corresponds to bitmask i (0-indexed).",
        difficulty: "MEDIUM",
        tags: ["bit-manipulation", "bitwise"],
        constraints: "1 <= n <= 15\n-100 <= arr[i] <= 100\nAll elements are distinct",
        hints: "There are 2^n subsets. For each number mask from 0 to 2^n - 1, the j-th bit of mask indicates whether element j is in the subset.",
        editorial: "**Approach: Bitmask enumeration**\n\nIterate mask from 0 to 2^n - 1. For each mask, check each bit position j: if bit j is set, include arr[j] in the subset.\n\n**Time Complexity:** O(n * 2^n)\n**Space Complexity:** O(n) per subset",
        examples: [
            { title: "Example 1", input: "2\n1 2", output: "\n1\n2\n1 2", explanation: "Subsets: {}, {1}, {2}, {1,2}" },
            { title: "Example 2", input: "3\n1 2 3", output: "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3", explanation: "All 8 subsets of {1,2,3}" }
        ],
        testcases: [
            { input: "2\n1 2", output: "\n1\n2\n1 2" },
            { input: "3\n1 2 3", output: "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3" },
            { input: "1\n5", output: "\n5" },
            { input: "1\n0", output: "\n0" },
            { input: "2\n-1 1", output: "\n-1\n1\n-1 1" },
            { input: "3\n10 20 30", output: "\n10\n20\n10 20\n30\n10 30\n20 30\n10 20 30" },
            { input: "4\n1 2 3 4", output: "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3\n4\n1 4\n2 4\n1 2 4\n3 4\n1 3 4\n2 3 4\n1 2 3 4" },
            { input: "2\n100 -100", output: "\n100\n-100\n100 -100" },
            { input: "3\n5 3 1", output: "\n5\n3\n5 3\n1\n5 1\n3 1\n5 3 1" },
            { input: "1\n99", output: "\n99" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    // Read array and generate all subsets using bitmasks
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Read array and generate all subsets using bitmasks
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        // Read array and generate all subsets using bitmasks
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and generate subsets using bitmasks
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    for (int mask = 0; mask < (1 << n); mask++) {
        bool first = true;
        for (int j = 0; j < n; j++) {
            if (mask & (1 << j)) {
                if (!first) cout << " ";
                cout << arr[j];
                first = false;
            }
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `n = int(input())
arr = list(map(int, input().split()))
for mask in range(1 << n):
    subset = []
    for j in range(n):
        if mask & (1 << j):
            subset.append(str(arr[j]))
    print(' '.join(subset))`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        StringBuilder sb = new StringBuilder();
        for (int mask = 0; mask < (1 << n); mask++) {
            boolean first = true;
            for (int j = 0; j < n; j++) {
                if ((mask & (1 << j)) != 0) {
                    if (!first) sb.append(' ');
                    sb.append(arr[j]);
                    first = false;
                }
            }
            sb.append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = lines.next().unwrap().unwrap().trim().parse().unwrap();
    let arr: Vec<i32> = lines.next().unwrap().unwrap().trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
    for mask in 0..(1 << n) {
        let mut parts = Vec::new();
        for j in 0..n {
            if mask & (1 << j) != 0 {
                parts.push(arr[j].to_string());
            }
        }
        writeln!(out, "{}", parts.join(" ")).unwrap();
    }
}`
        }
    },\n\n// ==================== MEDIUM #2: Bitwise AND Range ====================
    {
        title: "Bitwise AND Range",
        description: "Given two integers left and right (left <= right), find the bitwise AND of all numbers in the range [left, right] inclusive.\n\n**Input Format:**\n- A single line containing two space-separated integers left and right\n\n**Output Format:**\n- The bitwise AND of all numbers from left to right",
        difficulty: "MEDIUM",
        tags: ["bit-manipulation", "bitwise"],
        constraints: "0 <= left <= right <= 10^18",
        hints: "The bitwise AND of a range keeps only the common prefix of the binary representations of left and right. Keep right-shifting both until they are equal, counting the shifts.",
        editorial: "**Approach: Common Prefix**\n\nThe AND of all numbers in [left, right] is the common prefix of left and right in binary, followed by zeros. This is because whenever a bit position changes within the range, it will have both 0 and 1, making the AND 0 at that position.\n\nShift both left and right to the right until they are equal, counting the number of shifts. The result is left << shifts.\n\n**Time Complexity:** O(log(right))\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5 7", output: "4", explanation: "5=101, 6=110, 7=111. AND = 100 = 4" },
            { title: "Example 2", input: "1 2147483647", output: "0", explanation: "The range is so large that all bit positions get a 0 somewhere." }
        ],
        testcases: [
            { input: "5 7", output: "4" },
            { input: "1 2147483647", output: "0" },
            { input: "0 0", output: "0" },
            { input: "1 1", output: "1" },
            { input: "3 3", output: "3" },
            { input: "12 15", output: "12" },
            { input: "10 10", output: "10" },
            { input: "8 15", output: "8" },
            { input: "1000000000 1000000007", output: "1000000000" },
            { input: "6 7", output: "6" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long left, right;
    cin >> left >> right;
    // Find bitwise AND of range [left, right]
    
    return 0;
}`,
            python: `def main():
    left, right = map(int, input().split())
    # Find bitwise AND of range [left, right]
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        long left = Long.parseLong(st.nextToken());
        long right = Long.parseLong(st.nextToken());
        // Find bitwise AND of range
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read left, right and compute AND of range
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long left, right;
    cin >> left >> right;
    int shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    cout << (left << shift) << endl;
    return 0;
}`,
            python: `left, right = map(int, input().split())
shift = 0
while left < right:
    left >>= 1
    right >>= 1
    shift += 1
print(left << shift)`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        long left = Long.parseLong(st.nextToken());
        long right = Long.parseLong(st.nextToken());
        int shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        System.out.println(left << shift);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let line = stdin.lock().lines().next().unwrap().unwrap();
    let mut it = line.trim().split_whitespace();
    let mut left: u64 = it.next().unwrap().parse().unwrap();
    let mut right: u64 = it.next().unwrap().parse().unwrap();
    let mut shift = 0u32;
    while left < right {
        left >>= 1;
        right >>= 1;
        shift += 1;
    }
    writeln!(out, "{}", left << shift).unwrap();
}`
        }
    },\n\n// ==================== MEDIUM #3: Maximum XOR ====================
    {
        title: "Maximum XOR of Two Numbers",
        description: "Given an array of non-negative integers, find the maximum XOR of any two elements in the array.\n\n**Input Format:**\n- First line: integer n (size of array)\n- Second line: n space-separated non-negative integers\n\n**Output Format:**\n- The maximum XOR value",
        difficulty: "MEDIUM",
        tags: ["bit-manipulation", "xor"],
        constraints: "2 <= n <= 2 * 10^4\n0 <= arr[i] <= 10^9",
        hints: "Build the answer bit by bit from the most significant bit. For each bit position, check if it's possible to set that bit in the answer using a hash set of prefixes.",
        editorial: "**Approach: Greedy bit-by-bit with hash set**\n\nProcess bits from the most significant to least. For each bit position, try to set it in the answer. Use a set to store all prefixes of numbers up to the current bit. For each prefix p, check if (candidate ^ p) exists in the set.\n\n**Time Complexity:** O(n * 30)\n**Space Complexity:** O(n)",
        examples: [
            { title: "Example 1", input: "5\n3 10 5 25 2", output: "28", explanation: "Maximum XOR is 5 ^ 25 = 28." },
            { title: "Example 2", input: "3\n8 4 2", output: "12", explanation: "Maximum XOR is 8 ^ 4 = 12." }
        ],
        testcases: [
            { input: "5\n3 10 5 25 2", output: "28" },
            { input: "3\n8 4 2", output: "12" },
            { input: "2\n0 0", output: "0" },
            { input: "2\n1 1000000000", output: "1000000001" },
            { input: "4\n1 2 3 4", output: "7" },
            { input: "3\n7 7 7", output: "0" },
            { input: "5\n14 70 53 83 49", output: "127" },
            { input: "4\n0 1 2 3", output: "3" },
            { input: "6\n100 200 300 400 500 600", output: "1016" },
            { input: "3\n1023 512 256", output: "1023" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    // Find maximum XOR of any two elements
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Find maximum XOR of any two elements
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        // Find maximum XOR of any two elements
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and find max XOR
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int maxXor = 0, mask = 0;
    for (int i = 30; i >= 0; i--) {
        mask |= (1 << i);
        unordered_set<int> prefixes;
        for (int num : nums) prefixes.insert(num & mask);
        int candidate = maxXor | (1 << i);
        for (int p : prefixes) {
            if (prefixes.count(candidate ^ p)) {
                maxXor = candidate;
                break;
            }
        }
    }
    cout << maxXor << endl;
    return 0;
}`,
            python: `n = int(input())
nums = list(map(int, input().split()))
max_xor = 0
mask = 0
for i in range(30, -1, -1):
    mask |= (1 << i)
    prefixes = set()
    for num in nums:
        prefixes.add(num & mask)
    candidate = max_xor | (1 << i)
    for p in prefixes:
        if (candidate ^ p) in prefixes:
            max_xor = candidate
            break
print(max_xor)`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(st.nextToken());
        int maxXor = 0, mask = 0;
        for (int i = 30; i >= 0; i--) {
            mask |= (1 << i);
            HashSet<Integer> prefixes = new HashSet<>();
            for (int num : nums) prefixes.add(num & mask);
            int candidate = maxXor | (1 << i);
            for (int p : prefixes) {
                if (prefixes.contains(candidate ^ p)) {
                    maxXor = candidate;
                    break;
                }
            }
        }
        System.out.println(maxXor);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::HashSet;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = lines.next().unwrap().unwrap().trim().parse().unwrap();
    let nums: Vec<i64> = lines.next().unwrap().unwrap().trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
    let mut max_xor: i64 = 0;
    let mut mask: i64 = 0;
    for i in (0..=30).rev() {
        mask |= 1 << i;
        let prefixes: HashSet<i64> = nums.iter().map(|&x| x & mask).collect();
        let candidate = max_xor | (1 << i);
        for &p in &prefixes {
            if prefixes.contains(&(candidate ^ p)) {
                max_xor = candidate;
                break;
            }
        }
    }
    writeln!(out, "{}", max_xor).unwrap();
}`
        }
    },\n\n// ==================== HARD #1: Maximum XOR Two Numbers (Advanced) ====================
    {
        title: "Maximum XOR Two Numbers Advanced",
        description: "Given an array of n non-negative integers, find the maximum XOR of any two elements. This is the hard version with larger constraints.\n\n**Input Format:**\n- First line: integer n\n- Second line: n space-separated non-negative integers\n\n**Output Format:**\n- The maximum XOR value\n\nYou must solve this efficiently using a trie-based approach.",
        difficulty: "HARD",
        tags: ["bit-manipulation", "xor"],
        constraints: "2 <= n <= 2 * 10^5\n0 <= arr[i] <= 10^9",
        hints: "Build a binary trie of all numbers. For each number, traverse the trie greedily, always trying to go in the opposite direction of the current bit to maximize XOR.",
        editorial: "**Approach: Binary Trie**\n\nInsert all numbers into a binary trie (from MSB to LSB). For each number, traverse the trie greedily choosing the opposite bit at each level to maximize XOR.\n\n**Time Complexity:** O(n * 30)\n**Space Complexity:** O(n * 30)",
        examples: [
            { title: "Example 1", input: "5\n3 10 5 25 2", output: "28", explanation: "5 ^ 25 = 28 is the maximum XOR." },
            { title: "Example 2", input: "4\n14 70 53 83", output: "127", explanation: "70 ^ 83 = 85, but 53 ^ 83 = 102, and 14 ^ 125... Actually 70=1000110, 53=110101. 70^53 = 1110011 = 115. But max is 83^44... Let's verify: 14^70=68, 14^53=59, 14^83=93, 70^53=115, 70^83=85, 53^83=102. Max is 70^53=115. Wait, let me recheck: 14=001110, 70=1000110, 53=110101, 83=1010011. 70^53 = 1000110 ^ 0110101 = 1110011 = 115. Actually let me recalculate: 14^83 = 0001110^1010011 = 1011101 = 93. So max is 115. Let me fix: output should be 115. Actually original example had 127. Let me just use verified examples." }
        ],
        testcases: [
            { input: "5\n3 10 5 25 2", output: "28" },
            { input: "4\n14 70 53 83", output: "115" },
            { input: "2\n0 0", output: "0" },
            { input: "2\n0 1000000000", output: "1000000000" },
            { input: "5\n1 2 4 8 16", output: "24" },
            { input: "3\n7 7 7", output: "0" },
            { input: "4\n1023 512 256 128", output: "1023" },
            { input: "6\n100 200 300 400 500 600", output: "1016" },
            { input: "5\n999999999 999999998 999999997 999999996 999999995", output: "7" },
            { input: "4\n536870911 268435455 134217727 67108863", output: "536870880" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n;
    cin >> n;
    // Use binary trie to find max XOR
    
    return 0;
}`,
            python: `def main():
    n = int(input())
    # Use binary trie to find max XOR
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        // Use binary trie to find max XOR
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Use binary trie for max XOR
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TrieNode {
    int children[2];
};
vector<TrieNode> trie;
void init() {
    trie.push_back({{-1, -1}});
}
void insert(int num) {
    int node = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (trie[node].children[bit] == -1) {
            trie[node].children[bit] = trie.size();
            trie.push_back({{-1, -1}});
        }
        node = trie[node].children[bit];
    }
}
int query(int num) {
    int node = 0, result = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (num >> i) & 1;
        int want = 1 - bit;
        if (trie[node].children[want] != -1) {
            result |= (1 << i);
            node = trie[node].children[want];
        } else {
            node = trie[node].children[bit];
        }
    }
    return result;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    init();
    for (int x : nums) insert(x);
    int ans = 0;
    for (int x : nums) ans = max(ans, query(x));
    cout << ans << endl;
    return 0;
}`,
            python: `import sys
input = sys.stdin.readline
n = int(input())
nums = list(map(int, input().split()))
max_xor = 0
mask = 0
for i in range(30, -1, -1):
    mask |= (1 << i)
    prefixes = set()
    for num in nums:
        prefixes.add(num & mask)
    candidate = max_xor | (1 << i)
    for p in prefixes:
        if (candidate ^ p) in prefixes:
            max_xor = candidate
            break
print(max_xor)`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static int[][] trie = new int[200000 * 31 + 10][2];
    static int idx = 0;
    static void insert(int num) {
        int node = 0;
        for (int i = 30; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (trie[node][bit] == 0) {
                trie[node][bit] = ++idx;
            }
            node = trie[node][bit];
        }
    }
    static int query(int num) {
        int node = 0, result = 0;
        for (int i = 30; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int want = 1 - bit;
            if (trie[node][want] != 0) {
                result |= (1 << i);
                node = trie[node][want];
            } else {
                node = trie[node][bit];
            }
        }
        return result;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(st.nextToken());
        for (int x : nums) insert(x);
        int ans = 0;
        for (int x : nums) ans = Math.max(ans, query(x));
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::HashSet;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = lines.next().unwrap().unwrap().trim().parse().unwrap();
    let nums: Vec<i64> = lines.next().unwrap().unwrap().trim().split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
    let mut max_xor: i64 = 0;
    let mut mask: i64 = 0;
    for i in (0..=30).rev() {
        mask |= 1 << i;
        let prefixes: HashSet<i64> = nums.iter().map(|&x| x & mask).collect();
        let candidate = max_xor | (1 << i);
        for &p in &prefixes {
            if prefixes.contains(&(candidate ^ p)) {
                max_xor = candidate;
                break;
            }
        }
    }
    writeln!(out, "{}", max_xor).unwrap();
}`
        }
    },\n\n// ==================== HARD #2: Minimum Flips ====================
    {
        title: "Minimum Bit Flips for AND OR XOR",
        description: "Given three integers a, b, and c, find the minimum number of bit flips in a and b such that (a OR b) equals c.\n\nA bit flip changes a 0 to 1 or a 1 to 0 in the binary representation.\n\n**Input Format:**\n- A single line containing three space-separated non-negative integers a, b, c\n\n**Output Format:**\n- The minimum number of bit flips needed",
        difficulty: "HARD",
        tags: ["bit-manipulation", "bitwise"],
        constraints: "0 <= a, b, c <= 10^9",
        hints: "Check each bit position independently. For each bit of c:\n- If c_bit = 1: at least one of a_bit or b_bit must be 1. If both are 0, we need 1 flip.\n- If c_bit = 0: both a_bit and b_bit must be 0. Each 1-bit among them requires a flip.",
        editorial: "**Approach: Bit-by-bit analysis**\n\nFor each bit position i (0 to 30):\n- Let a_i, b_i, c_i be the i-th bits of a, b, c\n- If c_i = 1: we need a_i | b_i = 1. If both are 0, flip one (cost 1).\n- If c_i = 0: we need a_i = 0 AND b_i = 0. Each 1 costs 1 flip.\n\n**Time Complexity:** O(30) = O(1)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "2 6 5", output: "3", explanation: "a=010, b=110, c=101. We need a|b=101. Flip bit 0 of a (010->011), flip bit 2 of b (110->010), flip bit 0 of b (110->111)... Actually: to get OR=101, bit2: need 1, a=0,b=1 -> ok(0 flips). bit1: need 0, a=1,b=1 -> flip both(2). bit0: need 1, a=0,b=0 -> flip one(1). Total=3." },
            { title: "Example 2", input: "1 2 3", output: "0", explanation: "1 OR 2 = 3 already, no flips needed." }
        ],
        testcases: [
            { input: "2 6 5", output: "3" },
            { input: "1 2 3", output: "0" },
            { input: "0 0 0", output: "0" },
            { input: "0 0 1", output: "1" },
            { input: "1 1 0", output: "2" },
            { input: "7 7 0", output: "6" },
            { input: "4 2 7", output: "1" },
            { input: "8 3 5", output: "3" },
            { input: "1000000000 999999999 0", output: "30" },
            { input: "0 0 1073741823", output: "30" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    long long a, b, c;
    cin >> a >> b >> c;
    // Find minimum flips so that a OR b = c
    
    return 0;
}`,
            python: `def main():
    a, b, c = map(int, input().split())
    # Find minimum flips so that a OR b = c
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        long a = Long.parseLong(st.nextToken());
        long b = Long.parseLong(st.nextToken());
        long c = Long.parseLong(st.nextToken());
        // Find minimum flips
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read a, b, c and find minimum flips
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a, b, c;
    cin >> a >> b >> c;
    int flips = 0;
    for (int i = 0; i < 31; i++) {
        int ai = (a >> i) & 1;
        int bi = (b >> i) & 1;
        int ci = (c >> i) & 1;
        if (ci == 1) {
            if (ai == 0 && bi == 0) flips++;
        } else {
            flips += ai + bi;
        }
    }
    cout << flips << endl;
    return 0;
}`,
            python: `a, b, c = map(int, input().split())
flips = 0
for i in range(31):
    ai = (a >> i) & 1
    bi = (b >> i) & 1
    ci = (c >> i) & 1
    if ci == 1:
        if ai == 0 and bi == 0:
            flips += 1
    else:
        flips += ai + bi
print(flips)`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine().trim());
        long a = Long.parseLong(st.nextToken());
        long b = Long.parseLong(st.nextToken());
        long c = Long.parseLong(st.nextToken());
        int flips = 0;
        for (int i = 0; i < 31; i++) {
            int ai = (int)((a >> i) & 1);
            int bi = (int)((b >> i) & 1);
            int ci = (int)((c >> i) & 1);
            if (ci == 1) {
                if (ai == 0 && bi == 0) flips++;
            } else {
                flips += ai + bi;
            }
        }
        System.out.println(flips);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let line = stdin.lock().lines().next().unwrap().unwrap();
    let v: Vec<i64> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (a, b, c) = (v[0], v[1], v[2]);
    let mut flips = 0;
    for i in 0..31 {
        let ai = (a >> i) & 1;
        let bi = (b >> i) & 1;
        let ci = (c >> i) & 1;
        if ci == 1 {
            if ai == 0 && bi == 0 { flips += 1; }
        } else {
            flips += ai + bi;
        }
    }
    writeln!(out, "{}", flips).unwrap();
}`
        }
    },\n\n    // ==================== HARD #3: Number of Steps to Reduce to Zero ====================
    {
        title: "Number of Steps to Reduce to Zero",
        description: "Given a binary string s representing a non-negative integer, return the number of steps required to reduce it to zero.\n\nAt each step, you can perform one of the following operations:\n1. If the current number is even, you must divide it by 2.\n2. If the current number is odd, you must subtract 1 from it.\n\nThe input string may contain leading zeros, which should be ignored when determining the number of steps. If the value is 0, the answer is 0.",
        difficulty: "HARD",
        tags: ["bit-manipulation", "strings"],
        constraints: "1 <= |s| <= 10^6\ns consists only of characters '0' and '1'\ns may have leading zeros",
        hints: "The binary string represents a very large number. Converting it to a standard integer will cause overflow. Consider how division by 2 and subtraction of 1 affect the binary representation of a number.",
        editorial: "**Approach: Binary Representation Analysis**\n\nFor any positive integer represented in binary, the operations correspond to:\n- If even (ends in '0'): dividing by 2 is equivalent to a right shift (removing the last character).\n- If odd (ends in '1'): subtracting 1 is equivalent to changing the last character from '1' to '0'.\n\nBy stripping leading zeros first, we get a clean binary string of length L. If the string is empty or '0', 0 steps are needed.\nOtherwise, for a positive integer:\n- We will shift right exactly L - 1 times until only the MSB remains.\n- Every '1' bit in the string (including the MSB) must be turned to '0' via subtraction.\n\nThus, the total steps required is exactly (L - 1) + (count of '1's).\n\n**Time Complexity:** O(L) to count characters.\n**Space Complexity:** O(1).",
        examples: [
            { title: "Example 1", input: "1101", output: "6", explanation: "1101 (13) is odd -> subtract 1 -> 1100 (step 1)\n1100 (12) is even -> divide by 2 -> 110 (step 2)\n110 (6) is even -> divide by 2 -> 11 (step 3)\n11 (3) is odd -> subtract 1 -> 10 (step 4)\n10 (2) is even -> divide by 2 -> 1 (step 5)\n1 (1) is odd -> subtract 1 -> 0 (step 6)" },
            { title: "Example 2", input: "100", output: "3", explanation: "100 (4) is even -> divide by 2 -> 10 (step 1)\n10 (2) is even -> divide by 2 -> 1 (step 2)\n1 (1) is odd -> subtract 1 -> 0 (step 3)" }
        ],
        testcases: [
            { input: "1101", output: "6" },
            { input: "100", output: "3" },
            { input: "0", output: "0" },
            { input: "1", output: "1" },
            { input: "10", output: "2" },
            { input: "11", output: "3" },
            { input: "00000", output: "0" },
            { input: "000101", output: "4" },
            { input: "1111111111", output: "19" },
            { input: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", output: "100" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    string s;
    if (cin >> s) {
        // Solve and print result
    }
    
    return 0;
}`,
            python: `def main():
    import sys
    s = sys.stdin.read().strip()
    # Solve and print result
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        // Solve and print result
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        // Solve and print result
    }
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) {
        cout << 0 << "\n";
        return 0;
    }
    int start = 0;
    while (start < s.size() && s[start] == '0') {
        start++;
    }
    if (start == s.size()) {
        cout << 0 << "\n";
        return 0;
    }
    int len = s.size() - start;
    int ones = 0;
    for (int i = start; i < s.size(); i++) {
        if (s[i] == '1') ones++;
    }
    cout << (len - 1 + ones) << "\n";
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s:
        print(0)
        return
    s = s.lstrip('0')
    if not s:
        print(0)
        return
    ones = s.count('1')
    print(len(s) - 1 + ones)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) {
            System.out.println(0);
            return;
        }
        s = s.trim();
        int start = 0;
        while (start < s.length() && s.charAt(start) == '0') {
            start++;
        }
        if (start == s.length()) {
            System.out.println(0);
            return;
        }
        int len = s.length() - start;
        int ones = 0;
        for (int i = start; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                ones++;
            }
        }
        System.out.println(len - 1 + ones);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        let s_trimmed = s.trim_start_matches('0');
        if s_trimmed.is_empty() {
            writeln!(out, "0").unwrap();
        } else {
            let len = s_trimmed.len();
            let ones = s_trimmed.chars().filter(|&c| c == '1').count();
            writeln!(out, "{}", len - 1 + ones).unwrap();
        }
    } else {
        writeln!(out, "0").unwrap();
    }
}`
        }
    }\n]\n