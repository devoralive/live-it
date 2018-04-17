const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.get('/yolo', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('subscribe', ({ path, user }) => {
    socket.join(path);
    console.log(`Subscribing to ${path}`);
    io.to(path).emit('connecting', { path, user });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
