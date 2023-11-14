import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question16 = {
    title: "N-Queen Problem",
    description:
`The n-queens puzzle is the problem of placing n queens on an n x n
chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You
may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens'
placement, where 'Q' and '.' both indicate a queen and an empty space,
respectively.
Example 1: 
[' ', 'Q', ' ', ' ',    [' ', ' ', 'Q', ' ',

 ' ', ' ', ' ', 'Q',     'Q', ' ', ' ', ' ',

 'Q', ' ', ' ', ' ',     ' ', ' ', ' ', 'Q',

 ' ', ' ', 'Q', ' ']     ' ', 'Q', ' ', ' ']

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:
Input: n = 1
Output: [["Q"]]
Constraints:
- 1 <= n <= 9 
`,
    difficulty: DIFFICULTY.HARD,
    category: "Algorithms",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import List

class Solution:
def solveNQueens(self, n: int) -> List[List[str]]:
    pass
`
            , driverCode:
`import sys

# Assume the Solution class and solveNQueens method are defined above

testcases = [(4, [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]), (1, [["Q"]])]

solution = Solution()

for i, (input_val, expected_output) in enumerate(testcases, 1):
    actual_output = solution.solveNQueens(input_val)
    if actual_output != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual_output}", file=sys.stderr)   
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        
    }
}
`
            , driverCode:
`// Assume the Solution class and solveNQueens method are defined above

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();

        List<List<String>> expected1 = Arrays.asList(
            Arrays.asList(".Q..","...Q","Q...","..Q."),
            Arrays.asList("..Q.","Q...","...Q",".Q..")
        );
        List<List<String>> actual1 = solution.solveNQueens(4);
        if (!actual1.equals(expected1)) {
            System.err.println("AssertionError: Test 1: Expected " + expected1 + ", but got " + actual1);
        }

        List<List<String>> expected2 = Collections.singletonList(
            Collections.singletonList("Q")
        );
        List<List<String>> actual2 = solution.solveNQueens(1);
        if (!actual2.equals(expected2)) {
            System.err.println("AssertionError: Test 2: Expected " + expected2 + ", but got " + actual2);
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {number} n
* @return {string[][]}
*/
var solveNQueens = function(n) {
   
};
`
            , driverCode:
`// Assume solveNQueens function is defined above

const testcases = [
    {input: 4, expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]},
    {input: 1, expected: [["Q"]]}
];

testcases.forEach((test, index) => {
    const actual = solveNQueens(test.input);
    if (JSON.stringify(actual) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(actual)}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        
    }
};
`
            , driverCode:
`// Assume the Solution class and solveNQueens method are defined above

// Helper function to print a vector of vectors of strings
void printVectorOfVectorStrings(const vector<vector<string>>& v) {
    cout << "[";
    for (const auto& vec : v) {
        cout << "[";
        for (const auto& str : vec) {
            cout << "\"" << str << "\"";
            if (&str != &vec.back()) cout << ", ";
        }
        cout << "]";
        if (&vec != &v.back()) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    vector<pair<int, vector<vector<string>>>> testcases = {
        {4, {{".Q..","...Q","Q...","..Q."}, {"..Q.","Q...","...Q",".Q.."}}},
        {1, {{"Q"}}}
    };
    Solution solution;

    for(int i = 0; i < testcases.size(); i++) {
        int input = testcases[i].first;
        vector<vector<string>> expected = testcases[i].second;
        vector<vector<string>> actual = solution.solveNQueens(input);
        if (actual != expected) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected ";
            printVectorOfVectorStrings(expected);
            cerr << ", but got ";
            printVectorOfVectorStrings(actual);
            cerr << endl;
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`#include <stdlib.h>
#include <string.h>
#include <stdio.h>

/**
* Return an array of arrays of size *returnSize.
* The sizes of the arrays are returned as *returnColumnSizes array.
* Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
*/
char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {
   
}
`
            , driverCode:
`int compareStringArrays(char*** arr1, char*** arr2, int size1, int size2, int* colSizes1, int* colSizes2) {
    if (size1 != size2) return 0;
    for (int i = 0; i < size1; i++) {
        if (colSizes1[i] != colSizes2[i]) return 0;
        for (int j = 0; j < colSizes1[i]; j++) {
            if (strcmp(arr1[i][j], arr2[i][j]) != 0) return 0;
        }
    }
    return 1;
}

void printArray(char*** arr, int size, int* colSizes) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < colSizes[i]; j++) {
            printf("%s ", arr[i][j]);
        }
        printf("\n");
    }
}

void freeArray(char*** arr, int size, int* colSizes) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < colSizes[i]; j++) {
            free(arr[i][j]);
        }
        free(arr[i]);
    }
    free(arr);
}

int main() {
    // Test case for n=1
    int test1Size = 1, test1ColSizes[] = {1};
    char* test1Solution[] = {"Q"};
    char** test1[] = {test1Solution};
    char*** result1;
    int result1Size, *result1ColSizes;
    result1 = solveNQueens(1, &result1Size, &result1ColSizes);

    if (!compareStringArrays(test1, result1, test1Size, result1Size, test1ColSizes, result1ColSizes)) {
        fprintf(stderr, "AssertionError: Test 1: Expected ");
        printArray(test1, test1Size, test1ColSizes);
        fprintf(stderr, "but got ");
        printArray(result1, result1Size, result1ColSizes);
    }
    freeArray(result1, result1Size, result1ColSizes);

    // Test case for n=4
    int test2Size = 2, test2ColSizes[] = {4, 4};
    char* solution1[] = {".Q..", "...Q", "Q...", "..Q."};
    char* solution2[] = {"..Q.", "Q...", "...Q", ".Q.."};
    char** test2[] = {solution1, solution2};
    char*** result2;
    int result2Size, *result2ColSizes;
    result2 = solveNQueens(4, &result2Size, &result2ColSizes);

    if (!compareStringArrays(test2, result2, test2Size, result2Size, test2ColSizes, result2ColSizes)) {
        fprintf(stderr, "AssertionError: Test 2: Expected ");
        printArray(test2, test2Size, test2ColSizes);
        fprintf(stderr, "but got ");
        printArray(result2, result2Size, result2ColSizes);
    }
    freeArray(result2, result2Size, result2ColSizes);

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
