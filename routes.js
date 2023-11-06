const fs = require('fs');
const { welcomePage, errorPage, todoPage } = require("./pages.js");

const notesArray = []; // Browser.
const filename = "./todo.txt";

function router(request, response) {
    const { url, method } = request;
    const notesList = `<ul>${notesArray.map(notesTerminal => `<li>${notesTerminal}</li>`).join('')}</ul>`;
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

    } else {
        response.statusCode = 404;
        // const { errorPage } = require('./pages'); // One can either write it like this or define the page at the top, with the other two pages. 
        response.end(errorPage);
    }
}



function addTodo(data) {

    // const notesTerminal = processUserData(data);

    const { title, text } = parseFormData(data);
    const notesTerminal = `${title}\n${text}\n`;
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
    const formData = new URLSearchParams(data);
    return {
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
            createFile(filename, [content, notesTerminal].join("\n"));

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


function deleteNote() {

}
module.exports = { router };