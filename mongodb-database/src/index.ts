import config from 'config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { QuestionRouter } from './routes/question.routes';
import dotenv from 'dotenv'
dotenv.config()

import { connectToDb } from './utils/connectToDb.utils';

const app = express();

mongoose.connect("mongodb+srv://Alexander:ED9uP9nIh39CGxCW@cluster0.iza9wik.mongodb.net/questionBank?retryWrites=true&w=majority")

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('Connected to DB ')
})

app.use(json());
app.use(QuestionRouter);
