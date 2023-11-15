import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question14 = {
    title: "Validate Binary Search Tree",
    description:
`Given the root of a binary tree, determine if it is a valid binary search tree
(BST).
A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than
the node's key.
- The right subtree of a node contains only nodes with keys greater
than the node's key.
- Both the left and right subtrees must also be binary search trees.
Example 1:
    (2)
   /   \\
 (1)   (3)
Input: root = [2,1,3]
Output: true 

Example 2:
    (5)
   /   \\
 (1)   (4)
       /   \\
     (3)   (6)
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:
- The number of nodes in the tree is in the range [1, 104].
- -2^31 <= Node.val <= 2^31 - 1 
 
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        pass
`
            , driverCode:
`import sys

# Assuming the TreeNode and Solution classes are defined above

# Helper function to create a binary tree from a list
def createTree(lst):
    if not lst:
        return None
    root = TreeNode(lst[0])
    queue = [root]
    i = 1
    while i < len(lst):
        node = queue.pop(0)
        if lst[i] is not None:
            node.left = TreeNode(lst[i])
            queue.append(node.left)
        i += 1
        if i < len(lst) and lst[i] is not None:
            node.right = TreeNode(lst[i])
            queue.append(node.right)
        i += 1
    return root

testcases = [
    ([2, 1, 3], True),
    ([5, 1, 4, None, None, 3, 6], False)
]
solution = Solution()

for i, (lst, expected_output) in enumerate(testcases, 1):
    root = createTree(lst)
    actual = solution.isValidBST(root)
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`//Definition for a binary tree node.
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    } 
}
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        TreeNode root1 = new TreeNode(2, new TreeNode(1), new TreeNode(3));
        TreeNode root2 = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));

        boolean[] expected = {true, false};
        Solution solution = new Solution();

        boolean[] actual = {solution.isValidBST(root1), solution.isValidBST(root2)};
        for (int i = 0; i < actual.length; i++) {
            if (actual[i] != expected[i]) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expected[i] + ", but got " + actual[i]);
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    return false;
};
`
            , driverCode:
`// Assuming TreeNode and isValidBST functions are defined above

const testcases = [
    { input: new TreeNode(2, new TreeNode(1), new TreeNode(3)), expected: true },
    { input: new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6))), expected: false }
];

testcases.forEach((test, index) => {
    const actual = isValidBST(test.input);
    if (actual !== test.expected) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${test.expected}, but got \${actual}\`);
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`// Definition for a binary tree node.
struct TreeNode {
   int val;
   TreeNode *left;
   TreeNode *right;
   TreeNode() : val(0), left(nullptr), right(nullptr) {}
   TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
   TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return false;
    }
};
`
            , driverCode:
`#include <iostream>
#include <vector>
using namespace std;

// Assuming the TreeNode and Solution classes are defined above

// Helper function to create a binary tree from a list
TreeNode* createTree(const vector<int>& lst) {
    if (lst.empty()) return nullptr;
    vector<TreeNode*> nodes(lst.size(), nullptr);
    for (size_t i = 0; i < lst.size(); ++i) {
        if (lst[i] != -1) { // Assuming -1 represents null
            nodes[i] = new TreeNode(lst[i]);
            if (i > 0) {
                if (i % 2 == 1) nodes[(i - 1) / 2]->left = nodes[i];
                else nodes[(i - 1) / 2]->right = nodes[i];
            }
        }
    }
    return nodes[0];
}

int main() {
    vector<pair<vector<int>, bool>> testcases = {
        {{2, 1, 3}, true},
        {{5, 1, 4, -1, -1, 3, 6}, false}
    };
    Solution solution;

    for (int i = 0; i < testcases.size(); i++) {
        TreeNode* root = createTree(testcases[i].first);
        bool actual = solution.isValidBST(root);
        if (actual != testcases[i].second) {
            cerr << "AssertionError: Test " << (i + 1) << ": Expected " << testcases[i].second << ", but got " << actual << endl;
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`#include <stdbool.h>
#include <stddef.h>

// Definition for a binary tree node.
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

bool isValidBST(struct TreeNode* root){
    return false;
}
`
            , driverCode:
`#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

// Assuming the TreeNode structure and isValidBST function are defined above

struct TreeNode* newNode(int value) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = value;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void freeTree(struct TreeNode* root) {
    if (root) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

int main() {
    // Creating test trees
    struct TreeNode* root1 = newNode(2);
    root1->left = newNode(1);
    root1->right = newNode(3);

    struct TreeNode* root2 = newNode(5);
    root2->left = newNode(1);
    root2->right = newNode(4);
    root2->right->left = newNode(3);
    root2->right->right = newNode(6);

    // Test cases
    struct TestCase {
        struct TreeNode* root;
        bool expected;
    };

    struct TestCase testcases[] = {
        {root1, true},
        {root2, false}
    };

    for (int i = 0; i < 2; i++) {
        bool actual = isValidBST(testcases[i].root);
        if (actual != testcases[i].expected) {
            fprintf(stderr, "AssertionError: Test %d: Expected %s, but got %s\n",
                    i + 1, testcases[i].expected ? "true" : "false", actual ? "true" : "false");
        }
        freeTree(testcases[i].root); // Free the allocated memory for the tree
    }

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
