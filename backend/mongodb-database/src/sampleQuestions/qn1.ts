import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question1 = {
    title: "Reverse String",
    description:
`Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:

Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:

- 1 <= s.length <= 10^5
- s[i] is a printable ascii character. 
`,
    difficulty: DIFFICULTY.EASY,
    category: "Strings",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import List

class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        pass
`
            , driverCode:
`import sys

# Test cases
testcases = [(['h', 'e', 'l', 'l', 'o'], ['o', 'l', 'l', 'e', 'h']), 
             (['H', 'a', 'n', 'n', 'a', 'h'], ['h', 'a', 'n', 'n', 'a', 'H'])]

# Solution instance
solution = Solution()

# Testing loop
for i, (input_val, expected_output) in enumerate(testcases, 1):
    solution.reverseString(input_val)
    if input_val != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {input_val}", file=sys.stderr)`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.Arrays;

class Solution {
    public void reverseString(char[] s) {

    }
}`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        char[][] testcases = {{'h', 'e', 'l', 'l', 'o'}, {'H', 'a', 'n', 'n', 'a', 'h'}};
        char[][] expected = {{'o', 'l', 'l', 'e', 'h'}, {'h', 'a', 'n', 'n', 'a', 'H'}};
        Solution solution = new Solution();

        for (int i = 0; i < testcases.length; i++) {
            char[] input = testcases[i].clone();
            solution.reverseString(input);
            if (!Arrays.equals(input, expected[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + Arrays.toString(expected[i]) + ", but got " + Arrays.toString(input));
            }
        }
    }
}`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {character[]} s
* @return {void} Do not return anything, modify s in-place instead.
*/
var reverseString = function(s) {
   
};`
            , driverCode:
`const testcases = [
    { input: ['h', 'e', 'l', 'l', 'o'], expected: ['o', 'l', 'l', 'e', 'h'] },
    { input: ['H', 'a', 'n', 'n', 'a', 'h'], expected: ['h', 'a', 'n', 'n', 'a', 'H'] }
];

// Test function
testcases.forEach((test, index) => {
    reverseString(test.input);
    if (JSON.stringify(test.input) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(test.expected)}, but got \${JSON.stringify(test.input)}\`);
    }
});`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
#include <vector>
#include <utility>
using namespace std;
class Solution {
public:
    void reverseString(vector<char>& s) {

    }
};`
            , driverCode:
`int main() {
    vector<pair<vector<char>, vector<char>>> testcases = {
        {{'h', 'e', 'l', 'l', 'o'}, {'o', 'l', 'l', 'e', 'h'}},
        {{'H', 'a', 'n', 'n', 'a', 'h'}, {'h', 'a', 'n', 'n', 'a', 'H'}}
    };
    Solution solution;
    for(int i = 0; i < testcases.size(); i++) {
        vector<char> input = testcases[i].first;
        vector<char> expected = testcases[i].second;
        solution.reverseString(input);
        if(input != expected) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected ";
            for (char ch : expected) cerr << ch;
            cerr << ", but got ";
            for (char ch : input) cerr << ch;
            cerr << endl;
        }
    }
    return 0;
}`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`void reverseString(char* s, int sSize){

}`
            , driverCode:
`#include <stdio.h>
#include <string.h>
int main() {
    char test1[] = "hello";
    char test2[] = "Hannah";
    char *testcases[] = {test1, test2};
    char *expected[] = {"olleh", "hannaH"};
    int numCases = 2;

    for(int i = 0; i < numCases; i++) {
        char *input = testcases[i];
        reverseString(input, strlen(input));
        if(strcmp(input, expected[i]) != 0) {
            fprintf(stderr, "AssertionError: Test %d: Expected %s, but got %s\n", i + 1, expected[i], input);
        }
    }
    return 0;
}`
        }
    ],
    functions: [],
    calls: [],
};
