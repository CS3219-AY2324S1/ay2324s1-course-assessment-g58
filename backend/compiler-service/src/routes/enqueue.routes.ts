import express from 'express';
import { json } from 'body-parser';
import * as amqp from 'amqplib';
import { AfterCompileData } from '../types/afterCompileData';
import { CompileCodeResult } from '../types/compileCodeResult';

const router = express.Router();
router.use(json());

const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
const QUEUE = 'messages';

router.post('/enqueue-request', async (req, res) => {
    const message = req.body;
    console.log(message);

    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    const correlationId = generateUuid();

    const responseHandler = (msg: amqp.ConsumeMessage | null) => {
        if (msg?.properties.correlationId === correlationId) {
            const content: CompileCodeResult = JSON.parse(msg.content.toString());
            console.log(" [.] Got %s", content);
            channel.ack(msg);
            channel.close();
            connection.close();
            if (content.error) {
                res.status(content.statusCode).json({ message: content.message });
                return;
            }
            res.status(201).json(content);
        }
    };

    channel.consume(replyQueue.queue, responseHandler, { noAck: false });

    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(QUEUE, messageBuffer, { correlationId, replyTo: replyQueue.queue });
    console.log(" [x] Sent %s", message);
});

function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString();
}

export { router as enqueueRouter };
