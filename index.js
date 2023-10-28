document.addEventListener("DOMContentLoaded", function () {

    const list = document.getElementById("#list");
    const title = document.getElementById("#title-input");
    const text = document.getElementById("#text-input");
    const button = document.getElementById("#button");

    button.addEventListener("keydown", keyDown);
    button.addEventListener("click", pressAdd);


    function pressAdd() {


        text.value = "";
        title.value = "";
        title.focus();

    }


    function keyDown() {
        if (event.key === "Enter") {

            text.value = "";
            title.value = "";
            title.focus();

        }

    }

    function addNote() {
       const note = text.value;
    }


});