import express from 'express';
import { json } from 'body-parser';
import OpenAI from 'openai';

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const app = express();
app.use(json());

const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
    console.log(`Server started on port ${process.env.NEXT_PUBLIC_PORT_NUMBER}`)
);

// TODO: set up rabbitmq listner

app.get('/', (req, res) => {
    res.send('Hello from Ai service!');
});

app.get('/get-test-route', async (req, res) => {
    try {
        console.log("waiting for reply from openai")
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "hi"}],
        });
        console.log(chatCompletion.choices[0].message);
        res.send(chatCompletion.choices[0].message);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status);  // e.g. 401
            console.error(error.message); // e.g. The authentication token you passed was invalid...
            console.error(error.code);  // e.g. 'invalid_api_key'
            console.error(error.type);  // e.g. 'invalid_request_error'
        } else {
            // Non-API error
            console.log(error);
        }
        res.send("error");
    }    
});