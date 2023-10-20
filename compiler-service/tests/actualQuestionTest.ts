import { expect } from 'chai';
import { compileCode } from '../src/services/compiler.service';
import { LANGUAGE } from '../src/types/languageEnum';

describe('Actual leetcode questions', () => {
    describe('Question 1, reverse a string', () => {
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
                name: "reverseString",
                returnType: {
                    python: "int",
                    c: "int",
                    cpp: "int",
                    java: "int",
                    javascript: "number"
                }
            }
        ];
        it('Python: correct code passes all tests', async () => {
            
        });
    });
});