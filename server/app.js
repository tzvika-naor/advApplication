// const scrapingData = require('./scrapingData');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const smartphoneRoutes = require('./routes/smartphone');
const orderController = require('./controllers/order');
const smartphoneController = require('./controllers/smartphone');

const connectionString = "mongodb+srv://advanced_applications:HC4HlY2ygfLzRyfD@cluster0.hjlul.mongodb.net/node-angular-react" ;
mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongoDB!!"))
    .catch(() => console.log('connection failed!!!'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/smartphone", smartphoneRoutes);


const server = http.createServer(app);

const io = socketIo(server/*, {
    cors: {
        origins: ["http://localhost:4200", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: false
    }
}*/);

//var ordersCounter = 0;
var usersCounter = 0;
//var smartphonesCounter = 0;

io.on('connection', (socket) => {
    console.log('New Connection!', socket.handshake.headers.origin)
    //When user connected from react client (not Admin panel)
    if (socket.handshake.headers.origin === "http://localhost:3000") {
        console.log('New user connected!');
        usersCounter++;
        socket.broadcast.emit('usersCounter', usersCounter)

        socket.on('disconnect', () => {
            console.log('User disconnected!');
            usersCounter--;
            socket.broadcast.emit('usersCounter', usersCounter)
        });
    }

    //When Order is deleted or added
    socket.on('changeOrdersCount', () => {
        orderController.getOrdersCount(null,null,(ordersCount) => {
            //ordersCounter = ordersCount;
            socket.broadcast.emit('ordersCounter', ordersCount);
            console.log('Total orders changed !!');
        });        
    })

    //When Smartphone is deleted or added
    socket.on('changeSmartphonesCount', () => {
        smartphoneController.getSmartphonesCount(null,null,(smartphonesCount) => {
            //smartphonesCounter = smartphonesCount;
            socket.broadcast.emit('smartphonesCounter', smartphonesCount);
            console.log('Total smartphones changed !!');
        });        
    })

});

server.listen(5000);

module.exports = app;