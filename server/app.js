const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('A user connected')


    //emitter
    //listener


})
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});