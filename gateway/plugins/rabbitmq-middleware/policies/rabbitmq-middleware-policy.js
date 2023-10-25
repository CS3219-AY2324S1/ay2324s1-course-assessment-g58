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
            bodyParser.json()(req, res, () => {
                bodyParser.urlencoded({ extended: true })(req, res, async () => {
                  //TODO: make secure
                  const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
                  const QUEUE = 'messages';
                  const message = req.body;
                  console.log(message);
                  const connection = await amqp.connect(RABBITMQ_URL);
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

                  channel.consume(replyQueue.queue, responseHandler, { noAck: false });

                  const messageBuffer = Buffer.from(JSON.stringify(message));
                  channel.sendToQueue(QUEUE, messageBuffer, { correlationId, replyTo: 'amq.rabbitmq.reply-to' });
                  console.log(" [x] Sent %s", message);
                });
            });
        };
    },
};


// const amqp = require('amqplib');
// const { v4: generateUuid } = require('uuid');
// const bodyParser = require('body-parser');

// module.exports = {
//     name: 'rabbitmq-middleware-policy',
//     schema: {
//       $id: 'http://express-gateway.io/schemas/rabbitmq-middleware-policy.json',
//     },
//     policy: (actionParams) => {
//       return [
//         bodyParser.json(),  // for parsing application/json
//         bodyParser.urlencoded({ extended: true }),  // for parsing application/x-www-form-urlencoded
//         async (req, res, next) => {
//           const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
//           const QUEUE = 'messages';
  
//           // Now you can use req.body
//           const message = req.body;
//           console.log(message);
  
//           const connection = await amqp.connect(RABBITMQ_URL);
//           const channel = await connection.createChannel();
    
//           const correlationId = generateUuid();
    
//           const responseHandler = (msg) => {
//             if (msg?.properties.correlationId === correlationId) {
//               const content = JSON.parse(msg.content.toString());
//               console.log(" [.] Got %s", content);
//               channel.ack(msg);
//               channel.close();
//               connection.close();
//               if (content.error) {
//                 res.status(content.statusCode).json({ message: content.message });
//                 return;
//               }
//               res.status(201).json(content);
//               next();
//             }
//         }
//         channel.consume('amq.rabbitmq.reply-to', responseHandler, { noAck: false });
//           const messageBuffer = Buffer.from(JSON.stringify(message));
//           channel.sendToQueue(QUEUE, messageBuffer, { correlationId, replyTo: 'amq.rabbitmq.reply-to' });
//           console.log(" [x] Sent %s", message);
//       }
//       ];
//         // return async (req, res, next) => {
//         //   const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
//         //   const QUEUE = 'messages';
    
//         //   const message = req;
//         //   console.log(message);
    
//         //   const connection = await amqp.connect(RABBITMQ_URL);
//         //   const channel = await connection.createChannel();
    
//         //   const correlationId = generateUuid();
    
//         //   const responseHandler = (msg) => {
//         //     if (msg?.properties.correlationId === correlationId) {
//         //       const content = JSON.parse(msg.content.toString());
//         //       console.log(" [.] Got %s", content);
//         //       channel.ack(msg);
//         //       channel.close();
//         //       connection.close();
//         //       if (content.error) {
//         //         res.status(content.statusCode).json({ message: content.message });
//         //         return;
//         //       }
//         //       res.status(201).json(content);
//         //       next();
//         //     }
//         //   };
    
//         //   channel.consume('amq.rabbitmq.reply-to', responseHandler, { noAck: false });
//         //   const messageBuffer = Buffer.from(JSON.stringify(message));
//         //   channel.sendToQueue(QUEUE, messageBuffer, { correlationId, replyTo: 'amq.rabbitmq.reply-to' });
//         //   console.log(" [x] Sent %s", message);
//         // };
//     },
// };