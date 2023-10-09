import express, { Request, Response } from 'express';
import { json } from 'body-parser';

const JUDGE_0_URL = "http://localhost:2358/" // TODO: dont keep this so static and available to the public

const router = express.Router();
router.use(json());

router.post('/compile', async (req: Request, res: Response) => {
    try {
        const { language, source_code } = req.body;
        
        const language_id = language == "c++" ? 54 : //(GCC 9.2.0)
                language == "c" ? 50 : //(GCC 9.2.0)
                language == "java" ? 62 : //(OpenJDK 13.0.1)
                language == "python" ? 71 : undefined; //(3.8.1)

        if (language_id == undefined) {
            res.status(400).send("Invalid language");
            return;
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
        const { stdout, stderr, status_id, time, memory } = responseBodySubmission;
        if (retries == 0) {
            res.status(500).json({ message: "500 Internal Server Error, could not compile" });
            return;
        }
        res.status(200).json({ stdout, stderr, status_id, time, memory });
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }    
});

export { router as compilerRouter }