import express from 'express';
import { json } from 'body-parser';
import { createQuestion, getQuestions, deleteQuestionByObjectId, filterQuestions,
    editQuestionById, addQuestionToHistory, clearHistory, getHistory, setQuestionsToDefault } from '../services/question.service';
import { Types } from 'mongoose';``
import { createUser } from '../services/user.service';
import QuestionModel from '../models/question.model';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { IQuestion } from '../models/question.model';
import { IResponse } from '../models/response.model';
import { IUser } from '../models/user.model';
import { get } from 'config';


const router = express.Router();
router.use(json());

router.post('/add-new-question', async (req, res) => {
    try {
        const questionData = {
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            category: req.body.category,
            templates: req.body.templates,
            functions: req.body.functions,
            calls: req.body.calls,
        };
        console.log(questionData);
        console.log('Creating new question...');
        const newQuestion = await createQuestion(questionData);
        console.log('New question created!');
        console.log(newQuestion);
        res.status(201).json(newQuestion);
    } catch (err: any) {
        // Check for duplicate key error
        if (err.code === 11000) {
            res.status(400).json({ message: "Duplicate value detected. Please ensure unique values for unique fields (Title)." });
        } else {
            res.status(500).json({ message: "500 Internal Server Error" + err.message });
        }
    }
});

router.get('/get-all-questions', async (req, res) => {
    try {
        console.log('Getting all questions...');
        const questions = await getQuestions();
        console.log('Got {%i} questions!', questions.length);
        res.status(200).json(questions);
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.delete('/delete-question', async (req, res) => {
    try {
        const id = req.body._id;
        console.log('Deleting question with title:', req.body.title);
        const deletedQuestion = await deleteQuestionByObjectId(id);
        if (deletedQuestion) {
            console.log('Question deleted!');
            res.status(200).json(deletedQuestion);
        } else {
            console.log('Question not found!');
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

// edit question by title

router.put('/edit-question', async (req, res) => {
    try {
        console.log(req.body)
        const updatedQuestion = {
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            category: req.body.category,
            templates: req.body.templates,
            functions: req.body.functions,
            calls: req.body.calls,
        };
        const id = req.body._id;
        console.log('Updating question with title:', req.body.title);
        const editedQuestion = await editQuestionById(id, updatedQuestion);
        if (editedQuestion) {
            console.log('Question updated!');
            res.status(200).json(editedQuestion);
        } else {
            console.log('Question not found!');
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (err: any) {
        if (err.code === 11000) {
            console.log('Duplicate title detected.');
            return res.status(400).json({ message: 'A question with this title already exists. Please choose a different title.' });
        }
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

// add question to history
router.post('/add-question-to-history', async (req, res) => {
    try {
        console.log(req.body);
        const questionId = new Types.ObjectId(req.body.question);
        const userId = new Types.ObjectId(req.body.user);
        const question = await QuestionModel.findById(questionId);
        const response = req.body.response;
        const user = await UserModel.findById(userId);

        if (!question || !user) {
            return res.status(404).json({ message: "Question or User not found" });
        }

        console.log('Adding question to history...');
        const questionHistory = await addQuestionToHistory(question, response, user);
        console.log('Question added to history!');
        console.log(questionHistory);
        res.status(201).json(questionHistory);
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.delete('/clear-history', async (req, res) => {
    try {
        const userId = new Types.ObjectId(req.body.user);
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('Clearing history...');
        const clearedHistory = await clearHistory(user);
        console.log('History cleared!');
        console.log(clearedHistory);
        res.status(200).json(clearedHistory);
    }
    catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.get('/get-history', async (req, res) => {
    try {
        const userId = new Types.ObjectId(req.body.user);
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('Getting history...');
        const history = await getHistory(user);
        console.log('History retrieved!');
        console.log(history);
        res.status(200).json(history);
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.post('/create-user', async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            history: []
        };
        console.log(userData);
        console.log('Creating new user...');
        const newUser = await createUser(userData);
        console.log('New user created!');
        console.log(newUser);
        res.status(201).json(newUser);
    }
    catch (err: any){
        if (err.code === 11000) {
            console.log('Duplicate username detected.');
            return res.status(400).json({ message: 'A user with this username already exists. Please choose a different username.' });
        }
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.post('/set-questions-to-default', async (req, res) => {
    try {
        console.log('Setting questions to default...');
        await setQuestionsToDefault();
        console.log('Questions set to default!');
        res.status(200).json({ message: 'Questions set to default!' });
    } catch (err: any) {
        res.status(500).json({ message: "500 Internal Server Error" + err.message });
    }
});

router.post('/filter-questions', async (req, res) => {
    try {
        const category = req.body.category as string[];  // Assuming category is an array in the request
        const difficulty = req.body.difficulty as string[];

        console.log('Filtering questions by category:', category);
        console.log('Filtering questions by difficulty:', difficulty);

        const filteredQuestions = await filterQuestions({ category, difficulty });

        if (filteredQuestions.length > 0) {
            console.log('Questions filtered!');
            res.status(200).json(filteredQuestions);
        } else {
            console.log('Questions not found!');
            res.status(404).json({ message: 'Questions not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '500 Internal Server Error' });
    }
});



export { router as QuestionRouter };

