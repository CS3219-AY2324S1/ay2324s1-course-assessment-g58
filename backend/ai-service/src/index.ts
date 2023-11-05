import express from 'express';
import { json } from 'body-parser';
import OpenAI from 'openai';
import * as amqp from 'amqplib';
import { getGptResponse } from './services/ai.service';

require('dotenv').config();

async function startConsumer() {
    let connected = false;
    while (!connected) {
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL!);
            const channel = await connection.createChannel();
            const queue = 'messages-ai';
        
            await channel.assertQueue(queue, { durable: false });
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        
            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const { correlationId, replyTo } = msg.properties;
                    try {
                        const { content } = JSON.parse(msg.content.toString());
                        console.log("[x] Received", content, replyTo, correlationId);

                        const output = await getGptResponse(content);
                        console.log(output);
                        // Send the output back to the client
                        channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(output)), { correlationId });
                        channel.ack(msg);
                    } catch (err: any) {
                        channel.sendToQueue(replyTo, Buffer.from(JSON.stringify({
                            error: true,
                            message: err.message,
                            statusCode: err.statusCode || 500,
                        })), { correlationId });
                        channel.ack(msg);
                    }
                }
            });

            // Handle channel errors
            channel.on('error', (err) => {
                console.error('Channel error', err);
            });

            // Handle connection errors
            connection.on('error', (err) => {
                console.error('Connection error', err);
            });

            connected = true;
        } catch (error) {
            console.error("Connection to ",  process.env.RABBITMQ_URL, " failed, retrying in 5 seconds...", error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}
  
startConsumer();

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