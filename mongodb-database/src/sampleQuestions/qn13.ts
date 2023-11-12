import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question13 = {
    title: "Airplane Seat Assignment Probability",
    description:
`n passengers board an airplane with exactly n seats. The first passenger has
lost the ticket and picks a seat randomly. But after that, the rest of the
passengers will:
Take their own seat if it is still available, and
Pick other seats randomly when they find their seat occupied
Return the probability that the nth person gets his own seat.

Example 1:
Input: n = 1
Output: 1.00000
Explanation: The first person can only get the first seat.

Example 2:
Input: n = 2
Output: 0.50000
Explanation: The second person has a probability of 0.5 to get the second
seat (when first person gets the first seat).

Constraints:
- 1 <= n <= 10^5
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Brainteaser",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class Solution:
    def nthPersonGetsNthSeat(self, n: int) -> float:
        pass
`
            , driverCode:
`import sys

# Assuming the Solution class is defined above

testcases = [
    (1, 1.0),
    (2, 0.5)
]
solution = Solution()

for i, (n, expected_output) in enumerate(testcases, 1):
    actual = solution.nthPersonGetsNthSeat(n)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class Solution {
    public double nthPersonGetsNthSeat(int n) {
       return 0.0; 
    }
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        int[] inputs = {1, 2};
        double[] expectedOutputs = {1.0, 0.5};
        Solution solution = new Solution();

        for (int i = 0; i < inputs.length; i++) {
            double actual = solution.nthPersonGetsNthSeat(inputs[i]);
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
* @param {number} n
* @return {number}
*/
var nthPersonGetsNthSeat = function(n) {
   return 0;
};
`
            , driverCode:
`// Assuming nthPersonGetsNthSeat function is defined above

const testcases = [
    { n: 1, expected: 1.0 },
    { n: 2, expected: 0.5 }
];

testcases.forEach((test, index) => {
    const actual = nthPersonGetsNthSeat(test.n);
    
    if (actual !== test.expected) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${test.expected}, but got \${actual}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`class Solution {
public:
    double nthPersonGetsNthSeat(int n) {
        return 0.0;
    }
};
`
            , driverCode:
`#include <iostream>
#include <vector>
using namespace std;

// Assuming the Solution class is defined above

int main() {
    vector<pair<int, double>> testcases = {
        {1, 1.0},
        {2, 0.5}
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        double actual = solution.nthPersonGetsNthSeat(testcases[i].first);
        double expected = testcases[i].second;

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
`double nthPersonGetsNthSeat(int n){
    return 0.0;    
}
`
            , driverCode:
`#include <stdio.h>

// Assuming nthPersonGetsNthSeat function is defined above

int main() {
    int inputs[] = {1, 2};
    double expected[] = {1.0, 0.5};
    int numTests = 2;

    for (int i = 0; i < numTests; i++) {
        double actual = nthPersonGetsNthSeat(inputs[i]);
        if (actual != expected[i]) {
            fprintf(stderr, "AssertionError: Test %d: Expected %f, but got %f\n", i + 1, expected[i], actual);
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
