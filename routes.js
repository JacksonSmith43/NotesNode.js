const fs = require('fs');
const { welcomePage, errorPage, todoPage } = require("./pages.js");

const notesArray = []; // Browser.
const filename = "./todo.txt";

function router(request, response) {

    const { url, method } = request;

    const notesList = `<ul>${notesArray.map((note, index) => `<li>${note}
    <form action="/todo/delete_note/${index}" method="POST">
      <button type="submit">Remove</button>
    </form>
  </li>`).join('')}</ul>`;


    const todoPageWithNotes = todoPage.replace('*', notesList);

    if (url === '/') {
        response.writeHead(301, { Location: '/index.html' });
        return response.end();

    } else {
        response.setHeader('Content-Type', 'text/html');
    }

    if (url === '/index.html') {
        return response.end(welcomePage);

    } else if (url === '/todo.html') {
        return response.end(todoPageWithNotes);

    } else if (url === '/todo/adding_note' && method === 'POST') {
        let data = '';
        request.on('data', (chunk) => (data += chunk.toString()));
        request.on('end', () => {
            addTodo(data);

            response.writeHead(200, { Location: '/todo.html' });
            return response.end(todoPageWithNotes);
        });

        return;

    } else if (url.startsWith('/todo/delete_note')) {
        const noteIndex = parseInt(url.split('/').pop());
        if (noteIndex >= 0 && noteIndex < notesArray.length) {
            notesArray.splice(noteIndex, 1);

            response.writeHead(200, { Location: '/todo.html' });
            return response.end(todoPageWithNotes);
        }

    } else {
        response.statusCode = 404;
        // const { errorPage } = require('./pages'); // One can either write it like this or define the page at the top, with the other two pages. 
        response.end(errorPage);
    }
}



function addTodo(data) {
    // const notesTerminal = processUserData(data);
    const { title, text } = parseFormData(data); // Extracts the title and text from the Formular. 
    const notesTerminal = `${title}\n${text}\n`; // \x1b[1mTitel\x1b[0m // This makes it, so that titel is bold in the Terminal.
    notesArray.push(notesTerminal);



    fs.exists(filename, exists => {

        if (exists) {
            updateNotes(filename, notesTerminal);

        } else {
            createFile(filename, notesTerminal);
        }

    });
}


function parseFormData(data) {
    const formData = new URLSearchParams(data); // data gets transformed into an Object and separates the input (title and text).
    return { // This returns
        title: formData.get('title'),
        text: formData.get('text')
    };
}


/*function processUserData(data) {
    return decodeURIComponent(data)
        .replace(/(.*?)=(.*)/g, (m, key, value) => value) // g = Global.
        .replace(/\+/g, " "); // + will be replaced by space.
}*/


function updateNotes(filename, notesTerminal) {
    fs.readFile(filename, "utf-8", (error, content) => {

        if (!error) {
            createFile(filename, [content, notesTerminal].join("\n")); // content and notesTerminal get combined and then are saved in filename.

        } else {
            console.error(`Could not read file ${filename}.`);
        }
    });
}

function createFile(filename, notesTerminal) {
    console.log(`Creating file ${filename}:`, "\n", notesTerminal);

    fs.writeFile(filename, notesTerminal, error => {
        if (error) {
            console.error(`Could not create file ${filename}.`);
            console.log(error);
        }
    });
}



function deleteNote(index) {
    notesArray.splice(index, 1);
}


module.exports = { router };