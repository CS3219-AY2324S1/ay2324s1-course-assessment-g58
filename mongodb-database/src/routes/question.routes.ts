import express from 'express';
import { json } from 'body-parser';
import { createQuestion, getQuestions, deleteQuestionByTitle } from '../services/question.service';

const router = express.Router();
router.use(json());

router.post('/api/new-question', async (req, res) => {
    try {
        const questionData = req.body;
        console.log(questionData);
        console.log('Creating new question...');
        const newQuestion = await createQuestion(questionData);
        console.log('New question created!');
        console.log(newQuestion);
        res.status(201).json(newQuestion);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/new-question', async (req, res) => {
    try {
        console.log('Getting all questions...');
        const questions = await getQuestions();
        console.log('Got all questions!');
        console.log(questions);
        res.status(200).json(questions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/api/new-question', async (req, res) => {
    try {
        const title = req.body.title;
        console.log('Deleting question with title:', title);
        const deletedQuestion = await deleteQuestionByTitle(title);
        if (deletedQuestion) {
            console.log('Question deleted!');
            res.status(200).json(deletedQuestion);
        } else {
            console.log('Question not found!');
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export { router as QuestionRouter };

