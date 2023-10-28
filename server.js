const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const page = `<html>
  <head><title>My First Page</title></head>
  <body><h1>Hello from my Node.js Server!</h1></body>
  </html>`;


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(page);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});