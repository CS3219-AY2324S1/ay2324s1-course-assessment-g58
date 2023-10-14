import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';

describe('Compiler Service', () => {

    describe('compileCode', () => {

        it('should compile Python code successfully', async () => {
            const language = 'python';
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

            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            console.log("data from test:", result.data);
        });

        it('should compile with stderr when test cases fail', async () => {
            const language = 'python';
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

            expect(result.error).to.be.false;
            expect(result.statusCode).to.equal(200);
            expect(result.data).to.not.be.null;
            if (result.data) {
                expect(result.data.stderr).to.not.be.empty;
            } else {
                expect.fail('result.data is null');
            }
            console.log("data from test:", result.data);
        });
    });
});
