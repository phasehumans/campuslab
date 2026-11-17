Assume you are a parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

**Input Format:**
- First line: integer n (number of children)
- Second line: n space-separated integers representing the greed factors g[i]
- Third line: integer m (number of cookies)
- Fourth line: m space-separated integers representing the cookie sizes s[j]

**Output Format:**
- A single integer: the maximum number of children who can be content
