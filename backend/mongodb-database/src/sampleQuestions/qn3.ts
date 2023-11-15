import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question3 = {
    title: "Roman to Integer",
    description:
`Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

Example 1:
Input: s = "III"
Output: 3
Explanation: III = 3.

Example 2:
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

Example 3:
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 

Constraints:

- 1 <= s.length <= 1^5
- s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
- It is guaranteed that s is a valid roman numeral in the range [1, 3999].
`,
    difficulty: DIFFICULTY.EASY,
    category: "Algorithms",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def romanToInt(self, s: str) -> int:
        pass
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [("III", 3), ("LVIII", 58), ("MCMXCIV", 1994)]
solution = Solution()

for i, (input_val, expected_output) in enumerate(testcases, 1):
    actual = solution.romanToInt(input_val)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class Solution {
    public int romanToInt(String s) {
        return 0;
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        String[] inputs = {"III", "LVIII", "MCMXCIV"};
        int[] expectedOutputs = {3, 58, 1994};
        Solution solution = new Solution();

        for (int i = 0; i < inputs.length; i++) {
            int actual = solution.romanToInt(inputs[i]);
            if (actual != expectedOutputs[i]) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expectedOutputs[i] + ", but got " + actual);
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {string} s
* @return {number}
*/
var romanToInt = function(s) {
    return 0;
};
`
            , driverCode:
`const testcases = [
    { input: "III", expected: 3 },
    { input: "LVIII", expected: 58 },
    { input: "MCMXCIV", expected: 1994 }
];

testcases.forEach((test, index) => {
    const actual = romanToInt(test.input);
    if (actual !== test.expected) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${test.expected}, but got \${actual}\`);
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
    int romanToInt(string s) {
        return 0;
    }
};
`
            , driverCode:
`int main() {
    vector<pair<string, int>> testcases = {{"III", 3}, {"LVIII", 58}, {"MCMXCIV", 1994}};
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        string input = testcases[i].first;
        int expected = testcases[i].second;
        int actual = solution.romanToInt(input);

        if (actual != expected) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected " << expected << ", but got " << actual << endl;
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`int romanToInt(char * s) {
    
}
`
            , driverCode:
`#include <stdio.h>
#include <string.h>

// Assuming the romanToInt function is defined above

int main() {
    struct TestCase {
        char input[15];
        int expected;
    } testcases[] = {
        {"III", 3},
        {"LVIII", 58},
        {"MCMXCIV", 1994}
    };

    int numberOfTests = sizeof(testcases) / sizeof(testcases[0]);

    for(int i = 0; i < numberOfTests; i++) {
        int actual = romanToInt(testcases[i].input);
        if(actual != testcases[i].expected) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\n", i + 1, testcases[i].expected, actual);
        }
    }

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
