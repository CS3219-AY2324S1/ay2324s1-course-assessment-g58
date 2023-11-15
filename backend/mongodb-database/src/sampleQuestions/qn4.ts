import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question4 = {
    title: "Add Binary",
    description:
`Given two binary strings a and b, return their sum as a binary string.
Example 1:
Input: a = "11", b = "1"
Output: "100"
Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
- 1 <= a.length, b.length <= 10^4
- a and b consist only of '0' or '1' characters.
- Each string does not contain leading zeros except for the zero itself
`,
    difficulty: DIFFICULTY.EASY,
    category: "Bit Manipulation",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return '0'
`
            , driverCode:
`import sys

# Assuming Solution class is defined above

testcases = [("11", "1", "100"), ("1010", "1011", "10101")]
solution = Solution()

for i, (a, b, expected) in enumerate(testcases, 1):
    actual = solution.addBinary(a, b)
    if actual != expected:
        print(f"AssertionError: Test {i}: Expected {expected}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class Solution {
    public String addBinary(String a, String b) {
        return "0";
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        String[][] testcases = {{"11", "1", "100"}, {"1010", "1011", "10101"}};
        Solution solution = new Solution();

        for (int i = 0; i < testcases.length; i++) {
            String a = testcases[i][0];
            String b = testcases[i][1];
            String expected = testcases[i][2];
            String actual = solution.addBinary(a, b);

            if (!actual.equals(expected)) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expected + ", but got " + actual);
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {string} a
* @param {string} b
* @return {string}
*/
var addBinary = function(a, b) {
    return '0'; 
};
`
            , driverCode:
`// Assuming addBinary function is defined above

const testcases = [
    { a: "11", b: "1", expected: "100" },
    { a: "1010", b: "1011", expected: "10101" }
];

testcases.forEach((test, index) => {
    const actual = addBinary(test.a, test.b);
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
#include <string>
#include <vector>
#include <utility>

using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        return "0";
    }
};
`
            , driverCode:
`// Assuming Solution class is defined above

int main() {
    vector<pair<pair<string, string>, string>> testcases = {{{"11", "1"}, "100"}, {{"1010", "1011"}, "10101"}};
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        string a = testcases[i].first.first;
        string b = testcases[i].first.second;
        string expected = testcases[i].second;
        string actual = solution.addBinary(a, b);

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
`char* addBinary(char * a, char * b){
    return "0";
}
`
            , driverCode:
`#include <stdio.h>
#include <string.h>

// Assuming addBinary function is defined above

int main() {
    struct TestCase {
        char a[20];
        char b[20];
        char expected[20];
    } testcases[] = {
        {"11", "1", "100"},
        {"1010", "1011", "10101"}
    };

    int numberOfTests = sizeof(testcases) / sizeof(testcases[0]);

    for (int i = 0; i < numberOfTests; i++) {
        char* actual = addBinary(testcases[i].a, testcases[i].b);
        if (strcmp(actual, testcases[i].expected) != 0) {
            fprintf(stderr, "AssertionError: Test %d: Expected %s, but got %s\n", i + 1, testcases[i].expected, actual);
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
