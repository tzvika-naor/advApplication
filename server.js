const app = require("./backend/app");
var http = require('http');
const server = http.createServer(app);
server.listen(5000);

