
const express = require('express');
const app = express();
const port = 3100;


const server = app.listen(port, () => {
  console.log(`Server connection on  http://localhost:${port}`);  // Server Connnected
});
// Socket Layer over Http Server
const socket = require('socket.io')(server);
// On every Client Connection
socket.on('connection', socket => {
    console.log('Socket: client connected');
});
module.exports=socket