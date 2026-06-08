import type { SeedProblem } from './types.js'

export const treesProblems: SeedProblem[] = [
    // ==================== EASY #1: Inorder Traversal ====================
    {
        title: "Binary Tree Inorder Traversal",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.\n\n**Input Format:**\n- A single line containing the level-order BFS traversal of the binary tree (using 'null' for empty nodes).\n\n**Output Format:**\n- A single line of space-separated integers representing the inorder traversal of the tree.",
        difficulty: "EASY",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [0, 1000].\n-1000 <= Node.val <= 1000",
        hints: "Inorder traversal visits nodes in the order: Left, Root, Right. You can implement this recursively or iteratively with a stack.",
        editorial: "**Approach: Recursive DFS**\nVisit the left child, record the root value, and then visit the right child.\nTime Complexity: O(N)\nSpace Complexity: O(N) auxiliary space.",
        examples: [
            { title: "Example 1", input: "1 null 2 3", output: "1 3 2", explanation: "1 is root. Its left is null, right is 2. 2's left is 3. Inorder is 1 -> 3 -> 2." },
            { title: "Example 2", input: "1 2 3 4 5 null 6", output: "4 2 5 1 3 6" }
        ],
        testcases: [
            { input: "1 null 2 3", output: "1 3 2" },
            { input: "1 2 3 4 5 null 6", output: "4 2 5 1 3 6" },
            { input: "null", output: "" },
            { input: "1", output: "1" },
            { input: "1 2", output: "2 1" },
            { input: "1 null 2", output: "1 2" },
            { input: "1 2 3", output: "2 1 3" },
            { input: "1 2 3 4 5 6 7", output: "4 2 5 1 6 3 7" },
            { input: "10 -20 30", output: "-20 10 30" },
            { input: "5 4 null 3 null 2 null 1", output: "1 2 3 4 5" }
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
}`
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
}`
        }
    },

    // ==================== EASY #2: Max Depth of Binary Tree ====================
    {
        title: "Maximum Depth of Binary Tree",
        description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- An integer representing the maximum depth.",
        difficulty: "EASY",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100",
        hints: "The maximum depth of a tree is 1 + max(depth(left), depth(right)). Check base case for empty root.",
        editorial: "**Approach: DFS Recursion**\nRecursively compute depth of left and right subtrees. Maximum depth is the max of the two plus one.\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion stack where H is tree height.",
        examples: [
            { title: "Example 1", input: "3 9 20 null null 15 7", output: "3", explanation: "Root 3 (level 1), Children 9 and 20 (level 2), 20's children 15 and 7 (level 3). Max depth is 3." },
            { title: "Example 2", input: "1 null 2", output: "2" }
        ],
        testcases: [
            { input: "3 9 20 null null 15 7", output: "3" },
            { input: "1 null 2", output: "2" },
            { input: "null", output: "0" },
            { input: "1", output: "1" },
            { input: "1 2 3 4 null null null 5", output: "4" },
            { input: "1 2 3 4 5 6 7", output: "3" },
            { input: "0", output: "1" },
            { input: "1 2 null 3 null 4 null 5", output: "5" },
            { input: "1 null 2 null 3 null 4", output: "4" },
            { input: "1 2 3", output: "2" }
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
}`
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
}`
        }
    },

    // ==================== EASY #3: Same Tree ====================
    {
        title: "Same Tree",
        description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\n\n**Input Format:**\n- First line: BFS representation of the first tree p.\n- Second line: BFS representation of the second tree q.\n\n**Output Format:**\n- 'true' or 'false' (lowercase string).",
        difficulty: "EASY",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in both trees is in the range [0, 1000].\n-10^4 <= Node.val <= 10^4",
        hints: "Use recursion. If both nodes are null, they are identical. If only one is null, or values differ, they are not.",
        editorial: "**Approach: Recursion**\nTwo nodes p and q are identical if p.val == q.val and isSame(p.left, q.left) and isSame(p.right, q.right).\nTime Complexity: O(N)\nSpace Complexity: O(H) recursion space.",
        examples: [
            { title: "Example 1", input: "1 2 3\n1 2 3", output: "true", explanation: "Both trees are structurally identical with identical node values." },
            { title: "Example 2", input: "1 2\n1 null 2", output: "false" }
        ],
        testcases: [
            { input: "1 2 3\n1 2 3", output: "true" },
            { input: "1 2\n1 null 2", output: "false" },
            { input: "null\nnull", output: "true" },
            { input: "1\n1", output: "true" },
            { input: "1 2 3\n1 3 2", output: "false" },
            { input: "1 null 2\n1 null 2", output: "true" },
            { input: "1 2 null\n1 null 2", output: "false" },
            { input: "10 5 15\n10 5 15", output: "true" },
            { input: "1 2 3 4\n1 2 3 null", output: "false" },
            { input: "5 4 6 null null 3 7\n5 4 6 null null 3 7", output: "true" }
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
}`
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
}`
        }
    },

    // ==================== EASY #4: Symmetric Tree ====================
    {
        title: "Symmetric Tree",
        description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- 'true' or 'false'.",
        difficulty: "EASY",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [1, 1000].\n-100 <= Node.val <= 100",
        hints: "A tree is symmetric if the left subtree is a mirror reflection of the right subtree.",
        editorial: "**Approach: DFS Mirror Check**\nTwo trees are mirrors of each other if:\n1. Their roots have same value.\n2. Left child of each is mirror of right child of other.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "1 2 2 3 4 4 3", output: "true", explanation: "Mirror match at every level: Left [2,3,4] and Right [2,4,3] reflect perfectly." },
            { title: "Example 2", input: "1 2 2 null 3 null 3", output: "false" }
        ],
        testcases: [
            { input: "1 2 2 3 4 4 3", output: "true" },
            { input: "1 2 2 null 3 null 3", output: "false" },
            { input: "1", output: "true" },
            { input: "1 2 2", output: "true" },
            { input: "1 2 3", output: "false" },
            { input: "1 2 2 3 null null 3", output: "true" },
            { input: "1 2 2 null 3 3", output: "true" },
            { input: "1 2 2 null 3 4 null", output: "false" },
            { input: "1 2 2 3 4 3 4", output: "false" },
            { input: "2 3 3 4 5 5 4", output: "true" }
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
}`
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
}`
        }
    },

    // ==================== EASY #5: Invert Binary Tree ====================
    {
        title: "Invert Binary Tree",
        description: "Given the root of a binary tree, invert the tree, and return its level-order BFS serialization.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- The BFS representation of the inverted tree (omitting trailing nulls).",
        difficulty: "EASY",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [0, 1000].\n-100 <= Node.val <= 100",
        hints: "Inverting a tree means swapping the left and right children recursively for all nodes.",
        editorial: "**Approach: Recursion / DFS**\nFor each node, swap its left and right children, then recursively invert left and right subtrees.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1", explanation: "For root 4, children 2 and 7 are swapped to 7 and 2. Their children are swapped similarly." },
            { title: "Example 2", input: "2 1 3", output: "2 3 1" }
        ],
        testcases: [
            { input: "4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1" },
            { input: "2 1 3", output: "2 3 1" },
            { input: "null", output: "null" },
            { input: "1", output: "1" },
            { input: "1 2", output: "1 null 2" },
            { input: "1 null 2", output: "1 2" },
            { input: "3 1 2", output: "3 2 1" },
            { input: "4 2 7 1 null null 9", output: "4 7 2 9 null null 1" },
            { input: "1 2 3 4 5 6 7", output: "1 3 2 7 6 5 4" },
            { input: "10 20 30 40 null null 50", output: "10 30 20 50 null null 40" }
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
}`
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
}`
        }
    },

    // ==================== MEDIUM #1: Binary Tree Level Order Traversal ====================
    {
        title: "Binary Tree Level Order Traversal",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level), printing each level's values on a new line.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines, where each line contains space-separated integers representing nodes at that level.",
        difficulty: "MEDIUM",
        tags: ["tree", "binary-tree", "bfs"],
        constraints: "The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000",
        hints: "Use a queue to process level by level. Track the size of the queue at the start of each level.",
        editorial: "**Approach: BFS Level by Level**\nUse a queue. For each level, determine its size. Dequeue this many elements and enqueue their children. Print values separated by spaces.\nTime Complexity: O(N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "3 9 20 null null 15 7", output: "3\n9 20\n15 7", explanation: "Level 0: 3. Level 1: 9, 20. Level 2: 15, 7." },
            { title: "Example 2", input: "1", output: "1" }
        ],
        testcases: [
            { input: "3 9 20 null null 15 7", output: "3\n9 20\n15 7" },
            { input: "1", output: "1" },
            { input: "null", output: "" },
            { input: "1 2 3", output: "1\n2 3" },
            { input: "1 2 null 3 null 4", output: "1\n2\n3\n4" },
            { input: "1 2 3 4 5 6 7", output: "1\n2 3\n4 5 6 7" },
            { input: "10 -20 -30 null 40", output: "10\n-20 -30\n40" },
            { input: "1 null 2 null 3", output: "1\n2\n3" },
            { input: "5 4 6 3 null null 7", output: "5\n4 6\n3 7" },
            { input: "100 200 300 400 500", output: "100\n200 300\n400 500" }
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
fn main() {}`
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
}`
        }
    },

    // ==================== MEDIUM #2: Validate BST ====================
    {
        title: "Validate Binary Search Tree",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- 'true' or 'false'.",
        difficulty: "MEDIUM",
        tags: ["tree", "binary-search-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
        hints: "Use recursion. Keep track of the valid range (min, max) for node values. Note that node values can be minimum/maximum 32-bit integers, so use 64-bit integer limits for BST range checks.",
        editorial: "**Approach: Recursion with bounds**\nFor each node, we check if its value falls within the open interval `(minVal, maxVal)`. Recursively update limits.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "2 1 3", output: "true", explanation: "Root 2 has left child 1 (< 2) and right child 3 (> 2). Valid BST." },
            { title: "Example 2", input: "5 1 4 null null 3 6", output: "false" }
        ],
        testcases: [
            { input: "2 1 3", output: "true" },
            { input: "5 1 4 null null 3 6", output: "false" },
            { input: "1", output: "true" },
            { input: "1 1", output: "false" },
            { input: "10 5 15 null null 6 20", output: "false" },
            { input: "10 5 15 null null 12 20", output: "true" },
            { input: "2147483647", output: "true" },
            { input: "-2147483648", output: "true" },
            { input: "5 4 6 3 null null 7", output: "true" },
            { input: "3 2 5 1 null 4", output: "true" }
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
fn main() {}`
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
}`
        }
    },

    // ==================== MEDIUM #3: Lowest Common Ancestor ====================
    {
        title: "Lowest Common Ancestor of a Binary Tree",
        description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes, p and q.\n\n**Input Format:**\n- First line: BFS representation of the tree.\n- Second line: Two space-separated integers representing p and q.\n\n**Output Format:**\n- A single integer representing the value of the LCA.",
        difficulty: "MEDIUM",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np and q will exist in the tree and p != q.",
        hints: "Traverse the tree. If the current node is p or q, it is a candidate. If left and right subtrees both return candidates, current is the LCA.",
        editorial: "**Approach: DFS**\nSearch recursively. If left and right subtrees both return non-null, root is LCA. Otherwise, return the non-null subtree result.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", explanation: "LCA of 5 and 1 is 3 since it is the lowest shared ancestor." },
            { title: "Example 2", input: "3 5 1 6 2 0 8 null null 7 4\n5 4", output: "5", explanation: "LCA of 5 and 4 is 5 itself." }
        ],
        testcases: [
            { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3" },
            { input: "3 5 1 6 2 0 8 null null 7 4\n5 4", output: "5" },
            { input: "1 2\n1 2", output: "1" },
            { input: "1 2 3\n2 3", output: "1" },
            { input: "1 2 3 4 5 6 7\n4 5", output: "2" },
            { input: "1 2 3 4 5 6 7\n4 7", output: "1" },
            { input: "1 2 3 4 5 6 7\n6 7", output: "3" },
            { input: "10 -5 20 -10 0\n-10 0", output: "-5" },
            { input: "10 -5 20 -10 0\n-10 20", output: "10" },
            { input: "5 3 6 2 4 null 7\n2 4", output: "3" }
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
fn main() {}`
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
}`
        }
    },

    // ==================== MEDIUM #4: Binary Tree Zigzag Level Order ====================
    {
        title: "Binary Tree Zigzag Level Order Traversal",
        description: "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines containing space-separated integers, representing node values at each level in zigzag fashion.",
        difficulty: "MEDIUM",
        tags: ["tree", "binary-tree", "bfs"],
        constraints: "The number of nodes in the tree is in the range [0, 2000].\n-100 <= Node.val <= 100",
        hints: "This is a BFS variation. Use a boolean flag to track whether to print left-to-right or right-to-left.",
        editorial: "**Approach: BFS with Direction Flip**\nFor each level, store node values in a list. If direction is left-to-right, keep the order. Otherwise, reverse the level array before printing.\nTime Complexity: O(N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "3 9 20 null null 15 7", output: "3\n20 9\n15 7", explanation: "Level 0: 3 (left-to-right). Level 1: 20 9 (reversed). Level 2: 15 7 (left-to-right)." },
            { title: "Example 2", input: "1", output: "1" }
        ],
        testcases: [
            { input: "3 9 20 null null 15 7", output: "3\n20 9\n15 7" },
            { input: "1", output: "1" },
            { input: "null", output: "" },
            { input: "1 2 3 4 5 6 7", output: "1\n3 2\n4 5 6 7" },
            { input: "1 2 null 3 null 4", output: "1\n2\n3\n4" },
            { input: "1 null 2 null 3", output: "1\n2\n3" },
            { input: "10 20 30 40 50 60 70", output: "10\n30 20\n40 50 60 70" },
            { input: "1 2 3", output: "1\n3 2" },
            { input: "5 4 6 3 null null 7", output: "5\n6 4\n3 7" },
            { input: "1 2 3 4 null null 5 6 null null 7", output: "1\n3 2\n4 5\n7 6" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== MEDIUM #5: Construct Tree from Preorder/Inorder ====================
    {
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree (printed as its level-order BFS serialization, omitting trailing nulls).\n\n**Input Format:**\n- First line: integer n (number of nodes)\n- Second line: n space-separated integers representing preorder\n- Third line: n space-separated integers representing inorder\n\n**Output Format:**\n- The BFS representation of the constructed tree.",
        difficulty: "MEDIUM",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "1 <= n <= 3000\n-3000 <= preorder[i], inorder[i] <= 3000\npreorder and inorder consist of unique values.",
        hints: "The first element of preorder is the root. Find its position in inorder to split the left and right subtrees.",
        editorial: "**Approach: Divide and Conquer**\nUse the preorder array to identify root elements, and the inorder array to split the tree into left and right subtrees. Construct recursively.\nTime Complexity: O(N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "5\n3 9 20 15 7\n9 3 15 20 7", output: "3 9 20 null null 15 7", explanation: "3 is root. Left is 9. Right is 20, which has children 15 and 7." },
            { title: "Example 2", input: "1\n-1\n-1", output: "-1" }
        ],
        testcases: [
            { input: "5\n3 9 20 15 7\n9 3 15 20 7", output: "3 9 20 null null 15 7" },
            { input: "1\n-1\n-1", output: "-1" },
            { input: "3\n1 2 3\n2 1 3", output: "1 2 3" },
            { input: "3\n1 2 3\n3 2 1", output: "1 2 null 3" },
            { input: "3\n1 2 3\n1 2 3", output: "1 null 2 null 3" },
            { input: "4\n1 2 4 3\n4 2 1 3", output: "1 2 3 4" },
            { input: "7\n1 2 4 5 3 6 7\n4 2 5 1 6 3 7", output: "1 2 3 4 5 6 7" },
            { input: "5\n1 2 3 4 5\n5 4 3 2 1", output: "1 2 null 3 null 4 null 5" },
            { input: "5\n1 2 3 4 5\n1 2 3 4 5", output: "1 null 2 null 3 null 4 null 5" },
            { input: "6\n10 20 40 50 30 60\n40 20 50 10 30 60", output: "10 20 30 40 50 60" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== HARD #1: Binary Tree Maximum Path Sum ====================
    {
        title: "Binary Tree Maximum Path Sum",
        description: "Given the root of a binary tree, return the maximum path sum of any non-empty path.\n\nA path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path does not need to pass through the root.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- An integer representing the maximum path sum.",
        difficulty: "HARD",
        tags: ["tree", "binary-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000",
        hints: "For each node, compute the maximum path sum starting at this node and going downwards. Keep track of the global maximum sum.",
        editorial: "**Approach: Post-order DFS**\nAt each node, compute the max gain from left and right subtrees. The max path sum through the current node is `Node.val + max(0, leftGain) + max(0, rightGain)`. Update global maximum.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "1 2 3", output: "6", explanation: "The path is 2 -> 1 -> 3, with sum 2 + 1 + 3 = 6." },
            { title: "Example 2", input: "-10 9 20 null null 15 7", output: "42", explanation: "The path is 15 -> 20 -> 7, with sum 15 + 20 + 7 = 42." }
        ],
        testcases: [
            { input: "1 2 3", output: "6" },
            { input: "-10 9 20 null null 15 7", output: "42" },
            { input: "-3", output: "-3" },
            { input: "2 -1", output: "2" },
            { input: "1 -2 3", output: "4" },
            { input: "-2 -1", output: "-1" },
            { input: "5 4 8 11 null 13 4 7 2 null null null 1", output: "48" },
            { input: "1 2 3 4 5 6 7", output: "18" },
            { input: "-10 -20 -30", output: "-10" },
            { input: "10 2 10 -20 1 20", output: "43" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== HARD #2: Serialize and Deserialize Binary Tree ====================
    {
        title: "Serialize and Deserialize Binary Tree",
        description: "Given a space-separated string representing the preorder DFS serialization of a binary tree (using 'null' for empty nodes), deserialize the string to construct the tree and then print the BFS level-order serialization of the tree (omitting trailing nulls).\n\n**Input Format:**\n- A single line of space-separated strings containing the preorder DFS representation of the tree.\n\n**Output Format:**\n- The BFS level-order serialization of the tree (omitting trailing nulls). If the tree is empty, print 'null'.",
        difficulty: "HARD",
        tags: ["tree", "binary-tree", "dfs", "bfs"],
        constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-1000 <= Node.val <= 1000",
        hints: "In preorder DFS, the first node is the root. Recursively deserialize left and right children. If a token is 'null', return a null node.",
        editorial: "**Approach: Preorder DFS Deserialization**\nMaintain a pointer to the current token. Build the tree recursively by populating left and right children in preorder fashion. Then perform BFS to output.\nTime Complexity: O(N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "1 2 null null 3 4 null null 5 null null", output: "1 2 3 null null 4 5", explanation: "Reconstructs root 1, left child 2 (no children), right child 3 (left child 4, right child 5). Prints BFS level order." },
            { title: "Example 2", input: "null", output: "null" }
        ],
        testcases: [
            { input: "1 2 null null 3 4 null null 5 null null", output: "1 2 3 null null 4 5" },
            { input: "null", output: "null" },
            { input: "1 null null", output: "1" },
            { input: "1 2 null null null", output: "1 2" },
            { input: "1 null 2 null null", output: "1 null 2" },
            { input: "1 2 4 null null 5 null null 3 6 null null 7 null null", output: "1 2 3 4 5 6 7" },
            { input: "10 -20 null null 30 null null", output: "10 -20 30" },
            { input: "1 2 3 4 null null null null null", output: "1 2 null 3 null 4" },
            { input: "5 4 3 2 1 null null null null null null", output: "5 4 null 3 null 2 null 1" },
            { input: "10 20 40 null null 50 null null 30 null 60 null null", output: "10 20 30 40 50 null 60" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== HARD #3: Vertical Order Traversal ====================
    {
        title: "Vertical Order Traversal of a Binary Tree",
        description: "Given the root of a binary tree, return the vertical order traversal of its nodes' values.\n\nFor each node at position (row, col), its left child is at (row + 1, col - 1) and its right child is at (row + 1, col + 1). The root is at (0, 0). The vertical order traversal should be grouped by column from left to right. If multiple nodes are in the same row and column, they must be sorted in ascending order of their values.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- Multiple lines. Each line contains space-separated integers representing a single column, ordered from leftmost to rightmost column.",
        difficulty: "HARD",
        tags: ["tree", "binary-tree", "dfs", "bfs"],
        constraints: "The number of nodes in the tree is in the range [0, 1000].\n0 <= Node.val <= 1000",
        hints: "Use BFS/DFS to assign coordinates (row, col) to each node. Sort the nodes by column first, then row, then value.",
        editorial: "**Approach: Coordinate BFS & Sort**\nPerform BFS while tracking coordinates `(row, col)` for each node. Group and sort coordinates first by column ascending, then row ascending, then value ascending.\nTime Complexity: O(N log N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "3 9 20 null null 15 7", output: "9\n3 15\n20\n7", explanation: "Col -1: [9] at (1, -1). Col 0: [3, 15] at (0, 0) and (2, 0). Col 1: [20] at (1, 1). Col 2: [7] at (2, 2)." },
            { title: "Example 2", input: "1 2 3 4 6 5 7", output: "4\n2\n1 5 6\n3\n7", explanation: "Both 5 and 6 end up at col 0, row 2. They are sorted as 5, 6." }
        ],
        testcases: [
            { input: "3 9 20 null null 15 7", output: "9\n3 15\n20\n7" },
            { input: "1 2 3 4 6 5 7", output: "4\n2\n1 5 6\n3\n7" },
            { input: "null", output: "" },
            { input: "1", output: "1" },
            { input: "3 9 8 4 0 1 7", output: "4\n9\n3 0 1\n8\n7" },
            { input: "3 9 8 4 0 1 7 null null null 2 2", output: "4\n9 2\n3 0 1\n8 2\n7" },
            { input: "1 2 3 null 4 5 null null null null 6", output: "2\n1 4 5\n3 6" },
            { input: "1 2 3 4 5", output: "4\n2\n1 5\n3" },
            { input: "1 2 3 null null 4 5", output: "2\n1 4\n3\n5" },
            { input: "20 10 30 null 15 25 35", output: "10\n20 15 25\n30\n35" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== HARD #4: Populating Next Right Pointers II ====================
    {
        title: "Populating Next Right Pointers in Each Node II",
        description: "Given a binary tree, populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.\n\nInitially, all next pointers are set to NULL. Print the level-by-level traversal using these next pointers. For each level, start from the leftmost node and traverse using next until NULL, printing node values space-separated, followed by '#'.\n\n**Input Format:**\n- A single line of BFS representation of the tree.\n\n**Output Format:**\n- A single line of space-separated node values and '#' symbols showing the levels connected by next pointers.",
        difficulty: "HARD",
        tags: ["tree", "binary-tree", "bfs"],
        constraints: "The number of nodes in the tree is in the range [0, 6000].\n-100 <= Node.val <= 100",
        hints: "You can perform a standard level-order BFS traversal, keeping track of the previous node in the same level and pointing its next pointer to the current node.",
        editorial: "**Approach: BFS Level Links**\nTraverse the tree level by level. In each level, set `prev.next = current` for consecutive nodes. Then, traverse using `next` pointers to verify connectivity.\nTime Complexity: O(N)\nSpace Complexity: O(N)",
        examples: [
            { title: "Example 1", input: "1 2 3 4 5 null 7", output: "1 # 2 3 # 4 5 7 #", explanation: "Level 0: 1. Level 1: 2 next is 3. Level 2: 4 next is 5, 5 next is 7." },
            { title: "Example 2", input: "1 2 3 4 null null 5", output: "1 # 2 3 # 4 5 #" }
        ],
        testcases: [
            { input: "1 2 3 4 5 null 7", output: "1 # 2 3 # 4 5 7 #" },
            { input: "1 2 3 4 null null 5", output: "1 # 2 3 # 4 5 #" },
            { input: "null", output: "" },
            { input: "1", output: "1 #" },
            { input: "1 2", output: "1 # 2 #" },
            { input: "1 null 2", output: "1 # 2 #" },
            { input: "1 2 3", output: "1 # 2 3 #" },
            { input: "1 2 3 4 5 6 7", output: "1 # 2 3 # 4 5 6 7 #" },
            { input: "1 2 3 4 null null 5 6 null null 7", output: "1 # 2 3 # 4 5 # 6 7 #" },
            { input: "1 2 3 null 4 5 null 6 null null 7", output: "1 # 2 3 # 4 5 # 6 7 #" }
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
            rust: `fn main() {}`
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
}`
        }
    },

    // ==================== HARD #5: Recover BST ====================
    {
        title: "Recover Binary Search Tree",
        description: "You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.\n\nPrint the level-order BFS traversal of the recovered BST (omitting trailing nulls).\n\n**Input Format:**\n- A single line of BFS representation of the broken BST.\n\n**Output Format:**\n- The BFS representation of the recovered BST.",
        difficulty: "HARD",
        tags: ["tree", "binary-search-tree", "dfs"],
        constraints: "The number of nodes in the tree is in the range [2, 1000].\n-2^31 <= Node.val <= 2^31 - 1",
        hints: "An inorder traversal of a BST should be sorted. Find the two nodes where the sorted order is violated, and swap their values back.",
        editorial: "**Approach: Inorder Traversal Swaps**\nPerform inorder traversal to find elements that are smaller than their predecessor. Swap values of the first and second anomalies.\nTime Complexity: O(N)\nSpace Complexity: O(H)",
        examples: [
            { title: "Example 1", input: "1 3 null null 2", output: "3 1 null null 2", explanation: "Inorder: [3, 2, 1]. Swapping 3 and 1 gives sorted [1, 2, 3]." },
            { title: "Example 2", input: "3 1 4 null null 2", output: "2 1 4 null null 3" }
        ],
        testcases: [
            { input: "1 3 null null 2", output: "3 1 null null 2" },
            { input: "3 1 4 null null 2", output: "2 1 4 null null 3" },
            { input: "2 3 1", output: "2 1 3" },
            { input: "4 2 6 1 5 3 7", output: "4 2 6 1 3 5 7" },
            { input: "10 15 20 5 12 17 25", output: "15 10 20 5 12 17 25" },
            { input: "3 null 2 null 1", output: "1 null 2 null 3" },
            { input: "1 2 3", output: "2 1 3" },
            { input: "2 3 1", output: "2 1 3" },
            { input: "4 1 6 2 3 5 7", output: "4 2 6 1 3 5 7" },
            { input: "2 1 3", output: "2 1 3" }
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
            rust: `fn main() {}`
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
}`
        }
    }
]
