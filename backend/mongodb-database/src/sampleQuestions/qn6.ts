import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question6 = {
    title: "Implement Stacks using Queues",
    description:
`Implement a last-in-first-out (LIFO) stack using only two queues. The
implemented stack should support all the functions of a normal stack (push,
top, pop, and empty).
Implement the MyStack class:
void push(int x) Pushes element x to the top of the stack.
int pop() Removes the element on the top of the stack and returns it.
int top() Returns the element on the top of the stack.
boolean empty() Returns true if the stack is empty, false otherwise.
Notes:
You must use only standard operations of a queue, which means that only
push to back, peek/pop from front, size and is empty operations are valid.
Depending on your language, the queue may not be supported natively. You
may simulate a queue using a list or deque (double-ended queue) as long as
you use only a queue's standard operations.

Example 1:
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]
Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False

Constraints:
- 1 <= x <= 9
- At most 100 calls will be made to push, pop, top, and empty.
- All the calls to pop and top are valid.

Follow-up: Can you implement the stack using only one queue? 
`,
    difficulty: DIFFICULTY.EASY,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class MyStack:

    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def top(self) -> int:
        pass

    def empty(self) -> bool:
        pass

# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()
`
            , driverCode:
`import sys

# Assuming MyStack class is defined above

stack = MyStack()
operations = ["push", "push", "top", "pop", "empty"]
values = [[1], [2], [], [], []]
expected_results = [None, None, 2, 2, False]

for i, operation in enumerate(operations):
    if operation == "push":
        stack.push(values[i][0])
    elif operation == "pop":
        result = stack.pop()
        if result != expected_results[i]:
            print(f"AssertionError: Test {i+1}: Expected {expected_results[i]}, but got {result}", file=sys.stderr)
    elif operation == "top":
        result = stack.top()
        if result != expected_results[i]:
            print(f"AssertionError: Test {i+1}: Expected {expected_results[i]}, but got {result}", file=sys.stderr)
    elif operation == "empty":
        result = stack.empty()
        if result != expected_results[i]:
            print(f"AssertionError: Test {i+1}: Expected {expected_results[i]}, but got {result}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`class MyStack {

    public MyStack() {
        
    }
    
    public void push(int x) {
        
    }
    
    public int pop() {
        
    }
    
    public int top() {
        
    }
    
    public boolean empty() {
        
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        MyStack stack = new MyStack();
        String[] operations = {"push", "push", "top", "pop", "empty"};
        int[] values = {1, 2}; // Only for push operations
        Object[] expectedResults = {null, null, 2, 2, false};

        int valIndex = 0;
        for (int i = 0; i < operations.length; i++) {
            if (operations[i].equals("push")) {
                stack.push(values[valIndex++]);
            } else if (operations[i].equals("pop")) {
                int result = stack.pop();
                if (!expectedResults[i].equals(result)) {
                    System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expectedResults[i] + ", but got " + result);
                }
            } else if (operations[i].equals("top")) {
                int result = stack.top();
                if (!expectedResults[i].equals(result)) {
                    System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expectedResults[i] + ", but got " + result);
                }
            } else if (operations[i].equals("empty")) {
                boolean result = stack.empty();
                if (!expectedResults[i].equals(result)) {
                    System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expectedResults[i] + ", but got " + result);
                }
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`var MyStack = function() {
    
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
`
            , driverCode:
`// Assuming MyStack class is defined above

const stack = new MyStack();
const operations = ["push", "push", "top", "pop", "empty"];
const values = [1, 2]; // Only for push operations
const expectedResults = [undefined, undefined, 2, 2, false];

let valIndex = 0;
for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "push") {
        stack.push(values[valIndex++]);
    } else if (operations[i] === "pop") {
        const result = stack.pop();
        if (result !== expectedResults[i]) {
            console.error(\`AssertionError: Test \${i + 1}: Expected \${expectedResults[i]}, but got \${result}\`);
        }
    } else if (operations[i] === "top") {
        const result = stack.top();
        if (result !== expectedResults[i]) {
            console.error(\`AssertionError: Test \${i + 1}: Expected \${expectedResults[i]}, but got \${result}\`);
        }
    } else if (operations[i] === "empty") {
        const result = stack.empty();
        if (result !== expectedResults[i]) {
            console.error(\`AssertionError: Test \${i + 1}: Expected \${expectedResults[i]}, but got \${result}\`);
        }
    }
}
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`class MyStack {
    public:
        MyStack() {
            
        }
        
        void push(int x) {
            
        }
        
        int pop() {
            
        }
        
        int top() {
            
        }
        
        bool empty() {
            
        }
};
    
/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
`
            , driverCode:
`#include <iostream>
using namespace std;

// Assuming MyStack class is defined above

int main() {
    MyStack stack;
    string operations[] = {"push", "push", "top", "pop", "empty"};
    int values[] = {1, 2}; // Only for push operations
    int expected[] = {2, 2}; // Expected results for top and pop operations
    bool expectedBool[] = {false}; // Expected result for empty operation

    int valIndex = 0, expIndex = 0, expBoolIndex = 0;

    for (int i = 0; i < 5; i++) {
        if (operations[i] == "push") {
            stack.push(values[valIndex++]);
        } else if (operations[i] == "pop") {
            int result = stack.pop();
            if (result != expected[expIndex++]) {
                cerr << "AssertionError: Test " << i + 1 << ": Expected " << expected[expIndex - 1] << ", but got " << result << endl;
            }
        } else if (operations[i] == "top") {
            int result = stack.top();
            if (result != expected[expIndex++]) {
                cerr << "AssertionError: Test " << i + 1 << ": Expected " << expected[expIndex - 1] << ", but got " << result << endl;
            }
        } else if (operations[i] == "empty") {
            bool result = stack.empty();
            if (result != expectedBool[expBoolIndex++]) {
                cerr << "AssertionError: Test " << i + 1 << ": Expected " << expectedBool[expBoolIndex - 1] << ", but got " << result << endl;
            }
        }
    }

    return 0;
}
`
        },
        {
            language: LANGUAGE.C,
            starterCode:
`typedef struct {
    
} MyStack;


MyStack* myStackCreate() {
    
}

void myStackPush(MyStack* obj, int x) {
    
}

int myStackPop(MyStack* obj) {
    
}

int myStackTop(MyStack* obj) {
    
}

bool myStackEmpty(MyStack* obj) {
    
}

void myStackFree(MyStack* obj) {
    
}

/**
 * Your MyStack struct will be instantiated and called as such:
 * MyStack* obj = myStackCreate();
 * myStackPush(obj, x);
 
 * int param_2 = myStackPop(obj);
 
 * int param_3 = myStackTop(obj);
 
 * bool param_4 = myStackEmpty(obj);
 
 * myStackFree(obj);
*/
`
            , driverCode:
`#include <stdio.h>
#include <stdbool.h>

// Assuming the MyStack structure and its functions are defined above

int main() {
    // Create a new stack
    MyStack* stack = myStackCreate();

    // Perform operations and check their results
    myStackPush(stack, 1);
    myStackPush(stack, 2);
    int topResult = myStackTop(stack);
    if (topResult != 2) {
        fprintf(stderr, "AssertionError: Test for 'top' function: Expected 2, but got %d\n", topResult);
    }

    int popResult = myStackPop(stack);
    if (popResult != 2) {
        fprintf(stderr, "AssertionError: Test for 'pop' function: Expected 2, but got %d\n", popResult);
    }

    bool emptyResult = myStackEmpty(stack);
    if (emptyResult) {
        fprintf(stderr, "AssertionError: Test for 'empty' function: Expected false, but got true\n");
    }

    // Clean up the stack
    myStackFree(stack);

    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
