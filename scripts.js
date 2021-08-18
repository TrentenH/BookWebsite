'use strict'

let myLibrary = [];

// Book object constructor
let Book = function(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = 0

    this.info = function() {
        let read_string = read ? "read" : "not yet read";
        return(`${title}` + ' by ' + `${author}` + ', ' + `${pages}` + ' pages, ' + `${read_string}`);
    }
}

// Adds a book to the myLibrary array
function addBookToLibrary() {

    // Retrieves form input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    // Assigns input values to new Book object
    const newBook = Object.create(Book);
    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.read = read;
    newBook.idNum = myLibrary.length;

    // Stores book in array of books
    myLibrary.push(newBook);

    // Calls function to make displayable card
    makeBookCard(newBook);

    // Said to help not refresh page upon submit
    return false;
    
}

// Makes a BootStrap card for each added book
function makeBookCard(Book) {
    let readOrNot = Book.read ? "Yes" : "No";

    // Retrives card-container div to append new cards to
    let container = document.getElementById('card-container');
    
    // Creates components of bootstrap card object
    let card = document.createElement('div');
    card.className = 'card';
    card.id = 'card' + Book.idNum;
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let title = document.createElement('h4');
    title.innerHTML = Book.title;
    title.className = 'card-title';
    let description = document.createElement('p');
    description.innerHTML = '<strong>By:</strong> ' + Book.author + '<br/>' 
                            + '<strong>Pages:</strong> ' + Book.pages + '<br/>'
                             + '<strong>Read:</strong> ' + readOrNot;
    description.id = 'description' + Book.idNum;
    description.className = 'card-text'
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    let delButton = document.createElement('button');
    delButton.className = 'btn btn-danger';
    delButton.id = 'delButton' + Book.idNum;
    delButton.innerHTML = 'delete';
    let editButton = document.createElement('button');
    editButton.className = 'btn btn-primary';
    editButton.innerHTML = 'read it?';
    editButton.id = 'editButton' + Book.idNum;

    // Links all components made prior to their respective parents 
    // and appends the card to the DOM
    buttonContainer.appendChild(delButton);
    buttonContainer.appendChild(editButton);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(buttonContainer);
    card.appendChild(cardBody);
    container.appendChild(card);

    // Binds delete function to card button click
    // also reassigns idNums for books so as to keep myLibrary
    // indexing
    delButton.onclick = function(){
        let delButtonID = this.id;
        let cardNum = delButtonID.substring(9);
        let parentID = document.getElementById('card' + cardNum);
        let newDelButton = document.getElementById('delButton'+cardNum);
        let newEditButton = document.getElementById('editButton'+cardNum);
        parentID.remove();

        myLibrary.splice(parseInt(cardNum), 1);
        for(let i = 0; i < myLibrary.length; i++){
            myLibrary[i].idNum = i;
            newDelButton.id = 'delButton'+i;
            newEditButton.id = 'editButton'+i;
        }
        
        console.table(myLibrary);
    }

    // Edits the read value reflected on the cards, as well as updates
    // the object attribute stored in myLibrary array
    editButton.onclick = function(){
        let editButtonID = this.id;
        let cardNum = editButtonID.substring(10);
        myLibrary[cardNum].read = !myLibrary[cardNum].read;
        let readOrNot = myLibrary[cardNum].read;
        readOrNot = readOrNot ? "Yes" : "No";
        let description = document.getElementById('description' + cardNum);
        description.innerHTML = '<strong>By:</strong> ' + Book.author + '<br/>' 
                                        + '<strong>Pages:</strong> ' + Book.pages + '<br/>'
                                            + '<strong>Read:</strong> ' + readOrNot;
        console.table(myLibrary);
    }
}
