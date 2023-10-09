const JUDGE_0_URL = "http://localhost:2358/" // TODO: dont keep this so static and available to the public

export const compileCode = async (language: string, source_code: string, tests: string) => {
    try {
        const language_id = language == "c++" ? 54 : //(GCC 9.2.0)
                language == "c" ? 50 : //(GCC 9.2.0)
                language == "java" ? 62 : //(OpenJDK 13.0.1)
                language == "python" ? 71 : undefined; //(3.8.1)

        if (language_id == undefined) {
            return { error: true, message: "Invalid language", statusCode: 400 };
        }

        const data = {
            language_id: language_id,
            source_code: source_code,
            stdin: "",
            expected_output: "",
        };

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
        return { data: responseBodySubmission, error: false, statusCode: 200 };
    } catch (err: any) {
        return { error: true, message: "Error in compilation: " + err.message, statusCode: 500 };
    }
};