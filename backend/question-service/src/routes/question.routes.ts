import express, { Request } from "express";
import { json } from "body-parser";
import {
    createQuestion,
    getQuestions,
    deleteQuestionByObjectId,
    editQuestionById,
} from "../services/question.service";

require("dotenv").config();

const router = express.Router();
router.use(json());

const getAuthorizeRes = async (req: Request) => {
    return fetch(
        ((process.env.USER_SERVICE_URL as string) +
            process.env.AUTHORIZE_ENDPOINT) as string,
        {
            method: "POST",
            headers: {
                Authorization: `${req.headers.authorization}`,
            },
        }
    );
};

const getAuthenticateRes = async (req: Request) => {
    return fetch(
        ((process.env.USER_SERVICE_URL as string) +
            process.env.AUTHENTICATE_ENDPOINT) as string,
        {
            method: "POST",
            headers: {
                Authorization: `${req.headers.authorization}`,
            },
        }
    );
};

router.post("/add-new-question", async (req, res) => {
    try {
        const authRes = await getAuthorizeRes(req);

        // if not authorized
        if (!authRes.ok) {
            const data = await authRes.json();
            res.status(authRes.status).json(data);
            return;
        }

        const questionData = {
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            category: req.body.category,
        };
        console.log(questionData);
        console.log("Creating new question...");
        const newQuestion = await createQuestion(questionData);
        console.log("New question created!");
        console.log(newQuestion);
        res.status(201).json(newQuestion);
    } catch (err: any) {
        // Check for duplicate key error
        if (err.code === 11000) {
            res.status(400).json({
                message:
                    "Duplicate value detected. Please ensure unique values for unique fields (Title).",
            });
        } else {
            res.status(500).json({
                message: "500 Internal Server Error" + err.message,
            });
        }
    }
});

router.get("/get-all-questions", async (req, res) => {
    try {
        const authRes = await getAuthenticateRes(req);

        // if not authenticated
        if (!authRes.ok) {
            const data = await authRes.json();
            res.status(authRes.status).send(data);
            return;
        }

        console.log("Getting all questions...");
        const questions = await getQuestions();
        console.log("Got {%i} questions!", questions.length);
        res.status(200).json(questions);
    } catch (err: any) {
        res.status(500).json({
            message: "500 Internal Server Error" + err.message,
        });
    }
});

router.delete("/delete-question", async (req, res) => {
    try {
        const authRes = await getAuthorizeRes(req);

        // if not authorized
        if (!authRes.ok) {
            const data = await authRes.json();
            res.status(authRes.status).json(data);
            return;
        }

        const id = req.body._id;
        console.log("Deleting question with title:", req.body.title);
        const deletedQuestion = await deleteQuestionByObjectId(id);
        if (deletedQuestion) {
            console.log("Question deleted!");
            res.status(200).json(deletedQuestion);
        } else {
            console.log("Question not found!");
            res.status(404).json({ message: "Question not found" });
        }
    } catch (err: any) {
        res.status(500).json({
            message: "500 Internal Server Error" + err.message,
        });
    }
});

// edit question by title

router.put("/edit-question", async (req, res) => {
    try {
        const authRes = await getAuthorizeRes(req);

        // if not authorized
        if (!authRes.ok) {
            const data = await authRes.json();
            res.status(authRes.status).json(data);
            return;
        }

        const updatedQuestion = {
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            category: req.body.category,
        };
        const id = req.body._id;
        console.log("Updating question with title:", req.body.title);
        const editedQuestion = await editQuestionById(id, updatedQuestion);
        if (editedQuestion) {
            console.log("Question updated!");
            res.status(200).json(editedQuestion);
        } else {
            console.log("Question not found!");
            res.status(404).json({ message: "Question not found" });
        }
    } catch (err: any) {
        if (err.code === 11000) {
            console.log("Duplicate title detected.");
            return res.status(400).json({
                message:
                    "A question with this title already exists. Please choose a different title.",
            });
        }
        res.status(500).json({
            message: "500 Internal Server Error" + err.message,
        });
    }
});

export { router as QuestionRouter };
