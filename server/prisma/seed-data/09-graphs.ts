import type { SeedProblem } from './types.js'

export const graphsProblems: SeedProblem[] = [
    // ==================== EASY ====================
    {
        title: "BFS Traversal",
        description: "Given an undirected connected graph with N vertices and M edges, perform a Breadth First Search (BFS) traversal starting from vertex 0.\n\nTo make the traversal deterministic, when visiting the neighbors of any vertex, visit them in ascending order of their vertex IDs.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (undirected edge between u and v)\n\n**Output Format:**\n- A single line of space-separated integers representing the BFS traversal.",
        difficulty: "EASY",
        tags: ["graphs", "bfs"],
        constraints: "1 <= N <= 1000\n0 <= M <= 10000",
        hints: "Use a queue and visit neighbors in sorted order.",
        editorial: "Start BFS at vertex 0. Sort neighbors to ensure deterministic order. Time: O(N + M).",
        examples: [
            { title: "Example 1", input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 2 3 4" },
            { title: "Example 2", input: "4 4\n0 1\n0 2\n1 2\n2 3", output: "0 1 2 3" }
        ],
        testcases: [
            { input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 2 3 4" },
            { input: "4 4\n0 1\n0 2\n1 2\n2 3", output: "0 1 2 3" },
            { input: "1 0", output: "0" },
            { input: "3 2\n0 1\n1 2", output: "0 1 2" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "0 1 2" },
            { input: "5 4\n0 4\n0 3\n0 2\n0 1", output: "0 1 2 3 4" },
            { input: "4 4\n0 1\n1 3\n3 2\n2 0", output: "0 1 2 3" },
            { input: "7 6\n0 1\n0 2\n1 3\n1 4\n2 5\n2 6", output: "0 1 2 3 4 5 6" },
            { input: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3", output: "0 1 2 3" },
            { input: "6 7\n0 4\n0 2\n2 3\n4 3\n4 1\n1 5\n3 5", output: "0 2 4 3 1 5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // Solve BFS Traversal\n    return 0;\n}`,
            python: `def main():\n    # Solve BFS Traversal\n    pass\n\nif __name__ == "__main__":\n    main()`,
            java: `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        // Solve BFS Traversal\n    }\n}`,
            rust: `use std::io::{self, Read};\n\nfn main() {\n    // Solve BFS Traversal\n}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v); adj[v].push_back(u);\n    }\n    for (int i = 0; i < n; i++) sort(adj[i].begin(), adj[i].end());\n    vector<int> res; vector<bool> vis(n, false);\n    queue<int> q; q.push(0); vis[0] = true;\n    while (!q.empty()) {\n        int u = q.front(); q.pop(); res.push_back(u);\n        for (int v : adj[u]) {\n            if (!vis[v]) { vis[v] = true; q.push(v); }\n        }\n    }\n    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");\n    cout << "\\n";\n}`,
            python: `import sys\nfrom collections import deque\ndef main():\n    input = sys.stdin.read\n    data = input().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    adj = [[] for _ in range(n)]\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        adj[u].append(v); adj[v].append(u)\n        idx += 2\n    for i in range(n): adj[i].sort()\n    res, vis, q = [], [False] * n, deque([0])\n    vis[0] = True\n    while q:\n        u = q.popleft()\n        res.append(u)\n        for v in adj[u]:\n            if not vis[v]:\n                vis[v] = True\n                q.append(v)\n    print(*(res))\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        for (int i = 0; i < n; i++) Collections.sort(adj.get(i));\n        List<Integer> res = new ArrayList<>();\n        boolean[] vis = new boolean[n];\n        Queue<Integer> q = new LinkedList<>();\n        q.add(0); vis[0] = true;\n        while (!q.isEmpty()) {\n            int u = q.poll(); res.add(u);\n            for (int v : adj.get(u)) {\n                if (!vis[v]) { vis[v] = true; q.add(v); }\n            } \n        }\n        for (int i = 0; i < res.size(); i++) {\n            System.out.print(res.get(i) + (i + 1 == res.size() ? "" : " "));\n        }\n        System.out.println();\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut adj = vec![vec![]; n];\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            adj[u].push(v); adj[v].push(u);\n        }\n        for i in 0..n { adj[i].sort(); }\n        let mut res = Vec::new();\n        let mut vis = vec![false; n];\n        let mut q = VecDeque::new();\n        q.push_back(0); vis[0] = true;\n        while let Some(u) = q.pop_front() {\n            res.push(u);\n            for &v in &adj[u] {\n                if !vis[v] { vis[v] = true; q.push_back(v); }\n            }\n        }\n        let out: Vec<String> = res.iter().map(|x| x.to_string()).collect();\n        println!("{}", out.join(" "));\n    }\n}`
        }
    },
    {
        title: "DFS Traversal",
        description: "Given an undirected connected graph with N vertices and M edges, perform a Depth First Search (DFS) traversal starting from vertex 0.\n\nTo make the traversal deterministic, when visiting the neighbors of any vertex, visit them in ascending order of their vertex IDs.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (undirected edge between u and v)\n\n**Output Format:**\n- A single line of space-separated integers representing the DFS traversal.",
        difficulty: "EASY",
        tags: ["graphs", "dfs"],
        constraints: "1 <= N <= 1000\n0 <= M <= 10000",
        hints: "Use recursion or stack, sort adjacency lists first.",
        editorial: "Traverse using recursive DFS. Ensure neighbors are sorted.",
        examples: [
            { title: "Example 1", input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 3 2 4" },
            { title: "Example 2", input: "4 4\n0 1\n0 2\n1 2\n2 3", output: "0 1 2 3" }
        ],
        testcases: [
            { input: "5 4\n0 1\n0 2\n1 3\n2 4", output: "0 1 3 2 4" },
            { input: "4 4\n0 1\n0 2\n1 2\n2 3", output: "0 1 2 3" },
            { input: "1 0", output: "0" },
            { input: "3 2\n0 1\n1 2", output: "0 1 2" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "0 1 2" },
            { input: "5 4\n0 4\n0 3\n0 2\n0 1", output: "0 1 2 3 4" },
            { input: "4 4\n0 1\n1 3\n3 2\n2 0", output: "0 1 3 2" },
            { input: "7 6\n0 1\n0 2\n1 3\n1 4\n2 5\n2 6", output: "0 1 3 4 2 5 6" },
            { input: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3", output: "0 1 2 3" },
            { input: "6 7\n0 4\n0 2\n2 3\n4 3\n4 1\n1 5\n3 5", output: "0 2 3 4 1 5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // DFS starter code\n    return 0;\n}`,
            python: `def main():\n    pass\n\nif __name__ == "__main__":\n    main()`,
            java: `public class Main {\n    public static void main(String[] args) {\n    }\n}`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nvoid dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis, vector<int>& res) {\n    vis[u] = true; res.push_back(u);\n    for (int v : adj[u]) { if (!vis[v]) dfs(v, adj, vis, res); }\n}\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v); adj[v].push_back(u);\n    }\n    for (int i = 0; i < n; i++) sort(adj[i].begin(), adj[i].end());\n    vector<int> res; vector<bool> vis(n, false);\n    dfs(0, adj, vis, res);\n    for (int i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");\n    cout << "\\n";\n}`,
            python: `import sys\nsys.setrecursionlimit(2000)\ndef dfs(u, adj, vis, res):\n    vis[u] = True; res.append(u)\n    for v in adj[u]:\n        if not vis[v]: dfs(v, adj, vis, res)\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    adj = [[] for _ in range(n)]\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        adj[u].append(v); adj[v].append(u)\n        idx += 2\n    for i in range(n): adj[i].sort()\n    res, vis = [], [False] * n\n    dfs(0, adj, vis, res)\n    print(*(res))\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    static void dfs(int u, List<List<Integer>> adj, boolean[] vis, List<Integer> res) {\n        vis[u] = true; res.add(u);\n        for (int v : adj.get(u)) { if (!vis[v]) dfs(v, adj, vis, res); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        for (int i = 0; i < n; i++) Collections.sort(adj.get(i));\n        List<Integer> res = new ArrayList<>();\n        boolean[] vis = new boolean[n];\n        dfs(0, adj, vis, res);\n        for (int i = 0; i < res.size(); i++) {\n            System.out.print(res.get(i) + (i + 1 == res.size() ? "" : " "));\n        }\n        System.out.println();\n    }\n}`,
            rust: `use std::io::{self, Read};\nfn dfs(u: usize, adj: &Vec<Vec<usize>>, vis: &mut Vec<bool>, res: &mut Vec<usize>) {\n    vis[u] = true; res.push(u);\n    for &v in &adj[u] { if !vis[v] { dfs(v, adj, vis, res); } }\n}\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut adj = vec![vec![]; n];\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            adj[u].push(v); adj[v].push(u);\n        }\n        for i in 0..n { adj[i].sort(); }\n        let mut res = Vec::new();\n        let mut vis = vec![false; n];\n        dfs(0, &adj, &mut vis, &mut res);\n        let out: Vec<String> = res.iter().map(|x| x.to_string()).collect();\n        println!("{}", out.join(" "));\n    }\n}`
        }
    },
    {
        title: "Find if Path Exists in Graph",
        description: "Given an undirected graph, determine if there is a valid path from a source vertex to a destination vertex.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v\n- Last line: source destination\n\n**Output Format:**\n- 'true' if path exists, otherwise 'false'.",
        difficulty: "EASY",
        tags: ["graphs", "bfs", "dfs"],
        constraints: "1 <= N <= 10^5\n0 <= M <= 2 * 10^5",
        hints: "Use BFS/DFS traversal.",
        editorial: "BFS from source. Return true if dest is reached.",
        examples: [
            { title: "Example 1", input: "3 2\n0 1\n1 2\n0 2", output: "true" },
            { title: "Example 2", input: "6 5\n0 1\n0 2\n3 5\n5 4\n4 3\n0 5", output: "false" }
        ],
        testcases: [
            { input: "3 2\n0 1\n1 2\n0 2", output: "true" },
            { input: "6 5\n0 1\n0 2\n3 5\n5 4\n4 3\n0 5", output: "false" },
            { input: "1 0\n0 0", output: "true" },
            { input: "2 0\n0 1", output: "false" },
            { input: "2 1\n0 1\n0 1", output: "true" },
            { input: "4 4\n0 1\n1 2\n2 3\n3 0\n0 3", output: "true" },
            { input: "5 3\n0 1\n1 2\n3 4\n0 4", output: "false" },
            { input: "5 4\n0 1\n1 2\n2 3\n3 4\n0 4", output: "true" },
            { input: "7 6\n0 1\n1 2\n2 3\n3 4\n4 5\n5 6\n0 6", output: "true" },
            { input: "6 4\n0 1\n1 2\n2 0\n3 4\n0 5", output: "false" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v); adj[v].push_back(u);\n    }\n    int src, dst; cin >> src >> dst;\n    if (src == dst) { cout << "true\\n"; return 0; }\n    vector<bool> vis(n, false);\n    queue<int> q; q.push(src); vis[src] = true;\n    bool found = false;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        if (u == dst) { found = true; break; }\n        for (int v : adj[u]) {\n            if (!vis[v]) { vis[v] = true; q.push(v); }\n        }\n    }\n    cout << (found ? "true" : "false") << "\\n";\n}`,
            python: `import sys\nfrom collections import deque\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    adj = [[] for _ in range(n)]\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        adj[u].append(v); adj[v].append(u)\n        idx += 2\n    src, dst = int(data[idx]), int(data[idx+1])\n    if src == dst:\n        print("true"); return\n    vis, q = [False] * n, deque([src])\n    vis[src] = True\n    found = False\n    while q:\n        u = q.popleft()\n        if u == dst:\n            found = True; break\n        for v in adj[u]:\n            if not vis[v]:\n                vis[v] = True; q.append(v)\n    print("true" if found else "false")\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        int src = sc.nextInt(), dst = sc.nextInt();\n        if (src == dst) { System.out.println("true"); return; }\n        boolean[] vis = new boolean[n];\n        Queue<Integer> q = new LinkedList<>();\n        q.add(src); vis[src] = true;\n        boolean found = false;\n        while (!q.isEmpty()) {\n            int u = q.poll();\n            if (u == dst) { found = true; break; }\n            for (int v : adj.get(u)) {\n                if (!vis[v]) { vis[v] = true; q.add(v); }\n            }\n        }\n        System.out.println(found ? "true" : "false");\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut adj = vec![vec![]; n];\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            adj[u].push(v); adj[v].push(u);\n        }\n        let src: usize = words.next().unwrap().parse().unwrap();\n        let dst: usize = words.next().unwrap().parse().unwrap();\n        if src == dst { println!("true"); return; }\n        let mut vis = vec![false; n];\n        let mut q = VecDeque::new();\n        q.push_back(src); vis[src] = true;\n        let mut found = false;\n        while let Some(u) = q.pop_front() {\n            if u == dst { found = true; break; }\n            for &v in &adj[u] {\n                if !vis[v] { vis[v] = true; q.push_back(v); }\n            }\n        }\n        println!("{}", if found { "true" } else { "false" });\n    }\n}`
        }
    },
    {
        title: "Flood Fill Algorithm",
        description: "Given an R x C integer grid representing an image, perform a flood fill starting from (sr, sc) with newColor.\n\n**Input Format:**\n- First line: R C\n- Next R lines: C integers representing the image\n- Last line: sr sc newColor\n\n**Output Format:**\n- R lines of C space-separated integers representing the modified grid.",
        difficulty: "EASY",
        tags: ["graphs", "dfs", "bfs"],
        constraints: "1 <= R, C <= 50",
        hints: "Traverse 4-directionally to color matching adjacent cells.",
        editorial: "Classic BFS starting from (sr, sc). Do not recurse if starting color equals newColor.",
        examples: [
            { title: "Example 1", input: "3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2", output: "2 2 2\n2 2 0\n2 0 1" },
            { title: "Example 2", input: "3 3\n0 0 0\n0 0 0\n0 0 0\n0 0 2", output: "2 2 2\n2 2 2\n2 2 2" }
        ],
        testcases: [
            { input: "3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2", output: "2 2 2\n2 2 0\n2 0 1" },
            { input: "3 3\n0 0 0\n0 0 0\n0 0 0\n0 0 2", output: "2 2 2\n2 2 2\n2 2 2" },
            { input: "1 1\n0\n0 0 0", output: "0" },
            { input: "1 1\n5\n0 0 10", output: "10" },
            { input: "2 2\n1 1\n1 1\n0 0 1", output: "1 1\n1 1" },
            { input: "3 3\n1 0 1\n1 0 1\n1 0 1\n1 1 2", output: "1 2 1\n1 2 1\n1 2 1" },
            { input: "4 4\n1 1 1 0\n0 1 0 0\n1 1 0 1\n0 0 1 1\n0 0 5", output: "5 5 5 0\n0 5 0 0\n1 5 0 1\n0 0 1 1" },
            { input: "1 5\n1 1 2 1 1\n0 1 3", output: "3 3 2 1 1" },
            { input: "5 1\n1\n1\n2\n1\n1\n3 0 9", output: "1\n1\n2\n9\n9" },
            { input: "3 4\n4 4 4 4\n4 0 0 4\n4 4 4 4\n1 1 8", output: "4 4 4 4\n4 8 8 4\n4 4 4 4" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int r, c; if (!(cin >> r >> c)) return 0;\n    vector<vector<int>> g(r, vector<int>(c));\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++) cin >> g[i][j];\n    int sr, sc, newColor; cin >> sr >> sc >> newColor;\n    int orig = g[sr][sc];\n    if (orig != newColor) {\n        queue<pair<int, int>> q; q.push({sr, sc}); g[sr][sc] = newColor;\n        int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};\n        while (!q.empty()) {\n            auto [cr, cc] = q.front(); q.pop();\n            for (int d = 0; d < 4; d++) {\n                int nr = cr + dr[d], nc = cc + dc[d];\n                if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == orig) {\n                    g[nr][nc] = newColor; q.push({nr, nc});\n                }\n            }\n        }\n    }\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cout << g[i][j] << (j + 1 == c ? "" : " ");\n        cout << "\\n";\n    }\n}`,
            python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    r, c = int(data[0]), int(data[1])\n    g = []\n    idx = 2\n    for _ in range(r):\n        g.append([int(x) for x in data[idx:idx+c]])\n        idx += c\n    sr, sc, newColor = int(data[idx]), int(data[idx+1]), int(data[idx+2])\n    orig = g[sr][sc]\n    if orig != newColor:\n        q = [(sr, sc)]\n        g[sr][sc] = newColor\n        while q:\n            cr, cc = q.pop(0)\n            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:\n                nr, nc = cr + dr, cc + dc\n                if 0 <= nr < r and 0 <= nc < c and g[nr][nc] == orig:\n                    g[nr][nc] = newColor; q.append((nr, nc))\n    for row in g: print(*(row))\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] g = new int[r][c];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++) g[i][j] = sc.nextInt();\n        int sr = sc.nextInt(), sCol = sc.nextInt(), newColor = sc.nextInt();\n        int orig = g[sr][sCol];\n        if (orig != newColor) {\n            Queue<int[]> q = new LinkedList<>();\n            q.add(new int[]{sr, sCol}); g[sr][sCol] = newColor;\n            int[] dr = {-1, 1, 0, 0}, dc = {0, 0, -1, 1};\n            while (!q.isEmpty()) {\n                int[] cur = q.poll();\n                for (int d = 0; d < 4; d++) {\n                    int nr = cur[0] + dr[d], nc = cur[1] + dc[d];\n                    if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == orig) {\n                        g[nr][nc] = newColor; q.add(new int[]{nr, nc});\n                    }\n                }\n            }\n        }\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) System.out.print(g[i][j] + (j + 1 == c ? "" : " "));\n            System.out.println();\n        }\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(r_str) = words.next() {\n        let r: usize = r_str.parse().unwrap();\n        let c: usize = words.next().unwrap().parse().unwrap();\n        let mut g = vec![vec![0; c]; r];\n        for i in 0..r {\n            for j in 0..c { g[i][j] = words.next().unwrap().parse().unwrap(); }\n        }\n        let sr: usize = words.next().unwrap().parse().unwrap();\n        let sc: usize = words.next().unwrap().parse().unwrap();\n        let new_color: i32 = words.next().unwrap().parse().unwrap();\n        let orig = g[sr][sc];\n        if orig != new_color {\n            let mut q = VecDeque::new();\n            q.push_back((sr, sc)); g[sr][sc] = new_color;\n            let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];\n            while let Some((cr, cc)) = q.pop_front() {\n                for &(dr, dc) in &dirs {\n                    let nr = cr as i32 + dr;\n                    let nc = cc as i32 + dc;\n                    if nr >= 0 && nr < r as i32 && nc >= 0 && nc < c as i32 {\n                        let nr = nr as usize; let nc = nc as usize;\n                        if g[nr][nc] == orig {\n                            g[nr][nc] = new_color; q.push_back((nr, nc));\n                        }\n                    }\n                }\n            }\n        }\n        for i in 0..r {\n            let row: Vec<String> = g[i].iter().map(|x| x.to_string()).collect();\n            println!("{}", row.join(" "));\n        }\n    }\n}`
        }
    },
    {
        title: "Island Count (Number of Islands)",
        description: "Given an R x C 2D binary grid map of '1's (land) and '0's (water), return the number of islands.\n\n**Input Format:**\n- First line: R C\n- Next R lines: C values (0 or 1)\n\n**Output Format:**\n- A single integer representing the count of islands.",
        difficulty: "EASY",
        tags: ["graphs", "dfs", "bfs"],
        constraints: "1 <= R, C <= 100",
        hints: "Whenever you hit '1', trigger DFS/BFS to turn all connected lands to '0'.",
        editorial: "Traverse the grid. Start BFS/DFS when landing on '1', clear neighbors, increment count.",
        examples: [
            { title: "Example 1", input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" },
            { title: "Example 2", input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3" }
        ],
        testcases: [
            { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" },
            { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3" },
            { input: "1 1\n0", output: "0" },
            { input: "1 1\n1", output: "1" },
            { input: "3 3\n1 1 1\n1 1 1\n1 1 1", output: "1" },
            { input: "3 3\n1 0 0\n0 1 0\n0 0 1", output: "3" },
            { input: "3 3\n1 0 1\n0 1 0\n1 0 1", output: "5" },
            { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1" },
            { input: "5 5\n1 1 0 0 1\n1 0 0 0 0\n0 0 1 0 1\n1 0 1 0 1\n1 0 0 0 1", output: "5" },
            { input: "2 3\n0 0 0\n0 0 0", output: "0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int r, c; if (!(cin >> r >> c)) return 0;\n    vector<vector<int>> g(r, vector<int>(c));\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++) cin >> g[i][j];\n    int count = 0;\n    vector<vector<bool>> vis(r, vector<bool>(c, false));\n    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            if (g[i][j] == 1 && !vis[i][j]) {\n                count++;\n                queue<pair<int, int>> q; q.push({i, j}); vis[i][j] = true;\n                while (!q.empty()) {\n                    auto [cr, cc] = q.front(); q.pop();\n                    for (int d = 0; d < 4; d++) {\n                        int nr = cr + dr[d], nc = cc + dc[d];\n                        if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1 && !vis[nr][nc]) {\n                            vis[nr][nc] = true; q.push({nr, nc});\n                        }\n                    }\n                }\n            }\n        }\n    }\n    cout << count << "\\n";\n}`,
            python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    r, c = int(data[0]), int(data[1])\n    g = []\n    idx = 2\n    for _ in range(r):\n        g.append([int(x) for x in data[idx:idx+c]])\n        idx += c\n    vis = [[False] * c for _ in range(r)]\n    count = 0\n    for i in range(r):\n        for j in range(c):\n            if g[i][j] == 1 and not vis[i][j]:\n                count += 1\n                q = [(i, j)]\n                vis[i][j] = True\n                while q:\n                    cr, cc = q.pop(0)\n                    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:\n                        nr, nc = cr + dr, cc + dc\n                        if 0 <= nr < r and 0 <= nc < c and g[nr][nc] == 1 and not vis[nr][nc]:\n                            vis[nr][nc] = True; q.append((nr, nc))\n    print(count)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] g = new int[r][c];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++) g[i][j] = sc.nextInt();\n        int count = 0;\n        boolean[][] vis = new boolean[r][c];\n        int[] dr = {-1, 1, 0, 0}, dc = {0, 0, -1, 1};\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                if (g[i][j] == 1 && !vis[i][j]) {\n                    count++;\n                    Queue<int[]> q = new LinkedList<>();\n                    q.add(new int[]{i, j}); vis[i][j] = true;\n                    while (!q.isEmpty()) {\n                        int[] cur = q.poll();\n                        for (int d = 0; d < 4; d++) {\n                            int nr = cur[0] + dr[d], nc = cur[1] + dc[d];\n                            if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1 && !vis[nr][nc]) {\n                                vis[nr][nc] = true; q.add(new int[]{nr, nc});\n                            }\n                        }\n                    }\n                }\n            }\n        }\n        System.out.println(count);\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(r_str) = words.next() {\n        let r: usize = r_str.parse().unwrap();\n        let c: usize = words.next().unwrap().parse().unwrap();\n        let mut g = vec![vec![0; c]; r];\n        for i in 0..r {\n            for j in 0..c { g[i][j] = words.next().unwrap().parse().unwrap(); }\n        }\n        let mut vis = vec![vec![false; c]; r];\n        let mut count = 0;\n        let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];\n        for i in 0..r {\n            for j in 0..c {\n                if g[i][j] == 1 && !vis[i][j] {\n                    count += 1;\n                    let mut q = VecDeque::new();\n                    q.push_back((i, j)); vis[i][j] = true;\n                    while let Some((cr, cc)) = q.pop_front() {\n                        for &(dr, dc) in &dirs {\n                          let nr = cr as i32 + dr;\n                          let nc = cc as i32 + dc;\n                          if nr >= 0 && nr < r as i32 && nc >= 0 && nc < c as i32 {\n                              let nr = nr as usize; let nc = nc as usize;\n                              if g[nr][nc] == 1 && !vis[nr][nc] {\n                                  vis[nr][nc] = true; q.push_back((nr, nc));\n                              }\n                          }\n                        }\n                    }\n                }\n            }\n        }\n        println!("{}", count);\n    }\n}`
        }
    },

    // ==================== MEDIUM ====================
    {
        title: "Course Schedule (Cycle Detection)",
        description: "There are N courses, labeled from 0 to N-1. Some courses have prerequisites, represented as directed edges where u v means u must be completed before v.\n\nDetermine if it is possible to finish all courses (no cycle).\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (directed edge u -> v)\n\n**Output Format:**\n- 'true' if possible, otherwise 'false'.",
        difficulty: "MEDIUM",
        tags: ["graphs", "cycle-detection", "dfs"],
        constraints: "1 <= N <= 2000\n0 <= M <= 5000",
        hints: "Use Kahn's algorithm or DFS color detection.",
        editorial: "Run topological sort. Return true if we can sort all N nodes.",
        examples: [
            { title: "Example 1", input: "2 1\n1 0", output: "true" },
            { title: "Example 2", input: "2 2\n1 0\n0 1", output: "false" }
        ],
        testcases: [
            { input: "2 1\n1 0", output: "true" },
            { input: "2 2\n1 0\n0 1", output: "false" },
            { input: "1 0", output: "true" },
            { input: "3 2\n0 1\n1 2", output: "true" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "false" },
            { input: "2 1\n0 0", output: "false" },
            { input: "4 2\n0 1\n2 3", output: "true" },
            { input: "5 3\n0 1\n2 3\n3 2", output: "false" },
            { input: "6 6\n0 1\n0 2\n1 3\n2 3\n3 4\n3 5", output: "true" },
            { input: "6 7\n0 1\n0 2\n1 3\n2 3\n3 4\n3 5\n4 1", output: "false" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n); vector<int> deg(n, 0);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v; adj[u].push_back(v); deg[v]++;\n    }\n    queue<int> q; int count = 0;\n    for (int i = 0; i < n; i++) { if (deg[i] == 0) q.push(i); }\n    while (!q.empty()) {\n        int u = q.front(); q.pop(); count++;\n        for (int v : adj[u]) { if (--deg[v] == 0) q.push(v); }\n    }\n    cout << (count == n ? "true" : "false") << "\\n";\n}`,
            python: `import sys\nfrom collections import deque\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    adj = [[] for _ in range(n)]\n    deg = [0] * n\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        adj[u].append(v); deg[v] += 1\n        idx += 2\n    q = deque([i for i in range(n) if deg[i] == 0])\n    count = 0\n    while q:\n        u = q.popleft()\n        count += 1\n        for v in adj[u]:\n            deg[v] -= 1\n            if deg[v] == 0: q.append(v)\n    print("true" if count == n else "false")\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        int[] deg = new int[n];\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); deg[v]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < n; i++) { if (deg[i] == 0) q.add(i); }\n        int count = 0;\n        while (!q.isEmpty()) {\n            int u = q.poll(); count++;\n            for (int v : adj.get(u)) { if (--deg[v] == 0) q.add(v); }\n        }\n        System.out.println(count == n ? "true" : "false");\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut adj = vec![vec![]; n];\n        let mut deg = vec![0; n];\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            adj[u].push(v); deg[v] += 1;\n        }\n        let mut q = VecDeque::new();\n        for i in 0..n { if deg[i] == 0 { q.push_back(i); } }\n        let mut count = 0;\n        while let Some(u) = q.pop_front() {\n            count += 1;\n            for &v in &adj[u] {\n                deg[v] -= 1;\n                if deg[v] == 0 { q.push_back(v); }\n            }\n        }\n        println!("{}", if count == n { "true" } else { "false" });\n    }\n}`
        }
    },
    {
        title: "Rotting Oranges",
        description: "Given an R x C grid where 0 is empty, 1 is fresh orange, and 2 is rotten orange, find the minimum minutes until no cell has a fresh orange. If impossible, return -1.\n\n**Input Format:**\n- First line: R C\n- Next R lines: C space-separated integers\n\n**Output Format:**\n- A single integer representing the minutes, or -1.",
        difficulty: "MEDIUM",
        tags: ["graphs", "bfs"],
        constraints: "1 <= R, C <= 10",
        hints: "Multi-source BFS from all rotten oranges.",
        editorial: "Standard BFS level-by-level starting with all rotten oranges.",
        examples: [
            { title: "Example 1", input: "3 3\n2 1 1\n1 1 0\n0 1 1", output: "4" },
            { title: "Example 2", input: "3 3\n2 1 1\n0 1 1\n1 0 1", output: "-1" }
        ],
        testcases: [
            { input: "3 3\n2 1 1\n1 1 0\n0 1 1", output: "4" },
            { input: "3 3\n2 1 1\n0 1 1\n1 0 1", output: "-1" },
            { input: "1 1\n0", output: "0" },
            { input: "1 1\n1", output: "-1" },
            { input: "1 1\n2", output: "0" },
            { input: "2 2\n0 2\n2 0", output: "0" },
            { input: "2 2\n1 1\n1 1", output: "-1" },
            { input: "1 4\n2 1 1 1", output: "3" },
            { input: "3 3\n2 0 2\n1 1 1\n1 0 1", output: "2" },
            { input: "4 4\n2 1 1 1\n0 0 0 1\n1 1 1 1\n1 0 0 0", output: "8" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int r, c; if (!(cin >> r >> c)) return 0;\n    vector<vector<int>> g(r, vector<int>(c));\n    queue<pair<int, int>> q; int fresh = 0;\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            cin >> g[i][j];\n            if (g[i][j] == 2) q.push({i, j});\n            else if (g[i][j] == 1) fresh++;\n        }\n    }\n    int mins = 0;\n    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};\n    while (!q.empty() && fresh > 0) {\n        int sz = q.size(); mins++;\n        for (int i = 0; i < sz; i++) {\n            auto [cr, cc] = q.front(); q.pop();\n            for (int d = 0; d < 4; d++) {\n                int nr = cr + dr[d], nc = cc + dc[d];\n                if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1) {\n                    g[nr][nc] = 2; fresh--; q.push({nr, nc});\n                }\n            }\n        }\n    }\n    cout << (fresh == 0 ? mins : -1) << "\\n";\n}`,
            python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    r, c = int(data[0]), int(data[1])\n    g, q, fresh = [], [], 0\n    idx = 2\n    for i in range(r):\n        row = [int(x) for x in data[idx:idx+c]]\n        for j in range(c):\n            if row[j] == 2: q.append((i, j))\n            elif row[j] == 1: fresh += 1\n        g.append(row)\n        idx += c\n    mins = 0\n    while q and fresh > 0:\n        mins += 1\n        for _ in range(len(q)):\n            cr, cc = q.pop(0)\n            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:\n                nr, nc = cr + dr, cc + dc\n                if 0 <= nr < r and 0 <= nc < c and g[nr][nc] == 1:\n                    g[nr][nc] = 2; fresh -= 1; q.append((nr, nc))\n    print(mins if fresh == 0 else -1)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] g = new int[r][c];\n        Queue<int[]> q = new LinkedList<>();\n        int fresh = 0;\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                g[i][j] = sc.nextInt();\n                if (g[i][j] == 2) q.add(new int[]{i, j});\n                else if (g[i][j] == 1) fresh++;\n            }\n        }\n        int mins = 0;\n        int[] dr = {-1, 1, 0, 0}, dc = {0, 0, -1, 1};\n        while (!q.isEmpty() && fresh > 0) {\n            int sz = q.size(); mins++;\n            for (int i = 0; i < sz; i++) {\n                int[] cur = q.poll();\n                for (int d = 0; d < 4; d++) {\n                    int nr = cur[0] + dr[d], nc = cur[1] + dc[d];\n                    if (nr >= 0 && nr < r && nc >= 0 && nc < c && g[nr][nc] == 1) {\n                        g[nr][nc] = 2; fresh--; q.add(new int[]{nr, nc});\n                    }\n                }\n            }\n        }\n        System.out.println(fresh == 0 ? mins : -1);\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(r_str) = words.next() {\n        let r: usize = r_str.parse().unwrap();\n        let c: usize = words.next().unwrap().parse().unwrap();\n        let mut g = vec![vec![0; c]; r];\n        let mut q = VecDeque::new();\n        let mut fresh = 0;\n        for i in 0..r {\n            for j in 0..c {\n                let v: i32 = words.next().unwrap().parse().unwrap();\n                g[i][j] = v;\n                if v == 2 { q.push_back((i, j)); }\n                else if v == 1 { fresh += 1; }\n            }\n        }\n        let mut mins = 0;\n        let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];\n        while !q.is_empty() && fresh > 0 {\n            let sz = q.len(); mins += 1;\n            for _ in 0..sz {\n                let (cr, cc) = q.pop_front().unwrap();\n                for &(dr, dc) in &dirs {\n                    let nr = cr as i32 + dr;\n                    let nc = cc as i32 + dc;\n                    if nr >= 0 && nr < r as i32 && nc >= 0 && nc < c as i32 {\n                        let nr = nr as usize; let nc = nc as usize;\n                        if g[nr][nc] == 1 {\n                            g[nr][nc] = 2; fresh -= 1; q.push_back((nr, nc));\n                        }\n                    }\n                }\n            }\n        }\n        println!("{}", if fresh == 0 { mins } else { -1 });\n    }\n}`
        }
    },
    {
        title: "Clone Graph",
        description: "Given a connected undirected graph with N vertices and M edges, perform a deep copy (clone) of the graph. Reconstruct the cloned graph, and print the adjacency list of the cloned graph. For each vertex from 0 to N-1, print its neighbors in sorted ascending order of their IDs.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (undirected edge between u and v)\n\n**Output Format:**\n- N lines, where each line i contains 'i: neighbor1 neighbor2 ...'",
        difficulty: "MEDIUM",
        tags: ["graphs", "dfs", "bfs"],
        constraints: "1 <= N <= 100\n0 <= M <= 1000",
        hints: "Use a map from original node to cloned node. Traverse recursively.",
        editorial: "Keep visited cloned nodes mapped by node val. Recursively copy neighbors.",
        examples: [
            { title: "Example 1", input: "4 4\n0 1\n1 2\n2 3\n3 0", output: "0: 1 3\n1: 0 2\n2: 1 3\n3: 0 2" },
            { title: "Example 2", input: "3 2\n0 1\n1 2", output: "0: 1\n1: 0 2\n2: 1" }
        ],
        testcases: [
            { input: "4 4\n0 1\n1 2\n2 3\n3 0", output: "0: 1 3\n1: 0 2\n2: 1 3\n3: 0 2" },
            { input: "3 2\n0 1\n1 2", output: "0: 1\n1: 0 2\n2: 1" },
            { input: "1 0", output: "0:" },
            { input: "2 1\n0 1", output: "0: 1\n1: 0" },
            { input: "4 3\n0 1\n0 2\n0 3", output: "0: 1 2 3\n1: 0\n2: 0\n3: 0" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "0: 1 2\n1: 0 2\n2: 0 1" },
            { input: "5 10\n0 1\n0 2\n0 3\n0 4\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4", output: "0: 1 2 3 4\n1: 0 2 3 4\n2: 0 1 3 4\n3: 0 1 2 4\n4: 0 1 2 3" },
            { input: "6 5\n0 1\n0 2\n1 3\n1 4\n2 5", output: "0: 1 2\n1: 0 3 4\n2: 0 5\n3: 1\n4: 1\n5: 2" },
            { input: "4 4\n0 1\n1 2\n2 0\n2 3", output: "0: 1 2\n1: 0 2\n2: 0 1 3\n3: 2" },
            { input: "5 6\n0 2\n0 3\n0 4\n1 2\n1 3\n1 4", output: "0: 2 3 4\n1: 2 3 4\n2: 0 1\n3: 0 1\n4: 0 1" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nstruct Node {\n    int val; vector<Node*> neighbors;\n    Node(int v) : val(v) {}\n};\nNode* clone(Node* node, unordered_map<int, Node*>& vis) {\n    if (!node) return nullptr;\n    if (vis.count(node->val)) return vis[node->val];\n    Node* copy = new Node(node->val); vis[node->val] = copy;\n    for (auto nbr : node->neighbors) copy->neighbors.push_back(clone(nbr, vis));\n    return copy;\n}\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<Node*> nodes(n);\n    for (int i = 0; i < n; i++) nodes[i] = new Node(i);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        nodes[u]->neighbors.push_back(nodes[v]);\n        nodes[v]->neighbors.push_back(nodes[u]);\n    }\n    unordered_map<int, Node*> vis;\n    if (n > 0) clone(nodes[0], vis);\n    for (int i = 0; i < n; i++) {\n        cout << i << ":";\n        if (vis.count(i)) {\n            vector<int> nbrs;\n            for (auto nbr : vis[i]->neighbors) nbrs.push_back(nbr->val);\n            sort(nbrs.begin(), nbrs.end());\n            for (int val : nbrs) cout << " " << val;\n        }\n        cout << "\\n";\n    }\n}`,
            python: `import sys\nclass Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\ndef clone(node, vis):\n    if not node: return None\n    if node.val in vis: return vis[node.val]\n    copy = Node(node.val)\n    vis[node.val] = copy\n    for nbr in node.neighbors:\n        copy.neighbors.append(clone(nbr, vis))\n    return copy\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    nodes = [Node(i) for i in range(n)]\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        nodes[u].neighbors.append(nodes[v])\n        nodes[v].neighbors.append(nodes[u])\n        idx += 2\n    vis = {}\n    if n > 0: clone(nodes[0], vis)\n    for i in range(n):\n        nbrs = sorted([nbr.val for nbr in vis[i].neighbors]) if i in vis else []\n        print(f"{i}:" + (" " + " ".join(map(str, nbrs)) if nbrs else ""))\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    static class Node {\n        int val; List<Node> neighbors = new ArrayList<>();\n        Node(int v) { val = v; }\n    }\n    static Node clone(Node node, Map<Integer, Node> vis) {\n        if (node == null) return null;\n        if (vis.containsKey(node.val)) return vis.get(node.val);\n        Node copy = new Node(node.val); vis.put(node.val, copy);\n        for (Node nbr : node.neighbors) copy.neighbors.add(clone(nbr, vis));\n        return copy;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<Node> nodes = new ArrayList<>();\n        for (int i = 0; i < n; i++) nodes.add(new Node(i));\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            nodes.get(u).neighbors.add(nodes.get(v));\n            nodes.get(v).neighbors.add(nodes.get(u));\n        }\n        Map<Integer, Node> vis = new HashMap<>();\n        if (n > 0) clone(nodes.get(0), vis);\n        for (int i = 0; i < n; i++) {\n            System.out.print(i + \":\");\n            if (vis.containsKey(i)) {\n                List<Integer> nbrs = new ArrayList<>();\n                for (Node nbr : vis.get(i).neighbors) nbrs.add(nbr.val);\n                Collections.sort(nbrs);\n                for (int val : nbrs) System.out.print(\" \" + val);\n            }\n            System.out.println();\n        }\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::rc::Rc;\nuse std::cell::RefCell;\nuse std::collections::HashMap;\nstruct Node {\n    val: usize,\n    neighbors: Vec<Rc<RefCell<Node>>>,\n}\nfn clone(node: Rc<RefCell<Node>>, vis: &mut HashMap<usize, Rc<RefCell<Node>>>) -> Rc<RefCell<Node>> {\n    let val = node.borrow().val;\n    if let Some(cloned) = vis.get(&val) { return cloned.clone(); }\n    let copy = Rc::new(RefCell::new(Node { val, neighbors: Vec::new() }));\n    vis.insert(val, copy.clone());\n    let mut nbrs = Vec::new();\n    for nbr in &node.borrow().neighbors { nbrs.push(clone(nbr.clone(), vis)); }\n    copy.borrow_mut().neighbors = nbrs;\n    copy\n}\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut nodes = Vec::new();\n        for i in 0..n { nodes.push(Rc::new(RefCell::new(Node { val: i, neighbors: Vec::new() }))); }\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            nodes[u].borrow_mut().neighbors.push(nodes[v].clone());\n            nodes[v].borrow_mut().neighbors.push(nodes[u].clone());\n        }\n        let mut vis = HashMap::new();\n        if n > 0 { clone(nodes[0].clone(), &mut vis); }\n        for i in 0..n {\n            print!(\"{}:\", i);\n            if let Some(cloned) = vis.get(&i) {\n                let mut nbrs: Vec<usize> = cloned.borrow().neighbors.iter().map(|n| n.borrow().val).collect();\n                nbrs.sort();\n                for val in nbrs { print!(\" {}\", val); }\n            }\n            println!();\n        }\n    }\n}`
        }
    },
    {
        title: "Shortest Path in Binary Matrix",
        description: "Given an N x N binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.\n\nAll clear path steps must visit 0 cells and can move in any of the 8 directions.\n\n**Input Format:**\n- First line: N\n- Next N lines: N space-separated integers\n\n**Output Format:**\n- A single integer representing the path length, or -1.",
        difficulty: "MEDIUM",
        tags: ["graphs", "bfs"],
        constraints: "1 <= N <= 100",
        hints: "Use 8-directional BFS starting from (0,0).",
        editorial: "BFS keeps path steps tracking. Mark cells visited by turning to 1 or using boolean matrix.",
        examples: [
            { title: "Example 1", input: "3\n0 0 0\n1 1 0\n1 1 0", output: "4" },
            { title: "Example 2", input: "3\n1 0 0\n1 1 0\n1 1 0", output: "-1" }
        ],
        testcases: [
            { input: "3\n0 0 0\n1 1 0\n1 1 0", output: "4" },
            { input: "3\n1 0 0\n1 1 0\n1 1 0", output: "-1" },
            { input: "1\n0", output: "1" },
            { input: "1\n1", output: "-1" },
            { input: "2\n0 1\n1 0", output: "2" },
            { input: "3\n0 1 0\n0 1 0\n0 0 0", output: "4" },
            { input: "3\n0 0 0\n0 1 0\n0 0 1", output: "-1" },
            { input: "4\n0 0 0 0\n1 1 1 1\n0 0 0 0\n0 0 0 0", output: "-1" },
            { input: "4\n0 1 1 0\n0 0 1 0\n1 0 0 1\n0 1 0 0", output: "4" },
            { input: "5\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0", output: "5" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<vector<int>> g(n, vector<int>(n));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++) cin >> g[i][j];\n    if (g[0][0] != 0 || g[n-1][n-1] != 0) { cout << "-1\\n"; return 0; }\n    queue<tuple<int, int, int>> q; q.push({0, 0, 1});\n    vector<vector<bool>> vis(n, vector<bool>(n, false)); vis[0][0] = true;\n    bool found = false;\n    while (!q.empty()) {\n        auto [r, c, d] = q.front(); q.pop();\n        if (r == n - 1 && c == n - 1) { cout << d << "\\n"; found = true; break; }\n        for (int dr = -1; dr <= 1; dr++) {\n            for (int dc = -1; dc <= 1; dc++) {\n                if (dr == 0 && dc == 0) continue;\n                int nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < n && nc >= 0 && nc < n && g[nr][nc] == 0 && !vis[nr][nc]) {\n                    vis[nr][nc] = true; q.push({nr, nc, d + 1});\n                }\n            }\n        }\n    }\n    if (!found) cout << "-1\\n";\n}`,
            python: `import sys\nfrom collections import deque\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    g = []\n    idx = 1\n    for _ in range(n):\n        g.append([int(x) for x in data[idx:idx+n]])\n        idx += n\n    if g[0][0] != 0 or g[n-1][n-1] != 0:\n        print(-1); return\n    q = deque([(0, 0, 1)])\n    vis = [[False] * n for _ in range(n)]\n    vis[0][0] = True\n    found = False\n    while q:\n        r, c, d = q.popleft()\n        if r == n - 1 and c == n - 1:\n            print(d); found = True; break\n        for dr in [-1,0,1]:\n            for dc in [-1,0,1]:\n                if dr == 0 and dc == 0: continue\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < n and 0 <= nc < n and g[nr][nc] == 0 and not vis[nr][nc]:\n                    vis[nr][nc] = True; q.append((nr, nc, d + 1))\n    if not found: print(-1)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[][] g = new int[n][n];\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < n; j++) g[i][j] = sc.nextInt();\n        if (g[0][0] != 0 || g[n-1][n-1] != 0) { System.out.println("-1"); return; }\n        Queue<int[]> q = new LinkedList<>(); q.add(new int[]{0, 0, 1});\n        boolean[][] vis = new boolean[n][n]; vis[0][0] = true;\n        boolean found = false;\n        while (!q.isEmpty()) {\n            int[] cur = q.poll();\n            int r = cur[0], c = cur[1], d = cur[2];\n            if (r == n - 1 && c == n - 1) { System.out.println(d); found = true; break; }\n            for (int dr = -1; dr <= 1; dr++) {\n                for (int dc = -1; dc <= 1; dc++) {\n                    if (dr == 0 && dc == 0) continue;\n                    int nr = r + dr, nc = c + dc;\n                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && g[nr][nc] == 0 && !vis[nr][nc]) {\n                        vis[nr][nc] = true; q.add(new int[]{nr, nc, d + 1});\n                    }\n                }\n            }\n        }\n        if (!found) System.out.println("-1");\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::VecDeque;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let mut g = vec![vec![0; n]; n];\n        for i in 0..n {\n            for j in 0..n { g[i][j] = words.next().unwrap().parse().unwrap(); }\n        }\n        if g[0][0] != 0 || g[n-1][n-1] != 0 { println!("-1"); return; }\n        let mut q = VecDeque::new(); q.push_back((0, 0, 1));\n        let mut vis = vec![vec![false; n]; n]; vis[0][0] = true;\n        let mut found = false;\n        while let Some((r, c, d)) = q.pop_front() {\n            if r == n - 1 && c == n - 1 { println!("{}", d); found = true; break; }\n            for dr in -1..=1 {\n                for dc in -1..=1 {\n                    if dr == 0 && dc == 0 { continue; }\n                    let nr = r as i32 + dr;\n                    let nc = c as i32 + dc;\n                    if nr >= 0 && nr < n as i32 && nc >= 0 && nc < n as i32 {\n                        let nr = nr as usize; let nc = nc as usize;\n                        if g[nr][nc] == 0 && !vis[nr][nc] {\n                            vis[nr][nc] = true; q.push_back((nr, nc, d + 1));\n                        }\n                    }\n                }\n            }\n        }\n        if !found { println!("-1"); }\n    }\n}`
        }
    },
    {
        title: "Number of Connected Components",
        description: "Given N nodes and a list of M undirected edges, find the number of connected components in the graph.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (undirected edge between u and v)\n\n**Output Format:**\n- An integer representing the connected components count.",
        difficulty: "MEDIUM",
        tags: ["graphs", "dfs", "bfs"],
        constraints: "1 <= N <= 10^5\n0 <= M <= 2 * 10^5",
        hints: "Use DSU or DFS traversal.",
        editorial: "Disjoint Set Union (DSU) simplifies component tracking. Subtract 1 on successful union.",
        examples: [
            { title: "Example 1", input: "5 3\n0 1\n1 2\n3 4", output: "2" },
            { title: "Example 2", input: "5 4\n0 1\n1 2\n2 3\n3 4", output: "1" }
        ],
        testcases: [
            { input: "5 3\n0 1\n1 2\n3 4", output: "2" },
            { input: "5 4\n0 1\n1 2\n2 3\n3 4", output: "1" },
            { input: "1 0", output: "1" },
            { input: "5 0", output: "5" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "1" },
            { input: "6 3\n0 1\n1 2\n2 0", output: "4" },
            { input: "4 3\n0 1\n0 2\n0 3", output: "1" },
            { input: "6 4\n0 1\n1 2\n3 4\n4 5", output: "2" },
            { input: "10 0", output: "10" },
            { input: "6 4\n0 2\n1 3\n2 4\n3 5", output: "2" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint find_set(int v, vector<int>& parent) {\n    if (v == parent[v]) return v;\n    return parent[v] = find_set(parent[v], parent);\n}\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<int> parent(n); iota(parent.begin(), parent.end(), 0);\n    int comp = n;\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        int r1 = find_set(u, parent), r2 = find_set(v, parent);\n        if (r1 != r2) { parent[r1] = r2; comp--; }\n    }\n    cout << comp << "\\n";\n}`,
            python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    parent = list(range(n))\n    def find(i):\n        path = []\n        while parent[i] != i:\n            path.append(i); i = parent[i]\n        for node in path: parent[node] = i\n        return i\n    comp = n\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        r1, r2 = find(u), find(v)\n        if r1 != r2:\n            parent[r1] = r2; comp -= 1\n        idx += 2\n    print(comp)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    static int find(int i, int[] parent) {\n        int root = i;\n        while (parent[root] != root) root = parent[root];\n        int curr = i;\n        while (curr != root) { int next = parent[curr]; parent[curr] = root; curr = next; }\n        return root;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        int comp = n;\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            int r1 = find(u, parent), r2 = find(v, parent);\n            if (r1 != r2) { parent[r1] = r2; comp--; }\n        }\n        System.out.println(comp);\n    }\n}`,
            rust: `use std::io::{self, Read};\nstruct DSU { parent: Vec<usize> }\nimpl DSU {\n    fn find(&mut self, i: usize) -> usize {\n        let mut root = i;\n        while self.parent[root] != root { root = self.parent[root]; }\n        let mut curr = i;\n        while curr != root { let next = self.parent[curr]; self.parent[curr] = root; curr = next; }\n        root\n    }\n    fn union(&mut self, i: usize, j: usize) -> bool {\n        let r1 = self.find(i); let r2 = self.find(j);\n        if r1 != r2 { self.parent[r1] = r2; true } else { false }\n    }\n}\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut dsu = DSU { parent: (0..n).collect() };\n        let mut comp = n;\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            if dsu.union(u, v) { comp -= 1; }\n        }\n        println!("{}", comp);\n    }\n}`
        }
    },

    // ==================== HARD ====================
    {
        title: "Word Ladder",
        description: "Given beginWord, endWord and a wordList of size K, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if impossible.\n\nOnly one character can differ at a time.\n\n**Input Format:**\n- First line: beginWord\n- Second line: endWord\n- Third line: K\n- Next K lines: words in wordList\n\n**Output Format:**\n- An integer representing the ladder length.",
        difficulty: "HARD",
        tags: ["graphs", "bfs"],
        constraints: "1 <= K <= 5000",
        hints: "Run BFS checking all 1-character replacements.",
        editorial: "BFS from beginWord. Keep a visited set. Replace each character from 'a' to 'z' to fetch next states.",
        examples: [
            { title: "Example 1", input: "hit\ncog\n6\nhot\ndot\ndog\nlot\nlog\ncog", output: "5" },
            { title: "Example 2", input: "hit\ncog\n5\nhot\ndot\ndog\nlot\nlog", output: "0" }
        ],
        testcases: [
            { input: "hit\ncog\n6\nhot\ndot\ndog\nlot\nlog\ncog", output: "5" },
            { input: "hit\ncog\n5\nhot\ndot\ndog\nlot\nlog", output: "0" },
            { input: "a\na\n1\na", output: "1" },
            { input: "a\nb\n1\nb", output: "2" },
            { input: "a\nc\n1\nb", output: "0" },
            { input: "lost\nmost\n4\nlest\nlost\nmest\nmost", output: "2" },
            { input: "talk\ntail\n4\ntalk\ntall\ntail\ntoil", output: "3" },
            { input: "abc\nxyz\n4\nabd\nxyd\nxyz\nabz", output: "0" },
            { input: "lead\ngold\n4\nload\ngoad\ngold\nlead", output: "4" },
            { input: "hit\ncog\n4\nhot\ndog\ncog\npot", output: "0" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    string beginWord, endWord; int k;\n    if (!(cin >> beginWord >> endWord >> k)) return 0;\n    unordered_set<string> wordList;\n    for (int i = 0; i < k; i++) { string s; cin >> s; wordList.insert(s); }\n    if (!wordList.count(endWord)) { cout << "0\\n"; return 0; }\n    if (beginWord == endWord) { cout << "1\\n"; return 0; }\n    queue<pair<string, int>> q; q.push({beginWord, 1});\n    unordered_set<string> vis; vis.insert(beginWord);\n    bool found = false;\n    while (!q.empty()) {\n        auto [word, d] = q.front(); q.pop();\n        if (word == endWord) { cout << d << "\\n"; found = true; break; }\n        for (int i = 0; i < word.length(); i++) {\n            char orig = word[i];\n            for (char c = 'a'; c <= 'z'; c++) {\n                if (c == orig) continue;\n                word[i] = c;\n                if (wordList.count(word) && !vis.count(word)) {\n                    vis.insert(word); q.push({word, d + 1});\n                }\n            }\n            word[i] = orig;\n        }\n    }\n    if (!found) cout << "0\\n";\n}`,
            python: `import sys\nfrom collections import deque\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    beginWord, endWord, k = data[0], data[1], int(data[2])\n    wordList = set(data[3:3+k])\n    if endWord not in wordList:\n        print(0); return\n    if beginWord == endWord:\n        print(1); return\n    q = deque([(beginWord, 1)])\n    vis = {beginWord}\n    found = False\n    while q:\n        word, d = q.popleft()\n        if word == endWord: \n            print(d); found = True; break\n        for i in range(len(word)):\n            for code in range(97, 123):\n                c = chr(code)\n                if c != word[i]:\n                    nxt = word[:i] + c + word[i+1:]\n                    if nxt in wordList and nxt not in vis:\n                        vis.add(nxt); q.append((nxt, d + 1))\n    if not found: print(0)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String beginWord = sc.next(), endWord = sc.next();\n        int k = sc.nextInt();\n        Set<String> wordList = new HashSet<>();\n        for (int i = 0; i < k; i++) wordList.add(sc.next());\n        if (!wordList.contains(endWord)) { System.out.println("0"); return; }\n        if (beginWord.equals(endWord)) { System.out.println("1"); return; }\n        Queue<Object[]> q = new LinkedList<>(); q.add(new Object[]{beginWord, 1});\n        Set<String> vis = new HashSet<>(); vis.add(beginWord);\n        boolean found = false;\n        while (!q.isEmpty()) {\n            Object[] cur = q.poll();\n            String word = (String) cur[0]; int d = (Integer) cur[1];\n            if (word.equals(endWord)) { System.out.println(d); found = true; break; }\n            char[] chars = word.toCharArray();\n            for (int i = 0; i < chars.length; i++) {\n                char orig = chars[i];\n                for (char c = 'a'; c <= 'z'; c++) {\n                    if (c == orig) continue;\n                    chars[i] = c; String nxt = new String(chars);\n                    if (wordList.contains(nxt) && !vis.contains(nxt)) {\n                        vis.add(nxt); q.add(new Object[]{nxt, d + 1});\n                    }\n                }\n                chars[i] = orig;\n            }\n        }\n        if (!found) System.out.println("0");\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::{HashSet, VecDeque};\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(begin) = words.next() {\n        let end = words.next().unwrap();\n        let k: usize = words.next().unwrap().parse().unwrap();\n        let mut word_list = HashSet::new();\n        for _ in 0..k { word_list.insert(words.next().unwrap().to_string()); }\n        if !word_list.contains(end) { println!("0"); return; }\n        if begin == end { println!("1"); return; }\n        let mut q = VecDeque::new(); q.push_back((begin.to_string(), 1));\n        let mut vis = HashSet::new(); vis.insert(begin.to_string());\n        let mut found = false;\n        while let Some((word, d)) = q.pop_front() {\n            if &word == end { println!("{}", d); found = true; break; }\n            let mut chars: Vec<char> = word.chars().collect();\n            for i in 0..chars.len() {\n                let orig = chars[i];\n                for code in 97..=122 {\n                    let c = code as u8 as char;\n                    if c == orig { continue; }\n                    chars[i] = c;\n                    let nxt: String = chars.iter().collect();\n                    if word_list.contains(&nxt) && !vis.contains(&nxt) {\n                        vis.insert(nxt.clone()); q.push_back((nxt, d + 1));\n                      }\n                }\n                chars[i] = orig;\n            }\n        }\n        if !found { println!("0"); }\n    }\n}`
        }
    },
    {
        title: "Alien Dictionary (Graph)",
        description: "Given a list of words from an alien language dictionary, sorted lexicographically by their rules, return the unique characters sorted in alien order. If multiple valid orderings exist, return the lexicographically smallest topological sort. If no valid ordering exists (contains cycle), return empty string.\n\n**Input Format:**\n- First line: N\n- Next N lines: words\n\n**Output Format:**\n- A single line containing the character ordering, or empty line.",
        difficulty: "HARD",
        tags: ["graphs", "cycle-detection", "dfs"],
        constraints: "1 <= N <= 100",
        hints: "Form a directed graph by comparing adjacent words. Run Kahn's using a min-heap.",
        editorial: "Use priority queue in Kahn's algorithm to resolve lexicographical ties.",
        examples: [
            { title: "Example 1", input: "5\nwrt\nwrf\ner\nett\nrftt", output: "wertf" },
            { title: "Example 2", input: "3\nz\nx\nz", output: "" }
        ],
        testcases: [
            { input: "5\nwrt\nwrf\ner\nett\nrftt", output: "wertf" },
            { input: "3\nz\nx\nz", output: "" },
            { input: "1\nabc", output: "abc" },
            { input: "2\nabc\nab", output: "" },
            { input: "3\nabc\nacd\ncde", output: "abcde" },
            { input: "4\nz\no\na\nb", output: "zoab" },
            { input: "2\na\nb", output: "ab" },
            { input: "5\naba\nabb\nabc\nabd\nabe", output: "abcde" },
            { input: "3\nab\nbc\nca", output: "" },
            { input: "4\na\nb\nc\na", output: "" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    vector<string> words(n);\n    unordered_set<char> unique_chars;\n    for (int i = 0; i < n; i++) {\n        cin >> words[i];\n        for (char c : words[i]) unique_chars.insert(c);\n    }\n    unordered_map<char, unordered_set<char>> adj;\n    unordered_map<char, int> in_degree;\n    for (char c : unique_chars) { in_degree[c] = 0; }\n    bool possible = true;\n    for (int i = 0; i < n - 1; i++) {\n        string w1 = words[i], w2 = words[i+1];\n        int len = min(w1.length(), w2.length());\n        if (w1.length() > w2.length() && w1.substr(0, len) == w2.substr(0, len)) {\n            possible = false; break;\n        }\n        for (int j = 0; j < len; j++) {\n            if (w1[j] != w2[j]) {\n                if (!adj[w1[j]].count(w2[j])) { adj[w1[j]].insert(w2[j]); }\n                break;\n            }\n        }\n    }\n    if (!possible) { cout << "\\n"; return 0; }\n    for (auto& pair : adj) {\n        for (char v : pair.second) in_degree[v]++;\n    }\n    priority_queue<char, vector<char>, greater<char>> pq;\n    for (char c : unique_chars) {\n        if (in_degree[c] == 0) pq.push(c);\n    }\n    string res = "";\n    while (!pq.empty()) {\n        char u = pq.top(); pq.pop(); res += u;\n        for (char v : adj[u]) {\n            if (--in_degree[v] == 0) pq.push(v);\n        }\n    }\n    if (res.length() < unique_chars.size()) cout << "\\n";\n    else cout << res << "\\n";\n}`,
            python: `import sys\nimport heapq\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    words = data[1:1+n]\n    chars = set("".join(words))\n    adj = {c: set() for c in chars}\n    in_deg = {c: 0 for c in chars}\n    possible = True\n    for i in range(n - 1):\n        w1, w2 = words[i], words[i+1]\n        min_len = min(len(w1), len(w2))\n        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:\n            possible = False; break\n        for j in range(min_len):\n            if w1[j] != w2[j]:\n                adj[w1[j]].add(w2[j]); break\n    if not possible:\n        print(""); return\n    for u in adj:\n        for v in adj[u]: in_deg[v] += 1\n    pq = [c for c in chars if in_deg[c] == 0]\n    heapq.heapify(pq)\n    res = []\n    while pq:\n        u = heapq.heappop(pq)\n        res.append(u)\n        for v in adj[u]:\n            in_deg[v] -= 1\n            if in_deg[v] == 0: heapq.heappush(pq, v)\n    print("".join(res) if len(res) == len(chars) else "")\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        String[] words = new String[n];\n        Set<Character> unique = new HashSet<>();\n        for (int i = 0; i < n; i++) {\n            words[i] = sc.next();\n            for (char c : words[i].toCharArray()) unique.add(c);\n        }\n        Map<Character, Set<Character>> adj = new HashMap<>();\n        Map<Character, Integer> in_deg = new HashMap<>();\n        for (char c : unique) { adj.put(c, new HashSet<>()); in_deg.put(c, 0); }\n        boolean possible = true;\n        for (int i = 0; i < n - 1; i++) {\n            String w1 = words[i], w2 = words[i+1];\n            int len = Math.min(w1.length(), w2.length());\n            if (w1.length() > w2.length() && w1.substring(0, len).equals(w2.substring(0, len))) {\n                possible = false; break;\n            }\n            for (int j = 0; j < len; j++) {\n                if (w1.charAt(j) != w2.charAt(j)) {\n                    adj.get(w1.charAt(j)).add(w2.charAt(j)); break;\n                }\n            }\n        }\n        if (!possible) { System.out.println(""); return; }\n        for (char u : adj.keySet()) {\n            for (char v : adj.get(u)) in_deg.put(v, in_deg.get(v) + 1);\n        }\n        PriorityQueue<Character> pq = new PriorityQueue<>();\n        for (char c : unique) { if (in_deg.get(c) == 0) pq.add(c); }\n        StringBuilder sb = new StringBuilder();\n        while (!pq.isEmpty()) {\n            char u = pq.poll(); sb.append(u);\n            for (char v : adj.get(u)) {\n                in_deg.put(v, in_deg.get(v) - 1);\n                if (in_deg.get(v) == 0) pq.add(v);\n            }\n        }\n        System.out.println(sb.length() == unique.size() ? sb.toString() : "");\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::{HashMap, HashSet, BinaryHeap};\nuse std::cmp::Reverse;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words_iter = input.split_whitespace();\n    if let Some(n_str) = words_iter.next() {\n        let n: usize = n_str.parse().unwrap();\n        let words: Vec<String> = words_iter.map(|s| s.to_string()).collect();\n        let mut unique = HashSet::new();\n        for w in &words { for c in w.chars() { unique.insert(c); } }\n        let mut adj = HashMap::new();\n        let mut in_deg = HashMap::new();\n        for &c in &unique { adj.insert(c, HashSet::new()); in_deg.insert(c, 0); }\n        let mut possible = true;\n        for i in 0..n-1 {\n            let w1 = &words[i]; let w2 = &words[i+1];\n            let w1_c: Vec<char> = w1.chars().collect();\n            let w2_c: Vec<char> = w2.chars().collect();\n            let len = std::cmp::min(w1_c.len(), w2_c.len());\n            if w1_c.len() > w2_c.len() && w1_c[..len] == w2_c[..len] {\n                possible = false; break;\n            }\n            for j in 0..len {\n                if w1_c[j] != w2_c[j] { adj.get_mut(&w1_c[j]).unwrap().insert(w2_c[j]); break; }\n            }\n        }\n        if !possible { println!(""); return; }\n        for u in adj.keys() {\n            for &v in adj.get(u).unwrap() { *in_deg.get_mut(&v).unwrap() += 1; }\n        }\n        let mut pq = BinaryHeap::new();\n        for &c in &unique { if *in_deg.get(&c).unwrap() == 0 { pq.push(Reverse(c)); } }\n        let mut res = Vec::new();\n        while let Some(Reverse(u)) = pq.pop() {\n            res.push(u);\n            for &v in adj.get(&u).unwrap() {\n                let d = in_deg.get_mut(&v).unwrap(); *d -= 1;\n                if *d == 0 { pq.push(Reverse(v)); }\n            }\n        }\n        if res.len() == unique.len() {\n            let s: String = res.into_iter().collect(); println!("{}", s);\n        } else { println!(""); }\n    }\n}`
        }
    },
    {
        title: "Critical Connections in Network (Tarjan's)",
        description: "Given a network of N servers (numbered 0 to N-1) and M connections, find all critical connections (bridges).\n\nAn edge is critical if its removal increases the number of connected components.\n\nTo make the output deterministic: for each critical connection [u, v], sort it so u < v. Then sort the list of connections lexicographically and print each connection on a new line.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v (undirected connection)\n\n**Output Format:**\n- Critical connections printed as 'u v' (one per line, sorted).",
        difficulty: "HARD",
        tags: ["graphs", "dfs"],
        constraints: "2 <= N <= 10^5\nN - 1 <= M <= 10^5",
        hints: "Use Tarjan's bridge finding algorithm tracking discovery (tin) and low-link values (low).",
        editorial: "Tarjan's DFS tracks tin and low. An edge (u, v) is a bridge if low[v] > tin[u].",
        examples: [
            { title: "Example 1", input: "4 4\n0 1\n1 2\n2 0\n1 3", output: "1 3" },
            { title: "Example 2", input: "2 1\n0 1", output: "0 1" }
        ],
        testcases: [
            { input: "4 4\n0 1\n1 2\n2 0\n1 3", output: "1 3" },
            { input: "2 1\n0 1", output: "0 1" },
            { input: "3 3\n0 1\n1 2\n2 0", output: "" },
            { input: "3 2\n0 1\n1 2", output: "0 1\n1 2" },
            { input: "4 3\n0 1\n0 2\n0 3", output: "0 1\n0 2\n0 3" },
            { input: "6 7\n0 1\n1 2\n2 0\n2 3\n3 4\n4 5\n5 3", output: "2 3" },
            { input: "5 5\n0 1\n1 2\n2 3\n3 0\n3 4", output: "3 4" },
            { input: "5 6\n0 1\n1 2\n2 0\n2 3\n3 4\n4 2", output: "" },
            { input: "6 6\n0 1\n1 2\n2 0\n1 3\n3 4\n4 5", output: "1 3\n3 4\n4 5" },
            { input: "7 8\n0 1\n1 2\n2 0\n1 3\n3 4\n4 5\n5 3\n5 6", output: "1 3\n5 6" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint timer = 0;\nvoid dfs(int u, int p, const vector<vector<int>>& adj, vector<int>& tin, vector<int>& low, vector<pair<int, int>>& bridges) {\n    tin[u] = low[u] = ++timer;\n    for (int v : adj[u]) {\n        if (v == p) continue;\n        if (tin[v] != -1) { low[u] = min(low[u], tin[v]); }\n        else {\n            dfs(v, u, adj, tin, low, bridges);\n            low[u] = min(low[u], low[v]);\n            if (low[v] > tin[u]) bridges.push_back({min(u, v), max(u, v)});\n        }\n    }\n}\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v; adj[u].push_back(v); adj[v].push_back(u);\n    }\n    vector<int> tin(n, -1), low(n, -1);\n    vector<pair<int, int>> bridges;\n    for (int i = 0; i < n; i++) { if (tin[i] == -1) dfs(i, -1, adj, tin, low, bridges); }\n    sort(bridges.begin(), bridges.end());\n    for (auto& b : bridges) cout << b.first << " " << b.second << "\\n";\n}`,
            python: `import sys\nsys.setrecursionlimit(200000)\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    adj = [[] for _ in range(n)]\n    idx = 2\n    for _ in range(m):\n        u, v = int(data[idx]), int(data[idx+1])\n        adj[u].append(v); adj[v].append(u)\n        idx += 2\n    tin, low = [-1] * n, [-1] * n\n    timer = 0\n    bridges = []\n    def dfs(u, p=-1):\n        nonlocal timer\n        timer += 1\n        tin[u] = low[u] = timer\n        for v in adj[u]:\n            if v == p: continue\n            if tin[v] != -1: low[u] = min(low[u], tin[v])\n            else:\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > tin[u]: bridges.append((min(u, v), max(u, v)))\n    for i in range(n):\n        if tin[i] == -1: dfs(i)\n    bridges.sort()\n    for u, v in bridges: print(f"{u} {v}")\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    static int timer = 0;\n    static void dfs(int u, int p, List<List<Integer>> adj, int[] tin, int[] low, List<int[]> bridges) {\n        tin[u] = low[u] = ++timer;\n        for (int v : adj.get(u)) {\n            if (v == p) continue;\n            if (tin[v] != -1) { low[u] = Math.min(low[u], tin[v]); }\n            else {\n                dfs(v, u, adj, tin, low, bridges);\n                low[u] = Math.min(low[u], low[v]);\n                if (low[v] > tin[u]) bridges.add(new int[]{Math.min(u, v), Math.max(u, v)});\n            }\n        }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        int[] tin = new int[n], low = new int[n];\n        Arrays.fill(tin, -1); Arrays.fill(low, -1);\n        List<int[]> bridges = new ArrayList<>();\n        for (int i = 0; i < n; i++) { if (tin[i] == -1) dfs(i, -1, adj, tin, low, bridges); }\n        Collections.sort(bridges, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);\n        for (int[] b : bridges) System.out.println(b[0] + " " + b[1]);\n    }\n}`,
            rust: `use std::io::{self, Read};\nfn dfs(u: usize, p: i32, timer: &mut i32, adj: &Vec<Vec<usize>>, tin: &mut Vec<i32>, low: &mut Vec<i32>, bridges: &mut Vec<(usize, usize)>) {\n    *timer += 1; tin[u] = *timer; low[u] = *timer;\n    for &v in &adj[u] {\n        if v as i32 == p { continue; }\n        if tin[v] != -1 { low[u] = std::cmp::min(low[u], tin[v]); }\n        else {\n            dfs(v, u as i32, timer, adj, tin, low, bridges);\n            low[u] = std::cmp::min(low[u], low[v]);\n            if low[v] > tin[u] { bridges.push((std::cmp::min(u, v), std::cmp::max(u, v))); }\n        }\n    }\n}\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut adj = vec![vec![]; n];\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            adj[u].push(v); adj[v].push(u);\n        }\n        let mut tin = vec![-1; n]; let mut low = vec![-1; n];\n        let mut timer = 0; let mut bridges = Vec::new();\n        for i in 0..n {\n            if tin[i] == -1 { dfs(i, -1, &mut timer, &adj, &mut tin, &mut low, &mut bridges); }\n        }\n        bridges.sort();\n        for (u, v) in bridges { println!("{} {}", u, v); }\n    }\n}`
        }
    },
    {
        title: "Cheapest Flights Within K Stops",
        description: "There are N cities connected by M flights. Each flight starts from city u, arrives at v with price w.\n\nGiven src, dst, and a maximum stop budget K, find the cheapest price from src to dst with at most K stops. If impossible, return -1.\n\n**Input Format:**\n- First line: N M\n- Next M lines: u v w\n- Last line: src dst K\n\n**Output Format:**\n- A single integer representing the cheapest flight cost, or -1.",
        difficulty: "HARD",
        tags: ["graphs", "shortest-path"],
        constraints: "1 <= N <= 100\n0 <= M <= N * (N - 1)",
        hints: "Run Bellman-Ford or Dijkstra tracking depth. Limit edge relaxations to K+1.",
        editorial: "Bellman-Ford relaxation for K+1 steps. Copy distances table to prevent extra edge traversals per loop.",
        examples: [
            { title: "Example 1", input: "4 5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 1", output: "700" },
            { title: "Example 2", input: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 0", output: "500" }
        ],
        testcases: [
            { input: "4 5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 1", output: "700" },
            { input: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 0", output: "500" },
            { input: "2 1\n0 1 50\n0 1 0", output: "50" },
            { input: "3 1\n0 1 100\n0 2 1", output: "-1" },
            { input: "4 3\n0 1 10\n1 2 10\n2 3 10\n0 3 1", output: "-1" },
            { input: "4 4\n0 1 10\n1 3 40\n0 2 20\n2 3 20\n0 3 1", output: "40" },
            { input: "5 4\n0 1 10\n1 2 10\n2 3 10\n3 4 10\n0 4 3", output: "40" },
            { input: "4 5\n0 1 1000\n1 2 1000\n0 2 5000\n2 3 1000\n0 3 8000\n0 3 2", output: "3000" },
            { input: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 1", output: "200" },
            { input: "5 6\n0 1 5\n1 2 5\n2 3 5\n3 4 5\n0 3 40\n1 4 40\n0 4 4", output: "20" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, m; if (!(cin >> n >> m)) return 0;\n    vector<tuple<int, int, int>> flights;\n    for (int i = 0; i < m; i++) {\n        int u, v, w; cin >> u >> v >> w; flights.push_back({u, v, w});\n    }\n    int src, dst, k; cin >> src >> dst >> k;\n    vector<int> dist(n, 1e9); dist[src] = 0;\n    for (int i = 0; i <= k; i++) {\n        vector<int> temp = dist;\n        for (auto [u, v, w] : flights) {\n            if (dist[u] != 1e9 && dist[u] + w < temp[v]) temp[v] = dist[u] + w;\n        }\n        dist = temp;\n    }\n    cout << (dist[dst] == 1e9 ? -1 : dist[dst]) << "\\n";\n}`,
            python: `import sys\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n, m = int(data[0]), int(data[1])\n    flights = []\n    idx = 2\n    for _ in range(m):\n        flights.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))\n        idx += 3\n    src, dst, k = int(data[idx]), int(data[idx+1]), int(data[idx+2])\n    dist = [float('inf')] * n\n    dist[src] = 0\n    for _ in range(k + 1):\n        temp = list(dist)\n        for u, v, w in flights:\n            if dist[u] != float('inf') and dist[u] + w < temp[v]:\n                temp[v] = dist[u] + w\n        dist = temp\n    print(dist[dst] if dist[dst] != float('inf') else -1)\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt(), m = sc.nextInt();\n        List<int[]> flights = new ArrayList<>();\n        for (int i = 0; i < m; i++) {\n            flights.add(new int[]{sc.nextInt(), sc.nextInt(), sc.nextInt()});\n        }\n        int src = sc.nextInt(), dst = sc.nextInt(), k = sc.nextInt();\n        int[] dist = new int[n]; Arrays.fill(dist, 1000000000); dist[src] = 0;\n        for (int i = 0; i <= k; i++) {\n            int[] temp = Arrays.copyOf(dist, n);\n            for (int[] f : flights) {\n                int u = f[0], v = f[1], w = f[2];\n                if (dist[u] != 1000000000 && dist[u] + w < temp[v]) temp[v] = dist[u] + w;\n            }\n            dist = temp;\n        }\n        System.out.println(dist[dst] == 1000000000 ? -1 : dist[dst]);\n    }\n}`,
            rust: `use std::io::{self, Read};\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let m: usize = words.next().unwrap().parse().unwrap();\n        let mut flights = Vec::new();\n        for _ in 0..m {\n            let u: usize = words.next().unwrap().parse().unwrap();\n            let v: usize = words.next().unwrap().parse().unwrap();\n            let w: i32 = words.next().unwrap().parse().unwrap();\n            flights.push((u, v, w));\n        }\n        let src: usize = words.next().unwrap().parse().unwrap();\n        let dst: usize = words.next().unwrap().parse().unwrap();\n        let k: usize = words.next().unwrap().parse().unwrap();\n        let mut dist = vec![1_000_000_000; n]; dist[src] = 0;\n        for _ in 0..=k {\n            let mut temp = dist.clone();\n            for &(u, v, w) in &flights {\n                if dist[u] != 1_000_000_000 && dist[u] + w < temp[v] { temp[v] = dist[u] + w; }\n            }\n            dist = temp;\n        }\n        println!("{}", if dist[dst] == 1_000_000_000 { -1 } else { dist[dst] });\n    }\n}`
        }
    },
    {
        title: "Reconstruct Itinerary",
        description: "Given a list of N airline tickets where each ticket consists of a pair of [from, to] airports, reconstruct the itinerary in order and return it. The itinerary must begin with 'JFK'.\n\nIf there are multiple valid itineraries, return the one that has the smallest lexical order.\n\n**Input Format:**\n- First line: N\n- Next N lines: from to\n\n**Output Format:**\n- A single line containing the space-separated sequence of airport codes representing the itinerary.",
        difficulty: "HARD",
        tags: ["graphs", "dfs"],
        constraints: "1 <= N <= 300",
        hints: "Form a directed graph, sort neighbors lexicographically, then use Hierholzer's Algorithm (DFS) to build Eulerian path.",
        editorial: "Eulerian Path using Hierholzer's DFS. Sort neighbor lists in reverse and pop from back to achieve O(1) removals.",
        examples: [
            { title: "Example 1", input: "4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO", output: "JFK MUC LHR SFO SJC" },
            { title: "Example 2", input: "5\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK\nATL SFO", output: "JFK ATL JFK SFO ATL SFO" }
        ],
        testcases: [
            { input: "4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO", output: "JFK MUC LHR SFO SJC" },
            { input: "5\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK\nATL SFO", output: "JFK ATL JFK SFO ATL SFO" },
            { input: "1\nJFK LAX", output: "JFK LAX" },
            { input: "2\nJFK LAX\nLAX SFO", output: "JFK LAX SFO" },
            { input: "2\nJFK LAX\nLAX JFK", output: "JFK LAX JFK" },
            { input: "3\nJFK AAA\nJFK BBB\nBBB JFK", output: "JFK BBB JFK AAA" },
            { input: "5\nJFK AAA\nAAA JFK\nJFK BBB\nBBB JFK\nJFK CCC", output: "JFK AAA JFK BBB JFK CCC" },
            { input: "4\nJFK SFO\nSFO JFK\nJFK LAX\nLAX ORD", output: "JFK SFO JFK LAX ORD" },
            { input: "3\nJFK SFO\nSFO LAX\nLAX SFO", output: "JFK SFO LAX SFO" },
            { input: "7\nJFK LAX\nLAX SFO\nSFO LAX\nLAX JFK\nJFK LAX\nLAX ORD\nORD DFW", output: "JFK LAX SFO LAX JFK LAX ORD DFW" }
        ],
        codesnippets: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() { return 0; }`,
            python: `def main(): pass\nif __name__ == '__main__': main()`,
            java: `public class Main { public static void main(String[] args) {} }`,
            rust: `fn main() {}`
        },
        referneceSolution: {
            cpp: `#include <bits/stdc++.h>\nusing namespace std;\nvoid dfs(string u, unordered_map<string, vector<string>>& adj, vector<string>& path) {\n    while (adj.count(u) && !adj[u].empty()) {\n        string v = adj[u].back(); adj[u].pop_back(); dfs(v, adj, path);\n    }\n    path.push_back(u);\n}\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    unordered_map<string, vector<string>> adj;\n    for (int i = 0; i < n; i++) {\n        string u, v; cin >> u >> v; adj[u].push_back(v);\n    }\n    for (auto& pair : adj) sort(pair.second.rbegin(), pair.second.rend());\n    vector<string> path; dfs("JFK", adj, path);\n    reverse(path.begin(), path.end());\n    for (int i = 0; i < path.size(); i++) cout << path[i] << (i + 1 == path.size() ? "" : " ");\n    cout << "\\n";\n}`,
            python: `import sys\nfrom collections import defaultdict\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    adj = defaultdict(list)\n    idx = 1\n    for _ in range(n):\n        adj[data[idx]].append(data[idx+1])\n        idx += 2\n    for u in adj: adj[u].sort(reverse=True)\n    path = []\n    def dfs(curr):\n        while adj[curr]:\n            dfs(adj[curr].pop())\n        path.append(curr)\n    dfs("JFK")\n    print(*(path[::-1]))\nif __name__ == '__main__': main()`,
            java: `import java.util.*;\npublic class Main {\n    static Map<String, List<String>> adj = new HashMap<>();\n    static List<String> path = new ArrayList<>();\n    static void dfs(String u) {\n        List<String> list = adj.get(u);\n        while (list != null && !list.isEmpty()) {\n            dfs(list.remove(list.size() - 1));\n        }\n        path.add(u);\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String u = sc.next(), v = sc.next();\n            adj.putIfAbsent(u, new ArrayList<>()); adj.get(u).add(v);\n        }\n        for (String u : adj.keySet()) Collections.sort(adj.get(u), Collections.reverseOrder());\n        dfs("JFK");\n        Collections.reverse(path);\n        for (int i = 0; i < path.size(); i++) {\n            System.out.print(path.get(i) + (i + 1 == path.size() ? "" : " "));\n        }\n        System.out.println();\n    }\n}`,
            rust: `use std::io::{self, Read};\nuse std::collections::HashMap;\nfn dfs(curr: String, adj: &mut HashMap<String, Vec<String>>, path: &mut Vec<String>) {\n    while let Some(nxt) = adj.get_mut(&curr).and_then(|list| list.pop()) { dfs(nxt, adj, path); }\n    path.push(curr);\n}\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut words = input.split_whitespace();\n    if let Some(n_str) = words.next() {\n        let n: usize = n_str.parse().unwrap();\n        let mut adj = HashMap::new();\n        for _ in 0..n {\n            let u = words.next().unwrap().to_string();\n            let v = words.next().unwrap().to_string();\n            adj.entry(u).or_insert_with(Vec::new).push(v);\n        }\n        for list in adj.values_mut() { list.sort_by(|a, b| b.cmp(a)); }\n        let mut path = Vec::new();\n        dfs("JFK".to_string(), &mut adj, &mut path);\n        path.reverse();\n        println!("{}", path.join(" "));\n    }\n}`
        }
    }
]
