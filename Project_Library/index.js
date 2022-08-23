
console.log("hi this is console");
// showItems();
//Constructor to create book objects
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Function to display items in table
function Display() {

}

//Adding Book to localStorage
Display.prototype.add = function (book) {
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button id="delBtn" onclick="display.deleteRow()" class="btn btn-primary">Delete</button></td>
                    </tr>`;

    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    booksObj.push(uiString);
    localStorage.setItem('books', JSON.stringify(booksObj));
}


//Show Items from localStorage in UI as table 
Display.prototype.showItems = function () {

    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }

    let uiString = "";
    booksObj.forEach(function (element){
        uiString += element;
    });
    tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = uiString;
}


//Clear form after adding books
Display.prototype.clear = function () {
    libraryForm.reset();
}

//Function to delete book
Display.prototype.deleteRow = function(i) {
    console.log("deleting")
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    let element = i-1;
    booksObj.splice(element,1);
    localStorage.setItem('books',JSON.stringify(booksObj));
    display.showItems();
}

//Validate books to add 
Display.prototype.validate = function (book) {
    if (book.name.length > 3 && book.author.length > 3) {
        return 1;
    }
    else {
        return 0;
    }
}

//Show the alert [Success or Danger]
Display.prototype.showMessage = function (type, showMsg) {
    let strongText;
    if(type === 'success'){
        strongText = 'Success';
    }
    else{
        strongText = 'Error';
    }
    let msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>${strongText}:</strong> ${showMsg}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    setTimeout(() => {
        msg.innerHTML = "";
    }, 5000);
}

let display = new Display();
display.showItems();


let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let selfHelp = document.getElementById('selfHelp');
    let programming = document.getElementById('programming');
    let fiction = document.getElementById('fiction');
    let type;

    if (selfHelp.checked) {
        type = selfHelp.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (fiction.checked) {
        type = fiction.value;
    }

    let book = new Book(name, author, type);
    console.log(book);
    
    if (display.validate(book)) {
        display.add(book);
        display.showItems();
        display.showMessage('success', 'Your book has been successfully added!');
        display.clear();
    }
    else {
        display.showMessage('danger', 'The length of book name or author name is less than 3');
    }

    e.preventDefault();
}





//Safe and working code :--

// console.log("hi this is console");
// // showItems();
// //Constructor to create book objects
// function Book(name, author, type) {
//     this.name = name;
//     this.author = author;
//     this.type = type;
// }

// //Function to display items in table
// function Display() {

// }

// //Adding Book to localStorage
// Display.prototype.add = function (book) {

//     let uiString = `<tr>
//                         <td>${book.name}</td>
//                         <td>${book.author}</td>
//                         <td>${book.type}</td>
//                     </tr>`;

//     let books = localStorage.getItem('books');
//     if (books == null) {
//         booksObj = [];
//     }
//     else {
//         booksObj = JSON.parse(books);
//     }
//     booksObj.push(uiString);
//     localStorage.setItem('books', JSON.stringify(booksObj));
// }


// //Show Items from localStorage in UI as table 
// Display.prototype.showItems = function () {

//     let books = localStorage.getItem('books');
//     if (books == null) {
//         booksObj = [];
//     }
//     else {
//         booksObj = JSON.parse(books);
//     }

//     let uiString = "";
//     booksObj.forEach(function (element){
//         uiString += element;
//     });

//     tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = uiString;
// }


// //Clear form after adding books
// Display.prototype.clear = function () {
//     libraryForm.reset();
// }

// //Validate books to add 
// Display.prototype.validate = function (book) {
//     if (book.name.length > 3 && book.author.length > 3) {
//         return 1;
//     }
//     else {
//         return 0;
//     }
// }

// //Show the alert [Success or Danger]
// Display.prototype.showMessage = function (type, showMsg) {
//     let strongText;
//     if(type === 'success'){
//         strongText = 'Success';
//     }
//     else{
//         strongText = 'Error';
//     }
//     let msg = document.getElementById('msg');
//     msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//                         <strong>${strongText}:</strong> ${showMsg}
//                         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//                     </div>`;
//     setTimeout(() => {
//         msg.innerHTML = "";
//     }, 5000);
// }

// let display = new Display();
// display.showItems();

// //
// let libraryForm = document.getElementById('libraryForm');
// libraryForm.addEventListener('submit', libraryFormSubmit);

// function libraryFormSubmit(e) {
//     let name = document.getElementById('bookName').value;
//     let author = document.getElementById('author').value;
//     let selfHelp = document.getElementById('selfHelp');
//     let programming = document.getElementById('programming');
//     let fiction = document.getElementById('fiction');
//     let type;

//     if (selfHelp.checked) {
//         type = selfHelp.value;
//     }
//     else if (programming.checked) {
//         type = programming.value;
//     }
//     else if (fiction.checked) {
//         type = fiction.value;
//     }

//     let book = new Book(name, author, type);
//     console.log(book);
    
//     if (display.validate(book)) {
//         display.add(book);
//         display.showItems();
//         display.showMessage('success', 'Your book has been successfully added!');
//         display.clear();
//     }
//     else {
//         display.showMessage('danger', 'The length of book name or author name is less than 3');
//     }

//     e.preventDefault();
// }
