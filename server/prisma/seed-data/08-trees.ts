import type { SeedProblem } from './types.js'

export const treesProblems: SeedProblem[] = [
    // ==================== EASY #1: Inorder Traversal ====================
    {
        title: 'Binary Tree Inorder Traversal',
        description:
            "Given the root of a binary tree, return the inorder traversal of its nodes' values.\n\n**Input Format:**\n- A single line containing the level-order BFS traversal of the binary tree (using 'null' for empty nodes).\n\n**Output Format:**\n- A single line of space-separated integers representing the inorder traversal of the tree.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 1000].\n-1000 <= Node.val <= 1000',
        hints: 'Inorder traversal visits nodes in the order: Left, Root, Right. You can implement this recursively or iteratively with a stack.',
        editorial:
            '**Approach: Recursive DFS**\nVisit the left child, record the root value, and then visit the right child.\nTime Complexity: O(N)\nSpace Complexity: O(N) auxiliary space.',
        examples: [
            {
                title: 'Example 1',
                input: '1 null 2 3',
                output: '1 3 2',
                explanation:
                    "1 is root. Its left is null, right is 2. 2's left is 3. Inorder is 1 -> 3 -> 2.",
            },
            { title: 'Example 2', input: '1 2 3 4 5 null 6', output: '4 2 5 1 3 6' },
        ],
        testcases: [
            { input: '1 null 2 3', output: '1 3 2' },
            { input: '1 2 3 4 5 null 6', output: '4 2 5 1 3 6' },
            { input: 'null', output: '' },
            { input: '1', output: '1' },
            { input: '1 2', output: '2 1' },
            { input: '1 null 2', output: '1 2' },
            { input: '1 2 3', output: '2 1 3' },
            { input: '1 2 3 4 5 6 7', output: '4 2 5 1 6 3 7' },
            { input: '10 -20 30', output: '-20 10 30' },
            { input: '5 4 null 3 null 2 null 1', output: '1 2 3 4 5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
// Helper to build tree from BFS line
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print
    }
    return 0;
}`,
            python: `import sys
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    return None
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    # Solve and print
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
void inorder(TreeNode* r, vector<int>& res) {
    if (!r) return;
    inorder(r->left, res);
    res.push_back(r->val);
    inorder(r->right, res);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        vector<int> res; inorder(root, res);
        for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
        cout << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def inorder(r, res):
    if not r: return
    inorder(r.left, res)
    res.append(r.val)
    inorder(r.right, res)
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    res = []
    inorder(root, res)
    print(" ".join(map(str, res)))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static void inorder(TreeNode r, List<Integer> res) {
        if (r == null) return;
        inorder(r.left, res);
        res.add(r.val);
        inorder(r.right, res);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        List<Integer> res = new ArrayList<>();
        inorder(root, res);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn inorder(idx: Option<usize>, nodes: &Vec<TreeNode>, res: &mut Vec<i32>) {
    if let Some(i) = idx {
        inorder(nodes[i].left, nodes, res);
        res.push(nodes[i].val);
        inorder(nodes[i].right, nodes, res);
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let mut res = Vec::new();
        inorder(root, &nodes, &mut res);
        let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
        println!("{}", strs.join(" "));
    }
}`,
        },
    },

    // ==================== EASY #2: Max Depth of Binary Tree ====================
    {
        title: 'Maximum Depth of Binary Tree',
        description:
            "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- An integer representing the maximum depth.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100',
        hints: 'The maximum depth of a tree is 1 + max(depth(left), depth(right)). Check base case for empty root.',
        editorial:
            '**Approach: DFS Recursion**\nRecursively compute depth of left and right subtrees. Maximum depth is the max of the two plus one.\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion stack where H is tree height.',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: '3',
                explanation:
                    "Root 3 (level 1), Children 9 and 20 (level 2), 20's children 15 and 7 (level 3). Max depth is 3.",
            },
            { title: 'Example 2', input: '1 null 2', output: '2' },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: '3' },
            { input: '1 null 2', output: '2' },
            { input: 'null', output: '0' },
            { input: '1', output: '1' },
            { input: '1 2 3 4 null null null 5', output: '4' },
            { input: '1 2 3 4 5 6 7', output: '3' },
            { input: '0', output: '1' },
            { input: '1 2 null 3 null 4 null 5', output: '5' },
            { input: '1 null 2 null 3 null 4', output: '4' },
            { input: '1 2 3', output: '2' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print max depth
    }
    return 0;
}`,
            python: `import sys
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    return None
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    # Solve and print max depth
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print max depth
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print max depth
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int maxDepth(TreeNode* r) {
    if (!r) return 0;
    return 1 + max(maxDepth(r->left), maxDepth(r->right));
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << maxDepth(root) << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def max_depth(r):
    if not r: return 0
    return 1 + max(max_depth(r.left), max_depth(r.right))
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    print(max_depth(root))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int maxDepth(TreeNode r) {
        if (r == null) return 0;
        return 1 + Math.max(maxDepth(r.left), maxDepth(r.right));
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        System.out.println(maxDepth(root));
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn max_depth(idx: Option<usize>, nodes: &Vec<TreeNode>) -> i32 {
    if let Some(i) = idx {
        1 + std::cmp::max(max_depth(nodes[i].left, nodes), max_depth(nodes[i].right, nodes))
    } else {
        0
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        println!("{}", max_depth(root, &nodes));
    }
}`,
        },
    },

    // ==================== EASY #3: Same Tree ====================
    {
        title: 'Same Tree',
        description:
            "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\n\n**Input Format:**\n- First line: BFS representation of the first tree p.\n- Second line: BFS representation of the second tree q.\n\n**Output Format:**\n- 'true' or 'false' (lowercase string).",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in both trees is in the range [0, 1000].\n-10^4 <= Node.val <= 10^4',
        hints: 'Use recursion. If both nodes are null, they are identical. If only one is null, or values differ, they are not.',
        editorial:
            '**Approach: Recursion**\nTwo nodes p and q are identical if p.val == q.val and isSame(p.left, q.left) and isSame(p.right, q.right).\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion space.',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3\n1 2 3',
                output: 'true',
                explanation: 'Both trees are structurally identical with identical node values.',
            },
            { title: 'Example 2', input: '1 2\n1 null 2', output: 'false' },
        ],
        testcases: [
            { input: '1 2 3\n1 2 3', output: 'true' },
            { input: '1 2\n1 null 2', output: 'false' },
            { input: 'null\nnull', output: 'true' },
            { input: '1\n1', output: 'true' },
            { input: '1 2 3\n1 3 2', output: 'false' },
            { input: '1 null 2\n1 null 2', output: 'true' },
            { input: '1 2 null\n1 null 2', output: 'false' },
            { input: '10 5 15\n10 5 15', output: 'true' },
            { input: '1 2 3 4\n1 2 3 null', output: 'false' },
            { input: '5 4 6 null null 3 7\n5 4 6 null null 3 7', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    // Read two lines and compare
    return 0;
}`,
            python: `import sys
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    return None
def main():
    # Read two lines and compare
    pass
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read two lines and compare
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    // Read two lines and compare
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
bool isSame(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && isSame(p->left, q->left) && isSame(p->right, q->right);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string l1, l2;
    if (getline(cin, l1) && getline(cin, l2)) {
        TreeNode* p = buildTree(l1);
        TreeNode* q = buildTree(l2);
        cout << (isSame(p, q) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def is_same(p, q):
    if not p and not q: return True
    if not p or not q: return False
    return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)
def main():
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        p = build_tree(lines[0])
        q = build_tree(lines[1])
        print("true" if is_same(p, q) else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static boolean isSame(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val && isSame(p.left, q.left) && isSame(p.right, q.right);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String l1 = br.readLine();
        String l2 = br.readLine();
        TreeNode p = buildTree(l1);
        TreeNode q = buildTree(l2);
        System.out.println(isSame(p, q) ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn is_same(i1: Option<usize>, n1: &Vec<TreeNode>, i2: Option<usize>, n2: &Vec<TreeNode>) -> bool {
    match (i1, i2) {
        (None, None) => true,
        (Some(idx1), Some(idx2)) => {
            n1[idx1].val == n2[idx2].val &&
            is_same(n1[idx1].left, n1, n2[idx2].left, n2) &&
            is_same(n1[idx1].right, n1, n2[idx2].right, n2)
        }
        _ => false,
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(l1)), Some(Ok(l2))) = (lines.next(), lines.next()) {
        let (n1, r1) = build_tree(&l1);
        let (n2, r2) = build_tree(&l2);
        println!("{}", if is_same(r1, &n1, r2, &n2) { "true" } else { "false" });
    }
}`,
        },
    },

    // ==================== EASY #4: Symmetric Tree ====================
    {
        title: 'Symmetric Tree',
        description:
            "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- 'true' or 'false'.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 1000].\n-100 <= Node.val <= 100',
        hints: 'A tree is symmetric if the left subtree is a mirror reflection of the right subtree.',
        editorial:
            '**Approach: DFS Mirror Check**\nTwo trees are mirrors of each other if:\n1. Their roots have same value.\n2. Left child of each is mirror of right child of other.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 2 3 4 4 3',
                output: 'true',
                explanation:
                    'Mirror match at every level: Left [2,3,4] and Right [2,4,3] reflect perfectly.',
            },
            { title: 'Example 2', input: '1 2 2 null 3 null 3', output: 'false' },
        ],
        testcases: [
            { input: '1 2 2 3 4 4 3', output: 'true' },
            { input: '1 2 2 null 3 null 3', output: 'false' },
            { input: '1', output: 'true' },
            { input: '1 2 2', output: 'true' },
            { input: '1 2 3', output: 'false' },
            { input: '1 2 2 3 null null 3', output: 'true' },
            { input: '1 2 2 null 3 3', output: 'true' },
            { input: '1 2 2 null 3 4 null', output: 'false' },
            { input: '1 2 2 3 4 3 4', output: 'false' },
            { input: '2 3 3 4 5 5 4', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print if symmetric
    }
    return 0;
}`,
            python: `import sys
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    return None
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    # Solve and print if symmetric
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print if symmetric
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print if symmetric
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
bool isMirror(TreeNode* t1, TreeNode* t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return t1->val == t2->val && isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << ((!root || isMirror(root->left, root->right)) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def is_mirror(t1, t2):
    if not t1 and not t2: return True
    if not t1 or not t2: return False
    return t1.val == t2.val and is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    if not root:
        print("true")
    else:
        print("true" if is_mirror(root.left, root.right) else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return t1.val == t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        System.out.println(root == null || isMirror(root.left, root.right) ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn is_mirror(i1: Option<usize>, i2: Option<usize>, nodes: &Vec<TreeNode>) -> bool {
    match (i1, i2) {
        (None, None) => true,
        (Some(idx1), Some(idx2)) => {
            nodes[idx1].val == nodes[idx2].val &&
            is_mirror(nodes[idx1].left, nodes[idx2].right, nodes) &&
            is_mirror(nodes[idx1].right, nodes[idx2].left, nodes)
        }
        _ => false,
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let ans = match root {
            None => true,
            Some(r) => is_mirror(nodes[r].left, nodes[r].right, &nodes)
        };
        println!("{}", if ans { "true" } else { "false" });
    }
}`,
        },
    },

    // ==================== EASY #5: Invert Binary Tree ====================
    {
        title: 'Invert Binary Tree',
        description:
            'Given the root of a binary tree, invert the tree, and return its level-order BFS serialization.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- The BFS representation of the inverted tree (omitting trailing nulls).',
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 1000].\n-100 <= Node.val <= 100',
        hints: 'Inverting a tree means swapping the left and right children recursively for all nodes.',
        editorial:
            '**Approach: Recursion / DFS**\nFor each node, swap its left and right children, then recursively invert left and right subtrees.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '4 2 7 1 3 6 9',
                output: '4 7 2 9 6 3 1',
                explanation:
                    'For root 4, children 2 and 7 are swapped to 7 and 2. Their children are swapped similarly.',
            },
            { title: 'Example 2', input: '2 1 3', output: '2 3 1' },
        ],
        testcases: [
            { input: '4 2 7 1 3 6 9', output: '4 7 2 9 6 3 1' },
            { input: '2 1 3', output: '2 3 1' },
            { input: 'null', output: 'null' },
            { input: '1', output: '1' },
            { input: '1 2', output: '1 null 2' },
            { input: '1 null 2', output: '1 2' },
            { input: '3 1 2', output: '3 2 1' },
            { input: '4 2 7 1 null null 9', output: '4 7 2 9 null null 1' },
            { input: '1 2 3 4 5 6 7', output: '1 3 2 7 6 5 4' },
            { input: '10 20 30 40 null null 50', output: '10 30 20 50 null null 40' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
void printTree(TreeNode* root) {}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print inverted BFS
    }
    return 0;
}`,
            python: `import sys
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    return None
def print_tree(root):
    pass
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    # Solve and print inverted BFS
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    static void printTree(TreeNode root) {}
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print inverted BFS
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn print_tree(root: Option<usize>, nodes: &Vec<TreeNode>) {}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print inverted BFS
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
TreeNode* invertTree(TreeNode* r) {
    if (!r) return nullptr;
    TreeNode* left = invertTree(r->left);
    TreeNode* right = invertTree(r->right);
    r->left = right; r->right = left;
    return r;
}
void printTree(TreeNode* root) {
    if (!root) { cout << "null\n"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            res.push_back(to_string(curr->val));
            q.push(curr->left); q.push(curr->right);
        } else res.push_back("null");
    }
    while (!res.empty() && res.back() == "null") res.pop_back();
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        root = invertTree(root);
        printTree(root);
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def invert_tree(r):
    if not r: return None
    l = invert_tree(r.left)
    right = invert_tree(r.right)
    r.left, r.right = right, l
    return r
def print_tree(root):
    if not root:
        print("null")
        return
    res, q = [], collections.deque([root])
    while q:
        curr = q.popleft()
        if curr:
            res.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else: res.append("null")
    while res and res[-1] == "null": res.pop()
    print(" ".join(res))
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    root = invert_tree(root)
    print_tree(root)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static TreeNode invertTree(TreeNode r) {
        if (r == null) return null;
        TreeNode left = invertTree(r.left);
        TreeNode right = invertTree(r.right);
        r.left = right; r.right = left;
        return r;
    }
    static void printTree(TreeNode root) {
        if (root == null) { System.out.println("null"); return; }
        List<String> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr != null) {
                res.add(String.valueOf(curr.val));
                q.offer(curr.left); q.offer(curr.right);
            } else res.add("null");
        }
        while (!res.isEmpty() && res.get(res.size() - 1).equals("null")) res.remove(res.size() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        root = invertTree(root);
        printTree(root);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn invert(idx: Option<usize>, nodes: &mut Vec<TreeNode>) {
    if let Some(i) = idx {
        let l = nodes[i].left;
        let r = nodes[i].right;
        nodes[i].left = r;
        nodes[i].right = l;
        invert(nodes[i].left, nodes);
        invert(nodes[i].right, nodes);
    }
}
fn print_tree(root: Option<usize>, nodes: &Vec<TreeNode>) {
    if root.is_none() { println!("null"); return; }
    let mut res = Vec::new();
    let mut q = std::collections::VecDeque::new(); q.push_back(root);
    while !q.is_empty() {
        let curr = q.pop_front().unwrap();
        if let Some(i) = curr {
            res.push(nodes[i].val.to_string());
            q.push_back(nodes[i].left); q.push_back(nodes[i].right);
        } else { res.push("null".to_string()); }
    }
    while res.last().map(|s| s.as_str()) == Some("null") { res.pop(); }
    println!("{}", res.join(" "));
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (mut nodes, root) = build_tree(&line);
        invert(root, &mut nodes);
        print_tree(root, &nodes);
    }
}`,
        },
    },

    // ==================== MEDIUM #1: Binary Tree Level Order Traversal ====================
    {
        title: 'Binary Tree Level Order Traversal',
        description:
            "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level), printing each level's values on a new line.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines, where each line contains space-separated integers representing nodes at that level.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000',
        hints: 'Use a queue to process level by level. Track the size of the queue at the start of each level.',
        editorial:
            '**Approach: BFS Level by Level**\nUse a queue. For each level, determine its size. Dequeue this many elements and enqueue their children. Print values separated by spaces.\nTime Complexity: O(N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: '3\n9 20\n15 7',
                explanation: 'Level 0: 3. Level 1: 9, 20. Level 2: 15, 7.',
            },
            { title: 'Example 2', input: '1', output: '1' },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: '3\n9 20\n15 7' },
            { input: '1', output: '1' },
            { input: 'null', output: '' },
            { input: '1 2 3', output: '1\n2 3' },
            { input: '1 2 null 3 null 4', output: '1\n2\n3\n4' },
            { input: '1 2 3 4 5 6 7', output: '1\n2 3\n4 5 6 7' },
            { input: '10 -20 -30 null 40', output: '10\n-20 -30\n40' },
            { input: '1 null 2 null 3', output: '1\n2\n3' },
            { input: '5 4 6 3 null null 7', output: '5\n4 6\n3 7' },
            { input: '100 200 300 400 500', output: '100\n200 300\n400 500' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    // Read input and print level order
    return 0;
}`,
            python: `import sys
# Define TreeNode and solve level order traversal
pass`,
            java: `import java.io.*;
import java.util.*;
// Read input and print level order
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `use std::io::{self, BufRead};
// Read input and print level order
fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front(); q.pop();
                cout << curr->val << (i + 1 == sz ? "" : " ");
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            cout << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    if not root: return
    q = collections.deque([root])
    while q:
        sz = len(q)
        lvl = []
        for _ in range(sz):
            curr = q.popleft()
            lvl.append(str(curr.val))
            if curr.left: q.append(curr.left)
            if curr.right: q.append(curr.right)
        print(" ".join(lvl))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        if (root == null) return;
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < sz; i++) {
                TreeNode curr = q.poll();
                if (i > 0) sb.append(" ");
                sb.append(curr.val);
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            System.out.println(sb.toString());
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        if root.is_none() { return; }
        let mut q = std::collections::VecDeque::new(); q.push_back(root.unwrap());
        while !q.is_empty() {
            let sz = q.len();
            let mut lvl = Vec::new();
            for _ in 0..sz {
                let curr = q.pop_front().unwrap();
                lvl.push(nodes[curr].val.to_string());
                if let Some(l) = nodes[curr].left { q.push_back(l); }
                if let Some(r) = nodes[curr].right { q.push_back(r); }
            }
            println!("{}", lvl.join(" "));
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #2: Validate BST ====================
    {
        title: 'Validate Binary Search Tree',
        description:
            "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- 'true' or 'false'.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-search-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1',
        hints: 'Use recursion. Keep track of the valid range (min, max) for node values. Note that node values can be minimum/maximum 32-bit integers, so use 64-bit integer limits for BST range checks.',
        editorial:
            '**Approach: Recursion with bounds**\nFor each node, we check if its value falls within the open interval `(minVal, maxVal)`. Recursively update limits.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '2 1 3',
                output: 'true',
                explanation: 'Root 2 has left child 1 (< 2) and right child 3 (> 2). Valid BST.',
            },
            { title: 'Example 2', input: '5 1 4 null null 3 6', output: 'false' },
        ],
        testcases: [
            { input: '2 1 3', output: 'true' },
            { input: '5 1 4 null null 3 6', output: 'false' },
            { input: '1', output: 'true' },
            { input: '1 1', output: 'false' },
            { input: '10 5 15 null null 6 20', output: 'false' },
            { input: '10 5 15 null null 12 20', output: 'true' },
            { input: '2147483647', output: 'true' },
            { input: '-2147483648', output: 'true' },
            { input: '5 4 6 3 null null 7', output: 'true' },
            { input: '3 2 5 1 null 4', output: 'true' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    // Solve and print if valid BST
    return 0;
}`,
            python: `import sys
# Define TreeNode and BST validation
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `use std::io::{self, BufRead};
fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
bool validate(TreeNode* r, long long minVal, long long maxVal) {
    if (!r) return true;
    if (r->val <= minVal || r->val >= maxVal) return false;
    return validate(r->left, minVal, r->val) && validate(r->right, r->val, maxVal);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << (validate(root, -2e18, 2e18) ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def validate(r, min_v, max_v):
    if not r: return True
    if r.val <= min_v or r.val >= max_v: return False
    return validate(r.left, min_v, r.val) and validate(r.right, r.val, max_v)
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    print("true" if validate(root, float('-inf'), float('inf')) else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static boolean validate(TreeNode r, long minVal, long maxVal) {
        if (r == null) return true;
        if (r.val <= minVal || r.val >= maxVal) return false;
        return validate(r.left, minVal, r.val) && validate(r.right, r.val, maxVal);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        System.out.println(validate(root, Long.MIN_VALUE, Long.MAX_VALUE) ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn validate(idx: Option<usize>, nodes: &Vec<TreeNode>, min_v: i64, max_v: i64) -> bool {
    if let Some(i) = idx {
        let val = nodes[i].val as i64;
        if val <= min_v || val >= max_v { return false; }
        validate(nodes[i].left, nodes, min_v, val) && validate(nodes[i].right, nodes, val, max_v)
    } else { true }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let ans = validate(root, i64::MIN, i64::MAX, &nodes);
        println!("{}", if ans { "true" } else { "false" });
    }
}`,
        },
    },

    // ==================== MEDIUM #3: Lowest Common Ancestor ====================
    {
        title: 'Lowest Common Ancestor of a Binary Tree',
        description:
            'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes, p and q.\n\n**Input Format:**\n- First line: BFS representation of the tree.\n- Second line: Two space-separated integers representing p and q.\n\n**Output Format:**\n- A single integer representing the value of the LCA.',
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np and q will exist in the tree and p != q.',
        hints: 'Traverse the tree. If the current node is p or q, it is a candidate. If left and right subtrees both return candidates, current is the LCA.',
        editorial:
            '**Approach: DFS**\nSearch recursively. If left and right subtrees both return non-null, root is LCA. Otherwise, return the non-null subtree result.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '3 5 1 6 2 0 8 null null 7 4\n5 1',
                output: '3',
                explanation: 'LCA of 5 and 1 is 3 since it is the lowest shared ancestor.',
            },
            {
                title: 'Example 2',
                input: '3 5 1 6 2 0 8 null null 7 4\n5 4',
                output: '5',
                explanation: 'LCA of 5 and 4 is 5 itself.',
            },
        ],
        testcases: [
            { input: '3 5 1 6 2 0 8 null null 7 4\n5 1', output: '3' },
            { input: '3 5 1 6 2 0 8 null null 7 4\n5 4', output: '5' },
            { input: '1 2\n1 2', output: '1' },
            { input: '1 2 3\n2 3', output: '1' },
            { input: '1 2 3 4 5 6 7\n4 5', output: '2' },
            { input: '1 2 3 4 5 6 7\n4 7', output: '1' },
            { input: '1 2 3 4 5 6 7\n6 7', output: '3' },
            { input: '10 -5 20 -10 0\n-10 0', output: '-5' },
            { input: '10 -5 20 -10 0\n-10 20', output: '10' },
            { input: '5 3 6 2 4 null 7\n2 4', output: '3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// TreeNode, buildTree and LCA placeholder
int main() {}`,
            python: `import sys
# LCA structure
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `use std::io::{self, BufRead};
fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
TreeNode* lca(TreeNode* r, int p, int q) {
    if (!r) return nullptr;
    if (r->val == p || r->val == q) return r;
    TreeNode* left = lca(r->left, p, q);
    TreeNode* right = lca(r->right, p, q);
    if (left && right) return r;
    return left ? left : right;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int p, q; cin >> p >> q;
        TreeNode* ans = lca(root, p, q);
        if (ans) cout << ans->val << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def lca(r, p, q):
    if not r: return None
    if r.val == p or r.val == q: return r
    left = lca(r.left, p, q)
    right = lca(r.right, p, q)
    if left and right: return r
    return left or right
def main():
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        root = build_tree(lines[0])
        p, q = map(int, lines[1].split())
        ans = lca(root, p, q)
        if ans: print(ans.val)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static TreeNode lca(TreeNode r, int p, int q) {
        if (r == null) return null;
        if (r.val == p || r.val == q) return r;
        TreeNode left = lca(r.left, p, q);
        TreeNode right = lca(r.right, p, q);
        if (left != null && right != null) return r;
        return left != null ? left : right;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        String[] pq = br.readLine().trim().split("\\s+");
        int p = Integer.parseInt(pq[0]);
        int q = Integer.parseInt(pq[1]);
        TreeNode ans = lca(root, p, q);
        if (ans != null) System.out.println(ans.val);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn lca(idx: Option<usize>, nodes: &Vec<TreeNode>, p: i32, q: i32) -> Option<usize> {
    if let Some(i) = idx {
        if nodes[i].val == p || nodes[i].val == q { return Some(i); }
        let left = lca(nodes[i].left, nodes, p, q);
        let right = lca(nodes[i].right, nodes, p, q);
        if left.is_some() && right.is_some() { return Some(i); }
        left.or(right)
    } else { None }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let (Some(Ok(l1)), Some(Ok(l2))) = (lines.next(), lines.next()) {
        let (nodes, root) = build_tree(&l1);
        let mut parts = l2.split_whitespace();
        let p: i32 = parts.next().unwrap().parse().unwrap();
        let q: i32 = parts.next().unwrap().parse().unwrap();
        if let Some(ans_idx) = lca(root, &nodes, p, q) {
            println!("{}", nodes[ans_idx].val);
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #4: Binary Tree Zigzag Level Order ====================
    {
        title: 'Binary Tree Zigzag Level Order Traversal',
        description:
            "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines containing space-separated integers, representing node values at each level in zigzag fashion.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 2000].\n-100 <= Node.val <= 100',
        hints: 'This is a BFS variation. Use a boolean flag to track whether to print left-to-right or right-to-left.',
        editorial:
            '**Approach: BFS with Direction Flip**\nFor each level, store node values in a list. If direction is left-to-right, keep the order. Otherwise, reverse the level array before printing.\nTime Complexity: O(N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: '3\n20 9\n15 7',
                explanation:
                    'Level 0: 3 (left-to-right). Level 1: 20 9 (reversed). Level 2: 15 7 (left-to-right).',
            },
            { title: 'Example 2', input: '1', output: '1' },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: '3\n20 9\n15 7' },
            { input: '1', output: '1' },
            { input: 'null', output: '' },
            { input: '1 2 3 4 5 6 7', output: '1\n3 2\n4 5 6 7' },
            { input: '1 2 null 3 null 4', output: '1\n2\n3\n4' },
            { input: '1 null 2 null 3', output: '1\n2\n3' },
            { input: '10 20 30 40 50 60 70', output: '10\n30 20\n40 50 60 70' },
            { input: '1 2 3', output: '1\n3 2' },
            { input: '5 4 6 3 null null 7', output: '5\n6 4\n3 7' },
            { input: '1 2 3 4 null null 5 6 null null 7', output: '1\n3 2\n4 5\n7 6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Skeleton for Zigzag Level Order
int main() {}`,
            python: `# Zigzag Level Order
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root);
        bool l2r = true;
        while (!q.empty()) {
            int sz = q.size(); vector<int> lvl(sz);
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front(); q.pop();
                int idx = l2r ? i : (sz - 1 - i);
                lvl[idx] = curr->val;
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            for (int i = 0; i < sz; i++) cout << lvl[i] << (i + 1 == sz ? "" : " ");
            cout << "\n";
            l2r = !l2r;
        }
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    if not root: return
    q, l2r = collections.deque([root]), True
    while q:
        sz = len(q)
        lvl = [0] * sz
        for i in range(sz):
            curr = q.popleft()
            idx = i if l2r else (sz - 1 - i)
            lvl[idx] = curr.val
            if curr.left: q.append(curr.left)
            if curr.right: q.append(curr.right)
        print(" ".join(map(str, lvl)))
        l2r = not l2r
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        if (root == null) return;
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        boolean l2r = true;
        while (!q.isEmpty()) {
            int sz = q.size();
            int[] lvl = new int[sz];
            for (int i = 0; i < sz; i++) {
                TreeNode curr = q.poll();
                int idx = l2r ? i : (sz - 1 - i);
                lvl[idx] = curr.val;
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < sz; i++) {
                if (i > 0) sb.append(" ");
                sb.append(lvl[i]);
            }
            System.out.println(sb.toString());
            l2r = !l2r;
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        if root.is_none() { return; }
        let mut q = std::collections::VecDeque::new(); q.push_back(root.unwrap());
        let mut l2r = true;
        while !q.is_empty() {
            let sz = q.len();
            let mut lvl = vec![0; sz];
            for i in 0..sz {
                let curr = q.pop_front().unwrap();
                let idx = if l2r { i } else { sz - 1 - i };
                lvl[idx] = nodes[curr].val;
                if let Some(l) = nodes[curr].left { q.push_back(l); }
                if let Some(r) = nodes[curr].right { q.push_back(r); }
            }
            let strs: Vec<String> = lvl.iter().map(|x| x.to_string()).collect();
            println!("{}", strs.join(" "));
            l2r = !l2r;
        }
    }
}`,
        },
    },

    // ==================== MEDIUM #5: Construct Tree from Preorder/Inorder ====================
    {
        title: 'Construct Binary Tree from Preorder and Inorder Traversal',
        description:
            'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree (printed as its level-order BFS serialization, omitting trailing nulls).\n\n**Input Format:**\n- First line: integer n (number of nodes)\n- Second line: n space-separated integers representing preorder\n- Third line: n space-separated integers representing inorder\n\n**Output Format:**\n- The BFS representation of the constructed tree.',
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            '1 <= n <= 3000\n-3000 <= preorder[i], inorder[i] <= 3000\npreorder and inorder consist of unique values.',
        hints: 'The first element of preorder is the root. Find its position in inorder to split the left and right subtrees.',
        editorial:
            '**Approach: Divide and Conquer**\nUse the preorder array to identify root elements, and the inorder array to split the tree into left and right subtrees. Construct recursively.\nTime Complexity: O(N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '5\n3 9 20 15 7\n9 3 15 20 7',
                output: '3 9 20 null null 15 7',
                explanation: '3 is root. Left is 9. Right is 20, which has children 15 and 7.',
            },
            { title: 'Example 2', input: '1\n-1\n-1', output: '-1' },
        ],
        testcases: [
            { input: '5\n3 9 20 15 7\n9 3 15 20 7', output: '3 9 20 null null 15 7' },
            { input: '1\n-1\n-1', output: '-1' },
            { input: '3\n1 2 3\n2 1 3', output: '1 2 3' },
            { input: '3\n1 2 3\n3 2 1', output: '1 2 null 3' },
            { input: '3\n1 2 3\n1 2 3', output: '1 null 2 null 3' },
            { input: '4\n1 2 4 3\n4 2 1 3', output: '1 2 3 4' },
            { input: '7\n1 2 4 5 3 6 7\n4 2 5 1 6 3 7', output: '1 2 3 4 5 6 7' },
            { input: '5\n1 2 3 4 5\n5 4 3 2 1', output: '1 2 null 3 null 4 null 5' },
            { input: '5\n1 2 3 4 5\n1 2 3 4 5', output: '1 null 2 null 3 null 4 null 5' },
            { input: '6\n10 20 40 50 30 60\n40 20 50 10 30 60', output: '10 20 30 40 50 60' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Build tree from preorder/inorder
int main() {}`,
            python: `# Build tree from preorder/inorder
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* build(const vector<int>& pre, const vector<int>& in, int& preIdx, int inStart, int inEnd) {
    if (inStart > inEnd) return nullptr;
    int val = pre[preIdx++];
    TreeNode* root = new TreeNode(val);
    int inIdx = inStart;
    while (in[inIdx] != val) inIdx++;
    root->left = build(pre, in, preIdx, inStart, inIdx - 1);
    root->right = build(pre, in, preIdx, inIdx + 1, inEnd);
    return root;
}
void printTree(TreeNode* root) {
    if (!root) { cout << "null\n"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            res.push_back(to_string(curr->val));
            q.push(curr->left); q.push(curr->right);
        } else res.push_back("null");
    }
    while (!res.empty() && res.back() == "null") res.pop_back();
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n; if (cin >> n) {
        vector<int> pre(n), in(n);
        for (int i = 0; i < n; i++) cin >> pre[i];
        for (int i = 0; i < n; i++) cin >> in[i];
        int preIdx = 0;
        TreeNode* root = build(pre, in, preIdx, 0, n - 1);
        printTree(root);
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build(pre, inorder, pre_idx, in_start, in_end):
    if in_start > in_end: return None
    val = pre[pre_idx[0]]
    pre_idx[0] += 1
    root = TreeNode(val)
    in_idx = inorder.index(val)
    root.left = build(pre, inorder, pre_idx, in_start, in_idx - 1)
    root.right = build(pre, inorder, pre_idx, in_idx + 1, in_end)
    return root
def print_tree(root):
    if not root:
        print("null")
        return
    res, q = [], collections.deque([root])
    while q:
        curr = q.popleft()
        if curr:
            res.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else: res.append("null")
    while res and res[-1] == "null": res.pop()
    print(" ".join(res))
def main():
    input_data = sys.stdin.read().split()
    if not input_data: return
    n = int(input_data[0])
    pre = [int(x) for x in input_data[1:n+1]]
    inorder = [int(x) for x in input_data[n+1:2*n+1]]
    pre_idx = [0]
    root = build(pre, inorder, pre_idx, 0, n - 1)
    print_tree(root)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static int preIdx = 0;
    static TreeNode build(int[] pre, int[] in, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        int val = pre[preIdx++];
        TreeNode root = new TreeNode(val);
        int inIdx = inStart;
        while (in[inIdx] != val) inIdx++;
        root.left = build(pre, in, inStart, inIdx - 1);
        root.right = build(pre, in, inIdx + 1, inEnd);
        return root;
    }
    static void printTree(TreeNode root) {
        if (root == null) { System.out.println("null"); return; }
        List<String> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr != null) {
                res.add(String.valueOf(curr.val));
                q.offer(curr.left); q.offer(curr.right);
            } else res.add("null");
        }
        while (!res.isEmpty() && res.get(res.size() - 1).equals("null")) res.remove(res.size() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int n = Integer.parseInt(line.trim());
        int[] pre = new int[n];
        int[] in = new int[n];
        StringTokenizer st1 = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) pre[i] = Integer.parseInt(st1.nextToken());
        StringTokenizer st2 = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) in[i] = Integer.parseInt(st2.nextToken());
        preIdx = 0;
        TreeNode root = build(pre, in, 0, n - 1);
        printTree(root);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_pre_in(
    pre: &[i32],
    in_arr: &[i32],
    pre_idx: &mut usize,
    in_start: usize,
    in_end: usize,
    nodes: &mut Vec<TreeNode>,
) -> Option<usize> {
    if in_start > in_end || *pre_idx >= pre.len() { return None; }
    let val = pre[*pre_idx];
    *pre_idx += 1;
    let root_idx = nodes.len();
    nodes.push(TreeNode { val, left: None, right: None });
    let mut in_idx = in_start;
    for i in in_start..=in_end {
        if in_arr[i] == val { in_idx = i; break; }
    }
    if in_idx > in_start {
        nodes[root_idx].left = build_pre_in(pre, in_arr, pre_idx, in_start, in_idx - 1, nodes);
    }
    if in_idx < in_end {
        nodes[root_idx].right = build_pre_in(pre, in_arr, pre_idx, in_idx + 1, in_end, nodes);
    }
    Some(root_idx)
}
fn print_tree(root: Option<usize>, nodes: &Vec<TreeNode>) {
    if root.is_none() { println!("null"); return; }
    let mut res = Vec::new();
    let mut q = std::collections::VecDeque::new(); q.push_back(root);
    while !q.is_empty() {
        let curr = q.pop_front().unwrap();
        if let Some(i) = curr {
            res.push(nodes[i].val.to_string());
            q.push_back(nodes[i].left); q.push_back(nodes[i].right);
        } else { res.push("null".to_string()); }
    }
    while res.last().map(|s| s.as_str()) == Some("null") { res.pop(); }
    println!("{}", res.join(" "));
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(l1)) = lines.next() {
        let n: usize = l1.trim().parse().unwrap();
        let l2 = lines.next().unwrap().unwrap();
        let pre: Vec<i32> = l2.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let l3 = lines.next().unwrap().unwrap();
        let in_arr: Vec<i32> = l3.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let mut nodes = Vec::new();
        let mut pre_idx = 0;
        let root = build_pre_in(&pre, &in_arr, &mut pre_idx, 0, n - 1, &mut nodes);
        print_tree(root, &nodes);
    }
}`,
        },
    },

    // ==================== HARD #1: Binary Tree Maximum Path Sum ====================
    {
        title: 'Binary Tree Maximum Path Sum',
        description:
            'Given the root of a binary tree, return the maximum path sum of any non-empty path.\n\nA path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path does not need to pass through the root.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- An integer representing the maximum path sum.',
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
        hints: 'For each node, compute the maximum path sum starting at this node and going downwards. Keep track of the global maximum sum.',
        editorial:
            '**Approach: Post-order DFS**\nAt each node, compute the max gain from left and right subtrees. The max path sum through the current node is `Node.val + max(0, leftGain) + max(0, rightGain)`. Update global maximum.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3',
                output: '6',
                explanation: 'The path is 2 -> 1 -> 3, with sum 2 + 1 + 3 = 6.',
            },
            {
                title: 'Example 2',
                input: '-10 9 20 null null 15 7',
                output: '42',
                explanation: 'The path is 15 -> 20 -> 7, with sum 15 + 20 + 7 = 42.',
            },
        ],
        testcases: [
            { input: '1 2 3', output: '6' },
            { input: '-10 9 20 null null 15 7', output: '42' },
            { input: '-3', output: '-3' },
            { input: '2 -1', output: '2' },
            { input: '1 -2 3', output: '4' },
            { input: '-2 -1', output: '-1' },
            { input: '5 4 8 11 null 13 4 7 2 null null null 1', output: '48' },
            { input: '1 2 3 4 5 6 7', output: '18' },
            { input: '-10 -20 -30', output: '-10' },
            { input: '10 2 10 -20 1 20', output: '43' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Max path sum skeleton
int main() {}`,
            python: `# Max path sum skeleton
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int maxPathSumDFS(TreeNode* root, int& maxSum) {
    if (!root) return 0;
    int left = max(0, maxPathSumDFS(root->left, maxSum));
    int right = max(0, maxPathSumDFS(root->right, maxSum));
    maxSum = max(maxSum, root->val + left + right);
    return root->val + max(left, right);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int maxSum = -1e9;
        maxPathSumDFS(root, maxSum);
        cout << maxSum << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def max_path_sum_dfs(root, max_sum):
    if not root: return 0
    left = max(0, max_path_sum_dfs(root.left, max_sum))
    right = max(0, max_path_sum_dfs(root.right, max_sum))
    max_sum[0] = max(max_sum[0], root.val + left + right)
    return root.val + max(left, right)
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    max_sum = [float('-inf')]
    max_path_sum_dfs(root, max_sum)
    print(max_sum[0])
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static int maxSum = Integer.MIN_VALUE;
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int maxPathSumDFS(TreeNode root) {
        if (root == null) return 0;
        int left = Math.max(0, maxPathSumDFS(root.left));
        int right = Math.max(0, maxPathSumDFS(root.right));
        maxSum = Math.max(maxSum, root.val + left + right);
        return root.val + Math.max(left, right);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        maxSum = Integer.MIN_VALUE;
        maxPathSumDFS(root);
        System.out.println(maxSum);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn max_path_sum_dfs(idx: Option<usize>, nodes: &Vec<TreeNode>, max_sum: &mut i32) -> i32 {
    if let Some(i) = idx {
        let left_gain = std::cmp::max(0, max_path_sum_dfs(nodes[i].left, nodes, max_sum));
        let right_gain = std::cmp::max(0, max_path_sum_dfs(nodes[i].right, nodes, max_sum));
        let price_newpath = nodes[i].val + left_gain + right_gain;
        *max_sum = std::cmp::max(*max_sum, price_newpath);
        nodes[i].val + std::cmp::max(left_gain, right_gain)
    } else { 0 }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let mut max_sum = i32::MIN;
        max_path_sum_dfs(root, &nodes, &mut max_sum);
        println!("{}", max_sum);
    }
}`,
        },
    },

    // ==================== HARD #2: Serialize and Deserialize Binary Tree ====================
    {
        title: 'Serialize and Deserialize Binary Tree',
        description:
            "Given a space-separated string representing the preorder DFS serialization of a binary tree (using 'null' for empty nodes), deserialize the string to construct the tree and then print the BFS level-order serialization of the tree (omitting trailing nulls).\n\n**Input Format:**\n- A single line of space-separated strings containing the preorder DFS representation of the tree.\n\n**Output Format:**\n- The BFS level-order serialization of the tree (omitting trailing nulls). If the tree is empty, print 'null'.",
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'dfs', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 10^4].\n-1000 <= Node.val <= 1000',
        hints: "In preorder DFS, the first node is the root. Recursively deserialize left and right children. If a token is 'null', return a null node.",
        editorial:
            '**Approach: Preorder DFS Deserialization**\nMaintain a pointer to the current token. Build the tree recursively by populating left and right children in preorder fashion. Then perform BFS to output.\nTime Complexity: O(N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 null null 3 4 null null 5 null null',
                output: '1 2 3 null null 4 5',
                explanation:
                    'Reconstructs root 1, left child 2 (no children), right child 3 (left child 4, right child 5). Prints BFS level order.',
            },
            { title: 'Example 2', input: 'null', output: 'null' },
        ],
        testcases: [
            { input: '1 2 null null 3 4 null null 5 null null', output: '1 2 3 null null 4 5' },
            { input: 'null', output: 'null' },
            { input: '1 null null', output: '1' },
            { input: '1 2 null null null', output: '1 2' },
            { input: '1 null 2 null null', output: '1 null 2' },
            {
                input: '1 2 4 null null 5 null null 3 6 null null 7 null null',
                output: '1 2 3 4 5 6 7',
            },
            { input: '10 -20 null null 30 null null', output: '10 -20 30' },
            { input: '1 2 3 4 null null null null null', output: '1 2 null 3 null 4' },
            {
                input: '5 4 3 2 1 null null null null null null',
                output: '5 4 null 3 null 2 null 1',
            },
            {
                input: '10 20 40 null null 50 null null 30 null 60 null null',
                output: '10 20 30 40 50 null 60',
            },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// DFS Deserializer skeleton
int main() {}`,
            python: `# DFS Deserializer skeleton
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* deserializePreorder(const vector<string>& tokens, int& i) {
    if (i >= tokens.size() || tokens[i] == "null") { i++; return nullptr; }
    TreeNode* root = new TreeNode(stoi(tokens[i++]));
    root->left = deserializePreorder(tokens, i);
    root->right = deserializePreorder(tokens, i);
    return root;
}
void printTree(TreeNode* root) {
    if (!root) { cout << "null\n"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            res.push_back(to_string(curr->val));
            q.push(curr->left); q.push(curr->right);
        } else res.push_back("null");
    }
    while (!res.empty() && res.back() == "null") res.pop_back();
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        stringstream ss(line); string val; vector<string> tokens;
        while (ss >> val) tokens.push_back(val);
        int i = 0;
        TreeNode* root = deserializePreorder(tokens, i);
        printTree(root);
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def deserialize_preorder(tokens, i):
    if i[0] >= len(tokens) or tokens[i[0]] == "null":
        i[0] += 1
        return None
    root = TreeNode(int(tokens[i[0]]))
    i[0] += 1
    root.left = deserialize_preorder(tokens, i)
    root.right = deserialize_preorder(tokens, i)
    return root
def print_tree(root):
    if not root:
        print("null")
        return
    res, q = [], collections.deque([root])
    while q:
        curr = q.popleft()
        if curr:
            res.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else: res.append("null")
    while res and res[-1] == "null": res.pop()
    print(" ".join(res))
def main():
    line = sys.stdin.readline().strip()
    tokens = line.split()
    if not tokens: return
    i = [0]
    root = deserialize_preorder(tokens, i)
    print_tree(root)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static int index = 0;
    static TreeNode deserializePreorder(String[] tokens) {
        if (index >= tokens.length || tokens[index].equals("null")) { index++; return null; }
        TreeNode root = new TreeNode(Integer.parseInt(tokens[index++]));
        root.left = deserializePreorder(tokens);
        root.right = deserializePreorder(tokens);
        return root;
    }
    static void printTree(TreeNode root) {
        if (root == null) { System.out.println("null"); return; }
        List<String> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr != null) {
                res.add(String.valueOf(curr.val));
                q.offer(curr.left); q.offer(curr.right);
            } else res.add("null");
        }
        while (!res.isEmpty() && res.get(res.size() - 1).equals("null")) res.remove(res.size() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        String[] tokens = line.trim().split("\\s+");
        index = 0;
        TreeNode root = deserializePreorder(tokens);
        printTree(root);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn deserialize_preorder(tokens: &[&str], curr_idx: &mut usize, nodes: &mut Vec<TreeNode>) -> Option<usize> {
    if *curr_idx >= tokens.len() { return None; }
    let token = tokens[*curr_idx];
    *curr_idx += 1;
    if token == "null" { return None; }
    let val = token.parse::<i32>().unwrap();
    let root_idx = nodes.len();
    nodes.push(TreeNode { val, left: None, right: None });
    nodes[root_idx].left = deserialize_preorder(tokens, curr_idx, nodes);
    nodes[root_idx].right = deserialize_preorder(tokens, curr_idx, nodes);
    Some(root_idx)
}
fn print_tree(root: Option<usize>, nodes: &Vec<TreeNode>) {
    if root.is_none() { println!("null"); return; }
    let mut res = Vec::new();
    let mut q = std::collections::VecDeque::new(); q.push_back(root);
    while !q.is_empty() {
        let curr = q.pop_front().unwrap();
        if let Some(i) = curr {
            res.push(nodes[i].val.to_string());
            q.push_back(nodes[i].left); q.push_back(nodes[i].right);
        } else { res.push("null".to_string()); }
    }
    while res.last().map(|s| s.as_str()) == Some("null") { res.pop(); }
    println!("{}", res.join(" "));
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let tokens: Vec<&str> = line.split_whitespace().collect();
        let mut curr_idx = 0;
        let mut nodes = Vec::new();
        let root = deserialize_preorder(&tokens, &mut curr_idx, &mut nodes);
        print_tree(root, &nodes);
    }
}`,
        },
    },

    // ==================== HARD #3: Vertical Order Traversal ====================
    {
        title: 'Vertical Order Traversal of a Binary Tree',
        description:
            "Given the root of a binary tree, return the vertical order traversal of its nodes' values.\n\nFor each node at position (row, col), its left child is at (row + 1, col - 1) and its right child is at (row + 1, col + 1). The root is at (0, 0). The vertical order traversal should be grouped by column from left to right. If multiple nodes are in the same row and column, they must be sorted in ascending order of their values.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines. Each line contains space-separated integers representing a single column, ordered from leftmost to rightmost column.",
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'dfs', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 1000].\n0 <= Node.val <= 1000',
        hints: 'Use BFS/DFS to assign coordinates (row, col) to each node. Sort the nodes by column first, then row, then value.',
        editorial:
            '**Approach: Coordinate BFS & Sort**\nPerform BFS while tracking coordinates `(row, col)` for each node. Group and sort coordinates first by column ascending, then row ascending, then value ascending.\nTime Complexity: O(N log N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: '9\n3 15\n20\n7',
                explanation:
                    'Col -1: [9] at (1, -1). Col 0: [3, 15] at (0, 0) and (2, 0). Col 1: [20] at (1, 1). Col 2: [7] at (2, 2).',
            },
            {
                title: 'Example 2',
                input: '1 2 3 4 6 5 7',
                output: '4\n2\n1 5 6\n3\n7',
                explanation: 'Both 5 and 6 end up at col 0, row 2. They are sorted as 5, 6.',
            },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: '9\n3 15\n20\n7' },
            { input: '1 2 3 4 6 5 7', output: '4\n2\n1 5 6\n3\n7' },
            { input: 'null', output: '' },
            { input: '1', output: '1' },
            { input: '3 9 8 4 0 1 7', output: '4\n9\n3 0 1\n8\n7' },
            { input: '3 9 8 4 0 1 7 null null null 2 2', output: '4\n9 2\n3 0 1\n8 2\n7' },
            { input: '1 2 3 null 4 5 null null null null 6', output: '2\n1 4 5\n3 6' },
            { input: '1 2 3 4 5', output: '4\n2\n1 5\n3' },
            { input: '1 2 3 null null 4 5', output: '2\n1 4\n3\n5' },
            { input: '20 10 30 null 15 25 35', output: '10\n20 15 25\n30\n35' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Vertical Order traversal skeleton
int main() {}`,
            python: `# Vertical Order Traversal
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
struct Info { int col, row, val; };
bool comp(const Info& a, const Info& b) {
    if (a.col != b.col) return a.col < b.col;
    if (a.row != b.row) return a.row < b.row;
    return a.val < b.val;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) return 0;
        vector<Info> nodes;
        queue<pair<TreeNode*, pair<int, int>>> q;
        q.push({root, {0, 0}});
        while (!q.empty()) {
            auto curr = q.front(); q.pop();
            TreeNode* node = curr.first;
            int col = curr.second.first, row = curr.second.second;
            nodes.push_back({col, row, node->val});
            if (node->left) q.push({node->left, {col - 1, row + 1}});
            if (node->right) q.push({node->right, {col + 1, row + 1}});
        }
        sort(nodes.begin(), nodes.end(), comp);
        int i = 0, n = nodes.size();
        while (i < n) {
            int c = nodes[i].col;
            vector<int> col_vals;
            while (i < n && nodes[i].col == c) {
                col_vals.push_back(nodes[i].val);
                i++;
            }
            for (size_t k = 0; k < col_vals.size(); k++) cout << col_vals[k] << (k + 1 == col_vals.size() ? "" : " ");
            cout << "\n";
        }
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    if not root: return
    coords = []
    q = collections.deque([(root, 0, 0)])
    while q:
        node, col, row = q.popleft()
        coords.append((col, row, node.val))
        if node.left: q.append((node.left, col - 1, row + 1))
        if node.right: q.append((node.right, col + 1, row + 1))
    coords.sort(key=lambda x: (x[0], x[1], x[2]))
    i, n = 0, len(coords)
    while i < n:
        c = coords[i][0]
        col_vals = []
        while i < n and coords[i][0] == c:
            col_vals.append(str(coords[i][2]))
            i += 1
        print(" ".join(col_vals))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static class Info implements Comparable<Info> {
        int col, row, val;
        Info(int c, int r, int v) { col = c; row = r; val = v; }
        public int compareTo(Info o) {
            if (this.col != o.col) return Integer.compare(this.col, o.col);
            if (this.row != o.row) return Integer.compare(this.row, o.row);
            return Integer.compare(this.val, o.val);
        }
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        if (root == null) return;
        List<Info> list = new ArrayList<>();
        Queue<Object[]> q = new LinkedList<>();
        q.offer(new Object[]{root, 0, 0});
        while (!q.isEmpty()) {
            Object[] curr = q.poll();
            TreeNode node = (TreeNode)curr[0];
            int col = (Integer)curr[1];
            int row = (Integer)curr[2];
            list.add(new Info(col, row, node.val));
            if (node.left != null) q.offer(new Object[]{node.left, col - 1, row + 1});
            if (node.right != null) q.offer(new Object[]{node.right, col + 1, row + 1});
        }
        Collections.sort(list);
        int i = 0, n = list.size();
        while (i < n) {
            int col = list.get(i).col;
            StringBuilder sb = new StringBuilder();
            boolean first = true;
            while (i < n && list.get(i).col == col) {
                if (!first) sb.append(" ");
                sb.append(list.get(i).val);
                first = false;
                i++;
            }
            System.out.println(sb.toString());
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        if root.is_none() { return; }
        let mut coords = Vec::new();
        let mut q = std::collections::VecDeque::new();
        q.push_back((root.unwrap(), 0, 0));
        while !q.is_empty() {
            let (curr, col, row) = q.pop_front().unwrap();
            coords.push((col, row, nodes[curr].val));
            if let Some(l) = nodes[curr].left { q.push_back((l, col - 1, row + 1)); }
            if let Some(r) = nodes[curr].right { q.push_back((r, col + 1, row + 1)); }
        }
        coords.sort_by(|a, b| {
            if a.0 != b.0 { a.0.cmp(&b.0) }
            else if a.1 != b.1 { a.1.cmp(&b.1) }
            else { a.2.cmp(&b.2) }
        });
        let mut i = 0;
        while i < coords.len() {
            let col = coords[i].0;
            let mut col_vals = Vec::new();
            while i < coords.len() && coords[i].0 == col {
                col_vals.push(coords[i].2.to_string());
                i += 1;
            }
            println!("{}", col_vals.join(" "));
        }
    }
}`,
        },
    },

    // ==================== HARD #4: Populating Next Right Pointers II ====================
    {
        title: 'Populating Next Right Pointers in Each Node II',
        description:
            "Given a binary tree, populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.\n\nInitially, all next pointers are set to NULL. Print the level-by-level traversal using these next pointers. For each level, start from the leftmost node and traverse using next until NULL, printing node values space-separated, followed by '#'.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- A single line of space-separated node values and '#' symbols showing the levels connected by next pointers.",
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 6000].\n-100 <= Node.val <= 100',
        hints: 'You can perform a standard level-order BFS traversal, keeping track of the previous node in the same level and pointing its next pointer to the current node.',
        editorial:
            '**Approach: BFS Level Links**\nTraverse the tree level by level. In each level, set `prev.next = current` for consecutive nodes. Then, traverse using `next` pointers to verify connectivity.\nTime Complexity: O(N)\nSpace Complexity: O(N)',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3 4 5 null 7',
                output: '1 # 2 3 # 4 5 7 #',
                explanation: 'Level 0: 1. Level 1: 2 next is 3. Level 2: 4 next is 5, 5 next is 7.',
            },
            { title: 'Example 2', input: '1 2 3 4 null null 5', output: '1 # 2 3 # 4 5 #' },
        ],
        testcases: [
            { input: '1 2 3 4 5 null 7', output: '1 # 2 3 # 4 5 7 #' },
            { input: '1 2 3 4 null null 5', output: '1 # 2 3 # 4 5 #' },
            { input: 'null', output: '' },
            { input: '1', output: '1 #' },
            { input: '1 2', output: '1 # 2 #' },
            { input: '1 null 2', output: '1 # 2 #' },
            { input: '1 2 3', output: '1 # 2 3 #' },
            { input: '1 2 3 4 5 6 7', output: '1 # 2 3 # 4 5 6 7 #' },
            { input: '1 2 3 4 null null 5 6 null null 7', output: '1 # 2 3 # 4 5 # 6 7 #' },
            { input: '1 2 3 null 4 5 null 6 null null 7', output: '1 # 2 3 # 4 5 # 6 7 #' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Next Right Pointers skeleton
int main() {}`,
            python: `# Next Right Pointers II
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr, *next = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
void connectAndPrint(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size(); TreeNode* prev = nullptr;
        for (int i = 0; i < sz; i++) {
            TreeNode* curr = q.front(); q.pop();
            if (prev) prev->next = curr;
            prev = curr;
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
    }
    TreeNode* currLevel = root;
    vector<string> parts;
    while (currLevel) {
        TreeNode* temp = currLevel;
        TreeNode* nextLevelStart = nullptr;
        while (temp) {
            parts.push_back(to_string(temp->val));
            if (!nextLevelStart) {
                if (temp->left) nextLevelStart = temp->left;
                else if (temp->right) nextLevelStart = temp->right;
            }
            temp = temp->next;
        }
        parts.push_back("#");
        currLevel = nextLevelStart;
    }
    for (size_t i = 0; i < parts.size(); i++) cout << parts[i] << (i + 1 == parts.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        connectAndPrint(root);
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None, next=None):
        self.val, self.left, self.right, self.next = val, left, right, next
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def connect_and_print(root):
    if not root: return
    q = collections.deque([root])
    while q:
        sz = len(q)
        prev = None
        for _ in range(sz):
            curr = q.popleft()
            if prev: prev.next = curr
            prev = curr
            if curr.left: q.append(curr.left)
            if curr.right: q.append(curr.right)
    curr_level = root
    parts = []
    while curr_level:
        temp = curr_level
        next_level_start = None
        while temp:
            parts.append(str(temp.val))
            if not next_level_start:
                if temp.left: next_level_start = temp.left
                elif temp.right: next_level_start = temp.right
            temp = temp.next
        parts.append("#")
        curr_level = next_level_start
    print(" ".join(parts))
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    connect_and_print(root)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right, next;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static void connectAndPrint(TreeNode root) {
        if (root == null) return;
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size(); TreeNode prev = null;
            for (int i = 0; i < sz; i++) {
                TreeNode curr = q.poll();
                if (prev != null) prev.next = curr;
                prev = curr;
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
        }
        TreeNode currLevel = root;
        List<String> parts = new ArrayList<>();
        while (currLevel != null) {
            TreeNode temp = currLevel;
            TreeNode nextLevelStart = null;
            while (temp != null) {
                parts.add(String.valueOf(temp.val));
                if (nextLevelStart == null) {
                    if (temp.left != null) nextLevelStart = temp.left;
                    else if (temp.right != null) nextLevelStart = temp.right;
                }
                temp = temp.next;
            }
            parts.add("#");
            currLevel = nextLevelStart;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(parts.get(i));
        }
        System.out.println(sb.toString());
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        connectAndPrint(root);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize>, next: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None, next: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None, next: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None, next: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn connect_and_print(root: Option<usize>, nodes: &mut Vec<TreeNode>) {
    if root.is_none() { return; }
    let mut q = std::collections::VecDeque::new();
    q.push_back(root.unwrap());
    while !q.is_empty() {
        let sz = q.len();
        let mut prev: Option<usize> = None;
        for _ in 0..sz {
            let curr = q.pop_front().unwrap();
            if let Some(p) = prev { nodes[p].next = Some(curr); }
            prev = Some(curr);
            if let Some(l) = nodes[curr].left { q.push_back(l); }
            if let Some(r) = nodes[curr].right { q.push_back(r); }
        }
    }
    let mut curr_level = root;
    let mut parts = Vec::new();
    while let Some(curr) = curr_level {
        let mut temp = Some(curr);
        let mut next_level_start = None;
        while let Some(node_idx) = temp {
            parts.push_back(nodes[node_idx].val.to_string());
            if next_level_start.is_none() {
                if nodes[node_idx].left.is_some() { next_level_start = nodes[node_idx].left; }
                else if nodes[node_idx].right.is_some() { next_level_start = nodes[node_idx].right; }
            }
            temp = nodes[node_idx].next;
        }
        parts.push_back("#".to_string());
        curr_level = next_level_start;
    }
    println!("{}", parts.join(" "));
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (mut nodes, root) = build_tree(&line);
        connect_and_print(root, &mut nodes);
    }
}`,
        },
    },

    // ==================== HARD #5: Recover BST ====================
    {
        title: 'Recover Binary Search Tree',
        description:
            'You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.\n\nPrint the level-order BFS traversal of the recovered BST (omitting trailing nulls).\n\n**Input Format:**\n- A single line of BFS representation of the broken BST.\n\n**Output Format:**\n- The BFS representation of the recovered BST.',
        difficulty: 'HARD',
        tags: ['tree', 'binary-search-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [2, 1000].\n-2^31 <= Node.val <= 2^31 - 1',
        hints: 'An inorder traversal of a BST should be sorted. Find the two nodes where the sorted order is violated, and swap their values back.',
        editorial:
            '**Approach: Inorder Traversal Swaps**\nPerform inorder traversal to find elements that are smaller than their predecessor. Swap values of the first and second anomalies.\nTime Complexity: O(N)\nSpace Complexity: O(H)',
        examples: [
            {
                title: 'Example 1',
                input: '1 3 null null 2',
                output: '3 1 null null 2',
                explanation: 'Inorder: [3, 2, 1]. Swapping 3 and 1 gives sorted [1, 2, 3].',
            },
            { title: 'Example 2', input: '3 1 4 null null 2', output: '2 1 4 null null 3' },
        ],
        testcases: [
            { input: '1 3 null null 2', output: '3 1 null null 2' },
            { input: '3 1 4 null null 2', output: '2 1 4 null null 3' },
            { input: '2 3 1', output: '2 1 3' },
            { input: '4 2 6 1 5 3 7', output: '4 2 6 1 3 5 7' },
            { input: '10 15 20 5 12 17 25', output: '15 10 20 5 12 17 25' },
            { input: '3 null 2 null 1', output: '1 null 2 null 3' },
            { input: '1 2 3', output: '2 1 3' },
            { input: '2 3 1', output: '2 1 3' },
            { input: '4 1 6 2 3 5 7', output: '4 2 6 1 3 5 7' },
            { input: '2 1 3', output: '2 1 3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
// Recover BST skeleton
int main() {}`,
            python: `# Recover BST
pass`,
            java: `import java.io.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {}
}`,
            rust: `fn main() {}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (int i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
void inorder(TreeNode* r, TreeNode*& prev, TreeNode*& first, TreeNode*& second) {
    if (!r) return;
    inorder(r->left, prev, first, second);
    if (prev && prev->val > r->val) {
        if (!first) { first = prev; second = r; }
        else second = r;
    }
    prev = r;
    inorder(r->right, prev, first, second);
}
void printTree(TreeNode* root) {
    if (!root) { cout << "null\n"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            res.push_back(to_string(curr->val));
            q.push(curr->left); q.push(curr->right);
        } else res.push_back("null");
    }
    while (!res.empty() && res.back() == "null") res.pop_back();
    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\n";
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        TreeNode *prev = nullptr, *first = nullptr, *second = nullptr;
        inorder(root, prev, first, second);
        if (first && second) swap(first->val, second->val);
        printTree(root);
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def inorder(r, state):
    if not r: return
    inorder(r.left, state)
    if state['prev'] and state['prev'].val > r.val:
        if not state['first']:
            state['first'] = state['prev']
            state['second'] = r
        else: state['second'] = r
    state['prev'] = r
    inorder(r.right, state)
def print_tree(root):
    if not root:
        print("null")
        return
    res, q = [], collections.deque([root])
    while q:
        curr = q.popleft()
        if curr:
            res.append(str(curr.val))
            q.append(curr.left)
            q.append(curr.right)
        else: res.append("null")
    while res and res[-1] == "null": res.pop()
    print(" ".join(res))
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    state = {'prev': None, 'first': None, 'second': None}
    inorder(root, state)
    if state['first'] and state['second']:
        state['first'].val, state['second'].val = state['second'].val, state['first'].val
    print_tree(root)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static TreeNode first = null, second = null, prev = null;
    static void inorder(TreeNode r) {
        if (r == null) return;
        inorder(r.left);
        if (prev != null && prev.val > r.val) {
            if (first == null) { first = prev; second = r; }
            else second = r;
        }
        prev = r;
        inorder(r.right);
    }
    static void printTree(TreeNode root) {
        if (root == null) { System.out.println("null"); return; }
        List<String> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr != null) {
                res.add(String.valueOf(curr.val));
                q.offer(curr.left); q.offer(curr.right);
            } else res.add("null");
        }
        while (!res.isEmpty() && res.get(res.size() - 1).equals("null")) res.remove(res.size() - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        first = null; second = null; prev = null;
        inorder(root);
        if (first != null && second != null) {
            int tmp = first.val; first.val = second.val; second.val = tmp;
        }
        printTree(root);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn inorder(
    idx: Option<usize>,
    nodes: &Vec<TreeNode>,
    prev: &mut Option<usize>,
    first: &mut Option<usize>,
    second: &mut Option<usize>,
) {
    if let Some(i) = idx {
        inorder(nodes[i].left, nodes, prev, first, second);
        if let Some(p) = *prev {
            if nodes[p].val > nodes[i].val {
                if first.is_none() { *first = Some(p); *second = Some(i); }
                else { *second = Some(i); }
            }
        }
        *prev = Some(i);
        inorder(nodes[i].right, nodes, prev, first, second);
    }
}
fn print_tree(root: Option<usize>, nodes: &Vec<TreeNode>) {
    if root.is_none() { println!("null"); return; }
    let mut res = Vec::new();
    let mut q = std::collections::VecDeque::new(); q.push_back(root);
    while !q.is_empty() {
        let curr = q.pop_front().unwrap();
        if let Some(i) = curr {
            res.push(nodes[i].val.to_string());
            q.push_back(nodes[i].left); q.push_back(nodes[i].right);
        } else { res.push("null".to_string()); }
    }
    while res.last().map(|s| s.as_str()) == Some("null") { res.pop(); }
    println!("{}", res.join(" "));
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (mut nodes, root) = build_tree(&line);
        let mut prev = None;
        let mut first = None;
        let mut second = None;
        inorder(root, &nodes, &mut prev, &mut first, &mut second);
        if let (Some(f), Some(s)) = (first, second) {
            let tmp = nodes[f].val;
            nodes[f].val = nodes[s].val;
            nodes[s].val = tmp;
        }
        print_tree(root, &nodes);
    }
}`,
        },
    },

    // ==================== EASY #5: Balanced Binary Tree ====================
    {
        title: 'Balanced Binary Tree',
        description:
            "Given the root of a binary tree, determine if it is height-balanced.\n\nA height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by at most 1.\n\n**Input Format:**\n- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).\n\n**Output Format:**\n- 'true' or 'false' (lowercase string).",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 5000].\n-10^4 <= Node.val <= 10^4',
        hints: 'A tree is balanced if both subtrees are balanced and their height difference is at most 1. Return -1 for unbalanced height to propagate failure.',
        editorial:
            '**Approach: DFS Height Check**\nRecursively compute the height of subtrees. If any subtree is unbalanced, return -1. Otherwise, return the height of the current node.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: 'true',
                explanation: 'The height of left subtree is 1 and right subtree is 2. The difference is 1, so it is balanced.',
            },
            {
                title: 'Example 2',
                input: '1 2 2 3 3 null null 4 4',
                output: 'false',
                explanation: 'The height of left subtree is 3 and right subtree is 1. The difference is 2, so it is unbalanced.',
            },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: 'true' },
            { input: '1 2 2 3 3 null null 4 4', output: 'false' },
            { input: 'null', output: 'true' },
            { input: '1', output: 'true' },
            { input: '1 2', output: 'true' },
            { input: '1 2 3 4 null null null 5', output: 'false' },
            { input: '1 null 2 null 3', output: 'false' },
            { input: '1 2 2 3 null null 3', output: 'true' },
            { input: '1 2 3 4 5 6 null 8', output: 'true' },
            { input: '1 2 null 3 null 4', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print "true" or "false"
    }
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print "true" or "false"
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print "true" or "false"
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int checkHeight(TreeNode* r) {
    if (!r) return 0;
    int lh = checkHeight(r->left);
    if (lh == -1) return -1;
    int rh = checkHeight(r->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;
    return 1 + max(lh, rh);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << (checkHeight(root) != -1 ? "true" : "false") << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def check_height(r):
    if not r: return 0
    lh = check_height(r.left)
    if lh == -1: return -1
    rh = check_height(r.right)
    if rh == -1: return -1
    if abs(lh - rh) > 1: return -1
    return 1 + max(lh, rh)
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    print("true" if check_height(root) != -1 else "false")
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int checkHeight(TreeNode r) {
        if (r == null) return 0;
        int lh = checkHeight(r.left);
        if (lh == -1) return -1;
        int rh = checkHeight(r.right);
        if (rh == -1) return -1;
        if (Math.abs(lh - rh) > 1) return -1;
        return 1 + Math.max(lh, rh);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        System.out.println(checkHeight(root) != -1 ? "true" : "false");
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn check_height(idx: Option<usize>, nodes: &Vec<TreeNode>) -> i32 {
    if let Some(i) = idx {
        let lh = check_height(nodes[i].left, nodes);
        if lh == -1 { return -1; }
        let rh = check_height(nodes[i].right, nodes);
        if rh == -1 { return -1; }
        if (lh - rh).abs() > 1 { return -1; }
        1 + std::cmp::max(lh, rh)
    } else {
        0
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let balanced = check_height(root, &nodes) != -1;
        println!("{}", if balanced { "true" } else { "false" });
    }
}`,
        },
    },

    // ==================== EASY #6: Diameter of Binary Tree ====================
    {
        title: 'Diameter of Binary Tree',
        description:
            "Given the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\nThe length of a path between two nodes is represented by the number of edges between them.\n\n**Input Format:**\n- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).\n\n**Output Format:**\n- An integer representing the diameter.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 10^4].\n-100 <= Node.val <= 100',
        hints: 'For every node, the longest path passing through it is the sum of heights of its left and right subtrees. Keep track of the maximum sum observed.',
        editorial:
            '**Approach: DFS Height and Diameter Tracking**\nUse a helper function to compute the height of the tree. During the height computation of each node, update the diameter with the sum of the left subtree height and right subtree height.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3 4 5',
                output: '3',
                explanation: 'The longest path is 3 edges: [4, 2, 1, 3] or [5, 2, 1, 3].',
            },
            {
                title: 'Example 2',
                input: '1 2',
                output: '1',
                explanation: 'The longest path is 1 edge: [2, 1].',
            },
        ],
        testcases: [
            { input: '1 2 3 4 5', output: '3' },
            { input: '1 2', output: '1' },
            { input: 'null', output: '0' },
            { input: '1', output: '0' },
            { input: '1 2 3', output: '2' },
            { input: '1 2 null 3 null 4 null 5', output: '4' },
            { input: '1 2 3 null null null 4 null 5 null 6', output: '5' },
            { input: '1 2 3 4 5 6 7', output: '4' },
            { input: '1 2 3 4 null null 5 6 null null 7', output: '6' },
            { input: '1 2 2 3 null null 3 4 null null 4', output: '6' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print the diameter
    }
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print the diameter
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print the diameter
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int computeHeight(TreeNode* r, int& diameter) {
    if (!r) return 0;
    int lh = computeHeight(r->left, diameter);
    int rh = computeHeight(r->right, diameter);
    diameter = max(diameter, lh + rh);
    return 1 + max(lh, rh);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int diameter = 0;
        computeHeight(root, diameter);
        cout << diameter << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    diameter = 0
    def height(r):
        nonlocal diameter
        if not r: return 0
        lh = height(r.left)
        rh = height(r.right)
        diameter = max(diameter, lh + rh)
        return 1 + max(lh, rh)
    height(root)
    print(diameter)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int diameter = 0;
    static int height(TreeNode r) {
        if (r == null) return 0;
        int lh = height(r.left);
        int rh = height(r.right);
        diameter = Math.max(diameter, lh + rh);
        return 1 + Math.max(lh, rh);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        diameter = 0;
        height(root);
        System.out.println(diameter);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn height(idx: Option<usize>, nodes: &Vec<TreeNode>, diameter: &mut i32) -> i32 {
    if let Some(i) = idx {
        let lh = height(nodes[i].left, nodes, diameter);
        let rh = height(nodes[i].right, nodes, diameter);
        *diameter = std::cmp::max(*diameter, lh + rh);
        1 + std::cmp::max(lh, rh)
    } else {
        0
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let mut diameter = 0;
        height(root, &nodes, &mut diameter);
        println!("{}", diameter);
    }
}`,
        },
    },

    // ==================== MEDIUM #6: Binary Tree Right Side View ====================
    {
        title: 'Binary Tree Right Side View',
        description:
            "Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.\n\n**Input Format:**\n- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).\n\n**Output Format:**\n- A single line of space-separated integers representing the right side view of the tree.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'bfs', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100',
        hints: 'Perform a level order traversal (BFS). For each level, the last node processed is part of the right side view.',
        editorial:
            '**Approach: Level Order Traversal**\nUse a queue to process nodes level by level. At each level, extract the size of the queue and iterate through all nodes at that level. Append the value of the last node of the level to the result.\nTime Complexity: O(N)\nSpace Complexity: O(W) where W is the maximum width of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3 null 5 null 4',
                output: '1 3 4',
                explanation: 'Level 0: [1], Level 1: [2, 3], Level 2: [5, 4]. The rightmost nodes are 1, 3, and 4.',
            },
            {
                title: 'Example 2',
                input: '1 null 3',
                output: '1 3',
            },
        ],
        testcases: [
            { input: '1 2 3 null 5 null 4', output: '1 3 4' },
            { input: '1 null 3', output: '1 3' },
            { input: 'null', output: '' },
            { input: '1', output: '1' },
            { input: '1 2', output: '1 2' },
            { input: '1 2 3', output: '1 3' },
            { input: '1 2 3 4', output: '1 3 4' },
            { input: '1 2 3 null 4 null null 5', output: '1 3 4 5' },
            { input: '1 2 3 4 5 6 7 null null 8', output: '1 3 7 8' },
            { input: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15', output: '1 3 7 15' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print
    }
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        if (!root) {
            cout << "\n";
            return 0;
        }
        vector<int> view;
        queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front(); q.pop();
                if (i == sz - 1) view.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
        }
        for (size_t i = 0; i < view.size(); i++) {
            cout << view[i] << (i + 1 == view.size() ? "" : " ");
        }
        cout << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    if not root:
        print()
        return
    q = collections.deque([root])
    res = []
    while q:
        sz = len(q)
        for i in range(sz):
            curr = q.popleft()
            if i == sz - 1:
                res.append(curr.val)
            if curr.left:
                q.append(curr.left)
            if curr.right:
                q.append(curr.right)
    print(" ".join(map(str, res)))
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        if (root == null) {
            System.out.println();
            return;
        }
        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode curr = q.poll();
                if (i == sz - 1) {
                    res.add(curr.val);
                }
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(res.get(i));
        }
        System.out.println(sb.toString());
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        if root.is_none() {
            println!();
            return;
        }
        let mut res = Vec::new();
        let mut q = std::collections::VecDeque::new();
        q.push_back(root.unwrap());
        while !q.is_empty() {
            let sz = q.len();
            for i in 0..sz {
                let curr = q.pop_front().unwrap();
                if i == sz - 1 {
                    res.push(nodes[curr].val);
                }
                if let Some(l) = nodes[curr].left { q.push_back(l); }
                if let Some(r) = nodes[curr].right { q.push_back(r); }
            }
        }
        let strs: Vec<String> = res.iter().map(|x| x.to_string()).collect();
        println!("{}", strs.join(" "));
    }
}`,
        },
    },

    // ==================== MEDIUM #7: Kth Smallest Element in a BST ====================
    {
        title: 'Kth Smallest Element in a BST',
        description:
            "Given the root of a binary search tree (BST) and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.\n\n**Input Format:**\n- First line: BFS level-order serialization of the BST.\n- Second line: The integer k.\n\n**Output Format:**\n- An integer representing the kth smallest value.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-search-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 10^4].\n1 <= k <= N\n0 <= Node.val <= 10^4',
        hints: 'An inorder traversal of a BST visits the nodes in ascending order. You can keep a count of visited nodes and stop when you reach the kth node.',
        editorial:
            '**Approach: Inorder Traversal**\nPerform a standard inorder traversal of the BST. Keep track of the number of nodes visited. The kth visited node is the kth smallest element.\nTime Complexity: O(N) worst case, O(H + k) with early stopping.\nSpace Complexity: O(H) recursion stack space.',
        examples: [
            {
                title: 'Example 1',
                input: '3 1 4 null 2\n1',
                output: '1',
                explanation: 'The sorted values in the BST are [1, 2, 3, 4]. The 1st smallest is 1.',
            },
            {
                title: 'Example 2',
                input: '5 3 6 2 4 null null 1\n3',
                output: '3',
                explanation: 'The sorted values are [1, 2, 3, 4, 5, 6]. The 3rd smallest is 3.',
            },
        ],
        testcases: [
            { input: '3 1 4 null 2\n1', output: '1' },
            { input: '5 3 6 2 4 null null 1\n3', output: '3' },
            { input: '1\n1', output: '1' },
            { input: '2 1 3\n2', output: '2' },
            { input: '2 1 3\n3', output: '3' },
            { input: '5 3 6 2 4 null null 1\n1', output: '1' },
            { input: '5 3 6 2 4 null null 1\n5', output: '5' },
            { input: '5 3 6 2 4 null null 1\n6', output: '6' },
            { input: '10 5 15 2 7 12 20\n4', output: '10' },
            { input: '10 5 15 2 7 12 20\n7', output: '20' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int k; cin >> k;
        // Solve and print
    }
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        String kLine = br.readLine();
        // Solve and print
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
void inorder(TreeNode* r, int& k, int& ans) {
    if (!r || ans != -1) return;
    inorder(r->left, k, ans);
    k--;
    if (k == 0) {
        ans = r->val;
        return;
    }
    inorder(r->right, k, ans);
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int k = 0;
        cin >> k;
        int ans = -1;
        inorder(root, k, ans);
        cout << ans << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    root = build_tree(lines[0])
    k = int(lines[1])
    ans = -1
    def inorder(r):
        nonlocal k, ans
        if not r or ans != -1:
            return
        inorder(r.left)
        k -= 1
        if k == 0:
            ans = r.val
            return
        inorder(r.right)
    inorder(root)
    print(ans)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int kVal = 0;
    static int ans = -1;
    static void inorder(TreeNode r) {
        if (r == null || ans != -1) return;
        inorder(r.left);
        kVal--;
        if (kVal == 0) {
            ans = r.val;
            return;
        }
        inorder(r.right);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        String kLine = br.readLine();
        if (kLine != null) {
            kVal = Integer.parseInt(kLine.trim());
        }
        ans = -1;
        inorder(root);
        System.out.println(ans);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn inorder(idx: Option<usize>, nodes: &Vec<TreeNode>, k: &mut i32, ans: &mut i32) {
    if let Some(i) = idx {
        if *ans != -1 { return; }
        inorder(nodes[i].left, nodes, k, ans);
        if *ans != -1 { return; }
        *k -= 1;
        if *k == 0 {
            *ans = nodes[i].val;
            return;
        }
        inorder(nodes[i].right, nodes, k, ans);
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        if let Some(Ok(line2)) = lines.next() {
            let (nodes, root) = build_tree(&line1);
            let mut k: i32 = line2.trim().parse().unwrap();
            let mut ans = -1;
            inorder(root, &nodes, &mut k, &mut ans);
            println!("{}", ans);
        }
    }
}`,
        },
    },

    // ==================== HARD #6: Binary Tree Cameras ====================
    {
        title: 'Binary Tree Cameras',
        description:
            "You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Calculate the minimum number of cameras needed to monitor all nodes of the tree.\n\n**Input Format:**\n- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).\n\n**Output Format:**\n- An integer representing the minimum number of cameras.",
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'dynamic-programming', 'greedy'],
        constraints:
            'The number of nodes in the tree is in the range [1, 1000].\nNode.val is 0.',
        hints: 'Use a greedy postorder traversal. A node has three possible states: 0 (not monitored), 1 (has a camera), 2 (monitored without camera). Null nodes are naturally monitored (state 2).',
        editorial:
            '**Approach: Greedy Postorder DP**\nTraverse the tree from bottom up. If either child of a node is not monitored (State 0), we must place a camera at the current node. If either child has a camera (State 1), the current node is monitored (State 2). Otherwise, the current node is not monitored (State 0).\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion stack space.',
        examples: [
            {
                title: 'Example 1',
                input: '0 0 null 0 0',
                output: '1',
                explanation: 'One camera placed at the left child of root can monitor all nodes of the tree.',
            },
            {
                title: 'Example 2',
                input: '0 0 null 0 null 0 null null 0',
                output: '2',
                explanation: 'At least two cameras are needed to monitor all nodes.',
            },
        ],
        testcases: [
            { input: '0 0 null 0 0', output: '1' },
            { input: '0 0 null 0 null 0 null null 0', output: '2' },
            { input: '0', output: '1' },
            { input: '0 0', output: '1' },
            { input: '0 0 0', output: '1' },
            { input: '0 0 0 0 0 0 0', output: '2' },
            { input: '0 0 null 0 null 0 null 0', output: '2' },
            { input: '0 0 0 0 null null 0 0 null null 0', output: '3' },
            { input: '0 null 0 null 0 null 0 null 0', output: '2' },
            { input: '0 0 0 null null null 0 0 null null 0', output: '2' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) { return nullptr; }
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        // Solve and print minimum cameras
    }
    return 0;
}`,
            python: `def main():
    # Read input and solve
    pass

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        // Solve and print minimum cameras
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        // Solve and print minimum cameras
    }
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;
struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};
TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}
int minCam(TreeNode* r, int& cameras) {
    if (!r) return 2;
    int left = minCam(r->left, cameras);
    int right = minCam(r->right, cameras);
    if (left == 0 || right == 0) {
        cameras++;
        return 1;
    }
    if (left == 1 || right == 1) {
        return 2;
    }
    return 0;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line; if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int cameras = 0;
        if (minCam(root, cameras) == 0) {
            cameras++;
        }
        cout << cameras << "\n";
    }
    return 0;
}`,
            python: `import sys
import collections
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root
def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    cameras = 0
    def min_cam(r):
        nonlocal cameras
        if not r:
            return 2
        left = min_cam(r.left)
        right = min_cam(r.right)
        if left == 0 or right == 0:
            cameras += 1
            return 1
        if left == 1 or right == 1:
            return 2
        return 0
    if min_cam(root) == 0:
        cameras += 1
    print(cameras)
if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}
public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }
    static int cameras = 0;
    static int minCam(TreeNode r) {
        if (r == null) return 2;
        int left = minCam(r.left);
        int right = minCam(r.right);
        if (left == 0 || right == 0) {
            cameras++;
            return 1;
        }
        if (left == 1 || right == 1) {
            return 2;
        }
        return 0;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        TreeNode root = buildTree(line);
        cameras = 0;
        if (minCam(root) == 0) {
            cameras++;
        }
        System.out.println(cameras);
    }
}`,
            rust: `use std::io::{self, BufRead};
struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }
fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}
fn min_cam(idx: Option<usize>, nodes: &Vec<TreeNode>, cameras: &mut i32) -> i32 {
    if let Some(i) = idx {
        let left = min_cam(nodes[i].left, nodes, cameras);
        let right = min_cam(nodes[i].right, nodes, cameras);
        if left == 0 || right == 0 {
            *cameras += 1;
            return 1;
        }
        if left == 1 || right == 1 {
            return 2;
        }
        0
    } else {
        2
    }
}
fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let mut cameras = 0;
        if min_cam(root, &nodes, &mut cameras) == 0 {
            cameras += 1;
        }
        println!("{}", cameras);
    }
}`,
        },
    },

    // ==================== EASY #8: Path Sum ====================
    {
        title: 'Path Sum',
        description:
            "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.\n\nA leaf is a node with no children.\n\n**Input Format:**\n- First line: BFS level-order representation of the binary tree (using 'null' for empty nodes).\n- Second line: The integer targetSum.\n\n**Output Format:**\n- 'true' or 'false'.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 5000].\n-1000 <= Node.val <= 1000\n-10^5 <= targetSum <= 10^5',
        hints: 'Traverse the tree recursively. At each node, subtract the node value from the targetSum and pass it to the children. A path is valid if you reach a leaf node with a value equal to the remaining sum.',
        editorial:
            "**Approach: Recursive DFS**\nFor each node, if it is a leaf, check if its value equals the remaining sum. Otherwise, recursively search the left and right subtrees with targetSum minus the current node's value.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.",
        examples: [
            {
                title: 'Example 1',
                input: '5 4 8 11 null 13 4 7 2 null null null 1\n22',
                output: 'true',
                explanation: 'The root-to-leaf path 5 -> 4 -> 11 -> 2 sums to 22.',
            },
            {
                title: 'Example 2',
                input: '1 2 3\n5',
                output: 'false',
                explanation: 'The root-to-leaf paths are 1 -> 2 (sum 3) and 1 -> 3 (sum 4). None of them sum to 5.',
            },
        ],
        testcases: [
            { input: '5 4 8 11 null 13 4 7 2 null null null 1\n22', output: 'true' },
            { input: '1 2 3\n5', output: 'false' },
            { input: '1 2\n0', output: 'false' },
            { input: '1 2\n3', output: 'true' },
            { input: 'null\n0', output: 'false' },
            { input: '1\n1', output: 'true' },
            { input: '1 -2 -3\n-1', output: 'true' },
            { input: '1 2 3 4 5\n7', output: 'true' },
            { input: '1 2 3 4 5\n8', output: 'true' },
            { input: '1 2 3 4 5\n5', output: 'false' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) { return nullptr; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
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

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}

bool hasPathSum(TreeNode* root, int sum) {
    if (!root) return false;
    if (!root->left && !root->right) return root->val == sum;
    return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        int sum;
        if (cin >> sum) {
            cout << (hasPathSum(root, sum) ? "true" : "false") << "\\n";
        }
    }
    return 0;
}`,
            python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root

def has_path_sum(root, sum_val):
    if not root: return False
    if not root.left and not root.right: return root.val == sum_val
    return has_path_sum(root.left, sum_val - root.val) or has_path_sum(root.right, sum_val - root.val)

def main():
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        root = build_tree(lines[0])
        sum_val = int(lines[1])
        print("true" if has_path_sum(root, sum_val) else "false")

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }

    static boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == sum;
        return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        String line2 = br.readLine();
        if (line1 != null && line2 != null) {
            TreeNode root = buildTree(line1);
            int sum = Integer.parseInt(line2.trim());
            System.out.println(hasPathSum(root, sum) ? "true" : "false");
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}

fn has_path_sum(idx: Option<usize>, nodes: &Vec<TreeNode>, sum: i32) -> bool {
    if let Some(i) = idx {
        let node = &nodes[i];
        if node.left.is_none() && node.right.is_none() {
            return node.val == sum;
        }
        let mut ans = false;
        if node.left.is_some() {
            ans = ans || has_path_sum(node.left, nodes, sum - node.val);
        }
        if node.right.is_some() {
            ans = ans || has_path_sum(node.right, nodes, sum - node.val);
        }
        ans
    } else {
        false
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        if let Some(Ok(line2)) = lines.next() {
            let (nodes, root) = build_tree(&line1);
            let sum: i32 = line2.trim().parse().unwrap();
            println!("{}", if has_path_sum(root, &nodes, sum) { "true" } else { "false" });
        }
    }
}`,
        },
    },

    // ==================== EASY #9: Minimum Depth of Binary Tree ====================
    {
        title: 'Minimum Depth of Binary Tree',
        description:
            "Given a binary tree, find its minimum depth.\n\nThe minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.\n\nNote: A leaf is a node with no children.\n\n**Input Format:**\n- A single line containing the BFS level-order representation of the binary tree.\n\n**Output Format:**\n- An integer representing the minimum depth.",
        difficulty: 'EASY',
        tags: ['tree', 'binary-tree', 'dfs', 'bfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 10^5].\n-1000 <= Node.val <= 1000',
        hints: 'Be careful with nodes that have only one child. A path must end at a leaf node (with no children).',
        editorial:
            '**Approach: DFS recursion**\nIf the root is null, depth is 0. If left child is null, recurse on right. If right child is null, recurse on left. Otherwise, return 1 + min(minDepth(left), minDepth(right)).\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion stack.',
        examples: [
            {
                title: 'Example 1',
                input: '3 9 20 null null 15 7',
                output: '2',
                explanation: 'The leaf node 9 is at depth 2 (path 3 -> 9). Nodes 15 and 7 are at depth 3. The minimum depth is 2.',
            },
            {
                title: 'Example 2',
                input: '2 null 3 null 4 null 5 null 6',
                output: '5',
                explanation: 'The shortest path is 2 -> 3 -> 4 -> 5 -> 6, which has 5 nodes. Note that 2 is not a leaf node because it has a right child.',
            },
        ],
        testcases: [
            { input: '3 9 20 null null 15 7', output: '2' },
            { input: '2 null 3 null 4 null 5 null 6', output: '5' },
            { input: 'null', output: '0' },
            { input: '1', output: '1' },
            { input: '1 2', output: '2' },
            { input: '1 null 2', output: '2' },
            { input: '1 2 3', output: '2' },
            { input: '1 2 3 4 5', output: '2' },
            { input: '1 2 null 3 null 4', output: '4' },
            { input: '1 2 3 4 5 6 7', output: '3' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) { return nullptr; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
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

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}

int minDepth(TreeNode* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    if (!root->left) return 1 + minDepth(root->right);
    if (!root->right) return 1 + minDepth(root->left);
    return 1 + min(minDepth(root->left), minDepth(root->right));
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << minDepth(root) << "\\n";
    }
    return 0;
}`,
            python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root

def min_depth(root):
    if not root: return 0
    if not root.left and not root.right: return 1
    if not root.left: return 1 + min_depth(root.right)
    if not root.right: return 1 + min_depth(root.left)
    return 1 + min(min_depth(root.left), min_depth(root.right))

def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    print(min_depth(root))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }

    static int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return 1;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            TreeNode root = buildTree(line);
            System.out.println(minDepth(root));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}

fn min_depth(idx: Option<usize>, nodes: &Vec<TreeNode>) -> i32 {
    if let Some(i) = idx {
        let node = &nodes[i];
        if node.left.is_none() && node.right.is_none() {
            return 1;
        }
        if node.left.is_none() {
            return 1 + min_depth(node.right, nodes);
        }
        if node.right.is_none() {
            return 1 + min_depth(node.left, nodes);
        }
        1 + std::cmp::min(min_depth(node.left, nodes), min_depth(node.right, nodes))
    } else {
        0
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        println!("{}", min_depth(root, &nodes));
    }
}`,
        },
    },

    // ==================== MEDIUM #8: Sum Root to Leaf Numbers ====================
    {
        title: 'Sum Root to Leaf Numbers',
        description:
            "You are given the root of a binary tree containing digits from 0 to 9 only.\n\nEach root-to-leaf path in the tree represents a number.\n- For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.\n\nReturn the total sum of all root-to-leaf numbers.\n\nA leaf node is a node with no children.\n\n**Input Format:**\n- A single line containing the BFS level-order representation of the binary tree.\n\n**Output Format:**\n- An integer representing the total sum.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 1000].\n0 <= Node.val <= 9\nThe depth of the tree will not exceed 10.',
        hints: 'Perform a DFS traversal. Keep track of the running number calculated as currentNumber * 10 + node.val. Add this to the sum when reaching a leaf node.',
        editorial:
            '**Approach: DFS Preorder Traversal**\nRecursively pass the cumulative path sum to children. For a node, the path sum is pathSum * 10 + node.val. If it is a leaf, return this path sum. Otherwise, return the sum of the path sums from left and right subtrees.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '1 2 3',
                output: '25',
                explanation: 'Path 1 -> 2 represents 12. Path 1 -> 3 represents 13. Sum = 12 + 13 = 25.',
            },
            {
                title: 'Example 2',
                input: '4 9 0 5 1',
                output: '1026',
                explanation: 'Paths: 4 -> 9 -> 5 (495), 4 -> 9 -> 1 (491), 4 -> 0 (40). Sum = 495 + 491 + 40 = 1026.',
            },
        ],
        testcases: [
            { input: '1 2 3', output: '25' },
            { input: '4 9 0 5 1', output: '1026' },
            { input: '1', output: '1' },
            { input: '1 0', output: '10' },
            { input: '1 null 5', output: '15' },
            { input: '9 8 7 6 5', output: '2068' },
            { input: '0 1 2', output: '3' },
            { input: '1 2 3 4 5 6 7', output: '522' },
            { input: '5 2 3 null 4', output: '577' },
            { input: '1 2 null 3 null 4 null 5', output: '12345' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) { return nullptr; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
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

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}

int sumNumbers(TreeNode* root, int current = 0) {
    if (!root) return 0;
    current = current * 10 + root->val;
    if (!root->left && !root->right) return current;
    return sumNumbers(root->left, current) + sumNumbers(root->right, current);
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        cout << sumNumbers(root) << "\\n";
    }
    return 0;
}`,
            python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root

def sum_numbers(root, current=0):
    if not root: return 0
    current = current * 10 + root.val
    if not root.left and not root.right: return current
    return sum_numbers(root.left, current) + sum_numbers(root.right, current)

def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    print(sum_numbers(root))

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }

    static int sumNumbers(TreeNode root, int current) {
        if (root == null) return 0;
        current = current * 10 + root.val;
        if (root.left == null && root.right == null) return current;
        return sumNumbers(root.left, current) + sumNumbers(root.right, current);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            TreeNode root = buildTree(line);
            System.out.println(sumNumbers(root, 0));
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}

fn sum_numbers(idx: Option<usize>, nodes: &Vec<TreeNode>, current: i32) -> i32 {
    if let Some(i) = idx {
        let node = &nodes[i];
        let next = current * 10 + node.val;
        if node.left.is_none() && node.right.is_none() {
            return next;
        }
        sum_numbers(node.left, nodes, next) + sum_numbers(node.right, nodes, next)
    } else {
        0
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        println!("{}", sum_numbers(root, &nodes, 0));
    }
}`,
        },
    },

    // ==================== MEDIUM #9: Path Sum III ====================
    {
        title: 'Path Sum III',
        description:
            "Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.\n\nThe path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).\n\n**Input Format:**\n- First line: BFS level-order representation of the binary tree (using 'null' for empty nodes).\n- Second line: The integer targetSum.\n\n**Output Format:**\n- An integer representing the number of paths.",
        difficulty: 'MEDIUM',
        tags: ['tree', 'binary-tree', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [0, 1000].\n-10^9 <= Node.val <= 10^9\n-10^9 <= targetSum <= 10^9',
        hints: 'Use prefix sums to keep track of cumulative sums from the root to the current node. Use a hash map to find the count of sub-paths that sum up to targetSum in O(1) time.',
        editorial:
            '**Approach: Prefix Sum Map with DFS**\nMaintain a hash map of prefix sums encountered on the path from the root to the current node. The map stores prefixSum -> count. At each node, check if currSum - targetSum is in the map and add its frequency to the answer. Recurse to children, then backtrack by decrementing the count of currSum.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '10 5 -3 3 2 null 11 3 -2 null 1\n8',
                output: '3',
                explanation: 'The paths that sum to 8 are: 5 -> 3, 5 -> 2 -> 1, and -3 -> 11.',
            },
            {
                title: 'Example 2',
                input: '5 4 8 11 null 13 4 7 2 null null 5 1\n22',
                output: '3',
                explanation: 'The paths that sum to 22 are: 5 -> 4 -> 11 -> 2, 5 -> 8 -> 4 -> 5, and 8 -> 13 -> 1.',
            },
        ],
        testcases: [
            { input: '10 5 -3 3 2 null 11 3 -2 null 1\n8', output: '3' },
            { input: '5 4 8 11 null 13 4 7 2 null null 5 1\n22', output: '3' },
            { input: 'null\n8', output: '0' },
            { input: '1\n1', output: '1' },
            { input: '1 2\n3', output: '1' },
            { input: '1 2\n2', output: '1' },
            { input: '1 -2 -3\n-1', output: '1' },
            { input: '1 null 2 null 3 null 4 null 5\n3', output: '2' },
            { input: '1 2 3\n5', output: '0' },
            { input: '0 0 0\n0', output: '5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    long long val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(long long x) : val(x) {}
};

TreeNode* buildTree(string line) { return nullptr; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
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

class TreeNode {
    long val; TreeNode left, right;
    TreeNode(long x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i64, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    long long val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(long long x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoll(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoll(v[i])));
        i++;
    }
    return root;
}

void dfs(TreeNode* root, long long currSum, long long targetSum, unordered_map<long long, int>& mp, int& ans) {
    if (!root) return;
    currSum += root->val;
    if (mp.count(currSum - targetSum)) {
        ans += mp[currSum - targetSum];
    }
    mp[currSum]++;
    dfs(root->left, currSum, targetSum, mp, ans);
    dfs(root->right, currSum, targetSum, mp, ans);
    mp[currSum]--;
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        long long targetSum;
        if (cin >> targetSum) {
            unordered_map<long long, int> mp;
            mp[0] = 1;
            int ans = 0;
            dfs(root, 0, targetSum, mp, ans);
            cout << ans << "\\n";
        }
    }
    return 0;
}`,
            python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root

def main():
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        root = build_tree(lines[0])
        targetSum = int(lines[1])
        mp = collections.defaultdict(int)
        mp[0] = 1
        ans = 0
        def dfs(r, currSum):
            nonlocal ans
            if not r: return
            currSum += r.val
            ans += mp[currSum - targetSum]
            mp[currSum] += 1
            dfs(r.left, currSum)
            dfs(r.right, currSum)
            mp[currSum] -= 1
        dfs(root, 0)
        print(ans)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

class TreeNode {
    long val; TreeNode left, right;
    TreeNode(long x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Long.parseLong(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Long.parseLong(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Long.parseLong(t[i])));
            i++;
        }
        return root;
    }

    static int ans = 0;
    static Map<Long, java.lang.Integer> mp = new HashMap<>();

    static void dfs(TreeNode root, long currSum, long targetSum) {
        if (root == null) return;
        currSum += root.val;
        ans += mp.getOrDefault(currSum - targetSum, 0);
        mp.put(currSum, mp.getOrDefault(currSum, 0) + 1);
        dfs(root.left, currSum, targetSum);
        dfs(root.right, currSum, targetSum);
        mp.put(currSum, mp.get(currSum) - 1);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        String line2 = br.readLine();
        if (line1 != null && line2 != null) {
            TreeNode root = buildTree(line1);
            long targetSum = Long.parseLong(line2.trim());
            ans = 0;
            mp.clear();
            mp.put(0L, 1);
            dfs(root, 0L, targetSum);
            System.out.println(ans);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};
use std::collections::HashMap;

struct TreeNode { val: i64, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}

fn dfs(idx: Option<usize>, nodes: &Vec<TreeNode>, curr_sum: i64, target_sum: i64, mp: &mut HashMap<i64, i32>, ans: &mut i32) {
    if let Some(i) = idx {
        let node = &nodes[i];
        let next_sum = curr_sum + node.val;
        if let Some(&count) = mp.get(&(next_sum - target_sum)) {
            *ans += count;
        }
        *mp.entry(next_sum).or_insert(0) += 1;
        dfs(node.left, nodes, next_sum, target_sum, mp, ans);
        dfs(node.right, nodes, next_sum, target_sum, mp, ans);
        if let Some(count) = mp.get_mut(&next_sum) {
            *count -= 1;
        }
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line1)) = lines.next() {
        if let Some(Ok(line2)) = lines.next() {
            let (nodes, root) = build_tree(&line1);
            let target_sum: i64 = line2.trim().parse().unwrap();
            let mut mp = HashMap::new();
            mp.insert(0, 1);
            let mut ans = 0;
            dfs(root, &nodes, 0, target_sum, &mut mp, &mut ans);
            println!("{}", ans);
        }
    }
}`,
        },
    },

    // ==================== HARD #7: Maximum Sum BST in Binary Tree ====================
    {
        title: 'Maximum Sum BST in Binary Tree',
        description:
            "Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).\n\nA Binary Search Tree (BST) is defined as:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\nNote: An empty tree is a BST, so the maximum sum of a BST subtree will be at least 0.\n\n**Input Format:**\n- A single line containing the BFS level-order serialization of the tree (using 'null' for empty nodes).\n\n**Output Format:**\n- An integer representing the maximum sum.",
        difficulty: 'HARD',
        tags: ['tree', 'binary-tree', 'dynamic-programming', 'dfs'],
        constraints:
            'The number of nodes in the tree is in the range [1, 4 * 10^4].\n-4 * 10^4 <= Node.val <= 4 * 10^4',
        hints: 'Perform a postorder traversal. For each node, verify if its left and right subtrees are BSTs, and if root.val is strictly greater than the maximum value in the left subtree and strictly less than the minimum value in the right subtree.',
        editorial:
            '**Approach: Postorder Traversal (Tree DP)**\nFor each subtree, return a tuple: (isBST, minVal, maxVal, sum). A subtree is a BST if both children are BSTs and the node value is strictly between the left max and right min. If valid, update the global maximum sum. Recursively build the results bottom-up.\nTime Complexity: O(N)\nSpace Complexity: O(H) where H is the height of the tree.',
        examples: [
            {
                title: 'Example 1',
                input: '1 4 3 2 4 2 5 null null null null null null 4 6',
                output: '20',
                explanation: 'The subtree rooted at 3 is a BST with keys [2, 3, 4, 5, 6], giving sum 2 + 3 + 4 + 5 + 6 = 20.',
            },
            {
                title: 'Example 2',
                input: '4 3 null 1 2',
                output: '2',
                explanation: 'The leaf node with value 2 is the maximum sum BST.',
            },
        ],
        testcases: [
            { input: '1 4 3 2 4 2 5 null null null null null null 4 6', output: '20' },
            { input: '4 3 null 1 2', output: '2' },
            { input: '-4 -2 -5', output: '0' },
            { input: '2 1 3', output: '6' },
            { input: '5 4 8 3 null 6 3', output: '7' },
            { input: '1', output: '1' },
            { input: '-10', output: '0' },
            { input: '10 5 15 1 8 null 7', output: '14' },
            { input: '2 4 1', output: '4' },
            { input: '10 2 3 null null 4 5', output: '5' },
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) { return nullptr; }

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
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

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) { return null; }
    public static void main(String[] args) throws Exception {
        // Read input and solve
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) { (vec![], None) }

fn main() {
    // Read input and solve
}`,
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int x) : val(x) {}
};

TreeNode* buildTree(string line) {
    stringstream ss(line); string val; vector<string> v;
    while (ss >> val) v.push_back(val);
    if (v.empty() || v[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(v[0]));
    queue<TreeNode*> q; q.push(root);
    for (size_t i = 1; i < v.size() && !q.empty(); ) {
        TreeNode* curr = q.front(); q.pop();
        if (v[i] != "null") q.push(curr->left = new TreeNode(stoi(v[i])));
        i++;
        if (i < v.size() && v[i] != "null") q.push(curr->right = new TreeNode(stoi(v[i])));
        i++;
    }
    return root;
}

struct SubtreeInfo {
    bool isBST;
    int minVal;
    int maxVal;
    int sum;
};

int maxSum = 0;

SubtreeInfo solveBST(TreeNode* root) {
    if (!root) {
        return {true, INT_MAX, INT_MIN, 0};
    }
    auto left = solveBST(root->left);
    auto right = solveBST(root->right);
    if (left.isBST && right.isBST && root->val > left.maxVal && root->val < right.minVal) {
        int currSum = left.sum + right.sum + root->val;
        maxSum = max(maxSum, currSum);
        int minV = root->left ? left.minVal : root->val;
        int maxV = root->right ? right.maxVal : root->val;
        return {true, minV, maxV, currSum};
    }
    return {false, 0, 0, 0};
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        maxSum = 0;
        solveBST(root);
        cout << maxSum << "\\n";
    }
    return 0;
}`,
            python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(line):
    t = line.split()
    if not t or t[0] == "null": return None
    root = TreeNode(int(t[0]))
    q = collections.deque([root])
    i = 1
    while q and i < len(t):
        curr = q.popleft()
        if t[i] != "null":
            curr.left = TreeNode(int(t[i]))
            q.append(curr.left)
        i += 1
        if i < len(t) and t[i] != "null":
            curr.right = TreeNode(int(t[i]))
            q.append(curr.right)
        i += 1
    return root

def main():
    line = sys.stdin.readline().strip()
    root = build_tree(line)
    max_sum = 0
    def solve(r):
        nonlocal max_sum
        if not r:
            return (True, float('inf'), float('-inf'), 0)
        left_bst, left_min, left_max, left_sum = solve(r.left)
        right_bst, right_min, right_max, right_sum = solve(r.right)
        if left_bst and right_bst and left_max < r.val < right_min:
            curr_sum = left_sum + right_sum + r.val
            max_sum = max(max_sum, curr_sum)
            min_v = left_min if r.left else r.val
            max_v = right_max if r.right else r.val
            return (True, min_v, max_v, curr_sum)
        return (False, 0, 0, 0)
    solve(root)
    print(max_sum)

if __name__ == "__main__":
    main()`,
            java: `import java.io.*;
import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    static TreeNode buildTree(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] t = line.trim().split("\\\\s+");
        if (t.length == 0 || t[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(t[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < t.length) {
            TreeNode curr = q.poll();
            if (i < t.length && !t[i].equals("null")) q.offer(curr.left = new TreeNode(Integer.parseInt(t[i])));
            i++;
            if (i < t.length && !t[i].equals("null")) q.offer(curr.right = new TreeNode(Integer.parseInt(t[i])));
            i++;
        }
        return root;
    }

    static class SubtreeInfo {
        boolean isBST;
        int minVal;
        int maxVal;
        int sum;
        SubtreeInfo(boolean isBST, int minVal, int maxVal, int sum) {
            this.isBST = isBST;
            this.minVal = minVal;
            this.maxVal = maxVal;
            this.sum = sum;
        }
    }

    static int maxSum = 0;

    static SubtreeInfo solve(TreeNode r) {
        if (r == null) {
            return new SubtreeInfo(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0);
        }
        SubtreeInfo left = solve(r.left);
        SubtreeInfo right = solve(r.right);
        if (left.isBST && right.isBST && r.val > left.maxVal && r.val < right.minVal) {
            int currSum = left.sum + right.sum + r.val;
            maxSum = Math.max(maxSum, currSum);
            int minV = r.left != null ? left.minVal : r.val;
            int maxV = r.right != null ? right.maxVal : r.val;
            return new SubtreeInfo(true, minV, maxV, currSum);
        }
        return new SubtreeInfo(false, 0, 0, 0);
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            TreeNode root = buildTree(line);
            maxSum = 0;
            solve(root);
            System.out.println(maxSum);
        }
    }
}`,
            rust: `use std::io::{self, BufRead};

struct TreeNode { val: i32, left: Option<usize>, right: Option<usize> }

fn build_tree(line: &str) -> (Vec<TreeNode>, Option<usize>) {
    let t: Vec<&str> = line.split_whitespace().collect();
    if t.is_empty() || t[0] == "null" { return (vec![], None); }
    let mut nodes = vec![TreeNode { val: t[0].parse().unwrap(), left: None, right: None }];
    let mut q = std::collections::VecDeque::new(); q.push_back(0);
    let mut i = 1;
    while !q.is_empty() && i < t.len() {
        let curr = q.pop_front().unwrap();
        if t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].left = Some(idx); q.push_back(idx);
        }
        i += 1;
        if i < t.len() && t[i] != "null" {
            let idx = nodes.len();
            nodes.push(TreeNode { val: t[i].parse().unwrap(), left: None, right: None });
            nodes[curr].right = Some(idx); q.push_back(idx);
        }
        i += 1;
    }
    (nodes, Some(0))
}

struct SubtreeInfo {
    is_bst: bool,
    min_val: i32,
    max_val: i32,
    sum: i32,
}

fn solve(idx: Option<usize>, nodes: &Vec<TreeNode>, max_sum: &mut i32) -> SubtreeInfo {
    if let Some(i) = idx {
        let node = &nodes[i];
        let left = solve(node.left, nodes, max_sum);
        let right = solve(node.right, nodes, max_sum);
        if left.is_bst && right.is_bst && node.val > left.max_val && node.val < right.min_val {
            let curr_sum = left.sum + right.sum + node.val;
            *max_sum = std::cmp::max(*max_sum, curr_sum);
            let min_v = if node.left.is_some() { left.min_val } else { node.val };
            let max_v = if node.right.is_some() { right.max_val } else { node.val };
            SubtreeInfo {
                is_bst: true,
                min_val: min_v,
                max_val: max_v,
                sum: curr_sum,
            }
        } else {
            SubtreeInfo {
                is_bst: false,
                min_val: 0,
                max_val: 0,
                sum: 0,
            }
        }
    } else {
        SubtreeInfo {
            is_bst: true,
            min_val: i32::MAX,
            max_val: i32::MIN,
            sum: 0,
        }
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    if let Some(Ok(line)) = lines.next() {
        let (nodes, root) = build_tree(&line);
        let mut max_sum = 0;
        solve(root, &nodes, &mut max_sum);
        println!("{}", max_sum);
    }
}`,
        },
    },
]
