import express from 'express';
import { json } from 'body-parser';
import { createQuestion } from '../services/question.service';

const router = express.Router();
router.use(json());

router.post('/api/new-question', async (req, res) => {
    try {
        const questionData = req.body;
        console.log(questionData);
        const newQuestion = await createQuestion(questionData);
        res.status(201).json(newQuestion);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export { router as QuestionRouter };

