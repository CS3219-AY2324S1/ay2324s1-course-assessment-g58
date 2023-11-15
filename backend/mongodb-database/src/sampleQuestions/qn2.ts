import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question2 = {
    title: "Linked List Cycle",
    description:
`Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

 

Example 1:
(3) -> (2) -> (0) -> (-4)
        ^              
        |______________|  

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).


Example 2:
(1) -> (2)
^       
|_______|  

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.


Example 3:
(1)

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
- The number of the nodes in the list is in the range [0, 104].
- 10^5 <= Node.val <= 10^5
- pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory? 
`,
    difficulty: DIFFICULTY.EASY,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`from typing import Optional
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        pass 

`
            , driverCode:
`import sys

def createLinkedListWithCycle(nodes, pos):
    if not nodes:
        return None

    head = ListNode(nodes[0])
    current = head
    node_list = [head]  # Store the nodes in a list

    for value in nodes[1:]:
        current.next = ListNode(value)
        current = current.next
        node_list.append(current)

    # Create the cycle
    if pos != -1 and pos < len(node_list):
        current.next = node_list[pos]

    return head


# Test cases
testcases = [
    ([3,2,0,-4], 1, True),
    ([1,2], 0, True),
    ([1], -1, False)
]

solution = Solution()

for i, (nodes, pos, expected) in enumerate(testcases, 1):
    head = createLinkedListWithCycle(nodes, pos)
    actual = solution.hasCycle(head)
    if actual != expected:
        print(f"AssertionError: Test {i}: Expected {expected}, but got {actual}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

class Solution {
    public boolean hasCycle(ListNode head) {
        
    }
}
`
            , driverCode:
`public class Main {
    // Utility method to create a linked list with a cycle
    private static ListNode createLinkedListWithCycle(int[] nodes, int pos) {
        if (nodes == null || nodes.length == 0) {
            return null;
        }

        ListNode dummyHead = new ListNode(0);
        ListNode current = dummyHead;
        ListNode cycleStartNode = null;

        for (int i = 0; i < nodes.length; i++) {
            current.next = new ListNode(nodes[i]);
            current = current.next;
            
            if (i == pos) {
                cycleStartNode = current;
            }
        }

        // Create a cycle
        if (cycleStartNode != null) {
            current.next = cycleStartNode;
        }

        return dummyHead.next;
    }

    public static void main(String[] args) {
        int[][] nodes = {{3,2,0,-4}, {1,2}, {1}};
        int[] positions = {1, 0, -1};
        boolean[] expectedOutputs = {true, true, false};

        Solution solution = new Solution();

        for (int i = 0; i < nodes.length; i++) {
            ListNode head = createLinkedListWithCycle(nodes[i], positions[i]);
            boolean actual = solution.hasCycle(head);
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
`// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
* @param {ListNode} head
* @return {boolean}
*/
const hasCycle = (head) => {

};
`
            , driverCode:
`function createLinkedList(arr, cyclePos) {
    if (arr.length === 0) return null;
    
    let head = new ListNode(arr[0]);
    let current = head;
    let cycleNode = cyclePos === 0 ? head : null;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
        if (i === cyclePos) cycleNode = current;
    }

    if (cycleNode) current.next = cycleNode;

    return head;
}

// Test cases
const testcases = [
    { arr: [3, 2, 0, -4], pos: 1, expected: true },
    { arr: [1, 2], pos: 0, expected: true },
    { arr: [1], pos: -1, expected: false }
];

// Test function
testcases.forEach((test, index) => {
    const head = createLinkedList(test.arr, test.pos);
    const actual = hasCycle(head);

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
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
		
    }
};
`
            , driverCode:
`ListNode* createLinkedListWithCycle(const vector<int>& nodes, int pos) {
    if (nodes.empty()) {
        return NULL;
    }

    ListNode* head = new ListNode(nodes[0]);
    ListNode* current = head;
    ListNode* cycleNode = (pos == 0) ? head : NULL; // Set cycleNode to head if pos is 0

    for (int i = 1; i < nodes.size(); ++i) {
        current->next = new ListNode(nodes[i]);
        current = current->next;

        if (i == pos) {
            cycleNode = current;
        }
    }

    // Create the cycle
    if (pos != -1) {
        current->next = cycleNode;
    }

    return head;
}

int main() {
    vector<pair<vector<int>, pair<int, bool>>> testcases = {
        {{3,2,0,-4}, {1, true}},
        {{1,2}, {0, true}},
        {{1}, {-1, false}}
    };

    Solution solution;

    for(int i = 0; i < testcases.size(); i++) {
        auto& nodes = testcases[i].first;
        int pos = testcases[i].second.first;
        bool expected = testcases[i].second.second;

        ListNode* head = createLinkedListWithCycle(nodes, pos);
        bool actual = solution.hasCycle(head);

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
`void reverseString(char* s, int sSize){

}#include <stdbool.h>
#include <stddef.h>
// Definition for singly-linked list.
struct ListNode {
    int val;
    struct ListNode *next;
};

bool hasCycle(struct ListNode *head) {
    
}
`
            , driverCode:
`#include <stdio.h>
#include <stdlib.h>
// Function to create a new node
struct ListNode* newNode(int val) {
    struct ListNode* node = (struct ListNode*) malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

// Function to create linked list with cycle
struct ListNode* createLinkedListWithCycle(int* nodes, int size, int pos) {
    if (size == 0) {
        return NULL;
    }

    struct ListNode* head = newNode(nodes[0]);
    struct ListNode* current = head;
    struct ListNode* cycleNode = NULL;

    for (int i = 1; i < size; ++i) {
        current->next = newNode(nodes[i]);
        current = current->next;

        if (i == pos) {
            cycleNode = current;
        }
    }

    // Create a cycle if pos is not -1
    if (pos != -1) {
        // Find the node at position 'pos'
        struct ListNode* cycleStartNode = head;
        for (int i = 0; i < pos; ++i) {
            cycleStartNode = cycleStartNode->next;
        }
        current->next = cycleStartNode;
    }

    return head;
}

int main() {
    int test1_nodes[] = {3, 2, 0, -4};
    int test2_nodes[] = {1, 2};
    int test3_nodes[] = {1};

    struct Test {
        int* nodes;
        int size;
        int pos;
        int expected;
    } testcases[] = {
        {test1_nodes, 4, 1, 1},
        {test2_nodes, 2, 0, 1},
        {test3_nodes, 1, -1, 0}
    };

    for(int i = 0; i < sizeof(testcases) / sizeof(testcases[0]); i++) {
        struct ListNode* head = createLinkedListWithCycle(testcases[i].nodes, testcases[i].size, testcases[i].pos);
        int expected = testcases[i].expected;
        int actual = hasCycle(head);

        if(actual != expected) {
            fprintf(stderr, "AssertionError: Test %d: Expected %d, but got %d\n", i + 1, expected, actual);
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
