
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

<form action="/todo/adding_title" method="POST">
 <div id="title_input">
    <input type="text" name="title" size="27rem" autofocus placeholder="Enter title of note."/>
  </div>

  <button id="add_button" type="submit">Add</button>
</form>

<form action="/todo/adding_text" method="POST">
    <div id="text_input">
        <input type="text" name="text" size="27rem" autofocus placeholder="Enter Text of note."/>
    </div>
  <button id="add_button" type="submit">Add </button>
</form>

<div id="todo_list">
    <ul id="note">
    <li></li>
    </ul>
</div>



<!-- Putting this in an external stylesheet did not work.-->
<style>

  body {
        background-color: gray;
    }

    form {
        margin-left: 50rem;
        margin-top: 2rem;
    }


</style>


</body>
</html>`

module.exports = { welcomePage, errorPage, todoPage };