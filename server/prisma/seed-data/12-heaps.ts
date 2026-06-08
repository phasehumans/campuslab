import type { SeedProblem } from './types.js'

export const heapsProblems: SeedProblem[] = [
    // ==================== EASY #1: Kth Largest Element in a Stream ====================
    {
        title: "Kth Largest Element in a Stream",
        description: "Design a system that processes a stream of integers and finds the k-th largest element at any point.\n\nYou need to output the k-th largest element starting from the k-th insertion. Specifically, you will be given an array representing the order of elements arriving in the stream. For each element that is added, if the stream has at least k elements, output the current k-th largest element.\n\n**Input Format:**\n- First line: two space-separated integers, k and n (the size of the stream)\n- Second line: n space-separated integers representing the stream of elements in the order they arrive\n\n**Output Format:**\n- A single line containing n - k + 1 space-separated integers, representing the k-th largest element after each insertion starting from the k-th element.",
        difficulty: "EASY",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= k <= n <= 10^5\n-10^9 <= stream[i] <= 10^9",
        hints: "Use a min-heap (priority queue) of size k to store the k largest elements seen so far. When the heap size exceeds k, pop the smallest element. The top of the heap will always be the k-th largest element.",
        editorial: "**Approach: Min-Heap of Size K**\n\nTo find the k-th largest element in a stream, we can maintain a Min-Heap of size k. For each new element from the stream:\n1. Push the element into the min-heap.\n2. If the heap size exceeds k, pop the top (minimum) element.\n3. If the heap size is exactly k, the root of the heap (the minimum among the k largest elements) is the k-th largest element in the stream.\n\n**Time Complexity:** O(n log k) as each of the n insertions takes O(log k) time.\n**Space Complexity:** O(k) to store the k largest elements in the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3 6\n3 5 10 9 4 8",
                output: "3 5 5 8",
                explanation: "For k = 3, after 3 elements [3, 5, 10], the 3rd largest is 3. After adding 9 [3, 5, 10, 9], the 3rd largest is 5. After adding 4, the 3rd largest is 5. After adding 8, the 3rd largest is 8."
            },
            {
                title: "Example 2",
                input: "1 4\n-1 2 0 4",
                output: "-1 2 2 4",
                explanation: "For k = 1, we output the maximum element seen so far at each step."
            }
        ],
        testcases: [
            { input: "3 6\n3 5 10 9 4 8", output: "3 5 5 8" },
            { input: "1 4\n-1 2 0 4", output: "-1 2 2 4" },
            { input: "2 5\n1 2 3 4 5", output: "1 2 3 4" },
            { input: "5 5\n10 10 10 10 10", output: "10" },
            { input: "4 6\n-5 -10 -2 -1 -8 -7", output: "-10 -8 -7" },
            { input: "3 3\n1 2 3", output: "1" },
            { input: "2 10\n9 8 7 6 5 4 3 2 1 0", output: "8 8 8 8 8 8 8 8 8" },
            { input: "3 8\n100 500 200 400 300 800 700 600", output: "100 200 300 400 500 600" },
            { input: "1 1\n42", output: "42" },
            { input: "2 4\n1000000000 -1000000000 0 500000000", output: "-1000000000 0 500000000" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read k, n and the stream
    
    return 0;
}`,
            python: `def main():
    # Read k, n and the stream
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read k, n and the stream
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read k, n and the stream
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k, n;
    if (!(cin >> k >> n)) return 0;
    priority_queue<int, vector<int>, greater<int>> pq;
    bool first = true;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        pq.push(val);
        if (pq.size() > k) {
            pq.pop();
        }
        if (pq.size() == k) {
            if (!first) cout << " ";
            cout << pq.top();
            first = false;
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
    k = int(data[0])
    n = int(data[1])
    arr = [int(x) for x in data[2:]]
    
    pq = []
    out = []
    for val in arr:
        heapq.heappush(pq, val)
        if len(pq) > k:
            heapq.heappop(pq)
        if len(pq) == k:
            out.append(str(pq[0]))
    print(" ".join(out))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int k = Integer.parseInt(st.nextToken());
        int n = Integer.parseInt(st.nextToken());
        
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (int i = 0; i < n; i++) {
            int val = Integer.parseInt(st.nextToken());
            pq.offer(val);
            if (pq.size() > k) {
                pq.poll();
            }
            if (pq.size() == k) {
                if (!first) sb.append(" ");
                sb.append(pq.peek());
                first = false;
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let k: usize = parts.next().unwrap().parse().unwrap();
    let n: usize = parts.next().unwrap().parse().unwrap();
    
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let nums: Vec<i32> = second_line.split_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();
        
    let mut pq = BinaryHeap::new();
    let mut out = Vec::new();
    for &val in &nums {
        pq.push(Reverse(val));
        if pq.len() > k {
            pq.pop();
        }
        if pq.len() == k {
            if let Some(&Reverse(top)) = pq.peek() {
                out.push(top.to_string());
            }
        }
    }
    println!("{}", out.join(" "));
}`
        }
    },

    // ==================== EASY #2: Last Stone Weight ====================
    {
        title: "Last Stone Weight",
        description: "You are given an array of integers representing the weights of stones. We play a game with the stones.\n\nOn each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:\n- If x == y, both stones are totally destroyed;\n- If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y - x.\n\nAt the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.\n\n**Input Format:**\n- First line: an integer n (number of stones)\n- Second line: n space-separated integers representing the initial stone weights\n\n**Output Format:**\n- A single integer: the weight of the last stone or 0 if no stones remain",
        difficulty: "EASY",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= n <= 10^5\n1 <= stones[i] <= 1000",
        hints: "We always need to quickly fetch and remove the two largest elements. A Max-Heap (priority queue) is ideal for this. Pop the two largest stones, calculate their difference, and push the difference back if it's positive.",
        editorial: "**Approach: Max-Heap / Priority Queue**\n\nWe can simulate the game using a Max-Heap:\n1. Insert all stone weights into a max-heap.\n2. In each iteration, pop the top two elements: y (heaviest) and x (second heaviest).\n3. If y > x, push y - x back into the heap.\n4. Repeat until there is 1 or 0 elements left in the heap.\n5. If the heap is empty, return 0; else return the only remaining element.\n\n**Time Complexity:** O(n log n) because we perform at most n - 1 smashes, and each smash does O(log n) heap operations.\n**Space Complexity:** O(n) to store the heap elements.",
        examples: [
            {
                title: "Example 1",
                input: "6\n2 7 4 1 8 1",
                output: "1",
                explanation: "We combine 7 and 8 to get 1, array becomes [2,4,1,1,1]. Combine 2 and 4 to get 2, array becomes [2,1,1,1]. Combine 2 and 1 to get 1, array becomes [1,1,1]. Combine 1 and 1 to get 0, array becomes [1]. The last stone has weight 1."
            },
            {
                title: "Example 2",
                input: "1\n5",
                output: "5",
                explanation: "There is only one stone, so we return its weight immediately."
            }
        ],
        testcases: [
            { input: "6\n2 7 4 1 8 1", output: "1" },
            { input: "1\n5", output: "5" },
            { input: "2\n10 10", output: "0" },
            { input: "5\n1 2 3 4 5", output: "1" },
            { input: "4\n3 5 8 13", output: "3" },
            { input: "3\n7 7 7", output: "7" },
            { input: "5\n100 100 100 100 100", output: "100" },
            { input: "8\n1 1 1 1 1 1 1 1", output: "0" },
            { input: "7\n1 1 1 1 1 1 1", output: "1" },
            { input: "6\n10 20 30 40 50 60", output: "10" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and the stones array, simulate
    
    return 0;
}`,
            python: `def main():
    # Read n and the stones array, simulate
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and the stones array, simulate
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and the stones array, simulate
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
    priority_queue<int> pq;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pq.push(x);
    }
    while (pq.size() > 1) {
        int y = pq.top(); pq.pop();
        int x = pq.top(); pq.pop();
        if (y > x) {
            pq.push(y - x);
        }
    }
    if (pq.empty()) cout << 0 << "\n";
    else cout << pq.top() << "\n";
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
    stones = [int(x) for x in data[1:]]
    pq = [-x for x in stones]
    heapq.heapify(pq)
    while len(pq) > 1:
        y = -heapq.heappop(pq)
        x = -heapq.heappop(pq)
        if y > x:
            heapq.heappush(pq, -(y - x))
    if not pq:
        print(0)
    else:
        print(-pq[0])

if __name__ == "__main__":
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
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int i = 0; i < n; i++) {
            pq.offer(Integer.parseInt(st.nextToken()));
        }
        while (pq.size() > 1) {
            int y = pq.poll();
            int x = pq.poll();
            if (y > x) {
                pq.offer(y - x);
            }
        }
        if (pq.isEmpty()) {
            System.out.println(0);
        } else {
            System.out.println(pq.peek());
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = first_line.trim().parse().unwrap();
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut pq = BinaryHeap::new();
    for item in second_line.split_whitespace() {
        let val: i32 = item.parse().unwrap();
        pq.push(val);
    }
    while pq.len() > 1 {
        let y = pq.pop().unwrap();
        let x = pq.pop().unwrap();
        if y > x {
            pq.push(y - x);
        }
    }
    if let Some(ans) = pq.peek() {
        println!("{}", ans);
    } else {
        println!("0");
    }
}`
        }
    },

    // ==================== EASY #3: Check if Array is Heap ====================
    {
        title: "Check if Array is Heap",
        description: "Given a 0-indexed integer array representation of a binary tree, determine if the tree represents a valid Max-Heap.\n\nIn a binary tree represented as an array, the left child of the node at index i is at index 2*i + 1, and the right child is at index 2*i + 2. The tree is a Max-Heap if for every node i, its value is greater than or equal to the values of its children.\n\n**Input Format:**\n- First line: integer n (size of the array)\n- Second line: n space-separated integers\n\n**Output Format:**\n- Print \"true\" if the array is a max-heap, \"false\" otherwise.",
        difficulty: "EASY",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9",
        hints: "Iterate through the array from index 0 to (n - 2) / 2. For each parent index, check if its left and right children (if they exist) are smaller than or equal to the parent.",
        editorial: "**Approach: Direct Verification of Parent-Child Invariant**\n\nFor a 0-indexed array of size n, only nodes at indices up to (n - 2) / 2 can have children. We can check each node i in this range:\n1. Left child index is 2*i + 1. If 2*i + 1 < n and arr[i] < arr[2*i + 1], then it's not a Max-Heap.\n2. Right child index is 2*i + 2. If 2*i + 2 < n and arr[i] < arr[2*i + 2], then it's not a Max-Heap.\nIf no node violates this property, then it is a valid Max-Heap.\n\n**Time Complexity:** O(n) as we scan the array elements once.\n**Space Complexity:** O(1) auxiliary space.",
        examples: [
            {
                title: "Example 1",
                input: "6\n90 15 10 7 12 2",
                output: "true",
                explanation: "Parent 90 has children 15 and 10. Parent 15 has children 7 and 12. Parent 10 has child 2. All parents are greater than or equal to their children."
            },
            {
                title: "Example 2",
                input: "6\n9 15 10 7 12 2",
                output: "false",
                explanation: "The root 9 is smaller than its left child 15."
            }
        ],
        testcases: [
            { input: "6\n90 15 10 7 12 2", output: "true" },
            { input: "6\n9 15 10 7 12 2", output: "false" },
            { input: "1\n42", output: "true" },
            { input: "5\n10 10 10 10 10", output: "true" },
            { input: "8\n20 18 10 12 15 9 8 14", output: "false" },
            { input: "8\n20 18 10 12 15 9 8 5", output: "true" },
            { input: "3\n1 2 3", output: "false" },
            { input: "4\n100 50 80 60", output: "false" },
            { input: "4\n100 80 50 60", output: "true" },
            { input: "10\n1000 900 800 700 600 500 400 300 200 100", output: "true" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read array and verify Max-Heap properties
    
    return 0;
}`,
            python: `def main():
    # Read array and verify Max-Heap properties
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read array and verify Max-Heap properties
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read array and verify Max-Heap properties
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
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    bool is_heap = true;
    for (int i = 0; i <= (n - 2) / 2; i++) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < n && arr[i] < arr[left]) {
            is_heap = false;
            break;
        }
        if (right < n && arr[i] < arr[right]) {
            is_heap = false;
            break;
        }
    }
    if (is_heap) cout << "true\n";
    else cout << "false\n";
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
    
    is_heap = True
    for i in range((n - 2) // 2 + 1):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and arr[i] < arr[left]:
            is_heap = False
            break
        if right < n and arr[i] < arr[right]:
            is_heap = False
            break
            
    print("true" if is_heap else "false")

if __name__ == "__main__":
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
        long[] arr = new long[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Long.parseLong(st.nextToken());
        }
        boolean isHeap = true;
        for (int i = 0; i <= (n - 2) / 2; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            if (left < n && arr[i] < arr[left]) {
                isHeap = false;
                break;
            }
            if (right < n && arr[i] < arr[right]) {
                isHeap = false;
                break;
            }
        }
        System.out.println(isHeap ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = first_line.trim().parse().unwrap();
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let arr: Vec<i64> = second_line.split_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();
    
    let mut is_heap = true;
    for i in 0..=((n as isize - 2) / 2) as usize {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if left < n && arr[i] < arr[left] {
            is_heap = false;
            break;
        }
        if right < n && arr[i] < arr[right] {
            is_heap = false;
            break;
        }
    }
    if is_heap {
        println!("true");
    } else {
        println!("false");
    }
}`
        }
    },

    // ==================== MEDIUM #1: Kth Largest Element in an Array ====================
    {
        title: "Kth Largest Element in an Array",
        description: "Given an unsorted array of integers and an integer k, find the k-th largest element in the array.\n\nNote that it is the k-th largest element in sorted order, not the k-th distinct element.\n\n**Input Format:**\n- First line: two integers n (size of the array) and k\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the k-th largest element",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= k <= n <= 10^5\n-10^9 <= arr[i] <= 10^9",
        hints: "You can use a min-heap of size k. After adding all n elements, the heap will contain the k largest elements, and the top will be the k-th largest.",
        editorial: "**Approach: Min-Heap of size K**\n\nWe keep a Min-Heap of size k. For each element:\n- Push it into the heap.\n- If heap size grows past k, pop the top element.\nAfter processing all elements, the min-heap holds the k largest elements of the array. The root of the heap is the k-th largest element in the array.\n\n**Time Complexity:** O(n log k)\n**Space Complexity:** O(k)",
        examples: [
            {
                title: "Example 1",
                input: "6 2\n3 2 1 5 6 4",
                output: "5",
                explanation: "The sorted array is [1, 2, 3, 4, 5, 6]. The 2nd largest element is 5."
            },
            {
                title: "Example 2",
                input: "9 4\n3 2 3 1 2 4 5 5 6",
                output: "4",
                explanation: "The sorted array is [1, 2, 2, 3, 3, 4, 5, 5, 6]. The 4th largest element is 4."
            }
        ],
        testcases: [
            { input: "6 2\n3 2 1 5 6 4", output: "5" },
            { input: "9 4\n3 2 3 1 2 4 5 5 6", output: "4" },
            { input: "1 1\n42", output: "42" },
            { input: "5 5\n10 10 10 10 10", output: "10" },
            { input: "8 1\n-5 -10 -2 -1 -8 -7 -3 -4", output: "-1" },
            { input: "8 8\n-5 -10 -2 -1 -8 -7 -3 -4", output: "-10" },
            { input: "10 5\n12 3 5 7 19 26 15 2 23 9", output: "12" },
            { input: "4 3\n100 200 100 200", output: "100" },
            { input: "7 3\n1 1 2 2 3 3 4", output: "3" },
            { input: "2 1\n1000000000 -1000000000", output: "1000000000" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Find the k-th largest element using priority queue
    
    return 0;
}`,
            python: `def main():
    # Find the k-th largest element using heap
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Find the k-th largest element using priority queue
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Find the k-th largest element using BinaryHeap
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
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pq.push(x);
        if (pq.size() > k) {
            pq.pop();
        }
    }
    cout << pq.top() << "\n";
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
    k = int(data[1])
    arr = [int(x) for x in data[2:]]
    
    pq = []
    for x in arr:
        heapq.heappush(pq, x)
        if len(pq) > k:
            heapq.heappop(pq)
    print(pq[0])

if __name__ == "__main__":
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
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            pq.offer(Integer.parseInt(st.nextToken()));
            if (pq.size() > k) {
                pq.poll();
            }
        }
        System.out.println(pq.peek());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut pq = BinaryHeap::new();
    for item in second_line.split_whitespace() {
        let val: i32 = item.parse().unwrap();
        pq.push(Reverse(val));
        if pq.len() > k {
            pq.pop();
        }
    }
    if let Some(&Reverse(ans)) = pq.peek() {
        println!("{}", ans);
    }
}`
        }
    },

    // ==================== MEDIUM #2: Top K Frequent Elements ====================
    {
        title: "Top K Frequent Elements",
        description: "Given an integer array nums and an integer k, return the k most frequent elements.\n\nTo ensure a unique result:\n- Sort the elements in descending order of frequency.\n- If two elements have the same frequency, the one with the larger numerical value must come first.\n\n**Input Format:**\n- First line: two integers n (size of array) and k\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single line containing k space-separated integers, representing the top k frequent elements sorted as specified.",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= k <= n <= 10^5\n-10^9 <= nums[i] <= 10^9\nThere are at least k unique elements in nums.",
        hints: "1. Count frequencies using a hash map.\n2. Push the unique elements into a Max-Heap. The heap comparator should sort by frequency descending, and on tie, by value descending.",
        editorial: "**Approach: Hash Map + Heap**\n\n1. Count the occurrences of each element using a frequency map/hash map.\n2. Insert the (frequency, value) pairs into a Max-Heap (or binary heap).\n3. Compare elements based on frequency first (higher frequency has priority). If frequencies are equal, compare values (larger value has priority).\n4. Pop k elements from the heap and print them.\n\n**Time Complexity:** O(n + u log u) where u is the number of unique elements (u <= n).\n**Space Complexity:** O(u) for map and heap.",
        examples: [
            {
                title: "Example 1",
                input: "6 2\n1 1 1 2 2 3",
                output: "1 2",
                explanation: "1 appears 3 times, 2 appears 2 times, 3 appears 1 time. The 2 most frequent are [1, 2]."
            },
            {
                title: "Example 2",
                input: "1 1\n1",
                output: "1"
            }
        ],
        testcases: [
            { input: "6 2\n1 1 1 2 2 3", output: "1 2" },
            { input: "1 1\n1", output: "1" },
            { input: "5 2\n1 2 3 4 5", output: "5 4" },
            { input: "7 3\n2 2 3 3 4 4 4", output: "4 3 2" },
            { input: "8 2\n-1 -1 -1 -2 -2 3 3 3", output: "3 -1" },
            { input: "6 3\n10 10 20 20 30 30", output: "30 20 10" },
            { input: "5 1\n9 9 9 9 9", output: "9" },
            { input: "10 4\n1 2 2 3 3 3 4 4 4 4", output: "4 3 2 1" },
            { input: "6 2\n5 5 5 100 100 2", output: "5 100" },
            { input: "9 3\n1000000000 1000000000 1000000000 -1 -1 -1 5 5 12", output: "1000000000 -1 5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read nums, count frequencies, and sort with heap
    
    return 0;
}`,
            python: `def main():
    # Read nums, count frequencies, and sort with heap
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read nums, count frequencies, and sort with heap
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read nums, count frequencies, and sort with heap
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int freq;
    bool operator<(const Element& other) const {
        if (freq != other.freq) {
            return freq < other.freq;
        }
        return val < other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    unordered_map<int, int> counts;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        counts[x]++;
    }
    priority_queue<Element> pq;
    for (auto& pair : counts) {
        pq.push({pair.first, pair.second});
    }
    for (int i = 0; i < k; i++) {
        if (i > 0) cout << " ";
        cout << pq.top().val;
        pq.pop();
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
from collections import Counter
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    nums = [int(x) for x in data[2:]]
    
    counts = Counter(nums)
    pq = []
    for val, freq in counts.items():
        heapq.heappush(pq, (-freq, -val, val))
        
    out = []
    for _ in range(k):
        _, _, val = heapq.heappop(pq)
        out.append(str(val))
    print(" ".join(out))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Element implements Comparable<Element> {
        int val;
        int freq;
        Element(int val, int freq) {
            this.val = val;
            this.freq = freq;
        }
        @Override
        public int compareTo(Element other) {
            if (this.freq != other.freq) {
                return Integer.compare(other.freq, this.freq);
            }
            return Integer.compare(other.val, this.val);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = Integer.parseInt(st.nextToken());
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            pq.offer(new Element(entry.getKey(), entry.getValue()));
        }
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) sb.append(" ");
            sb.append(pq.poll().val);
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::{HashMap, BinaryHeap};

#[derive(Eq, PartialEq)]
struct Element {
    val: i32,
    freq: i32,
}

impl Ord for Element {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.freq.cmp(&other.freq)
            .then_with(|| self.val.cmp(&other.val))
    }
}

impl PartialOrd for Element {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut counts = HashMap::new();
    for item in second_line.split_whitespace() {
        let val: i32 = item.parse().unwrap();
        *counts.entry(val).or_insert(0) += 1;
    }
    
    let mut pq = BinaryHeap::new();
    for (val, freq) in counts {
        pq.push(Element { val, freq });
    }
    
    let mut out = Vec::new();
    for _ in 0..k {
        if let Some(el) = pq.pop() {
            out.push(el.val.to_string());
        }
    }
    println!("{}", out.join(" "));
}`
        }
    },

    // ==================== MEDIUM #3: Find K Pairs with Smallest Sums ====================
    {
        title: "Find K Pairs with Smallest Sums",
        description: "You are given two integer arrays nums1 and nums2 sorted in non-decreasing order, and an integer k.\n\nDefine a pair (u, v) which consists of one element from nums1 and one element from nums2. Find the k pairs with the smallest sums.\n\nTo ensure a unique output:\n- Sort the pairs by their sum in ascending order.\n- If two pairs have the same sum, sort them lexicographically (i.e., by their first element, then by their second element).\n\n**Input Format:**\n- First line: two integers, the size of nums1 (n1) and nums2 (n2)\n- Second line: n1 space-separated integers representing nums1\n- Third line: n2 space-separated integers representing nums2\n- Fourth line: integer k\n\n**Output Format:**\n- k lines (or fewer if total pairs is less than k), each containing two space-separated integers representing a pair.",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= n1, n2 <= 10^5\n-10^9 <= nums1[i], nums2[j] <= 10^9\n1 <= k <= 10^4\nnums1 and nums2 are sorted in non-decreasing order.",
        hints: "Since the arrays are sorted, the smallest pair is always (nums1[0], nums2[0]). We can push initial elements (nums1[i], nums2[0]) for i in 0..min(n1, k) into a min-heap. When we pop a pair (nums1[i], nums2[j]), we push (nums1[i], nums2[j+1]) into the heap.",
        editorial: "**Approach: Min-Heap Expansion (Dijkstra-like)**\n\nWe don't need to generate all n1 * n2 pairs. Since the arrays are sorted:\n1. Initialize a min-heap. Push (nums1[i] + nums2[0], i, 0) for i from 0 to min(n1, k) - 1.\n2. Do the following k times (or until heap is empty):\n   - Pop the smallest element (sum, i, j) from the heap.\n   - Print nums1[i] and nums2[j].\n   - If j + 1 < n2, push (nums1[i] + nums2[j+1], i, j+1) to the heap.\n\n**Time Complexity:** O(k log k)\n**Space Complexity:** O(k)",
        examples: [
            {
                title: "Example 1",
                input: "3 3\n1 7 11\n2 4 6\n3",
                output: "1 2\n1 4\n1 6",
                explanation: "The first 3 pairs are: (1,2) [sum=3], (1,4) [sum=5], (1,6) [sum=7]."
            },
            {
                title: "Example 2",
                input: "2 2\n1 2\n3 4\n2",
                output: "1 3\n1 4",
                explanation: "The pairs are (1,3) [sum=4] and (1,4) [sum=5]."
            }
        ],
        testcases: [
            { input: "3 3\n1 7 11\n2 4 6\n3", output: "1 2\n1 4\n1 6" },
            { input: "2 2\n1 2\n3 4\n2", output: "1 3\n1 4" },
            { input: "3 3\n1 2 3\n10 20 30\n4", output: "1 10\n2 10\n3 10\n1 20" },
            { input: "1 1\n5\n5\n10", output: "5 5" },
            { input: "3 3\n-5 -2 -1\n-10 -8 -6\n5", output: "-5 -10\n-5 -8\n-2 -10\n-5 -6\n-1 -10" },
            { input: "2 3\n1 2\n3 4 5\n10", output: "1 3\n1 4\n2 3\n1 5\n2 4\n2 5" },
            { input: "3 2\n1 1 2\n1 2\n3", output: "1 1\n1 1\n1 2" },
            { input: "2 2\n1 10\n2 20\n2", output: "1 2\n10 2" },
            { input: "4 4\n1 3 5 7\n2 4 6 8\n5", output: "1 2\n1 4\n3 2\n1 6\n3 4" },
            { input: "3 3\n0 0 0\n0 0 0\n5", output: "0 0\n0 0\n0 0\n0 0\n0 0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Find k smallest pairs using priority queue
    
    return 0;
}`,
            python: `def main():
    # Find k smallest pairs using heap
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Find k smallest pairs using priority queue
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Find k smallest pairs using BinaryHeap
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Element {
    long long sum;
    int i;
    int j;
    long long u;
    long long v;
    bool operator>(const Element& other) const {
        if (sum != other.sum) return sum > other.sum;
        if (u != other.u) return u > other.u;
        return v > other.v;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    vector<long long> nums1(n1), nums2(n2);
    for (int i = 0; i < n1; i++) cin >> nums1[i];
    for (int i = 0; i < n2; i++) cin >> nums2[i];
    int k;
    if (!(cin >> k)) return 0;
    
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    int limit = min(n1, k);
    for (int i = 0; i < limit; i++) {
        pq.push({nums1[i] + nums2[0], i, 0, nums1[i], nums2[0]});
    }
    
    int count = 0;
    while (!pq.empty() && count < k) {
        Element curr = pq.top();
        pq.pop();
        cout << curr.u << " " << curr.v << "\n";
        count++;
        if (curr.j + 1 < n2) {
            int next_j = curr.j + 1;
            pq.push({nums1[curr.i] + nums2[next_j], curr.i, next_j, nums1[curr.i], nums2[next_j]});
        }
    }
    return 0;
}`,
            python: `import sys
import heapq

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n1 = int(data[0])
    n2 = int(data[1])
    
    idx = 2
    nums1 = [int(x) for x in data[idx : idx + n1]]
    idx += n1
    nums2 = [int(x) for x in data[idx : idx + n2]]
    idx += n2
    k = int(data[idx])
    
    pq = []
    limit = min(n1, k)
    for i in range(limit):
        heapq.heappush(pq, (nums1[i] + nums2[0], nums1[i], nums2[0], i, 0))
        
    count = 0
    while pq and count < k:
        s, u, v, i, j = heapq.heappop(pq)
        print(f"{u} {v}")
        count += 1
        if j + 1 < n2:
            next_j = j + 1
            heapq.heappush(pq, (nums1[i] + nums2[next_j], nums1[i], nums2[next_j], i, next_j))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Element implements Comparable<Element> {
        long sum;
        int i, j;
        long u, v;
        Element(long sum, int i, int j, long u, long v) {
            this.sum = sum;
            this.i = i;
            this.j = j;
            this.u = u;
            this.v = v;
        }
        @Override
        public int compareTo(Element other) {
            if (this.sum != other.sum) {
                return Long.compare(this.sum, other.sum);
            }
            if (this.u != other.u) {
                return Long.compare(this.u, other.u);
            }
            return Long.compare(this.v, other.v);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n1 = Integer.parseInt(st.nextToken());
        int n2 = Integer.parseInt(st.nextToken());
        
        long[] nums1 = new long[n1];
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        for (int i = 0; i < n1; i++) {
            nums1[i] = Long.parseLong(st.nextToken());
        }
        
        long[] nums2 = new long[n2];
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        for (int i = 0; i < n2; i++) {
            nums2[i] = Long.parseLong(st.nextToken());
        }
        
        line = br.readLine();
        if (line == null) return;
        int k = Integer.parseInt(line.trim());
        
        PriorityQueue<Element> pq = new PriorityQueue<>();
        int limit = Math.min(n1, k);
        for (int i = 0; i < limit; i++) {
            pq.offer(new Element(nums1[i] + nums2[0], i, 0, nums1[i], nums2[0]));
        }
        
        StringBuilder sb = new StringBuilder();
        int count = 0;
        while (!pq.isEmpty() && count < k) {
            Element curr = pq.poll();
            sb.append(curr.u).append(" ").append(curr.v).append("\n");
            count++;
            if (curr.j + 1 < n2) {
                int nextJ = curr.j + 1;
                pq.offer(new Element(nums1[curr.i] + nums2[nextJ], curr.i, nextJ, nums1[curr.i], nums2[nextJ]));
            }
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq, PartialEq)]
struct Element {
    sum: i64,
    i: usize,
    j: usize,
    u: i64,
    v: i64,
}

impl Ord for Element {
    fn cmp(&self, other: &Self) -> Ordering {
        other.sum.cmp(&self.sum)
            .then_with(|| other.u.cmp(&self.u))
            .then_with(|| other.v.cmp(&self.v))
    }
}

impl PartialOrd for Element {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n1: usize = parts.next().unwrap().parse().unwrap();
    let n2: usize = parts.next().unwrap().parse().unwrap();
    
    let second_line = lines.next().unwrap().unwrap();
    let nums1: Vec<i64> = second_line.split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let third_line = lines.next().unwrap().unwrap();
    let nums2: Vec<i64> = third_line.split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let fourth_line = lines.next().unwrap().unwrap();
    let k: usize = fourth_line.trim().parse().unwrap();
    
    let mut pq = BinaryHeap::new();
    let limit = std::cmp::min(n1, k);
    for i in 0..limit {
        pq.push(Element {
            sum: nums1[i] + nums2[0],
            i,
            j: 0,
            u: nums1[i],
            v: nums2[0],
        });
    }
    
    let mut count = 0;
    while let Some(curr) = pq.pop() {
        println!("{} {}", curr.u, curr.v);
        count += 1;
        if count == k {
            break;
        }
        if curr.j + 1 < n2 {
            let next_j = curr.j + 1;
            pq.push(Element {
                sum: nums1[curr.i] + nums2[next_j],
                i: curr.i,
                j: next_j,
                u: nums1[curr.i],
                v: nums2[next_j],
            });
        }
    }
}`
        }
    },

    // ==================== MEDIUM #4: Merge K Sorted Lists (Heap version) ====================
    {
        title: "Merge K Sorted Lists (Heap version)",
        description: "You are given k sorted arrays. Merge them into a single sorted array.\n\nYour solution must use a Min-Heap / Priority Queue strategy to merge the arrays.\n\n**Input Format:**\n- First line: integer k (number of arrays)\n- Each of the next k lines represents an array: first value is an integer m_i (the size of that array), followed by m_i space-separated sorted integers.\n\n**Output Format:**\n- A single line containing all sorted elements space-separated. If the merged output is empty, output an empty line.",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "0 <= k <= 500\n0 <= m_i <= 1000\nTotal number of elements across all lists <= 10^5\n-10^9 <= elements <= 10^9",
        hints: "Push the first element of each of the k arrays into a min-heap. Pop the minimum element, output it, and push the next element of that same array into the heap. Repeat until the heap is empty.",
        editorial: "**Approach: Min-Heap of size K**\n\n1. Initialize a min-heap of size k storing triplets: (value, array_index, element_index).\n2. Insert the first element of every non-empty array into the heap.\n3. Loop while heap is not empty:\n   - Pop the minimum element from the heap.\n   - Append its value to the output list.\n   - If this element has a successor in its original array, push the successor into the heap.\n\n**Time Complexity:** O(N log k) where N is the total number of elements.\n**Space Complexity:** O(k) for the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3\n3 1 4 5\n3 1 3 4\n2 2 6",
                output: "1 1 2 3 4 4 5 6",
                explanation: "The sorted arrays are: [1, 4, 5], [1, 3, 4], [2, 6]. Merging them yields [1, 1, 2, 3, 4, 4, 5, 6]."
            },
            {
                title: "Example 2",
                input: "2\n0\n0",
                output: "",
                explanation: "Both lists are empty, so the output is an empty line."
            }
        ],
        testcases: [
            { input: "3\n3 1 4 5\n3 1 3 4\n2 2 6", output: "1 1 2 3 4 4 5 6" },
            { input: "2\n0\n0", output: "" },
            { input: "1\n3 10 20 30", output: "10 20 30" },
            { input: "4\n2 1 5\n2 2 6\n2 3 7\n2 4 8", output: "1 2 3 4 5 6 7 8" },
            { input: "3\n1 -10\n1 -5\n1 0", output: "-10 -5 0" },
            { input: "2\n3 1 3 5\n2 2 4", output: "1 2 3 4 5" },
            { input: "5\n1 100\n1 200\n1 300\n1 400\n1 500", output: "100 200 300 400 500" },
            { input: "3\n4 1 1 2 2\n3 1 2 3\n0", output: "1 1 1 2 2 2 3" },
            { input: "2\n5 10 20 30 40 50\n5 15 25 35 45 55", output: "10 15 20 25 30 35 40 45 50 55" },
            { input: "3\n2 -100 100\n2 -200 200\n2 -300 300", output: "-300 -200 -100 100 200 300" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Merge k sorted arrays using priority queue
    
    return 0;
}`,
            python: `def main():
    # Merge k sorted arrays using heap
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Merge k sorted arrays using priority queue
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Merge k sorted arrays using BinaryHeap
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int list_idx;
    int elem_idx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (!(cin >> k)) return 0;
    vector<vector<int>> lists(k);
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    
    for (int i = 0; i < k; i++) {
        int m;
        cin >> m;
        lists[i].resize(m);
        for (int j = 0; j < m; j++) {
            cin >> lists[i][j];
        }
        if (m > 0) {
            pq.push({lists[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        Element curr = pq.top();
        pq.pop();
        result.push_back(curr.val);
        if (curr.elem_idx + 1 < lists[curr.list_idx].size()) {
            int next_idx = curr.elem_idx + 1;
            pq.push({lists[curr.list_idx][next_idx], curr.list_idx, next_idx});
        }
    }
    
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << " ";
        cout << result[i];
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
    lists = []
    idx = 1
    pq = []
    for i in range(k):
        m = int(data[idx])
        idx += 1
        lst = []
        for _ in range(m):
            lst.append(int(data[idx]))
            idx += 1
        lists.append(lst)
        if m > 0:
            heapq.heappush(pq, (lst[0], i, 0))
            
    out = []
    while pq:
        val, list_idx, elem_idx = heapq.heappop(pq)
        out.append(str(val))
        if elem_idx + 1 < len(lists[list_idx]):
            next_idx = elem_idx + 1
            heapq.heappush(pq, (lists[list_idx][next_idx], list_idx, next_idx))
            
    print(" ".join(out))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Element implements Comparable<Element> {
        int val;
        int listIdx;
        int elemIdx;
        Element(int val, int listIdx, int elemIdx) {
            this.val = val;
            this.listIdx = listIdx;
            this.elemIdx = elemIdx;
        }
        @Override
        public int compareTo(Element other) {
            return Integer.compare(this.val, other.val);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int k = Integer.parseInt(line.trim());
        List<int[]> lists = new ArrayList<>();
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (int i = 0; i < k; i++) {
            line = br.readLine();
            if (line == null) continue;
            StringTokenizer st = new StringTokenizer(line);
            int m = Integer.parseInt(st.nextToken());
            int[] lst = new int[m];
            for (int j = 0; j < m; j++) {
                lst[j] = Integer.parseInt(st.nextToken());
            }
            lists.add(lst);
            if (m > 0) {
                pq.offer(new Element(lst[0], i, 0));
            }
        }
        
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        while (!pq.isEmpty()) {
            Element curr = pq.poll();
            if (!first) sb.append(" ");
            sb.append(curr.val);
            first = false;
            int[] currentList = lists.get(curr.listIdx);
            if (curr.elemIdx + 1 < currentList.length) {
                int nextIdx = curr.elemIdx + 1;
                pq.offer(new Element(currentList[nextIdx], curr.listIdx, nextIdx));
            }
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq, PartialEq)]
struct Element {
    val: i32,
    list_idx: usize,
    elem_idx: usize,
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
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let k: usize = first_line.trim().parse().unwrap();
    let mut lists = Vec::with_capacity(k);
    let mut pq = BinaryHeap::new();
    
    for i in 0..k {
        let line = lines.next().unwrap().unwrap();
        let mut parts = line.split_whitespace();
        let m: usize = parts.next().unwrap().parse().unwrap();
        let mut lst = Vec::with_capacity(m);
        for _ in 0..m {
            let val: i32 = parts.next().unwrap().parse().unwrap();
            lst.push(val);
        }
        if m > 0 {
            pq.push(Element { val: lst[0], list_idx: i, elem_idx: 0 });
        }
        lists.push(lst);
    }
    
    let mut out = Vec::new();
    while let Some(curr) = pq.pop() {
        out.push(curr.val.to_string());
        if curr.elem_idx + 1 < lists[curr.list_idx].len() {
            let next_idx = curr.elem_idx + 1;
            pq.push(Element {
                val: lists[curr.list_idx][next_idx],
                list_idx: curr.list_idx,
                elem_idx: next_idx,
            });
        }
    }
    println!("{}", out.join(" "));
}`
        }
    },

    // ==================== HARD #1: Median Finder ====================
    {
        title: "Median Finder",
        description: "Design a data structure that supports adding integers from a stream and finding the median of elements processed so far.\n\nThe median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nTo ensure consistent output across all languages, you should format each output median value to exactly 1 decimal place (e.g. 5 -> 5.0, 3.5 -> 3.5).\n\n**Input Format:**\n- First line: integer n (the number of elements in the stream)\n- Second line: n space-separated integers representing the stream of elements in the order they arrive\n\n**Output Format:**\n- A single line containing n space-separated values, each representing the median of elements processed so far, formatted to exactly one decimal place.",
        difficulty: "HARD",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= n <= 10^5\n-10^9 <= stream[i] <= 10^9",
        hints: "Maintain two heaps: a Max-Heap for the smaller half of the numbers, and a Min-Heap for the larger half of the numbers. Keep their sizes balanced (the difference in size should not exceed 1).",
        editorial: "**Approach: Dual Heaps (Max-Heap & Min-Heap)**\n\n1. Maintain a Max-Heap (`max_heap`) storing the smaller half of the numbers, and a Min-Heap (`min_heap`) storing the larger half.\n2. When adding a new number x:\n   - If `max_heap` is empty or x <= max_heap.top(), push to `max_heap`.\n   - Otherwise, push to `min_heap`.\n3. Rebalance the heaps so that the size of `max_heap` is either equal to or exactly 1 greater than `min_heap`:\n   - If size of `max_heap` > size of `min_heap` + 1, pop from `max_heap` and push to `min_heap`.\n   - If size of `min_heap` > size of `max_heap`, pop from `min_heap` and push to `max_heap`.\n4. To find the median:\n   - If `max_heap` has more elements, the median is `max_heap.top()`.\n   - Otherwise, the median is `(max_heap.top() + min_heap.top()) / 2.0`.\n\n**Time Complexity:** O(n log n) total, O(log n) per stream element.\n**Space Complexity:** O(n) to store the elements.",
        examples: [
            {
                title: "Example 1",
                input: "3\n1 2 3",
                output: "1.0 1.5 2.0",
                explanation: "After 1: [1], median is 1.0. After 2: [1, 2], median is (1+2)/2 = 1.5. After 3: [1, 2, 3], median is 2.0."
            },
            {
                title: "Example 2",
                input: "5\n5 15 1 3 8",
                output: "5.0 10.0 5.0 4.0 5.0",
                explanation: "Median stream: 5.0 -> (5+15)/2=10.0 -> [1,5,15]=5.0 -> [1,3,5,15]=4.0 -> [1,3,5,8,15]=5.0."
            }
        ],
        testcases: [
            { input: "3\n1 2 3", output: "1.0 1.5 2.0" },
            { input: "5\n5 15 1 3 8", output: "5.0 10.0 5.0 4.0 5.0" },
            { input: "1\n42", output: "42.0" },
            { input: "6\n10 10 10 10 10 10", output: "10.0 10.0 10.0 10.0 10.0 10.0" },
            { input: "8\n-1 -2 -3 -4 -5 -6 -7 -8", output: "-1.0 -1.5 -2.0 -2.5 -3.0 -3.5 -4.0 -4.5" },
            { input: "4\n100 -100 50 -50", output: "100.0 0.0 50.0 0.0" },
            { input: "10\n1 3 5 7 9 2 4 6 8 10", output: "1.0 2.0 3.0 4.0 5.0 4.0 4.0 4.5 5.0 5.5" },
            { input: "5\n10 20 30 40 50", output: "10.0 15.0 20.0 25.0 30.0" },
            { input: "2\n0 0", output: "0.0 0.0" },
            { input: "7\n1000000000 1000000000 -1000000000 -1000000000 0 500000000 -500000000", output: "1000000000.0 1000000000.0 1000000000.0 0.0 0.0 250000000.0 0.0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Find running median formatted to 1 decimal place
    
    return 0;
}`,
            python: `def main():
    # Find running median formatted to 1 decimal place
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Find running median formatted to 1 decimal place
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Find running median formatted to 1 decimal place
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
    priority_queue<int> max_heap; // smaller half
    priority_queue<int, vector<int>, greater<int>> min_heap; // larger half
    
    cout << fixed << setprecision(1);
    for (int i = 0; i < n; i++) {
        int x;
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
            min_heap.pop();
        }
        
        double median;
        if (max_heap.size() > min_heap.size()) {
            median = max_heap.top();
        } else {
            median = (max_heap.top() + min_heap.top()) / 2.0;
        }
        if (i > 0) cout << " ";
        cout << median;
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
    arr = [int(x) for x in data[1:]]
    
    max_heap = []
    min_heap = []
    
    out = []
    for x in arr:
        if not max_heap or x <= -max_heap[0]:
            heapq.heappush(max_heap, -x)
        else:
            heapq.heappush(min_heap, x)
            
        if len(max_heap) > len(min_heap) + 1:
            heapq.heappush(min_heap, -heapq.heappop(max_heap))
        elif len(min_heap) > len(max_heap):
            heapq.heappush(max_heap, -heapq.heappop(min_heap))
            
        if len(max_heap) > len(min_heap):
            median = float(-max_heap[0])
        else:
            median = (-max_heap[0] + min_heap[0]) / 2.0
        out.append(f"{median:.1f}")
        
    print(" ".join(out))

if __name__ == "__main__":
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
        
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < n; i++) {
            int x = Integer.parseInt(st.nextToken());
            if (maxHeap.isEmpty() || x <= maxHeap.peek()) {
                maxHeap.offer(x);
            } else {
                minHeap.offer(x);
            }
            
            if (maxHeap.size() > minHeap.size() + 1) {
                minHeap.offer(maxHeap.poll());
            } else if (minHeap.size() > maxHeap.size()) {
                maxHeap.offer(minHeap.poll());
            }
            
            double median;
            if (maxHeap.size() > minHeap.size()) {
                median = maxHeap.peek();
            } else {
                median = (maxHeap.peek() + minHeap.peek()) / 2.0;
            }
            if (i > 0) sb.append(" ");
            sb.append(String.format(Locale.US, "%.1f", median));
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = first_line.trim().parse().unwrap();
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    
    let mut max_heap = BinaryHeap::new();
    let mut min_heap = BinaryHeap::new();
    let mut out = Vec::with_capacity(n);
    
    for item in second_line.split_whitespace() {
        let x: i32 = item.parse().unwrap();
        if max_heap.is_empty() || x <= *max_heap.peek().unwrap() {
            max_heap.push(x);
        } else {
            min_heap.push(Reverse(x));
        }
        
        if max_heap.len() > min_heap.len() + 1 {
            if let Some(top) = max_heap.pop() {
                min_heap.push(Reverse(top));
            }
        } else if min_heap.len() > max_heap.len() {
            if let Some(Reverse(top)) = min_heap.pop() {
                max_heap.push(top);
            }
        }
        
        let median: f64 = if max_heap.len() > min_heap.len() {
            *max_heap.peek().unwrap() as f64
        } else {
            let top1 = *max_heap.peek().unwrap() as f64;
            let Reverse(top2) = *min_heap.peek().unwrap();
            (top1 + top2 as f64) / 2.0
        };
        out.push(format!("{:.1f}", median));
    }
    println!("{}", out.join(" "));
}`
        }
    },

    // ==================== HARD #2: Smallest Range Covering K Lists ====================
    {
        title: "Smallest Range Covering K Lists",
        description: "You have k lists of sorted integers in non-decreasing order. Find the smallest range [a, b] that includes at least one number from each of the k lists.\n\nWe define the range [a, b] is smaller than range [c, d] if b - a < d - c, or b - a == d - c and a < c.\n\n**Input Format:**\n- First line: integer k (number of sorted lists)\n- Each of the next k lines represents a list: first value is an integer m_i (size of the list), followed by m_i space-separated sorted integers.\n\n**Output Format:**\n- Two space-separated integers representing the boundaries of the smallest range [a, b].",
        difficulty: "HARD",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= k <= 3500\n1 <= m_i <= 50\nTotal elements <= 10^5\n-10^5 <= elements <= 10^5",
        hints: "1. Maintain a Min-Heap of size k, containing the current element pointers from each list.\n2. Keep track of the maximum value currently in the heap.\n3. The range is [heap.peek().val, max_val]. Try to shrink the range by popping the minimum element and pushing the next element from the same list.",
        editorial: "**Approach: Min-Heap of pointers + track Max Value**\n\n1. Initialize a min-heap. Push the first element of each list as (val, list_index, element_index) into the heap.\n2. Maintain `max_val` as the maximum element among the currently chosen elements in the heap.\n3. The current candidate range is [min_heap.peek().val, max_val]. If this range is smaller than the best range found so far, update the best range.\n4. Pop the minimum element from the heap. If the corresponding list has a next element, push it into the heap and update `max_val`.\n5. If the popped element belongs to a list that has been fully exhausted, terminate the loop. Since we can no longer cover that list, we cannot form any smaller valid ranges.\n\n**Time Complexity:** O(N log k) where N is the total number of elements.\n**Space Complexity:** O(k) for the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3\n5 4 10 15 24\n5 0 9 12 20\n5 5 18 22 30",
                output: "20 24",
                explanation: "List 1: [4, 10, 15, 24]\nList 2: [0, 9, 12, 20]\nList 3: [5, 18, 22, 30]\nThe range [20, 24] contains 24 (from List 1), 20 (from List 2), and 22 (from List 3)."
            },
            {
                title: "Example 2",
                input: "3\n3 1 2 3\n3 1 2 3\n3 1 2 3",
                output: "1 1"
            }
        ],
        testcases: [
            { input: "3\n5 4 10 15 24\n5 0 9 12 20\n5 5 18 22 30", output: "20 24" },
            { input: "3\n3 1 2 3\n3 1 2 3\n3 1 2 3", output: "1 1" },
            { input: "2\n3 1 10 100\n3 2 20 200", output: "1 2" },
            { input: "4\n1 10\n1 11\n1 12\n1 13", output: "10 13" },
            { input: "3\n3 -10 -5 0\n3 -8 -4 2\n3 -7 -3 5", output: "-5 -3" },
            { input: "1\n3 10 20 30", output: "10 10" },
            { input: "3\n1 100\n1 100\n1 100", output: "100 100" },
            { input: "2\n2 1 5\n2 3 7", output: "1 3" },
            { input: "3\n2 1 5\n2 2 6\n2 3 7", output: "1 3" },
            { input: "2\n4 -100 -50 0 50\n4 -90 -40 10 60", output: "-100 -90" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Find smallest range covering elements from all k lists
    
    return 0;
}`,
            python: `def main():
    # Find smallest range covering elements from all k lists
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Find smallest range covering elements from all k lists
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Find smallest range covering elements from all k lists
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int list_idx;
    int elem_idx;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (!(cin >> k)) return 0;
    vector<vector<int>> lists(k);
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    int max_val = -2e9;
    
    for (int i = 0; i < k; i++) {
        int m;
        cin >> m;
        lists[i].resize(m);
        for (int j = 0; j < m; j++) {
            cin >> lists[i][j];
        }
        pq.push({lists[i][0], i, 0});
        max_val = max(max_val, lists[i][0]);
    }
    
    int start = -1e9, end = 1e9;
    while (true) {
        Element curr = pq.top();
        pq.pop();
        int min_val = curr.val;
        
        if ((long long)max_val - min_val < (long long)end - start) {
            start = min_val;
            end = max_val;
        }
        
        if (curr.elem_idx + 1 < lists[curr.list_idx].size()) {
            int next_idx = curr.elem_idx + 1;
            int next_val = lists[curr.list_idx][next_idx];
            pq.push({next_val, curr.list_idx, next_idx});
            max_val = max(max_val, next_val);
        } else {
            break;
        }
    }
    cout << start << " " << end << "\n";
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
    lists = []
    idx = 1
    pq = []
    max_val = -float('inf')
    for i in range(k):
        m = int(data[idx])
        idx += 1
        lst = []
        for _ in range(m):
            lst.append(int(data[idx]))
            idx += 1
        lists.append(lst)
        heapq.heappush(pq, (lst[0], i, 0))
        max_val = max(max_val, lst[0])
        
    start, end = -10**9, 10**9
    while True:
        min_val, list_idx, elem_idx = heapq.heappop(pq)
        if max_val - min_val < end - start:
            start, end = min_val, max_val
            
        if elem_idx + 1 < len(lists[list_idx]):
            next_idx = elem_idx + 1
            next_val = lists[list_idx][next_idx]
            heapq.heappush(pq, (next_val, list_idx, next_idx))
            max_val = max(max_val, next_val)
        else:
            break
            
    print(f"{start} {end}")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Element implements Comparable<Element> {
        int val;
        int listIdx;
        int elemIdx;
        Element(int val, int listIdx, int elemIdx) {
            this.val = val;
            this.listIdx = listIdx;
            this.elemIdx = elemIdx;
        }
        @Override
        public int compareTo(Element other) {
            return Integer.compare(this.val, other.val);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int k = Integer.parseInt(line.trim());
        List<int[]> lists = new ArrayList<>();
        PriorityQueue<Element> pq = new PriorityQueue<>();
        int maxVal = Integer.MIN_VALUE;
        
        for (int i = 0; i < k; i++) {
            line = br.readLine();
            if (line == null) continue;
            StringTokenizer st = new StringTokenizer(line);
            int m = Integer.parseInt(st.nextToken());
            int[] lst = new int[m];
            for (int j = 0; j < m; j++) {
                lst[j] = Integer.parseInt(st.nextToken());
            }
            lists.add(lst);
            pq.offer(new Element(lst[0], i, 0));
            maxVal = Math.max(maxVal, lst[0]);
        }
        
        int start = -1000000, end = 1000000;
        while (true) {
            Element curr = pq.poll();
            int minVal = curr.val;
            
            if ((long)maxVal - minVal < (long)end - start) {
                start = minVal;
                end = maxVal;
            }
            
            int[] currentList = lists.get(curr.listIdx);
            if (curr.elemIdx + 1 < currentList.length) {
                int nextIdx = curr.elemIdx + 1;
                int nextVal = currentList[nextIdx];
                pq.offer(new Element(nextVal, curr.listIdx, nextIdx));
                maxVal = Math.max(maxVal, nextVal);
            } else {
                break;
            }
        }
        System.out.println(start + " " + end);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq, PartialEq)]
struct Element {
    val: i32,
    list_idx: usize,
    elem_idx: usize,
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
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let k: usize = first_line.trim().parse().unwrap();
    let mut lists = Vec::with_capacity(k);
    let mut pq = BinaryHeap::new();
    let mut max_val = i32::MIN;
    
    for i in 0..k {
        let line = lines.next().unwrap().unwrap();
        let mut parts = line.split_whitespace();
        let m: usize = parts.next().unwrap().parse().unwrap();
        let mut lst = Vec::with_capacity(m);
        for _ in 0..m {
            let val: i32 = parts.next().unwrap().parse().unwrap();
            lst.push(val);
        }
        pq.push(Element { val: lst[0], list_idx: i, elem_idx: 0 });
        if lst[0] > max_val {
            max_val = lst[0];
        }
        lists.push(lst);
    }
    
    let mut start = -1_000_000_000;
    let mut end = 1_000_000_000;
    
    while let Some(curr) = pq.pop() {
        let min_val = curr.val;
        if (max_val as i64 - min_val as i64) < (end as i64 - start as i64) {
            start = min_val;
            end = max_val;
        }
        if curr.elem_idx + 1 < lists[curr.list_idx].len() {
            let next_idx = curr.elem_idx + 1;
            let next_val = lists[curr.list_idx][next_idx];
            pq.push(Element {
                val: next_val,
                list_idx: curr.list_idx,
                elem_idx: next_idx,
            });
            if next_val > max_val {
                max_val = next_val;
            }
        } else {
            break;
        }
    }
    println!("{} {}", start, end);
}`
        }
    },

    // ==================== HARD #3: Skyline Problem ====================
    {
        title: "Skyline Problem",
        description: "Given the positions and heights of buildings, return the key points that uniquely outline their collective skyline.\n\nA key point is the left endpoint of a horizontal line segment of the skyline. The coordinates of key points are sorted by their x-coordinate.\n\nEach building is represented as a triplet [left, right, height] indicating its start position, end position, and height.\n\n**Input Format:**\n- First line: integer n (the number of buildings)\n- Each of the next n lines contains three space-separated integers: left, right, and height\n\n**Output Format:**\n- Print each key point [x, y] as two space-separated integers on a separate line.",
        difficulty: "HARD",
        tags: ["heap", "priority-queue", "sorting"],
        constraints: "1 <= n <= 10^4\n0 <= left < right <= 2^31 - 1\n1 <= height <= 2^31 - 1\nBuildings are sorted by their left coordinate in non-decreasing order.",
        hints: "1. Collect all building endpoints (start and end) as events.\n2. Maintain a Max-Heap of active building heights. Expired buildings can be popped lazily.",
        editorial: "**Approach: Sweepline + Max-Heap (Lazy Deletion)**\n\n1. Define events:\n   - Start of building [left, right, height]: event at `left` with positive height `height` and right boundary `right`.\n   - End of building: event at `right` with height `0` (or leaving event).\n2. Sort all events by x-coordinate. Group events that occur at the same x-coordinate.\n3. Maintain a Max-Heap `pq` of active buildings stored as pairs `(height, right_boundary)`:\n   - For each event at the current x, if it's a starting event (`height > 0`), push `(height, right_boundary)` to `pq`.\n4. Lazily remove expired buildings from the top of the heap. While the heap top's right boundary is <= current x, pop it.\n5. The height of the skyline at the current x is the height at the top of the heap (or 0 if empty).\n6. If the current height is different from the previously recorded skyline height, we output `current_x current_height` as a new key point.\n\n**Time Complexity:** O(n log n) for sorting and heap operations.\n**Space Complexity:** O(n) for storing events and heap elements.",
        examples: [
            {
                title: "Example 1",
                input: "3\n2 9 10\n3 7 15\n5 12 12",
                output: "2 10\n3 15\n7 12\n12 0",
                explanation: "The key points of the skyline are:\n- x=2: height goes from 0 to 10.\n- x=3: height goes from 10 to 15.\n- x=7: height drops from 15 to 12 (since [3,7,15] ended, next tallest is [5,12,12]).\n- x=12: height drops to 0."
            },
            {
                title: "Example 2",
                input: "2\n0 2 3\n2 5 3",
                output: "0 3\n5 0",
                explanation: "The two buildings touch and have the same height, forming a continuous block of height 3 from x=0 to x=5."
            }
        ],
        testcases: [
            { input: "3\n2 9 10\n3 7 15\n5 12 12", output: "2 10\n3 15\n7 12\n12 0" },
            { input: "2\n0 2 3\n2 5 3", output: "0 3\n5 0" },
            { input: "1\n1 5 10", output: "1 10\n5 0" },
            { input: "3\n1 3 5\n2 4 6\n3 5 7", output: "1 5\n2 6\n3 7\n5 0" },
            { input: "2\n1 5 10\n6 10 10", output: "1 10\n5 0\n6 10\n10 0" },
            { input: "2\n1 5 10\n3 7 10", output: "1 10\n7 0" },
            { input: "3\n1 5 10\n2 4 5\n3 4 8", output: "1 10\n5 0" },
            { input: "4\n1 10 5\n2 3 15\n5 8 12\n6 7 20", output: "1 5\n2 15\n3 5\n5 12\n6 20\n7 12\n8 5\n10 0" },
            { input: "3\n1 10 10\n2 5 20\n5 8 20", output: "1 10\n2 20\n8 10\n10 0" },
            { input: "3\n1 5 10\n1 5 20\n1 5 15", output: "1 20\n5 0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Find the skyline key points
    
    return 0;
}`,
            python: `def main():
    # Find the skyline key points
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Find the skyline key points
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Find the skyline key points
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Event {
    int x;
    int h;
    int r;
    bool operator<(const Event& other) const {
        return x < other.x;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<Event> events;
    for (int i = 0; i < n; i++) {
        int l, r, h;
        cin >> l >> r >> h;
        events.push_back({l, h, r});
        events.push_back({r, 0, 0});
    }
    
    sort(events.begin(), events.end());
    
    priority_queue<pair<int, int>> pq;
    int prev_h = 0;
    
    int i = 0;
    int sz = events.size();
    while (i < sz) {
        int cur_x = events[i].x;
        while (i < sz && events[i].x == cur_x) {
            if (events[i].h > 0) {
                pq.push({events[i].h, events[i].r});
            }
            i++;
        }
        
        while (!pq.empty() && pq.top().second <= cur_x) {
            pq.pop();
        }
        
        int cur_h = pq.empty() ? 0 : pq.top().first;
        if (cur_h != prev_h) {
            cout << cur_x << " " << cur_h << "\n";
            prev_h = cur_h;
        }
    }
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
    events = []
    idx = 1
    for _ in range(n):
        l = int(data[idx])
        r = int(data[idx+1])
        h = int(data[idx+2])
        idx += 3
        events.append((l, h, r))
        events.append((r, 0, 0))
        
    events.sort(key=lambda e: e[0])
    
    pq = []
    prev_h = 0
    i = 0
    sz = len(events)
    while i < sz:
        cur_x = events[i][0]
        while i < sz and events[i][0] == cur_x:
            h, r = events[i][1], events[i][2]
            if h > 0:
                heapq.heappush(pq, (-h, r))
            i += 1
            
        while pq and pq[0][1] <= cur_x:
            heapq.heappop(pq)
            
        cur_h = -pq[0][0] if pq else 0
        if cur_h != prev_h:
            print(f"{cur_x} {cur_h}")
            prev_h = cur_h

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Event implements Comparable<Event> {
        int x, h, r;
        Event(int x, int h, int r) {
            this.x = x;
            this.h = h;
            this.r = r;
        }
        @Override
        public int compareTo(Event other) {
            return Integer.compare(this.x, other.x);
        }
    }
    
    static class Building implements Comparable<Building> {
        int h, r;
        Building(int h, int r) {
            this.h = h;
            this.r = r;
        }
        @Override
        public int compareTo(Building other) {
            return Integer.compare(other.h, this.h);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        List<Event> events = new ArrayList<>(2 * n);
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line == null) continue;
            StringTokenizer st = new StringTokenizer(line);
            int l = Integer.parseInt(st.nextToken());
            int r = Integer.parseInt(st.nextToken());
            int h = Integer.parseInt(st.nextToken());
            events.add(new Event(l, h, r));
            events.add(new Event(r, 0, 0));
        }
        
        Collections.sort(events);
        
        PriorityQueue<Building> pq = new PriorityQueue<>();
        StringBuilder sb = new StringBuilder();
        int prevH = 0;
        int i = 0;
        int sz = events.size();
        while (i < sz) {
            int curX = events.get(i).x;
            while (i < sz && events.get(i).x == curX) {
                Event e = events.get(i);
                if (e.h > 0) {
                    pq.offer(new Building(e.h, e.r));
                }
                i++;
            }
            
            while (!pq.isEmpty() && pq.peek().r <= curX) {
                pq.poll();
            }
            
            int curH = pq.isEmpty() ? 0 : pq.peek().h;
            if (curH != prevH) {
                sb.append(curX).append(" ").append(curH).append("\n");
                prevH = curH;
            }
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;

struct Event {
    x: i32,
    h: i32,
    r: i32,
}

impl PartialEq for Event {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x
    }
}

impl Eq for Event {}

impl PartialOrd for Event {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.x.cmp(&other.x))
    }
}

impl Ord for Event {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.x.cmp(&other.x)
    }
}

#[derive(Eq, PartialEq)]
struct Building {
    h: i32,
    r: i32,
}

impl Ord for Building {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.h.cmp(&other.h)
    }
}

impl PartialOrd for Building {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = first_line.trim().parse().unwrap();
    let mut events = Vec::with_capacity(2 * n);
    for _ in 0..n {
        let line = lines.next().unwrap().unwrap();
        let mut parts = line.split_whitespace();
        let l: i32 = parts.next().unwrap().parse().unwrap();
        let r: i32 = parts.next().unwrap().parse().unwrap();
        let h: i32 = parts.next().unwrap().parse().unwrap();
        events.push(Event { x: l, h, r });
        events.push(Event { x: r, h: 0, r: 0 });
    }
    
    events.sort();
    
    let mut pq = BinaryHeap::new();
    let mut prev_h = 0;
    let mut i = 0;
    let sz = events.len();
    while i < sz {
        let cur_x = events[i].x;
        while i < sz && events[i].x == cur_x {
            if events[i].h > 0 {
                pq.push(Building { h: events[i].h, r: events[i].r });
            }
            i += 1;
        }
        
        while let Some(top) = pq.peek() {
            if top.r <= cur_x {
                pq.pop();
            } else {
                break;
            }
        }
        
        let cur_h = match pq.peek() {
            Some(top) => top.h,
            None => 0,
        };
        if cur_h != prev_h {
            println!("{} {}", cur_x, cur_h);
            prev_h = cur_h;
        }
    }
}`
        }
    },

    // ==================== EASY #4: Gifts from the Richest Pile ====================
    {
        title: "Gifts from the Richest Pile",
        description: "You are given an array of integers `gifts` representing the number of gifts in various piles. Every second, you do the following:\n1. Choose the pile with the maximum number of gifts.\n2. Leave behind the floor of the square root of the number of gifts in that pile, and take the rest.\n\nReturn the total number of gifts remaining after `k` seconds.\n\n**Input Format:**\n- First line: two integers `n` (number of piles) and `k` (seconds).\n- Second line: `n` space-separated integers representing the gifts in each pile.\n\n**Output Format:**\n- A single integer representing the total number of gifts remaining.",
        difficulty: "EASY",
        tags: ["heap", "priority-queue", "simulation"],
        constraints: "1 <= n <= 10^5\n1 <= k <= 10^5\n1 <= gifts[i] <= 10^9",
        hints: "Use a Max-Heap to keep track of the largest pile of gifts. Pop the largest pile, calculate its square root, and push it back. Repeat this k times.",
        editorial: "**Approach: Max-Heap Simulation**\n\nTo efficiently retrieve and update the maximum number of gifts at each second, we can use a Max-Heap. \n1. Push all pile values into a Max-Heap.\n2. In each of the `k` seconds, pop the maximum element `val`.\n3. Compute `floor(sqrt(val))` and push it back into the heap.\n4. After `k` seconds, compute the sum of all elements in the heap.\n\nNote: If the maximum value in the heap becomes `1`, we can stop early because `floor(sqrt(1)) = 1` which will not change the gifts count anymore.\n\n**Time Complexity:** O(n + k log n) to heapify the array and perform k insertions/deletions.\n**Space Complexity:** O(n) to store the heap.",
        examples: [
            {
                title: "Example 1",
                input: "5 4\n25 64 9 4 100",
                output: "29",
                explanation: "1st second: Choose 100. Leave sqrt(100) = 10. Piles: [25, 64, 9, 4, 10]\n2nd second: Choose 64. Leave sqrt(64) = 8. Piles: [25, 8, 9, 4, 10]\n3rd second: Choose 25. Leave sqrt(25) = 5. Piles: [5, 8, 9, 4, 10]\n4th second: Choose 10. Leave floor(sqrt(10)) = 3. Piles: [5, 8, 9, 4, 3]\nTotal remaining gifts: 5 + 8 + 9 + 4 + 3 = 29."
            },
            {
                title: "Example 2",
                input: "4 4\n1 1 1 1",
                output: "4",
                explanation: "All piles have 1 gift. floor(sqrt(1)) = 1. No change after any seconds. Remaining: 4."
            }
        ],
        testcases: [
            { input: "5 4\n25 64 9 4 100", output: "29" },
            { input: "4 4\n1 1 1 1", output: "4" },
            { input: "1 1\n100", output: "10" },
            { input: "3 5\n10 20 30", output: "7" },
            { input: "5 1\n1000000000 1000000000 1000000000 1000000000 1000000000", output: "4000031622" },
            { input: "6 10\n1 2 3 4 5 6", output: "6" },
            { input: "2 3\n10000 10000", output: "110" },
            { input: "8 2\n9 9 9 9 9 9 9 9", output: "60" },
            { input: "1 0\n50", output: "50" },
            { input: "10 8\n2 3 5 7 11 13 17 19 23 29", output: "32" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, k and the gifts array, then solve
    
    return 0;
}`,
            python: `def main():
    # Read n, k and the gifts array, then solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n, k and the gifts array, then solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n, k and the gifts array, then solve
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
    priority_queue<long long> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    for (int i = 0; i < k; i++) {
        if (pq.empty()) break;
        long long val = pq.top();
        if (val <= 1) break;
        pq.pop();
        long long new_val = (long long)sqrt(val);
        pq.push(new_val);
    }
    long long total = 0;
    while (!pq.empty()) {
        total += pq.top();
        pq.pop();
    }
    cout << total << "\n";
    return 0;
}`,
            python: `import sys
import heapq
import math

def main():
    input = sys.stdin.read
    data = input().split()
    if not data:
        return
    n = int(data[0])
    k = int(data[1])
    gifts = [int(x) for x in data[2:]]
    
    pq = [-x for x in gifts]
    heapq.heapify(pq)
    
    for _ in range(k):
        val = -heapq.heappop(pq)
        if val <= 1:
            heapq.heappush(pq, -val)
            break
        new_val = math.isqrt(val)
        heapq.heappush(pq, -new_val)
        
    print(-sum(pq))

if __name__ == "__main__":
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
        
        line = br.readLine();
        if (line == null) return;
        st = new StringTokenizer(line);
        PriorityQueue<Long> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int i = 0; i < n; i++) {
            pq.offer(Long.parseLong(st.nextToken()));
        }
        for (int i = 0; i < k; i++) {
            if (pq.isEmpty()) break;
            long val = pq.peek();
            if (val <= 1) break;
            pq.poll();
            long newVal = (long) Math.sqrt(val);
            pq.offer(newVal);
        }
        long total = 0;
        while (!pq.isEmpty()) {
            total += pq.poll();
        }
        System.out.println(total);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut pq = BinaryHeap::with_capacity(n);
    for item in second_line.split_whitespace() {
        let val: i64 = item.parse().unwrap();
        pq.push(val);
    }
    for _ in 0..k {
        if let Some(&val) = pq.peek() {
            if val <= 1 {
                break;
            }
            pq.pop();
            let new_val = (val as f64).sqrt() as i64;
            pq.push(new_val);
        } else {
            break;
        }
    }
    let mut total: i64 = 0;
    while let Some(val) = pq.pop() {
        total += val;
    }
    println!("{}", total);
}`
        }
    },

    // ==================== EASY #5: Minimum Cost to Connect Ropes ====================
    {
        title: "Minimum Cost to Connect Ropes",
        description: "There are `n` ropes of different lengths. You need to connect these ropes into a single rope. The cost to connect two ropes of lengths A and B is A + B. You want to connect all ropes with the minimum total cost.\n\n**Input Format:**\n- First line: an integer `n` (number of ropes).\n- Second line: `n` space-separated integers representing the rope lengths.\n\n**Output Format:**\n- A single integer representing the minimum cost to connect all ropes. If `n <= 1`, the cost is `0`.",
        difficulty: "EASY",
        tags: ["heap", "priority-queue", "greedy"],
        constraints: "1 <= n <= 10^5\n1 <= rope[i] <= 10^6",
        hints: "To minimize the connection cost, we should always connect the two shortest ropes first. Use a Min-Heap (priority queue) to retrieve and combine the two smallest ropes.",
        editorial: "**Approach: Greedy with Min-Heap**\n\nAt any point, we want to combine the two ropes with the smallest lengths. This is a classic greedy strategy (similar to Huffman Coding):\n1. Insert all rope lengths into a Min-Heap.\n2. While the heap contains more than 1 rope:\n   - Pop the two smallest ropes `a` and `b`.\n   - Connect them: the cost of this connection is `a + b`.\n   - Add this cost to our total accumulated cost.\n   - Push the new rope of length `a + b` back into the heap.\n3. Return the total accumulated cost.\n\n**Time Complexity:** O(n log n) because each of the `n-1` steps performs O(log n) heap operations.\n**Space Complexity:** O(n) to store the elements in the heap.",
        examples: [
            {
                title: "Example 1",
                input: "4\n4 3 2 6",
                output: "29",
                explanation: "We connect 2 and 3 (cost 5). Piles: [4, 5, 6].\nWe connect 4 and 5 (cost 9). Piles: [9, 6].\nWe connect 9 and 6 (cost 15). Piles: [15].\nTotal cost: 5 + 9 + 15 = 29."
            },
            {
                title: "Example 2",
                input: "1\n10",
                output: "0",
                explanation: "There is only one rope, so no connections are needed. Cost is 0."
            }
        ],
        testcases: [
            { input: "4\n4 3 2 6", output: "29" },
            { input: "1\n10", output: "0" },
            { input: "2\n5 10", output: "15" },
            { input: "5\n1 2 3 4 5", output: "33" },
            { input: "5\n10 10 10 10 10", output: "120" },
            { input: "6\n5 17 100 11 2 7", output: "230" },
            { input: "3\n1000000 1000000 1000000", output: "5000000" },
            { input: "8\n1 1 1 1 1 1 1 1", output: "24" },
            { input: "10\n10 9 8 7 6 5 4 3 2 1", output: "173" },
            { input: "7\n10 20 30 40 50 60 70", output: "740" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n and the ropes array, then solve
    
    return 0;
}`,
            python: `def main():
    # Read n and the ropes array, then solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n and the ropes array, then solve
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n and the ropes array, then solve
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
    if (n <= 1) {
        cout << 0 << "\n";
        return 0;
    }
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    long long total_cost = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long cost = a + b;
        total_cost += cost;
        pq.push(cost);
    }
    cout << total_cost << "\n";
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
    if n <= 1:
        print(0)
        return
    ropes = [int(x) for x in data[1:]]
    heapq.heapify(ropes)
    total_cost = 0
    while len(ropes) > 1:
        a = heapq.heappop(ropes)
        b = heapq.heappop(ropes)
        cost = a + b
        total_cost += cost
        heapq.heappush(ropes, cost)
    print(total_cost)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        if (n <= 1) {
            System.out.println(0);
            return;
        }
        line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            pq.offer(Long.parseLong(st.nextToken()));
        }
        long totalCost = 0;
        while (pq.size() > 1) {
            long a = pq.poll();
            long b = pq.poll();
            long cost = a + b;
            totalCost += cost;
            pq.offer(cost);
        }
        System.out.println(totalCost);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let n: usize = first_line.trim().parse().unwrap();
    if n <= 1 {
        println!("0");
        return;
    }
    let second_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut pq = BinaryHeap::new();
    for item in second_line.split_whitespace() {
        let val: i64 = item.parse().unwrap();
        pq.push(Reverse(val));
    }
    let mut total_cost: i64 = 0;
    while pq.len() > 1 {
        let Reverse(a) = pq.pop().unwrap();
        let Reverse(b) = pq.pop().unwrap();
        let cost = a + b;
        total_cost += cost;
        pq.push(Reverse(cost));
    }
    println!("{}", total_cost);
}`
        }
    },

    // ==================== MEDIUM #5: Kth Smallest Element in a Sorted Matrix ====================
    {
        title: "Kth Smallest Element in a Sorted Matrix",
        description: "Given an `n x n` matrix where each of the rows and columns is sorted in ascending order, find the `k`-th smallest element in the matrix.\n\nNote that it is the `k`-th smallest element in sorted order, not the `k`-th distinct element.\n\n**Input Format:**\n- First line: two integers `n` (matrix size) and `k` (the k-th smallest element to find).\n- Next `n` lines: each line contains `n` space-separated integers representing a row of the matrix.\n\n**Output Format:**\n- A single integer: the `k`-th smallest element.",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "matrix"],
        constraints: "1 <= n <= 300\n1 <= k <= n^2\n-10^9 <= matrix[i][j] <= 10^9",
        hints: "Since the rows are sorted, we can treat this similar to merging k sorted arrays. Initialize a Min-Heap with the first element of each row. Pop the minimum element, and push the next element from that row.",
        editorial: "**Approach: Min-Heap (K-Way Merge)**\n\nSince both rows and columns are sorted, we can optimize the search using a Min-Heap. \n1. Push the first element of each of the `n` rows into the Min-Heap as `(value, row, col)`.\n2. Repeat the following `k` times:\n   - Pop the minimum element from the heap.\n   - Let it be from `(row, col)`.\n   - If `col + 1 < n`, push the next element in that row `(matrix[row][col + 1], row, col + 1)` into the heap.\n3. The value popped at the `k`-th iteration is our answer.\n\n**Time Complexity:** O(n + k log n) where heapifying the first column takes O(n) and each of the `k` pops takes O(log n) time.\n**Space Complexity:** O(n) to maintain the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3 8\n1 5 9\n10 11 13\n12 13 15",
                output: "13",
                explanation: "The elements in sorted order are: [1, 5, 9, 10, 11, 12, 13, 13, 15]. The 8th smallest element is 13."
            },
            {
                title: "Example 2",
                input: "1 1\n-5",
                output: "-5",
                explanation: "There is only one element in the matrix, so the 1st smallest is -5."
            }
        ],
        testcases: [
            { input: "3 8\n1 5 9\n10 11 13\n12 13 15", output: "13" },
            { input: "1 1\n-5", output: "-5" },
            { input: "2 2\n1 2\n1 3", output: "1" },
            { input: "3 1\n1 3 5\n2 4 6\n3 5 7", output: "1" },
            { input: "3 9\n1 3 5\n2 4 6\n3 5 7", output: "7" },
            { input: "4 6\n1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16", output: "6" },
            { input: "3 5\n10 20 30\n15 25 35\n22 23 40", output: "23" },
            { input: "2 4\n-100 -50\n-80 0", output: "0" },
            { input: "3 3\n1 1 1\n1 1 1\n1 1 1", output: "1" },
            { input: "5 12\n1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25", output: "12" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read matrix, find k-th smallest element
    
    return 0;
}`,
            python: `def main():
    # Read matrix, find k-th smallest element
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read matrix, find k-th smallest element
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read matrix, find k-th smallest element
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val;
    int r;
    int c;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    priority_queue<Element, vector<Element>, greater<Element>> pq;
    for (int i = 0; i < n; i++) {
        pq.push({matrix[i][0], i, 0});
    }
    
    int ans = 0;
    for (int i = 0; i < k; i++) {
        Element curr = pq.top();
        pq.pop();
        ans = curr.val;
        if (curr.c + 1 < n) {
            pq.push({matrix[curr.r][curr.c + 1], curr.r, curr.c + 1});
        }
    }
    cout << ans << "\n";
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
    k = int(data[1])
    
    matrix = []
    idx = 2
    for i in range(n):
        matrix.append([int(x) for x in data[idx : idx + n]])
        idx += n
        
    pq = []
    for i in range(n):
        heapq.heappush(pq, (matrix[i][0], i, 0))
        
    ans = 0
    for _ in range(k):
        ans, r, c = heapq.heappop(pq)
        if c + 1 < n:
            heapq.heappush(pq, (matrix[r][c+1], r, c+1))
            
    print(ans)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Element implements Comparable<Element> {
        int val;
        int r, c;
        Element(int val, int r, int c) {
            this.val = val;
            this.r = r;
            this.c = c;
        }
        @Override
        public int compareTo(Element other) {
            return Integer.compare(this.val, other.val);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        
        int[][] matrix = new int[n][n];
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line == null) continue;
            st = new StringTokenizer(line);
            for (int j = 0; j < n; j++) {
                matrix[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            pq.offer(new Element(matrix[i][0], i, 0));
        }
        
        int ans = 0;
        for (int i = 0; i < k; i++) {
            Element curr = pq.poll();
            ans = curr.val;
            if (curr.c + 1 < n) {
                pq.offer(new Element(matrix[curr.r][curr.c + 1], curr.r, curr.c + 1));
            }
        }
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq, PartialEq)]
struct Element {
    val: i32,
    r: usize,
    c: usize,
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
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    
    let mut matrix = Vec::with_capacity(n);
    for _ in 0..n {
        let line = lines.next().unwrap().unwrap();
        let row: Vec<i32> = line.split_whitespace()
            .map(|x| x.parse().unwrap())
            .collect();
        matrix.push(row);
    }
    
    let mut pq = BinaryHeap::new();
    for i in 0..n {
        pq.push(Element { val: matrix[i][0], r: i, c: 0 });
    }
    
    let mut ans = 0;
    for _ in 0..k {
        if let Some(curr) = pq.pop() {
            ans = curr.val;
            if curr.c + 1 < n {
                pq.push(Element { val: matrix[curr.r][curr.c + 1], r: curr.r, c: curr.c + 1 });
            }
        }
    }
    println!("{}", ans);
}`
        }
    },

    // ==================== MEDIUM #6: K Closest Points to Origin ====================
    {
        title: "K Closest Points to Origin",
        description: "Given an array of points on the X-Y plane where `points[i] = [x_i, y_i]` and an integer `k`, return the `k` closest points to the origin `(0, 0)`.\n\nThe distance between two points on the X-Y plane is the Euclidean distance: `sqrt(x_i^2 + y_i^2)`.\n\nTo ensure a unique and consistent output across all languages:\n1. Sort the `k` points by their squared distance to the origin in ascending order.\n2. If two points have the same distance, sort them by their x-coordinate in ascending order.\n3. If they also have the same x-coordinate, sort them by their y-coordinate in ascending order.\n\n**Input Format:**\n- First line: two integers `n` (number of points) and `k` (number of closest points to return).\n- Next `n` lines: each line contains two space-separated integers `x_i` and `y_i` representing a point.\n\n**Output Format:**\n- `k` lines, each containing two space-separated integers representing a point. The points must be sorted as specified.",
        difficulty: "MEDIUM",
        tags: ["heap", "priority-queue", "geometry"],
        constraints: "1 <= k <= n <= 10^5\n-10^4 <= x_i, y_i <= 10^4",
        hints: "Use a Max-Heap of size k. Compare elements based on squared distance x^2 + y^2. If the size exceeds k, pop the maximum element. After pushing all elements, the heap will contain the k closest elements. Extract them and sort/reverse them.",
        editorial: "**Approach: Max-Heap of size K**\n\nWe want to find the `k` smallest elements, so maintaining a Max-Heap of size `k` is optimal:\n1. For each point `(x, y)`, calculate its squared Euclidean distance `d = x^2 + y^2`.\n2. Push the point into the Max-Heap.\n3. If the size of the heap exceeds `k`, pop the furthest point (i.e. the one with the maximum distance). In case of ties, pop the one with the larger x-coordinate, then larger y-coordinate.\n4. After iterating through all points, the heap will contain the `k` closest points.\n5. Extract all points from the heap, reverse them (since they are extracted in descending order), and print them.\n\n**Time Complexity:** O(n log k) because each insertion/deletion in the heap of size k takes O(log k) time.\n**Space Complexity:** O(k) to maintain the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3 2\n3 3\n5 -1\n-2 4",
                output: "3 3\n-2 4",
                explanation: "Distance of (3, 3) squared is 18.\nDistance of (5, -1) squared is 26.\nDistance of (-2, 4) squared is 20.\nThe 2 closest points are (3, 3) and (-2, 4), sorted by distance: (3, 3), then (-2, 4)."
            },
            {
                title: "Example 2",
                input: "2 1\n1 3\n-1 3",
                output: "-1 3",
                explanation: "Both (1, 3) and (-1, 3) have distance squared 10. Since distances are equal, we sort by x-coordinate: -1 < 1, so (-1, 3) is chosen."
            }
        ],
        testcases: [
            { input: "3 2\n3 3\n5 -1\n-2 4", output: "3 3\n-2 4" },
            { input: "2 1\n1 3\n-1 3", output: "-1 3" },
            { input: "1 1\n0 0", output: "0 0" },
            { input: "4 3\n1 1\n2 2\n3 3\n-1 -1", output: "-1 -1\n1 1\n2 2" },
            { input: "5 2\n10 10\n-10 -10\n10 -10\n-10 10\n0 1", output: "0 1\n-10 -10" },
            { input: "6 4\n2 3\n-2 -3\n2 -3\n-2 3\n0 0\n1 1", output: "0 0\n1 1\n-2 -3\n-2 3" },
            { input: "3 3\n100 100\n10 10\n1 1", output: "1 1\n10 10\n100 100" },
            { input: "4 2\n5 5\n5 5\n5 5\n5 5", output: "5 5\n5 5" },
            { input: "2 2\n1 0\n0 1", output: "0 1\n1 0" },
            { input: "10 5\n-5 5\n5 -5\n-5 -5\n5 5\n3 4\n-3 4\n3 -4\n-3 -4\n0 0\n1 2", output: "0 0\n1 2\n-3 -4\n-3 4\n3 -4" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read points, find k closest points
    
    return 0;
}`,
            python: `def main():
    # Read points, find k closest points
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read points, find k closest points
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read points, find k closest points
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Point {
    long long x, y;
    long long dist_sq;
    bool operator<(const Point& other) const {
        if (dist_sq != other.dist_sq) {
            return dist_sq < other.dist_sq;
        }
        if (x != other.x) {
            return x < other.x;
        }
        return y < other.y;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    priority_queue<Point> pq;
    for (int i = 0; i < n; i++) {
        long long x, y;
        cin >> x >> y;
        long long d = x * x + y * y;
        pq.push({x, y, d});
        if (pq.size() > k) {
            pq.pop();
        }
    }
    vector<Point> result;
    while (!pq.empty()) {
        result.push_back(pq.top());
        pq.pop();
    }
    reverse(result.begin(), result.end());
    for (const auto& p : result) {
        cout << p.x << " " << p.y << "\n";
    }
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
    k = int(data[1])
    
    pq = []
    idx = 2
    for _ in range(n):
        x = int(data[idx])
        y = int(data[idx+1])
        idx += 2
        d = x*x + y*y
        heapq.heappush(pq, (-d, -x, -y, x, y))
        if len(pq) > k:
            heapq.heappop(pq)
            
    result = []
    while pq:
        _, _, _, x, y = heapq.heappop(pq)
        result.append((x, y))
        
    result.reverse()
    for x, y in result:
        print(f"{x} {y}")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Point implements Comparable<Point> {
        long x, y;
        long distSq;
        Point(long x, long y) {
            this.x = x;
            this.y = y;
            this.distSq = x * x + y * y;
        }
        @Override
        public int compareTo(Point other) {
            if (this.distSq != other.distSq) {
                return Long.compare(other.distSq, this.distSq);
            }
            if (this.x != other.x) {
                return Long.compare(other.x, this.x);
            }
            return Long.compare(other.y, this.y);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        
        PriorityQueue<Point> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            line = br.readLine();
            if (line == null) continue;
            st = new StringTokenizer(line);
            long x = Long.parseLong(st.nextToken());
            long y = Long.parseLong(st.nextToken());
            pq.offer(new Point(x, y));
            if (pq.size() > k) {
                pq.poll();
            }
        }
        
        List<Point> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            result.add(pq.poll());
        }
        Collections.reverse(result);
        
        StringBuilder sb = new StringBuilder();
        for (Point p : result) {
            sb.append(p.x).append(" ").append(p.y).append("\n");
        }
        System.out.print(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;
use std::cmp::Ordering;

#[derive(Eq, PartialEq)]
struct Point {
    x: i64,
    y: i64,
    dist_sq: i64,
}

impl Ord for Point {
    fn cmp(&self, other: &Self) -> Ordering {
        self.dist_sq.cmp(&other.dist_sq)
            .then_with(|| self.x.cmp(&other.x))
            .then_with(|| self.y.cmp(&other.y))
    }
}

impl PartialOrd for Point {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    
    let mut pq = BinaryHeap::new();
    for _ in 0..n {
        let line = lines.next().unwrap().unwrap();
        let mut pts = line.split_whitespace();
        let x: i64 = pts.next().unwrap().parse().unwrap();
        let y: i64 = pts.next().unwrap().parse().unwrap();
        let dist_sq = x * x + y * y;
        pq.push(Point { x, y, dist_sq });
        if pq.len() > k {
            pq.pop();
        }
    }
    
    let mut result = Vec::with_capacity(k);
    while let Some(p) = pq.pop() {
        result.push(p);
    }
    result.reverse();
    for p in result {
        println!("{} {}", p.x, p.y);
    }
}`
        }
    },

    // ==================== HARD #4: Maximize Capital (IPO) ====================
    {
        title: "Maximize Capital (IPO)",
        description: "You are given `n` projects where the `i`-th project has a pure profit `profits[i]` and a minimum capital `capital[i]` needed to start it.\n\nInitially, you have `w` capital. When you finish a project, you will obtain its pure profit and your capital will be increased by that profit.\n\nPick a list of at most `k` distinct projects from the given projects to maximize your final capital, and return the final maximized capital.\n\n**Input Format:**\n- First line: three space-separated integers `n`, `k`, and `w` (initial capital).\n- Second line: `n` space-separated integers representing the profits of each project.\n- Third line: `n` space-separated integers representing the capital required for each project.\n\n**Output Format:**\n- A single integer representing the maximum capital after completing at most `k` projects.",
        difficulty: "HARD",
        tags: ["heap", "priority-queue", "greedy", "sorting"],
        constraints: "1 <= n <= 10^5\n0 <= k <= 10^5\n0 <= w <= 10^9\n0 <= profits[i] <= 10^4\n0 <= capital[i] <= 10^9",
        hints: "Sort the projects by capital required. Use a Max-Heap to store profits of all projects you can currently afford. In each step, push new affordable projects to the heap, pop the project with maximum profit, and add it to your capital.",
        editorial: "**Approach: Greedy + Sorting + Max-Heap**\n\nTo maximize capital at each step, we should greedily choose the project that gives the maximum profit among all the projects we can afford with our current capital `w`.\n\n1. Combine `capital` and `profits` into a list of projects, and sort them in ascending order of `capital`.\n2. Maintain a Max-Heap of profits for all projects we can currently afford.\n3. Keep a pointer `idx` to track projects that have been added to the heap.\n4. Repeat at most `k` times:\n   - Add all projects whose capital is <= `w` to the Max-Heap, advancing `idx`.\n   - If the Max-Heap is empty, we cannot afford any more projects; break.\n   - Pop the project with the maximum profit from the heap and add its profit to `w`.\n5. Return `w` as the final maximized capital.\n\n**Time Complexity:** O(n log n + k log n) where sorting takes O(n log n) and we push/pop at most n elements in/out of the heap, each taking O(log n).\n**Space Complexity:** O(n) to store the projects and the heap.",
        examples: [
            {
                title: "Example 1",
                input: "3 2 0\n1 2 3\n0 1 1",
                output: "4",
                explanation: "- w = 0. We can only start project 0 (capital 0, profit 1). Capital becomes 1.\n- w = 1. We can start project 1 (capital 1, profit 2) or project 2 (capital 1, profit 3). We choose project 2. Capital becomes 1 + 3 = 4.\n- Since k = 2, we stop. Final capital is 4."
            },
            {
                title: "Example 2",
                input: "3 3 0\n1 2 3\n0 9 10",
                output: "1",
                explanation: "- w = 0. We can only start project 0 (profit 1). Capital becomes 1.\n- We cannot start project 1 or 2 as we only have 1 capital. We stop. Final capital is 1."
            }
        ],
        testcases: [
            { input: "3 2 0\n1 2 3\n0 1 1", output: "4" },
            { input: "3 3 0\n1 2 3\n0 9 10", output: "1" },
            { input: "1 1 5\n10\n4", output: "15" },
            { input: "5 4 2\n1 3 2 4 1\n1 4 2 6 3", output: "12" },
            { input: "4 1 10\n5 10 15 20\n5 10 15 20", output: "20" },
            { input: "2 0 10\n1 2\n1 2", output: "10" },
            { input: "5 5 0\n10 10 10 10 10\n0 0 0 0 0", output: "50" },
            { input: "3 10 1000\n100 200 300\n2000 3000 4000", output: "1000" },
            { input: "6 3 1\n5 10 3 2 7 8\n0 1 2 1 5 10", output: "26" },
            { input: "8 5 5\n1 2 3 4 5 6 7 8\n5 6 7 8 9 10 11 12", output: "27" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read n, k, w, profits, and capital, find max capital
    
    return 0;
}`,
            python: `def main():
    # Read n, k, w, profits, and capital, find max capital
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Read n, k, w, profits, and capital, find max capital
    }
}`,
            rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Read n, k, w, profits, and capital, find max capital
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Project {
    long long capital;
    long long profit;
    bool operator<(const Project& other) const {
        return capital < other.capital;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    long long w;
    if (!(cin >> n >> k >> w)) return 0;
    vector<long long> profits(n);
    for (int i = 0; i < n; i++) cin >> profits[i];
    vector<long long> capital(n);
    for (int i = 0; i < n; i++) cin >> capital[i];
    
    vector<Project> projects(n);
    for (int i = 0; i < n; i++) {
        projects[i] = {capital[i], profits[i]};
    }
    sort(projects.begin(), projects.end());
    
    priority_queue<long long> pq;
    int idx = 0;
    for (int step = 0; step < k; step++) {
        while (idx < n && projects[idx].capital <= w) {
            pq.push(projects[idx].profit);
            idx++;
        }
        if (pq.empty()) break;
        w += pq.top();
        pq.pop();
    }
    cout << w << "\n";
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
    k = int(data[1])
    w = int(data[2])
    
    profits = [int(x) for x in data[3 : 3 + n]]
    capitals = [int(x) for x in data[3 + n : 3 + 2*n]]
    
    projects = sorted(zip(capitals, profits), key=lambda x: x[0])
    
    pq = []
    i = 0
    for _ in range(k):
        while i < n and projects[i][0] <= w:
            heapq.heappush(pq, -projects[i][1])
            i += 1
        if not pq:
            break
        w += -heapq.heappop(pq)
        
    print(w)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Project implements Comparable<Project> {
        long capital;
        long profit;
        Project(long capital, long profit) {
            this.capital = capital;
            this.profit = profit;
        }
        @Override
        public int compareTo(Project other) {
            return Long.compare(this.capital, other.capital);
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        long w = Long.parseLong(st.nextToken());
        
        long[] profits = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                profits[i] = Long.parseLong(st.nextToken());
            }
        }
        
        long[] capital = new long[n];
        line = br.readLine();
        if (line != null) {
            st = new StringTokenizer(line);
            for (int i = 0; i < n; i++) {
                capital[i] = Long.parseLong(st.nextToken());
            }
        }
        
        List<Project> projects = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            projects.add(new Project(capital[i], profits[i]));
        }
        Collections.sort(projects);
        
        PriorityQueue<Long> pq = new PriorityQueue<>(Collections.reverseOrder());
        int idx = 0;
        for (int step = 0; step < k; step++) {
            while (idx < n && projects.get(idx).capital <= w) {
                pq.offer(projects.get(idx).profit);
                idx++;
            }
            if (pq.isEmpty()) break;
            w += pq.poll();
        }
        System.out.println(w);
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::BinaryHeap;

#[derive(Eq, PartialEq)]
struct Project {
    capital: i64,
    profit: i64,
}

impl Ord for Project {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.capital.cmp(&other.capital)
    }
}

impl PartialOrd for Project {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let first_line = match lines.next() {
        Some(Ok(line)) => line,
        _ => return,
    };
    let mut parts = first_line.split_whitespace();
    let n: usize = parts.next().unwrap().parse().unwrap();
    let k: usize = parts.next().unwrap().parse().unwrap();
    let mut w: i64 = parts.next().unwrap().parse().unwrap();
    
    let second_line = lines.next().unwrap().unwrap();
    let profits: Vec<i64> = second_line.split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let third_line = lines.next().unwrap().unwrap();
    let capital: Vec<i64> = third_line.split_whitespace()
        .map(|x| x.parse().unwrap()).collect();
        
    let mut projects = Vec::with_capacity(n);
    for i in 0..n {
        projects.push(Project { capital: capital[i], profit: profits[i] });
    }
    projects.sort_by_key(|p| p.capital);
    
    let mut pq = BinaryHeap::new();
    let mut idx = 0;
    for _ in 0..k {
        while idx < n && projects[idx].capital <= w {
            pq.push(projects[idx].profit);
            idx += 1;
        }
        if let Some(prof) = pq.pop() {
            w += prof;
        } else {
            break;
        }
    }
    println!("{}", w);
}`
        }
    }
]
