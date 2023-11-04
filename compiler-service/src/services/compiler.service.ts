import { generatePythonFile } from "../utils/pythonDriverGenerator";
import { generateCFile } from "../utils/cDriverGenerator";
import { generateCppFile } from "../utils/cppDriverGenerator";
import { generateJavaFile } from "../utils/javaDriverGenerator";
import { generateJavaScriptFile } from "../utils/javascriptDriverGenerator";
import { Calls } from "../types/calls";
import { Functions } from "../types/functions";
import { CompilationData } from "../types/compilationData";
import { AfterCompileData } from "../types/afterCompileData";
import { CompileCodeResult } from "../types/compileCodeResult";
import { LANGUAGE } from "../types/languageEnum";
import { ASSERTION_ERROR_PATTERN } from "../utils/assertionErrorMessage";
require('dotenv').config();

const JUDGE_0_URL = process.env.JUDGE0_URL // TODO: dont keep this so static and available to the public

const JUDGE_0_PYTHON_LANG_ID = 71; //(3.8.1)
const JUDGE_0_C_LANG_ID = 50; //(GCC 9.2.0)
const JUDGE_0_CPP_LANG_ID = 54; //(GCC 9.2.0)
const JUDGE_0_JAVA_LANG_ID = 62; //(OpenJDK 13.0.1)
const JUDGE_0_JAVASCRIPT_LANG_ID = 63; //(Node.js 12.14.0)

function getFailedTestNumber(errorMsg: string): number | null {
    const match = errorMsg.match(ASSERTION_ERROR_PATTERN);
    if (match && match[1]) {
        return parseInt(match[1]);
    }
    return null;
}

function decodeAfterCompileData(data: AfterCompileData): AfterCompileData {
    return {
        stdout: data.stdout ? Buffer.from(data.stdout, 'base64').toString() : null,
        status_id: data.status_id,
        time: data.time,
        memory: data.memory,
        stderr: data.stderr ? Buffer.from(data.stderr, 'base64').toString() : null,
        compile_output: data.compile_output ? Buffer.from(data.compile_output, 'base64').toString() : null,
    };
}

export const compileCode = async (language: string,
        source_code: string,
        calls: Calls,
        functions: Functions,
        driverCode: string | null): Promise<CompileCodeResult> => {
    const language_id = language ==  LANGUAGE.CPP ? JUDGE_0_CPP_LANG_ID :
            language == LANGUAGE.C ? JUDGE_0_C_LANG_ID :
            language == LANGUAGE.JAVA ? JUDGE_0_JAVA_LANG_ID :
            language == LANGUAGE.PYTHON ? JUDGE_0_PYTHON_LANG_ID :
            language == LANGUAGE.JAVASCRIPT ? JUDGE_0_JAVASCRIPT_LANG_ID : undefined;
    
    if (language_id == undefined) {
        return { data: null, error: true, message: "Invalid language", statusCode: 400, firstFailedTestCaseNumber: null };
    }

    if (driverCode != null) {
        return await compileWithDriverCode(source_code, driverCode, language_id);
    }

    if (language == LANGUAGE.PYTHON && calls != null && calls.length > 0 && functions != null && functions.length > 0) {
        return await compilePythonCode(source_code, calls, functions);
    }

    if (language == LANGUAGE.C && calls != null && calls.length > 0 && functions != null && functions.length > 0) {
        return await compileCCode(source_code, calls, functions);
    }

    if (language == LANGUAGE.CPP && calls != null && calls.length > 0 && functions != null && functions.length > 0) {
        return await compileCppCode(source_code, calls, functions);
    }

    if (language == LANGUAGE.JAVA && calls != null && calls.length > 0 && functions != null && functions.length > 0) {
        return await compileJavaCode(source_code, calls, functions);
    }

    if (language == LANGUAGE.JAVASCRIPT && calls != null && calls.length > 0 && functions != null && functions.length > 0) {
        return await compileJavascriptCode(source_code, calls, functions);
    }

    return await compileWithoutTests(source_code, language_id);
    
};

const getJudge0Output = async (data: CompilationData): Promise<CompileCodeResult> => {
    try {
        const response = await fetch(JUDGE_0_URL + "submissions/?base64_encoded=true&wait=false", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        const responseBody = await response.json();
        const { token } = responseBody;
        let responseBodySubmission;
        let retries = 5;

        while (retries > 0) {
            const responseSubmission = await fetch(JUDGE_0_URL + "submissions/" + token
                    + "?base64_encoded=true&fields=stdout,stderr,status_id,time,memory,compile_output", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            responseBodySubmission = await responseSubmission.json();
            if (responseBodySubmission.status_id !== 1) {
                break;  // Exit loop if status is not 1 (in queue)
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
            retries--;
        }
        const afterCompileData = decodeAfterCompileData(responseBodySubmission as AfterCompileData);
        let firstFailedTestCaseNumber: number | null = null;
        if (afterCompileData.stderr != null) {
            firstFailedTestCaseNumber = getFailedTestNumber(afterCompileData.stderr);
        }
        return { data: afterCompileData, error: false, message: "Judge0 responsed", statusCode: 200, firstFailedTestCaseNumber };
    } catch (err: any) {
        return {data: null, error: true, message: "Error in compilation: " + err.message, statusCode: 500, firstFailedTestCaseNumber: null };
    }
};

const compileWithoutTests = async (source_code: string, language_id: number): Promise<CompileCodeResult> => {
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
}

const compileWithDriverCode = async (source_code: string, driverCode: string, language_id: number): Promise<CompileCodeResult> => {
    //driverCode = driverCode.replace(/\t/g, '    ');
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_code + "\n" + driverCode).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
}

const compilePythonCode = async (source_code: string,
        calls: Calls,
        functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_PYTHON_LANG_ID;
    const source_with_driver_code = generatePythonFile(source_code, calls, functions);
    // const rawData = {
    //     language_id: language_id,
    //     source_code: source_with_driver_code,
    //     stdin: "",
    //     expected_output: "",
    // };
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_with_driver_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };    

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

const compileCCode = async (source_code: string,
    calls: Calls,
    functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_C_LANG_ID;
    const source_with_driver_code = generateCFile(source_code, calls, functions);
    // const rawData = {
    //     language_id: language_id,
    //     source_code: source_with_driver_code,
    //     stdin: "",
    //     expected_output: "",
    // };
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_with_driver_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };    

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

const compileCppCode = async (source_code: string,
    calls: Calls,
    functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_CPP_LANG_ID;
    const source_with_driver_code = generateCppFile(source_code, calls, functions);
    // const rawData = {
    //     language_id: language_id,
    //     source_code: source_with_driver_code,
    //     stdin: "",
    //     expected_output: "",
    // };
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_with_driver_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };    

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

const compileJavaCode = async (source_code: string,
    calls: Calls,
    functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_JAVA_LANG_ID;
    const source_with_driver_code = generateJavaFile(source_code, calls, functions);
    // const rawData = {
    //     language_id: language_id,
    //     source_code: source_with_driver_code,
    //     stdin: "",
    //     expected_output: "",
    // };
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_with_driver_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };    

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};

const compileJavascriptCode = async (source_code: string,
    calls: Calls,
    functions: Functions): Promise<CompileCodeResult> => {
    const language_id = JUDGE_0_JAVASCRIPT_LANG_ID;
    const source_with_driver_code = generateJavaScriptFile(source_code, calls, functions);
    // const rawData = {
    //     language_id: language_id,
    //     source_code: source_with_driver_code,
    //     stdin: "",
    //     expected_output: "",
    // };
    const rawData = {
        language_id: language_id,
        source_code: Buffer.from(source_with_driver_code).toString('base64'),
        stdin: Buffer.from("").toString('base64'),
        expected_output: Buffer.from("").toString('base64'),
    };    

    const { data, error, message, statusCode, firstFailedTestCaseNumber } = await getJudge0Output(rawData);
    return { data, error, message, statusCode, firstFailedTestCaseNumber };
};
