#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, maxWidth;
    if (!(cin >> n >> maxWidth)) return 0;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];
    vector<string> result;
    int i = 0;
    while (i < n) {
        int line_len = words[i].length();
        int last = i + 1;
        while (last < n) {
            if (line_len + 1 + words[last].length() > (size_t)maxWidth) break;
            line_len += 1 + words[last].length();
            last++;
        }
        string line = "";
        int num_words = last - i;
        if (last == n || num_words == 1) {
            for (int k = i; k < last; k++) {
                line += words[k];
                if (k < last - 1) line += " ";
            }
            while (line.length() < (size_t)maxWidth) line += " ";
        } else {
            int total_spaces = maxWidth - (line_len - (num_words - 1));
            int base_spaces = total_spaces / (num_words - 1);
            int extra_spaces = total_spaces % (num_words - 1);
            for (int k = i; k < last - 1; k++) {
                line += words[k];
                int spaces_to_apply = base_spaces + (k - i < extra_spaces ? 1 : 0);
                for (int s = 0; s < spaces_to_apply; s++) line += " ";
            }
            line += words[last - 1];
        }
        result.push_back(line);
        i = last;
    }
    for (const auto& line : result) {
        cout << line << "\n";
    }
    return 0;
}
