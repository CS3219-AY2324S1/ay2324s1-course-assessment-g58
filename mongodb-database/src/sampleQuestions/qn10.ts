import { LANGUAGE, DIFFICULTY } from "./LanguageEnum";

export const question10 = {
    title: "LRU Cache Design",
    description:
`Design a data structure that follows the constraints of a Least Recently Used
(LRU) cache.
Implement the LRUCache class:
LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return
-1

void put(int key, int value) Update the value of the key if the key exists.
Otherwise, add the key-value pair to the cache. If the number of keys
exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

Example 1:
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]
Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1); // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2); // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1); // return -1 (not found)
lRUCache.get(3); // return 3
lRUCache.get(4); // return 4

Constraints:
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5
 calls will be made to get and put
`,
    difficulty: DIFFICULTY.MEDIUM,
    category: "Data Structures",
    templates: [
        {
            language: LANGUAGE.PYTHON,
            starterCode:
`class LRUCache:
    def __init__(self, capacity):
        pass

    def deleteNode(self, p):
        pass

    def addNode(self, newnode):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass

# Example usage:
# cache = LRUCache(capacity)
# value = cache.get(key)
# cache.put(key, value)
`
            , driverCode:
`import sys

# Assuming LRUCache class is defined above

lRUCache = LRUCache(2)
operations = ["put", "put", "get", "put", "get", "put", "get", "get", "get"]
parameters = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
expected_outputs = [None, None, 1, None, -1, None, -1, 3, 4]

for i, operation in enumerate(operations):
    if operation == "put":
        lRUCache.put(parameters[i][0], parameters[i][1])
    elif operation == "get":
        result = lRUCache.get(parameters[i][0])
        if result != expected_outputs[i]:
            print(f"AssertionError: Test {i+1}: Expected {expected_outputs[i]}, but got {result}", file=sys.stderr)
`
        }, {
            language: LANGUAGE.JAVA,
            starterCode:
`import java.util.*;

class LRUCache {
    
    public LRUCache(int capacity) {
        
    }

    private void deleteNode(Node p) {
        
    }

    private void addNode(Node newnode) {
        
    }

    public int get(int key) {
        
    }

    public void put(int key, int value) {
        
    }
}

// Example usage:
// LRUCache cache = new LRUCache(capacity);
// int value = cache.get(key);
// cache.put(key, value);
`
            , driverCode:
`public class Main {
    public static void main(String[] args) {
        LRUCache lRUCache = new LRUCache(2);
        String[] operations = {"put", "put", "get", "put", "get", "put", "get", "get", "get"};
        int[][] parameters = {{1, 1}, {2, 2}, {1, -1}, {3, 3}, {2, -1}, {4, 4}, {1, -1}, {3, -1}, {4, -1}};
        Integer[] expected = {null, null, 1, null, -1, null, -1, 3, 4};

        for (int i = 0; i < operations.length; i++) {
            if (operations[i].equals("put")) {
                lRUCache.put(parameters[i][0], parameters[i][1]);
            } else if (operations[i].equals("get")) {
                int result = lRUCache.get(parameters[i][0]);
                if (!Objects.equals(result, expected[i])) {
                    System.err.println("AssertionError: Test " + (i + 1) + ": Expected " + expected[i] + ", but got " + result);
                }
            }
        }
    }
}
`
        }, {
            language: LANGUAGE.JAVASCRIPT,
            starterCode:
`/**
* @param {number} capacity
*/
var LRUCache = function(capacity) {
   
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
   
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
   
};

/** 
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/
`
            , driverCode:
`// Assuming LRUCache class is defined above

const lRUCache = new LRUCache(2);
const operations = ["put", "put", "get", "put", "get", "put", "get", "get", "get"];
const parameters = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
const expectedOutputs = [undefined, undefined, 1, undefined, -1, undefined, -1, 3, 4];

operations.forEach((op, index) => {
    if (op === "put") {
        lRUCache.put(parameters[index][0], parameters[index][1]);
    } else if (op === "get") {
        const result = lRUCache.get(parameters[index][0]);
        const expected = expectedOutputs[index];
        if (result !== expected) {
            console.error(\`AssertionError: Test \${index + 1}: Expected \${expected}, but got \${result}\`);
        }
    }
});
`
        },
        {
            language: LANGUAGE.CPP,
            starterCode:
`#include <iostream>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        
    }
    
    int get(int key) {
        
    }
    
    void put(int key, int value) {
        
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
`
            , driverCode:
`#include <iostream>
using namespace std;

// Assuming LRUCache class is defined above

int main() {
    LRUCache lRUCache(2);
    string operations[] = {"put", "put", "get", "put", "get", "put", "get", "get", "get"};
    int parameters[][2] = {{1, 1}, {2, 2}, {1, -1}, {3, 3}, {2, -1}, {4, 4}, {1, -1}, {3, -1}, {4, -1}};
    int expected[] = {1, -1, -1, 3, 4};

    int expIndex = 0;
    for (int i = 0; i < 9; i++) {
        if (operations[i] == "put") {
            lRUCache.put(parameters[i][0], parameters[i][1]);
        } else if (operations[i] == "get") {
            int result = lRUCache.get(parameters[i][0]);
            if (result != expected[expIndex++]) {
                cerr << "AssertionError: Test " << (i + 1) << ": Expected " << expected[expIndex - 1] << ", but got " << result << endl;
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
`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    
} LRUCache;


LRUCache* lRUCacheCreate(int capacity) {
    
}

int lRUCacheGet(LRUCache* obj, int key) {
    
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    
}

void lRUCacheFree(LRUCache* obj) {
    
}

/**
 * Your LRUCache struct will be instantiated and called as such:
 * LRUCache* obj = lRUCacheCreate(capacity);
 * int param_1 = lRUCacheGet(obj, key);
 
 * lRUCachePut(obj, key, value);
 
 * lRUCacheFree(obj);
*/
`
            , driverCode:
`// Assuming LRUCache struct and its functions are defined above

int main() {
    LRUCache* lRUCache = lRUCacheCreate(2);
    const char* operations[] = {"put", "put", "get", "put", "get", "put", "get", "get", "get"};
    int parameters[][2] = {{1, 1}, {2, 2}, {1, -1}, {3, 3}, {2, -1}, {4, 4}, {1, -1}, {3, -1}, {4, -1}};
    int expected[] = {1, -1, -1, 3, 4};

    int expIndex = 0;
    for (int i = 0; i < 9; i++) {
        if (strcmp(operations[i], "put") == 0) {
            lRUCachePut(lRUCache, parameters[i][0], parameters[i][1]);
        } else if (strcmp(operations[i], "get") == 0) {
            int result = lRUCacheGet(lRUCache, parameters[i][0]);
            if (result != expected[expIndex]) {
                printf("AssertionError: Test %d: Expected %d, but got %d\n", i + 1, expected[expIndex], result);
            }
            expIndex++;
        }
    }

    lRUCacheFree(lRUCache);
    return 0;
}
`
        }
    ],
    functions: [],
    calls: [],
};
