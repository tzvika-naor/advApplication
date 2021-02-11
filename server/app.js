const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors')


const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const smartphoneRoutes = require('./routes/smartphone');

const app = express();

var http = require('http');
const server = http.createServer(app);
const io = socketIo(server)
server.listen(5000);

mongoose.connect("mongodb+srv://advanced_applications:HC4HlY2ygfLzRyfD@cluster0.hjlul.mongodb.net/node-angular-react",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongoDB!!"))
    .catch(() => console.log('connection failed!!!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var orderCounter = 0;
var count = 0;
io.on('connection', (socket) => {
    // console.log(socket.handshake.headers.origin)
    if (socket.handshake.headers.origin === "http://localhost:3000/") {
        count++;
        socket.broadcast.emit('count', count)
    }
    socket.on('disconnect', () => {
        count--;
        socket.broadcast.emit('count', count)
    })
    socket.on('newOrder', () => {
        console.log('newOrder');
        orderCounter++;
        socket.broadcast.emit('orderCounter', orderCounter)
    })
    socket.on('deleteOrder', () => {
        orderCounter--;
        socket.broadcast.emit('orderCounter', orderCounter)
    })
})

app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/smartphone", smartphoneRoutes);

module.exports = app;