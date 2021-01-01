
//short version no checks
const app = require("./backend/app");
var http = require('http');

// https.createServer(options, function(req, res) {
//     res.head(200);
//     res.end('hello world');
// }).listen()
const server = http.createServer(app);
server.listen(5000);

// const app = require("./backend/app");
// const debug = require("debug");
// const http = require("http");

// const normalizePort = val => {
//     //activate funcion normalizePort
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     //port should be a number 
//     return val;
//   }

//   if (port >= 0) {
//     // port must be a positive number
//     return port;
//   }

//   return false;
// };

// const onError = error => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + port : "port " + port;
//   debug("Listening on " + bind);
// };

// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);
// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
// console.log(port)
// server.listen(port);
