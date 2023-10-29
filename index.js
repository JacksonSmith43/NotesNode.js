const notes = [

];



function buildLiItem(note) {
    const item = document.createElement("li");
    item.textContent = note;
    item.addEventListener("click", deleteNote);
    return item;
}


document.addEventListener("DOMContentLoaded", function () {
    const text = document.getElementById("text-input");
    const button = document.getElementById("add-button");

    button.addEventListener("click", pressAdd);
    text.addEventListener("keydown", keyDown);

});


function pressAdd() {
    event.preventDefault(); // Das Standardverhalten des Formulars unterdrücken.
    addNote();
    save();
}


function keyDown(event) {
    if (event.key === "Enter") {
        addNote();
    }
}

function addNote() {
    const text = document.getElementById("text-input");
    const title = document.getElementById("title-input");

    const note = text.value;

    if (title.value || text.value) {
        const list = document.getElementById("list");
        const item = buildLiItem(note);

        list.appendChild(item);
        notes.push(note);

        text.value = "";
        title.value = "";
        title.focus();

    }

}

function save() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function load() {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
}

function deleteNote(id) {
    return function () {
        const list = document.getElementById("list");
        const item = document.getElementById(id); /////
        list.removeChild(item);
        const pos = notes.findIndex((note) => note.id == id);
        notes.splice(pos, 1);
        save();
    };
}


