import type { SeedProblem } from './types.js'

// Generic starter code snippets to save token space
const CPP_BASIC = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // Read input and solve
    return 0;
}`

const PYTHON_BASIC = `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`

const JAVA_BASIC = `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Read input and solve
    }
}`

const RUST_BASIC = `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read input and solve
}`

const CPP_QUERIES = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (cin >> q) {
        // Read q queries and solve
    }
    return 0;
}`

const PYTHON_QUERIES = `def main():
    # Read and process queries
    pass

if __name__ == "__main__":
    main()`

const JAVA_QUERIES = `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Read queries and solve
    }
}`

const RUST_QUERIES = `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read queries and solve
}`

export const stacksQueuesProblems: SeedProblem[] = [
    // ==================== EASY #1: Valid Parentheses ====================
    {
        title: 'Valid Parentheses',
        description:
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Input Format:**\n- A single line containing the string s.\n\n**Output Format:**\n- Print \"true\" if the string is valid, and \"false\" otherwise.",
        difficulty: 'EASY',
        tags: ['stack'],
        constraints: "1 <= s.length <= 10^5\ns consists of parentheses only '()[]{}'.",
        hints: 'Use a stack to keep track of the most recently opened parenthesis. When you encounter a closing parenthesis, check if it matches the opening parenthesis on top of the stack.',
        editorial:
            "**Approach: Stack**\n\n1. Initialize an empty stack.\n2. Iterate through each character in the string.\n3. If it is an opening bracket ('(', '{', '['), push it onto the stack.\n4. If it is a closing bracket, check if the stack is empty. If it is empty, or if the top of the stack doesn't match the closing bracket, return false.\n5. Otherwise, pop the opening bracket from the stack.\n6. After iterating through the entire string, return true if the stack is empty, and false otherwise.\n\n**Time Complexity:** O(N) where N is the length of the string.\n**Space Complexity:** O(N) in the worst case to store the stack.",
        examples: [
            {
                title: 'Example 1',
                input: '()[]{}',
                output: 'true',
                explanation: 'Every open bracket is closed by the correct matching bracket.',
            },
            {
                title: 'Example 2',
                input: '(]',
                output: 'false',
                explanation: "The closing bracket ']' does not match the opening bracket '('.",
            },
        ],
        testcases: [
            { input: '()[]{}', output: 'true' },
            { input: '(]', output: 'false' },
            { input: ']', output: 'false' },
            { input: '({[]})', output: 'true' },
            { input: '({[})', output: 'false' },
            { input: '(((((((())))))))', output: 'true' },
            { input: '(', output: 'false' },
            { input: '()', output: 'true' },
            { input: '{[()]}', output: 'true' },
            { input: '{[()]}(', output: 'false' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<char> st;
        bool ok = true;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) { ok = false; break; }
                if (c == ')' && st.top() != '(') { ok = false; break; }
                if (c == '}' && st.top() != '{') { ok = false; break; }
                if (c == ']' && st.top() != '[') { ok = false; break; }
                st.pop();
            }
        }
        if (ok && st.empty()) cout << "true\\n";
        else cout << "false\\n";
    } else cout << "true\\n";
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s:
        print("true")
        return
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    ok = True
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack[-1] != mapping[char]:
                ok = False
                break
            stack.pop()
        else:
            ok = False
            break
    if ok and not stack:
        print("true")
    else:
        print("false")
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) { System.out.println("true"); return; }
        s = s.trim();
        Stack<Character> st = new Stack<>();
        boolean ok = true;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.isEmpty()) { ok = false; break; }
                char top = st.peek();
                if (c == ')' && top != '(') { ok = false; break; }
                if (c == '}' && top != '{') { ok = false; break; }
                if (c == ']' && top != '[') { ok = false; break; }
                st.pop();
            }
        }
        System.out.println(ok && st.isEmpty() ? "true" : "false");
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
        let mut stack = Vec::new();
        let mut ok = true;
        for c in s.chars() {
            if c == '(' || c == '{' || c == '[' {
                stack.push(c);
            } else {
                if stack.is_empty() { ok = false; break; }
                let top = *stack.last().unwrap();
                if c == ')' && top != '(' { ok = false; break; }
                if c == '}' && top != '{' { ok = false; break; }
                if c == ']' && top != '[' { ok = false; break; }
                stack.pop();
            }
        }
        if ok && stack.is_empty() { writeln!(out, "true").unwrap(); }
        else { writeln!(out, "false").unwrap(); }
    } else { writeln!(out, "true").unwrap(); }
}`,
        },
    },

    // ==================== EASY #2: Min Stack Operations ====================
    {
        title: 'Min Stack Operations',
        description:
            'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the following operations:\n- push x: Push element x onto stack.\n- pop: Removes the element on top of the stack.\n- top: Get the top element.\n- getMin: Retrieve the minimum element in the stack.\n\n**Input Format:**\n- First line: an integer q (the number of operations)\n- Next q lines: each line contains an operation\n\n**Output Format:**\n- For each top and getMin operation, print the resulting integer on a new line.',
        difficulty: 'EASY',
        tags: ['stack'],
        constraints:
            '1 <= q <= 10^5\n-10^9 <= x <= 10^9\npop, top, and getMin will always be called on non-empty stacks.',
        hints: 'Use two stacks: one to store the elements and another to keep track of the minimum values at each state of the stack.',
        editorial:
            '**Approach: Two Stacks**\n\nWe maintain two stacks:\n1. A main stack `s` to store all pushed elements.\n2. A min stack `mins` where the top element is always the minimum of the elements currently in `s`.\n\nWhen we push `x`:\n- Push `x` to `s`.\n- If `mins` is empty or `x <= mins.top()`, push `x` to `mins`.\n\nWhen we pop:\n- Pop `x` from `s`.\n- If `x == mins.top()`, pop from `mins`.\n\nThis ensures that the top of `mins` is always the current minimum, and all operations run in O(1) time.\n\n**Time Complexity:** O(1) per operation\n**Space Complexity:** O(q) in the worst case',
        examples: [
            {
                title: 'Example 1',
                input: '6\npush -2\npush 0\npush -3\ngetMin\npop\ngetMin',
                output: '-3\n-2',
                explanation: 'Push -2, 0, -3. Min is -3. Pop -3. Min is now -2.',
            },
            {
                title: 'Example 2',
                input: '5\npush 5\npush 3\ntop\ngetMin\npop',
                output: '3\n3',
                explanation: 'Push 5, 3. Top is 3, min is 3. Pop 3.',
            },
        ],
        testcases: [
            { input: '6\npush -2\npush 0\npush -3\ngetMin\npop\ngetMin', output: '-3\n-2' },
            { input: '5\npush 5\npush 3\ntop\ngetMin\npop', output: '3\n3' },
            { input: '3\npush 10\ntop\ngetMin', output: '10\n10' },
            {
                input: '8\npush 2\npush 1\npush 3\ngetMin\npop\ngetMin\npop\ngetMin',
                output: '1\n2\n2',
            },
            {
                input: '10\npush 5\npush 4\npush 3\npush 2\npush 1\ngetMin\npop\ngetMin\npop\ngetMin',
                output: '1\n2\n3',
            },
            {
                input: '8\npush 2\npush 2\npush 2\ngetMin\npop\ngetMin\npop\ngetMin',
                output: '2\n2\n2',
            },
            { input: '6\npush -10\npush -20\ngetMin\ntop\npop\ngetMin', output: '-20\n-20\n-10' },
            {
                input: '4\npush 1000000000\npush -1000000000\ngetMin\ntop',
                output: '-1000000000\n-1000000000',
            },
            { input: '6\npush 1\npush 2\npop\npush 3\ntop\ngetMin', output: '3\n1' },
            { input: '3\npush 42\ntop\ngetMin', output: '42\n42' },
        ],
        codesnippets: {
            cpp: CPP_QUERIES,
            python: PYTHON_QUERIES,
            java: JAVA_QUERIES,
            rust: RUST_QUERIES,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (cin >> q) {
        stack<int> s, mins;
        while (q--) {
            string op; cin >> op;
            if (op == "push") {
                int x; cin >> x;
                s.push(x);
                if (mins.empty() || x <= mins.top()) mins.push(x);
            } else if (op == "pop") {
                int x = s.top(); s.pop();
                if (x == mins.top()) mins.pop();
            } else if (op == "top") {
                cout << s.top() << "\\n";
            } else if (op == "getMin") {
                cout << mins.top() << "\\n";
            }
        }
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    q = int(data[0])
    s = []
    mins = []
    idx = 1
    out = []
    for _ in range(q):
        if idx >= len(data): break
        op = data[idx]
        idx += 1
        if op == "push":
            x = int(data[idx])
            idx += 1
            s.append(x)
            if not mins or x <= mins[-1]: mins.append(x)
        elif op == "pop":
            if s:
                x = s.pop()
                if mins and x == mins[-1]: mins.pop()
        elif op == "top":
            if s: out.append(str(s[-1]))
        elif op == "getMin":
            if mins: out.append(str(mins[-1]))
    print('\\n'.join(out))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int q = Integer.parseInt(line.trim());
        Stack<Integer> s = new Stack<>();
        Stack<Integer> mins = new Stack<>();
        for (int i = 0; i < q; i++) {
            String opLine = br.readLine();
            if (opLine == null) break;
            StringTokenizer st = new StringTokenizer(opLine);
            if (!st.hasMoreTokens()) { i--; continue; }
            String op = st.nextToken();
            if (op.equals("push")) {
                int x = Integer.parseInt(st.nextToken());
                s.push(x);
                if (mins.isEmpty() || x <= mins.peek()) mins.push(x);
            } else if (op.equals("pop")) {
                int x = s.pop();
                if (x == mins.peek()) mins.pop();
            } else if (op.equals("top")) {
                System.out.println(s.peek());
            } else if (op.equals("getMin")) {
                System.out.println(mins.peek());
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let q: usize = line.trim().parse().unwrap();
        let mut s = Vec::new();
        let mut mins = Vec::new();
        for _ in 0..q {
            if let Some(Ok(line)) = lines.next() {
                let parts: Vec<&str> = line.trim().split_whitespace().collect();
                if parts.is_empty() { continue; }
                match parts[0] {
                    "push" => {
                        let x: i32 = parts[1].parse().unwrap();
                        s.push(x);
                        if mins.is_empty() || x <= *mins.last().unwrap() { mins.push(x); }
                    }
                    "pop" => {
                        if let Some(x) = s.pop() {
                            if Some(&x) == mins.last() { mins.pop(); }
                        }
                    }
                    "top" => {
                        if let Some(&x) = s.last() { writeln!(out, "{}", x).unwrap(); }
                    }
                    "getMin" => {
                        if let Some(&x) = mins.last() { writeln!(out, "{}", x).unwrap(); }
                    }
                    _ => {}
                }
            }
        }
    }
}`,
        },
    },

    // ==================== EASY #3: Implement Queue using Stacks ====================
    {
        title: 'Implement Queue using Stacks',
        description:
            'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support push, pop, peek, and empty operations.\n\nSupport the following operations:\n- push x: Pushes element x to the back of the queue.\n- pop: Removes the element from the front of the queue.\n- peek: Get the front element.\n- empty: Return true if the queue is empty, false otherwise.\n\n**Input Format:**\n- First line: integer q (the number of operations)\n- Next q lines: each line contains an operation\n\n**Output Format:**\n- For each peek and empty operation, print the result on a new line (for empty, print "true" or "false").',
        difficulty: 'EASY',
        tags: ['stack', 'queue'],
        constraints:
            '1 <= q <= 10^5\n-10^9 <= x <= 10^9\npop and peek will only be called on non-empty queues.',
        hints: 'Use two stacks: one for push operations and one for pop/peek operations. When the pop/peek stack is empty, transfer all elements from the push stack to the pop/peek stack.',
        editorial:
            '**Approach: Two Stacks (Lazy Transfer)**\n\nWe maintain two stacks: `s1` and `s2`.\n- `s1` acts as the input buffer (where we push new elements).\n- `s2` acts as the output buffer (from which we pop or peek elements).\n\nWhen we pop or peek, if `s2` is empty, we pop all elements from `s1` one by one and push them to `s2`. This reverses the order, making the oldest elements appear at the top of `s2` (FIFO order).\n\nAmortized time complexity of each operation is O(1).\n\n**Time Complexity:** O(1) amortized per operation\n**Space Complexity:** O(q) to store elements',
        examples: [
            {
                title: 'Example 1',
                input: '5\npush 1\npush 2\npeek\npop\nempty',
                output: '1\nfalse',
                explanation:
                    'Queue becomes [1, 2]. Peek returns 1. Pop removes 1, leaving [2]. Not empty.',
            },
            {
                title: 'Example 2',
                input: '4\npush 10\npeek\npop\nempty',
                output: '10\ntrue',
                explanation: 'Push 10. Peek returns 10. Pop removes 10. Queue is empty.',
            },
        ],
        testcases: [
            { input: '5\npush 1\npush 2\npeek\npop\nempty', output: '1\nfalse' },
            { input: '4\npush 10\npeek\npop\nempty', output: '10\ntrue' },
            { input: '7\npush 1\npush 2\npush 3\npeek\npop\npeek\npop', output: '1\n2' },
            { input: '3\nempty\npush 5\nempty', output: 'true\nfalse' },
            {
                input: '9\npush 10\npush 20\npop\npush 30\npeek\npop\npeek\npop\nempty',
                output: '20\n30\ntrue',
            },
            { input: '8\npush 1\npop\npush 2\npop\npush 3\npop\npush 4\nempty', output: 'false' },
            { input: '6\npush -5\npush -10\npeek\npop\npeek\npop', output: '-5\n-10' },
            { input: '4\npush 100\npush 200\npop\npeek', output: '200' },
            {
                input: '10\npush 1\npush 2\npush 3\npush 4\npush 5\npop\npop\npop\npeek\nempty',
                output: '4\nfalse',
            },
            { input: '6\npush 999\npeek\npop\npush 888\npeek\nempty', output: '999\n888\nfalse' },
        ],
        codesnippets: {
            cpp: CPP_QUERIES,
            python: PYTHON_QUERIES,
            java: JAVA_QUERIES,
            rust: RUST_QUERIES,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    if (cin >> q) {
        stack<int> s1, s2;
        auto transfer = [&]() {
            if (s2.empty()) {
                while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
            }
        };
        while (q--) {
            string op; cin >> op;
            if (op == "push") {
                int x; cin >> x;
                s1.push(x);
            } else if (op == "pop") {
                transfer();
                if (!s2.empty()) s2.pop();
            } else if (op == "peek") {
                transfer();
                cout << s2.top() << "\\n";
            } else if (op == "empty") {
                cout << (s1.empty() && s2.empty() ? "true" : "false") << "\\n";
            }
        }
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    q = int(data[0])
    s1 = []
    s2 = []
    idx = 1
    out = []
    def transfer():
        if not s2:
            while s1: s2.append(s1.pop())
    for _ in range(q):
        if idx >= len(data): break
        op = data[idx]
        idx += 1
        if op == "push":
            x = int(data[idx])
            idx += 1
            s1.append(x)
        elif op == "pop":
            transfer()
            if s2: s2.pop()
        elif op == "peek":
            transfer()
            if s2: out.append(str(s2[-1]))
        elif op == "empty":
            is_empty = not s1 and not s2
            out.append("true" if is_empty else "false")
    print('\\n'.join(out))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int q = Integer.parseInt(line.trim());
        Stack<Integer> s1 = new Stack<>();
        Stack<Integer> s2 = new Stack<>();
        for (int i = 0; i < q; i++) {
            String opLine = br.readLine();
            if (opLine == null) break;
            StringTokenizer st = new StringTokenizer(opLine);
            if (!st.hasMoreTokens()) { i--; continue; }
            String op = st.nextToken();
            if (op.equals("push")) {
                s1.push(Integer.parseInt(st.nextToken()));
            } else if (op.equals("pop")) {
                if (s2.isEmpty()) {
                    while (!s1.isEmpty()) s2.push(s1.pop());
                }
                s2.pop();
            } else if (op.equals("peek")) {
                if (s2.isEmpty()) {
                    while (!s1.isEmpty()) s2.push(s1.pop());
                }
                System.out.println(s2.peek());
            } else if (op.equals("empty")) {
                System.out.println((s1.isEmpty() && s2.isEmpty()) ? "true" : "false");
            }
        }
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let q: usize = line.trim().parse().unwrap();
        let mut s1 = Vec::new();
        let mut s2 = Vec::new();
        for _ in 0..q {
            if let Some(Ok(line)) = lines.next() {
                let parts: Vec<&str> = line.trim().split_whitespace().collect();
                if parts.is_empty() { continue; }
                match parts[0] {
                    "push" => {
                        let x: i32 = parts[1].parse().unwrap();
                        s1.push(x);
                    }
                    "pop" => {
                        if s2.is_empty() {
                            while let Some(val) = s1.pop() { s2.push(val); }
                        }
                        s2.pop();
                    }
                    "peek" => {
                        if s2.is_empty() {
                            while let Some(val) = s1.pop() { s2.push(val); }
                        }
                        if let Some(&val) = s2.last() { writeln!(out, "{}", val).unwrap(); }
                    }
                    "empty" => {
                        let is_empty = s1.is_empty() && s2.is_empty();
                        writeln!(out, "{}", if is_empty { "true" } else { "false" }).unwrap();
                    }
                    _ => {}
                }
            }
        }
    }
}`,
        },
    },

    // ==================== EASY #4: Next Greater Element ====================
    {
        title: 'Next Greater Element',
        description:
            'Given an array of integers, find the next greater element for each element in the array. The next greater element of an element arr[i] is the first greater element to its right. If it does not exist, the next greater element is -1.\n\n**Input Format:**\n- First line: integer n (size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- n space-separated integers, representing the next greater element for each element in the input array.',
        difficulty: 'EASY',
        tags: ['stack', 'monotonic-stack'],
        constraints: '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
        hints: 'Iterate through the array from right to left. Use a stack to maintain the elements on the right in decreasing order (a monotonic stack).',
        editorial:
            '**Approach: Monotonic Stack (Right to Left)**\n\n1. Create a stack and a result array `res` of size `n` initialized to -1.\n2. Iterate through the array from `n-1` down to `0`:\n   - While the stack is not empty and the top of the stack is less than or equal to the current element, pop from the stack.\n   - If the stack is not empty, the next greater element for `arr[i]` is the top of the stack.\n   - Push the current element `arr[i]` onto the stack.\n3. Print the result array.\n\nThis approach ensures each element is pushed and popped from the stack at most once.\n\n**Time Complexity:** O(N) where N is the size of the array.\n**Space Complexity:** O(N) to store the result and stack.',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 3 4 2',
                output: '3 4 -1 -1',
                explanation:
                    'For 1, NGE is 3. For 3, NGE is 4. For 4, no greater element exists. For 2, no greater element exists.',
            },
            {
                title: 'Example 2',
                input: '5\n5 4 3 2 1',
                output: '-1 -1 -1 -1 -1',
                explanation:
                    'All elements are sorted in decreasing order, so no greater element exists to the right of any element.',
            },
        ],
        testcases: [
            { input: '4\n1 3 4 2', output: '3 4 -1 -1' },
            { input: '5\n5 4 3 2 1', output: '-1 -1 -1 -1 -1' },
            { input: '1\n10', output: '-1' },
            { input: '6\n1 2 3 4 5 6', output: '2 3 4 5 6 -1' },
            { input: '5\n6 2 5 4 7', output: '7 5 7 7 -1' },
            { input: '4\n-1 -2 -3 0', output: '0 0 0 -1' },
            { input: '8\n4 5 2 25 7 8 10 1', output: '5 25 25 -1 8 10 -1 -1' },
            { input: '3\n10 10 10', output: '-1 -1 -1' },
            { input: '7\n3 4 2 7 5 8 10', output: '4 7 7 8 8 10 -1' },
            { input: '10\n9 8 7 3 2 1 4 5 6 10', output: '10 10 10 4 4 4 5 6 10 -1' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        vector<int> res(n, -1);
        stack<int> s;
        for (int i = n - 1; i >= 0; i--) {
            while (!s.empty() && s.top() <= arr[i]) s.pop();
            if (!s.empty()) res[i] = s.top();
            s.push(arr[i]);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    res = [-1] * n
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= arr[i]: stack.pop()
        if stack: res[i] = stack[-1]
        stack.append(arr[i])
    print(*(res))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int[] res = new int[n];
        Stack<Integer> s = new Stack<>();
        for (int i = n - 1; i >= 0; i--) {
            while (!s.isEmpty() && s.peek() <= arr[i]) s.pop();
            res[i] = s.isEmpty() ? -1 : s.peek();
            s.push(arr[i]);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(res[i]);
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let arr: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut res = vec![-1; n];
            let mut stack = Vec::new();
            for i in (0..n).rev() {
                while !stack.is_empty() && *stack.last().unwrap() <= arr[i] { stack.pop(); }
                if let Some(&val) = stack.last() { res[i] = val; }
                stack.push(arr[i]);
            }
            let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #5: Evaluate Postfix Expression ====================
    {
        title: 'Evaluate Postfix Expression',
        description:
            "Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix Notation).\n\nValid operators are '+', '-', '*', and '/'. Each operand may be an integer or another expression.\n\nNote that division between two integers should truncate toward zero (standard integer division).\n\n**Input Format:**\n- First line: integer n (number of tokens)\n- Second line: n space-separated tokens\n\n**Output Format:**\n- A single integer representing the evaluated result.",
        difficulty: 'EASY',
        tags: ['stack'],
        constraints:
            "1 <= n <= 10^4\nEach token is either '+', '-', '*', '/' or a valid integer in range [-200, 200].\nThe expression is guaranteed to be valid.",
        hints: 'Use a stack. When you see a number, push it onto the stack. When you see an operator, pop the top two numbers, apply the operator, and push the result back.',
        editorial:
            '**Approach: Stack Evaluation**\n\n1. Initialize an empty stack.\n2. Iterate through each token in the expression:\n   - If the token is a number, convert it to an integer and push it to the stack.\n   - If it is an operator, pop two operands `b` (the second popped) and `a` (the first popped), perform the operation `a operator b`, and push the result back onto the stack.\n3. The final element remaining in the stack is the result.\n\n**Time Complexity:** O(N) where N is the number of tokens.\n**Space Complexity:** O(N) to store operands in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '5\n2 1 + 3 *',
                output: '9',
                explanation: '((2 + 1) * 3) = 9',
            },
            {
                title: 'Example 2',
                input: '5\n4 13 5 / +',
                output: '6',
                explanation: '(4 + (13 / 5)) = 6',
            },
        ],
        testcases: [
            { input: '5\n2 1 + 3 *', output: '9' },
            { input: '5\n4 13 5 / +', output: '6' },
            { input: '1\n42', output: '42' },
            { input: '9\n10 6 9 3 + -11 * / * 17 + 5 +', output: '22' },
            { input: '3\n3 -4 +', output: '-1' },
            { input: '7\n10 2 8 * + 3 -', output: '23' },
            { input: '5\n3 5 - 2 *', output: '-4' },
            { input: '7\n-5 5 + 10 * 3 +', output: '3' },
            { input: '11\n1 2 + 3 + 4 + 5 + 6 +', output: '21' },
            { input: '11\n2 3 * 5 4 * + 9 - 2 /', output: '8' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
bool is_op(const string& s) { return s == "+" || s == "-" || s == "*" || s == "/"; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        stack<long long> s;
        for (int i = 0; i < n; i++) {
            string t; cin >> t;
            if (is_op(t)) {
                long long b = s.top(); s.pop();
                long long a = s.top(); s.pop();
                if (t == "+") s.push(a + b);
                else if (t == "-") s.push(a - b);
                else if (t == "*") s.push(a * b);
                else if (t == "/") s.push(a / b);
            } else {
                s.push(stoll(t));
            }
        }
        cout << s.top() << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    stack = []
    for token in data[1:]:
        if token in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if token == "+": stack.append(a + b)
            elif token == "-": stack.append(a - b)
            elif token == "*": stack.append(a * b)
            elif token == "/": stack.append(int(a / b))
        else:
            stack.append(int(token))
    print(stack[0])
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        Stack<Long> s = new Stack<>();
        for (int i = 0; i < n; i++) {
            String token = st.nextToken();
            if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                long b = s.pop();
                long a = s.pop();
                if (token.equals("+")) s.push(a + b);
                else if (token.equals("-")) s.push(a - b);
                else if (token.equals("*")) s.push(a * b);
                else if (token.equals("/")) s.push(a / b);
            } else {
                s.push(Long.parseLong(token));
            }
        }
        System.out.println(s.peek());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let _n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let tokens: Vec<&str> = line.trim().split_whitespace().collect();
            let mut stack = Vec::new();
            for token in tokens {
                if token == "+" || token == "-" || token == "*" || token == "/" {
                    let b = stack.pop().unwrap();
                    let a = stack.pop().unwrap();
                    match token {
                        "+" => stack.push(a + b),
                        "-" => stack.push(a - b),
                        "*" => stack.push(a * b),
                        "/" => stack.push(a / b),
                        _ => {}
                    }
                } else {
                    stack.push(token.parse::<i64>().unwrap());
                }
            }
            writeln!(out, "{}", stack[0]).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #1: Daily Temperatures ====================
    {
        title: 'Daily Temperatures',
        description:
            'Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.\n\n**Input Format:**\n- First line: integer n (the number of days)\n- Second line: n space-separated integers representing daily temperatures\n\n**Output Format:**\n- n space-separated integers representing the wait days for each day.',
        difficulty: 'MEDIUM',
        tags: ['stack', 'monotonic-stack'],
        constraints: '1 <= n <= 10^5\n30 <= temperatures[i] <= 100',
        hints: 'Use a stack to store the indices of the temperatures. Keep the stack monotonic (decreasing) in temperature values.',
        editorial:
            '**Approach: Monotonic Stack (Left to Right)**\n\n1. Maintain a stack that stores indices of the days.\n2. Iterate through each day `i` from `0` to `n-1`:\n   - While the stack is not empty and the temperature at day `i` is greater than the temperature at the index at the top of the stack:\n     - Pop the top index `prev_i`.\n     - Set `res[prev_i] = i - prev_i`.\n   - Push `i` onto the stack.\n3. Any indices remaining in the stack will keep their default value of `0` since no warmer day was found.\n\n**Time Complexity:** O(N) since each index is pushed and popped at most once.\n**Space Complexity:** O(N) to store the result and the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '8\n73 74 75 71 69 72 76 73',
                output: '1 1 4 2 1 1 0 0',
                explanation: 'Wait 1 day for 74, 1 day for 75, 4 days for 76, etc.',
            },
            {
                title: 'Example 2',
                input: '4\n30 40 50 60',
                output: '1 1 1 0',
                explanation: 'Each day is warmer than the previous day.',
            },
        ],
        testcases: [
            { input: '8\n73 74 75 71 69 72 76 73', output: '1 1 4 2 1 1 0 0' },
            { input: '4\n30 40 50 60', output: '1 1 1 0' },
            { input: '3\n30 30 30', output: '0 0 0' },
            { input: '5\n80 80 80 80 80', output: '0 0 0 0 0' },
            { input: '1\n55', output: '0' },
            { input: '6\n89 62 70 58 43 100', output: '5 1 3 2 1 0' },
            { input: '7\n30 31 32 33 34 35 36', output: '1 1 1 1 1 1 0' },
            { input: '7\n36 35 34 33 32 31 30', output: '0 0 0 0 0 0 0' },
            { input: '10\n50 49 48 47 46 45 44 43 42 100', output: '9 8 7 6 5 4 3 2 1 0' },
            { input: '8\n40 35 45 40 38 42 46 41', output: '2 1 4 2 1 1 0 0' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> temp(n), res(n, 0);
        for (int i = 0; i < n; i++) cin >> temp[i];
        stack<int> s;
        for (int i = 0; i < n; i++) {
            while (!s.empty() && temp[i] > temp[s.top()]) {
                int prev = s.top(); s.pop();
                res[prev] = i - prev;
            }
            s.push(i);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    temp = [int(x) for x in data[1:]]
    res = [0] * n
    stack = []
    for i in range(n):
        while stack and temp[i] > temp[stack[-1]]:
            prev = stack.pop()
            res[prev] = i - prev
        stack.append(i)
    print(*(res))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] temp = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) temp[i] = Integer.parseInt(st.nextToken());
        int[] res = new int[n];
        Stack<Integer> s = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && temp[i] > temp[s.peek()]) {
                int prev = s.pop();
                res[prev] = i - prev;
            }
            s.push(i);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(res[i]);
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let temp: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut res = vec![0; n];
            let mut stack = Vec::new();
            for i in 0..n {
                while !stack.is_empty() && temp[i] > temp[*stack.last().unwrap()] {
                    let prev = stack.pop().unwrap();
                    res[prev] = (i - prev) as i32;
                }
                stack.push(i);
            }
            let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #2: Decode Encoded String ====================
    {
        title: 'Decode Encoded String',
        description:
            'An encoded string is given, decode it to its original form.\n\nThe encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.\n\nYou may assume that the input string is always valid; there are no extra spaces, brackets are well-formed, etc. Furthermore, the decoded string does not contain any digits.\n\n**Input Format:**\n- A single line containing the encoded string s.\n\n**Output Format:**\n- The decoded string.',
        difficulty: 'MEDIUM',
        tags: ['stack'],
        constraints:
            "1 <= s.length <= 1000\ns consists of lowercase English letters, digits, and square brackets '[]'.\nAll integers in s are in range [1, 300].\nThe decoded string length does not exceed 10^5.",
        hints: 'Use two stacks: one to store the repeat factors (k) and one to store the previous strings. Process the string character by character.',
        editorial:
            "**Approach: Two Stacks**\n\n1. Maintain a `countStack` to store repetition values and `stringStack` to store accumulated strings.\n2. Iterate through each character in the string:\n   - If the character is a digit, compute the value of the number `k` (it can have multiple digits).\n   - If it is '[', push the current `k` to `countStack`, push the current `currentString` to `stringStack`, and reset both `k` and `currentString`.\n   - If it is ']', pop the repeat count `count` from `countStack` and the previous string `prevString` from `stringStack`. Set `currentString = prevString + repeat(currentString, count)`.\n   - If it is a character, append it to `currentString`.\n3. Return `currentString`.\n\n**Time Complexity:** O(L) where L is the length of the decoded string, as we build the string character by character.\n**Space Complexity:** O(S) where S is the number of brackets (nested level) to store state in the stacks.",
        examples: [
            {
                title: 'Example 1',
                input: '3[a]2[bc]',
                output: 'aaabcbc',
                explanation: '"a" repeated 3 times + "bc" repeated 2 times.',
            },
            {
                title: 'Example 2',
                input: '3[a2[c]]',
                output: 'accaccacc',
                explanation: 'Inner "2[c]" -> "cc". Outer "3[acc]" -> "accaccacc".',
            },
        ],
        testcases: [
            { input: '3[a]2[bc]', output: 'aaabcbc' },
            { input: '3[a2[c]]', output: 'accaccacc' },
            { input: '2[abc]3[cd]ef', output: 'abcabccdcdcdef' },
            { input: 'abc3[cd]xyz', output: 'abccdcdcdxyz' },
            { input: '10[a]', output: 'aaaaaaaaaa' },
            { input: '2[2[abbb]2[c]]', output: 'abbbabbbccabbbabbbcc' },
            { input: 'z', output: 'z' },
            { input: '2[a]3[b]4[c]', output: 'aabbbcccc' },
            { input: '2[3[a]2[b]]', output: 'aaabbaaabb' },
            { input: '3[2[1[a]]]', output: 'aaaaaa' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<int> counts;
        stack<string> strs;
        string curr = "";
        int k = 0;
        for (char c : s) {
            if (isdigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(k);
                strs.push(curr);
                curr = ""; k = 0;
            } else if (c == ']') {
                int count = counts.top(); counts.pop();
                string prev = strs.top(); strs.pop();
                string rep = "";
                for (int i = 0; i < count; i++) rep += curr;
                curr = prev + rep;
            } else {
                curr += c;
            }
        }
        cout << curr << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s: return
    counts = []
    strs = []
    curr = ""
    k = 0
    for c in s:
        if c.isdigit():
            k = k * 10 + int(c)
        elif c == '[':
            counts.append(k)
            strs.append(curr)
            curr, k = "", 0
        elif c == ']':
            count = counts.pop()
            prev = strs.pop()
            curr = prev + curr * count
        else:
            curr += c
    print(curr)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        Stack<Integer> counts = new Stack<>();
        Stack<String> strs = new Stack<>();
        String curr = "";
        int k = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(k);
                strs.push(curr);
                curr = ""; k = 0;
            } else if (c == ']') {
                int count = counts.pop();
                String prev = strs.pop();
                StringBuilder sb = new StringBuilder();
                for (int j = 0; j < count; j++) sb.append(curr);
                curr = prev + sb.toString();
            } else {
                curr += c;
            }
        }
        System.out.println(curr);
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
        let mut counts = Vec::new();
        let mut strs = Vec::new();
        let mut curr = String::new();
        let mut k = 0;
        for c in s.chars() {
            if c.is_ascii_digit() {
                k = k * 10 + (c as u8 - b'0') as i32;
            } else if c == '[' {
                counts.push(k);
                strs.push(curr.clone());
                curr.clear(); k = 0;
            } else if c == ']' {
                let count = counts.pop().unwrap();
                let prev = strs.pop().unwrap();
                let rep = curr.repeat(count as usize);
                curr = prev + &rep;
            } else {
                curr.push(c);
            }
        }
        writeln!(out, "{}", curr).unwrap();
    }
}`,
        },
    },

    // ==================== MEDIUM #3: Asteroid Collision ====================
    {
        title: 'Asteroid Collision',
        description:
            'We are given an array asteroids of integers representing asteroids in a row.\n\nFor each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.\n\nFind out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.\n\n**Input Format:**\n- First line: integer n (number of asteroids)\n- Second line: n space-separated integers representing the asteroids\n\n**Output Format:**\n- A single line containing the space-separated integers representing the remaining asteroids. If all asteroids explode, print an empty line.',
        difficulty: 'MEDIUM',
        tags: ['stack'],
        constraints: '1 <= n <= 10^5\n-1000 <= asteroids[i] <= 1000\nasteroids[i] != 0',
        hints: 'Use a stack. Pushing an asteroid is simple if it is moving right. If it is moving left, resolve collisions with any right-moving asteroids at the top of the stack.',
        editorial:
            '**Approach: Stack Simulation**\n\n1. Iterate through each asteroid:\n   - If the asteroid is positive (moving right), push it to the stack.\n   - If it is negative (moving left), a collision can happen as long as there is a positive asteroid at the top of the stack:\n     - If the top of the stack is smaller than the absolute value of the current asteroid, the top asteroid is destroyed (pop it).\n     - If the top of the stack is equal to the absolute value of the current asteroid, both are destroyed (pop the top and do not push the current one).\n     - If the top of the stack is larger than the absolute value of the current asteroid, the current asteroid is destroyed (do not push it).\n   - If the current asteroid is not destroyed, push it onto the stack.\n2. Print the final elements in the stack.\n\n**Time Complexity:** O(N) as each asteroid is pushed and popped at most once.\n**Space Complexity:** O(N) to store remaining asteroids.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n5 10 -5',
                output: '5 10',
                explanation: '10 and -5 collide, -5 explodes. 5 and 10 never collide.',
            },
            {
                title: 'Example 2',
                input: '2\n8 -8',
                output: '',
                explanation: '8 and -8 collide and destroy each other, leaving nothing.',
            },
        ],
        testcases: [
            { input: '3\n5 10 -5', output: '5 10' },
            { input: '2\n8 -8', output: '' },
            { input: '3\n10 2 -5', output: '10' },
            { input: '4\n-2 -1 1 2', output: '-2 -1 1 2' },
            { input: '4\n1 2 3 -4', output: '-4' },
            { input: '5\n-5 -10 5 10 -15', output: '-5 -10 -15' },
            { input: '1\n42', output: '42' },
            { input: '6\n8 9 10 -10 -9 -8', output: '' },
            { input: '6\n-2 2 -1 -2 -2 2', output: '-2 -2 2' },
            { input: '8\n10 9 8 7 -7 -8 -9 -10', output: '' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> res;
        for (int i = 0; i < n; i++) {
            int ast; cin >> ast;
            bool exploded = false;
            while (!res.empty() && ast < 0 && res.back() > 0) {
                if (res.back() < -ast) { res.pop_back(); continue; }
                else if (res.back() == -ast) { res.pop_back(); }
                exploded = true; break;
            }
            if (!exploded) res.push_back(ast);
        }
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    stack = []
    for ast in [int(x) for x in data[1:]]:
        exploded = False
        while stack and ast < 0 and stack[-1] > 0:
            if stack[-1] < -ast:
                stack.pop()
                continue
            elif stack[-1] == -ast:
                stack.pop()
            exploded = True
            break
        if not exploded: stack.append(ast)
    print(*(stack))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        List<Integer> stack = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int ast = Integer.parseInt(st.nextToken());
            boolean exploded = false;
            while (!stack.isEmpty() && ast < 0 && stack.get(stack.size() - 1) > 0) {
                int top = stack.get(stack.size() - 1);
                if (top < -ast) {
                    stack.remove(stack.size() - 1);
                    continue;
                } else if (top == -ast) {
                    stack.remove(stack.size() - 1);
                }
                exploded = true;
                break;
            }
            if (!exploded) stack.add(ast);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < stack.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(stack.get(i));
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let _n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let aster: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut stack = Vec::new();
            for ast in aster {
                let mut exploded = false;
                while !stack.is_empty() && ast < 0 && *stack.last().unwrap() > 0 {
                    let top = *stack.last().unwrap();
                    if top < -ast { stack.pop(); continue; }
                    else if top == -ast { stack.pop(); }
                    exploded = true; break;
                }
                if !exploded { stack.push(ast); }
            }
            let strs: Vec<String> = stack.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #4: Simplify Unix Path ====================
    {
        title: 'Simplify Unix Path',
        description:
            "Given an absolute path for a Unix-style file system, simplify it to the canonical path.\n\nIn Unix-style file system:\n- A period '.' refers to the current directory.\n- A double period '..' moves up a directory level.\n- Multiple sequential slashes (e.g. '//') are treated as a single slash '/'.\n\nThe simplified canonical path must:\n1. Start with a single slash '/'.\n2. Any two directories are separated by a single slash '/'.\n3. The path does not end with a trailing '/'.\n4. The path only contains the directories on the path from the root directory to the target directory.\n\n**Input Format:**\n- A single line containing the path string s.\n\n**Output Format:**\n- The simplified canonical path.",
        difficulty: 'MEDIUM',
        tags: ['stack'],
        constraints:
            "1 <= s.length <= 3000\ns starts with '/' and contains only English letters, digits, '.', '/' or '_'.",
        hints: "Split the input string by the '/' delimiter. Process each token with a stack: push normal names, pop for '..', and ignore '.' or empty tokens.",
        editorial:
            '**Approach: Stack with Delimiter Splitting**\n\n1. Split the input string using \'/\' as a delimiter.\n2. Maintain a stack of strings representing the directory path.\n3. Iterate through each token from the split:\n   - If the token is empty or ".", ignore it.\n   - If the token is "..", pop from the stack (if the stack is not empty) to go up one level.\n   - For any other token, push it to the stack.\n4. Join the elements in the stack with \'/\' as a separator and prefix with \'/\'. If the stack is empty, return "/".\n\n**Time Complexity:** O(N) where N is the length of the string.\n**Space Complexity:** O(N) to store directory names in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '/home/',
                output: '/home',
                explanation: 'Trailing slash is removed.',
            },
            {
                title: 'Example 2',
                input: '/../',
                output: '/',
                explanation: 'Going up from root stays at root.',
            },
        ],
        testcases: [
            { input: '/home/', output: '/home' },
            { input: '/../', output: '/' },
            { input: '/home//foo/', output: '/home/foo' },
            { input: '/a/./b/../../c/', output: '/c' },
            { input: '/a/../../b/../c//.//', output: '/c' },
            { input: '/a/b/c', output: '/a/b/c' },
            { input: '/../a/b/c/.././d', output: '/a/b/d' },
            { input: '/.', output: '/' },
            { input: '/...', output: '/...' },
            { input: '/a/b/c/d/e/../../../../f', output: '/a/f' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        vector<string> st;
        stringstream ss(s);
        string token;
        while (getline(ss, token, '/')) {
            if (token == "" || token == ".") continue;
            if (token == "..") {
                if (!st.empty()) st.pop_back();
            } else {
                st.push_back(token);
            }
        }
        string res = "";
        for (const string& dir : st) res += "/" + dir;
        if (res == "") res = "/";
        cout << res << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s: return
    tokens = s.split('/')
    stack = []
    for token in tokens:
        if token == '' or token == '.': continue
        if token == '..':
            if stack: stack.pop()
        else:
            stack.append(token)
    print('/' + '/'.join(stack))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        String[] tokens = s.split("/");
        Stack<String> stack = new Stack<>();
        for (String t : tokens) {
            if (t.equals("") || t.equals(".")) continue;
            if (t.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(t);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (String dir : stack) sb.append("/").append(dir);
        System.out.println(sb.length() == 0 ? "/" : sb.toString());
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
        let tokens: Vec<&str> = s.split('/').collect();
        let mut stack = Vec::new();
        for t in tokens {
            if t == "" || t == "." { continue; }
            if t == ".." { stack.pop(); }
            else { stack.push(t); }
        }
        let mut res = String::new();
        for dir in stack { res.push('/'); res.push_str(dir); }
        if res.is_empty() { res.push('/'); }
        writeln!(out, "{}", res).unwrap();
    }
}`,
        },
    },

    // ==================== MEDIUM #5: Online Stock Span ====================
    {
        title: 'Online Stock Span',
        description:
            "Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.\n\nThe span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backward) for which the stock price was less than or equal to today's price.\n\n**Input Format:**\n- First line: integer n (the number of days)\n- Second line: n space-separated integers representing stock prices\n\n**Output Format:**\n- n space-separated integers representing the span of the stock price for each day.",
        difficulty: 'MEDIUM',
        tags: ['stack', 'monotonic-stack'],
        constraints: '1 <= n <= 10^5\n1 <= price[i] <= 10^5',
        hints: 'For each price, we want to find the nearest previous day with a strictly greater price. Maintain a monotonic decreasing stack of pairs (price, span).',
        editorial:
            "**Approach: Monotonic Stack of Pairs**\n\n1. Use a stack to store pairs of `(price, span)`.\n2. For each day's price:\n   - Initialize `span = 1`.\n   - While the stack is not empty and the top element's price is less than or equal to the current price:\n     - Accumulate its span: `span += stack.top().span`.\n     - Pop the element from the stack.\n   - Push the pair `(current_price, span)` onto the stack.\n   - The current span is the answer for this day.\n3. Print the span values for all days.\n\n**Time Complexity:** O(N) since each price is pushed and popped at most once.\n**Space Complexity:** O(N) to store pairs in the stack.",
        examples: [
            {
                title: 'Example 1',
                input: '7\n100 80 60 70 60 75 85',
                output: '1 1 1 2 1 4 6',
                explanation:
                    'Span for 75 is 4 because 75 >= [60, 70, 60]. Span for 85 is 6 because 85 >= [80, 60, 70, 60, 75].',
            },
            {
                title: 'Example 2',
                input: '5\n10 20 30 40 50',
                output: '1 2 3 4 5',
                explanation:
                    'Each price is larger than all previous, so the span accumulates progressively.',
            },
        ],
        testcases: [
            { input: '7\n100 80 60 70 60 75 85', output: '1 1 1 2 1 4 6' },
            { input: '5\n10 20 30 40 50', output: '1 2 3 4 5' },
            { input: '5\n50 40 30 20 10', output: '1 1 1 1 1' },
            { input: '6\n10 10 10 10 10 10', output: '1 2 3 4 5 6' },
            { input: '1\n100', output: '1' },
            { input: '8\n31 32 31 32 31 32 31 32', output: '1 2 1 4 1 6 1 8' },
            { input: '10\n90 80 70 60 50 60 70 80 90 100', output: '1 1 1 1 1 2 4 6 9 10' },
            { input: '5\n100 90 100 90 100', output: '1 1 3 1 5' },
            { input: '6\n1 -2 3 -2 1 4', output: '1 1 3 1 1 6' },
            { input: '8\n1000 500 600 700 800 900 1000 1100', output: '1 1 2 3 4 5 7 8' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> res;
        stack<pair<int, int>> s;
        for (int i = 0; i < n; i++) {
            int price; cin >> price;
            int span = 1;
            while (!s.empty() && s.top().first <= price) {
                span += s.top().second;
                s.pop();
            }
            s.push({price, span});
            res.push_back(span);
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    prices = [int(x) for x in data[1:]]
    stack = []
    res = []
    for price in prices:
        span = 1
        while stack and stack[-1][0] <= price:
            span += stack.pop()[1]
        stack.append((price, span))
        res.append(span)
    print(*(res))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Pair {
        int price, span;
        Pair(int p, int s) { price = p; span = s; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        Stack<Pair> s = new Stack<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int price = Integer.parseInt(st.nextToken());
            int span = 1;
            while (!s.isEmpty() && s.peek().price <= price) {
                span += s.pop().span;
            }
            s.push(new Pair(price, span));
            if (i > 0) sb.append(" ");
            sb.append(span);
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let prices: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut stack: Vec<(i32, i32)> = Vec::new();
            let mut res = Vec::with_capacity(n);
            for price in prices {
                let mut span = 1;
                while !stack.is_empty() && stack.last().unwrap().0 <= price {
                    span += stack.pop().unwrap().1;
                }
                stack.push((price, span));
                res.push(span);
            }
            let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #1: Largest Rectangle in Histogram ====================
    {
        title: 'Largest Rectangle in Histogram',
        description:
            "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, find the area of the largest rectangle in the histogram.\n\n**Input Format:**\n- First line: integer n (the number of bars)\n- Second line: n space-separated integers representing bar heights\n\n**Output Format:**\n- A single integer representing the maximum area of a rectangle in the histogram.",
        difficulty: 'HARD',
        tags: ['stack', 'monotonic-stack'],
        constraints:
            '1 <= n <= 10^5\n0 <= heights[i] <= 10^4\nThe area can exceed 32-bit signed integer limits under extreme inputs, so use appropriate 64-bit integer types.',
        hints: 'Use a monotonic increasing stack to store the indices of the histogram bars. When the height of the current bar is less than the bar at the top of the stack, pop from the stack and compute the area.',
        editorial:
            '**Approach: Monotonic Stack**\n\n1. Maintain a stack that stores indices of the bars in increasing order of heights.\n2. Iterate through all bars (including a dummy bar of height 0 at index `n` to flush the remaining items in the stack):\n   - While the stack is not empty and the current height is less than the height at `stack.top()`:\n     - Pop the top index `h_idx`.\n     - The height of the rectangle is `heights[h_idx]`.\n     - The width is `i` if the stack is empty, otherwise `i - stack.top() - 1`.\n     - Update the maximum area: `max_area = max(max_area, height * width)`.\n   - Push the current index `i` to the stack.\n3. Return `max_area`.\n\n**Time Complexity:** O(N) as each bar is pushed and popped at most once.\n**Space Complexity:** O(N) to store indices in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '6\n2 1 5 6 2 3',
                output: '10',
                explanation:
                    'The largest rectangle is formed by heights [5, 6] with area = 2 * 5 = 10.',
            },
            {
                title: 'Example 2',
                input: '2\n2 4',
                output: '4',
                explanation: 'The largest rectangle is 4 (the bar itself).',
            },
        ],
        testcases: [
            { input: '6\n2 1 5 6 2 3', output: '10' },
            { input: '2\n2 4', output: '4' },
            { input: '1\n0', output: '0' },
            { input: '1\n10000', output: '10000' },
            { input: '5\n2 2 2 2 2', output: '10' },
            { input: '7\n1 2 3 4 5 6 7', output: '16' },
            { input: '7\n7 6 5 4 3 2 1', output: '16' },
            { input: '10\n1 1 1 1 1 1 1 1 1 1', output: '10' },
            { input: '6\n10 90 10 90 10 90', output: '90' },
            { input: '10\n3 5 7 9 10 8 6 4 2 1', output: '30' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<long long> heights(n);
        for (int i = 0; i < n; i++) cin >> heights[i];
        heights.push_back(0);
        stack<int> s;
        long long max_area = 0;
        for (int i = 0; i <= n; i++) {
            while (!s.empty() && heights[i] < heights[s.top()]) {
                int h_idx = s.top(); s.pop();
                long long h = heights[h_idx];
                long long w = s.empty() ? i : i - s.top() - 1;
                max_area = max(max_area, h * w);
            }
            s.push(i);
        }
        cout << max_area << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    heights = [int(x) for x in data[1:]] + [0]
    stack = []
    max_area = 0
    for i in range(n + 1):
        while stack and heights[i] < heights[stack[-1]]:
            h = heights[stack.pop()]
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)
    print(max_area)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        long[] heights = new long[n + 1];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) heights[i] = Long.parseLong(st.nextToken());
        heights[n] = 0;
        Stack<Integer> s = new Stack<>();
        long maxArea = 0;
        for (int i = 0; i <= n; i++) {
            while (!s.isEmpty() && heights[i] < heights[s.peek()]) {
                int hIdx = s.pop();
                long h = heights[hIdx];
                long w = s.isEmpty() ? i : i - s.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            s.push(i);
        }
        System.out.println(maxArea);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let mut heights: Vec<i64> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            heights.push(0);
            let mut stack = Vec::new();
            let mut max_area = 0;
            for i in 0..=n {
                while !stack.is_empty() && heights[i] < heights[*stack.last().unwrap()] {
                    let h_idx = stack.pop().unwrap();
                    let h = heights[h_idx];
                    let w = if stack.is_empty() { i as i64 } else { (i - stack.last().unwrap() - 1) as i64 };
                    max_area = cmp::max(max_area, h * w);
                }
                stack.push(i);
            }
            writeln!(out, "{}", max_area).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #2: Maximal Rectangle Area ====================
    {
        title: 'Maximal Rectangle Area',
        description:
            "Given a 2D binary matrix of dimensions r x c filled with '0's and '1's, find the largest rectangle containing only '1's and return its area.\n\n**Input Format:**\n- First line: two integers r and c (rows and columns)\n- Next r lines: each line containing a string of length c consisting of '0' and '1' characters (no spaces)\n\n**Output Format:**\n- A single integer representing the area of the largest rectangle.",
        difficulty: 'HARD',
        tags: ['stack', 'monotonic-stack'],
        constraints: '1 <= r, c <= 500\nTotal matrix elements <= 2.5 * 10^5',
        hints: "This problem can be reduced to 'Largest Rectangle in Histogram' by treating each row as the base of a histogram.",
        editorial:
            "**Approach: Reduction to Histogram**\n\n1. Maintain an array `heights` of size `c` initialized to 0, which represents the number of consecutive 1s ending at the current column for the current row.\n2. For each row from `0` to `r-1`:\n   - For each column `j`:\n     - If `matrix[row][j] == '1'`, increment `heights[j]`.\n     - Else, reset `heights[j] = 0`.\n   - Solve the 'Largest Rectangle in Histogram' for the `heights` array and update the overall maximum area.\n3. Return the maximum area found.\n\n**Time Complexity:** O(R * C) where R is the number of rows and C is the number of columns.\n**Space Complexity:** O(C) to store heights and stack.",
        examples: [
            {
                title: 'Example 1',
                input: '4 5\n10100\n10111\n11111\n10010',
                output: '6',
                explanation:
                    'The maximal rectangle is from row 1 to 2, col 2 to 4, containing only 1s.',
            },
            {
                title: 'Example 2',
                input: '1 1\n0',
                output: '0',
                explanation: 'The matrix only contains a single 0, so the maximum area is 0.',
            },
        ],
        testcases: [
            { input: '4 5\n10100\n10111\n11111\n10010', output: '6' },
            { input: '1 1\n0', output: '0' },
            { input: '1 1\n1', output: '1' },
            { input: '1 5\n11111', output: '5' },
            { input: '5 1\n1\n1\n1\n1\n1', output: '5' },
            { input: '3 3\n111\n111\n111', output: '9' },
            { input: '4 4\n1010\n0101\n1010\n0101', output: '1' },
            { input: '4 4\n0110\n1111\n1111\n1100', output: '8' },
            { input: '3 4\n1100\n1100\n0011', output: '4' },
            { input: '5 5\n11111\n00000\n11111\n00000\n11111', output: '5' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int r, c;
    if (cin >> r >> c) {
        vector<string> matrix(r);
        for (int i = 0; i < r; i++) cin >> matrix[i];
        vector<int> heights(c, 0);
        int max_area = 0;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (matrix[i][j] == '1') heights[j]++;
                else heights[j] = 0;
            }
            vector<int> h = heights; h.push_back(0);
            stack<int> s;
            for (int j = 0; j <= c; j++) {
                while (!s.empty() && h[j] < h[s.top()]) {
                    int h_idx = s.top(); s.pop();
                    int ht = h[h_idx];
                    int w = s.empty() ? j : j - s.top() - 1;
                    max_area = max(max_area, ht * w);
                }
                s.push(j);
            }
        }
        cout << max_area << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    r = int(data[0])
    c = int(data[1])
    matrix = data[2:]
    heights = [0] * c
    max_area = 0
    for i in range(r):
        row_str = matrix[i]
        for j in range(c):
            if row_str[j] == '1': heights[j] += 1
            else: heights[j] = 0
        h = heights + [0]
        stack = []
        for j in range(c + 1):
            while stack and h[j] < h[stack[-1]]:
                ht = h[stack.pop()]
                w = j if not stack else j - stack[-1] - 1
                max_area = max(max_area, ht * w)
            stack.append(j)
    print(max_area)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int r = Integer.parseInt(st.nextToken());
        int c = Integer.parseInt(st.nextToken());
        int[] heights = new int[c];
        int maxArea = 0;
        for (int i = 0; i < r; i++) {
            String row = br.readLine().trim();
            for (int j = 0; j < c; j++) {
                if (row.charAt(j) == '1') heights[j]++;
                else heights[j] = 0;
            }
            int[] h = new int[c + 1];
            System.arraycopy(heights, 0, h, 0, c);
            h[c] = 0;
            Stack<Integer> s = new Stack<>();
            for (int j = 0; j <= c; j++) {
                while (!s.isEmpty() && h[j] < h[s.peek()]) {
                    int ht = h[s.pop()];
                    int w = s.isEmpty() ? j : j - s.peek() - 1;
                    maxArea = Math.max(maxArea, ht * w);
                }
                s.push(j);
            }
        }
        System.out.println(maxArea);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.trim().split_whitespace().collect();
        if parts.len() < 2 { return; }
        let r: usize = parts[0].parse().unwrap();
        let c: usize = parts[1].parse().unwrap();
        let mut heights = vec![0; c];
        let mut max_area = 0;
        for _ in 0..r {
            if let Some(Ok(row_line)) = lines.next() {
                let row_chars: Vec<char> = row_line.trim().chars().collect();
                for j in 0..c {
                    if j < row_chars.len() && row_chars[j] == '1' { heights[j] += 1; }
                    else { heights[j] = 0; }
                }
                let mut h = heights.clone();
                h.push(0);
                let mut s = Vec::new();
                for j in 0..=c {
                    while !s.is_empty() && h[j] < h[*s.last().unwrap()] {
                        let h_idx = s.pop().unwrap();
                        let ht = h[h_idx];
                        let w = if s.is_empty() { j as i32 } else { (j - s.last().unwrap() - 1) as i32 };
                        max_area = cmp::max(max_area, ht * w);
                    }
                    s.push(j);
                }
            }
        }
        writeln!(out, "{}", max_area).unwrap();
    }
}`,
        },
    },

    // ==================== HARD #3: Sliding Window Maximum ====================
    {
        title: 'Sliding Window Maximum',
        description:
            'You are given an array of integers nums, and a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n**Input Format:**\n- First line: two integers n and k (size of array and window size)\n- Second line: n space-separated integers\n\n**Output Format:**\n- n - k + 1 space-separated integers representing the max in each window.',
        difficulty: 'HARD',
        tags: ['queue', 'deque'],
        constraints: '1 <= n <= 10^5\n1 <= k <= n\n-10^4 <= nums[i] <= 10^4',
        hints: 'Use a double-ended queue (deque) to store the indices of the array elements. Maintain the deque in monotonically decreasing order of values.',
        editorial:
            '**Approach: Monotonic Deque**\n\n1. Maintain a double-ended queue (deque) containing indices of elements in the current window.\n2. Iterate through the array `nums`:\n   - Clean up the deque by removing indices that are out of the current window (indices `<= i - k`).\n   - Remove elements from the back of the deque that are smaller than the current element `nums[i]` (since they can never be the maximum in any subsequent window).\n   - Add the current index `i` to the back of the deque.\n   - If the window has reached size `k` (i.e. `i >= k - 1`), the front of the deque is the index of the maximum element in the current window. Append `nums[deque.front()]` to the result.\n3. Return the result.\n\n**Time Complexity:** O(N) as each element is added to and removed from the deque at most once.\n**Space Complexity:** O(K) to store elements inside the sliding window.',
        examples: [
            {
                title: 'Example 1',
                input: '8 3\n1 3 -1 -3 5 3 6 7',
                output: '3 3 5 5 6 7',
                explanation:
                    'Windows: [1,3,-1]->3, [3,-1,-3]->3, [-1,-3,5]->5, [-3,5,3]->5, [5,3,6]->6, [3,6,7]->7.',
            },
            {
                title: 'Example 2',
                input: '1 1\n1',
                output: '1',
                explanation: 'For a window of size 1, the max is the number itself.',
            },
        ],
        testcases: [
            { input: '8 3\n1 3 -1 -3 5 3 6 7', output: '3 3 5 5 6 7' },
            { input: '1 1\n1', output: '1' },
            { input: '6 1\n1 2 3 4 5 6', output: '1 2 3 4 5 6' },
            { input: '6 6\n1 2 3 4 5 6', output: '6' },
            { input: '5 3\n5 4 3 2 1', output: '5 4 3' },
            { input: '8 4\n1 3 1 2 0 5 9 1', output: '3 3 5 9 9' },
            { input: '4 2\n-1 -2 -3 -4', output: '-1 -2 -3' },
            { input: '7 3\n10 10 10 10 10 10 10', output: '10 10 10 10 10' },
            { input: '9 3\n1 2 3 1 2 3 1 2 3', output: '3 3 3 3 3 3 3' },
            { input: '10 4\n12 1 78 90 56 89 56 120 23 10', output: '90 90 90 90 120 120 120' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (cin >> n >> k) {
        vector<int> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
from collections import deque
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    k = int(data[1])
    nums = [int(x) for x in data[2:]]
    dq = deque()
    res = []
    for i in range(n):
        if dq and dq[0] <= i - k: dq.popleft()
        while dq and nums[dq[-1]] <= nums[i]: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    print(*(res))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int[] nums = new int[n];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(st.nextToken());
        Deque<Integer> dq = new ArrayDeque<>();
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (i >= k - 1) {
                if (!first) sb.append(" ");
                first = false;
                sb.append(nums[dq.peekFirst()]);
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::VecDeque;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.trim().split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: usize = parts[1].parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let nums: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut dq = VecDeque::new();
            let mut res = Vec::with_capacity(n - k + 1);
            for i in 0..n {
                if !dq.is_empty() && i >= k && *dq.front().unwrap() <= i - k { dq.pop_front(); }
                while !dq.is_empty() && nums[*dq.back().unwrap()] <= nums[i] { dq.pop_back(); }
                dq.push_back(i);
                if i >= k - 1 { res.push_back(nums[*dq.front().unwrap()]); }
            }
            let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`,
        },
    },

    // ==================== HARD #4: Basic Calculator Expression ====================
    {
        title: 'Basic Calculator Expression',
        description:
            "Evaluate a string s representing a valid arithmetic expression.\n\nThe expression contains parentheses '(', ')', plus '+', minus '-', non-negative integers and empty spaces. Standard unary signs (like -2 or -(3+4)) are supported. Empty spaces can occur anywhere.\n\n**Input Format:**\n- A single line containing the expression string s.\n\n**Output Format:**\n- A single integer representing the evaluated value.",
        difficulty: 'HARD',
        tags: ['stack'],
        constraints:
            "1 <= s.length <= 10^5\ns contains digits, '+', '-', '(', ')' and ' '.\ns is a valid expression.\nAll numbers fit in signed 32-bit integer, and the result fits in signed 32-bit integer.",
        hints: "Use a stack to store the sum and sign before entering parentheses. Reset the sum and sign when you see '(', and retrieve them to update the sum when you see ')'.",
        editorial:
            "**Approach: Stack-Based Evaluation**\n\n1. Maintain two variables: `current_sum` for the expression sum so far, and `sign` (1 or -1) to represent the current operation sign.\n2. Maintain a stack of integers.\n3. Iterate through characters in the string:\n   - If the character is a digit, parse the full integer `num` (which can be multi-digit), and add `sign * num` to `current_sum`.\n   - If the character is '+', set `sign = 1`.\n   - If it is '-', set `sign = -1`.\n   - If it is '(', push `current_sum` then push `sign` to the stack. Then reset `current_sum = 0` and `sign = 1`.\n   - If it is ')', pop the sign `prev_sign` from the stack and multiply with `current_sum`. Then pop the previous sum `prev_sum` and add it to get the updated `current_sum`.\n4. Return `current_sum`.\n\n**Time Complexity:** O(N) where N is the length of the string.\n**Space Complexity:** O(N) to store states on parentheses nesting.",
        examples: [
            { title: 'Example 1', input: '1 + 1', output: '2', explanation: '1 + 1 = 2.' },
            {
                title: 'Example 2',
                input: ' 2-1 + 2 ',
                output: '3',
                explanation: 'Spaces are ignored: 2 - 1 + 2 = 3.',
            },
        ],
        testcases: [
            { input: '1 + 1', output: '2' },
            { input: ' 2-1 + 2 ', output: '3' },
            { input: '(1+(4+5+2)-3)+(6+8)', output: '23' },
            { input: '-2 + 1', output: '-1' },
            { input: '-(3 + (4 - 5))', output: '-2' },
            { input: '  30  ', output: '30' },
            { input: '(10 - (2 - 3)) + 4', output: '15' },
            { input: '2147483647', output: '2147483647' },
            { input: ' -1000 ', output: '-1000' },
            { input: '1 - ( -2 )', output: '3' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (getline(cin, s)) {
        stack<int> st;
        int current_sum = 0, sign = 1, n = s.length();
        for (int i = 0; i < n; i++) {
            char c = s[i];
            if (isdigit(c)) {
                long long num = 0;
                while (i < n && isdigit(s[i])) { num = num * 10 + (s[i] - '0'); i++; }
                i--;
                current_sum += sign * num;
            } else if (c == '+') {
                sign = 1;
            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                st.push(current_sum); st.push(sign);
                current_sum = 0; sign = 1;
            } else if (c == ')') {
                int prev_sign = st.top(); st.pop();
                int prev_sum = st.top(); st.pop();
                current_sum = prev_sum + prev_sign * current_sum;
            }
        }
        cout << current_sum << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    stack = []
    current_sum = 0
    sign = 1
    i, n = 0, len(s)
    while i < n:
        char = s[i]
        if char.isdigit():
            num = 0
            while i < n and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            current_sum += sign * num
            continue
        elif char == '+': sign = 1
        elif char == '-': sign = -1
        elif char == '(':
            stack.append(current_sum)
            stack.append(sign)
            current_sum, sign = 0, 1
        elif char == ')':
            prev_sign = stack.pop()
            prev_sum = stack.pop()
            current_sum = prev_sum + prev_sign * current_sum
        i += 1
    print(current_sum)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        int n = s.length();
        Stack<Integer> st = new Stack<>();
        int currentSum = 0, sign = 1, i = 0;
        while (i < n) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                long num = 0;
                while (i < n && Character.isDigit(s.charAt(i))) {
                    num = num * 10 + (s.charAt(i) - '0'); i++;
                }
                currentSum += sign * (int) num;
                continue;
            } else if (c == '+') { sign = 1; }
            else if (c == '-') { sign = -1; }
            else if (c == '(') {
                st.push(currentSum); st.push(sign);
                currentSum = 0; sign = 1;
            } else if (c == ')') {
                int prevSign = st.pop();
                int prevSum = st.pop();
                currentSum = prevSum + prevSign * currentSum;
            }
            i++;
        }
        System.out.println(currentSum);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s: Vec<char> = line.chars().collect();
        let n = s.len();
        let mut stack = Vec::new();
        let mut current_sum: i32 = 0;
        let mut sign: i32 = 1;
        let mut i = 0;
        while i < n {
            let c = s[i];
            if c.is_ascii_digit() {
                let mut num: i64 = 0;
                while i < n && s[i].is_ascii_digit() {
                    num = num * 10 + (s[i] as u8 - b'0') as i64; i += 1;
                }
                current_sum += sign * (num as i32);
                continue;
            } else if c == '+' { sign = 1; }
            else if c == '-' { sign = -1; }
            else if c == '(' {
                stack.push(current_sum); stack.push(sign);
                current_sum = 0; sign = 1;
            } else if c == ')' {
                let prev_sign = stack.pop().unwrap();
                let prev_sum = stack.pop().unwrap();
                current_sum = prev_sum + prev_sign * current_sum;
            }
            i += 1;
        }
        writeln!(out, "{}", current_sum).unwrap();
    }
}`,
        },
    },

    // ==================== HARD #5: Trapping Rain Water (Stack version) ====================
    {
        title: 'Trapping Rain Water',
        description:
            'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Input Format:**\n- First line: integer n (the number of bars)\n- Second line: n space-separated integers representing the elevation map\n\n**Output Format:**\n- A single integer representing the total trapped water.',
        difficulty: 'HARD',
        tags: ['stack', 'monotonic-stack'],
        constraints: '1 <= n <= 10^5\n0 <= height[i] <= 10^5',
        hints: 'We can use a monotonic decreasing stack of indices. When the current height is greater than the stack top, it acts as a right boundary for the valley represented by the stack top. Pop the top, and calculate the water bounded by the new stack top and current index.',
        editorial:
            '**Approach: Monotonic Stack**\n\n1. Maintain a stack that stores indices of the bars in decreasing order of height.\n2. Iterate through each bar `i`:\n   - While the stack is not empty and the current height `height[i]` is greater than the height at `stack.top()`:\n     - Pop the top index `top = stack.top()`. This represents the bottom of a potential water container.\n     - If the stack is now empty, there is no left boundary to hold water. Break.\n     - The distance (width) between the left boundary (the new `stack.top()`) and the right boundary `i` is `distance = i - stack.top() - 1`.\n     - The bounded height is `bounded_height = min(height[i], height[stack.top()]) - height[top]`.\n     - Add the trapped water: `water += distance * bounded_height`.\n   - Push the current index `i` to the stack.\n3. Return the total water trapped.\n\n**Time Complexity:** O(N) as each bar is pushed and popped at most once.\n**Space Complexity:** O(N) to store indices in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
                output: '6',
                explanation:
                    'The elevation map [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] traps 6 units of water.',
            },
            {
                title: 'Example 2',
                input: '6\n4 2 0 3 2 5',
                output: '9',
                explanation: 'The elevation map [4, 2, 0, 3, 2, 5] traps 9 units of water.',
            },
        ],
        testcases: [
            { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', output: '6' },
            { input: '6\n4 2 0 3 2 5', output: '9' },
            { input: '1\n10', output: '0' },
            { input: '3\n3 0 3', output: '3' },
            { input: '5\n1 2 3 4 5', output: '0' },
            { input: '5\n5 4 3 2 1', output: '0' },
            { input: '7\n0 5 0 5 0 5 0', output: '10' },
            { input: '10\n3 0 0 2 0 4 0 0 1 3', output: '18' },
            { input: '10\n0 10 0 10 0 10 0 10 0 10', output: '40' },
            { input: '12\n5 4 3 2 1 0 1 2 3 4 5 6', output: '25' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> height(n);
        for (int i = 0; i < n; i++) cin >> height[i];
        stack<int> s;
        long long water = 0;
        for (int i = 0; i < n; i++) {
            while (!s.empty() && height[i] > height[s.top()]) {
                int top = s.top(); s.pop();
                if (s.empty()) break;
                long long distance = i - s.top() - 1;
                long long bounded_height = min(height[i], height[s.top()]) - height[top];
                water += distance * bounded_height;
            }
            s.push(i);
        }
        cout << water << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data: return
    n = int(data[0])
    height = [int(x) for x in data[1:]]
    stack = []
    water = 0
    for i in range(n):
        while stack and height[i] > height[stack[-1]]:
            top = stack.pop()
            if not stack: break
            distance = i - stack[-1] - 1
            bounded_height = min(height[i], height[stack[-1]]) - height[top]
            water += distance * bounded_height
        stack.append(i)
    print(water)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = Integer.parseInt(st.nextToken());
        Stack<Integer> s = new Stack<>();
        long water = 0;
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && height[i] > height[s.peek()]) {
                int top = s.pop();
                if (s.isEmpty()) break;
                long distance = i - s.peek() - 1;
                long boundedHeight = Math.min(height[i], height[s.peek()]) - height[top];
                water += distance * boundedHeight;
            }
            s.push(i);
        }
        System.out.println(water);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line)) = lines.next() {
            let height: Vec<i32> = line.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
            let mut stack = Vec::new();
            let mut water: i64 = 0;
            for i in 0..n {
                while !stack.is_empty() && height[i] > height[*stack.last().unwrap()] {
                    let top = stack.pop().unwrap();
                    if stack.is_empty() { break; }
                    let left = *stack.last().unwrap();
                    let distance = (i - left - 1) as i64;
                    let bounded_height = (cmp::min(height[i], height[left]) - height[top]) as i64;
                    water += distance * bounded_height;
                }
                stack.push(i);
            }
            writeln!(out, "{}", water).unwrap();
        }
    }
}`,
        },
    },

    // ==================== EASY #6: Remove Adjacent Duplicates ====================
    {
        title: 'Remove Adjacent Duplicates',
        description:
            'You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.\n\nWe repeatedly make duplicate removals on s until no more adjacent and equal letters can be removed.\n\n**Input Format:**\n- A single line containing the string s.\n\n**Output Format:**\n- A single line containing the final string after all duplicate removals. If the final string is empty, print an empty line.',
        difficulty: 'EASY',
        tags: ['stack', 'strings'],
        constraints: '1 <= s.length <= 10^5\ns consists of lowercase English letters.',
        hints: 'Use a stack (or a dynamic array/string acting as a stack) to process the characters one by one. If the current character matches the top of the stack, pop from the stack. Otherwise, push it.',
        editorial:
            '**Approach: Stack**\n\n1. Initialize an empty stack (or use the result string as a stack).\n2. For each character in the string `s`:\n   - If the stack is not empty and the top of the stack is equal to the current character, pop from the stack.\n   - Otherwise, push the current character onto the stack.\n3. The characters remaining in the stack from bottom to top form the final string.\n\n**Time Complexity:** O(N) where N is the length of the string, since we push and pop each character at most once.\n**Space Complexity:** O(N) to store the result stack.',
        examples: [
            {
                title: 'Example 1',
                input: 'abbaca',
                output: 'ca',
                explanation: 'In "abbaca" we can remove "bb" since the letters are adjacent and equal, and this is the only possible move. The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".',
            },
            {
                title: 'Example 2',
                input: 'azxxzy',
                output: 'ay',
                explanation: 'First remove "xx" to get "azzy", then remove "zz" to get "ay".',
            },
        ],
        testcases: [
            { input: 'abbaca', output: 'ca' },
            { input: 'azxxzy', output: 'ay' },
            { input: 'a', output: 'a' },
            { input: 'aa', output: '' },
            { input: 'aaa', output: 'a' },
            { input: 'abacaba', output: 'abacaba' },
            { input: 'abcdefgfedcba', output: 'abcdefgfedcba' },
            { input: 'caaaab', output: 'cb' },
            { input: 'qwwqee', output: '' },
            { input: 'realllylongstringwithduuupppliiccattees', output: 'realylongstringwithduplas' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && res.back() == c) {
                res.pop_back();
            } else {
                res.push_back(c);
            }
        }
        cout << res << "\\n";
    } else {
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s:
        print("")
        return
    stack = []
    for c in s:
        if stack and stack[-1] == c:
            stack.pop()
        else:
            stack.append(c)
    print("".join(stack))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) {
            System.out.println("");
            return;
        }
        s = s.trim();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (sb.length() > 0 && sb.charAt(sb.length() - 1) == c) {
                sb.deleteCharAt(sb.length() - 1);
            } else {
                sb.append(c);
            }
        }
        System.out.println(sb.toString());
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
        let mut stack = Vec::new();
        for c in s.chars() {
            if !stack.is_empty() && *stack.last().unwrap() == c {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        let res: String = stack.into_iter().collect();
        writeln!(out, "{}", res).unwrap();
    } else {
        writeln!(out, "").unwrap();
    }
}`,
        },
    },

    // ==================== EASY #7: Baseball Game ====================
    {
        title: 'Baseball Game',
        description:
            'You are keeping the scores for a baseball game with strange rules. The game starts with an empty record.\n\nYou are given a list of operations ops, where each operation is one of the following:\n- An integer x: Record a new score of x.\n- "+": Record a new score that is the sum of the previous two scores. It is guaranteed there will always be at least two previous scores.\n- "D": Record a new score that is double the previous score. It is guaranteed there will always be at least one previous score.\n- "C": Invalidate the previous score, removing it from the record. It is guaranteed there will always be at least one previous score.\n\nReturn the sum of all the scores on the record after applying all the operations.\n\n**Input Format:**\n- First line: an integer n (the number of operations)\n- Second line: n space-separated strings representing the operations\n\n**Output Format:**\n- A single integer representing the sum of all the scores.',
        difficulty: 'EASY',
        tags: ['stack', 'simulation'],
        constraints: '1 <= n <= 1000\nEach operation is either an integer, \'+\', \'D\', or \'C\'.\nFor integer operations, the value will be in range [-3 * 10^4, 3 * 10^4].\nAll operations are guaranteed to be valid.',
        hints: 'Maintain a stack of integers representing the active scores. Apply the operation rules on the top elements of the stack and push/pop as required. Finally, sum the elements of the stack.',
        editorial:
            '**Approach: Stack Simulation**\n\n1. Initialize an empty stack `scores` to keep track of the record.\n2. Iterate through each operation in the input:\n   - If the operation is an integer, parse it and push it onto `scores`.\n   - If it is "+", get the top two elements, sum them, and push the sum onto `scores`.\n   - If it is "D", double the top element and push the result onto `scores`.\n   - If it is "C", pop the top element from `scores`.\n3. Sum all the values in the stack and print the result.\n\n**Time Complexity:** O(N) where N is the number of operations.\n**Space Complexity:** O(N) to store the scores in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '5\n5 2 C D +',
                output: '30',
                explanation: '"5" - Add 5 to the record, record is now [5].\n"2" - Add 2 to the record, record is now [5, 2].\n"C" - Invalidate and remove the last score, record is now [5].\n"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].\n"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].\nThe total sum is 5 + 10 + 15 = 30.',
            },
            {
                title: 'Example 2',
                input: '8\n5 -2 4 C D 9 + +',
                output: '27',
                explanation: 'Apply each operation step-by-step. The final scores array is [5, -2, -4, 9, 5, 14], which sums to 27.',
            },
        ],
        testcases: [
            { input: '5\n5 2 C D +', output: '30' },
            { input: '8\n5 -2 4 C D 9 + +', output: '27' },
            { input: '1\n1', output: '1' },
            { input: '4\n10 D D D', output: '150' },
            { input: '10\n5 2 C D + 10 5 + C D', output: '55' },
            { input: '5\n-5 -10 + C D', output: '-35' },
            { input: '5\n100 C 200 D +', output: '1200' },
            { input: '5\n3 4 + D C', output: '14' },
            { input: '9\n1 2 + 3 + 4 + 5 +', output: '49' },
            { input: '10\n10 D C 20 D C 30 D C', output: '60' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (cin >> n) {
        vector<int> scores;
        for (int i = 0; i < n; i++) {
            string op;
            cin >> op;
            if (op == "+") {
                scores.push_back(scores[scores.size() - 1] + scores[scores.size() - 2]);
            } else if (op == "D") {
                scores.push_back(scores.back() * 2);
            } else if (op == "C") {
                scores.pop_back();
            } else {
                scores.push_back(stoi(op));
            }
        }
        long long total_sum = 0;
        for (int x : scores) total_sum += x;
        cout << total_sum << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    ops = data[1:]
    scores = []
    for op in ops:
        if op == '+':
            scores.append(scores[-1] + scores[-2])
        elif op == 'D':
            scores.append(scores[-1] * 2)
        elif op == 'C':
            scores.pop()
        else:
            scores.append(int(op))
    print(sum(scores))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        int n = Integer.parseInt(line1.trim());
        String line2 = br.readLine();
        if (line2 == null) return;
        StringTokenizer st = new StringTokenizer(line2);
        List<Integer> scores = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (!st.hasMoreTokens()) break;
            String op = st.nextToken();
            if (op.equals("+")) {
                scores.add(scores.get(scores.size() - 1) + scores.get(scores.size() - 2));
            } else if (op.equals("D")) {
                scores.add(scores.get(scores.size() - 1) * 2);
            } else if (op.equals("C")) {
                scores.remove(scores.size() - 1);
            } else {
                scores.add(Integer.parseInt(op));
            }
        }
        long sum = 0;
        for (int x : scores) {
            sum += x;
        }
        System.out.println(sum);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let n: usize = line1.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let ops: Vec<&str> = line2.trim().split_whitespace().collect();
            let mut scores = Vec::new();
            for op in ops.iter().take(n) {
                match *op {
                    "+" => {
                        let len = scores.len();
                        scores.push(scores[len - 1] + scores[len - 2]);
                    }
                    "D" => {
                        scores.push(scores.last().unwrap() * 2);
                    }
                    "C" => {
                        scores.pop();
                    }
                    _ => {
                        let val: i32 = op.parse().unwrap();
                        scores.push(val);
                    }
                }
            }
            let sum: i64 = scores.iter().map(|&x| x as i64).sum();
            writeln!(out, "{}", sum).unwrap();
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #6: Score of Parentheses ====================
    {
        title: 'Score of Parentheses',
        description:
            'Given a balanced parentheses string s, return the score of the string.\n\nThe score of a balanced parentheses string is based on the following rules:\n- "()" has score 1.\n- AB has score A + B, where A and B are balanced parentheses strings.\n- (A) has score 2 * A, where A is a balanced parentheses string.\n\n**Input Format:**\n- A single line containing the balanced parentheses string s.\n\n**Output Format:**\n- A single integer representing the score of s.',
        difficulty: 'MEDIUM',
        tags: ['stack', 'strings'],
        constraints: '2 <= s.length <= 50\ns consists of only \'(\' and \')\' and is guaranteed to be a balanced parentheses string.',
        hints: 'Use a stack to keep track of the current nesting depth score. When you see \'(\', push a 0 to start a new nesting group. When you see \')\', pop the top score, double it (or make it 1 if it is 0), and add it to the score of the outer group.',
        editorial:
            '**Approach: Stack of Scores**\n\nWe can maintain a stack to track scores at each nesting level. We start with a single `0` in the stack.\n- When we see `(`, we push `0` onto the stack.\n- When we see `)`, we pop the top value `v`. If the inner score `v` is `0`, it represents `()`, so its score is `1`. Otherwise, the inner score is `2 * v` (since it represents `(A)`). We then add this score to the new top of the stack.\n\n**Time Complexity:** O(N) where N is the length of string.\n**Space Complexity:** O(N) to store values in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '()',
                output: '1',
                explanation: '"()" has a score of 1.',
            },
            {
                title: 'Example 2',
                input: '(())',
                output: '2',
                explanation: 's = "(())" has score 2 * score("()") = 2 * 1 = 2.',
            },
        ],
        testcases: [
            { input: '()', output: '1' },
            { input: '(())', output: '2' },
            { input: '()()', output: '2' },
            { input: '(()(()))', output: '6' },
            { input: '(((())))', output: '8' },
            { input: '(()(()(())))', output: '14' },
            { input: '()()()()', output: '4' },
            { input: '((())())', output: '6' },
            { input: '(()()(()))', output: '8' },
            { input: '(((((((())))))))', output: '128' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<int> st;
        st.push(0);
        for (char c : s) {
            if (c == '(') {
                st.push(0);
            } else {
                int v = st.top();
                st.pop();
                int score = max(2 * v, 1);
                st.top() += score;
            }
        }
        cout << st.top() << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s:
        return
    stack = [0]
    for c in s:
        if c == '(':
            stack.append(0)
        else:
            v = stack.pop()
            stack[-1] += max(2 * v, 1)
    print(stack[0])
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        Stack<Integer> st = new Stack<>();
        st.push(0);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                st.push(0);
            } else {
                int v = st.pop();
                int score = Math.max(2 * v, 1);
                st.push(st.pop() + score);
            }
        }
        System.out.println(st.peek());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        let mut stack = vec![0];
        for c in s.chars() {
            if c == '(' {
                stack.push(0);
            } else {
                let v = stack.pop().unwrap();
                let score = cmp::max(2 * v, 1);
                let last_idx = stack.len() - 1;
                stack[last_idx] += score;
            }
        }
        writeln!(out, "{}", stack[0]).unwrap();
    }
}`,
        },
    },

    // ==================== MEDIUM #7: Exclusive Time of Functions ====================
    {
        title: 'Exclusive Time of Functions',
        description:
            'On a single-threaded CPU, we execute a program containing n functions. Each function has a unique ID from 0 to n-1.\n\nFunction calls are logged in a list of logs, where each log is formatted as: "function_id:start_or_end:timestamp". For example, "0:start:3" means function 0 starts at the beginning of timestamp 3. "1:end:5" means function 1 ends at the end of timestamp 5.\n\nNote that a function\'s exclusive time is the sum of execution times for all function calls in the program. For example, if a function starts at 2 and ends at 5, it runs for 5 - 2 + 1 = 4 units of time. If a function is paused by another function call, the time spent on the second function is NOT counted towards the first function\'s exclusive time.\n\nGiven the logs sorted by timestamp, return the exclusive time of each function.\n\n**Input Format:**\n- First line: two integers n (number of functions) and m (number of logs)\n- Next m lines: each line contains a log in the format "function_id:start_or_end:timestamp"\n\n**Output Format:**\n- Print n space-separated integers representing the exclusive time of each function from ID 0 to n-1.',
        difficulty: 'MEDIUM',
        tags: ['stack', 'simulation'],
        constraints: '1 <= n <= 100\n2 <= m <= 500\nm is an even number.\n0 <= function_id < n\n0 <= timestamp <= 10^9\nLogs are sorted chronologically by timestamp. Logs are valid (every start has a matching end, etc.).',
        hints: 'Use a stack of function IDs. Keep track of the previous timestamp. When you see a \'start\' log, if the stack is not empty, add the time elapsed to the function on top of the stack, then push the new function. When you see an \'end\' log, pop the top function and add the time elapsed (plus 1) to its exclusive time.',
        editorial:
            '**Approach: Stack Simulation**\n\n1. Maintain a stack `st` of active function IDs.\n2. Keep a variable `prev_time` initialized to `0`.\n3. Iterate through each log:\n   - Parse the log into `id`, `type`, and `timestamp`.\n   - If `type` is "start":\n     - If the stack is not empty, the function at `st.top()` has been running from `prev_time` to `timestamp - 1`. Add `timestamp - prev_time` to its exclusive time.\n     - Push the current `id` to the stack.\n     - Update `prev_time = timestamp`.\n   - If `type` is "end":\n     - The function on top of the stack (which must be `id`) has been running from `prev_time` to `timestamp`. Add `timestamp - prev_time + 1` to its exclusive time.\n     - Pop `id` from the stack.\n     - Update `prev_time = timestamp + 1`.\n4. Output the exclusive times for all functions.\n\n**Time Complexity:** O(m) where m is the number of logs.\n**Space Complexity:** O(m) to store function IDs in the stack.',
        examples: [
            {
                title: 'Example 1',
                input: '2 4\n0:start:0\n1:start:2\n1:end:5\n0:end:6',
                output: '3 4',
                explanation: 'Function 0 starts at time 0 and runs for 2 units (times 0 and 1).\nFunction 1 starts at time 2 and runs for 4 units (times 2, 3, 4, 5).\nFunction 0 resumes at time 6 and runs for 1 unit (time 6).\nSo function 0 has exclusive time 2 + 1 = 3, and function 1 has exclusive time 4.',
            },
            {
                title: 'Example 2',
                input: '1 2\n0:start:0\n0:end:0',
                output: '1',
                explanation: 'Function 0 starts at 0 and ends at 0, consuming 1 unit of time.',
            },
        ],
        testcases: [
            { input: '2 4\n0:start:0\n1:start:2\n1:end:5\n0:end:6', output: '3 4' },
            { input: '1 2\n0:start:0\n0:end:0', output: '1' },
            { input: '1 4\n0:start:0\n0:start:2\n0:end:5\n0:end:6', output: '7' },
            { input: '2 6\n0:start:0\n0:start:2\n0:end:5\n1:start:6\n1:end:6\n0:end:7', output: '7 1' },
            { input: '3 6\n0:start:0\n1:start:2\n2:start:3\n2:end:4\n1:end:5\n0:end:6', output: '3 2 2' },
            { input: '1 6\n0:start:0\n0:start:1\n0:start:2\n0:end:3\n0:end:4\n0:end:5', output: '6' },
            { input: '2 4\n0:start:0\n0:end:5\n1:start:6\n1:end:10', output: '6 5' },
            { input: '2 4\n0:start:0\n1:start:5\n1:end:6\n0:end:10', output: '9 2' },
            { input: '3 6\n0:start:0\n1:start:3\n1:end:4\n2:start:5\n2:end:8\n0:end:10', output: '5 2 4' },
            { input: '4 8\n0:start:0\n1:start:1\n2:start:2\n3:start:3\n3:end:4\n2:end:5\n1:end:6\n0:end:7', output: '2 2 2 2' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (cin >> n >> m) {
        vector<int> res(n, 0);
        stack<int> st;
        int prev_time = 0;
        for (int i = 0; i < m; i++) {
            string s;
            cin >> s;
            size_t colon1 = s.find(':');
            size_t colon2 = s.rfind(':');
            int fid = stoi(s.substr(0, colon1));
            string type = s.substr(colon1 + 1, colon2 - colon1 - 1);
            int timestamp = stoi(s.substr(colon2 + 1));
            
            if (type == "start") {
                if (!st.empty()) {
                    res[st.top()] += timestamp - prev_time;
                }
                st.push(fid);
                prev_time = timestamp;
            } else {
                res[st.top()] += timestamp - prev_time + 1;
                st.pop();
                prev_time = timestamp + 1;
            }
        }
        for (int i = 0; i < n; i++) {
            if (i > 0) cout << " ";
            cout << res[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    m = int(data[1])
    logs = data[2:]
    res = [0] * n
    stack = []
    prev_time = 0
    for log in logs:
        parts = log.split(':')
        fid = int(parts[0])
        action = parts[1]
        timestamp = int(parts[2])
        
        if action == 'start':
            if stack:
                res[stack[-1]] += timestamp - prev_time
            stack.append(fid)
            prev_time = timestamp
        else:
            res[stack[-1]] += timestamp - prev_time + 1
            stack.pop()
            prev_time = timestamp + 1
    print(*(res))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        StringTokenizer st1 = new StringTokenizer(line1);
        int n = Integer.parseInt(st1.nextToken());
        int m = Integer.parseInt(st1.nextToken());
        
        int[] res = new int[n];
        Stack<Integer> st = new Stack<>();
        int prevTime = 0;
        
        for (int i = 0; i < m; i++) {
            String log = br.readLine();
            if (log == null) break;
            log = log.trim();
            if (log.isEmpty()) { i--; continue; }
            String[] parts = log.split(":");
            int fid = Integer.parseInt(parts[0]);
            String type = parts[1];
            int timestamp = Integer.parseInt(parts[2]);
            
            if (type.equals("start")) {
                if (!st.isEmpty()) {
                    res[st.peek()] += timestamp - prevTime;
                }
                st.push(fid);
                prevTime = timestamp;
            } else {
                res[st.peek()] += timestamp - prevTime + 1;
                st.pop();
                prevTime = timestamp + 1;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(res[i]);
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        let parts: Vec<&str> = line1.trim().split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let m: usize = parts[1].parse().unwrap();
        let mut res = vec![0; n];
        let mut stack = Vec::new();
        let mut prev_time = 0;
        for _ in 0..m {
            if let Some(Ok(line)) = lines.next() {
                let log = line.trim();
                if log.is_empty() { continue; }
                let parts: Vec<&str> = log.split(':').collect();
                let fid: usize = parts[0].parse().unwrap();
                let action = parts[1];
                let timestamp: i32 = parts[2].parse().unwrap();
                
                if action == "start" {
                    if !stack.is_empty() {
                        let top = *stack.last().unwrap();
                        res[top] += timestamp - prev_time;
                    }
                    stack.push(fid);
                    prev_time = timestamp;
                } else {
                    let top = stack.pop().unwrap();
                    res[top] += timestamp - prev_time + 1;
                    prev_time = timestamp + 1;
                }
            }
        }
        let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
        writeln!(out, "{}", strs.join(" ")).unwrap();
    }
}`,
        },
    },

    // ==================== HARD #6: Longest Valid Parentheses ====================
    {
        title: 'Longest Valid Parentheses',
        description:
            'Given a string containing just the characters \'(\' and \')\', return the length of the longest valid (well-formed) parentheses substring.\n\n**Input Format:**\n- A single line containing the parentheses string s.\n\n**Output Format:**\n- A single integer representing the length of the longest valid parentheses substring. If the string is empty or contains no valid substring, print 0.',
        difficulty: 'HARD',
        tags: ['stack', 'dynamic-programming', 'strings'],
        constraints: '0 <= s.length <= 10^5\ns consists of only \'(\' and \')\'.',
        hints: 'Instead of pushing characters onto the stack, push indices. Start by pushing -1 onto the stack as a base index. When you see \'(\', push its index. When you see \')\', pop the top index. If the stack is empty, push the current index to act as a new base. If the stack is not empty, calculate the length of the current valid substring by subtracting the current stack top index from the current index.',
        editorial:
            '**Approach: Stack using Sentinel Base Index**\n\n1. Initialize a stack and push `-1` onto it. This `-1` acts as a base boundary for the current valid substring.\n2. Initialize `max_len = 0`.\n3. Iterate through each character `s[i]` in the string:\n   - If `s[i]` is \'(\', push the index `i` onto the stack.\n   - If `s[i]` is \')\', pop the top index from the stack.\n     - If the stack becomes empty, it means we have an unmatched \')\', so we push the current index `i` onto the stack to serve as the new base boundary.\n     - If the stack is not empty, the length of the currently matched valid parentheses substring is `i - st.top()`. Update `max_len = max(max_len, i - st.top())`.\n4. Print `max_len`.\n\nThis single pass approach processes each character in O(1) time.\n\n**Time Complexity:** O(N) where N is the length of the string.\n**Space Complexity:** O(N) to store indices in the stack in the worst case.',
        examples: [
            {
                title: 'Example 1',
                input: '(()',
                output: '2',
                explanation: 'The longest valid parentheses substring is "()", which has length 2.',
            },
            {
                title: 'Example 2',
                input: ')()())',
                output: '4',
                explanation: 'The longest valid parentheses substring is "()()", which has length 4.',
            },
        ],
        testcases: [
            { input: '(()', output: '2' },
            { input: ')()())', output: '4' },
            { input: '', output: '0' },
            { input: '()()', output: '4' },
            { input: '((()))', output: '6' },
            { input: '()(()()', output: '4' },
            { input: ')(', output: '0' },
            { input: '(()))())()', output: '4' },
            { input: '(((())(()())', output: '10' },
            { input: '()()()()()', output: '10' },
        ],
        codesnippets: { cpp: CPP_BASIC, python: PYTHON_BASIC, java: JAVA_BASIC, rust: RUST_BASIC },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (cin >> s) {
        stack<int> st;
        st.push(-1);
        int max_len = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.empty()) {
                    st.push(i);
                } else {
                    max_len = max(max_len, i - st.top());
                }
            }
        }
        cout << max_len << "\\n";
    } else {
        cout << 0 << "\\n";
    }
    return 0;
}`,
            python: `import sys
def main():
    s = sys.stdin.read().strip()
    if not s:
        print(0)
        return
    stack = [-1]
    max_len = 0
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    print(max_len)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) { System.out.println(0); return; }
        s = s.trim();
        Stack<Integer> st = new Stack<>();
        st.push(-1);
        int maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.isEmpty()) {
                    st.push(i);
                } else {
                    maxLen = Math.max(maxLen, i - st.peek());
                }
            }
        }
        System.out.println(maxLen);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let s = line.trim();
        let mut stack = vec![-1i32];
        let mut max_len = 0;
        for (i, c) in s.chars().enumerate() {
            let idx = i as i32;
            if c == '(' {
                stack.push(idx);
            } else {
                stack.pop();
                if stack.is_empty() {
                    stack.push(idx);
                } else {
                    max_len = cmp::max(max_len, idx - stack.last().unwrap());
                }
            }
        }
        writeln!(out, "{}", max_len).unwrap();
    } else {
        writeln!(out, "0").unwrap();
    }
}`,
        },
    },
]
