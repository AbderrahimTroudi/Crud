
const express = require('express');
const app = express();
const port = 3100;

// Send Notification API
app.post('/send-notification', (req, res) => {
    const notify = "yes it works !! ";
    socket.emit('notification', notify); // Updates Live Notification
    res.send(notify);
});

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