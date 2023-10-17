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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "7"
                },
                {
                    functionName: "foo",
                    arguments: ["7"],
                    expectedOutput: "8" // This is intentionally wrong
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "3"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "7"
                },
                {
                    functionName: "foo",
                    arguments: ["7"],
                    expectedOutput: "9"
                },
                {
                    functionName: "foo",
                    arguments: ["10"],
                    expectedOutput: "11"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "int"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "number"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
                    expectedOutput: "2"
                },
                {
                    functionName: "foo",
                    arguments: ["5"],
                    expectedOutput: "6"
                }
            ];
            const functions = [
                {
                    name: "foo",
                    returnType: "number"
                }
            ];
            
            const result = await compileCode(language, source_code, calls, functions);
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
        
    });
});
