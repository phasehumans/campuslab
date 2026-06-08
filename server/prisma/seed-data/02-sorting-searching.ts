import type { SeedProblem } from './types.js'

export const sortingSearchingProblems: SeedProblem[] = [
    // ==================== EASY #1: Binary Search ====================
    {
        title: "Binary Search",
        description: "Given a sorted array of N integers and a target value K, return the 0-indexed index of K if it exists. Otherwise, return -1.\n\nYou must implement a solution with O(log N) time complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and K\n- Second line: N space-separated integers representing the sorted array\n\n**Output Format:**\n- A single integer: the index of K, or -1 if not found",
        difficulty: "EASY",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i], K <= 10^9\nThe array is sorted in ascending order",
        hints: "Use the divide and conquer approach of binary search. Maintain two pointers: low and high. Find the middle element and check if it is equal, smaller, or larger than K.",
        editorial: "**Approach: Binary Search**\n\nInitialize low = 0 and high = N - 1. In each step, calculate mid = low + (high - low) / 2. If arr[mid] == K, we found the element. If arr[mid] < K, narrow search space to the right half by setting low = mid + 1. Otherwise, narrow search space to the left half by setting high = mid - 1.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "6 9\n-1 0 3 5 9 12", output: "4", explanation: "9 exists in the array at index 4." },
            { title: "Example 2", input: "6 2\n-1 0 3 5 9 12", output: "-1", explanation: "2 does not exist in the array." }
        ],
        testcases: [
            { input: "6 9\n-1 0 3 5 9 12", output: "4" },
            { input: "6 2\n-1 0 3 5 9 12", output: "-1" },
            { input: "1 5\n5", output: "0" },
            { input: "1 2\n5", output: "-1" },
            { input: "2 3\n3 5", output: "0" },
            { input: "2 5\n3 5", output: "1" },
            { input: "2 4\n3 5", output: "-1" },
            { input: "5 10\n2 4 6 8 10", output: "4" },
            { input: "5 2\n2 4 6 8 10", output: "0" },
            { input: "10 7\n1 2 3 4 5 6 7 8 9 10", output: "6" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == k) {
            ans = mid;
            break;
        } else if (arr[mid] < k) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
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
    low = 0
    high = n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == k:
            ans = mid
            break
        elif arr[mid] < k:
            low = mid + 1
        else:
            high = mid - 1
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
        long k = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == k) {
                ans = mid;
                break;
            } else if (arr[mid] < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == k {
                    ans = mid;
                    break;
                } else if arr[mid as usize] < k {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`
        }
    },

    // ==================== EASY #2: Count Sort Frequencies ====================
    {
        title: "Count Sort Frequencies",
        description: "Given an array of N integers where all integers are between 0 and 100 (inclusive), count the frequency of each integer and output them in ascending order of the integer. Only print the integers that appear at least once, along with their frequencies.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- For each unique integer present in the array (in ascending order), print the integer and its frequency separated by a space, each on a new line.",
        difficulty: "EASY",
        tags: ["sorting"],
        constraints: "1 <= N <= 10^5\n0 <= arr[i] <= 100",
        hints: "Since the elements are constrained to the range [0, 100], you can use an auxiliary array of size 101 to count the frequencies. This is the core concept of Counting Sort.",
        editorial: "**Approach: Counting Sort Frequency Array**\n\nCreate a frequency array of size 101 initialized to 0. Traverse the input array and increment the frequency for each number. Finally, iterate from 0 to 100, and for any index with a non-zero count, print the index (the number) and its frequency.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1) (since the size of the frequency array is fixed at 101)",
        examples: [
            { title: "Example 1", input: "6\n4 3 4 3 1 3", output: "1 1\n3 3\n4 2", explanation: "1 appears 1 time, 3 appears 3 times, and 4 appears 2 times." },
            { title: "Example 2", input: "3\n100 0 100", output: "0 1\n100 2", explanation: "0 appears 1 time, 100 appears 2 times." }
        ],
        testcases: [
            { input: "6\n4 3 4 3 1 3", output: "1 1\n3 3\n4 2" },
            { input: "3\n100 0 100", output: "0 1\n100 2" },
            { input: "1\n42", output: "42 1" },
            { input: "5\n10 10 10 10 10", output: "10 5" },
            { input: "8\n1 2 3 4 5 6 7 8", output: "1 1\n2 1\n3 1\n4 1\n5 1\n6 1\n7 1\n8 1" },
            { input: "10\n0 0 0 0 0 0 0 0 0 0", output: "0 10" },
            { input: "5\n50 60 50 60 70", output: "50 2\n60 2\n70 1" },
            { input: "4\n5 5 10 10", output: "5 2\n10 2" },
            { input: "7\n1 1 2 2 3 3 4", output: "1 2\n2 2\n3 2\n4 1" },
            { input: "2\n10 20", output: "10 1\n20 1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> freq(101, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        freq[x]++;
    }
    for (int i = 0; i <= 100; i++) {
        if (freq[i] > 0) {
            cout << i << " " << freq[i] << "\n";
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
    freq = [0] * 101
    for x in data[1:]:
        freq[int(x)] += 1
    for i in range(101):
        if freq[i] > 0:
            print(f"{i} {freq[i]}")

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
        int[] freq = new int[101];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                int x = Integer.parseInt(st.nextToken());
                freq[x]++;
            }
        }
        for (int i = 0; i <= 100; i++) {
            if (freq[i] > 0) {
                System.out.println(i + " " + freq[i]);
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
        let _n: usize = line.trim().parse().unwrap();
        let mut freq = vec![0; 101];
        if let Some(Ok(line2)) = lines.next() {
            for token in line2.split_whitespace() {
                let x: usize = token.parse().unwrap();
                freq[x] += 1;
            }
        }
        for i in 0..=100 {
            if freq[i] > 0 {
                writeln!(out, "{} {}", i, freq[i]).unwrap();
            }
        }
    }
}`
        }
    },

    // ==================== EASY #3: First and Last Position of Target ====================
    {
        title: "First and Last Position of Target",
        description: "Given an array of integers sorted in non-decreasing order, find the starting and ending position of a given target value.\n\nIf the target is not found in the array, return [-1, -1] as two space-separated integers.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the sorted array\n\n**Output Format:**\n- Two space-separated integers: the start index and end index of the target",
        difficulty: "EASY",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nall elements are sorted in non-decreasing order",
        hints: "Run binary search twice: once to find the leftmost (first) index of the target, and once to find the rightmost (last) index.",
        editorial: "**Approach: Dual Binary Search**\n\nTo find the first occurrence, perform binary search. When arr[mid] == target, save the index and search the left half (high = mid - 1) to find an even earlier occurrence. For the last occurrence, when arr[mid] == target, save the index and search the right half (low = mid + 1).\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "6 8\n5 7 7 8 8 10", output: "3 4", explanation: "The target 8 is found at index 3 and index 4." },
            { title: "Example 2", input: "6 6\n5 7 7 8 8 10", output: "-1 -1", explanation: "The target 6 is not found in the array." }
        ],
        testcases: [
            { input: "6 8\n5 7 7 8 8 10", output: "3 4" },
            { input: "6 6\n5 7 7 8 8 10", output: "-1 -1" },
            { input: "1 5\n5", output: "0 0" },
            { input: "1 4\n5", output: "-1 -1" },
            { input: "2 3\n3 3", output: "0 1" },
            { input: "2 3\n3 5", output: "0 0" },
            { input: "2 5\n3 5", output: "1 1" },
            { input: "10 8\n1 2 3 4 5 6 7 8 8 8", output: "7 9" },
            { input: "10 1\n1 1 1 1 1 1 1 1 1 1", output: "0 9" },
            { input: "5 2\n1 2 3 4 5", output: "1 1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int first = -1, last = -1;
    
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            first = mid;
            high = mid - 1;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            last = mid;
            low = mid + 1;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    cout << first << " " << last << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    
    first, last = -1, -1
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            first = mid
            high = mid - 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    low, high = 0, n - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            last = mid
            low = mid + 1
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    print(f"{first} {last}")

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
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int first = -1, last = -1;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                first = mid;
                high = mid - 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                last = mid;
                low = mid + 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println(first + " " + last);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut first = -1;
            let mut last = -1;
            
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    first = mid;
                    high = mid - 1;
                } else if arr[mid as usize] < target {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    last = mid;
                    low = mid + 1;
                } else if arr[mid as usize] < target {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            writeln!(out, "{} {}", first, last).unwrap();
        }
    }
}`
        }
    },

    // ==================== EASY #4: Search Insert Position ====================
    {
        title: "Search Insert Position",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the sorted array of distinct integers\n\n**Output Format:**\n- A single integer: the insert index",
        difficulty: "EASY",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nall elements are distinct and sorted in ascending order",
        hints: "Find the first index where arr[index] >= target. If no such element exists, the insert position is at the end of the array (index N).",
        editorial: "**Approach: Binary Search for Lower Bound**\n\nWe want to find the first index mid where arr[mid] >= target. If we find such an element, we search left (high = mid - 1) to find a smaller index that still satisfies the condition. If arr[mid] < target, we search right (low = mid + 1). The answer is the smallest index that satisfies the condition.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "4 5\n1 3 5 6", output: "2", explanation: "5 is found at index 2." },
            { title: "Example 2", input: "4 2\n1 3 5 6", output: "1", explanation: "2 is not present, it would be inserted at index 1." }
        ],
        testcases: [
            { input: "4 5\n1 3 5 6", output: "2" },
            { input: "4 2\n1 3 5 6", output: "1" },
            { input: "4 7\n1 3 5 6", output: "4" },
            { input: "4 0\n1 3 5 6", output: "0" },
            { input: "1 0\n5", output: "0" },
            { input: "1 6\n5", output: "1" },
            { input: "1 5\n5", output: "0" },
            { input: "5 3\n1 2 4 5 6", output: "2" },
            { input: "5 4\n1 2 5 6 7", output: "2" },
            { input: "6 10\n2 4 6 8 12 14", output: "4" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = n;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
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
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    low, high = 0, n - 1
    ans = n
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] >= target:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
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
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = n;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] >= target {
                    ans = mid as usize;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`
        }
    },

    // ==================== EASY #5: Find Peak Element ====================
    {
        title: "Find Peak Element",
        description: "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array, find a peak element, and return its index.\n\nYou may imagine that arr[-1] = arr[N] = -infinity. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.\n\nYou must write an algorithm with O(log N) runtime complexity. All test cases will have a unique peak index (i.e., the array is unimodal).\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single integer: the index of the peak element",
        difficulty: "EASY",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-2^31 <= arr[i] <= 2^31 - 1\narr[i] != arr[i+1] for all valid i",
        hints: "If arr[mid] < arr[mid + 1], then a peak must exist to the right of mid. Otherwise, a peak must exist to the left (including mid).",
        editorial: "**Approach: Binary Search**\n\nIf arr[mid] < arr[mid + 1], then we are in an ascending slope. The peak must be on the right side, so we set low = mid + 1. Otherwise, we are in a descending slope, meaning a peak must be at mid or to its left, so we set high = mid. The search converges when low == high.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "4\n1 2 3 1", output: "2", explanation: "3 is a peak element and its index is 2." },
            { title: "Example 2", input: "5\n1 3 5 4 2", output: "2", explanation: "5 is a peak element and its index is 2." }
        ],
        testcases: [
            { input: "4\n1 2 3 1", output: "2" },
            { input: "5\n1 3 5 4 2", output: "2" },
            { input: "1\n10", output: "0" },
            { input: "2\n3 2", output: "0" },
            { input: "2\n1 4", output: "1" },
            { input: "3\n1 5 2", output: "1" },
            { input: "5\n10 8 6 4 2", output: "0" },
            { input: "5\n2 4 6 8 10", output: "4" },
            { input: "6\n1 2 3 4 5 2", output: "4" },
            { input: "7\n-10 -5 0 5 10 2 -3", output: "4" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] < arr[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << low << "\n";
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
    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if arr[mid] < arr[mid + 1]:
            low = mid + 1
        else:
            high = mid
    print(low)

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] < arr[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        System.out.println(low);
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
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0usize;
            let mut high = n - 1;
            while low < high {
                let mid = low + (high - low) / 2;
                if arr[mid] < arr[mid + 1] {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            writeln!(out, "{}", low).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #6: Search in Rotated Sorted Array ====================
    {
        title: "Search in Rotated Sorted Array",
        description: "There is an integer array sorted in ascending order (with distinct values). Prior to being passed to your function, the array is possibly rotated at an unknown pivot index.\n\nGiven the array after the possible rotation and an integer target, return the index of target if it is in the array, or -1 if it is not in the array.\n\nYou must write an algorithm with O(log N) runtime complexity.\n\n**Input Format:**\n- First line: two space-separated integers N and target\n- Second line: N space-separated integers representing the rotated sorted array\n\n**Output Format:**\n- A single integer: the index of target (0-indexed), or -1 if not found",
        difficulty: "MEDIUM",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i], target <= 10^9\nAll elements of the array are unique\nThe array is sorted and possibly rotated",
        hints: "In a rotated sorted array, one half (either left or right) is always sorted. Identify which half is sorted, and check if the target falls within that sorted half.",
        editorial: "**Approach: Rotated Binary Search**\n\nFor any mid, at least one of the halves [low, mid] or [mid, high] is sorted.\n- If arr[low] <= arr[mid], the left half is sorted. If target lies within [arr[low], arr[mid]), search left (high = mid - 1); otherwise search right (low = mid + 1).\n- If the right half is sorted, and target lies within (arr[mid], arr[high]], search right (low = mid + 1); otherwise search left (high = mid - 1).\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "7 0\n4 5 6 7 0 1 2", output: "4", explanation: "0 is at index 4." },
            { title: "Example 2", input: "7 3\n4 5 6 7 0 1 2", output: "-1", explanation: "3 is not in the array." }
        ],
        testcases: [
            { input: "7 0\n4 5 6 7 0 1 2", output: "4" },
            { input: "7 3\n4 5 6 7 0 1 2", output: "-1" },
            { input: "1 0\n0", output: "0" },
            { input: "1 3\n0", output: "-1" },
            { input: "2 3\n3 1", output: "0" },
            { input: "2 1\n3 1", output: "1" },
            { input: "5 5\n5 1 2 3 4", output: "0" },
            { input: "5 2\n5 1 2 3 4", output: "2" },
            { input: "5 4\n5 1 2 3 4", output: "4" },
            { input: "8 10\n12 15 20 1 3 5 8 10", output: "7" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        }
        if (arr[low] <= arr[mid]) {
            if (target >= arr[low] && target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (target > arr[mid] && target <= arr[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
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
    target = int(data[1])
    arr = [int(x) for x in data[2:]]
    low, high = 0, n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            ans = mid
            break
        if arr[low] <= arr[mid]:
            if arr[low] <= target < arr[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if arr[mid] < target <= arr[high]:
                low = mid + 1
            else:
                high = mid - 1
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
        long target = Long.parseLong(st.nextToken());
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                ans = mid;
                break;
            }
            if (arr[low] <= arr[mid]) {
                if (target >= arr[low] && target < arr[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target > arr[mid] && target <= arr[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let target: i64 = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut high = (n as isize) - 1;
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if arr[mid as usize] == target {
                    ans = mid;
                    break;
                }
                if arr[low as usize] <= arr[mid as usize] {
                    if target >= arr[low as usize] && target < arr[mid as usize] {
                        high = mid - 1;
                    } else {
                        low = mid + 1;
                    }
                } else {
                    if target > arr[mid as usize] && target <= arr[high as usize] {
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #7: Find Minimum in Rotated Sorted Array ====================
    {
        title: "Find Minimum in Rotated Sorted Array",
        description: "Suppose an array of length N sorted in ascending order is rotated between 1 and N times.\n\nGiven the sorted rotated array of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log N) time.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers representing the rotated sorted array\n\n**Output Format:**\n- A single integer: the minimum element in the array",
        difficulty: "MEDIUM",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i] <= 10^9\nAll elements of the array are unique\nThe array is sorted and rotated",
        hints: "If arr[mid] > arr[high], then the minimum element must be to the right of mid (low = mid + 1). Otherwise, the minimum element is at mid or to its left (high = mid).",
        editorial: "**Approach: Binary Search**\n\nCompare arr[mid] with arr[high].\n- If arr[mid] > arr[high], it means the pivot (and thus the minimum) is in the right half. So set low = mid + 1.\n- Otherwise, the minimum element must be in the left half, including mid. So set high = mid.\nWhen low == high, we have found the minimum element.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5\n3 4 5 1 2", output: "1", explanation: "The minimum element is 1." },
            { title: "Example 2", input: "7\n4 5 6 7 0 1 2", output: "0", explanation: "The minimum element is 0." }
        ],
        testcases: [
            { input: "5\n3 4 5 1 2", output: "1" },
            { input: "7\n4 5 6 7 0 1 2", output: "0" },
            { input: "1\n10", output: "10" },
            { input: "2\n2 1", output: "1" },
            { input: "2\n1 2", output: "1" },
            { input: "3\n3 1 2", output: "1" },
            { input: "3\n2 3 1", output: "1" },
            { input: "5\n10 20 30 40 5", output: "5" },
            { input: "8\n8 9 10 1 2 3 4 5", output: "1" },
            { input: "6\n6 7 8 9 10 5", output: "5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > arr[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << arr[low] << "\n";
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
    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if arr[mid] > arr[high]:
            low = mid + 1
        else:
            high = mid
    print(arr[low])

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
        long[] arr = new long[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                arr[i] = Long.parseLong(st.nextToken());
            }
        }
        int low = 0, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        System.out.println(arr[low]);
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
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0usize;
            let mut high = n - 1;
            while low < high {
                let mid = low + (high - low) / 2;
                if arr[mid] > arr[high] {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            writeln!(out, "{}", arr[low]).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #8: H-Index ====================
    {
        title: "H-Index",
        description: "Given an array of integers citations where citations[i] is the number of citations a researcher received for their i-th paper, return the researcher's h-index.\n\nThe h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers representing citations\n\n**Output Format:**\n- A single integer representing the researcher's h-index",
        difficulty: "MEDIUM",
        tags: ["sorting"],
        constraints: "1 <= N <= 10^5\n0 <= citations[i] <= 10^9",
        hints: "Sort the citations array in ascending order. If citations[i] >= N - i, then we have at least N - i papers with citations >= citations[i].",
        editorial: "**Approach: Sorting**\n\nSort citations in ascending order. For each paper at index i, the number of papers with at least citations[i] citations is N - i. We find the maximum value of N - i such that citations[i] >= N - i.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(1) or O(N) depending on the sort algorithm",
        examples: [
            { title: "Example 1", input: "5\n3 0 6 1 5", output: "3", explanation: "The researcher has 5 papers in total. 3 papers have at least 3 citations each (3, 5, 6)." },
            { title: "Example 2", input: "3\n1 3 1", output: "1", explanation: "Only 1 paper has at least 1 citation." }
        ],
        testcases: [
            { input: "5\n3 0 6 1 5", output: "3" },
            { input: "3\n1 3 1", output: "1" },
            { input: "1\n0", output: "0" },
            { input: "1\n100", output: "1" },
            { input: "5\n10 8 5 4 3", output: "4" },
            { input: "4\n0 0 0 0", output: "0" },
            { input: "6\n10 10 10 10 10 10", output: "6" },
            { input: "5\n1 1 1 1 1", output: "1" },
            { input: "5\n2 2 2 2 2", output: "2" },
            { input: "7\n4 0 5 1 6 3 2", output: "3" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> citations(n);
    for (int i = 0; i < n; i++) cin >> citations[i];
    sort(citations.begin(), citations.end());
    int h = 0;
    for (int i = 0; i < n; i++) {
        if (citations[i] >= n - i) {
            h = max(h, n - i);
        }
    }
    cout << h << "\n";
    return 0;
}`,
            python: `import sys
def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    citations = [int(x) for x in data[1:]]
    citations.sort()
    h = 0
    for i in range(n):
        if citations[i] >= n - i:
            h = max(h, n - i)
    print(h)

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
        int[] citations = new int[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                citations[i] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(citations);
        int h = 0;
        for (int i = 0; i < n; i++) {
            if (citations[i] >= n - i) {
                h = Math.max(h, n - i);
            }
        }
        System.out.println(h);
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
        if let Some(Ok(line2)) = lines.next() {
            let mut citations: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            citations.sort_unstable();
            let mut h = 0;
            for i in 0..n {
                if citations[i] >= (n - i) as i32 {
                    h = std::cmp::max(h, (n - i) as i32);
                }
            }
            writeln!(out, "{}", h).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #9: Book Allocation Problem ====================
    {
        title: "Book Allocation Problem",
        description: "Given N books, the i-th book has A[i] pages. There are M students. The task is to allocate all books to the M students such that:\n1. Each student gets at least one book.\n2. Each book is allocated to exactly one student.\n3. The allocation is contiguous; i.e., a student can only be allocated books that are adjacent in the list.\n\nAllocate the books such that the maximum number of pages allocated to a student is minimized. Return this minimized maximum. If it is impossible to allocate books (e.g. if M > N), return -1.\n\n**Input Format:**\n- First line: two space-separated integers N and M\n- Second line: N space-separated integers representing pages of each book\n\n**Output Format:**\n- A single integer: the minimized maximum number of pages, or -1 if impossible",
        difficulty: "MEDIUM",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n1 <= M <= 10^5\n1 <= A[i] <= 10^9",
        hints: "The answer lies in the range [max(A), sum(A)]. Use binary search on this range. For a middle value, check if it is possible to allocate books such that no student gets more pages than that value.",
        editorial: "**Approach: Binary Search on Answer**\n\nWe define search space: low = max(A) (since a student must take the largest book), high = sum(A) (if 1 student takes all books). For each mid, check if we can allocate books using at most M students. If yes, search left for a smaller maximum (high = mid - 1). If no, search right (low = mid + 1).\n\n**Time Complexity:** O(N log(sum(A)))\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "4 2\n12 34 67 90", output: "113", explanation: "Minimizing maximum pages allocated yields 113 by assigning [12, 34, 67] and [90]." },
            { title: "Example 2", input: "3 4\n10 20 30", output: "-1", explanation: "Impossible since students M > books N." }
        ],
        testcases: [
            { input: "4 2\n12 34 67 90", output: "113" },
            { input: "3 4\n10 20 30", output: "-1" },
            { input: "1 1\n50", output: "50" },
            { input: "2 1\n10 20", output: "30" },
            { input: "2 2\n10 20", output: "20" },
            { input: "5 2\n10 20 30 40 50", output: "90" },
            { input: "6 3\n15 20 10 35 15 20", output: "45" },
            { input: "4 3\n5 10 15 20", output: "20" },
            { input: "4 4\n5 10 15 20", output: "20" },
            { input: "5 1\n100 200 300 400 500", output: "1500" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
bool isPossible(const vector<long long>& A, int n, int m, long long maxPages) {
    int students = 1;
    long long currentPages = 0;
    for (int i = 0; i < n; i++) {
        if (A[i] > maxPages) return false;
        if (currentPages + A[i] > maxPages) {
            students++;
            currentPages = A[i];
            if (students > m) return false;
        } else {
            currentPages += A[i];
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> A(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> A[i];
        low = max(low, A[i]);
        high += A[i];
    }
    if (m > n) {
        cout << -1 << "\n";
        return 0;
    }
    long long ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (isPossible(A, n, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def is_possible(A, n, m, max_pages):
    students = 1
    current_pages = 0
    for i in range(n):
        if A[i] > max_pages:
            return False
        if current_pages + A[i] > max_pages:
            students += 1
            current_pages = A[i]
            if students > m:
                return False
        else:
            current_pages += A[i]
    return True

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    m = int(data[1])
    A = [int(x) for x in data[2:]]
    if m > n:
        print(-1)
        return
    low = max(A)
    high = sum(A)
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if is_possible(A, n, m, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static boolean isPossible(long[] A, int n, int m, long maxPages) {
        int students = 1;
        long currentPages = 0;
        for (int i = 0; i < n; i++) {
            if (A[i] > maxPages) return false;
            if (currentPages + A[i] > maxPages) {
                students++;
                currentPages = A[i];
                if (students > m) return false;
            } else {
                currentPages += A[i];
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        long[] A = new long[n];
        line = br.readLine();
        long low = 0, high = 0;
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                A[i] = Long.parseLong(st.nextToken());
                low = Math.max(low, A[i]);
                high += A[i];
            }
        }
        if (m > n) {
            System.out.println(-1);
            return;
        }
        long ans = -1;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (isPossible(A, n, m, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn is_possible(arr: &[i64], m: usize, max_pages: i64) -> bool {
    let mut students = 1;
    let mut current_pages = 0;
    for &val in arr {
        if val > max_pages { return false; }
        if current_pages + val > max_pages {
            students += 1;
            current_pages = val;
            if students > m { return false; }
        } else {
            current_pages += val;
        }
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let m: usize = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let arr: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            if m > n {
                writeln!(out, "-1").unwrap();
                return;
            }
            let mut low = *arr.iter().max().unwrap();
            let mut high: i64 = arr.iter().sum();
            let mut ans = -1;
            while low <= high {
                let mid = low + (high - low) / 2;
                if is_possible(&arr, m, mid) {
                    ans = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`
        }
    },

    // ==================== MEDIUM #10: Sort Colors ====================
    {
        title: "Sort Colors",
        description: "Given an array nums with N objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function, in O(N) time complexity and O(1) space complexity.\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers (each is 0, 1, or 2)\n\n**Output Format:**\n- A single line with N space-separated integers representing the sorted array",
        difficulty: "MEDIUM",
        tags: ["sorting"],
        constraints: "1 <= N <= 10^5\nnums[i] is 0, 1, or 2",
        hints: "Use the Dutch National Flag algorithm. Maintain three pointers: low, mid, and high. Keep 0s before low, 1s between low and mid, and 2s after high.",
        editorial: "**Approach: Dutch National Flag (Three-way Partitioning)**\n\nMaintain low (for 0s), mid (for 1s), and high (for 2s). Traverse the array with mid:\n- If nums[mid] == 0: swap(nums[low], nums[mid]), increment low and mid.\n- If nums[mid] == 1: increment mid.\n- If nums[mid] == 2: swap(nums[mid], nums[high]), decrement high.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "6\n2 0 2 1 1 0", output: "0 0 1 1 2 2", explanation: "The 0s, 1s, and 2s are grouped together." },
            { title: "Example 2", input: "3\n2 0 1", output: "0 1 2", explanation: "Output is sorted." }
        ],
        testcases: [
            { input: "6\n2 0 2 1 1 0", output: "0 0 1 1 2 2" },
            { input: "3\n2 0 1", output: "0 1 2" },
            { input: "1\n0", output: "0" },
            { input: "1\n1", output: "1" },
            { input: "1\n2", output: "2" },
            { input: "4\n2 2 2 2", output: "2 2 2 2" },
            { input: "5\n0 0 0 0 0", output: "0 0 0 0 0" },
            { input: "3\n1 1 1", output: "1 1 1" },
            { input: "5\n2 1 0 2 1", output: "0 1 1 2 2" },
            { input: "8\n2 0 1 2 0 1 2 0", output: "0 0 0 1 1 2 2 2" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr[mid], arr[high]);
            high--;
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
    low, mid = 0, 0
    high = n - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
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
        int low = 0, mid = 0, high = n - 1;
        while (mid <= high) {
            if (arr[mid] == 0) {
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
            } else if (arr[mid] == 1) {
                mid++;
            } else {
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(arr[i]);
            if (i < n - 1) sb.append(" ");
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
        if let Some(Ok(line2)) = lines.next() {
            let mut arr: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = 0isize;
            let mut mid = 0isize;
            let mut high = (n as isize) - 1;
            while mid <= high {
                if arr[mid as usize] == 0 {
                    arr.swap(low as usize, mid as usize);
                    low += 1;
                    mid += 1;
                } else if arr[mid as usize] == 1 {
                    mid += 1;
                } else {
                    arr.swap(mid as usize, high as usize);
                    high -= 1;
                }
            }
            let strs: Vec<String> = arr.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`
        }
    },

    // ==================== HARD #11: Find Median from Data Stream ====================
    {
        title: "Find Median from Data Stream",
        description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement a system that receives a stream of integers and prints the median after each insertion.\n\nIf the median is a whole number, print it as an integer (e.g., 3). If the median has a fractional part, print it with exactly one decimal place (e.g., 2.5).\n\n**Input Format:**\n- First line: integer N, the number of elements in the stream\n- Second line: N space-separated integers representing the stream of elements as they arrive\n\n**Output Format:**\n- A single line with N space-separated values representing the median after each insertion",
        difficulty: "HARD",
        tags: ["sorting"],
        constraints: "1 <= N <= 10^5\n-10^9 <= arr[i] <= 10^9",
        hints: "Use two heaps (priority queues): a max-heap to store the smaller half of the numbers, and a min-heap to store the larger half. Keep the sizes balanced.",
        editorial: "**Approach: Two Heaps (Max-Heap & Min-Heap)**\n\nWe maintain two heaps:\n1. max_heap: stores the smaller half of numbers (size is either equal to or 1 greater than min_heap).\n2. min_heap: stores the larger half of numbers.\n\nFor each number, add to max_heap if it is smaller than max_heap's peak, otherwise add to min_heap. Rebalance the heaps so their size difference is at most 1. The median is either the peak of max_heap (if odd size) or the average of both peaks (if even size).\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)",
        examples: [
            { title: "Example 1", input: "3\n2 3 4", output: "2 2.5 3", explanation: "Insert 2 (median 2); insert 3 (median 2.5); insert 4 (median 3)." },
            { title: "Example 2", input: "4\n5 15 1 3", output: "5 10 5 4", explanation: "5 (median 5); 15 (median 10); 1 (median 5); 3 (median 4)." }
        ],
        testcases: [
            { input: "3\n2 3 4", output: "2 2.5 3" },
            { input: "4\n5 15 1 3", output: "5 10 5 4" },
            { input: "1\n10", output: "10" },
            { input: "2\n-1 -2", output: "-1 -1.5" },
            { input: "5\n1 2 3 4 5", output: "1 1.5 2 2.5 3" },
            { input: "6\n6 5 4 3 2 1", output: "6 5.5 5 4.5 4 3.5" },
            { input: "5\n10 -10 20 -20 30", output: "10 0 10 0 10" },
            { input: "8\n1 3 -1 -3 5 7 -5 -7", output: "1 2 1 0 1 2 1 0" },
            { input: "4\n100 100 100 100", output: "100 100 100 100" },
            { input: "5\n0 0 0 0 0", output: "0 0 0 0 0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    priority_queue<long long> max_heap; // stores left half
    priority_queue<long long, vector<long long>, greater<long long>> min_heap; // stores right half
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (max_heap.empty() || x <= max_heap.top()) {
            max_heap.push(x);
        } else {
            min_heap.push(x);
        }
        
        // Rebalance
        if (max_heap.size() > min_heap.size() + 1) {
            min_heap.push(max_heap.top());
            max_heap.pop();
        } else if (min_heap.size() > max_heap.size()) {
            max_heap.push(min_heap.top());
            max_heap.pop();
        }
        
        if (i > 0) cout << " ";
        // Output median
        if (max_heap.size() > min_heap.size()) {
            cout << max_heap.top();
        } else {
            long long sum = max_heap.top() + min_heap.top();
            if (sum % 2 == 0) {
                cout << sum / 2;
            } else {
                cout << (sum / 2.0);
            }
        }
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    stream = [int(x) for x in data[1:]]
    
    max_heap = [] # left (max heap, store negative values)
    min_heap = [] # right (min heap, store positive values)
    
    ans = []
    for x in stream:
        if not max_heap or x <= -max_heap[0]:
            heapq.heappush(max_heap, -x)
        else:
            heapq.heappush(min_heap, x)
            
        # balance
        if len(max_heap) > len(min_heap) + 1:
            heapq.heappush(min_heap, -heapq.heappop(max_heap))
        elif len(min_heap) > len(max_heap):
            heapq.heappush(max_heap, -heapq.heappop(min_heap))
            
        if len(max_heap) > len(min_heap):
            ans.append(str(-max_heap[0]))
        else:
            s = -max_heap[0] + min_heap[0]
            if s % 2 == 0:
                ans.append(str(s // 2))
            else:
                ans.append(str(s / 2))
    print(" ".join(ans))

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
        line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        PriorityQueue<Long> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Long> minHeap = new PriorityQueue<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long x = Long.parseLong(st.nextToken());
            if (maxHeap.isEmpty() || x <= maxHeap.peek()) {
                maxHeap.add(x);
            } else {
                minHeap.add(x);
            }
            
            if (maxHeap.size() > minHeap.size() + 1) {
                minHeap.add(maxHeap.poll());
            } else if (minHeap.size() > maxHeap.size()) {
                maxHeap.add(minHeap.poll());
            }
            
            if (i > 0) sb.append(" ");
            if (maxHeap.size() > minHeap.size()) {
                sb.append(maxHeap.peek());
            } else {
                long sum = maxHeap.peek() + minHeap.peek();
                if (sum % 2 == 0) {
                    sb.append(sum / 2);
                } else {
                    sb.append(sum / 2.0);
                }
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let mut max_heap = BinaryHeap::new();
            let mut min_heap = BinaryHeap::new();
            
            let mut tokens = line2.split_whitespace();
            for i in 0..n {
                let x: i64 = tokens.next().unwrap().parse().unwrap();
                if max_heap.is_empty() || x <= *max_heap.peek().unwrap() {
                    max_heap.push(x);
                } else {
                    min_heap.push(Reverse(x));
                }
                
                if max_heap.len() > min_heap.len() + 1 {
                    let top = max_heap.pop().unwrap();
                    min_heap.push(Reverse(top));
                } else if min_heap.len() > max_heap.len() {
                    let Reverse(top) = min_heap.pop().unwrap();
                    max_heap.push(top);
                }
                
                if i > 0 {
                    write!(out, " ").unwrap();
                }
                if max_heap.len() > min_heap.len() {
                    write!(out, "{}", max_heap.peek().unwrap()).unwrap();
                } else {
                    let left = *max_heap.peek().unwrap();
                    let Reverse(right) = *min_heap.peek().unwrap();
                    let sum = left + right;
                    if sum % 2 == 0 {
                        write!(out, "{}", sum / 2).unwrap();
                    } else {
                        write!(out, "{}", (sum as f64) / 2.0).unwrap();
                    }
                }
            }
            writeln!(out).unwrap();
        }
    }
}`
        }
    },

    // ==================== HARD #12: Count Smaller Numbers After Self ====================
    {
        title: "Count Smaller Numbers After Self",
        description: "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].\n\n**Input Format:**\n- First line: integer N\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single line containing N space-separated integers representing the counts",
        difficulty: "HARD",
        tags: ["sorting", "divide-and-conquer", "merge-sort"],
        constraints: "1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
        hints: "Process from right to left. Use a Binary Indexed Tree (Fenwick Tree) or Segment Tree after coordinate compression to count how many elements smaller than the current element have been processed so far.",
        editorial: "**Approach: Fenwick Tree (Binary Indexed Tree) + Coordinate Compression**\n\nIterate from right to left. We map each number to its rank in sorted unique elements (coordinate compression). We query the sum in the Fenwick Tree up to rank - 1 to find how many processed elements are strictly smaller, and then increment the count of the current rank in the Fenwick Tree.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)",
        examples: [
            { title: "Example 1", input: "4\n5 2 6 1", output: "2 1 1 0", explanation: "For 5, there are 2 smaller elements to the right (2 and 1). For 2, 1 is smaller. For 6, 1 is smaller. For 1, 0 smaller." },
            { title: "Example 2", input: "4\n-1 -1 0 0", output: "0 0 0 0", explanation: "No elements strictly smaller to the right." }
        ],
        testcases: [
            { input: "4\n5 2 6 1", output: "2 1 1 0" },
            { input: "4\n-1 -1 0 0", output: "0 0 0 0" },
            { input: "1\n10", output: "0" },
            { input: "5\n5 4 3 2 1", output: "4 3 2 1 0" },
            { input: "5\n1 2 3 4 5", output: "0 0 0 0 0" },
            { input: "6\n1 3 2 3 1 2", output: "0 3 1 2 0 0" },
            { input: "2\n10 -10", output: "1 0" },
            { input: "3\n2 0 1", output: "2 0 0" },
            { input: "5\n-5 -2 -3 -1 -4", output: "0 2 1 1 0" },
            { input: "7\n7 5 6 3 4 1 2", output: "6 4 4 2 2 0 0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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

struct Fenwick {
    int size;
    vector<int> tree;
    Fenwick(int n) : size(n), tree(n + 1, 0) {}
    void add(int i, int delta) {
        for (; i <= size; i += i & -i) tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    vector<int> sorted_nums = nums;
    sort(sorted_nums.begin(), sorted_nums.end());
    sorted_nums.erase(unique(sorted_nums.begin(), sorted_nums.end()), sorted_nums.end());
    
    auto get_rank = [&](int val) {
        return lower_bound(sorted_nums.begin(), sorted_nums.end(), val) - sorted_nums.begin() + 1;
    };
    
    Fenwick bit(sorted_nums.size());
    vector<int> ans(n);
    for (int i = n - 1; i >= 0; i--) {
        int rank = get_rank(nums[i]);
        ans[i] = bit.query(rank - 1);
        bit.add(rank, 1);
    }
    
    for (int i = 0; i < n; i++) {
        cout << ans[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import bisect

class Fenwick:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1)
        
    def add(self, i, delta):
        while i <= self.size:
            self.tree[i] += delta
            i += i & -i
            
    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:]]
    
    sorted_nums = sorted(list(set(nums)))
    def get_rank(val):
        return bisect.bisect_left(sorted_nums, val) + 1
        
    bit = Fenwick(len(sorted_nums))
    ans = [0] * n
    for i in range(n - 1, -1, -1):
        rank = get_rank(nums[i])
        ans[i] = bit.query(rank - 1)
        bit.add(rank, 1)
        
    print(" ".join(map(str, ans)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Fenwick {
        int size;
        int[] tree;
        Fenwick(int n) {
            this.size = n;
            this.tree = new int[n + 1];
        }
        void add(int i, int delta) {
            for (; i <= size; i += i & -i) tree[i] += delta;
        }
        int query(int i) {
            int sum = 0;
            for (; i > 0; i -= i & -i) sum += tree[i];
            return sum;
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] nums = new int[n];
        line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                nums[i] = Integer.parseInt(st.nextToken());
            }
        }
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);
        int uniqueCount = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || sortedNums[i] != sortedNums[i - 1]) {
                sortedNums[uniqueCount++] = sortedNums[i];
            }
        }
        int[] uniqueSorted = Arrays.copyOf(sortedNums, uniqueCount);
        
        Fenwick bit = new Fenwick(uniqueCount);
        int[] ans = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            int rank = Arrays.binarySearch(uniqueSorted, nums[i]) + 1;
            ans[i] = bit.query(rank - 1);
            bit.add(rank, 1);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(ans[i]);
            if (i < n - 1) sb.append(" ");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};

struct Fenwick {
    size: usize,
    tree: Vec<i32>,
}

impl Fenwick {
    fn new(n: usize) -> Self {
        Fenwick {
            size: n,
            tree: vec![0; n + 1],
        }
    }
    fn add(&mut self, mut i: usize, delta: i32) {
        while i <= self.size {
            self.tree[i] += delta;
            i += i & (i.wrapping_neg());
        }
    }
    fn query(&self, mut i: usize) -> i32 {
        let mut sum = 0;
        while i > 0 {
            sum += self.tree[i];
            i -= i & (i.wrapping_neg());
        }
        sum
    }
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let n: usize = line.trim().parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i32> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut sorted_nums = nums.clone();
            sorted_nums.sort_unstable();
            sorted_nums.dedup();
            
            let mut bit = Fenwick::new(sorted_nums.len());
            let mut ans = vec![0; n];
            for i in (0..n).rev() {
                let val = nums[i];
                let rank = sorted_nums.binary_search(&val).unwrap() + 1;
                ans[i] = bit.query(rank - 1);
                bit.add(rank, 1);
            }
            let strs: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
            writeln!(out, "{}", strs.join(" ")).unwrap();
        }
    }
}`
        }
    },

    // ==================== HARD #13: Split Array Largest Sum ====================
    {
        title: "Split Array Largest Sum",
        description: "Given an integer array nums and an integer k, split nums into k non-empty contiguous subarrays such that the largest sum of any subarray is minimized.\n\nReturn the minimized largest sum of the split.\n\n**Input Format:**\n- First line: two space-separated integers N and K\n- Second line: N space-separated integers\n\n**Output Format:**\n- A single integer representing the minimized largest sum",
        difficulty: "HARD",
        tags: ["binary-search"],
        constraints: "1 <= N <= 10^5\n1 <= K <= min(N, 100)\n0 <= nums[i] <= 10^9",
        hints: "This is another binary search on answer problem. The search space is [max(nums), sum(nums)]. Write a helper function to verify if it is possible to split the array into at most K subarrays with a max sum limit.",
        editorial: "**Approach: Binary Search on Answer**\n\nDefine low = max(nums) and high = sum(nums). For a target sum mid, traverse the array and greedily group elements. If the current subarray sum exceeds mid, we must start a new subarray. If the total number of subarrays exceeds K, then mid is too small. Otherwise, we try a smaller maximum.\n\n**Time Complexity:** O(N log(sum(nums)))\n**Space Complexity:** O(1)",
        examples: [
            { title: "Example 1", input: "5 2\n7 2 5 10 8", output: "18", explanation: "Split into [7, 2, 5] and [10, 8]. The largest sum of the subarrays is 18." },
            { title: "Example 2", input: "5 3\n1 2 3 4 5", output: "6", explanation: "Split into [1, 2, 3], [4], and [5]. The largest sum of the subarrays is 6." }
        ],
        testcases: [
            { input: "5 2\n7 2 5 10 8", output: "18" },
            { input: "5 3\n1 2 3 4 5", output: "6" },
            { input: "1 1\n100", output: "100" },
            { input: "2 1\n10 20", output: "30" },
            { input: "2 2\n10 20", output: "20" },
            { input: "6 3\n1 2 3 4 5 6", output: "9" },
            { input: "5 2\n1 2 10 3 4", output: "13" },
            { input: "4 2\n10 20 30 40", output: "60" },
            { input: "4 3\n10 20 30 40", output: "40" },
            { input: "5 5\n100 200 300 400 500", output: "500" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
bool canSplit(const vector<long long>& nums, int k, long long max_sum) {
    long long current_sum = 0;
    int count = 1;
    for (long long num : nums) {
        if (current_sum + num > max_sum) {
            count++;
            current_sum = num;
            if (count > k) return false;
        } else {
            current_sum += num;
        }
    }
    return true;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
        low = max(low, nums[i]);
        high += nums[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canSplit(nums, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\n";
    return 0;
}`,
            python: `import sys
def can_split(nums, k, max_sum):
    current_sum = 0
    count = 1
    for num in nums:
        if current_sum + num > max_sum:
            count += 1
            current_sum = num
            if count > k:
                return False
        else:
            current_sum += num
    return True

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    nums = [int(x) for x in data[2:]]
    low = max(nums)
    high = sum(nums)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if can_split(nums, k, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static boolean canSplit(long[] nums, int k, long max_sum) {
        long current_sum = 0;
        int count = 1;
        for (long num : nums) {
            if (current_sum + num > max_sum) {
                count++;
                current_sum = num;
                if (count > k) return false;
            } else {
                current_sum += num;
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        long[] nums = new long[n];
        line = br.readLine();
        long low = 0, high = 0;
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                nums[i] = Long.parseLong(st.nextToken());
                low = Math.max(low, nums[i]);
                high += nums[i];
            }
        }
        long ans = high;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (canSplit(nums, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
fn can_split(nums: &[i64], k: usize, max_sum: i64) -> bool {
    let mut current_sum = 0;
    let mut count = 1;
    for &num in nums {
        if current_sum + num > max_sum {
            count += 1;
            current_sum = num;
            if count > k { return false; }
        } else {
            current_sum += num;
        }
    }
    true
}
fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let n: usize = parts[0].parse().unwrap();
        let k: usize = parts[1].parse().unwrap();
        if let Some(Ok(line2)) = lines.next() {
            let nums: Vec<i64> = line2.split_whitespace()
                .map(|x| x.parse().unwrap()).collect();
            let mut low = *nums.iter().max().unwrap();
            let mut high: i64 = nums.iter().sum();
            let mut ans = high;
            while low <= high {
                let mid = low + (high - low) / 2;
                if can_split(&nums, k, mid) {
                    ans = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            writeln!(out, "{}", ans).unwrap();
        }
    }
}`
        }
    },

    // ==================== HARD #14: Russian Doll Envelopes ====================
    {
        title: "Russian Doll Envelopes",
        description: "You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.\n\nOne envelope can fit into another if and only if both the width and height of one envelope are strictly greater than the other envelope's width and height.\n\nReturn the maximum number of envelopes you can Russian doll (i.e., put one inside another).\n\nNote: You cannot rotate the envelopes.\n\n**Input Format:**\n- First line: integer N\n- Next N lines: each line contains two space-separated integers wi and hi\n\n**Output Format:**\n- A single integer representing the maximum number of envelopes",
        difficulty: "HARD",
        tags: ["sorting", "binary-search"],
        constraints: "1 <= N <= 10^5\n1 <= wi, hi <= 10^9",
        hints: "Sort the envelopes. Width in ascending order, and height in descending order for envelopes with the same width. Then, find the length of the Longest Increasing Subsequence (LIS) on the heights.",
        editorial: "**Approach: LIS in O(N log N)**\n\n1. Sort envelopes by width ascending. If widths are equal, sort height descending.\n2. This sorting ensures that for the same width, we cannot choose more than one envelope because we are looking for a strictly increasing subsequence of heights.\n3. Run the standard LIS algorithm using binary search (patience sorting) on the heights.\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N)",
        examples: [
            { title: "Example 1", input: "4\n5 4\n6 4\n6 7\n2 3", output: "3", explanation: "The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7])." },
            { title: "Example 2", input: "3\n1 1\n1 1\n1 1", output: "1", explanation: "We cannot put any envelope inside another because they are identical size." }
        ],
        testcases: [
            { input: "4\n5 4\n6 4\n6 7\n2 3", output: "3" },
            { input: "3\n1 1\n1 1\n1 1", output: "1" },
            { input: "1\n10 10", output: "1" },
            { input: "4\n1 2\n2 3\n3 4\n3 5", output: "3" },
            { input: "4\n1 3\n3 5\n2 4\n4 6", output: "4" },
            { input: "5\n2 10\n3 20\n4 30\n5 5\n6 40", output: "4" },
            { input: "6\n10 20\n15 25\n12 22\n14 24\n18 28\n16 26", output: "6" },
            { input: "5\n1 1\n2 2\n3 3\n2 1\n1 2", output: "3" },
            { input: "3\n5 4\n6 4\n6 5", output: "2" },
            { input: "10\n10 8\n1 12\n6 15\n2 18\n11 19\n17 2\n14 5\n12 15\n10 13\n12 19", output: "3" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> envelopes(n);
    for (int i = 0; i < n; i++) {
        cin >> envelopes[i].first >> envelopes[i].second;
    }
    sort(envelopes.begin(), envelopes.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
        if (a.first == b.first) return a.second > b.second;
        return a.first < b.first;
    });
    vector<int> tails;
    for (int i = 0; i < n; i++) {
        int h = envelopes[i].second;
        auto it = lower_bound(tails.begin(), tails.end(), h);
        if (it == tails.end()) {
            tails.push_back(h);
        } else {
            *it = h;
        }
    }
    cout << tails.size() << "\n";
    return 0;
}`,
            python: `import sys
import bisect

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    envelopes = []
    idx = 1
    for _ in range(n):
        w = int(data[idx])
        h = int(data[idx+1])
        envelopes.append((w, h))
        idx += 2
        
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    
    tails = []
    for _, h in envelopes:
        pos = bisect.bisect_left(tails, h)
        if pos == len(tails):
            tails.append(h)
        else:
            tails[pos] = h
            
    print(len(tails))

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
        int[][] envelopes = new int[n][2];
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line != null) {
                StringTokenizer st = new StringTokenizer(line);
                envelopes[i][0] = Integer.parseInt(st.nextToken());
                envelopes[i][1] = Integer.parseInt(st.nextToken());
            }
        }
        Arrays.sort(envelopes, (a, b) -> {
            if (a[0] == b[0]) return b[1] - a[1];
            return a[0] - b[0];
        });
        ArrayList<Integer> tails = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int h = envelopes[i][1];
            int idx = Collections.binarySearch(tails, h);
            if (idx < 0) {
                idx = -(idx + 1);
            }
            if (idx == tails.size()) {
                tails.add(h);
            } else {
                tails.set(idx, h);
            }
        }
        System.out.println(tails.size());
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
        let mut envelopes = Vec::with_capacity(n);
        for _ in 0..n {
            if let Some(Ok(line_env)) = lines.next() {
                let parts: Vec<i32> = line_env.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                envelopes.push((parts[0], parts[1]));
            }
        }
        envelopes.sort_by(|a, b| {
            if a.0 == b.0 {
                b.1.cmp(&a.1)
            } else {
                a.0.cmp(&b.0)
            }
        });
        let mut tails = Vec::new();
        for (_, h) in envelopes {
            match tails.binary_search(&h) {
                Ok(idx) => tails[idx] = h,
                Err(idx) => {
                    if idx == tails.len() {
                        tails.push(h);
                    } else {
                        tails[idx] = h;
                    }
                }
            }
        }
        writeln!(out, "{}", tails.len()).unwrap();
    }
}`
        }
    },

    // ==================== HARD #15: Merge K Sorted Arrays ====================
    {
        title: "Merge K Sorted Arrays",
        description: "Given K sorted arrays, each of size N, merge them and print the sorted output as a single array.\n\n**Input Format:**\n- First line: two space-separated integers K and N\n- Next K lines: each line contains N space-separated integers representing a sorted array\n\n**Output Format:**\n- A single line containing K * N space-separated integers representing the merged sorted array",
        difficulty: "HARD",
        tags: ["sorting", "divide-and-conquer", "merge-sort"],
        constraints: "1 <= K <= 500\n1 <= N <= 500\n-10^9 <= arr[i][j] <= 10^9",
        hints: "Use a min-heap to keep track of the smallest element among the current elements of all K arrays. Pop the minimum element, output it, and push the next element from that array.",
        editorial: "**Approach: Min-Heap (Priority Queue)**\n\nCreate a min-heap that stores elements of the form (value, array_index, element_index). Push the first element of each of the K arrays into the heap. In each step, extract the minimum element, output it, and if there are more elements in the corresponding array, push the next element into the heap.\n\n**Time Complexity:** O(K * N * log K)\n**Space Complexity:** O(K) auxiliary space",
        examples: [
            { title: "Example 1", input: "3 4\n1 5 6 8\n2 4 10 12\n3 7 9 11", output: "1 2 3 4 5 6 7 8 9 10 11 12", explanation: "All 3 sorted arrays are merged into one sorted array." },
            { title: "Example 2", input: "2 3\n1 3 5\n2 4 6", output: "1 2 3 4 5 6", explanation: "Merged into a single sorted array." }
        ],
        testcases: [
            { input: "3 4\n1 5 6 8\n2 4 10 12\n3 7 9 11", output: "1 2 3 4 5 6 7 8 9 10 11 12" },
            { input: "2 3\n1 3 5\n2 4 6", output: "1 2 3 4 5 6" },
            { input: "1 1\n42", output: "42" },
            { input: "2 1\n10\n5", output: "5 10" },
            { input: "3 2\n10 20\n5 15\n2 8", output: "2 5 8 10 15 20" },
            { input: "4 1\n4\n3\n2\n1", output: "1 2 3 4" },
            { input: "2 5\n1 2 3 4 5\n6 7 8 9 10", output: "1 2 3 4 5 6 7 8 9 10" },
            { input: "2 5\n6 7 8 9 10\n1 2 3 4 5", output: "1 2 3 4 5 6 7 8 9 10" },
            { input: "3 3\n1 1 1\n2 2 2\n3 3 3", output: "1 1 1 2 2 2 3 3 3" },
            { input: "4 2\n-10 -5\n-8 -3\n-6 -1\n0 5", output: "-10 -8 -6 -5 -3 -1 0 5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

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
struct Element {
    long long val;
    int arrIdx;
    int eleIdx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    vector<vector<long long>> arrays(k, vector<long long>(n));
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for (int i = 0; i < k; i++) {
        for (int j = 0; j < n; j++) {
            cin >> arrays[i][j];
        }
        pq.push({arrays[i][0], i, 0});
    }
    vector<long long> result;
    while (!pq.empty()) {
        Element curr = pq.top();
        pq.pop();
        result.push_back(curr.val);
        if (curr.eleIdx + 1 < n) {
            pq.push({arrays[curr.arrIdx][curr.eleIdx + 1], curr.arrIdx, curr.eleIdx + 1});
        }
    }
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << (i == result.size() - 1 ? "" : " ");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    k = int(data[0])
    n = int(data[1])
    arrays = []
    idx = 2
    for _ in range(k):
        arrays.append([int(x) for x in data[idx:idx+n]])
        idx += n
        
    pq = []
    for i in range(k):
        heapq.heappush(pq, (arrays[i][0], i, 0))
        
    result = []
    while pq:
        val, arr_idx, ele_idx = heapq.heappop(pq)
        result.append(val)
        if ele_idx + 1 < n:
            heapq.heappush(pq, (arrays[arr_idx][ele_idx + 1], arr_idx, ele_idx + 1))
            
    print(" ".join(map(str, result)))

if __name__ == '__main__':
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Element implements Comparable<Element> {
        long val;
        int arrIdx;
        int eleIdx;
        Element(long val, int arrIdx, int eleIdx) {
            this.val = val;
            this.arrIdx = arrIdx;
            this.eleIdx = eleIdx;
        }
        public int compareTo(Element other) {
            return Long.compare(this.val, other.val);
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int k = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        long[][] arrays = new long[k][n];
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (int i = 0; i < k; i++) {
            line = br.readLine();
            if (line != null) {
                st = new StringTokenizer(line);
                for (int j = 0; j < n; j++) {
                    arrays[i][j] = Long.parseLong(st.nextToken());
                }
                pq.add(new Element(arrays[i][0], i, 0));
            }
        }
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        while (!pq.isEmpty()) {
            Element curr = pq.poll();
            if (!first) sb.append(" ");
            first = false;
            sb.append(curr.val);
            if (curr.eleIdx + 1 < n) {
                pq.add(new Element(arrays[curr.arrIdx][curr.eleIdx + 1], curr.arrIdx, curr.eleIdx + 1));
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead, Write, BufWriter};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Copy, Clone, Eq, PartialEq)]
struct Element {
    val: i64,
    arr_idx: usize,
    ele_idx: usize,
}

impl Ord for Element {
    fn cmp(&self, other: &Self) -> Ordering {
        other.val.cmp(&self.val)
    }
}

impl PartialOrd for Element {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 2 { return; }
        let k: usize = parts[0].parse().unwrap();
        let n: usize = parts[1].parse().unwrap();
        let mut arrays = vec![vec![0i64; n]; k];
        let mut pq = BinaryHeap::new();
        for i in 0..k {
            if let Some(Ok(line_arr)) = lines.next() {
                let row: Vec<i64> = line_arr.split_whitespace()
                    .map(|x| x.parse().unwrap()).collect();
                for j in 0..n {
                    arrays[i][j] = row[j];
                }
                pq.push(Element { val: arrays[i][0], arr_idx: i, ele_idx: 0 });
            }
        }
        let mut result = Vec::with_capacity(k * n);
        while let Some(Element { val, arr_idx, ele_idx }) = pq.pop() {
            result.push(val);
            if ele_idx + 1 < n {
                pq.push(Element { val: arrays[arr_idx][ele_idx + 1], arr_idx, ele_idx: ele_idx + 1 });
            }
        }
        let strs: Vec<String> = result.iter().map(|x| x.to_string()).collect();
        writeln!(out, "{}", strs.join(" ")).unwrap();
    }
}`
        }
    }
]
