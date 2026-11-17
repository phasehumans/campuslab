#include <bits/stdc++.h>
using namespace std;
struct State {
    int len, link;
    int next[26];
};
vector<State> st;
vector<int> cnt_occur;
int sz, last;
void sam_init() {
    st.clear();
    cnt_occur.clear();
    st.push_back({0, -1, {}});
    memset(st[0].next, -1, sizeof(st[0].next));
    cnt_occur.push_back(0);
    sz = 1;
    last = 0;
}
void sam_extend(char c) {
    int cur = sz++;
    st.push_back({st[last].len + 1, -1, {}});
    memset(st[cur].next, -1, sizeof(st[cur].next));
    cnt_occur.push_back(1);
    int p = last;
    while (p != -1 && st[p].next[c - 'a'] == -1) {
        st[p].next[c - 'a'] = cur;
        p = st[p].link;
    }
    if (p == -1) {
        st[cur].link = 0;
    } else {
        int q = st[p].next[c - 'a'];
        if (st[p].len + 1 == st[q].len) {
            st[cur].link = q;
        } else {
            int clone = sz++;
            st.push_back({st[p].len + 1, st[q].link, {}});
            memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
            cnt_occur.push_back(0);
            while (p != -1 && st[p].next[c - 'a'] == q) {
                st[p].next[c - 'a'] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    sam_init();
    for (char c : s) {
        sam_extend(c);
    }
    vector<int> states(sz);
    iota(states.begin(), states.end(), 0);
    sort(states.begin(), states.end(), [](int a, int b) {
        return st[a].len > st[b].len;
    });
    for (int u : states) {
        if (st[u].link != -1) {
            cnt_occur[st[u].link] += cnt_occur[u];
        }
    }
    long long total_distinct = 0;
    for (int i = 1; i < sz; i++) {
        total_distinct += st[i].len - st[st[i].link].len;
    }
    int q;
    if (!(cin >> q)) return 0;
    while (q--) {
        string type;
        cin >> type;
        if (type == "distinct") {
            cout << total_distinct << "\n";
        } else {
            string p;
            cin >> p;
            int curr = 0;
            bool possible = true;
            for (char c : p) {
                int idx = c - 'a';
                if (st[curr].next[idx] == -1) {
                    possible = false;
                    break;
                }
                curr = st[curr].next[idx];
            }
            cout << (possible ? cnt_occur[curr] : 0) << "\n";
        }
    }
    return 0;
}
