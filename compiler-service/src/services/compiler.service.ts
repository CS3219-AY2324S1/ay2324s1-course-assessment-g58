import { generatePythonFile } from "../utils/pythonDriverGenerator";
import { Tests } from "../types/tests";
import { CompilationData } from "../types/compilationData";
import { AfterCompileData } from "../types/afterCompileData";
import { CompileCodeResult } from "../types/compileCodeResult";

const JUDGE_0_URL = "http://localhost:2358/" // TODO: dont keep this so static and available to the public

export const compileCode = async (language: string,
        source_code: string,
        tests: Tests,
        testFunction: string): Promise<CompileCodeResult> => {
    
    const language_id = language == "c++" ? 54 : //(GCC 9.2.0)
            language == "c" ? 50 : //(GCC 9.2.0)
            language == "java" ? 62 : //(OpenJDK 13.0.1)
            language == "python" ? 71 : undefined; //(3.8.1)

    if (language_id == undefined) {
        return { data: null, error: true, message: "Invalid language", statusCode: 400 };
    }

    if (language == "python") {
        return await compilePythonCode(source_code, tests, testFunction);
    }
    // TODO: handle other languages
    return {data: null, error: true, message: "Only python supported now", statusCode: 400};
    
};

const getJudge0Output = async (data: CompilationData): Promise<CompileCodeResult> => {
    try {
        const response = await fetch(JUDGE_0_URL + "submissions/?base64_encoded=false&wait=false", {
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
                    + "?base64_encoded=True&fields=stdout,stderr,status_id,time,memory", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            responseBodySubmission = await responseSubmission.json();

            if (responseBodySubmission.status_id !== 1) {
                break;  // Exit loop if status is not 1 (in queue)
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            retries--;
        }
        const afterCompileData = responseBodySubmission as AfterCompileData;
        return { data: afterCompileData, error: false, message: "Judge0 responsed", statusCode: 200 };
    } catch (err: any) {
        return {data: null, error: true, message: "Error in compilation: " + err.message, statusCode: 500 };
    }
};

const compilePythonCode = async (source_code: string,
        tests: Tests,
        testFunction: string): Promise<CompileCodeResult> => {
    const language_id = 71; // (3.8.1)
    const source_with_driver_code = generatePythonFile(source_code, tests, testFunction);
    console.log(source_with_driver_code);
    const rawData = {
        language_id: language_id,
        source_code: source_with_driver_code,
        stdin: "",
        expected_output: "",
    };

    const { data, error, message, statusCode } = await getJudge0Output(rawData);
    return { data, error, message, statusCode };
};
