import type { SeedProblem } from './types.js'

export const linkedListsProblems: SeedProblem[] = [
    // ==================== EASY #1: Reverse Linked List ====================
    {
        title: 'Reverse Linked List',
        description:
            'Given the head of a singly linked list, reverse the list, and return the reversed list.\n\n**Input Format:**\n- First line: integer n (number of elements)\n- Second line: n space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the reversed list',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 5000\\n-5000 <= Node.val <= 5000',
        hints: 'Use three pointers (prev, curr, next) to reverse the next pointers of nodes iteratively.',
        editorial:
            '**Approach:**\nKeep track of `prev` (initially null), `curr` (initially head). In each step, store `curr.next`, set `curr.next` to `prev`, update `prev` to `curr`, and move `curr` to the stored next node.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5',
                output: '5 4 3 2 1',
                explanation: '1->2->3->4->5 reversed is 5->4->3->2->1.',
            },
            { title: 'Example 2', input: '2\n10 20', output: '20 10' },
        ],
        testcases: [
            { input: '5\n1 2 3 4 5', output: '5 4 3 2 1' },
            { input: '2\n10 20', output: '20 10' },
            { input: '1\n42', output: '42' },
            { input: '0\n', output: '' },
            { input: '8\n1 1 2 2 3 3 4 4', output: '4 4 3 3 2 2 1 1' },
            { input: '4\n-5 -2 0 3', output: '3 0 -2 -5' },
            { input: '10\n10 9 8 7 6 5 4 3 2 1', output: '1 2 3 4 5 6 7 8 9 10' },
            { input: '3\n1000 0 -1000', output: '-1000 0 1000' },
            { input: '6\n7 7 7 7 7 7', output: '7 7 7 7 7 7' },
            { input: '5\n1 3 5 7 9', output: '9 7 5 3 1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // Read input and solve
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode* prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    head = prev;
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    res = []
    curr = prev
    while curr:
        res.append(str(curr.val))
        curr = curr.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        ListNode temp = prev;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut prev = None;
    let mut curr = head;
    while let Some(mut node) = curr {
        let next = node.next.take();
        node.next = prev;
        prev = Some(node);
        curr = next;
    }
    let mut temp = prev;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== EASY #2: Find Middle Element ====================
    {
        title: 'Find Middle Element',
        description:
            'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.\n\n**Input Format:**\n- First line: integer n (number of elements)\n- Second line: n space-separated integers\n\n**Output Format:**\n- A single integer: the value of the middle node',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '1 <= n <= 5000\\n-5000 <= Node.val <= 5000',
        hints: 'Use a slow and a fast pointer. The slow pointer moves 1 step while the fast pointer moves 2 steps.',
        editorial:
            '**Approach:**\nTraverse the list using two pointers: `slow` and `fast`. Move `slow` by one step and `fast` by two steps. When `fast` reaches the end, `slow` will be at the middle node.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5',
                output: '3',
                explanation: 'The middle node is 3.',
            },
            {
                title: 'Example 2',
                input: '6\n1 2 3 4 5 6',
                output: '4',
                explanation: 'There are two middle nodes (3 and 4), the second one is 4.',
            },
        ],
        testcases: [
            { input: '5\n1 2 3 4 5', output: '3' },
            { input: '6\n1 2 3 4 5 6', output: '4' },
            { input: '1\n99', output: '99' },
            { input: '2\n5 10', output: '10' },
            { input: '3\n-1 -2 -3', output: '-2' },
            { input: '7\n1 1 1 2 1 1 1', output: '2' },
            { input: '8\n10 20 30 40 50 60 70 80', output: '50' },
            { input: '4\n100 200 300 400', output: '300' },
            { input: '9\n1 2 3 4 5 6 7 8 9', output: '5' },
            { input: '10\n1 2 3 4 5 6 7 8 9 10', output: '6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    pass
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    cout << (slow ? slow->val : 0) << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    print(slow.val if slow else 0)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        System.out.println(slow != null ? slow.val : 0);
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut len = 0;
    let mut curr = &head;
    while let Some(node) = curr {
        len += 1;
        curr = &node.next;
    }
    let mut curr = &head;
    for _ in 0..(len / 2) {
        curr = &curr.as_ref().unwrap().next;
    }
    println!("{}", curr.as_ref().unwrap().val);
}`,
        },
    },

    // ==================== EASY #3: Detect Cycle ====================
    {
        title: 'Detect Cycle',
        description:
            'Given the head of a linked list, determine if it has a cycle. A cycle exists if some node can be reached again by continuously following the `next` pointer.\n\n**Input Format:**\n- First line: two integers `n` (number of nodes) and `pos` (0-indexed position where the tail connects. If `pos` is `-1`, there is no cycle).\n- Second line: `n` space-separated integers representing node values.\n\n**Output Format:**\n- `1` if a cycle exists, `0` otherwise.',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 5000\\n-1 <= pos < n',
        hints: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) uses two pointers moving at different speeds.",
        editorial:
            '**Approach:**\nInitialize two pointers `slow` and `fast` at the head. In each iteration, move `slow` by 1 step and `fast` by 2 steps. If they meet at any node, a cycle exists. If `fast` reaches the end, no cycle exists.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4 1\n3 2 0 -4',
                output: '1',
                explanation: 'There is a cycle where the tail connects to the index 1 node.',
            },
            { title: 'Example 2', input: '2 -1\n1 2', output: '0', explanation: 'No cycle.' },
        ],
        testcases: [
            { input: '4 1\n3 2 0 -4', output: '1' },
            { input: '2 -1\n1 2', output: '0' },
            { input: '1 -1\n42', output: '0' },
            { input: '1 0\n42', output: '1' },
            { input: '5 2\n1 2 3 4 5', output: '1' },
            { input: '5 -1\n1 2 3 4 5', output: '0' },
            { input: '7 0\n1 2 3 4 5 6 7', output: '1' },
            { input: '3 1\n10 20 30', output: '1' },
            { input: '8 -1\n1 2 3 4 5 6 7 8', output: '0' },
            { input: '10 5\n1 2 3 4 5 6 7 8 9 10', output: '1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<usize>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, pos;
    if (!(cin >> n >> pos)) return 0;
    if (n == 0) { cout << 0 << "\n"; return 0; }
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        nodes[i] = new ListNode(v);
    }
    for (int i = 0; i < n - 1; i++) nodes[i]->next = nodes[i + 1];
    if (pos != -1) nodes[n - 1]->next = nodes[pos];
    ListNode* slow = nodes[0], *fast = nodes[0];
    bool cycle = false;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) { cycle = true; break; }
    }
    cout << (cycle ? 1 : 0) << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
def main():
    data = sys.stdin.read().split()
    if not data: return
    n, pos = int(data[0]), int(data[1])
    if n == 0:
        print(0)
        return
    nodes = [ListNode(int(x)) for x in data[2:2+n]]
    for i in range(n - 1):
        nodes[i].next = nodes[i + 1]
    if pos != -1:
        nodes[-1].next = nodes[pos]
    slow = fast = nodes[0]
    cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            cycle = True
            break
    print(1 if cycle else 0)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int pos = tokens.get(1);
        if (n == 0) { System.out.println(0); return; }
        ListNode[] nodes = new ListNode[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new ListNode(tokens.get(2 + i));
        }
        for (int i = 0; i < n - 1; i++) {
            nodes[i].next = nodes[i + 1];
        }
        if (pos != -1) {
            nodes[n - 1].next = nodes[pos];
        }
        ListNode slow = nodes[0], fast = nodes[0];
        boolean cycle = false;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) { cycle = true; break; }
        }
        System.out.println(cycle ? 1 : 0);
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<usize>,
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let pos: i32 = tokens[1].parse().unwrap();
    if n == 0 { println!("0"); return; }
    let mut nodes = Vec::new();
    for i in 0..n {
        let val: i32 = tokens[2 + i].parse().unwrap();
        nodes.push(ListNode { val, next: None });
    }
    for i in 0..n-1 {
        nodes[i].next = Some(i + 1);
    }
    if pos != -1 {
        nodes[n - 1].next = Some(pos as usize);
    }
    let mut slow = Some(0);
    let mut fast = Some(0);
    let mut cycle = false;
    while let Some(f) = fast {
        if let Some(f_next) = nodes[f].next {
            fast = nodes[f_next].next;
        } else {
            break;
        }
        slow = nodes[slow.unwrap()].next;
        if slow == fast {
            cycle = true;
            break;
        }
    }
    println!("{}", if cycle { 1 } else { 0 });
}`,
        },
    },

    // ==================== EASY #4: Merge Two Sorted Lists ====================
    {
        title: 'Merge Two Sorted Lists',
        description:
            'Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.\n\n**Input Format:**\n- First line: two integers `n1` and `n2` (sizes of the two lists)\n- Second line: `n1` space-separated integers representing the first sorted list (empty if `n1` is 0)\n- Third line: `n2` space-separated integers representing the second sorted list (empty if `n2` is 0)\n\n**Output Format:**\n- Space-separated integers representing the merged sorted list',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n1, n2 <= 2000\\n-10^9 <= Node.val <= 10^9',
        hints: 'Iterate through both lists, using a dummy node. Compare values at current nodes of both lists, and link the smaller node.',
        editorial:
            '**Approach:**\nUse a dummy node to simplify list building. Maintain a pointer `curr` at the end of the merged list. Compare the heads of the two lists, append the smaller node to `curr.next`, and move the pointer of that list. Append any remaining nodes of either list at the end.\n\n**Time Complexity:** O(n1 + n2)\n**Space Complexity:** O(1)',
        examples: [
            { title: 'Example 1', input: '3 3\n1 2 4\n1 3 4', output: '1 1 2 3 4 4' },
            { title: 'Example 2', input: '0 1\n\n0', output: '0' },
        ],
        testcases: [
            { input: '3 3\n1 2 4\n1 3 4', output: '1 1 2 3 4 4' },
            { input: '0 1\n\n0', output: '0' },
            { input: '0 0\n\n', output: '' },
            { input: '2 2\n1 5\n2 6', output: '1 2 5 6' },
            { input: '1 5\n10\n1 2 3 4 5', output: '1 2 3 4 5 10' },
            { input: '4 2\n-10 -5 0 5\n-3 1', output: '-10 -5 -3 0 1 5' },
            { input: '5 5\n1 3 5 7 9\n2 4 6 8 10', output: '1 2 3 4 5 6 7 8 9 10' },
            { input: '3 1\n2 4 6\n1', output: '1 2 4 6' },
            { input: '1 3\n5\n1 2 3', output: '1 2 3 5' },
            { input: '4 4\n1 1 1 1\n2 2 2 2', output: '1 1 1 1 2 2 2 2' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    ListNode* h1 = nullptr, *t1 = nullptr;
    for (int i = 0; i < n1; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h1) { h1 = node; t1 = node; }
        else { t1->next = node; t1 = node; }
    }
    ListNode* h2 = nullptr, *t2 = nullptr;
    for (int i = 0; i < n2; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h2) { h2 = node; t2 = node; }
        else { t2->next = node; t2 = node; }
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    ListNode* p1 = h1, *p2 = h2;
    while (p1 && p2) {
        if (p1->val <= p2->val) { curr->next = p1; p1 = p1->next; }
        else { curr->next = p2; p2 = p2->next; }
        curr = curr->next;
    }
    curr->next = p1 ? p1 : p2;
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n1, n2 = int(data[0]), int(data[1])
    idx = 2
    vals1 = [int(x) for x in data[idx:idx+n1]]; idx += n1
    vals2 = [int(x) for x in data[idx:idx+n2]]
    
    def build(arr):
        head = tail = None
        for x in arr:
            node = ListNode(x)
            if not head: head = node; tail = node
            else: tail.next = node; tail = node
        return head
    
    h1, h2 = build(vals1), build(vals2)
    dummy = ListNode(0)
    curr = dummy
    p1, p2 = h1, h2
    while p1 and p2:
        if p1.val <= p2.val:
            curr.next = p1; p1 = p1.next
        else:
            curr.next = p2; p2 = p2.next
        curr = curr.next
    curr.next = p1 if p1 else p2
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n1 = tokens.get(0);
        int n2 = tokens.get(1);
        int idx = 2;
        ListNode h1 = null, t1 = null;
        for (int i = 0; i < n1; i++) {
            ListNode node = new ListNode(tokens.get(idx++));
            if (h1 == null) { h1 = node; t1 = node; }
            else { t1.next = node; t1 = node; }
        }
        ListNode h2 = null, t2 = null;
        for (int i = 0; i < n2; i++) {
            ListNode node = new ListNode(tokens.get(idx++));
            if (h2 == null) { h2 = node; t2 = node; }
            else { t2.next = node; t2 = node; }
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode p1 = h1, p2 = h2;
        while (p1 != null && p2 != null) {
            if (p1.val <= p2.val) { curr.next = p1; p1 = p1.next; }
            else { curr.next = p2; p2 = p2.next; }
            curr = curr.next;
        }
        curr.next = (p1 != null) ? p1 : p2;
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn merge_lists(mut l1: Option<Box<ListNode>>, mut l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    match (l1, l2) {
        (None, r) => r,
        (l, None) => l,
        (Some(mut n1), Some(mut n2)) => {
            if n1.val <= n2.val {
                n1.next = merge_lists(n1.next.take(), Some(n2));
                Some(n1)
            } else {
                n2.next = merge_lists(Some(n1), n2.next.take());
                Some(n2)
            }
        }
    }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n1: usize = tokens[0].parse().unwrap();
    let n2: usize = tokens[1].parse().unwrap();
    let mut h1 = None;
    for i in (0..n1).rev() {
        let val: i32 = tokens[2 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = h1;
        h1 = Some(node);
    }
    let mut h2 = None;
    for i in (0..n2).rev() {
        let val: i32 = tokens[2 + n1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = h2;
        h2 = Some(node);
    }
    let merged = merge_lists(h1, h2);
    let mut temp = merged;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== EASY #5: Remove Nth Node from End ====================
    {
        title: 'Remove Nth Node from End',
        description:
            'Given the head of a linked list, remove the `k`-th node from the end of the list and return its head.\n\n**Input Format:**\n- First line: two integers `n` (number of elements) and `k` (1-based index from end to remove)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the modified list',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '1 <= n <= 5000\\n1 <= k <= n\\n-10^9 <= Node.val <= 10^9',
        hints: 'Use two pointers, fast and slow, spaced `k` nodes apart. Move both until fast reaches the end.',
        editorial:
            '**Approach:**\nInitialize two pointers `fast` and `slow`. Move `fast` by `k` steps first. Then, move both pointers together until `fast.next` is null. `slow.next` will point to the node to be deleted, so change `slow.next` to `slow.next.next`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5 2\n1 2 3 4 5',
                output: '1 2 3 5',
                explanation: 'Removing the 2nd node from end (which is 4) results in 1->2->3->5.',
            },
            { title: 'Example 2', input: '1 1\n1', output: '' },
        ],
        testcases: [
            { input: '5 2\n1 2 3 4 5', output: '1 2 3 5' },
            { input: '1 1\n1', output: '' },
            { input: '2 1\n1 2', output: '1' },
            { input: '2 2\n1 2', output: '2' },
            { input: '6 3\n10 20 30 40 50 60', output: '10 20 30 50 60' },
            { input: '7 7\n1 2 3 4 5 6 7', output: '2 3 4 5 6 7' },
            { input: '7 1\n1 2 3 4 5 6 7', output: '1 2 3 4 5 6' },
            { input: '5 4\n1 3 5 7 9', output: '1 5 7 9' },
            { input: '3 2\n-1 -2 -3', output: '-1 -3' },
            { input: '8 5\n1 2 3 4 5 6 7 8', output: '1 2 3 5 6 7 8' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    for (int i = 0; i < k; i++) fast = fast->next;
    ListNode* slow = &dummy;
    while (fast->next) {
        slow = slow->next;
        fast = fast->next;
    }
    ListNode* to_del = slow->next;
    slow->next = slow->next->next;
    delete to_del;
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    vals = [int(x) for x in data[2:2+n]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    dummy = ListNode(0)
    dummy.next = head
    fast = slow = dummy
    for _ in range(k):
        fast = fast.next
    while fast.next:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int k = tokens.get(1);
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(2 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        for (int i = 0; i < k; i++) fast = fast.next;
        ListNode slow = dummy;
        while (fast.next != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let k: usize = tokens[1].parse().unwrap();
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[2 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut len = 0;
    let mut curr = &head;
    while let Some(node) = curr {
        len += 1;
        curr = &node.next;
    }
    if k == len {
        head = head.unwrap().next;
    } else {
        let mut curr = &mut head;
        for _ in 0..(len - k - 1) {
            curr = &mut curr.as_mut().unwrap().next;
        }
        let mut target = curr.as_mut().unwrap().next.take();
        curr.as_mut().unwrap().next = target.unwrap().next.take();
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== MEDIUM #1: Add Two Numbers as Lists ====================
    {
        title: 'Add Two Numbers as Lists',
        description:
            'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list in reverse order.\n\n**Input Format:**\n- First line: two integers `n1` and `n2` (lengths of the two lists)\n- Second line: `n1` space-separated integers representing digits of list 1 (reversed)\n- Third line: `n2` space-separated integers representing digits of list 2 (reversed)\n\n**Output Format:**\n- Space-separated integers representing the sum list digits in reverse order',
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'recursion'],
        constraints: '1 <= n1, n2 <= 10000\\n0 <= Node.val <= 9',
        hints: 'Simulate addition digit by digit from head to tail, keeping track of the carry.',
        editorial:
            '**Approach:**\nKeep track of a carry value. For each pair of nodes, calculate the sum = val1 + val2 + carry. The new carry is sum / 10, and the digit added to the new node is sum % 10. Repeat until both lists are exhausted and carry is 0.\n\n**Time Complexity:** O(max(n1, n2))\n**Space Complexity:** O(max(n1, n2))',
        examples: [
            {
                title: 'Example 1',
                input: '3 3\n2 4 3\n5 6 4',
                output: '7 0 8',
                explanation: '342 + 465 = 807, represented as 7->0->8.',
            },
            { title: 'Example 2', input: '1 1\n0\n0', output: '0' },
        ],
        testcases: [
            { input: '3 3\n2 4 3\n5 6 4', output: '7 0 8' },
            { input: '1 1\n0\n0', output: '0' },
            { input: '7 7\n9 9 9 9 9 9 9\n9 9 9 9 9 9 9', output: '8 9 9 9 9 9 9 1' },
            { input: '1 3\n5\n5 4 3', output: '0 5 3' },
            { input: '4 2\n1 2 3 4\n5 6', output: '6 8 3 4' },
            { input: '3 4\n9 9 9\n1 0 0 1', output: '0 0 0 2' },
            { input: '5 5\n0 2 4 6 8\n1 3 5 7 9', output: '1 5 9 3 8 1' },
            { input: '2 3\n5 5\n5 4 3', output: '0 0 4' },
            { input: '1 2\n9\n1 9', output: '0 0 1' },
            { input: '6 1\n1 2 3 4 5 6\n7', output: '8 2 3 4 5 6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    ListNode* h1 = nullptr, *t1 = nullptr;
    for (int i = 0; i < n1; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h1) { h1 = node; t1 = node; }
        else { t1->next = node; t1 = node; }
    }
    ListNode* h2 = nullptr, *t2 = nullptr;
    for (int i = 0; i < n2; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!h2) { h2 = node; t2 = node; }
        else { t2->next = node; t2 = node; }
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    ListNode* p1 = h1, *p2 = h2;
    int carry = 0;
    while (p1 || p2 || carry) {
        int val = carry;
        if (p1) { val += p1->val; p1 = p1->next; }
        if (p2) { val += p2->val; p2 = p2->next; }
        carry = val / 10;
        curr->next = new ListNode(val % 10);
        curr = curr->next;
    }
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n1, n2 = int(data[0]), int(data[1])
    idx = 2
    vals1 = [int(x) for x in data[idx:idx+n1]]; idx += n1
    vals2 = [int(x) for x in data[idx:idx+n2]]
    
    def build(arr):
        head = tail = None
        for x in arr:
            node = ListNode(x)
            if not head: head = node; tail = node
            else: tail.next = node; tail = node
        return head
    
    h1, h2 = build(vals1), build(vals2)
    dummy = ListNode(0)
    curr = dummy
    p1, p2 = h1, h2
    carry = 0
    while p1 or p2 or carry:
        val = carry
        if p1:
            val += p1.val
            p1 = p1.next
        if p2:
            val += p2.val
            p2 = p2.next
        carry = val // 10
        curr.next = ListNode(val % 10)
        curr = curr.next
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n1 = tokens.get(0);
        int n2 = tokens.get(1);
        int idx = 2;
        ListNode h1 = null, t1 = null;
        for (int i = 0; i < n1; i++) {
            ListNode node = new ListNode(tokens.get(idx++));
            if (h1 == null) { h1 = node; t1 = node; }
            else { t1.next = node; t1 = node; }
        }
        ListNode h2 = null, t2 = null;
        for (int i = 0; i < n2; i++) {
            ListNode node = new ListNode(tokens.get(idx++));
            if (h2 == null) { h2 = node; t2 = node; }
            else { t2.next = node; t2 = node; }
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode p1 = h1, p2 = h2;
        int carry = 0;
        while (p1 != null || p2 != null || carry > 0) {
            int val = carry;
            if (p1 != null) { val += p1.val; p1 = p1.next; }
            if (p2 != null) { val += p2.val; p2 = p2.next; }
            carry = val / 10;
            curr.next = new ListNode(val % 10);
            curr = curr.next;
        }
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn add_two_numbers(mut l1: Option<Box<ListNode>>, mut l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut dummy = Box::new(ListNode::new(0));
    let mut curr = &mut dummy;
    let mut carry = 0;
    let mut p1 = l1;
    let mut p2 = l2;
    while p1.is_some() || p2.is_some() || carry > 0 {
        let mut sum = carry;
        if let Some(node) = p1 {
            sum += node.val;
            p1 = node.next;
        }
        if let Some(node) = p2 {
            sum += node.val;
            p2 = node.next;
        }
        carry = sum / 10;
        curr.next = Some(Box::new(ListNode::new(sum % 10)));
        curr = curr.next.as_mut().unwrap();
    }
    dummy.next
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n1: usize = tokens[0].parse().unwrap();
    let n2: usize = tokens[1].parse().unwrap();
    let mut h1 = None;
    for i in (0..n1).rev() {
        let val: i32 = tokens[2 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = h1;
        h1 = Some(node);
    }
    let mut h2 = None;
    for i in (0..n2).rev() {
        let val: i32 = tokens[2 + n1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = h2;
        h2 = Some(node);
    }
    let sum_list = add_two_numbers(h1, h2);
    let mut temp = sum_list;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== MEDIUM #2: Swap Adjacent Pairs ====================
    {
        title: 'Swap Adjacent Pairs',
        description:
            "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).\n\n**Input Format:**\n- First line: integer `n` (number of nodes)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the modified list",
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'recursion'],
        constraints: '0 <= n <= 5000\\n-100 <= Node.val <= 100',
        hints: 'Use recursion or iteration. For recursion, the next of the first node should be the swapped remainder list.',
        editorial:
            '**Approach:**\nIf the list has less than 2 nodes, return head. Otherwise, let `first` be head, and `second` be head.next. Set `first.next` to the result of recursively calling the function on `second.next`. Set `second.next` to `first`. Return `second`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for recursion stack, or O(1) if done iteratively.',
        examples: [
            { title: 'Example 1', input: '4\n1 2 3 4', output: '2 1 4 3' },
            { title: 'Example 2', input: '1\n1', output: '1' },
        ],
        testcases: [
            { input: '4\n1 2 3 4', output: '2 1 4 3' },
            { input: '1\n1', output: '1' },
            { input: '0\n', output: '' },
            { input: '2\n10 20', output: '20 10' },
            { input: '3\n1 2 3', output: '2 1 3' },
            { input: '5\n1 2 3 4 5', output: '2 1 4 3 5' },
            { input: '6\n-1 -2 -3 -4 -5 -6', output: '-2 -1 -4 -3 -6 -5' },
            { input: '8\n1 1 2 2 3 3 4 4', output: '1 1 2 2 3 3 4 4' },
            { input: '7\n10 20 30 40 50 60 70', output: '20 10 40 30 60 50 70' },
            { input: '10\n1 2 3 4 5 6 7 8 9 10', output: '2 1 4 3 6 5 8 7 10 9' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
ListNode* swapPairs(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* first = head;
    ListNode* second = head->next;
    first->next = swapPairs(second->next);
    second->next = first;
    return second;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    head = swapPairs(head);
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def swapPairs(head):
    if not head or not head.next: return head
    first = head
    second = head.next
    first.next = swapPairs(second.next)
    second.next = first
    return second
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    head = swapPairs(head)
    res = []
    temp = head
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    static ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode first = head;
        ListNode second = head.next;
        first.next = swapPairs(second.next);
        second.next = first;
        return second;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        head = swapPairs(head);
        ListNode temp = head;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn swap_pairs(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    if head.is_none() || head.as_ref().unwrap().next.is_none() {
        return head;
    }
    let mut first = head.unwrap();
    let mut second = first.next.take().unwrap();
    first.next = swap_pairs(second.next.take());
    second.next = Some(first);
    Some(second)
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let swapped = swap_pairs(head);
    let mut temp = swapped;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== MEDIUM #3: Reorder List ====================
    {
        title: 'Reorder List',
        description:
            "You are given the head of a singly linked list. Reorder the list to be in the following form: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …\\n\\nYou must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).\n\n**Input Format:**\n- First line: integer `n` (number of nodes)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the reordered list",
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'two-pointers'],
        constraints: '1 <= n <= 10000\\n-100 <= Node.val <= 100',
        hints: '1. Find the middle of the list. 2. Reverse the second half of the list. 3. Merge the two halves alternating nodes.',
        editorial:
            '**Approach:**\nFirst, use fast/slow pointers to find the middle of the linked list. Then, split the list and reverse the second half in-place. Finally, merge the first half and the reversed second half by alternate splicing.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '4\n1 2 3 4',
                output: '1 4 2 3',
                explanation: '1->2->3->4 is reordered to 1->4->2->3.',
            },
            { title: 'Example 2', input: '5\n1 2 3 4 5', output: '1 5 2 4 3' },
        ],
        testcases: [
            { input: '4\n1 2 3 4', output: '1 4 2 3' },
            { input: '5\n1 2 3 4 5', output: '1 5 2 4 3' },
            { input: '1\n42', output: '42' },
            { input: '2\n1 2', output: '1 2' },
            { input: '3\n1 2 3', output: '1 3 2' },
            { input: '6\n10 20 30 40 50 60', output: '10 60 20 50 30 40' },
            { input: '7\n1 2 3 4 5 6 7', output: '1 7 2 6 3 5 4' },
            { input: '8\n-1 -2 -3 -4 -5 -6 -7 -8', output: '-1 -8 -2 -7 -3 -6 -4 -5' },
            { input: '10\n1 2 3 4 5 6 7 8 9 10', output: '1 10 2 9 3 8 4 7 5 6' },
            { input: '9\n1 2 3 4 5 6 7 8 9', output: '1 9 2 8 3 7 4 6 5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    if (!head || !head->next) {
        cout << (head ? head->val : 0) << "\n";
        return 0;
    }
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* head2 = slow->next;
    slow->next = nullptr;
    ListNode* prev = nullptr, *curr = head2;
    while (curr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    head2 = prev;
    ListNode* p1 = head, *p2 = head2;
    while (p1 && p2) {
        ListNode* n1 = p1->next;
        ListNode* n2 = p2->next;
        p1->next = p2;
        p2->next = n1;
        p1 = n1;
        p2 = n2;
    }
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    if not head or not head.next:
        print(head.val if head else "")
        return
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    head2 = slow.next
    slow.next = None
    
    prev = None
    curr = head2
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    head2 = prev
    
    p1, p2 = head, head2
    while p1 and p2:
        n1, n2 = p1.next, p2.next
        p1.next = p2
        p2.next = n1
        p1, p2 = n1, n2
    res = []
    temp = head
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        if (head == null || head.next == null) {
            System.out.println(head != null ? head.val : "");
            return;
        }
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode head2 = slow.next;
        slow.next = null;
        ListNode prev = null, curr = head2;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        head2 = prev;
        ListNode p1 = head, p2 = head2;
        while (p1 != null && p2 != null) {
            ListNode n1 = p1.next;
            ListNode n2 = p2.next;
            p1.next = p2;
            p2.next = n1;
            p1 = n1;
            p2 = n2;
        }
        ListNode temp = head;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let mut vals = Vec::new();
    for i in 0..n {
        vals.push(tokens[1 + i].parse::<i32>().unwrap());
    }
    let mut reordered = Vec::new();
    let (mut i, mut j) = (0, n as i32 - 1);
    while i <= j {
        if i == j {
            reordered.push(vals[i as usize]);
        } else {
            reordered.push(vals[i as usize]);
            reordered.push(vals[j as usize]);
        }
        i += 1;
        j -= 1;
    }
    let mut head = None;
    for &val in reordered.iter().rev() {
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== MEDIUM #4: Sort Linked List ====================
    {
        title: 'Sort Linked List',
        description:
            'Given the head of a linked list, return the list after sorting it in ascending order.\n\n**Input Format:**\n- First line: integer `n` (number of nodes)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the sorted list',
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'recursion'],
        constraints: '0 <= n <= 10000\\n-10^5 <= Node.val <= 10^5',
        hints: 'Use Merge Sort on the linked list. Find the middle node to divide, sort halves recursively, and merge them.',
        editorial:
            '**Approach:**\nDivide the list into two halves using the fast/slow pointer method. Recursively sort each half. Finally, merge the sorted halves using a sorted merge algorithm. This achieves O(n log n) time.\n\n**Time Complexity:** O(n log n)\n**Space Complexity:** O(log n) recursion stack depth.',
        examples: [
            { title: 'Example 1', input: '4\n4 2 1 3', output: '1 2 3 4' },
            { title: 'Example 2', input: '5\n-1 5 3 4 0', output: '-1 0 3 4 5' },
        ],
        testcases: [
            { input: '4\n4 2 1 3', output: '1 2 3 4' },
            { input: '5\n-1 5 3 4 0', output: '-1 0 3 4 5' },
            { input: '0\n', output: '' },
            { input: '1\n42', output: '42' },
            { input: '2\n10 -10', output: '-10 10' },
            { input: '7\n10 9 8 7 6 5 4', output: '4 5 6 7 8 9 10' },
            { input: '6\n1 3 2 3 1 2', output: '1 1 2 2 3 3' },
            { input: '8\n5 2 7 3 9 1 6 4', output: '1 2 3 4 5 6 7 9' },
            { input: '10\n0 0 0 0 0 0 0 0 0 0', output: '0 0 0 0 0 0 0 0 0 0' },
            { input: '5\n100 20 400 30 50', output: '20 30 50 100 400' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
ListNode* getMid(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head->next;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}
ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* mid = getMid(head);
    ListNode* right = mid->next;
    mid->next = nullptr;
    ListNode* left = sortList(head);
    right = sortList(right);
    return merge(left, right);
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    head = sortList(head);
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def getMid(head):
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
def merge(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1; l1 = l1.next
        else:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    curr.next = l1 if l1 else l2
    return dummy.next
def sortList(head):
    if not head or not head.next: return head
    mid = getMid(head)
    right = mid.next
    mid.next = None
    left = sortList(head)
    right = sortList(right)
    return merge(left, right)
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    head = sortList(head)
    res = []
    temp = head
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    static ListNode getMid(ListNode head) {
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    static ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
            else { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
    static ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode mid = getMid(head);
        ListNode right = mid.next;
        mid.next = null;
        ListNode left = sortList(head);
        right = sortList(right);
        return merge(left, right);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        head = sortList(head);
        ListNode temp = head;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut vals = Vec::new();
    for i in 0..n {
        vals.push(tokens[1 + i].parse::<i32>().unwrap());
    }
    vals.sort();
    let mut head = None;
    for &val in vals.iter().rev() {
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== MEDIUM #5: Rotate List by K ====================
    {
        title: 'Rotate List by K',
        description:
            'Given the head of a linked list, rotate the list to the right by `k` places.\n\n**Input Format:**\n- First line: two integers `n` (number of nodes) and `k` (number of rotations)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the rotated list',
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 10000\\n0 <= k <= 2 * 10^9\\n-100 <= Node.val <= 100',
        hints: '1. Find length of list, L. 2. Since k can be larger than L, update k = k % L. 3. Connect tail to head, then break at L - k.',
        editorial:
            '**Approach:**\nFind the tail node and compute the length of the list `L`. Make the list circular by pointing `tail.next = head`. The new tail will be at position `L - (k % L) - 1` from the head. Find this new tail, store the new head `new_tail.next`, and break the circle by setting `new_tail.next = null`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5 2\n1 2 3 4 5',
                output: '4 5 1 2 3',
                explanation: 'Rotate 2 steps: 4->5->1->2->3.',
            },
            { title: 'Example 2', input: '3 4\n0 1 2', output: '2 0 1' },
        ],
        testcases: [
            { input: '5 2\n1 2 3 4 5', output: '4 5 1 2 3' },
            { input: '3 4\n0 1 2', output: '2 0 1' },
            { input: '0 5\n', output: '' },
            { input: '1 0\n42', output: '42' },
            { input: '1 99\n42', output: '42' },
            { input: '4 2\n10 20 30 40', output: '30 40 10 20' },
            { input: '6 6\n1 2 3 4 5 6', output: '1 2 3 4 5 6' },
            { input: '8 3\n1 2 3 4 5 6 7 8', output: '6 7 8 1 2 3 4 5' },
            { input: '5 1000000000\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '7 10\n1 2 3 4 5 6 7', output: '5 6 7 1 2 3 4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    if (n == 0) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    k %= n;
    if (k == 0) {
        ListNode* temp = head;
        while (temp) { cout << temp->val << (temp->next ? " " : ""); temp = temp->next; }
        cout << "\n";
        return 0;
    }
    tail->next = head; // make circular
    ListNode* new_tail = head;
    for (int i = 0; i < n - k - 1; i++) {
        new_tail = new_tail->next;
    }
    head = new_tail->next;
    new_tail->next = nullptr;
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[2:2+n]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    k %= n
    if k == 0:
        print(" ".join(str(x) for x in vals))
        return
    tail.next = head
    new_tail = head
    for _ in range(n - k - 1):
        new_tail = new_tail.next
    head = new_tail.next
    new_tail.next = None
    res = []
    temp = head
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int k = tokens.get(1);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(2 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        k %= n;
        if (k != 0) {
            tail.next = head;
            ListNode newTail = head;
            for (int i = 0; i < n - k - 1; i++) {
                newTail = newTail.next;
            }
            head = newTail.next;
            newTail.next = null;
        }
        ListNode temp = head;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let k: usize = tokens[1].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut vals = Vec::new();
    for i in 0..n {
        vals.push(tokens[2 + i].parse::<i32>().unwrap());
    }
    let rot = k % n;
    if rot > 0 {
        let mut rotated = Vec::new();
        rotated.extend_from_slice(&vals[n - rot..]);
        rotated.extend_from_slice(&vals[..n - rot]);
        vals = rotated;
    }
    let mut head = None;
    for &val in vals.iter().rev() {
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== HARD #1: Reverse in K-Groups ====================
    {
        title: 'Reverse in K-Groups',
        description:
            'Given the head of a linked list, reverse the nodes of the list `k` at a time and return the modified list.\n\nIf the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as they are.\n\n**Input Format:**\n- First line: two integers `n` (number of nodes) and `k` (size of groups to reverse)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the modified list',
        difficulty: 'HARD',
        tags: ['linked-list', 'recursion', 'two-pointers'],
        constraints: '1 <= k <= n <= 5000\\n-1000 <= Node.val <= 1000',
        hints: 'Check if there are at least `k` nodes remaining. If yes, reverse them and link the tail to the recursive call result.',
        editorial:
            '**Approach:**\nVerify if there are at least `k` nodes. If not, return the head as-is. If there are, reverse the first `k` nodes. The head of the original list becomes the tail of the reversed group. Connect this tail to the result of recursively reversing the remaining list.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n/k) recursion depth.',
        examples: [
            {
                title: 'Example 1',
                input: '5 2\n1 2 3 4 5',
                output: '2 1 4 3 5',
                explanation: 'Reverse in groups of 2: [1,2] -> [2,1]; [3,4] -> [4,3]; [5] stays 5.',
            },
            {
                title: 'Example 2',
                input: '5 3\n1 2 3 4 5',
                output: '3 2 1 4 5',
                explanation: '[1,2,3] -> [3,2,1]; [4,5] stays 4->5.',
            },
        ],
        testcases: [
            { input: '5 2\n1 2 3 4 5', output: '2 1 4 3 5' },
            { input: '5 3\n1 2 3 4 5', output: '3 2 1 4 5' },
            { input: '5 1\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '4 4\n1 2 3 4', output: '4 3 2 1' },
            { input: '6 3\n1 2 3 4 5 6', output: '3 2 1 6 5 4' },
            { input: '8 3\n1 2 3 4 5 6 7 8', output: '3 2 1 6 5 4 7 8' },
            { input: '2 2\n10 20', output: '20 10' },
            { input: '1 1\n42', output: '42' },
            { input: '7 2\n-1 -2 -3 -4 -5 -6 -7', output: '-2 -1 -4 -3 -6 -5 -7' },
            { input: '10 5\n1 2 3 4 5 6 7 8 9 10', output: '5 4 3 2 1 10 9 8 7 6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* curr = head;
    int count = 0;
    while (curr && count < k) {
        curr = curr->next;
        count++;
    }
    if (count == k) {
        ListNode* reversedHead = reverseKGroup(curr, k);
        while (count > 0) {
            ListNode* nextNode = head->next;
            head->next = reversedHead;
            reversedHead = head;
            head = nextNode;
            count--;
        }
        head = reversedHead;
    }
    return head;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    head = reverseKGroup(head, k);
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def reverseKGroup(head, k):
    curr = head
    count = 0
    while curr and count < k:
        curr = curr.next
        count += 1
    if count == k:
        reversedHead = reverseKGroup(curr, k)
        while count > 0:
            nextNode = head.next
            head.next = reversedHead
            reversedHead = head
            head = nextNode
            count -= 1
        head = reversedHead
    return head
def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    vals = [int(x) for x in data[2:2+n]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head: head = node; tail = node
        else: tail.next = node; tail = node
    head = reverseKGroup(head, k)
    res = []
    temp = head
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    static ListNode reverseKGroup(ListNode head, int k) {
        ListNode curr = head;
        int count = 0;
        while (curr != null && count < k) {
            curr = curr.next;
            count++;
        }
        if (count == k) {
            ListNode reversedHead = reverseKGroup(curr, k);
            while (count > 0) {
                ListNode nextNode = head.next;
                head.next = reversedHead;
                reversedHead = head;
                head = nextNode;
                count--;
            }
            head = reversedHead;
        }
        return head;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int k = tokens.get(1);
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(2 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        head = reverseKGroup(head, k);
        ListNode temp = head;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let k: usize = tokens[1].parse().unwrap();
    let mut vals = Vec::new();
    for i in 0..n {
        vals.push(tokens[2 + i].parse::<i32>().unwrap());
    }
    for chunk in vals.chunks_mut(k) {
        if chunk.len() == k {
            chunk.reverse();
        }
    }
    let mut head = None;
    for &val in vals.iter().rev() {
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== HARD #2: Merge K Sorted Lists ====================
    {
        title: 'Merge K Sorted Lists',
        description:
            'You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\n**Input Format:**\n- First line: integer `k` (number of sorted lists)\n- Next `k` lines: each line contains an integer `m` (number of elements in the list) followed by `m` space-separated integers.\n\n**Output Format:**\n- Space-separated integers representing the merged sorted list',
        difficulty: 'HARD',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= k <= 10^4\\n0 <= total_nodes <= 10^5\\n-10^9 <= Node.val <= 10^9',
        hints: 'Use a Priority Queue (Min-Heap) containing the head nodes of all lists. Extract the minimum node, append it to result, and insert its next node into the heap.',
        editorial:
            '**Approach:**\nCreate a min-heap to store the head nodes of each of the `k` lists. Pop the minimum node from the heap, make it part of the merged list, and push its next node back into the heap. Repeat until the heap is empty.\n\n**Time Complexity:** O(N log k) where N is total nodes.\n**Space Complexity:** O(k) for heap size.',
        examples: [
            {
                title: 'Example 1',
                input: '3\n3 1 4 5\n3 1 3 4\n2 2 6',
                output: '1 1 2 3 4 4 5 6',
                explanation:
                    'Lists: [1->4->5], [1->3->4], [2->6]. Merged sorted: 1->1->2->3->4->4->5->6.',
            },
            { title: 'Example 2', input: '1\n0', output: '' },
        ],
        testcases: [
            { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', output: '1 1 2 3 4 4 5 6' },
            { input: '1\n0', output: '' },
            { input: '2\n0\n0', output: '' },
            { input: '3\n1 5\n1 2\n1 1', output: '1 2 5' },
            { input: '4\n2 1 10\n2 2 9\n2 3 8\n2 4 7', output: '1 2 3 4 7 8 9 10' },
            { input: '2\n3 -1 0 1\n3 -2 0 2', output: '-2 -1 0 0 1 2' },
            { input: '5\n1 1\n1 2\n1 3\n1 4\n1 5', output: '1 2 3 4 5' },
            { input: '3\n3 10 20 30\n0\n3 5 15 25', output: '5 10 15 20 25 30' },
            { input: '1\n4 1 2 3 4', output: '1 2 3 4' },
            { input: '3\n3 1 1 1\n3 2 2 2\n3 3 3 3', output: '1 1 1 2 2 2 3 3 3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int k;
    if (!(cin >> k)) return 0;
    priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
    for (int i = 0; i < k; i++) {
        int m; cin >> m;
        ListNode* head = nullptr, *tail = nullptr;
        for (int j = 0; j < m; j++) {
            int val; cin >> val;
            ListNode* node = new ListNode(val);
            if (!head) { head = node; tail = node; }
            else { tail->next = node; tail = node; }
        }
        if (head) pq.push(head);
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next) pq.push(node->next);
    }
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys, heapq
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    k = int(data[0])
    idx = 1
    pq = []
    for list_idx in range(k):
        if idx >= len(data): break
        m = int(data[idx]); idx += 1
        head = tail = None
        for _ in range(m):
            val = int(data[idx]); idx += 1
            node = ListNode(val)
            if not head: head = node; tail = node
            else: tail.next = node; tail = node
        if head:
            heapq.heappush(pq, (head.val, list_idx, head))
    dummy = ListNode(0)
    curr = dummy
    while pq:
        val, list_idx, node = heapq.heappop(pq)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(pq, (node.next.val, list_idx, node.next))
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int k = tokens.get(0);
        int idx = 1;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        for (int i = 0; i < k; i++) {
            if (idx >= tokens.size()) break;
            int m = tokens.get(idx++);
            ListNode head = null, tail = null;
            for (int j = 0; j < m; j++) {
                ListNode node = new ListNode(tokens.get(idx++));
                if (head == null) { head = node; tail = node; }
                else { tail.next = node; tail = node; }
            }
            if (head != null) pq.add(head);
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            curr.next = node;
            curr = curr.next;
            if (node.next != null) pq.add(node.next);
        }
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let k: usize = tokens[0].parse().unwrap();
    let mut idx = 1;
    let mut vals = Vec::new();
    for _ in 0..k {
        if idx >= tokens.len() { break; }
        let m: usize = tokens[idx].parse().unwrap();
        idx += 1;
        for _ in 0..m {
            vals.push(tokens[idx].parse::<i32>().unwrap());
            idx += 1;
        }
    }
    vals.sort();
    let mut head = None;
    for &val in vals.iter().rev() {
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut temp = head;
    let mut res = Vec::new();
    while let Some(node) = temp {
        res.push(node.val.to_string());
        temp = node.next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },

    // ==================== HARD #3: LRU Cache Operations ====================
    {
        title: 'LRU Cache Operations',
        description:
            'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache operations: PUT key value, and GET key.\n\n**Input Format:**\n- First line: two integers `capacity` (cache capacity) and `q` (number of operations)\n- Next `q` lines: each line describes an operation: either `PUT key value` or `GET key`.\n\n**Output Format:**\n- Space-separated integers representing the outputs of all `GET` operations',
        difficulty: 'HARD',
        tags: ['linked-list', 'two-pointers'],
        constraints: '1 <= capacity <= 3000\\n1 <= q <= 10^5\\n0 <= key, value <= 10^6',
        hints: 'Use a hash map and a doubly linked list. The hash map maps keys to nodes in the doubly linked list, permitting O(1) lookups and node updates.',
        editorial:
            '**Approach:**\nA doubly linked list is used to maintain the access sequence of cache nodes (front for most recent, tail for eldest). The hash map maps cache keys to list nodes. For GET, move node to front and return value. For PUT, insert or update node, move to front, and evict the tail if capacity is exceeded.\n\n**Time Complexity:** O(1) per operation.\n**Space Complexity:** O(capacity).',
        examples: [
            {
                title: 'Example 1',
                input: '2 10\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nPUT 4 4\nGET 1\nGET 3\nGET 4',
                output: '1 -1 -1 3 4',
            },
            { title: 'Example 2', input: '1 3\nPUT 5 10\nGET 5\nGET 6', output: '10 -1' },
        ],
        testcases: [
            {
                input: '2 10\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nPUT 4 4\nGET 1\nGET 3\nGET 4',
                output: '1 -1 -1 3 4',
            },
            { input: '1 3\nPUT 5 10\nGET 5\nGET 6', output: '10 -1' },
            {
                input: '3 12\nPUT 1 10\nPUT 2 20\nPUT 3 30\nGET 1\nGET 2\nGET 3\nPUT 4 40\nGET 1\nGET 2\nGET 3\nGET 4',
                output: '10 20 30 -1 20 30 40',
            },
            {
                input: '2 6\nPUT 1 100\nPUT 2 200\nGET 1\nPUT 1 150\nGET 1\nGET 2',
                output: '100 150 200',
            },
            {
                input: '4 10\nPUT 1 1\nPUT 2 2\nPUT 3 3\nPUT 4 4\nGET 1\nGET 2\nPUT 5 5\nGET 3\nGET 4\nGET 5',
                output: '1 2 -1 4 5',
            },
            { input: '2 5\nGET 1\nPUT 1 10\nGET 1\nPUT 2 20\nGET 2', output: '-1 10 20' },
            { input: '1 5\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2', output: '-1 -1' },
            { input: '2 7\nPUT 2 1\nPUT 1 1\nPUT 2 3\nPUT 4 1\nGET 1\nGET 2', output: '-1 3' },
            {
                input: '3 10\nPUT 1 1\nPUT 2 2\nGET 2\nPUT 3 3\nGET 1\nPUT 4 4\nGET 3\nGET 2\nGET 4',
                output: '2 1 3 2 4',
            },
            {
                input: '5 15\nPUT 1 1\nPUT 2 2\nPUT 3 3\nPUT 4 4\nPUT 5 5\nGET 1\nGET 2\nGET 3\nGET 4\nGET 5\nPUT 6 6\nGET 1\nGET 2\nGET 3\nGET 6',
                output: '1 2 3 4 5 -1 2 3 6',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Write LRUCache
int main() {
    return 0;
}`,
            python: `# Implement LRUCache
def main():
    pass
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
// Implement LRUCache
public class Main {
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `// Implement LRUCache
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
class LRUCache {
    int capacity;
    list<pair<int, int>> cache;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int cap) : capacity(cap) {}
    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        cache.splice(cache.begin(), cache, m[key]);
        return m[key]->second;
    }
    void put(int key, int value) {
        if (m.find(key) != m.end()) {
            m[key]->second = value;
            cache.splice(cache.begin(), cache, m[key]);
            return;
        }
        if (cache.size() == capacity) {
            auto last = cache.back();
            m.erase(last.first);
            cache.pop_back();
        }
        cache.push_front({key, value});
        m[key] = cache.begin();
    }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int capacity, q;
    if (!(cin >> capacity >> q)) return 0;
    LRUCache cache(capacity);
    vector<int> res;
    for (int i = 0; i < q; i++) {
        string op; cin >> op;
        if (op == "PUT") {
            int k, v; cin >> k >> v;
            cache.put(k, v);
        } else {
            int k; cin >> k;
            res.push_back(cache.get(k));
        }
    }
    for (int i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 < res.size() ? " " : "");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity: self.cache.popitem(last=False)
def main():
    data = sys.stdin.read().split()
    if not data: return
    capacity, q = int(data[0]), int(data[1])
    cache = LRUCache(capacity)
    res = []
    idx = 2
    for _ in range(q):
        op = data[idx]; idx += 1
        if op == "PUT":
            k = int(data[idx]); idx += 1
            v = int(data[idx]); idx += 1
            cache.put(k, v)
        else:
            k = int(data[idx]); idx += 1
            res.append(str(cache.get(k)))
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private int capacity;
        public LRUCache(int capacity) {
            super(capacity, 0.75F, true);
            this.capacity = capacity;
        }
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        public void put(int key, int value) {
            super.put(key, value);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(st.nextToken());
        }
        if (tokens.isEmpty()) return;
        int capacity = Integer.parseInt(tokens.get(0));
        int q = Integer.parseInt(tokens.get(1));
        LRUCache cache = new LRUCache(capacity);
        List<Integer> res = new ArrayList<>();
        int idx = 2;
        for (int i = 0; i < q; i++) {
            String op = tokens.get(idx++);
            if (op.equals("PUT")) {
                int k = Integer.parseInt(tokens.get(idx++));
                int v = Integer.parseInt(tokens.get(idx++));
                cache.put(k, v);
            } else {
                int k = Integer.parseInt(tokens.get(idx++));
                res.add(cache.get(k));
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            sb.append(res.get(i)).append(i + 1 < res.size() ? " " : "");
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read, Write, BufWriter};
use std::collections::HashMap;
struct Node {
    key: i32,
    val: i32,
    prev: Option<usize>,
    next: Option<usize>,
}
struct LRUCache {
    capacity: usize,
    nodes: Vec<Node>,
    map: HashMap<i32, usize>,
    head: Option<usize>,
    tail: Option<usize>,
}
impl LRUCache {
    fn new(capacity: usize) -> Self {
        LRUCache { capacity, nodes: Vec::new(), map: HashMap::new(), head: None, tail: None }
    }
    fn remove(&mut self, idx: usize) {
        let prev = self.nodes[idx].prev;
        let next = self.nodes[idx].next;
        if let Some(p) = prev { self.nodes[p].next = next; }
        else { self.head = next; }
        if let Some(n) = next { self.nodes[n].prev = prev; }
        else { self.tail = prev; }
    }
    fn push_front(&mut self, idx: usize) {
        self.nodes[idx].next = self.head;
        self.nodes[idx].prev = None;
        if let Some(h) = self.head { self.nodes[h].prev = Some(idx); }
        else { self.tail = Some(idx); }
        self.head = Some(idx);
    }
    fn get(&mut self, key: i32) -> i32 {
        if let Some(&idx) = self.map.get(&key) {
            self.remove(idx);
            self.push_front(idx);
            self.nodes[idx].val
        } else { -1 }
    }
    fn put(&mut self, key: i32, value: i32) {
        if let Some(&idx) = self.map.get(&key) {
            self.nodes[idx].val = value;
            self.remove(idx);
            self.push_front(idx);
        } else {
            if self.map.len() >= self.capacity {
                if let Some(t) = self.tail {
                    self.map.remove(&self.nodes[t].key);
                    self.remove(t);
                }
            }
            let idx = self.nodes.len();
            self.nodes.push(Node { key, val: value, prev: None, next: None });
            self.push_front(idx);
            self.map.insert(key, idx);
        }
    }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut tokens = input.split_whitespace();
    let capacity: usize = match tokens.next() {
        Some(t) => t.parse().unwrap(),
        None => return,
    };
    let q: usize = tokens.next().unwrap().parse().unwrap();
    let mut cache = LRUCache::new(capacity);
    let mut res = Vec::new();
    for _ in 0..q {
        let op = tokens.next().unwrap();
        if op == "PUT" {
            let k: i32 = tokens.next().unwrap().parse().unwrap();
            let v: i32 = tokens.next().unwrap().parse().unwrap();
            cache.put(k, v);
        } else {
            let k: i32 = tokens.next().unwrap().parse().unwrap();
            res.push(cache.get(k).to_string());
        }
    }
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());
    writeln!(out, "{}", res.join(" ")).unwrap();
}`,
        },
    },

    // ==================== HARD #4: Serialize and Deserialize List ====================
    {
        title: 'Serialize and Deserialize List',
        description:
            'Design an algorithm to serialize and deserialize a singly linked list where each node contains an additional `random` pointer, which could point to any node in the list or null.\n\nYour serialization should convert the list into a string format, and deserialization should reconstruct the exact same list (with proper next and random pointers).\n\n**Input Format:**\n- First line: integer `n` (number of nodes)\n- Second line: `n` space-separated integers representing node values\n- Third line: `n` space-separated integers representing the 0-indexed indices of nodes pointed to by random pointers (or `-1` if null)\n\n**Output Format:**\n- Two lines:\n  1. Node values of the deserialized list (space-separated)\n  2. Random pointer target indices of the deserialized list (space-separated)',
        difficulty: 'HARD',
        tags: ['linked-list', 'recursion'],
        constraints: '0 <= n <= 1000\\n-10^9 <= Node.val <= 10^9\\n-1 <= random_index < n',
        hints: 'Map nodes to their 0-indexed position. Serialized string can store pairs of (value, random_index). During deserialization, recreate nodes first, then link pointers.',
        editorial:
            '**Approach:**\nDuring serialization, build a mapping of node addresses to 0-indexed values. Represent the list as space-separated `val,random_index` tokens. Deserialization parses these tokens to construct an array of nodes, connects the `next` pointers in sequence, and resolves random pointers using the parsed `random_index` values.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 4 5\n4 0 -1 1 2',
                output: '1 2 3 4 5\n4 0 -1 1 2',
                explanation: 'Original list is successfully serialized, deserialized, and matched.',
            },
            { title: 'Example 2', input: '3\n10 20 30\n-1 -1 -1', output: '10 20 30\n-1 -1 -1' },
        ],
        testcases: [
            { input: '5\n1 2 3 4 5\n4 0 -1 1 2', output: '1 2 3 4 5\n4 0 -1 1 2' },
            { input: '3\n10 20 30\n-1 -1 -1', output: '10 20 30\n-1 -1 -1' },
            { input: '1\n42\n0', output: '42\n0' },
            { input: '2\n1 2\n1 0', output: '1 2\n1 0' },
            { input: '5\n10 20 30 40 50\n-1 0 1 2 3', output: '10 20 30 40 50\n-1 0 1 2 3' },
            { input: '4\n1 1 1 1\n3 2 1 0', output: '1 1 1 1\n3 2 1 0' },
            { input: '6\n5 1 9 2 8 3\n1 2 3 4 5 -1', output: '5 1 9 2 8 3\n1 2 3 4 5 -1' },
            { input: '3\n-1 -2 -3\n2 1 0', output: '-1 -2 -3\n2 1 0' },
            { input: '5\n2 4 6 8 10\n0 0 0 0 0', output: '2 4 6 8 10\n0 0 0 0 0' },
            {
                input: '8\n1 2 3 4 5 6 7 8\n7 6 5 4 3 2 1 0',
                output: '1 2 3 4 5 6 7 8\n7 6 5 4 3 2 1 0',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode* random;
    ListNode(int x) : val(x), next(nullptr), random(nullptr) {}
};
// Implement serialize and deserialize
int main() {
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
        self.random = None
# Implement serialize and deserialize
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode random;
        ListNode(int val) { this.val = val; }
    }
    // Implement serialize and deserialize
}`,
            rust: `// Implement Node structure and serialization
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode* random;
    ListNode(int x) : val(x), next(nullptr), random(nullptr) {}
};
string serialize(ListNode* head) {
    if (!head) return "";
    vector<ListNode*> nodes;
    ListNode* curr = head;
    while (curr) { nodes.push_back(curr); curr = curr->next; }
    unordered_map<ListNode*, int> m;
    for (int i = 0; i < nodes.size(); i++) m[nodes[i]] = i;
    string res = "";
    for (int i = 0; i < nodes.size(); i++) {
        int r_idx = (nodes[i]->random) ? m[nodes[i]->random] : -1;
        res += to_string(nodes[i]->val) + "," + to_string(r_idx) + " ";
    }
    return res;
}
ListNode* deserialize(string data) {
    if (data.empty()) return nullptr;
    stringstream ss(data);
    string token;
    vector<pair<int, int>> parsed;
    while (ss >> token) {
        int comma = token.find(',');
        int val = stoi(token.substr(0, comma));
        int r_idx = stoi(token.substr(comma + 1));
        parsed.push_back({val, r_idx});
    }
    int n = parsed.size();
    if (n == 0) return nullptr;
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) nodes[i] = new ListNode(parsed[i].first);
    for (int i = 0; i < n; i++) {
        if (i + 1 < n) nodes[i]->next = nodes[i + 1];
        int r_idx = parsed[i].second;
        if (r_idx != -1) nodes[i]->random = nodes[r_idx];
    }
    return nodes[0];
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    if (n == 0) { cout << "\n\n"; return 0; }
    vector<int> vals(n), rands(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    for (int i = 0; i < n; i++) cin >> rands[i];
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) nodes[i] = new ListNode(vals[i]);
    for (int i = 0; i < n - 1; i++) nodes[i]->next = nodes[i + 1];
    for (int i = 0; i < n; i++) {
        if (rands[i] != -1) nodes[i]->random = nodes[rands[i]];
    }
    string s = serialize(nodes[0]);
    ListNode* d = deserialize(s);
    vector<ListNode*> out;
    ListNode* curr = d;
    while (curr) { out.push_back(curr); curr = curr->next; }
    unordered_map<ListNode*, int> m;
    for (int i = 0; i < out.size(); i++) m[out[i]] = i;
    for (int i = 0; i < out.size(); i++) cout << out[i]->val << (i + 1 < out.size() ? " " : "");
    cout << "\n";
    for (int i = 0; i < out.size(); i++) {
        int r_idx = out[i]->random ? m[out[i]->random] : -1;
        cout << r_idx << (i + 1 < out.size() ? " " : "");
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None
        self.random = None
def serialize(head):
    if not head: return ""
    nodes = []
    curr = head
    while curr:
        nodes.append(curr)
        curr = curr.next
    m = {node: i for i, node in enumerate(nodes)}
    tokens = []
    for node in nodes:
        r_idx = m[node.random] if node.random else -1
        tokens.append(f"{node.val},{r_idx}")
    return " ".join(tokens)
def deserialize(data):
    if not data: return None
    tokens = data.split()
    parsed = []
    for token in tokens:
        val_str, r_str = token.split(',')
        parsed.append((int(val_str), int(r_str)))
    nodes = [ListNode(x[0]) for x in parsed]
    n = len(nodes)
    for i in range(n):
        if i + 1 < n: nodes[i].next = nodes[i+1]
        r_idx = parsed[i][1]
        if r_idx != -1: nodes[i].random = nodes[r_idx]
    return nodes[0]
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    if n == 0:
        print()
        print()
        return
    vals = [int(x) for x in data[1:1+n]]
    rands = [int(x) for x in data[1+n:1+2*n]]
    nodes = [ListNode(v) for v in vals]
    for i in range(n - 1): nodes[i].next = nodes[i+1]
    for i in range(n):
        if rands[i] != -1: nodes[i].random = nodes[rands[i]]
    s = serialize(nodes[0])
    d = deserialize(s)
    out = []
    curr = d
    while curr:
        out.append(curr)
        curr = curr.next
    m = {node: i for i, node in enumerate(out)}
    print(" ".join(str(x.val) for x in out))
    print(" ".join(str(m[x.random] if x.random else -1) for x in out))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode random;
        ListNode(int val) { this.val = val; }
    }
    static String serialize(ListNode head) {
        if (head == null) return "";
        List<ListNode> nodes = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) { nodes.add(curr); curr = curr.next; }
        Map<ListNode, Integer> map = new HashMap<>();
        for (int i = 0; i < nodes.size(); i++) map.put(nodes.get(i), i);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nodes.size(); i++) {
            ListNode node = nodes.get(i);
            int r = node.random != null ? map.get(node.random) : -1;
            sb.append(node.val).append(",").append(r).append(" ");
        }
        return sb.toString().trim();
    }
    static ListNode deserialize(String data) {
        if (data == null || data.trim().isEmpty()) return null;
        String[] tokens = data.trim().split("\\\s+");
        int n = tokens.length;
        ListNode[] nodes = new ListNode[n];
        int[] rands = new int[n];
        for (int i = 0; i < n; i++) {
            String[] parts = tokens[i].split(",");
            nodes[i] = new ListNode(Integer.parseInt(parts[0]));
            rands[i] = Integer.parseInt(parts[1]);
        }
        for (int i = 0; i < n; i++) {
            if (i + 1 < n) nodes[i].next = nodes[i + 1];
            if (rands[i] != -1) nodes[i].random = nodes[rands[i]];
        }
        return nodes[0];
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        if (n == 0) { System.out.println(); System.out.println(); return; }
        ListNode[] nodes = new ListNode[n];
        for (int i = 0; i < n; i++) nodes[i] = new ListNode(tokens.get(1 + i));
        for (int i = 0; i < n - 1; i++) nodes[i].next = nodes[i + 1];
        for (int i = 0; i < n; i++) {
            int r = tokens.get(1 + n + i);
            if (r != -1) nodes[i].random = nodes[r];
        }
        String s = serialize(nodes[0]);
        ListNode d = deserialize(s);
        List<ListNode> out = new ArrayList<>();
        ListNode curr = d;
        while (curr != null) { out.add(curr); curr = curr.next; }
        Map<ListNode, Integer> map = new HashMap<>();
        for (int i = 0; i < out.size(); i++) map.put(out.get(i), i);
        StringBuilder vSb = new StringBuilder();
        StringBuilder rSb = new StringBuilder();
        for (int i = 0; i < out.size(); i++) {
            ListNode node = out.get(i);
            vSb.append(node.val).append(i + 1 < out.size() ? " " : "");
            int r = node.random != null ? map.get(node.random) : -1;
            rSb.append(r).append(i + 1 < out.size() ? " " : "");
        }
        System.out.println(vSb.toString());
        System.out.println(rSb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct Node {
    val: i32,
    next: Option<usize>,
    random: Option<usize>,
}
fn serialize(nodes: &[Node], head: Option<usize>) -> String {
    let mut res = Vec::new();
    let mut curr = head;
    while let Some(idx) = curr {
        let r = match nodes[idx].random {
            Some(x) => x as i32,
            None => -1,
        };
        res.push(format!("{},{}", nodes[idx].val, r));
        curr = nodes[idx].next;
    }
    res.join(" ")
}
fn deserialize(data: &str) -> (Vec<Node>, Option<usize>) {
    if data.is_empty() { return (Vec::new(), None); }
    let tokens: Vec<&str> = data.split_whitespace().collect();
    let mut nodes = Vec::new();
    let mut parsed = Vec::new();
    for token in tokens {
        let parts: Vec<&str> = token.split(',').collect();
        let val: i32 = parts[0].parse().unwrap();
        let r: i32 = parts[1].parse().unwrap();
        parsed.push((val, r));
    }
    let n = parsed.len();
    for i in 0..n {
        nodes.push(Node {
            val: parsed[i].0,
            next: if i + 1 < n { Some(i + 1) } else { None },
            random: if parsed[i].1 != -1 { Some(parsed[i].1 as usize) } else { None },
        });
    }
    (nodes, if n > 0 { Some(0) } else { None })
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!("\n"); return; }
    let mut nodes = Vec::new();
    for i in 0..n {
        let val: i32 = tokens[1 + i].parse().unwrap();
        nodes.push(Node { val, next: if i + 1 < n { Some(i + 1) } else { None }, random: None });
    }
    for i in 0..n {
        let r: i32 = tokens[1 + n + i].parse().unwrap();
        if r != -1 { nodes[i].random = Some(r as usize); }
    }
    let s = serialize(&nodes, Some(0));
    let (d_nodes, head) = deserialize(&s);
    let mut out_vals = Vec::new();
    let mut out_rands = Vec::new();
    let mut curr = head;
    while let Some(idx) = curr {
        out_vals.push(d_nodes[idx].val.to_string());
        let r = match d_nodes[idx].random {
            Some(x) => x as i32,
            None => -1,
        };
        out_rands.push(r.to_string());
        curr = d_nodes[idx].next;
    }
    println!("{}", out_vals.join(" "));
    println!("{}", out_rands.join(" "));
}`,
        },
    },

    // ==================== HARD #5: Flatten Multi-level Doubly Linked List ====================
    {
        title: 'Flatten Multi-level Doubly Linked List',
        description:
            'Given a doubly linked list, where each node also has a `child` pointer. This child pointer may point to a separate doubly linked list, which also has its own children, and so on. Flatten the list so that all the nodes appear in a single-level, doubly linked list.\n\nFlatten the list by visiting children first recursively (depth-first order), setting the `next` pointer of the current node to the child, and preserving the rest of the list after the child.\n\n**Input Format:**\n- First line: two integers `n` (number of nodes in total) and `head_id` (ID of the head node)\n- Next `n` lines: each line contains five integers describing a node: `id val next_id prev_id child_id`. Use `-1` to represent null pointer targets.\n\n**Output Format:**\n- A single line of space-separated integers representing the flattened list values',
        difficulty: 'HARD',
        tags: ['linked-list', 'recursion'],
        constraints: '1 <= n <= 1000\\n-10^9 <= Node.val <= 10^9',
        hints: 'Perform a depth-first traversal of the list. When a child is found, recursively flatten it, insert it between current and next, and connect tail of flattened child to next.',
        editorial:
            "**Approach:**\nTraverse the list. When a node with a child is encountered, recursively flatten the child list, returning the tail node of the flattened child. Connect the current node to the child's head, connect the child's tail to the current node's next node, and clear the child pointer. Continue traversal from the next node.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(depth of levels) for recursion stack.",
        examples: [
            {
                title: 'Example 1',
                input: '6 1\n1 1 2 -1 -1\n2 2 3 1 5\n3 3 4 2 -1\n4 4 -1 3 -1\n5 5 6 -1 -1\n6 6 -1 5 -1',
                output: '1 2 5 6 3 4',
                explanation: 'Child list of 2 is 5<->6. Flattened: 1<->2<->5<->6<->3<->4.',
            },
            {
                title: 'Example 2',
                input: '3 1\n1 10 -1 -1 2\n2 20 -1 -1 3\n3 30 -1 -1 -1',
                output: '10 20 30',
            },
        ],
        testcases: [
            {
                input: '6 1\n1 1 2 -1 -1\n2 2 3 1 5\n3 3 4 2 -1\n4 4 -1 3 -1\n5 5 6 -1 -1\n6 6 -1 5 -1',
                output: '1 2 5 6 3 4',
            },
            { input: '3 1\n1 10 -1 -1 2\n2 20 -1 -1 3\n3 30 -1 -1 -1', output: '10 20 30' },
            { input: '1 1\n1 42 -1 -1 -1', output: '42' },
            { input: '4 1\n1 1 2 -1 3\n2 2 -1 1 -1\n3 3 4 -1 -1\n4 4 -1 3 -1', output: '1 3 4 2' },
            {
                input: '5 1\n1 1 2 -1 -1\n2 2 3 1 4\n3 3 -1 2 -1\n4 4 5 -1 -1\n5 5 -1 4 -1',
                output: '1 2 4 5 3',
            },
            {
                input: '7 1\n1 1 2 -1 -1\n2 2 3 1 4\n3 3 -1 2 6\n4 4 5 -1 -1\n5 5 -1 4 -1\n6 6 7 -1 -1\n7 7 -1 6 -1',
                output: '1 2 4 5 3 6 7',
            },
            { input: '2 1\n1 10 -1 -1 2\n2 20 -1 1 -1', output: '10 20' },
            { input: '3 1\n1 1 2 -1 -1\n2 2 -1 1 3\n3 3 -1 -1 -1', output: '1 2 3' },
            {
                input: '5 1\n1 1 2 -1 -1\n2 2 -1 1 3\n3 3 -1 2 4\n4 4 -1 3 5\n5 5 -1 4 -1',
                output: '1 2 3 4 5',
            },
            {
                input: '8 1\n1 1 2 -1 -1\n2 2 3 1 4\n3 3 -1 2 -1\n4 4 5 -1 -1\n5 5 -1 4 6\n6 6 7 -1 -1\n7 7 8 -1 -1\n8 8 -1 7 -1',
                output: '1 2 4 5 6 7 8 3',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct Node {
    int id;
    int val;
    Node* next;
    Node* prev;
    Node* child;
    Node(int i, int v) : id(i), val(v), next(nullptr), prev(nullptr), child(nullptr) {}
};
// Solve
int main() {
    return 0;
}`,
            python: `class Node:
    def __init__(self, id_val, val):
        self.id = id_val
        self.val = val
        self.next = None
        self.prev = None
        self.child = None
# Solve
`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Node {
        int id;
        int val;
        Node next;
        Node prev;
        Node child;
        Node(int id, int val) { this.id = id; this.val = val; }
    }
    public static void main(String[] args) throws Exception {
    }
}`,
            rust: `// Write implementation mapping nodes
fn main() {
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct Node {
    int id;
    int val;
    Node* next;
    Node* prev;
    Node* child;
    Node(int i, int v) : id(i), val(v), next(nullptr), prev(nullptr), child(nullptr) {}
};
Node* flattenRec(Node* head) {
    Node* curr = head;
    Node* tail = head;
    while (curr) {
        Node* nextNode = curr->next;
        if (curr->child) {
            Node* childHead = curr->child;
            Node* childTail = flattenRec(childHead);
            curr->next = childHead;
            childHead->prev = curr;
            if (nextNode) {
                childTail->next = nextNode;
                nextNode->prev = childTail;
            }
            curr->child = nullptr;
            tail = childTail;
        } else {
            tail = curr;
        }
        curr = nextNode;
    }
    return tail;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, head_id;
    if (!(cin >> n >> head_id)) return 0;
    unordered_map<int, Node*> m;
    vector<vector<int>> rels;
    for (int i = 0; i < n; i++) {
        int id, val, next_id, prev_id, child_id;
        cin >> id >> val >> next_id >> prev_id >> child_id;
        m[id] = new Node(id, val);
        rels.push_back({id, next_id, prev_id, child_id});
    }
    for (auto& r : rels) {
        int id = r[0], next_id = r[1], prev_id = r[2], child_id = r[3];
        if (next_id != -1) m[id]->next = m[next_id];
        if (prev_id != -1) m[id]->prev = m[prev_id];
        if (child_id != -1) m[id]->child = m[child_id];
    }
    Node* head = m[head_id];
    flattenRec(head);
    Node* curr = head;
    while (curr) {
        cout << curr->val << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class Node:
    def __init__(self, id_val, val):
        self.id = id_val
        self.val = val
        self.next = None
        self.prev = None
        self.child = None
def flatten_rec(head):
    curr = head
    tail = head
    while curr:
        next_node = curr.next
        if curr.child:
            child_head = curr.child
            child_tail = flatten_rec(child_head)
            curr.next = child_head
            child_head.prev = curr
            if next_node:
                child_tail.next = next_node
                next_node.prev = child_tail
            curr.child = None
            tail = child_tail
        else:
            tail = curr
        curr = next_node
    return tail
def main():
    data = sys.stdin.read().split()
    if not data: return
    n, head_id = int(data[0]), int(data[1])
    m = {}
    rels = []
    idx = 2
    for _ in range(n):
        id_val = int(data[idx])
        val = int(data[idx+1])
        next_id = int(data[idx+2])
        prev_id = int(data[idx+3])
        child_id = int(data[idx+4])
        idx += 5
        m[id_val] = Node(id_val, val)
        rels.append((id_val, next_id, prev_id, child_id))
    for id_val, next_id, prev_id, child_id in rels:
        if next_id != -1: m[id_val].next = m[next_id]
        if prev_id != -1: m[id_val].prev = m[prev_id]
        if child_id != -1: m[id_val].child = m[child_id]
    head = m[head_id]
    flatten_rec(head)
    curr = head
    res = []
    while curr:
        res.append(str(curr.val))
        curr = curr.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Node {
        int id;
        int val;
        Node next;
        Node prev;
        Node child;
        Node(int id, int val) { this.id = id; this.val = val; }
    }
    static Node flattenRec(Node head) {
        Node curr = head;
        Node tail = head;
        while (curr != null) {
            Node nextNode = curr.next;
            if (curr.child != null) {
                Node childHead = curr.child;
                Node childTail = flattenRec(childHead);
                curr.next = childHead;
                childHead.prev = curr;
                if (nextNode != null) {
                    childTail.next = nextNode;
                    nextNode.prev = childTail;
                }
                curr.child = null;
                tail = childTail;
            } else {
                tail = curr;
            }
            curr = nextNode;
        }
        return tail;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int headId = tokens.get(1);
        Map<Integer, Node> map = new HashMap<>();
        List<int[]> rels = new ArrayList<>();
        int idx = 2;
        for (int i = 0; i < n; i++) {
            int id = tokens.get(idx);
            int val = tokens.get(idx + 1);
            int nextId = tokens.get(idx + 2);
            int prevId = tokens.get(idx + 3);
            int childId = tokens.get(idx + 4);
            idx += 5;
            map.put(id, new Node(id, val));
            rels.add(new int[]{id, nextId, prevId, childId});
        }
        for (int[] r : rels) {
            int id = r[0], nextId = r[1], prevId = r[2], childId = r[3];
            Node node = map.get(id);
            if (nextId != -1) node.next = map.get(nextId);
            if (prevId != -1) node.prev = map.get(prevId);
            if (childId != -1) node.child = map.get(childId);
        }
        Node head = map.get(headId);
        flattenRec(head);
        Node curr = head;
        StringBuilder sb = new StringBuilder();
        while (curr != null) {
            sb.append(curr.val).append(curr.next != null ? " " : "");
            curr = curr.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
use std::collections::HashMap;
struct Node {
    val: i32,
    next: Option<usize>,
    prev: Option<usize>,
    child: Option<usize>,
}
fn flatten_rec(head_id: usize, nodes: &mut HashMap<usize, Node>) -> usize {
    let mut curr = Some(head_id);
    let mut tail_id = head_id;
    while let Some(curr_id) = curr {
        let next_id = nodes[&curr_id].next;
        let child_id = nodes[&curr_id].child;
        if let Some(c_id) = child_id {
            let child_tail_id = flatten_rec(c_id, nodes);
            nodes.get_mut(&curr_id).unwrap().next = Some(c_id);
            nodes.get_mut(&c_id).unwrap().prev = Some(curr_id);
            if let Some(n_id) = next_id {
                nodes.get_mut(&child_tail_id).unwrap().next = Some(n_id);
                nodes.get_mut(&n_id).unwrap().prev = Some(child_tail_id);
            }
            nodes.get_mut(&curr_id).unwrap().child = None;
            tail_id = child_tail_id;
        } else {
            tail_id = curr_id;
        }
        curr = next_id;
    }
    tail_id
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let head_id: usize = tokens[1].parse().unwrap();
    let mut nodes = HashMap::new();
    let mut idx = 2;
    for _ in 0..n {
        let id: usize = tokens[idx].parse().unwrap();
        let val: i32 = tokens[idx+1].parse().unwrap();
        let next_id: i32 = tokens[idx+2].parse().unwrap();
        let prev_id: i32 = tokens[idx+3].parse().unwrap();
        let child_id: i32 = tokens[idx+4].parse().unwrap();
        idx += 5;
        nodes.insert(id, Node {
            val,
            next: if next_id != -1 { Some(next_id as usize) } else { None },
            prev: if prev_id != -1 { Some(prev_id as usize) } else { None },
            child: if child_id != -1 { Some(child_id as usize) } else { None },
        });
    }
    flatten_rec(head_id, &mut nodes);
    let mut curr = Some(head_id);
    let mut res = Vec::new();
    while let Some(curr_id) = curr {
        res.push(nodes[&curr_id].val.to_string());
        curr = nodes[&curr_id].next;
    }
    println!("{}", res.join(" "));
}`,
        },
    },
    // ==================== EASY #5: Palindrome Linked List ====================
    {
        title: 'Palindrome Linked List',
        description:
            'Given the head of a singly linked list, return `1` if it is a palindrome or `0` otherwise.\n\n**Input Format:**\n- First line: integer n (number of elements)\n- Second line: n space-separated integers\n\n**Output Format:**\n- `1` if the list is a palindrome, `0` otherwise',
        difficulty: 'EASY',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 10^5\\n-10^9 <= Node.val <= 10^9',
        hints: 'Find the middle of the linked list, reverse the second half, and compare it with the first half.',
        editorial:
            '**Approach:**\n1. Find the middle of the linked list using a slow and fast pointer.\n2. Reverse the second half of the linked list in-place.\n3. Compare the node values of the first half and the reversed second half.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n1 2 3 2 1',
                output: '1',
                explanation: '1->2->3->2->1 is a palindrome.',
            },
            {
                title: 'Example 2',
                input: '4\n1 2 3 4',
                output: '0',
                explanation: '1->2->3->4 is not a palindrome.',
            },
        ],
        testcases: [
            { input: '5\n1 2 3 2 1', output: '1' },
            { input: '4\n1 2 3 4', output: '0' },
            { input: '1\n42', output: '1' },
            { input: '0\n', output: '1' },
            { input: '2\n5 5', output: '1' },
            { input: '2\n5 6', output: '0' },
            { input: '6\n1 2 3 3 2 1', output: '1' },
            { input: '6\n1 2 3 4 2 1', output: '0' },
            { input: '3\n1 2 1', output: '1' },
            { input: '10\n1 1 1 1 1 1 1 1 1 1', output: '1' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

fn main() {
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) {
        cout << 1 << "\n";
        return 0;
    }
    if (n == 0) {
        cout << 1 << "\n";
        return 0;
    }
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int val; cin >> val;
        ListNode* node = new ListNode(val);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* prev = nullptr, *curr = slow;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    ListNode* p1 = head, *p2 = prev;
    bool is_pal = true;
    while (p2) {
        if (p1->val != p2->val) {
            is_pal = false;
            break;
        }
        p1 = p1->next;
        p2 = p2->next;
    }
    cout << (is_pal ? 1 : 0) << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data:
        print(1)
        return
    n = int(data[0])
    if n == 0:
        print(1)
        return
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    p1, p2 = head, prev
    is_pal = True
    while p2:
        if p1.val != p2.val:
            is_pal = False
            break
        p1 = p1.next
        p2 = p2.next
    print(1 if is_pal else 0)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) { System.out.println(1); return; }
        int n = tokens.get(0);
        if (n == 0) { System.out.println(1); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        ListNode p1 = head, p2 = prev;
        boolean isPal = true;
        while (p2 != null) {
            if (p1.val != p2.val) {
                isPal = false;
                break;
            }
            p1 = p1.next;
            p2 = p2.next;
        }
        System.out.println(isPal ? 1 : 0);
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { println!("1"); return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!("1"); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut vals = Vec::new();
    let mut curr = &head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = &node.next;
    }
    let mut is_pal = true;
    let len = vals.len();
    for i in 0..len/2 {
        if vals[i] != vals[len - 1 - i] {
            is_pal = false;
            break;
        }
    }
    println!("{}", if is_pal { 1 } else { 0 });
}`
        }
    },
    // ==================== EASY #6: Remove Linked List Elements ====================
    {
        title: 'Remove Linked List Elements',
        description:
            'Given the head of a linked list and an integer `val`, remove all the nodes of the linked list that have `Node.val == val`.\n\n**Input Format:**\n- First line: two integers `n` (number of elements) and `val` (value to remove)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the remaining nodes in the list',
        difficulty: 'EASY',
        tags: ['linked-list'],
        constraints: '0 <= n <= 10^5\\n-10^9 <= Node.val, val <= 10^9',
        hints: 'Use a dummy node pointing to the head to handle deletions at the start of the list easily.',
        editorial:
            '**Approach:**\nCreate a dummy node `dummy` such that `dummy.next = head`. Then, iterate through the list with a `curr` pointer starting at `dummy`. If `curr.next.val == val`, remove that node by updating `curr.next = curr.next.next`. Otherwise, move `curr` to `curr.next`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '7 6\n1 2 6 3 4 5 6',
                output: '1 2 3 4 5',
                explanation: 'All occurrences of 6 are removed from the list.',
            },
            {
                title: 'Example 2',
                input: '0 5\n\n',
                output: '',
                explanation: 'Empty list remains empty.',
            },
        ],
        testcases: [
            { input: '7 6\n1 2 6 3 4 5 6', output: '1 2 3 4 5' },
            { input: '0 5\n\n', output: '' },
            { input: '4 7\n7 7 7 7', output: '' },
            { input: '5 1\n2 2 2 2 2', output: '2 2 2 2 2' },
            { input: '1 3\n3', output: '' },
            { input: '1 4\n3', output: '3' },
            { input: '6 2\n2 1 2 3 2 4', output: '1 3 4' },
            { input: '3 1\n1 2 3', output: '2 3' },
            { input: '3 3\n1 2 3', output: '1 2' },
            { input: '8 -5\n-5 1 2 -5 -5 3 4 -5', output: '1 2 3 4' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

fn main() {
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, val;
    if (!(cin >> n >> val)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode dummy(0);
    dummy.next = head;
    ListNode* curr = &dummy;
    while (curr->next) {
        if (curr->next->val == val) {
            ListNode* temp = curr->next;
            curr->next = curr->next->next;
            delete temp;
        } else {
            curr = curr->next;
        }
    }
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    val = int(data[1])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[2:2+n]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    dummy = ListNode(0)
    dummy.next = head
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int val = tokens.get(1);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(2 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode curr = dummy;
        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let val: i32 = tokens[1].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let x: i32 = tokens[2 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(x));
        node.next = head;
        head = Some(node);
    }
    let mut res = Vec::new();
    let mut curr = head;
    while let Some(node) = curr {
        if node.val != val {
            res.push(node.val.to_string());
        }
        curr = node.next;
    }
    println!("{}", res.join(" "));
}`
        }
    },
    // ==================== MEDIUM #8: Partition List ====================
    {
        title: 'Partition List',
        description:
            'Given the head of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`.\n\nYou must preserve the original relative order of the nodes in each of the two partitions.\n\n**Input Format:**\n- First line: two integers `n` (number of elements) and `x` (partition value)\n- Second line: `n` space-separated integers\n\n**Output Format:**\n- Space-separated integers representing the partitioned list',
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 10^5\\n-10^9 <= Node.val, x <= 10^9',
        hints: 'Maintain two separate chains: one for elements less than x, and another for elements greater than or equal to x. Connect them at the end.',
        editorial:
            '**Approach:**\nCreate two dummy nodes `before_head` and `after_head`. Traverse the original list, appending nodes less than `x` to the `before` list, and nodes greater than or equal to `x` to the `after` list. At the end, connect the tail of the `before` list to the head of the `after` list, and terminate the tail of the `after` list to avoid cycles.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '6 3\n1 4 3 2 5 2',
                output: '1 2 2 4 3 5',
                explanation: 'Elements less than 3 are 1, 2, 2. Elements >= 3 are 4, 3, 5. They are joined in order.',
            },
            {
                title: 'Example 2',
                input: '2 2\n2 1',
                output: '1 2',
            },
        ],
        testcases: [
            { input: '6 3\n1 4 3 2 5 2', output: '1 2 2 4 3 5' },
            { input: '2 2\n2 1', output: '1 2' },
            { input: '0 0\n\n', output: '' },
            { input: '5 5\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '5 0\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '5 6\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '4 3\n5 4 3 2', output: '2 5 4 3' },
            { input: '6 4\n1 4 2 4 3 4', output: '1 2 3 4 4 4' },
            { input: '3 3\n3 1 2', output: '1 2 3' },
            { input: '8 0\n-3 2 1 -1 0 -2 5 -5', output: '-3 -1 -2 -5 2 1 0 5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

fn main() {
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, x;
    if (!(cin >> n >> x)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int val; cin >> val;
        ListNode* node = new ListNode(val);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode before_head(0), after_head(0);
    ListNode* before = &before_head, *after = &after_head;
    ListNode* curr = head;
    while (curr) {
        if (curr->val < x) {
            before->next = curr;
            before = before->next;
        } else {
            after->next = curr;
            after = after->next;
        }
        curr = curr->next;
    }
    after->next = nullptr;
    before->next = after_head.next;
    ListNode* temp = before_head.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    x = int(data[1])
    if n == 0:
        print()
        return
    vals = [int(v) for v in data[2:2+n]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    before_head = ListNode(0)
    after_head = ListNode(0)
    before = before_head
    after = after_head
    curr = head
    while curr:
        if curr.val < x:
            before.next = curr
            before = before.next
        else:
            after.next = curr
            after = after.next
        curr = curr.next
    after.next = None
    before.next = after_head.next
    res = []
    temp = before_head.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int x = tokens.get(1);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(2 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode beforeHead = new ListNode(0);
        ListNode afterHead = new ListNode(0);
        ListNode before = beforeHead;
        ListNode after = afterHead;
        ListNode curr = head;
        while (curr != null) {
            if (curr.val < x) {
                before.next = curr;
                before = before.next;
            } else {
                after.next = curr;
                after = after.next;
            }
            curr = curr.next;
        }
        after.next = null;
        before.next = afterHead.next;
        ListNode temp = beforeHead.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let x: i32 = tokens[1].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[2 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut before = Vec::new();
    let mut after = Vec::new();
    let mut curr = head;
    while let Some(node) = curr {
        if node.val < x {
            before.push(node.val.to_string());
        } else {
            after.push(node.val.to_string());
        }
        curr = node.next;
    }
    before.extend(after);
    println!("{}", before.join(" "));
}`
        }
    },
    // ==================== MEDIUM #9: Remove Duplicates from Sorted List II ====================
    {
        title: 'Remove Duplicates from Sorted List II',
        description:
            'Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.\n\nReturn the linked list sorted as well.\n\n**Input Format:**\n- First line: integer n (number of elements)\n- Second line: n space-separated integers in ascending order\n\n**Output Format:**\n- Space-separated integers representing the unique elements list',
        difficulty: 'MEDIUM',
        tags: ['linked-list', 'two-pointers'],
        constraints: '0 <= n <= 10^5\\n-10^9 <= Node.val <= 10^9\\nThe list is guaranteed to be sorted in ascending order.',
        hints: 'Use a dummy node pointing to the head. Check if `curr.next` and `curr.next.next` have the same value, and skip all nodes with that value.',
        editorial:
            '**Approach:**\nSince the input is sorted, duplicate nodes are adjacent. Use a `dummy` node pointing to `head` to handle cases where the head itself has duplicates. Maintain a pointer `prev` (initially `dummy`). At each step, if `prev.next` and `prev.next.next` have the same value, loop to skip all nodes with this value, and link `prev.next` to the node after the duplicate group. Otherwise, move `prev` forward.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)',
        examples: [
            {
                title: 'Example 1',
                input: '7\n1 2 3 3 4 4 5',
                output: '1 2 5',
                explanation: '3 and 4 appear multiple times, so they are completely removed. 1, 2, and 5 remain.',
            },
            {
                title: 'Example 2',
                input: '5\n1 1 1 2 3',
                output: '2 3',
                explanation: '1 has duplicates and is completely removed.',
            },
        ],
        testcases: [
            { input: '7\n1 2 3 3 4 4 5', output: '1 2 5' },
            { input: '5\n1 1 1 2 3', output: '2 3' },
            { input: '0\n', output: '' },
            { input: '3\n1 1 1', output: '' },
            { input: '4\n1 2 3 4', output: '1 2 3 4' },
            { input: '6\n1 1 2 2 3 3', output: '' },
            { input: '8\n-5 -5 -3 -2 -2 0 1 1', output: '-3 0' },
            { input: '2\n2 2', output: '' },
            { input: '3\n1 2 2', output: '1' },
            { input: '10\n1 2 3 3 3 4 5 5 6 7', output: '1 2 4 6 7' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

fn main() {
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    ListNode* head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        ListNode* node = new ListNode(x);
        if (!head) { head = node; tail = node; }
        else { tail->next = node; tail = node; }
    }
    ListNode dummy(0);
    dummy.next = head;
    ListNode* prev = &dummy;
    while (prev->next) {
        ListNode* curr = prev->next;
        bool duplicate = false;
        while (curr->next && curr->val == curr->next->val) {
            curr = curr->next;
            duplicate = true;
        }
        if (duplicate) {
            prev->next = curr->next;
        } else {
            prev = prev->next;
        }
    }
    ListNode* temp = dummy.next;
    while (temp) {
        cout << temp->val << (temp->next ? " " : "");
        temp = temp->next;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    if n == 0:
        print()
        return
    vals = [int(x) for x in data[1:n+1]]
    head = None
    tail = None
    for v in vals:
        node = ListNode(v)
        if not head:
            head = node; tail = node
        else:
            tail.next = node; tail = node
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    while prev.next:
        curr = prev.next
        duplicate = False
        while curr.next and curr.val == curr.next.val:
            curr = curr.next
            duplicate = True
        if duplicate:
            prev.next = curr.next
        else:
            prev = prev.next
    res = []
    temp = dummy.next
    while temp:
        res.append(str(temp.val))
        temp = temp.next
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        if (n == 0) { System.out.println(); return; }
        ListNode head = null, tail = null;
        for (int i = 0; i < n; i++) {
            ListNode node = new ListNode(tokens.get(1 + i));
            if (head == null) { head = node; tail = node; }
            else { tail.next = node; tail = node; }
        }
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null) {
            ListNode curr = prev.next;
            bool duplicate = false;
            while (curr.next != null && curr.val == curr.next.val) {
                curr = curr.next;
                duplicate = true;
            }
            if (duplicate) {
                prev.next = curr.next;
            } else {
                prev = prev.next;
            }
        }
        ListNode temp = dummy.next;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.val).append(temp.next != null ? " " : "");
            temp = temp.next;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}
impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    if n == 0 { println!(); return; }
    let mut head = None;
    for i in (0..n).rev() {
        let val: i32 = tokens[1 + i].parse().unwrap();
        let mut node = Box::new(ListNode::new(val));
        node.next = head;
        head = Some(node);
    }
    let mut vals = Vec::new();
    let mut curr = head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = node.next;
    }
    let mut res = Vec::new();
    let mut i = 0;
    while i < vals.len() {
        let mut j = i + 1;
        while j < vals.len() && vals[i] == vals[j] {
            j += 1;
        }
        if j == i + 1 {
            res.push(vals[i].to_string());
        }
        i = j;
    }
    println!("{}", res.join(" "));
}`
        }
    },
    // ==================== HARD #6: Flatten Sorted Multi-level Linked List ====================
    {
        title: 'Flatten Sorted Multi-level Linked List',
        description:
            'Given a linked list where every node represents a sub-linked-list and contains two pointers:\n1. `next` pointer to the next list node.\n2. `bottom` pointer to a sub-linked-list where this node is the head.\n\nEach of the sub-linked-lists is in sorted order. Flatten the linked list such that all the nodes appear in a single sorted singly linked list using the `bottom` pointer (with `next` pointers set to null in the output).\n\n**Input Format:**\n- First line: integer `n` (number of sub-linked-lists)\n- Second line: `n` space-separated integers representing the size of each sub-linked-list `m_i`\n- Third line: sum(m_i) space-separated integers, representing the sorted elements of each sub-list sequentially\n\n**Output Format:**\n- Space-separated integers representing the flattened sorted linked list',
        difficulty: 'HARD',
        tags: ['linked-list', 'divide-and-conquer', 'heap'],
        constraints: '1 <= n <= 100\\n1 <= m_i <= 50\\n-10^9 <= Node.val <= 10^9',
        hints: 'Use a merge function to merge two sorted linked lists. Merge all lists sequentially or using a divide-and-conquer approach.',
        editorial:
            '**Approach:**\nThis is a classic variation of merging K sorted lists. We can flatten the list by iteratively merging the first sub-list with the second, then merging the result with the third, and so on. The merging of two sorted sub-lists can be done iteratively using a dummy node, updating the `bottom` pointers instead of `next` pointers.\n\n**Time Complexity:** O(N * log K) or O(N * K) where N is the total number of nodes and K is the number of sub-lists.\n**Space Complexity:** O(1) if merging is done in-place iteratively.',
        examples: [
            {
                title: 'Example 1',
                input: '4\n4 3 2 4\n5 7 8 30 10 20 50 19 22 28 35 40 45',
                output: '5 7 8 10 19 20 22 28 30 35 40 45 50',
                explanation: 'The 4 sorted sub-lists are:\n1st: 5 -> 7 -> 8 -> 30\n2nd: 10 -> 20 -> 50\n3rd: 19 -> 22\n4th: 28 -> 35 -> 40 -> 45\nWhen merged and flattened, we get the sorted sequence: 5 7 8 10 19 20 22 28 30 35 40 45 50.',
            },
            {
                title: 'Example 2',
                input: '2\n2 2\n3 10 1 7',
                output: '1 3 7 10',
                explanation: 'Sub-lists are 3->10 and 1->7. Flattened sorted is 1->3->7->10.',
            },
        ],
        testcases: [
            { input: '4\n4 3 2 4\n5 7 8 30 10 20 50 19 22 28 35 40 45', output: '5 7 8 10 19 20 22 28 30 35 40 45 50' },
            { input: '2\n2 2\n3 10 1 7', output: '1 3 7 10' },
            { input: '1\n5\n1 2 3 4 5', output: '1 2 3 4 5' },
            { input: '3\n1 1 1\n3 2 1', output: '1 2 3' },
            { input: '2\n1 3\n5 1 2 3', output: '1 2 3 5' },
            { input: '5\n2 2 2 2 2\n1 10 2 20 3 30 4 40 5 50', output: '1 2 3 4 5 10 20 30 40 50' },
            { input: '4\n1 2 1 2\n-10 -5 0 -2 -1 2', output: '-10 -5 -2 -1 0 2' },
            { input: '2\n5 5\n1 3 5 7 9 2 4 6 8 10', output: '1 2 3 4 5 6 7 8 9 10' },
            { input: '3\n2 3 2\n100 200 50 150 250 10 120', output: '10 50 100 120 150 200 250' },
            { input: '1\n1\n42', output: '42' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int x) : data(x), next(nullptr), bottom(nullptr) {}
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // Read input and solve
    
    return 0;
}`,
            python: `class Node:
    def __init__(self, data=0):
        self.data = data
        self.next = None
        self.bottom = None

def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

public class Main {
    static class Node {
        int data;
        Node next;
        Node bottom;
        Node(int data) { this.data = data; }
    }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `struct Node {
    data: i32,
    next: Option<Box<Node>>,
    bottom: Option<Box<Node>>,
}

fn main() {
    // Read input and solve
}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int x) : data(x), next(nullptr), bottom(nullptr) {}
};
Node* merge(Node* a, Node* b) {
    Node dummy(0);
    Node* temp = &dummy;
    while (a && b) {
        if (a->data <= b->data) {
            temp->bottom = a;
            a = a->bottom;
        } else {
            temp->bottom = b;
            b = b->bottom;
        }
        temp = temp->bottom;
        temp->next = nullptr;
    }
    if (a) temp->bottom = a;
    else temp->bottom = b;
    return dummy.bottom;
}
Node* flatten(Node* root) {
    if (!root || !root->next) return root;
    Node* curr = root;
    Node* next_list = root->next;
    while (next_list) {
        Node* nxt = next_list->next;
        curr = merge(curr, next_list);
        next_list = nxt;
    }
    return curr;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> m(n);
    for (int i = 0; i < n; i++) cin >> m[i];
    Node* root = nullptr;
    Node* last = nullptr;
    for (int i = 0; i < n; i++) {
        Node* head = nullptr;
        Node* curr = nullptr;
        for (int j = 0; j < m[i]; j++) {
            int val; cin >> val;
            Node* temp = new Node(val);
            if (!head) {
                head = temp;
                curr = temp;
            } else {
                curr->bottom = temp;
                curr = temp;
            }
        }
        if (!root) {
            root = head;
            last = head;
        } else {
            last->next = head;
            last = head;
        }
    }
    Node* flat = flatten(root);
    Node* temp = flat;
    while (temp) {
        cout << temp->data << (temp->bottom ? " " : "");
        temp = temp->bottom;
    }
    cout << "\n";
    return 0;
}`,
            python: `import sys
class Node:
    def __init__(self, data=0):
        self.data = data
        self.next = None
        self.bottom = None
def merge(a, b):
    dummy = Node(0)
    temp = dummy
    while a and b:
        if a.data <= b.data:
            temp.bottom = a
            a = a.bottom
        else:
            temp.bottom = b
            b = b.bottom
        temp = temp.bottom
        temp.next = None
    if a:
        temp.bottom = a
    else:
        temp.bottom = b
    return dummy.bottom
def flatten(root):
    if not root or not root.next:
        return root
    curr = root
    next_list = root.next
    while next_list:
        nxt = next_list.next
        curr = merge(curr, next_list)
        next_list = nxt
    return curr
def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    m = [int(x) for x in data[1:1+n]]
    idx = 1 + n
    root = None
    last = None
    for i in range(n):
        head = None
        curr = None
        for j in range(m[i]):
            val = int(data[idx])
            idx += 1
            temp = Node(val)
            if not head:
                head = temp; curr = temp
            else:
                curr.bottom = temp; curr = temp
        if not root:
            root = head; last = head
        else:
            last.next = head; last = head
    flat = flatten(root)
    res = []
    temp = flat
    while temp:
        res.append(str(temp.data))
        temp = temp.bottom
    print(" ".join(res))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    static class Node {
        int data;
        Node next;
        Node bottom;
        Node(int data) { this.data = data; }
    }
    static Node merge(Node a, Node b) {
        Node dummy = new Node(0);
        Node temp = dummy;
        while (a != null && b != null) {
            if (a.data <= b.data) {
                temp.bottom = a;
                a = a.bottom;
            } else {
                temp.bottom = b;
                b = b.bottom;
            }
            temp = temp.bottom;
            temp.next = null;
        }
        if (a != null) temp.bottom = a;
        else temp.bottom = b;
        return dummy.bottom;
    }
    static Node flatten(Node root) {
        if (root == null || root.next == null) return root;
        Node curr = root;
        Node nextList = root.next;
        while (nextList != null) {
            Node nxt = nextList.next;
            curr = merge(curr, nextList);
            nextList = nxt;
        }
        return curr;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Integer> tokens = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) tokens.add(Integer.parseInt(st.nextToken()));
        }
        if (tokens.isEmpty()) return;
        int n = tokens.get(0);
        int[] m = new int[n];
        for (int i = 0; i < n; i++) {
            m[i] = tokens.get(1 + i);
        }
        int idx = 1 + n;
        Node root = null;
        Node last = null;
        for (int i = 0; i < n; i++) {
            Node head = null;
            Node curr = null;
            for (int j = 0; j < m[i]; j++) {
                int val = tokens.get(idx++);
                Node temp = new Node(val);
                if (head == null) {
                    head = temp;
                    curr = temp;
                } else {
                    curr.bottom = temp;
                    curr = temp;
                }
            }
            if (root == null) {
                root = head;
                last = head;
            } else {
                last.next = head;
                last = head;
            }
        }
        Node flat = flatten(root);
        Node temp = flat;
        StringBuilder sb = new StringBuilder();
        while (temp != null) {
            sb.append(temp.data).append(temp.bottom != null ? " " : "");
            temp = temp.bottom;
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, Read};
use std::collections::BinaryHeap;
use std::cmp::Ordering;
#[derive(Copy, Clone, Eq, PartialEq)]
struct State {
    val: i32,
    list_idx: usize,
    elem_idx: usize,
}
impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other.val.cmp(&self.val)
    }
}
impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    if tokens.is_empty() { return; }
    let n: usize = tokens[0].parse().unwrap();
    let mut m = Vec::new();
    for i in 0..n {
        m.push(tokens[1 + i].parse::<usize>().unwrap());
    }
    let mut lists = Vec::new();
    let mut token_idx = 1 + n;
    for i in 0..n {
        let mut sub = Vec::new();
        for _ in 0..m[i] {
            sub.push(tokens[token_idx].parse::<i32>().unwrap());
            token_idx += 1;
        }
        lists.push(sub);
    }
    let mut heap = BinaryHeap::new();
    for i in 0..n {
        if !lists[i].is_empty() {
            heap.push(State {
                val: lists[i][0],
                list_idx: i,
                elem_idx: 0,
            });
        }
    }
    let mut res = Vec::new();
    while let Some(State { val, list_idx, elem_idx }) = heap.pop() {
        res.push(val.to_string());
        if elem_idx + 1 < lists[list_idx].len() {
            heap.push(State {
                val: lists[list_idx][elem_idx + 1],
                list_idx,
                elem_idx: elem_idx + 1,
            });
        }
    }
    println!("{}", res.join(" "));
}`
        }
    }
]

