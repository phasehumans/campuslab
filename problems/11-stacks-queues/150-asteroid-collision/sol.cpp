#include <bits/stdc++.h>
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
        cout << "\n";
    }
    return 0;
}
