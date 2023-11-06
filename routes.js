const fs = require('fs');
const { welcomePage, errorPage, todoPage } = require("./pages.js");
const notesArray = []; 
function router(request, response) {
    const { url, method } = request;

    if (url === '/') {
        response.writeHead(301, { Location: '/index.html' });
        return response.end();

    } else {
        response.setHeader('Content-Type', 'text/html');
    }

    if (url === '/index.html') {
        return response.end(welcomePage);

    } else if (url === '/todo.html') {
        const notesList = `<ul>${notesArray.map(note => `<li>${note}</li>`).join('')}</ul>`;
        const todoPageWithNotes = todoPage.replace('*', notesList);
        return response.end(todoPageWithNotes);        

    } else if (url === '/todo/adding_note' && method === 'POST') {
        let data = '';
        request.on('data', (chunk) => (data += chunk.toString()));
        request.on('end', () => {
            const { title, text } = parseFormData(data);
            const note = `${title}: ${text}`;
            notesArray.push(note); 
            response.writeHead(302, { Location: '/todo.html' });
            return response.end();
        });

        return;

    } else {
        response.statusCode = 404;
        // const { errorPage } = require('./pages'); // One can either write it like this or define the page at the top, with the other two pages. 
        response.end(errorPage);
    }
}



function addTodo(data) {

    const filename = "./todo.txt";
    // const note = processUserData(data);
    
    const { title, text } = parseFormData(data);
    const note = `${title}\n${text}\n`;
    
    fs.exists(filename, exists => {

        if (exists) {
            updateNotes(filename, note);

        } else {
            createFile(filename, note);
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


function updateNotes(filename, note) {
    fs.readFile(filename, "utf-8", (error, content) => {

        if (!error) {
            createFile(filename, [content, note].join("\n"));

        } else {
            console.error(`Could not read file ${filename}.`);
        }
    });
}

function createFile(filename, note) {
    console.log(`Creating file ${filename}:`, "\n", note);

    fs.writeFile(filename, note, error => {
        if (error) {
            console.error(`Could not create file ${filename}.`);
            console.log(error);
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

function deleteNote(){
    
}

module.exports = { router };