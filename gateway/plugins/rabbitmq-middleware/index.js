// TO REMOVE ****
const amqp = require('amqplib');
const { v4: generateUuid } = require('uuid');

module.exports = {
  name: 'rabbitmq-middleware',
  schema: {},
  policy: (actionParams) => {
    return async (req, res, next) => {
      const QUEUE = 'messages';

      const message = req.body;
      console.log(message);

      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      const channel = await connection.createChannel();

      const correlationId = generateUuid();

      const responseHandler = (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          const content = JSON.parse(msg.content.toString());
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

      channel.consume('amq.rabbitmq.reply-to', responseHandler, { noAck: false });

      const messageBuffer = Buffer.from(JSON.stringify(message));
      channel.sendToQueue(QUEUE, messageBuffer, { correlationId, replyTo: 'amq.rabbitmq.reply-to' });
      console.log(" [x] Sent %s", message);
    };
  },
};
