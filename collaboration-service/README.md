# Getting Started with Collaboration-service

1. Run `npm install` to install all the dependencies

1. To run development server, do `npm run dev`

* Do `npm run build` to compile for production before running `npm start`

# Testing

1. Start collaboration service development server

1. Open a new terminal window and do `npm run test-client`. This creates a new 'client socket' that connects to the server, with the client having roomId=1. 

**Expected output**
```
Server listening on port  3005
New connection with roomId: 1
```