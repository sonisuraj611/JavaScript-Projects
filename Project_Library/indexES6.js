console.log('This is ES6 version of project');

class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{
    add(book) {

        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
    
        let books = localStorage.getItem('books');
        let booksObj;
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }
        booksObj.push(uiString);
        localStorage.setItem('books', JSON.stringify(booksObj));
        // book.showItems();
    }

    showItems() {

        let books = localStorage.getItem('books');
        let booksObj;
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
    
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = uiString;
    }

    clear() {
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length > 3 && book.author.length > 3) {
            return 1;
        }
        else {
            return 0;
        }
    }

    showMessage(type, showMsg) {
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
}

let display = new Display();
display.showItems();

//
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