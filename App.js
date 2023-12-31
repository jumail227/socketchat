const express = require('express');
const http = require('http');
const mongoose=require('mongoose')
var cors = require('cors')


const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// Define a socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('welcome', 'Welcome to the chat server!');

  // Handle chat message event
  socket.on('chat message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});




server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});



const socket = io('http://localhost:3001');

socket.on('welcome', (message) => {
  console.log('Received welcome message:', message);
  // Display the message in the browser or perform any other desired action
});