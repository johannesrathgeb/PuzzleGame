const http = require('http');
const app = require('./app');

const port = process.env.Port || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);