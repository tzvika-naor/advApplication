
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const smartphoneRoutes = require('./routes/smartphone');
const app = express();
var http = require('http');
const server = http.createServer(app);
server.listen(5000);

mongoose.connect("mongodb+srv://advanced_applications:HC4HlY2ygfLzRyfD@cluster0.hjlul.mongodb.net/node-angular-react",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongoDB!!"))
    .catch(() => console.log('connection failed!!!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, UPDATE, DELETE, PUT , OPTIONS");
    next();
});
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/smartphone", smartphoneRoutes);

module.exports = app;