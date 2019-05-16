const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

/* ==============================
 Middleware
 ================================ */
app.use(express.static(`${__dirname}/public`));
app.get('/', onAppGet);
io.on('connection', onIoConnection);
server.listen(3000, onServerListen);

/* ==============================
 Middleware Functions
 ================================ */
function onAppGet(req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
}

function onServerListen() {
  console.log('listening on *:3000');
}

function onIoConnection(socket) {
  console.log(`a user connected`);
  console.log(`Socket id: ${socket.id}`);
  
  socket.on('chat message', socketOnChatMessage);
  socket.on('disconnect', socketOnDisconnect);
}

/* ==============================
 Socket Functions
 ================================ */
function socketOnChatMessage(msg) {
  console.log('message: ' + msg);
  io.emit('chat message', msg);
}

function socketOnDisconnect() {
  console.log(`Socket disconnected`);
}
