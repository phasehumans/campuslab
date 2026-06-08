import { recursionBacktrackingProblems } from './07-recursion-backtracking.ts';
const cpp = recursionBacktrackingProblems[0].referneceSolution.cpp;
const index = cpp.indexOf('cout <<');
console.log('Substring:', cpp.substring(index, index + 35));
for (let i = index; i < index + 35; i++) {
    console.log(cpp[i], cpp.charCodeAt(i));
}
