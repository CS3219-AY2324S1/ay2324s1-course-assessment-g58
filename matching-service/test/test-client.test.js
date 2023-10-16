const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3004');

// Handle successful connection
socket.on('connect', () => {
  console.log('Connected to the server');

  // Emit the 'joinQueue' event to join the queue
  socket.emit('joinQueue', {
    userId: 'user123',
    difficulty: 'easy',
    language: 'JavaScript'
  });
});

// Handle 'match' event
socket.on('match', (matchingUser) => {
  console.log('Match found:', matchingUser);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
