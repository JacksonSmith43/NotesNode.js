const http = require('http');

const welcomePage = `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Page</title>
</head>
<body>
    <h2>Welcome Page.</h2>
</body>
</html>`;

const errorPage = `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Page</title>
</head>
  <body>
    <h1>This Page is not available!</h1>
    <h2>Take me <a href="/index.html">home</a>.</h2>
  </body>
</html>`;

const todoPage = `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To Do Page</title>
</head>
<body>
  <form action="/todo/add" method="POST">
    <div><input type="text" name="todo" autofocus/></div>
    <div><button type="submit">Create</button></div>
  </form>
</body>
</html>`

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const { url, method } = req; // With this, one does not need to write req.url, only url.

  if (url === "/") {
    res.writeHead(301, { Location: "/index.html" });
    return res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
  }

  if (url === "/index.html") {
    //res.setHeader("Content-Type", "text/html");
    return res.end(welcomePage);

  } else if (url === "/todo.html") {
    return res.end(todoPage);

  } else if (url === "/todo/add" && method === "POST") {
    const data = [];
    req.on("data", chunk => data.push(chunk));
    req.on("end", () => console.log(data));

    res.writeHead(302, { Location: "/" });
    return res.end();

  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(errorPage);
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});