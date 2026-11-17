#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n;
    int l, q;
    if (!(cin >> n >> l >> q)) return 0;
    
    unordered_map<int, int> row_count;
    unordered_map<int, int> col_count;
    unordered_map<int, int> diag1_count;
    unordered_map<int, int> diag2_count;
    unordered_set<long long> lamps;
    
    for (int i = 0; i < l; i++) {
        int r, c;
        cin >> r >> c;
        long long key = ((long long)r << 32) | (c & 0xFFFFFFFFLL);
        if (!lamps.count(key)) {
            lamps.insert(key);
            row_count[r]++;
            col_count[c]++;
            diag1_count[r - c]++;
            diag2_count[r + c]++;
        }
    }
    
    for (int i = 0; i < q; i++) {
        int r, c;
        cin >> r >> c;
        if (i > 0) cout << " ";
        
        if (row_count[r] > 0 || col_count[c] > 0 || diag1_count[r - c] > 0 || diag2_count[r + c] > 0) {
            cout << 1;
        } else {
            cout << 0;
        }
        
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                int nr = r + dr;
                int nc = c + dc;
                long long nkey = ((long long)nr << 32) | (nc & 0xFFFFFFFFLL);
                if (lamps.count(nkey)) {
                    lamps.erase(nkey);
                    row_count[nr]--;
                    col_count[nc]--;
                    diag1_count[nr - nc]--;
                    diag2_count[nr + nc]--;
                }
            }
        }
    }
    cout << "\n";
    return 0;
}
