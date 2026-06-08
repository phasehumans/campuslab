import type { SeedProblem } from './types.js'

export const twoPointersSlidingProblems: SeedProblem[] = [
    // ==================== EASY #1: Remove Element In-Place ====================
    {
        title: "Remove Element In-Place",
        description: "Given an array `arr` and an integer `val`, remove all occurrences of `val` in-place and return the new length `k`.\n\nTo make the output deterministic, print:\n1. The new length `k` on the first line.\n2. The first `k` elements of the modified array in sorted order, space-separated, on the second line.\n\nYou must do this in-place with O(1) extra space.\n\n**Input Format:**\n- First line: two integers `n` (the size of the array) and `val`, space-separated.\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- First line: the new length `k`.\n- Second line: the first `k` elements of the modified array sorted in ascending order, space-separated.",
        difficulty: "EASY",
        tags: ["two-pointers", "arrays"],
        constraints: "0 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9\n-10^9 <= val <= 10^9",
        hints: "Use a write pointer to keep track of the position of the next element that is not equal to val.",
        editorial: "Use two pointers: one reader pointer scanning the array and one writer pointer incrementing only when the current element is not equal to val. Finally, sort the first k elements to match the requested output format.\n\n**Time Complexity:** O(n log n) due to sorting for printing, but O(n) for the in-place deletion.\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "4 3\n3 2 2 3", output: "2\n2 2", explanation: "After removing all 3s, the array has length 2. The remaining elements are [2, 2]." },
            { title: "Example 2", input: "8 2\n0 1 2 2 3 0 4 2", output: "5\n0 0 1 3 4", explanation: "After removing all 2s, the remaining elements are [0, 1, 3, 0, 4]. Sorted: [0, 0, 1, 3, 4]." }
        ],
        testcases: [
            { input: "4 3\n3 2 2 3", output: "2\n2 2" },
            { input: "8 2\n0 1 2 2 3 0 4 2", output: "5\n0 0 1 3 4" },
            { input: "1 5\n5", output: "0\n" },
            { input: "1 5\n3", output: "1\n3" },
            { input: "5 1\n1 1 1 1 1", output: "0\n" },
            { input: "6 3\n1 2 4 5 6 7", output: "6\n1 2 4 5 6 7" },
            { input: "10 9\n9 1 9 2 9 3 9 4 9 5", output: "5\n1 2 3 4 5" },
            { input: "7 0\n0 0 0 1 0 0 0", output: "1\n1" },
            { input: "8 7\n7 8 7 8 7 8 7 8", output: "4\n8 8 8 8" },
            { input: "12 4\n4 1 4 2 4 3 4 5 4 6 4 7", output: "7\n1 2 3 5 6 7" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, val, and elements, then solve
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, val;
    if (!(cin >> n >> val)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != val) {
            arr[k++] = arr[i];
        }
    }
    sort(arr.begin(), arr.begin() + k);
    cout << k << "\n";
    for (int i = 0; i < k; i++) {
        cout << arr[i] << (i == k - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    val = int(data[1])
    arr = [int(x) for x in data[2:2+n]]
    k = 0
    for i in range(n):
        if arr[i] != val:
            arr[k] = arr[i]
            k += 1
    sub = sorted(arr[:k])
    print(k)
    print(" ".join(map(str, sub)))
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
        int val = Integer.parseInt(st.nextToken());
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int k = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] != val) {
                arr[k++] = arr[i];
            }
        }
        Arrays.sort(arr, 0, k);
        System.out.println(k);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) sb.append(" ");
            sb.append(arr[i]);
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
    let first_line = match lines.next() {
        Some(Ok(l)) => l,
        _ => return,
    };
    let parts: Vec<i32> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0] as usize;
    let val = parts[1];
    let mut arr = Vec::new();
    if n > 0 {
        if let Some(Ok(second_line)) = lines.next() {
            arr = second_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        }
    }
    let mut k = 0;
    for i in 0..n {
        if arr[i] != val {
            arr[k] = arr[i];
            k += 1;
        }
    }
    arr[0..k].sort();
    writeln!(out, "{}", k).unwrap();
    for i in 0..k {
        if i > 0 { write!(out, " ").unwrap(); }
        write!(out, "{}", arr[i]).unwrap();
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== EASY #2: Move All Zeroes ====================
    {
        title: "Move All Zeroes",
        description: "Given an integer array `arr`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.\n\nYou must do this in-place without making a copy of the array.\n\n**Input Format:**\n- First line: integer `n` (the size of the array).\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single line containing `n` space-separated integers representing the modified array.",
        difficulty: "EASY",
        tags: ["two-pointers", "arrays"],
        constraints: "1 <= n <= 10^5\n-2^31 <= arr[i] <= 2^31 - 1",
        hints: "Keep a pointer to the position of the last non-zero element found so far.",
        editorial: "Iterate through the array. Whenever a non-zero element is encountered, swap it with the element at the write pointer, then increment the write pointer.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "5\n0 1 0 3 12", output: "1 3 12 0 0", explanation: "All zeroes are moved to the end, while non-zero elements retain their relative order." },
            { title: "Example 2", input: "1\n0", output: "0", explanation: "Only one element, which is 0. Output remains 0." }
        ],
        testcases: [
            { input: "5\n0 1 0 3 12", output: "1 3 12 0 0" },
            { input: "1\n0", output: "0" },
            { input: "3\n0 0 0", output: "0 0 0" },
            { input: "4\n1 2 3 4", output: "1 2 3 4" },
            { input: "6\n0 0 1 0 2 0", output: "1 2 0 0 0 0" },
            { input: "5\n4 2 0 0 1", output: "4 2 1 0 0" },
            { input: "2\n0 5", output: "5 0" },
            { input: "8\n0 1 0 3 0 5 0 7", output: "1 3 5 7 0 0 0 0" },
            { input: "10\n0 0 0 0 0 0 0 0 0 1", output: "1 0 0 0 0 0 0 0 0 0" },
            { input: "7\n9 0 8 0 7 0 6", output: "9 8 7 6 0 0 0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and array, then solve
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int write = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            swap(arr[write++], arr[i]);
        }
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    write = 0
    for i in range(n):
        if arr[i] != 0:
            arr[write], arr[i] = arr[i], arr[write]
            write += 1
    print(" ".join(map(str, arr)))
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
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int write = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] != 0) {
                int temp = arr[write];
                arr[write] = arr[i];
                arr[i] = temp;
                write++;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(arr[i]);
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
    let n: usize = match lines.next() {
        Some(Ok(line)) => line.trim().parse().unwrap(),
        _ => return,
    };
    let mut arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut write = 0;
    for i in 0..n {
        if arr[i] != 0 {
            arr.swap(write, i);
            write += 1;
        }
    }
    for i in 0..n {
        if i > 0 { write!(out, " ").unwrap(); }
        write!(out, "{}", arr[i]).unwrap();
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== EASY #3: Squares of Sorted Array ====================
    {
        title: "Squares of Sorted Array",
        description: "Given an integer array `arr` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.\n\nTry to solve it in O(n) time using two pointers.\n\n**Input Format:**\n- First line: integer `n` (the size of the array).\n- Second line: `n` space-separated integers sorted in non-decreasing order.\n\n**Output Format:**\n- A single line containing `n` space-separated integers representing the sorted squares.",
        difficulty: "EASY",
        tags: ["two-pointers", "arrays"],
        constraints: "1 <= n <= 10^5\n-10^4 <= arr[i] <= 10^4\narr is sorted in non-decreasing order",
        hints: "Since the array is sorted, the absolute values of the elements are largest at both ends. Compare elements from both ends.",
        editorial: "Initialize two pointers at the start and end of the array. Compare the absolute values of the elements at these pointers, square the larger one, place it at the end of the result array, and move the corresponding pointer.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for the output array.",
        examples: [
            { title: "Example 1", input: "5\n-4 -1 0 3 10", output: "0 1 9 16 100", explanation: "Squares: [16, 1, 0, 9, 100]. Sorted: [0, 1, 9, 16, 100]." },
            { title: "Example 2", input: "4\n-7 -3 2 3", output: "4 9 9 49", explanation: "Squares: [49, 9, 4, 9]. Sorted: [4, 9, 9, 49]." }
        ],
        testcases: [
            { input: "5\n-4 -1 0 3 10", output: "0 1 9 16 100" },
            { input: "4\n-7 -3 2 3", output: "4 9 9 49" },
            { input: "1\n-5", output: "25" },
            { input: "3\n-2 -1 0", output: "0 1 4" },
            { input: "3\n0 1 2", output: "0 1 4" },
            { input: "6\n-10 -5 -2 0 1 8", output: "0 4 1 25 64 100" },
            { input: "8\n-4 -4 -3 0 1 2 4 5", output: "0 1 4 9 16 16 16 25" },
            { input: "5\n-2 -2 -2 -2 -2", output: "4 4 4 4 4" },
            { input: "6\n-3 -2 -1 1 2 3", output: "1 1 4 4 9 9" },
            { input: "10\n-10 -9 -8 -7 -6 5 6 7 8 9", output: "25 36 36 49 49 64 64 81 81 100" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read sorted array and solve in O(n)
    
    return 0;
}`,
            python: `def main():
    # Read input and solve in O(n)
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<int> res(n);
    int left = 0, right = n - 1;
    for (int i = n - 1; i >= 0; i--) {
        if (abs(arr[left]) > abs(arr[right])) {
            res[i] = arr[left] * arr[left];
            left++;
        } else {
            res[i] = arr[right] * arr[right];
            right--;
        }
    }
    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    res = [0] * n
    left = 0
    right = n - 1
    for i in range(n - 1, -1, -1):
        if abs(arr[left]) > abs(arr[right]):
            res[i] = arr[left] ** 2
            left += 1
        else:
            res[i] = arr[right] ** 2
            right -= 1
    print(" ".join(map(str, res)))
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
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int[] res = new int[n];
        int left = 0, right = n - 1;
        for (int i = n - 1; i >= 0; i--) {
            if (Math.abs(arr[left]) > Math.abs(arr[right])) {
                res[i] = arr[left] * arr[left];
                left++;
            } else {
                res[i] = arr[right] * arr[right];
                right--;
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
    let n: usize = match lines.next() {
        Some(Ok(line)) => line.trim().parse().unwrap(),
        _ => return,
    };
    let arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut res = vec![0; n];
    let mut left = 0;
    let mut right = n as i32 - 1;
    for i in (0..n).rev() {
        if arr[left as usize].abs() > arr[right as usize].abs() {
            res[i] = arr[left as usize] * arr[left as usize];
            left += 1;
        } else {
            res[i] = arr[right as usize] * arr[right as usize];
            right -= 1;
        }
    }
    for i in 0..n {
        if i > 0 { write!(out, " ").unwrap(); }
        write!(out, "{}", res[i]).unwrap();
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== EASY #4: Is Subsequence ====================
    {
        title: "Is Subsequence",
        description: "Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.\n\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.\n\n**Input Format:**\n- First line: string `s`.\n- Second line: string `t`.\n\n**Output Format:**\n- Print \"true\" or \"false\".",
        difficulty: "EASY",
        tags: ["two-pointers", "strings"],
        constraints: "0 <= |s| <= 10^5\n0 <= |t| <= 10^5\ns and t consist only of lowercase English letters",
        hints: "Use two pointers to scan both strings simultaneously. Advance the pointer for s only when a match is found.",
        editorial: "Maintain a pointer for each string. Scan t character by character. If the character matches the current character in s, increment the pointer for s. If the pointer for s reaches the end, s is a subsequence.\n\n**Time Complexity:** O(|t|)\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "abc\nahbgdc", output: "true", explanation: "We can find 'a', 'b', and 'c' in order in the string 'ahbgdc'." },
            { title: "Example 2", input: "axc\nahbgdc", output: "false", explanation: "'x' does not appear in 'ahbgdc', so 'axc' is not a subsequence." }
        ],
        testcases: [
            { input: "abc\nahbgdc", output: "true" },
            { input: "axc\nahbgdc", output: "false" },
            { input: "a\na", output: "true" },
            { input: "a\nb", output: "false" },
            { input: "sing\nsomeinterestingthings", output: "true" },
            { input: "code\ncoooodde", output: "true" },
            { input: "abc\ncba", output: "false" },
            { input: "longstring\nlloonnngggssttrriinngg", output: "true" },
            { input: "xyz\nabc", output: "false" },
            { input: "hello\nhell", output: "false" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read strings s and t and check subsequence
    
    return 0;
}`,
            python: `def main():
    # Read s and t, then solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read s and t, then solve
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s, t;
    if (!(cin >> s >> t)) return 0;
    int i = 0, j = 0;
    while (i < s.length() && j < t.length()) {
        if (s[i] == t[j]) {
            i++;
        }
        j++;
    }
    if (i == s.length()) cout << "true\n";
    else cout << "false\n";
    return 0;
}`,
            python: `import sys
def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    s = lines[0]
    t = lines[1]
    i, j = 0, 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1
    print("true" if i == len(s) else "false")
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        String t = br.readLine();
        if (s == null || t == null) return;
        s = s.trim();
        t = t.trim();
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        System.out.println(i == s.length() ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let s = match lines.next() {
        Some(Ok(line)) => line.trim().to_string(),
        _ => return,
    };
    let t = match lines.next() {
        Some(Ok(line)) => line.trim().to_string(),
        _ => return,
    };
    let s_chars: Vec<char> = s.chars().collect();
    let t_chars: Vec<char> = t.chars().collect();
    let mut i = 0;
    let mut j = 0;
    while i < s_chars.len() && j < t_chars.len() {
        if s_chars[i] == t_chars[j] {
            i += 1;
        }
        j += 1;
    }
    if i == s_chars.len() {
        writeln!(out, "true").unwrap();
    } else {
        writeln!(out, "false").unwrap();
    }
}`
        }
    },

    // ==================== EASY #5: Check Palindrome Number ====================
    {
        title: "Check Palindrome Number",
        description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward. For example, `121` is a palindrome while `-121` is not because it becomes `121-` when read from right to left.\n\n**Input Format:**\n- A single line containing the integer `x`.\n\n**Output Format:**\n- Print \"true\" or \"false\".",
        difficulty: "EASY",
        tags: ["two-pointers"],
        constraints: "-2^31 <= x <= 2^31 - 1",
        hints: "A negative number cannot be a palindrome. For non-negative integers, you can either reverse the number numerically or check characters of its string representation from both ends.",
        editorial: "Convert the number to its string representation. If the string starts with '-', it is false. Otherwise, use two pointers from both ends of the string to check if characters match.\n\n**Time Complexity:** O(number of digits in x)\n**Space Complexity:** O(number of digits in x) for string storage.",
        examples: [
            { title: "Example 1", input: "121", output: "true", explanation: "121 reads as 121 from left to right and right to left." },
            { title: "Example 2", input: "-121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." }
        ],
        testcases: [
            { input: "121", output: "true" },
            { input: "-121", output: "false" },
            { input: "10", output: "false" },
            { input: "0", output: "true" },
            { input: "12321", output: "true" },
            { input: "123321", output: "true" },
            { input: "123456", output: "false" },
            { input: "-101", output: "false" },
            { input: "1", output: "true" },
            { input: "1000000001", output: "true" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read x and check palindrome
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    bool is_pal = true;
    if (s[0] == '-') {
        is_pal = false;
    } else {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i] != s[j]) {
                is_pal = false;
                break;
            }
            i++;
            j--;
        }
    }
    cout << (is_pal ? "true" : "false") << "\n";
    return 0;
}`,
            python: `import sys
def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    if line.startswith('-'):
        print("false")
    else:
        print("true" if line == line[::-1] else "false")
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        boolean isPal = true;
        if (s.startsWith("-")) {
            isPal = false;
        } else {
            int i = 0, j = s.length() - 1;
            while (i < j) {
                if (s.charAt(i) != s.charAt(j)) {
                    isPal = false;
                    break;
                }
                i++;
                j--;
            }
        }
        System.out.println(isPal ? "true" : "false");
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
        if s.starts_with('-') {
            writeln!(out, "false").unwrap();
        } else {
            let chars: Vec<char> = s.chars().collect();
            let mut is_pal = true;
            let mut i = 0;
            let mut j = chars.len() as i32 - 1;
            while i < j {
                if chars[i as usize] != chars[j as usize] {
                    is_pal = false;
                    break;
                }
                i += 1;
                j -= 1;
            }
            writeln!(out, "{}", is_pal).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #1: Three Sum to Zero ====================
    {
        title: "Three Sum to Zero",
        description: "Given an integer array `arr`, return all unique triplets `[arr[i], arr[j], arr[k]]` such that `i != j`, `i != k`, and `j != k`, and `arr[i] + arr[j] + arr[k] == 0`.\n\nTo make the output deterministic:\n- Print each triplet on a new line, space-separated.\n- The elements within each triplet must be sorted in ascending order.\n- The triplets themselves must be sorted lexicographically.\n\n**Input Format:**\n- First line: integer `n` (the size of the array).\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- All unique triplets sorted lexicographically, each on a new line.",
        difficulty: "MEDIUM",
        tags: ["two-pointers", "arrays"],
        constraints: "3 <= n <= 3000\n-10^5 <= arr[i] <= 10^5",
        hints: "Sort the array first. Then, loop through each element and use the two-pointer technique to find two other elements that sum to its negation.",
        editorial: "Sort the array. For each element arr[i], if it is positive, we can stop. Otherwise, avoid duplicates by checking if arr[i] == arr[i-1]. Use two pointers left = i + 1 and right = n - 1 to find pairs summing to -arr[i]. Skip duplicates during the two-pointer step as well.\n\n**Time Complexity:** O(n^2)\n**Space Complexity:** O(log n) or O(n) for sorting depending on the language.",
        examples: [
            { title: "Example 1", input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1", explanation: "The unique triplets are [-1, -1, 2] and [-1, 0, 1]." },
            { title: "Example 2", input: "3\n0 1 1", output: "", explanation: "No triplet sums up to 0." }
        ],
        testcases: [
            { input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1" },
            { input: "3\n0 1 1", output: "" },
            { input: "3\n0 0 0", output: "0 0 0" },
            { input: "9\n-2 0 1 1 2 -1 -4 0 -2", output: "-2 0 2\n-2 1 1\n-1 0 1" },
            { input: "5\n-1 -1 -1 2 2", output: "-1 -1 2" },
            { input: "8\n-5 1 2 3 4 -2 -1 -3", output: "-5 1 4\n-5 2 3\n-3 -1 4\n-3 1 2\n-2 -1 3" },
            { input: "4\n1 -1 -1 0", output: "" },
            { input: "10\n-4 -3 -2 -1 0 1 2 3 4 5", output: "-4 -1 5\n-4 0 4\n-4 1 3\n-3 -2 5\n-3 -1 4\n-3 0 3\n-3 1 2\n-2 -1 3\n-2 0 2\n-1 0 1" },
            { input: "7\n-3 0 1 2 -1 -1 2", output: "-3 1 2\n-1 -1 2\n-1 0 1" },
            { input: "12\n4 -2 -2 0 1 2 -1 -4 3 -1 0 2", output: "-4 0 4\n-4 1 3\n-4 2 2\n-2 -2 4\n-2 -1 3\n-2 0 2\n-1 -1 2\n-1 0 1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve 3-Sum to 0
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    for (int i = 0; i < n; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int sum = arr[i] + arr[l] + arr[r];
            if (sum == 0) {
                cout << arr[i] << " " << arr[l] << " " << arr[r] << "\n";
                l++;
                r--;
                while (l < r && arr[l] == arr[l - 1]) l++;
                while (l < r && arr[r] == arr[r + 1]) r--;
            } else if (sum < 0) {
                l++;
            } else {
                r--;
            }
        }
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
    arr = [int(x) for x in data[1:]]
    arr.sort()
    for i in range(n):
        if i > 0 and arr[i] == arr[i - 1]:
            continue
        l, r = i + 1, n - 1
        while l < r:
            s = arr[i] + arr[l] + arr[r]
            if s == 0:
                print(f"{arr[i]} {arr[l]} {arr[r]}")
                l += 1
                r -= 1
                while l < r and arr[l] == arr[l - 1]:
                    l += 1
                while l < r and arr[r] == arr[r + 1]:
                    r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
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
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(arr);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0 && arr[i] == arr[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = arr[i] + arr[l] + arr[r];
                if (sum == 0) {
                    sb.append(arr[i]).append(" ").append(arr[l]).append(" ").append(arr[r]).append("\n");
                    l++;
                    r--;
                    while (l < r && arr[l] == arr[l - 1]) l++;
                    while (l < r && arr[r] == arr[r + 1]) r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
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
    let n: usize = match lines.next() {
        Some(Ok(line)) => line.trim().parse().unwrap(),
        _ => return,
    };
    let mut arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    arr.sort();
    for i in 0..n {
        if i > 0 && arr[i] == arr[i - 1] { continue; }
        let mut l = i + 1;
        let mut r = n as i32 - 1;
        while l < r as usize {
            let sum = arr[i] + arr[l] + arr[r as usize];
            if sum == 0 {
                writeln!(out, "{} {} {}", arr[i], arr[l], arr[r as usize]).unwrap();
                l += 1;
                r -= 1;
                while l < r as usize && arr[l] == arr[l - 1] { l += 1; }
                while l < r as usize && arr[r as usize] == arr[r as usize + 1] { r -= 1; }
            } else if sum < 0 {
                l += 1;
            } else {
                r -= 1;
            }
        }
    }
}`
        }
    },

    // ==================== MEDIUM #2: Container With Most Water ====================
    {
        title: "Container With Most Water",
        description: "Given `n` non-negative integers `arr` representing line heights, find two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n**Input Format:**\n- First line: integer `n`.\n- Second line: `n` space-separated heights.\n\n**Output Format:**\n- A single integer representing the maximum water container area.",
        difficulty: "MEDIUM",
        tags: ["two-pointers", "arrays"],
        constraints: "2 <= n <= 10^5\n0 <= arr[i] <= 10^4",
        hints: "Start with the widest container using two pointers at both ends of the array. Move the pointer pointing to the shorter line inward.",
        editorial: "Initialize two pointers, left = 0 and right = n - 1. Calculate the area as (right - left) * min(arr[left], arr[right]). Move the pointer with the smaller height, since moving the larger one can never increase the container height.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "9\n1 8 6 2 5 4 8 3 7", output: "49", explanation: "The max area of water is obtained between index 1 (height 8) and index 8 (height 7). Area = (8 - 1) * min(8, 7) = 7 * 7 = 49." },
            { title: "Example 2", input: "2\n1 1", output: "1", explanation: "The two elements form a container of width 1 and height 1. Area = 1." }
        ],
        testcases: [
            { input: "9\n1 8 6 2 5 4 8 3 7", output: "49" },
            { input: "2\n1 1", output: "1" },
            { input: "2\n4 3", output: "3" },
            { input: "5\n1 2 1 2 1", output: "4" },
            { input: "10\n10 9 8 7 6 5 4 3 2 1", output: "25" },
            { input: "5\n3 1 2 4 5", output: "12" },
            { input: "8\n2 3 4 5 18 17 6 7", output: "21" },
            { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "25" },
            { input: "6\n10 100 100 10 10 10", output: "100" },
            { input: "12\n12 1 2 3 4 5 6 7 8 9 10 11", output: "121" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Container With Most Water
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int l = 0, r = n - 1;
    long long max_water = 0;
    while (l < r) {
        long long width = r - l;
        long long h = min(arr[l], arr[r]);
        max_water = max(max_water, width * h);
        if (arr[l] < arr[r]) {
            l++;
        } else {
            r--;
        }
    }
    cout << max_water << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    l, r = 0, n - 1
    max_water = 0
    while l < r:
        width = r - l
        h = min(arr[l], arr[r])
        max_water = max(max_water, width * h)
        if arr[l] < arr[r]:
            l += 1
        else:
            r -= 1
    print(max_water)
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
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int l = 0, r = n - 1;
        long maxWater = 0;
        while (l < r) {
            long width = r - l;
            long h = Math.min(arr[l], arr[r]);
            maxWater = Math.max(maxWater, width * h);
            if (arr[l] < arr[r]) {
                l++;
            } else {
                r--;
            }
        }
        System.out.println(maxWater);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = match lines.next() {
        Some(Ok(line)) => line.trim().parse().unwrap(),
        _ => return,
    };
    let arr: Vec<i64> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut l = 0;
    let mut r = n - 1;
    let mut max_water = 0i64;
    while l < r {
        let width = (r - l) as i64;
        let h = cmp::min(arr[l], arr[r]);
        max_water = cmp::max(max_water, width * h);
        if arr[l] < arr[r] {
            l += 1;
        } else {
            r -= 1;
        }
    }
    writeln!(out, "{}", max_water).unwrap();
}`
        }
    },

    // ==================== MEDIUM #3: Max Consecutive Ones with K Flips ====================
    {
        title: "Max Consecutive Ones with K Flips",
        description: "Given a binary array `arr` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`s.\n\n**Input Format:**\n- First line: two space-separated integers `n` (size of the array) and `k` (max flips).\n- Second line: `n` space-separated integers (either 0 or 1).\n\n**Output Format:**\n- A single integer representing the maximum consecutive 1s.",
        difficulty: "MEDIUM",
        tags: ["sliding-window", "arrays"],
        constraints: "1 <= n <= 10^5\n0 <= k <= n\narr[i] is either 0 or 1",
        hints: "Use a sliding window. Expand the right boundary. If the count of zeroes in the window exceeds k, shrink the left boundary until the count of zeroes is <= k.",
        editorial: "Maintain a sliding window [left, right] and track the number of zeroes inside it. If zero_count > k, increment left until zero_count <= k. The maximum window size (right - left + 1) during the traversal is the answer.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "11 2\n1 1 1 0 0 0 1 1 1 1 0", output: "6", explanation: "Flipping at most two zeroes gives 6 consecutive ones: 1 1 1 0 0 [0 1 1 1 1 0] -> [1 1 1 1 1 1] after flipping." },
            { title: "Example 2", input: "19 3\n0 0 1 1 0 0 1 1 1 0 1 1 0 0 0 1 1 1 1", output: "10", explanation: "Flip the zeroes at indices 5, 9, and 12 to get 10 consecutive ones." }
        ],
        testcases: [
            { input: "11 2\n1 1 1 0 0 0 1 1 1 1 0", output: "6" },
            { input: "19 3\n0 0 1 1 0 0 1 1 1 0 1 1 0 0 0 1 1 1 1", output: "10" },
            { input: "5 0\n1 0 1 1 0", output: "2" },
            { input: "6 1\n0 0 0 0 0 0", output: "1" },
            { input: "6 5\n0 0 0 0 0 0", output: "5" },
            { input: "6 6\n0 0 0 0 0 0", output: "6" },
            { input: "8 2\n1 0 0 1 0 0 1 1", output: "5" },
            { input: "10 1\n1 1 1 1 1 1 1 1 1 1", output: "10" },
            { input: "15 2\n1 0 0 0 1 1 0 0 1 0 1 1 0 1 1", output: "7" },
            { input: "20 4\n1 0 0 1 1 0 1 0 1 1 1 0 0 0 1 1 1 1 0 1", output: "12" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Max Consecutive Ones with K Flips
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int left = 0, zero_count = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        if (arr[right] == 0) {
            zero_count++;
        }
        while (zero_count > k) {
            if (arr[left] == 0) {
                zero_count--;
            }
            left++;
        }
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    left = 0
    zero_count = 0
    ans = 0
    for right in range(n):
        if arr[right] == 0:
            zero_count += 1
        while zero_count > k:
            if arr[left] == 0:
                zero_count -= 1
            left += 1
        ans = max(ans, right - left + 1)
    print(ans)
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
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        int left = 0, zeroCount = 0, ans = 0;
        for (int right = 0; right < n; right++) {
            if (arr[right] == 0) {
                zeroCount++;
            }
            while (zeroCount > k) {
                if (arr[left] == 0) {
                    zeroCount--;
                }
                left++;
            }
            ans = Math.max(ans, right - left + 1);
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<usize> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0];
    let k = parts[1];
    let arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut left = 0;
    let mut zero_count = 0;
    let mut ans = 0;
    for right in 0..n {
        if arr[right] == 0 {
            zero_count += 1;
        }
        while zero_count > k {
            if arr[left] == 0 {
                zero_count -= 1;
            }
            left += 1;
        }
        ans = cmp::max(ans, right - left + 1);
    }
    writeln!(out, "{}", ans).unwrap();
}`
        }
    },

    // ==================== MEDIUM #4: Fruits Into Baskets ====================
    {
        title: "Fruits Into Baskets",
        description: "You are visiting a farm that has a single row of fruit trees represented by an integer array `fruits` where `fruits[i]` is the type of fruit the `i`-th tree produces.\n\nYou have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.\nStarting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. Stop when you reach a tree with fruit of a type that cannot fit in your baskets.\n\nReturn the maximum number of fruits you can pick.\n\n**Input Format:**\n- First line: integer `n`.\n- Second line: `n` space-separated integers representing fruit types.\n\n**Output Format:**\n- A single integer representing the maximum fruits you can pick.",
        difficulty: "MEDIUM",
        tags: ["sliding-window", "arrays"],
        constraints: "1 <= n <= 10^5\n0 <= fruits[i] <= 10^5",
        hints: "This is equivalent to finding the longest contiguous subarray with at most 2 distinct integers. Use a sliding window and a hash map to count occurrences.",
        editorial: "Maintain a sliding window with a hash map of fruit counts. If map.size() > 2, increment the left pointer and decrement fruit counts in the map. Remove keys with 0 count. The answer is the maximum window size.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space (since the map size is at most 3).",
        examples: [
            { title: "Example 1", input: "3\n1 2 1", output: "3", explanation: "We can pick fruit types [1, 2, 1] which matches the two baskets restriction." },
            { title: "Example 2", input: "4\n0 1 2 2", output: "3", explanation: "We can pick [1, 2, 2]. If we start at the first tree, we get [0, 1] of length 2." }
        ],
        testcases: [
            { input: "3\n1 2 1", output: "3" },
            { input: "4\n0 1 2 2", output: "3" },
            { input: "5\n1 2 3 2 2", output: "4" },
            { input: "11\n3 3 3 1 2 1 1 2 3 3 4", output: "5" },
            { input: "1\n42", output: "1" },
            { input: "6\n1 1 1 1 1 1", output: "6" },
            { input: "8\n1 2 3 4 5 6 7 8", output: "2" },
            { input: "10\n1 2 1 3 4 3 4 3 5 6", output: "5" },
            { input: "12\n1 2 1 2 3 2 3 2 1 2 1 2", output: "5" },
            { input: "15\n1 1 2 2 3 3 2 2 3 3 1 1 1 2 2", output: "8" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Fruits Into Baskets
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    unordered_map<int, int> count;
    int left = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        count[arr[right]]++;
        while (count.size() > 2) {
            count[arr[left]]--;
            if (count[arr[left]] == 0) {
                count.erase(arr[left]);
            }
            left++;
        }
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    arr = [int(x) for x in data[1:]]
    count = {}
    left = 0
    ans = 0
    for right in range(n):
        count[arr[right]] = count.get(arr[right], 0) + 1
        while len(count) > 2:
            count[arr[left]] -= 1
            if count[arr[left]] == 0:
                del count[arr[left]]
            left += 1
        ans = max(ans, right - left + 1)
    print(ans)
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
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, ans = 0;
        for (int right = 0; right < n; right++) {
            count.put(arr[right], count.getOrDefault(arr[right], 0) + 1);
            while (count.size() > 2) {
                count.put(arr[left], count.get(arr[left]) - 1);
                if (count.get(arr[left]) == 0) {
                    count.remove(arr[left]);
                }
                left++;
            }
            ans = Math.max(ans, right - left + 1);
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::HashMap;
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let n: usize = match lines.next() {
        Some(Ok(line)) => line.trim().parse().unwrap(),
        _ => return,
    };
    let arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut count = HashMap::new();
    let mut left = 0;
    let mut ans = 0;
    for right in 0..n {
        *count.entry(arr[right]).or_insert(0) += 1;
        while count.len() > 2 {
            if let Some(c) = count.get_mut(&arr[left]) {
                *c -= 1;
                if *c == 0 {
                    count.remove(&arr[left]);
                }
            }
            left += 1;
        }
        ans = cmp::max(ans, right - left + 1);
    }
    writeln!(out, "{}", ans).unwrap();
}`
        }
    },

    // ==================== MEDIUM #5: Boats to Save People ====================
    {
        title: "Boats to Save People",
        description: "You are given an array `people` where `people[i]` is the weight of the `i`-th person, and an infinite number of boats where each boat can carry a maximum weight of `limit`.\nEach boat carries at most two people at the same time, provided the sum of their weight is at most `limit`.\n\nReturn the minimum number of boats to carry every given person.\n\n**Input Format:**\n- First line: two space-separated integers `n` (number of people) and `limit` (max boat capacity).\n- Second line: `n` space-separated integers representing weights.\n\n**Output Format:**\n- A single integer representing the minimum number of boats.",
        difficulty: "MEDIUM",
        tags: ["two-pointers", "greedy"],
        constraints: "1 <= n <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4",
        hints: "Sort the people by weight. Try to pair the heaviest person with the lightest person. If they fit together, put both in a boat. Otherwise, the heaviest person must go alone.",
        editorial: "Sort the weights array. Maintain two pointers: left = 0 (lightest) and right = n - 1 (heaviest). If people[left] + people[right] <= limit, they share a boat and we increment left. In all cases, the heaviest person gets a boat, so we decrement right and increment the boat count.\n\n**Time Complexity:** O(n log n) for sorting.\n**Space Complexity:** O(log n) or O(n) for sorting depending on the language.",
        examples: [
            { title: "Example 1", input: "2 3\n1 2", output: "1", explanation: "1 boat is enough to carry both people since 1 + 2 = 3 <= 3." },
            { title: "Example 2", input: "4 5\n3 2 2 1", output: "3", explanation: "3 boats: (1, 2), (2), (3). Note that (3, 2) is <= 5, but each boat can hold at most 2 people." }
        ],
        testcases: [
            { input: "2 3\n1 2", output: "1" },
            { input: "4 5\n3 2 2 1", output: "3" },
            { input: "4 6\n3 5 3 4", output: "3" },
            { input: "1 5\n4", output: "1" },
            { input: "6 10\n5 5 5 5 5 5", output: "3" },
            { input: "7 10\n10 9 8 7 6 5 4", output: "6" },
            { input: "8 8\n2 2 3 3 4 4 5 5", output: "4" },
            { input: "10 15\n10 10 10 10 10 5 5 5 5 5", output: "5" },
            { input: "10 20\n20 19 18 17 16 15 14 13 12 11", output: "10" },
            { input: "12 100\n50 49 51 52 48 47 53 54 46 45 55 56", output: "7" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Boats to Save People
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, limit;
    if (!(cin >> n >> limit)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    sort(arr.begin(), arr.end());
    int l = 0, r = n - 1;
    int boats = 0;
    while (l <= r) {
        if (l == r) {
            boats++;
            break;
        }
        if (arr[l] + arr[r] <= limit) {
            l++;
        }
        r--;
        boats++;
    }
    cout << boats << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    limit = int(data[1])
    arr = [int(x) for x in data[2:]]
    arr.sort()
    l, r = 0, n - 1
    boats = 0
    while l <= r:
        if l == r:
            boats += 1
            break
        if arr[l] + arr[r] <= limit:
            l += 1
        r -= 1
        boats += 1
    print(boats)
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
        int limit = Integer.parseInt(st.nextToken());
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(arr);
        int l = 0, r = n - 1;
        int boats = 0;
        while (l <= r) {
            if (l == r) {
                boats++;
                break;
            }
            if (arr[l] + arr[r] <= limit) {
                l++;
            }
            r--;
            boats++;
        }
        System.out.println(boats);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i32> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0] as usize;
    let limit = parts[1];
    let mut arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    arr.sort();
    let mut l = 0;
    let mut r = n as i32 - 1;
    let mut boats = 0;
    while l <= r {
        if l == r {
            boats += 1;
            break;
        }
        if arr[l as usize] + arr[r as usize] <= limit {
            l += 1;
        }
        r -= 1;
        boats += 1;
    }
    writeln!(out, "{}", boats).unwrap();
}`
        }
    },

    // ==================== HARD #1: Sliding Window Maximum ====================
    {
        title: "Sliding Window Maximum",
        description: "You are given an array of integers `arr` and a sliding window of size `k` moving from left to right. You can only see the `k` numbers in the window at any time.\n\nReturn the maximum of each sliding window.\n\n**Input Format:**\n- First line: two space-separated integers `n` (size of array) and `k` (window size).\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single line of space-separated integers representing the maximum of each window of size `k`.",
        difficulty: "HARD",
        tags: ["sliding-window", "monotonic-queue"],
        constraints: "1 <= n <= 10^5\n1 <= k <= n\n-10^4 <= arr[i] <= 10^4",
        hints: "Use a double-ended queue (deque) to store indices of array elements. Maintain elements in the deque in a decreasing order of their values.",
        editorial: "Maintain a monotonic deque where elements are sorted in decreasing order. For each element arr[i]: 1. Remove indices out of the window from the front of the deque. 2. Remove indices of elements smaller than arr[i] from the back of the deque. 3. Add i. 4. The front of the deque is the maximum of the current window.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(k) for the deque.",
        examples: [
            { title: "Example 1", input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7", explanation: "Window max updates: [1, 3, -1] -> 3, [3, -1, -3] -> 3, [-1, -3, 5] -> 5, etc." },
            { title: "Example 2", input: "1 1\n1", output: "1", explanation: "A single window containing the only element." }
        ],
        testcases: [
            { input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7" },
            { input: "1 1\n1", output: "1" },
            { input: "5 2\n1 -1 2 -2 3", output: "1 2 2 3" },
            { input: "6 3\n7 2 4 1 5 3", output: "7 4 5 5" },
            { input: "7 4\n10 20 30 40 30 20 10", output: "40 40 40 40" },
            { input: "8 1\n4 3 2 1 5 6 7 8", output: "4 3 2 1 5 6 7 8" },
            { input: "8 8\n1 2 3 4 5 6 7 8", output: "8" },
            { input: "10 3\n12 11 10 9 8 7 6 5 4 3", output: "12 11 10 9 8 7 6 5" },
            { input: "10 5\n1 3 -1 -3 5 3 6 7 10 9", output: "5 5 6 7 10 10" },
            { input: "12 4\n9 10 9 -7 -4 -8 2 -6 11 12 15 -3", output: "10 10 9 2 2 11 12 15 15" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Sliding Window Maximum
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < n; i++) {
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        while (!dq.empty() && arr[dq.back()] < arr[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            res.push_back(arr[dq.front()]);
        }
    }
    for (int i = 0; i < res.size(); i++) {
        cout << res[i] << (i == res.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
from collections import deque
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    dq = deque()
    res = []
    for i in range(n):
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(arr[dq[0]])
    print(" ".join(map(str, res)))
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
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        Deque<Integer> dq = new ArrayDeque<>();
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) {
                dq.pollFirst();
            }
            while (!dq.isEmpty() && arr[dq.peekLast()] < arr[i]) {
                dq.pollLast();
            }
            dq.offerLast(i);
            if (i >= k - 1) {
                if (!first) sb.append(" ");
                first = false;
                sb.append(arr[dq.peekFirst()]);
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
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<usize> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0];
    let k = parts[1];
    let arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut dq = VecDeque::new();
    let mut first = true;
    for i in 0..n {
        if !dq.is_empty() && *dq.front().unwrap() < i - k + 1 {
            dq.pop_front();
        }
        while !dq.is_empty() && arr[*dq.back().unwrap()] < arr[i] {
            dq.pop_back();
        }
        dq.push_back(i);
        if i >= k - 1 {
            if !first { write!(out, " ").unwrap(); }
            first = false;
            write!(out, "{}", arr[*dq.front().unwrap()]).unwrap();
        }
    }
    writeln!(out).unwrap();
}`
        }
    },

    // ==================== HARD #2: Subarray with K Different Integers ====================
    {
        title: "Subarray with K Different Integers",
        description: "Given an integer array `arr` and an integer `k`, return the number of good subarrays of `arr`.\n\nA good subarray is a contiguous part of the array where the number of different integers is exactly `k`.\n\n**Input Format:**\n- First line: two space-separated integers `n` and `k`.\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single integer representing the number of good subarrays.",
        difficulty: "HARD",
        tags: ["sliding-window", "arrays"],
        constraints: "1 <= n <= 2 * 10^4\n1 <= k <= n\n1 <= arr[i] <= n",
        hints: "The number of subarrays with exactly K distinct integers is equal to (atMost(K) - atMost(K - 1)), where atMost(K) is the number of subarrays with at most K distinct integers.",
        editorial: "Implement a helper function atMost(K) using a sliding window. atMost(K) counts the number of subarrays with at most K distinct integers by expanding right and shrinking left to keep distinct count <= K, adding (right - left + 1) to the count at each step. Return atMost(k) - atMost(k - 1).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for storing counts in the helper function.",
        examples: [
            { title: "Example 1", input: "5 2\n1 2 1 2 3", output: "7", explanation: "Subarrays formed with exactly 2 different integers: [1, 2], [2, 1], [1, 2], [2, 3], [1, 2, 1], [2, 1, 2], [1, 2, 1, 2]." },
            { title: "Example 2", input: "5 3\n1 2 1 3 4", output: "3", explanation: "Subarrays: [1, 2, 1, 3], [2, 1, 3], [1, 3, 4]." }
        ],
        testcases: [
            { input: "5 2\n1 2 1 2 3", output: "7" },
            { input: "5 3\n1 2 1 3 4", output: "3" },
            { input: "1 1\n5", output: "1" },
            { input: "6 1\n1 1 1 1 1 1", output: "21" },
            { input: "6 2\n1 1 1 2 2 2", output: "9" },
            { input: "8 2\n1 2 1 2 1 2 1 2", output: "28" },
            { input: "8 3\n1 2 3 1 2 3 1 2", output: "21" },
            { input: "10 4\n1 2 3 4 1 2 3 4 1 2", output: "28" },
            { input: "12 5\n1 2 3 4 5 1 2 3 4 5 1 2", output: "36" },
            { input: "15 3\n1 2 1 2 3 1 3 1 2 3 2 3 1 2 1", output: "81" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Subarray with K Different Integers
    
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
long long atMost(const vector<int>& arr, int k) {
    if (k < 0) return 0;
    unordered_map<int, int> count;
    int left = 0;
    long long ans = 0;
    for (int right = 0; right < arr.size(); right++) {
        count[arr[right]]++;
        while (count.size() > k) {
            count[arr[left]]--;
            if (count[arr[left]] == 0) {
                count.erase(arr[left]);
            }
            left++;
        }
        ans += (right - left + 1);
    }
    return ans;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << atMost(arr, k) - atMost(arr, k - 1) << "\n";
    return 0;
}`,
            python: `import sys
def at_most(arr, k):
    if k < 0:
        return 0
    count = {}
    left = 0
    ans = 0
    for right in range(len(arr)):
        count[arr[right]] = count.get(arr[right], 0) + 1
        while len(count) > k:
            count[arr[left]] -= 1
            if count[arr[left]] == 0:
                del count[arr[left]]
            left += 1
        ans += (right - left + 1)
    return ans

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    print(at_most(arr, k) - at_most(arr, k - 1))
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    private static long atMost(int[] arr, int k) {
        if (k < 0) return 0;
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0;
        long ans = 0;
        for (int right = 0; right < arr.length; right++) {
            count.put(arr[right], count.getOrDefault(arr[right], 0) + 1);
            while (count.size() > k) {
                count.put(arr[left], count.get(arr[left]) - 1);
                if (count.get(arr[left]) == 0) {
                    count.remove(arr[left]);
                }
                left++;
            }
            ans += (right - left + 1);
        }
        return ans;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int[] arr = new int[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
        }
        System.out.println(atMost(arr, k) - atMost(arr, k - 1));
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::HashMap;
fn at_most(arr: &[i32], k: i32) -> i64 {
    if k < 0 {
        return 0;
    }
    let mut count = HashMap::new();
    let mut left = 0;
    let mut ans = 0i64;
    for right in 0..arr.len() {
        *count.entry(arr[right]).or_insert(0) += 1;
        while count.len() > k as usize {
            if let Some(c) = count.get_mut(&arr[left]) {
                *c -= 1;
                if *c == 0 {
                    count.remove(&arr[left]);
                }
            }
            left += 1;
        }
        ans += (right - left + 1) as i64;
    }
    ans
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i32> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0] as usize;
    let k = parts[1];
    let arr: Vec<i32> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    writeln!(out, "{}", at_most(&arr, k) - at_most(&arr, k - 1)).unwrap();
}`
        }
    },

    // ==================== HARD #3: Shortest Subarray with Sum >= K ====================
    {
        title: "Shortest Subarray with Sum >= K",
        description: "Given an integer array `arr` and an integer `k`, return the length of the shortest non-empty subarray of `arr` with a sum of at least `k`. If there is no such subarray, return `-1`.\n\nNote that the array can contain negative numbers.\n\n**Input Format:**\n- First line: two space-separated integers `n` and `k`.\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single integer representing the minimum length of a subarray with sum >= k, or -1 if none exists.",
        difficulty: "HARD",
        tags: ["sliding-window", "monotonic-queue", "prefix-sum"],
        constraints: "1 <= n <= 10^5\n-10^5 <= arr[i] <= 10^5\n1 <= k <= 10^9",
        hints: "Create a prefix sum array. Maintain a monotonic deque storing indices of prefix sums. For each index, check if the current prefix sum minus the prefix sum at the front of the deque is >= k.",
        editorial: "Use prefix sums: prefix[i+1] = prefix[i] + arr[i]. We want to find min(j - i) such that prefix[j] - prefix[i] >= k. Keep a deque of indices. For each j: 1. While prefix[j] - prefix[dq.front()] >= k, update answer with j - dq.front() and pop front. 2. While prefix[j] <= prefix[dq.back()], pop back to maintain increasing order.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for prefix sums and deque.",
        examples: [
            { title: "Example 1", input: "1 1\n1", output: "1", explanation: "The only element satisfies the condition." },
            { title: "Example 2", input: "3 4\n1 2 -1", output: "-1", explanation: "No subarray sums up to at least 4." }
        ],
        testcases: [
            { input: "1 1\n1", output: "1" },
            { input: "3 4\n1 2 -1", output: "-1" },
            { input: "3 3\n2 -1 2", output: "3" },
            { input: "5 6\n1 2 3 4 5", output: "2" },
            { input: "6 3\n-1 1 -2 3 -1 2", output: "1" },
            { input: "8 10\n3 -2 5 -1 6 -3 2 7", output: "3" },
            { input: "10 100\n10 20 30 40 50 10 20 30 40 50", output: "3" },
            { input: "10 15\n-5 8 -3 4 -1 10 -2 3 -4 12", output: "5" },
            { input: "12 8\n2 -1 2 -1 2 -1 2 -1 2 -1 2 -1", output: "-1" },
            { input: "15 25\n-10 15 -5 10 20 -15 30 -5 12 18 -20 5 15 10 5", output: "1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Shortest Subarray with Sum >= K
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        prefix[i + 1] = prefix[i] + x;
    }
    deque<int> dq;
    int ans = n + 1;
    for (int i = 0; i <= n; i++) {
        while (!dq.empty() && prefix[i] - prefix[dq.front()] >= k) {
            ans = min(ans, i - dq.front());
            dq.pop_front();
        }
        while (!dq.empty() && prefix[i] <= prefix[dq.back()]) {
            dq.pop_back();
        }
        dq.push_back(i);
    }
    if (ans <= n) cout << ans << "\n";
    else cout << -1 << "\n";
    return 0;
}`,
            python: `import sys
from collections import deque
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + arr[i]
    dq = deque()
    ans = n + 1
    for i in range(n + 1):
        while dq and prefix[i] - prefix[dq[0]] >= k:
            ans = min(ans, i - dq.popleft())
        while dq and prefix[i] <= prefix[dq[-1]]:
            dq.pop()
        dq.append(i)
    print(ans if ans <= n else -1)
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
        long k = Long.parseLong(st.nextToken());
        long[] prefix = new long[n + 1];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                prefix[i + 1] = prefix[i] + Long.parseLong(st.nextToken());
            }
        }
        Deque<Integer> dq = new ArrayDeque<>();
        int ans = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!dq.isEmpty() && prefix[i] - prefix[dq.peekFirst()] >= k) {
                ans = Math.min(ans, i - dq.pollFirst());
            }
            while (!dq.isEmpty() && prefix[i] <= prefix[dq.peekLast()]) {
                dq.pollLast();
            }
            dq.offerLast(i);
        }
        System.out.println(ans <= n ? ans : -1);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::VecDeque;
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i64> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0] as usize;
    let k = parts[1];
    let arr: Vec<i64> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let mut prefix = vec![0i64; n + 1];
    for i in 0..n {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    let mut dq = VecDeque::new();
    let mut ans = n + 1;
    for i in 0..=n {
        while !dq.is_empty() && prefix[i] - prefix[*dq.front().unwrap()] >= k {
            ans = cmp::min(ans, i - dq.pop_front().unwrap());
        }
        while !dq.is_empty() && prefix[i] <= prefix[*dq.back().unwrap()] {
            dq.pop_back();
        }
        dq.push_back(i);
    }
    if ans <= n {
        writeln!(out, "{}", ans).unwrap();
    } else {
        writeln!(out, "-1").unwrap();
    }
}`
        }
    },

    // ==================== HARD #4: Max Score After Remove Substring ====================
    {
        title: "Max Score After Remove Substring",
        description: "Given a string `s` and two integers `x` and `y`. You can perform two types of operations any number of times:\n- Remove substring \"ab\" and gain `x` points.\n- Remove substring \"ba\" and gain `y` points.\n\nReturn the maximum points you can gain.\n\n**Input Format:**\n- First line: string `s`.\n- Second line: two space-separated integers `x` and `y`.\n\n**Output Format:**\n- A single integer representing the maximum points.",
        difficulty: "HARD",
        tags: ["two-pointers", "greedy", "stack"],
        constraints: "1 <= |s| <= 10^5\n1 <= x, y <= 10^4\ns consists of lowercase English letters",
        hints: "This can be solved greedily. Always prioritize removing the pattern that gives more points (\"ab\" or \"ba\") using a stack/two-pointers. Then, process the remaining string for the other pattern.",
        editorial: "Without loss of generality, assume x >= y. First, run a stack-based greedy pass to remove all occurrences of \"ab\" and gain x points per removal. Then, run a second pass on the remaining characters in the stack to remove all occurrences of \"ba\" and gain y points per removal.\n\n**Time Complexity:** O(|s|)\n**Space Complexity:** O(|s|) for the stack.",
        examples: [
            { title: "Example 1", input: "aabbaabiabaa\n5 4", output: "20", explanation: "Remove 'ab' first because x > y. We can remove 'ab' 4 times to get 20 points." },
            { title: "Example 2", input: "aabaabbab\n4 5", output: "18", explanation: "Remove 'ba' first because y > x. Remaining string can be cleared for some 'ab'." }
        ],
        testcases: [
            { input: "aabbaabiabaa\n5 4", output: "20" },
            { input: "aabaabbab\n4 5", output: "18" },
            { input: "a\n10 20", output: "0" },
            { input: "ab\n10 20", output: "10" },
            { input: "ba\n10 20", output: "20" },
            { input: "abababab\n10 20", output: "70" },
            { input: "abbababa\n15 25", output: "90" },
            { input: "bbbaaa\n5 10", output: "30" },
            { input: "abacaba\n100 200", output: "400" },
            { input: "baababaaab\n50 60", output: "230" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Max Score After Remove Substring
    
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
pair<string, long long> removePattern(const string& s, char p0, char p1, long long val) {
    string stack = "";
    long long score = 0;
    for (char c : s) {
        if (!stack.empty() && stack.back() == p0 && c == p1) {
            stack.pop_back();
            score += val;
        } else {
            stack.push_back(c);
        }
    }
    return {stack, score};
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    long long x, y;
    if (!(cin >> s >> x >> y)) return 0;
    char first0 = 'a', first1 = 'b', second0 = 'b', second1 = 'a';
    long long firstVal = x, secondVal = y;
    if (y > x) {
        first0 = 'b'; first1 = 'a';
        second0 = 'a'; second1 = 'b';
        firstVal = y; secondVal = x;
    }
    auto p1 = removePattern(s, first0, first1, firstVal);
    auto p2 = removePattern(p1.first, second0, second1, secondVal);
    cout << p1.second + p2.second << "\n";
    return 0;
}`,
            python: `import sys
def remove_pattern(s, p0, p1, val):
    stack = []
    score = 0
    for char in s:
        if stack and stack[-1] == p0 and char == p1:
            stack.pop()
            score += val
        else:
            stack.append(char)
    return "".join(stack), score

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    s = data[0]
    x = int(data[1])
    y = int(data[2])
    if x >= y:
        s, score1 = remove_pattern(s, 'a', 'b', x)
        s, score2 = remove_pattern(s, 'b', 'a', y)
    else:
        s, score1 = remove_pattern(s, 'b', 'a', y)
        s, score2 = remove_pattern(s, 'a', 'b', x)
    print(score1 + score2)
if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Result {
        String s;
        long score;
        Result(String s, long score) {
            this.s = s;
            this.score = score;
        }
    }
    private static Result removePattern(String s, char p0, char p1, long val) {
        StringBuilder stack = new StringBuilder();
        long score = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (stack.length() > 0 && stack.charAt(stack.length() - 1) == p0 && c == p1) {
                stack.deleteCharAt(stack.length() - 1);
                score += val;
            } else {
                stack.append(c);
            }
        }
        return new Result(stack.toString(), score);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        long x = Long.parseLong(st.nextToken());
        long y = Long.parseLong(st.nextToken());
        char f0 = 'a', f1 = 'b', s0 = 'b', s1 = 'a';
        long fV = x, sV = y;
        if (y > x) {
            f0 = 'b'; f1 = 'a';
            s0 = 'a'; s1 = 'b';
            fV = y; sV = x;
        }
        Result r1 = removePattern(s, f0, f1, fV);
        Result r2 = removePattern(r1.s, s0, s1, sV);
        System.out.println(r1.score + r2.score);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn remove_pattern(s: &str, p0: char, p1: char, val: i64) -> (String, i64) {
    let mut stack = Vec::new();
    let mut score = 0;
    for c in s.chars() {
        if !stack.is_empty() && *stack.last().unwrap() == p0 && c == p1 {
            stack.pop();
            score += val;
        } else {
            stack.push(c);
        }
    }
    let res_str: String = stack.into_iter().collect();
    (res_str, score)
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let s = match lines.next() {
        Some(Ok(line)) => line.trim().to_string(),
        _ => return,
    };
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i64> = second_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let x = parts[0];
    let y = parts[1];
    let (f0, f1, s0, s1, f_v, s_v) = if x >= y {
        ('a', 'b', 'b', 'a', x, y)
    } else {
        ('b', 'a', 'a', 'b', y, x)
    };
    let (s_rem, score1) = remove_pattern(&s, f0, f1, f_v);
    let (_, score2) = remove_pattern(&s_rem, s0, s1, s_v);
    writeln!(out, "{}", score1 + score2).unwrap();
}`
        }
    },

    // ==================== HARD #5: Minimum Operations to Reduce X ====================
    {
        title: "Minimum Operations to Reduce X",
        description: "You are given an integer array `arr` and an integer `x`. In one operation, you can remove either the leftmost or the rightmost element from the array and subtract its value from `x`.\n\nReturn the minimum number of operations to reduce `x` to exactly `0` if possible, otherwise, return `-1`.\n\n**Input Format:**\n- First line: two space-separated integers `n` and `x`.\n- Second line: `n` space-separated integers.\n\n**Output Format:**\n- A single integer representing the minimum number of operations, or -1 if impossible.",
        difficulty: "HARD",
        tags: ["sliding-window", "arrays"],
        constraints: "1 <= n <= 10^5\n1 <= arr[i] <= 10^4\n1 <= x <= 10^9",
        hints: "Instead of finding elements at the ends, find the longest contiguous subarray in the middle that sums to (total_sum - x).",
        editorial: "Let target = sum(arr) - x. If target < 0, return -1. If target == 0, return n. Find the maximum length of a subarray whose sum is exactly target using a sliding window. The minimum operations will be n - max_len.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            { title: "Example 1", input: "5 5\n1 1 4 2 3", output: "2", explanation: "Remove 3 and 2 from the right to reduce x to 0 in 2 operations." },
            { title: "Example 2", input: "5 10\n5 6 7 8 9", output: "-1", explanation: "It is impossible to reduce x to exactly 0." }
        ],
        testcases: [
            { input: "5 5\n1 1 4 2 3", output: "2" },
            { input: "5 10\n5 6 7 8 9", output: "-1" },
            { input: "3 10\n3 2 20", output: "-1" },
            { input: "3 4\n2 1 2", output: "-1" },
            { input: "1 5\n5", output: "1" },
            { input: "5 8\n3 2 20 1 3", output: "3" },
            { input: "8 12\n1 2 5 1 1 1 2 6", output: "5" },
            { input: "10 20\n1 1 1 1 1 1 1 1 1 1", output: "-1" },
            { input: "10 10\n1 1 1 1 1 1 1 1 1 1", output: "10" },
            { input: "12 25\n5 2 3 1 1 10 2 3 4 5 1 8", output: "6" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Solve Minimum Operations to Reduce X
    
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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long x;
    if (!(cin >> n >> x)) return 0;
    vector<long long> arr(n);
    long long total = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        total += arr[i];
    }
    long long target = total - x;
    if (target < 0) {
        cout << -1 << "\n";
        return 0;
    }
    if (target == 0) {
        cout << n << "\n";
        return 0;
    }
    int max_len = -1;
    long long curr_sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        curr_sum += arr[right];
        while (curr_sum > target && left <= right) {
            curr_sum -= arr[left];
            left++;
        }
        if (curr_sum == target) {
            max_len = max(max_len, right - left + 1);
        }
    }
    if (max_len != -1) {
        cout << n - max_len << "\n";
    } else {
        cout << -1 << "\n";
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
    x = int(data[1])
    arr = [int(val) for val in data[2:]]
    total = sum(arr)
    target = total - x
    if target < 0:
        print(-1)
        return
    if target == 0:
        print(n)
        return
    max_len = -1
    curr_sum = 0
    left = 0
    for right in range(n):
        curr_sum += arr[right]
        while curr_sum > target and left <= right:
            curr_sum -= arr[left]
            left += 1
        if curr_sum == target:
            max_len = max(max_len, right - left + 1)
    print(n - max_len if max_len != -1 else -1)
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
        long x = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        long total = 0;
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
                total += arr[i];
            }
        }
        long target = total - x;
        if (target < 0) {
            System.out.println(-1);
            return;
        }
        if (target == 0) {
            System.out.println(n);
            return;
        }
        int maxLen = -1;
        long currSum = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            currSum += arr[right];
            while (currSum > target && left <= right) {
                currSum -= arr[left];
                left++;
            }
            if (currSum == target) {
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }
        System.out.println(maxLen != -1 ? n - maxLen : -1);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::cmp;
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let parts: Vec<i64> = first_line.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = parts[0] as usize;
    let x = parts[1];
    let arr: Vec<i64> = match lines.next() {
        Some(Ok(line)) => line.split_whitespace().map(|x| x.parse().unwrap()).collect(),
        _ => vec![],
    };
    let total: i64 = arr.iter().sum();
    let target = total - x;
    if target < 0 {
        writeln!(out, "-1").unwrap();
        return;
    }
    if target == 0 {
        writeln!(out, "{}", n).unwrap();
        return;
    }
    let mut max_len = -1i32;
    let mut curr_sum = 0i64;
    let mut left = 0;
    for right in 0..n {
        curr_sum += arr[right];
        while curr_sum > target && left <= right {
            curr_sum -= arr[left];
            left += 1;
        }
        if curr_sum == target {
            max_len = cmp::max(max_len, (right - left + 1) as i32);
        }
    }
    if max_len != -1 {
        writeln!(out, "{}", n as i32 - max_len).unwrap();
    } else {
        writeln!(out, "-1").unwrap();
    }
}`
        }
    }
]
