import { LANGUAGE } from "../utils/enums";

export type questionTemplate = {
    language: string;
    starterCode: string;
    driverCode: string | null;
};

type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[];
};

export default Question;

// Default question template
export const defaultQuestionTemplates: questionTemplate[] = [
    {
        language: LANGUAGE.PYTHON,
        starterCode:
`class Solution:
    def foo(self, x):
        # Write your code here
        return 0
`,
        driverCode:
`import sys
testcases = [(1, 0), (2, 0)]

# solution instance
solution = Solution()

# Testing loop
for i, (input_val, expected_output) in enumerate(testcases, 1):
    if solution.foo(input_val) != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {input_val}", file=sys.stderr)
`
    },
    {
        language: LANGUAGE.CPP,
        starterCode:
`class Solution {
    public:
        int foo(int x) {
            // Write your code here
            return 0;
        }
};
`,
        driverCode:
`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<pair<int, int>> testcases = {{1, 0}, {2, 0}};
    Solution solution;
    for(int i = 0; i < testcases.size(); i++) {
        int input = testcases[i].first;
        int expected = testcases[i].second;
        int actual = solution.foo(input);
        if(actual != expected) {
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
`int foo(int x) {
    // Write your code here
    return 0;
}
`,
        driverCode:
`#include <stdio.h>

int main() {
    int testcases[][2] = {{1, 0}, {2, 0}};
    for(int i = 0; i < sizeof(testcases) / sizeof(testcases[0]); i++) {
        int input = testcases[i][0];
        int expected = testcases[i][1];
        int actual = foo(input);
        if(actual != expected) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\\n", i + 1, expected, actual);
        }
    }
    return 0;
}
`
    },
    {
        language: LANGUAGE.JAVA,
        starterCode:
`class Solution {
    public int foo(int x) {
        // Write your code here
        return 0;
    }
}
`,
        driverCode:
`public class Main {
    public static void main(String[] args) {
        int[][] testcases = {{1, 0}, {2, 0}};
        Solution solution = new Solution();
        for(int i = 0; i < testcases.length; i++) {
            int input = testcases[i][0];
            int expected = testcases[i][1];
            int actual = solution.foo(input);
            if(actual != expected) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expected + ", but got " + actual);
            }
        }
    }
}
`
    },
    {
        language: LANGUAGE.JAVASCRIPT,
        starterCode:
`class Solution {
    foo(x) {
        // Write your code here
        return 0;
    }
}
`,
        driverCode:
`const testcases = [
    {input: 1, expected: 0},
    {input: 2, expected: 0}
];
const solution = new Solution();
testcases.forEach((test, index) => {
    const actual = solution.foo(test.input);
    
    if(JSON.stringify(actual) !== JSON.stringify(test.expected)) {
        console.error(\`AssertionError: Test $\{index + 1}: Expected $\{test.expected}, but got $\{actual}\`);
    }
});
`
    }
];
