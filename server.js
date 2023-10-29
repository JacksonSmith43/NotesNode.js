const http = require('http');

const welcomePage = `<html>
  <head><title>My First Page</title></head>
  <body><h1>Hello from my Node.js Server!</h1></body>
  </html>`;

const defaultPage = `<html>
  <head><title>My First Page</title></head>
  <body>
  <h1>This Page is not available!</h1>
  <h2>Take me <a href="/index.html">home</a>.</h2>
  </body>
   </html>`;


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === "index.html") {
    return res.end(welcomePage);

  } else {
    res.statusCode = 404;
    res.end(defaultPage);
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});