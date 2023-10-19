import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';
import { LANGUAGE } from '../src/types/languageEnum';

describe('Compiler Service', () => {

    describe('compileCode', () => {

//         it('should compile Python code successfully', async () => {
//             const language = LANGUAGE.PYTHON;
//             const source_code = 'def foo(x):\n\treturn x+1';
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//         });

//         it('should compile with assertion error in stderror when test cases fail (python)', async () => {
//             const language = LANGUAGE.PYTHON;
//             const source_code = 'def foo(x):\n\treturn x+2';
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(1)
//         });

//         it('should compile C code successfully', async () => {
//             const language = LANGUAGE.C;
//             const source_code = 'int foo(int x) {\n\treturn x + 1;\n}';
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//         });

//         it('should compile with stderr when test cases fail (c)', async () => {
//             const language = LANGUAGE.C;
//             const source_code = 'int foo(int x) {\n\treturn x + 2;\n}';
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "3"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(2)
//         });

//         it('should compile C++ code successfully', async () => {
//             const language = LANGUAGE.CPP;
//             const source_code = `
//             int foo(int x) {
//                 return x + 1;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//         });
        
//         it('should compile with stderr when the third test case fails (cpp)', async () => {
//             const language = LANGUAGE.CPP;
//             const source_code = `
//             int foo(int x) {
//                 return x + 2;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "3"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "7"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["7"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "8" // This is intentionally wrong
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(3)
//         });

//         it('should compile Java code successfully', async () => {
//             const language = LANGUAGE.JAVA;
//             const source_code = `
//             public static int foo(int x) {
//                 return x + 1;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//         });
        
//         it('should compile with stderr when the third test case fails (java)', async () => {
//             const language = LANGUAGE.JAVA;
//             const source_code = `
//             public static int foo(int x) {
//                 return x + 2;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "3"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "7"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["7"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "9"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["10"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "11"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(4);
//         });
        
//         it('should compile JavaScript code successfully', async () => {
//             const language = LANGUAGE.JAVASCRIPT;
//             const source_code = `
//             function foo(x) {
//                 return x + 1;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//         });
        
//         it('should compile with stderr when test cases fail (javascript)', async () => {
//             const language = LANGUAGE.JAVASCRIPT;
//             const source_code = `
//             function foo(x) {
//                 return x + 2;
//             }`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["1"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "2"
//                 },
//                 {
//                     functionName: "foo",
//                     arguments: ["5"],
//                     argumentsTypes: [{
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }],
//                     expectedOutput: "6"
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "int",
//                         c: "int",
//                         cpp: "int",
//                         java: "int",
//                         javascript: "number"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(1);
//         });
        
//         it('should compile Python code involving 1d arrays successfully', async () => {
//             const language = LANGUAGE.PYTHON;
//             const source_code = `def foo(x):\n\tfor i in range(len(x)):\n\t\tx[i] += 1\n\treturn x`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["[1,2,3]"],
//                     argumentsTypes: [{
//                         python: "List[int]",
//                         c: "int*",
//                         cpp: "std::vector<int>",
//                         java: "int[]",
//                         javascript: "number[]"
//                     }],
//                     expectedOutput: "[2,3,4]",
//                     lengthOfArray: [3]
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "List[int]",
//                         c: "int*",
//                         cpp: "std::vector<int>",
//                         java: "int[]",
//                         javascript: "number[]"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//             expect(result.data?.stderr).to.be.null;
//         });

//         it('should compile with stderr when test cases involving arrays fail (python)', async () => {
//             const language = LANGUAGE.PYTHON;
//             const source_code = `def foo(x):\n\tfor i in range(len(x)):\n\t\tx[i] += 2\n\treturn x`;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["[1,2,3]"],
//                     argumentsTypes: [{
//                         python: "List[int]",
//                         c: "int*",
//                         cpp: "std::vector<int>",
//                         java: "int[]",
//                         javascript: "number[]"
//                     }],
//                     expectedOutput: "[2,3,4]",
//                     lengthOfArray: [3]
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "List[int]",
//                         c: "int*",
//                         cpp: "std::vector<int>",
//                         java: "int[]",
//                         javascript: "number[]"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             if (result.data) {
//                 expect(result.data.stderr).to.not.be.empty;
//             } else {
//                 expect.fail('result.data is null');
//             }
//             expect(result.firstFailedTestCaseNumber).to.equal(1);
//         });
        
//         it('should compile C code involving 1d arrays successfully', async () => {
//             const language = LANGUAGE.C;
//             const source_code = `
// #include <stddef.h>

// int* foo(int* x, size_t size) {
//     for (size_t i = 0; i < size; i++) {
//         x[i] += 1;
//     }
//     return x;
// }
//         `;
//             const calls = [
//                 {
//                     functionName: "foo",
//                     arguments: ["[1,2,3]", "3"],
//                     argumentsTypes: [
//                         {
//                             python: "List[int]",
//                             c: "int*",
//                             cpp: "std::vector<int>",
//                             java: "int[]",
//                             javascript: "number[]"
//                         },
//                         {
//                             python: "int",
//                             c: "size_t",
//                             cpp: "size_t",
//                             java: "int",
//                             javascript: "number"
//                         }
//                     ],
//                     expectedOutput: "[2,3,4]",
//                     lengthOfArray: [3]
//                 }
//             ];
//             const functions = [
//                 {
//                     name: "foo",
//                     returnType: {
//                         python: "List[int]",
//                         c: "int*",
//                         cpp: "std::vector<int>",
//                         java: "int[]",
//                         javascript: "number[]"
//                     }
//                 }
//             ];
            
//             const result = await compileCode(language, source_code, calls, functions);
//             console.log(result);
//             expect(result.error).to.be.false;
//             expect(result.statusCode).to.equal(200);
//             expect(result.data).to.not.be.null;
//             expect(result.data?.time).to.not.be.null;
//             expect(result.data?.stderr).to.be.null;
//         });
        
        it('should fail test case for C code involving 2d arrays', async () => {
            const language = LANGUAGE.C;
            const source_code = `
#include <stddef.h>

int** foo(int** x, size_t rows, size_t cols) {
    for (size_t i = 0; i < rows; i++) {
        for (size_t j = 0; j < cols; j++) {
            x[i][j] += 1; // This will increment each element in the 2D array.
        }
    }
    return x;
}
            `;
            const calls = [
                {
                    functionName: "foo",
                    arguments: ["[[1,2],[3,4]]", "2", "2"],
                    argumentsTypes: [
                        {
                            python: "List[List[int]]",
                            c: "int**",
                            cpp: "std::vector<std::vector<int>>",
                            java: "int[][]",
                            javascript: "number[][]"
                        },
                        {
                            python: "int",
                            c: "size_t",
                            cpp: "size_t",
                            java: "int",
                            javascript: "number"
                        },
                        {
                            python: "int",
                            c: "size_t",
                            cpp: "size_t",
                            java: "int",
                            javascript: "number"
                        }
                    ],
                    expectedOutput: "[[2,2],[4,4]]",  // Incorrect expected output.
                    lengthOfArray: [2, 2]  // Dimensions of the 2D array.
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: {
                        python: "List[List[int]]",
                        c: "int**",
                        cpp: "std::vector<std::vector<int>>",
                        java: "int[][]",
                        javascript: "number[][]"
                    }
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
            console.log(result);
            expect(result.error).to.be.true;  // We expect an error this time because the expected output doesn't match the function's output.
            expect(result.statusCode).to.equal(200);  // Compilation is successful, but test case fails.
            expect(result.data).to.not.be.null;
            expect(result.data?.time).to.not.be.null;
            expect(result.data?.stderr).to.not.be.null;  // We might expect some stderr output indicating the failed test.
        });
        
        //this level of indentation to add more test cases
    });
});
