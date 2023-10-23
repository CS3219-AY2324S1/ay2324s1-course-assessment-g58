import express, { Request, Response } from 'express';
import router from './routes/index';
import * as amqp from 'amqplib';
import { compileCode } from './services/compiler.service';

async function startConsumer() {
    const connection = await amqp.connect('amqp://user:password@localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'messages';
  
    await channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  
    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const { correlationId, replyTo } = msg.properties;
            try {
                const { language, source_code, driverCode } = JSON.parse(msg.content.toString());
                console.log("[x] Received", language, source_code, driverCode, replyTo, correlationId);

                const output = await compileCode(language, source_code, [], [], driverCode);
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
}
  
startConsumer();

const app = express();
const PORT = 3006;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
