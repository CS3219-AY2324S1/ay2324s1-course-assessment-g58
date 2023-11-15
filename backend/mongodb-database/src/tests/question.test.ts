import express from 'express';
import { QuestionRouter } from '../routes/question.routes';

const request = require('supertest');

const app = express();
app.use(express.json());
app.use(QuestionRouter);

describe('POST /add-new-question', () => {
    it('should create a new question and return it', async () => {
        const questionData = {
            title: "What is the capital of France?",
            description: "What is the capital of France?",
            difficulty: "easy",
            category: "Geography"
        };

        const response = await request(app)
            .post('/add-new-question')
            .send(questionData);
        expect(response.status).toBe(201);
        expect(response.body.title).toEqual(questionData.title);
        // add more assertions as needed
    });
});
