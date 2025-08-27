const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);
let messages = [];
let users = [];

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('login', (user) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    users.push({
      name: user,
      id: socket.id
    });
    //console.log(users);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${user} has joined the conversation!` });
  })
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${users.find(user => user.id === socket.id).name} has left the conversation :(` });
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.use(express.static(path.join(__dirname, './client')));

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})
