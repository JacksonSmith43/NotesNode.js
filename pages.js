
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
  <link rel="icon" type="image/x-icon" href="note-sticky.png">

  <title>To Do Page</title>
</head>
<body>

  <form action="/todo/add" method="POST">
    <div id="title_input"><input type="text" size="26.9" name="todo" autofocus/></div>
    <textarea id="text_input" rows="8" cols="28">
    </textarea>
    <div id="add_button"><button type="submit">Create</button></div>
  </form>

<style>

  body {
        background-color: gray;
    }

    form {
        margin-left: 34rem;
        margin-top: 2rem;
        
    }

    #add_button{
        margin-left: 9.5rem;
    }

</style>


</body>
</html>`

module.exports = { welcomePage, errorPage, todoPage };