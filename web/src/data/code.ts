import { cpp } from '@codemirror/lang-cpp'
import type { EditorLanguage } from '@/lib/types'

export const FALLBACK_CODE: Record<EditorLanguage, string> = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    // Write your solution here.
    return 0;
}`,
}

export const LANGUAGES = [
    { id: 'cpp', name: 'C++ (GCC 13 / C++20)', ext: cpp },
] as const
