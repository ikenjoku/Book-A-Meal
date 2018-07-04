import app from '../app';

const http = require('http');

const port = parseInt(process.env.PORT, 10) || 9000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
