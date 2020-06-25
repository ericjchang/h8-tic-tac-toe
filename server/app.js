
if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
  }

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const routes = require("./routes");
const errorHandler = require("./middlewares/errorhandler.js");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server)
// const Controller = require('./controllers/controlleruser');
const { User } = require('./models/index');
const checkBoard = require('./helpers/checkBoard.js');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use("/", routes);
app.use(errorHandler);

let users = [];
let moves = ["", "", "", "", "", "", "", "", ""];
let players = ['cross', 'circle']
let roomNo = 1
let messages=[];

io.on('connection', (socket) => {
    console.log('User Connected')

    if(io.nsps['/'].adapter.rooms[roomNo] && io.nsps['/'].adapter.rooms[roomNo].length > 1) {
        roomNo++
        users = [];
    };
    socket.join(roomNo);
    //// get connect user data
    socket.on('user-connect', (data) => {
        console.log(roomNo)
        users.push(data)
        let payload = {
            users,
            roomNo
        }
        io.emit('user-connect', payload)
    })
    socket.on("play-game", (data) => {
        moves = ["", "", "", "", "", "", "", "", ""];
        io.emit("play-game", moves)
    })

    //// add move
    socket.on('add-move', (data) => {
        let payload;
        moves[data.index] = 'cross'
        if(checkBoard(moves)) {
            payload = {
                winner: data.name,
                moves
            };
        } else {
            payload = {
                moves
            }
        }
        io.emit('add-move', payload)
    })
    socket.on('send-message', function(data) {
        console.log('entered server, received', data)
        messages.push(data)
        console.log(messages)
        io.emit('send-message', messages)
    }),
    socket.on('refresh', function() {
        io.emit('refresh_client')
    })

})

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})
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
})
