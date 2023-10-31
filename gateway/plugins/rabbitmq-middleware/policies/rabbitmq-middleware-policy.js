const amqp = require('amqplib');
const { v4: generateUuid } = require('uuid');
const bodyParser = require('body-parser');
const EventEmitter = require('events');

module.exports = {
    name: 'rabbitmq-middleware-policy',
    schema: {
      $id: 'http://express-gateway.io/schemas/rabbitmq-middleware-policy.json',
    },
    policy: (actionParams) => {
        return (req, res, next) => {
            // Execute body parsing middleware functions, then proceed to your custom middleware.
            try{
                bodyParser.json()(req, res, () => {
                    bodyParser.urlencoded({ extended: true })(req, res, async () => {
                    //TODO: make secure
                    const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
                    const QUEUE = 'messages';
                    const message = req.body;
                    console.log(message);
                    const connection = await amqp.connect(RABBITMQ_URL);
                    const channel = await connection.createChannel();
                    channel.responseEmitter = new EventEmitter();
                    channel.responseEmitter.setMaxListeners(0);
                    
                    const correlationId = generateUuid();
                    const responseHandler = (msg) => {
                        if (msg?.properties.correlationId === correlationId) {
                            const content = JSON.parse(msg.content.toString());
                            channel.responseEmitter.emit(correlationId, content);
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

                    channel.consume('amq.rabbitmq.reply-to', responseHandler, { noAck: true });
                    
                    const sendRPCMessage = (channel, message, queue) => {
                        new Promise(resolve => {
                        channel.responseEmitter.once(correlationId, resolve);
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                            correlationId,
                            replyTo: 'amq.rabbitmq.reply-to'
                        });
                        })
                    };
                    console.log(" [x] Sent %s", message);
                    const response = sendRPCMessage(channel, message, QUEUE);
                    console.log(" [x] Recieved %s", response);
                    });
                });
            } catch (err) {
                console.log(err);
            }
        };
    },
};
