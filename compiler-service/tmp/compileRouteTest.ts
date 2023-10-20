import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';
import { LANGUAGE } from '../src/types/languageEnum';

describe('Compiler Service', () => {

    describe('compileCode', () => {

        it('should compile Python code successfully', async () => {
            const language = LANGUAGE.PYTHON;
            const source_code = 'def foo(x):\n\treturn x+1';
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
        });

        it('should compile with assertion error in stderror when test cases fail (python)', async () => {
            const language = LANGUAGE.PYTHON;
            const source_code = 'def foo(x):\n\treturn x+2';
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(1)
        });

        it('should compile C code successfully', async () => {
            const language = LANGUAGE.C;
            const source_code = 'int foo(int x) {\n\treturn x + 1;\n}';
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
        });

        it('should compile with stderr when test cases fail (c)', async () => {
            const language = LANGUAGE.C;
            const source_code = 'int foo(int x) {\n\treturn x + 2;\n}';
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(2)
        });

        it('should compile C++ code successfully', async () => {
            const language = LANGUAGE.CPP;
            const source_code = `
            int foo(int x) {
                return x + 1;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
        });
        
        it('should compile with stderr when the third test case fails (cpp)', async () => {
            const language = LANGUAGE.CPP;
            const source_code = `
            int foo(int x) {
                return x + 2;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "7"
                },
                {
                    functionName: "foo",
                    arguments: ["7"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "8" // This is intentionally wrong
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(3)
        });

        it('should compile Java code successfully', async () => {
            const language = LANGUAGE.JAVA;
            const source_code = `
            public static int foo(int x) {
                return x + 1;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
        });
        
        it('should compile with stderr when the third test case fails (java)', async () => {
            const language = LANGUAGE.JAVA;
            const source_code = `
            public static int foo(int x) {
                return x + 2;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "7"
                },
                {
                    functionName: "foo",
                    arguments: ["7"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "9"
                },
                {
                    functionName: "foo",
                    arguments: ["10"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "11"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(4);
        });
        
        it('should compile JavaScript code successfully', async () => {
            const language = LANGUAGE.JAVASCRIPT;
            const source_code = `
            function foo(x) {
                return x + 1;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
        });
        
        it('should compile with stderr when test cases fail (javascript)', async () => {
            const language = LANGUAGE.JAVASCRIPT;
            const source_code = `
            function foo(x) {
                return x + 2;
            }`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["1"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    argumentsTypes: [{
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "int",
                        c: "int",
                        cpp: "int",
                        java: "int",
                        javascript: "number"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(1);
        });
        
        it('should compile Python code involving 1d arrays successfully', async () => {
            const language = LANGUAGE.PYTHON;
            const source_code = `def foo(x):\n\tfor i in range(len(x)):\n\t\tx[i] += 1\n\treturn x`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]"],
                    argumentsTypes: [{
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });

        it('should compile with stderr when test cases involving arrays fail (python)', async () => {
            const language = LANGUAGE.PYTHON;
            const source_code = `def foo(x):\n\tfor i in range(len(x)):\n\t\tx[i] += 2\n\treturn x`;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]"],
                    argumentsTypes: [{
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            expect(result.firstFailedTestCaseNumber).to.equal(1);
        });
        
        it('should compile C code involving 1d arrays successfully', async () => {
            const language = LANGUAGE.C;
            const source_code = `
#include <stddef.h>

int* foo(int* x, size_t size) {
    for (size_t i = 0; i < size; i++) {
        x[i] += 1;
    }
    return x;
}
        `;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]", "3"],
                    argumentsTypes: [
                        {
                            python: "List[int]",
                            c: "int*",
                            cpp: "std::vector<int>",
                            java: "int[]",
                            javascript: "number[]"
                        },
                        {
                            python: "int",
                            c: "size_t",
                            cpp: "size_t",
                            java: "int",
                            javascript: "number"
                        }
                    ],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });
        
        it('should compile Python code involving 2d arrays successfully', async () => {
            const language = LANGUAGE.PYTHON;
            const source_code = `
def increment_matrix(matrix):
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            matrix[i][j] += 1
    return matrix
            `;
            const calls = [
                {
                    functionName: "increment_matrix",
                    arguments: ["[[1,2,3], [4,5,6], [7,8,9]]"],
                    argumentsTypes: [
                        {
                            python: "List[List[int]]",
                            c: "int**",
                            cpp: "std::vector<std::vector<int>>",
                            java: "int[][]",
                            javascript: "number[][]"
                        }
                    ],
                    expectedOutput: "[[2,3,4], [5,6,7], [8,9,10]]",
                    lengthOfArray: [3, 3]  // first dimension has 3 rows, second dimension has 3 columns
                }
            ];
            const functions = [
                {
                    name: "increment_matrix",
                    returnType: {
                        python: "List[List[int]]",
                        c: "int**",
                        cpp: "std::vector<std::vector<int>>",
                        java: "int[][]",
                        javascript: "number[][]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });

        it('should compile C++ code involving 1d vectors successfully', async () => {
            const language = LANGUAGE.CPP;
            const source_code = `
#include <vector>
#include <cstddef>

std::vector<int> foo(std::vector<int>& x) {
    for (size_t i = 0; i < x.size(); i++) {
        x[i] += 1;
    }
    return x;
}
            `;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]"],
                    argumentsTypes: [
                        {
                            python: "List[int]",
                            c: "int*",
                            cpp: "std::vector<int>",
                            java: "int[]",
                            javascript: "number[]"
                        }
                    ],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });

        it('should compile C++ code involving 2d vectors successfully', async () => {
            const language = LANGUAGE.CPP;
            const source_code = `
        #include <vector>
        #include <cstddef>
        
        std::vector<std::vector<int>> incrementMatrix(std::vector<std::vector<int>>& matrix) {
            for (size_t i = 0; i < matrix.size(); i++) {
                for (size_t j = 0; j < matrix[i].size(); j++) {
                    matrix[i][j] += 1;
                }
            }
            return matrix;
        }
            `;
            const calls = [
                {
                    functionName: "incrementMatrix",
                    arguments: ["[[1,2,3], [4,5,6], [7,8,9]]"],
                    argumentsTypes: [
                        {
                            python: "List[List[int]]",
                            c: "int**",
                            cpp: "std::vector<std::vector<int>>",
                            java: "int[][]",
                            javascript: "number[][]"
                        }
                    ],
                    expectedOutput: "[[2,3,4], [5,6,7], [8,9,10]]",
                    lengthOfArray: [3, 3]  // first dimension has 3 rows, second dimension has 3 columns
                }
            ];
            const functions = [
                {
                    name: "incrementMatrix",
                    returnType: {
                        python: "List[List[int]]",
                        c: "int**",
                        cpp: "std::vector<std::vector<int>>",
                        java: "int[][]",
                        javascript: "number[][]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });

        it('should compile Java code involving 1d arrays successfully', async () => {
            const language = LANGUAGE.JAVA;
            const source_code = `
    public static int[] foo(int[] x) {
        for (int i = 0; i < x.length; i++) {
            x[i] += 1;
        }
        return x;
    }
            `;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]"],
                    argumentsTypes: [
                        {
                            python: "List[int]",
                            c: "int*",
                            cpp: "std::vector<int>",
                            java: "int[]",
                            javascript: "number[]"
                        }
                    ],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });

        it('should compile Java code involving 2d arrays successfully', async () => {
            const language = LANGUAGE.JAVA;
            const source_code = `
    public static int[][] foo2D(int[][] x) {
        for (int i = 0; i < x.length; i++) {
            for (int j = 0; j < x[i].length; j++) {
                x[i][j] += 1;
            }
        }
        return x;
    }
            `;
            const calls = [
                {
                    functionName: "foo2D",
                    arguments: ["[[1,2,3],[4,5,6],[7,8,9]]"],
                    argumentsTypes: [
                        {
                            python: "List[List[int]]",
                            c: "int**",
                            cpp: "std::vector<std::vector<int>>",
                            java: "int[][]",
                            javascript: "number[][]"
                        }
                    ],
                    expectedOutput: "[[2,3,4],[5,6,7],[8,9,10]]",
                    lengthOfArray: [3, 3]
                }
            ];
            const functions = [
                {
                    name: "foo2D",
                    returnType: {
                        python: "List[List[int]]",
                        c: "int**",
                        cpp: "std::vector<std::vector<int>>",
                        java: "int[][]",
                        javascript: "number[][]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });
        
        it('should compile JavaScript code involving 1d arrays successfully', async () => {
            const language = LANGUAGE.JAVASCRIPT;
            const source_code = `
function foo(x) {
    for (let i = 0; i < x.length; i++) {
        x[i] += 1;
    }
    return x;
}
            `;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[1,2,3]"],
                    argumentsTypes: [
                        {
                            python: "List[int]",
                            c: "int*",
                            cpp: "std::vector<int>",
                            java: "int[]",
                            javascript: "number[]"
                        }
                    ],
                    expectedOutput: "[2,3,4]",
                    lengthOfArray: [3]
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[int]",
                        c: "int*",
                        cpp: "std::vector<int>",
                        java: "int[]",
                        javascript: "number[]"
                    }
                }
            ];
                
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });
        
        it('should compile JavaScript code involving 2d arrays successfully', async () => {
            const language = LANGUAGE.JAVASCRIPT;
            const source_code = `
function foo2D(x) {
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            x[i][j] += 1;
        }
    }
    return x;
}
            `;
            const calls = [
                {
                    functionName: "foo2D",
                    arguments: ["[[1,2,3],[4,5,6],[7,8,9]]"],
                    argumentsTypes: [
                        {
                            python: "List[List[int]]",
                            c: "int**",
                            cpp: "std::vector<std::vector<int>>",
                            java: "int[][]",
                            javascript: "number[][]"
                        }
                    ],
                    expectedOutput: "[[2,3,4],[5,6,7],[8,9,10]]",
                    lengthOfArray: [3, 3]
                }
            ];
            const functions = [
                {
                    name: "foo2D",
                    returnType: {
                        python: "List[List[int]]",
                        c: "int**",
                        cpp: "std::vector<std::vector<int>>",
                        java: "int[][]",
                        javascript: "number[][]"
                    }
                }
            ];
                
            const result = await compileCode(language, source_code, calls, functions, null);
            console.log(result);
            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.be.null;
        });
    
        //this level of indentation to add more test cases
    });
});
