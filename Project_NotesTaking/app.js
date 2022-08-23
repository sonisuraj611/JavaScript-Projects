// const { json } = require("stream/consumers");

console.log("Welcome to Notes App");
showNotes();

//If user add a note, add it to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    let html = "";
    notesObj.forEach(function(element, index){
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p id="para" class="card-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`;
    });
    let notesElem = document.getElementById("notes");
    
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML =  `Nothing to show! Use "Add a Title" and "Add a Note" sections above to add notes.`
    }
}

function deleteNote(index){
    // console.log("deleting",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);1
    }
    let b = confirm("Are you sure?");
    if(b == 1){
        notesObj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
    else{
        console.log("You clicked Cancel");
    }
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){

    let searchVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if(cardTxt.includes(searchVal) || cardTitle.includes(searchVal)){
            element.style.display = "block";
            console.log(cardTxt);
        }
        else{
            element.style.display = "none";
        }
    });
});

