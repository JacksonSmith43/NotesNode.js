
const welcomePage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Page</title>
  </head>
  <body>
    <center>
      <h2>Welcome Page.</h2>
      <p><a href="todo.html"><strong>This</strong></a> leads to the To Do Page.</p
    </center>

  </body>
</html>`;

const errorPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <title>Error Page</title>
</head>
  <body>
    <center>
      <h1>This Page is not available.</h1>
      <h2>This takes you to the <a href="/index.html">Welcome Page</a>.</h2>
      </center>
  </body>
</html>`;

const todoPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- <link rel="icon" href="sticky-note.png" type="image/x-icon">Does not work, seeing as todoPage does not actually exist. -->
    <link rel="stylesheet" href="styles.css">        
    <title>To Do Page</title>
  </head>
    <body>

      <form action="/todo/adding_note" method="POST">
        <input id="title_input" type="text" name="title" size="27rem" autofocus placeholder="Enter title of note." />
        <textarea id="text-input" type="text" name="text" placeholder="Enter Note." aria-label="Input of note."></textarea>
        <button id="add_button" type="submit">Add</button>
      </form>
    
      <ul id="notesList">
      <li>*</li>
      </ul>

        <!-- Putting this in an external stylesheet did not work.-->
    <style>

        body {
          background-color: gray;
        }

      #title_input {
        margin-left: 50rem;
        margin-top: 2rem;
        display: flex;

      }
      textarea{
        margin-left: 50rem;
        height: 8rem;
        width: 12.5rem;
      }



    </style>


  </body>
</html>`;

module.exports = { welcomePage, errorPage, todoPage };