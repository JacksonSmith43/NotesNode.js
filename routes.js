const fs = require('fs');
const { welcomePage, errorPage, todoPage } = require("./pages.js");

function router(request, response) {
    const { url, method } = request;

    if (url === '/') {
        response.writeHead(301, { Location: '/index.html' });
        return response.end();

    } else {
        response.setHeader('Content-Type', 'text/html');
    }

    if (url === '/index.html') {
        const { welcomePage } = require('./pages');
        return response.end(welcomePage);

    } else if (url === '/todo.html') {
        return response.end(todoPage);

    } else if (url === '/todo/add' && method === 'POST') {
        let data = '';
        request.on('data', (chunk) => (data += chunk.toString()));
        request.on('end', () => {
            addTodo(data);
            response.writeHead(200, { Location: '/todo.html' });
            return response.end(todoPage);
        });

        return;

    } else {
        response.statusCode = 404;
        const { errorPage } = require('./pages');
        response.end(errorPage);
    }
}



function addTodo(data) {

    const filename = "./todo.txt";
    const note = processUserData(data);

    fs.exists(filename, exists => {

        if (exists) {
            updateNotes(filename, note);

        } else {
            createNotes(filename, note);
        }

    });
}

function processUserData(data) {
    return decodeURIComponent(data)
        .replace(/(.*?)=(.*)/g, (m, key, value) => value) // g = Global.
        .replace(/\+/g, " "); // + will be replaced by space.
}


function updateNotes(filename, note) {
    fs.readFile(filename, "utf-8", (error, content) => {

        if (!error) {
            createNotes(filename, [content, note].join("\n"));

        } else {
            console.error(`Could not read file ${filename}.`);
        }
    });
}

function createNotes(filename, note) {
    console.log(`Creating note ${filename}:`, "\n", note);
    fs.writeFile(filename, note, error => {

        if (error) {
            console.error(`Could not create file ${filename}.`);
            console.log(error);
        }
    });
}

module.exports = { router };