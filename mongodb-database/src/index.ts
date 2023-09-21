import config from 'config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { QuestionRouter } from './routes/question.routes';
import dotenv from 'dotenv'
dotenv.config()

import { connectToDb } from './utils/connectToDb.utils';

const app = express();

mongoose.connect(process.env.DB_CONN_STRING as string);

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('Connected to DB ')
})

app.use(json());
app.use(QuestionRouter);
