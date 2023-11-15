import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question17 = {
    title: "Serialize and Deserialize Binary Tree",
    description:
`Serialization is the process of converting a data structure or object into a
sequence of bits so that it can be stored in a file or memory buffer, or
transmitted across a network connection link to be reconstructed later in
the same or another computer environment.
Design an algorithm to serialize and deserialize a binary tree. There is no
restriction on how your serialization/deserialization algorithm should work.
You just need to ensure that a binary tree can be serialized to a string and
this string can be deserialized to the original tree structure.
Clarification: The input/output format is the same as how LeetCode
serializes a binary tree. You do not necessarily need to follow this format, so
please be creative and come up with different approaches yourself.
Example 1: 
        (1)
       /   \\
    (2)     (3)
           /   \\
        (4)     (5)
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:
Input: root = []
Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
- -1000 <= Node.val <= 1000
`,
    difficulty: DIFFICULTY.HARD,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
        

# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# ans = deser.deserialize(ser.serialize(root))
`
            , driverCode:
`import sys

# Test cases
testcases = [([1, 2, 3, None, None, 4, 5], [1, 2, 3, None, None, 4, 5]),  # Example 1
             ([], [])]  # Example 2

# Codec instance
ser = Codec()
deser = Codec()

def create_tree(lst):
    if not lst:
        return None

    root = TreeNode(lst[0])
    queue = [root]

    i = 1
    while i < len(lst):
        current = queue.pop(0)

        # Assign left child
        if i < len(lst) and lst[i] is not None:
            current.left = TreeNode(lst[i])
            queue.append(current.left)
        i += 1

        # Assign right child
        if i < len(lst) and lst[i] is not None:
            current.right = TreeNode(lst[i])
            queue.append(current.right)
        i += 1

    return root

def tree_to_list(root):
    if not root:
        return []
    result, queue = [], [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(int(node.val))
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    # Remove trailing None values
    while result and result[-1] is None:
        result.pop()
    return result

# Testing loop
for i, (input_val, expected_output) in enumerate(testcases, 1):
    actual = tree_to_list(deser.deserialize(ser.serialize(create_tree(input_val))))
    if actual != expected_output:
        print(f"AssertionError: Test {i}: Expected {expected_output}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

// Definition for a binary tree node.
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        
    }
}

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// TreeNode ans = deser.deserialize(ser.serialize(root));
`
            , driverCode:
`public class Main {
    private static TreeNode createTree(Integer[] array) {
        if (array == null || array.length == 0 || array[0] == null) {
            return null;
        }

        TreeNode root = new TreeNode(array[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        int i = 1;
        while (!queue.isEmpty() && i < array.length) {
            TreeNode current = queue.poll();

            if (i < array.length && array[i] != null) {
                TreeNode left = new TreeNode(array[i]);
                current.left = left;
                queue.add(left);
            }
            i++;

            if (i < array.length && array[i] != null) {
                TreeNode right = new TreeNode(array[i]);
                current.right = right;
                queue.add(right);
            }
            i++;
        }

        return root;
    }
    private static Integer[] treeToArray(TreeNode root) {
        if (root == null) {
            return new Integer[0];
        }

        List<Integer> list = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) {
                list.add(node.val);
                queue.add(node.left);
                queue.add(node.right);
            } else {
                list.add(null);
            }
        }

        // Removing trailing nulls
        int i = list.size() - 1;
        while (i >= 0 && list.get(i) == null) {
            list.remove(i);
            i--;
        }

        return list.toArray(new Integer[0]);
    }

    public static void main(String[] args) {
        Codec ser = new Codec();
        Codec deser = new Codec();
        Integer[][] testCases = { {1, 2, 3, null, null, 4, 5}, {} };
        Integer[][] expectedOutputs = { {1, 2, 3, null, null, 4, 5}, {} };

        for (int i = 0; i < testCases.length; i++) {
            TreeNode root = createTree(testCases[i]);
            TreeNode deserialized = deser.deserialize(ser.serialize(root));
            if (!Arrays.equals(treeToArray(deserialized), expectedOutputs[i])) {
                System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + Arrays.toString(expectedOutputs[i]) + ", but got " + Arrays.toString(treeToArray(deserialized)));
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
`
            , driverCode:
`const testCases = [[[1, 2, 3, null, null, 4, 5], [1, 2, 3, null, null, 4, 5]], [[], []]];

testCases.forEach((testCase, index) => {
    const [input, expected] = testCase;
    const root = createTree(input);
    const actual = treeToArray(deserialize(serialize(root)));

    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        console.error(\`AssertionError: Test \${index + 1}: Expected \${JSON.stringify(expected)}, but got \${JSON.stringify(actual)}\`);
    }
});

function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function createTree(list) {
    if (!list.length || list[0] === null) return null;

    let root = new TreeNode(list[0]);
    let queue = [root];
    let i = 1;

    while (queue.length && i < list.length) {
        let currentNode = queue.shift();

        if (list[i] !== null) {
            currentNode.left = new TreeNode(list[i]);
            queue.push(currentNode.left);
        }
        i++;

        if (i < list.length && list[i] !== null) {
            currentNode.right = new TreeNode(list[i]);
            queue.push(currentNode.right);
        }
        i++;
    }

    return root;
}

function treeToArray(root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length) {
        let node = queue.shift();
        if (node) {
            // cast node.val as int
            const val = parseInt(node.val);
            result.push(val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }

    // Remove trailing nulls from the array
    while (result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
#include <vector>
#include <string>
#include <queue>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Codec {
public:

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
`
            , driverCode:
`bool compareTrees(TreeNode* a, TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a->val != b->val) return false;

    return compareTrees(a->left, b->left) && compareTrees(a->right, b->right);
}

TreeNode* createTree(const std::vector<int>& vals) {
    if (vals.empty()) return nullptr;

    std::queue<TreeNode*> q;
    TreeNode* root = new TreeNode(vals[0]);
    q.push(root);

    int i = 1;
    while (!q.empty() && i < vals.size()) {
        TreeNode* current = q.front();
        q.pop();

        if (i < vals.size() && vals[i] != INT_MIN) {
            current->left = new TreeNode(vals[i]);
            q.push(current->left);
        }
        i++;

        if (i < vals.size() && vals[i] != INT_MIN) {
            current->right = new TreeNode(vals[i]);
            q.push(current->right);
        }
        i++;
    }

    return root;
}

int main() {
    Codec ser, deser;
    std::vector<std::vector<int>> testCases = {{1, 2, 3, INT_MIN, INT_MIN, 4, 5}, {}};
    std::vector<std::vector<int>> expectedOutputs = {{1, 2, 3, INT_MIN, INT_MIN, 4, 5}, {}};

    for (int i = 0; i < testCases.size(); i++) {
        TreeNode* root = createTree(testCases[i]);
        TreeNode* deserialized = deser.deserialize(ser.serialize(root));
        if (!compareTrees(deserialized, createTree(expectedOutputs[i]))) {
            std::cerr << "AssertionError: Test " << i + 1 << ": Expected different output.\n";
        }
    }
    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`# include <stdio.h>
# include <stdlib.h>
// include queue

// Definition for a binary tree node.
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};
typedef struct TreeNode TreeNode;

/** Encodes a tree to a single string. */
char* serialize(struct TreeNode* root) {
    
}

/** Decodes your encoded data to tree. */
struct TreeNode* deserialize(char* data) {
    
}

// Your functions will be called as such:
// char* data = serialize(root);
// deserialize(data);
`
            , driverCode:
`// Driver
int compareTrees(TreeNode* a, TreeNode* b) {
    if (a == NULL && b == NULL) return 1;
    if (a == NULL || b == NULL) return 0;
    if (a->val != b->val) return 0;

    return compareTrees(a->left, b->left) && compareTrees(a->right, b->right);
}

typedef struct QueueNode {
    TreeNode* treeNode;
    struct QueueNode* next;
} QueueNode;

typedef struct Queue {
    QueueNode* front;
    QueueNode* rear;
} Queue;
Queue* createQueue() {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->front = q->rear = NULL;
    return q;
}
void enqueue(Queue* q, TreeNode* treeNode) {
    QueueNode* newNode = (QueueNode*)malloc(sizeof(QueueNode));
    newNode->treeNode = treeNode;
    newNode->next = NULL;

    if (q->rear == NULL) {
        q->front = q->rear = newNode;
        return;
    }

    q->rear->next = newNode;
    q->rear = newNode;
}
TreeNode* dequeue(Queue* q) {
    if (q->front == NULL) {
        return NULL;
    }

    QueueNode* temp = q->front;
    TreeNode* treeNode = temp->treeNode;
    q->front = q->front->next;

    if (q->front == NULL) {
        q->rear = NULL;
    }

    free(temp);
    return treeNode;
}
void freeQueue(Queue* q) {
    while (q->front != NULL) {
        dequeue(q);
    }
    free(q);
}

TreeNode* createTree(int* vals, int size) {
    if (size == 0 || vals[0] == -1) return NULL;

    TreeNode* root = (TreeNode*)malloc(sizeof(TreeNode));
    root->val = vals[0];
    root->left = root->right = NULL;

    Queue* q = createQueue();
    enqueue(q, root);

    for (int i = 1; i < size; i += 2) {
        TreeNode* current = dequeue(q);

        if (vals[i] != -1) {
            TreeNode* leftNode = (TreeNode*)malloc(sizeof(TreeNode));
            leftNode->val = vals[i];
            leftNode->left = leftNode->right = NULL;
            current->left = leftNode;
            enqueue(q, leftNode);
        }

        if (i + 1 < size && vals[i + 1] != -1) {
            TreeNode* rightNode = (TreeNode*)malloc(sizeof(TreeNode));
            rightNode->val = vals[i + 1];
            rightNode->left = rightNode->right = NULL;
            current->right = rightNode;
            enqueue(q, rightNode);
        }
    }

    freeQueue(q);
    return root;
}

#include <stdio.h>

int main() {
    int testCases[][6] = {{1, 2, 3, -1, -1, 4, 5}, {-1}};
    int expectedOutputs[][6] = {{1, 2, 3, -1, -1, 4, 5}, {-1}};

    for (int i = 0; i < sizeof(testCases) / sizeof(testCases[0]); i++) {
        TreeNode* root = createTree(testCases[i], 7);
        TreeNode* deserialized = deserialize(serialize(root));
        if (!compareTrees(deserialized, createTree(expectedOutputs[i], 7))) {
            fprintf(stderr, "AssertionError: Test %d: Expected different output.\n", i + 1);
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
