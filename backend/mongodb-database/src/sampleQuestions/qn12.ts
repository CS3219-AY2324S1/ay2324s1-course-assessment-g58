import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question12 = {
    title: "Rotate Image",
    description:
`You are given an n x n 2D matrix representing an image, rotate the image by
90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the
input 2D matrix directly. DO NOT allocate another 2D matrix and do the
rotation. 

Example 1:
[1, 2, 3,        [7, 4, 1,
 4, 5, 6,   ->    8, 5, 2,
 7, 8, 9]         9, 6, 3]

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2: 
[ 5, 1, 9, 11,        [15, 13, 2, 5,
  2, 4, 8, 10,         14, 3, 4, 1,
  13, 3, 6, 7,    ->   12, 6, 8, 9,
  15, 14, 12, 16]      16, 7, 10, 11]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Constraints:
- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000 
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Arrays",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import List

class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        pass
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [
    ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[7, 4, 1], [8, 5, 2], [9, 6, 3]]),
    ([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]], [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]])
]
solution = Solution()

for i, (matrix, expected_output) in enumerate(testcases, 1):
    solution.rotate(matrix)
    if matrix != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {matrix}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class Solution {
    public void rotate(int[][] matrix) {
        
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        int[][][] testcases = {
            {new int[]{1, 2, 3}, new int[]{4, 5, 6}, new int[]{7, 8, 9}},
            {new int[]{5, 1, 9, 11}, new int[]{2, 4, 8, 10}, new int[]{13, 3, 6, 7}, new int[]{15, 14, 12, 16}}
        };
        int[][][] expected = {
            {new int[]{7, 4, 1}, new int[]{8, 5, 2}, new int[]{9, 6, 3}},
            {new int[]{15, 13, 2, 5}, new int[]{14, 3, 4, 1}, new int[]{12, 6, 8, 9}, new int[]{16, 7, 10, 11}}
        };
        Solution solution = new Solution();

        for (int i = 0; i < testcases.length; i++) {
            solution.rotate(testcases[i]);
            if (!Arrays.deepEquals(testcases[i], expected[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + Arrays.deepToString(expected[i]) + ", but got " + Arrays.deepToString(testcases[i]));
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {number[][]} matrix
* @return {void} Do not return anything, modify matrix in-place instead.
*/
var rotate = function(matrix) {

};
`
            , driverCode:
`// Assuming rotate function is defined above

const testcases = [
    { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
    { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]], expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] }
];

testcases.forEach((test, index) => {
    rotate(test.matrix);
    if (JSON.stringify(test.matrix) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(test.matrix)}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <vector>

using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>> &matrix){

    }
};
`
            , driverCode:
`#include <iostream>
#include <vector>
using namespace std;

// Assuming the Solution class is defined above

int main() {
    vector<pair<vector<vector<int>>, vector<vector<int>>>> testcases = {
        {{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, {{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}},
        {{{5, 1, 9, 11}, {2, 4, 8, 10}, {13, 3, 6, 7}, {15, 14, 12, 16}}, {{15, 13, 2, 5}, {14, 3, 4, 1}, {12, 6, 8, 9}, {16, 7, 10, 11}}}
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        solution.rotate(testcases[i].first);
        if (testcases[i].first != testcases[i].second) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected ";
            for (auto &row : testcases[i].second) {
                for (auto &elem : row) {
                    cerr << elem << " ";
                }
                cerr << endl;
            }
            cerr << "but got ";
            for (auto &row : testcases[i].first) {
                for (auto &elem : row) {
                    cerr << elem << " ";
                }
                cerr << endl;
            }
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
`void rotate(int** matrix, int matrixSize, int* matrixColSize){
    
}
`
            , driverCode:
`#include <stdio.h>
#include <stdlib.h>

// Assuming rotate function is defined above

void printMatrix(int** matrix, int matrixSize) {
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < matrixSize; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int matrix1[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int matrix2[4][4] = {{5, 1, 9, 11}, {2, 4, 8, 10}, {13, 3, 6, 7}, {15, 14, 12, 16}};
    int* matrix1Ptr[3] = {matrix1[0], matrix1[1], matrix1[2]};
    int* matrix2Ptr[4] = {matrix2[0], matrix2[1], matrix2[2], matrix2[3]};
    int matrixColSize = 3;
    int matrixColSize2 = 4;

    // Test case 1
    rotate(matrix1Ptr, 3, &matrixColSize);
    printf("Test 1 Output:\n");
    printMatrix(matrix1Ptr, 3);

    // Test case 2
    rotate(matrix2Ptr, 4, &matrixColSize2);
    printf("Test 2 Output:\n");
    printMatrix(matrix2Ptr, 4);

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
