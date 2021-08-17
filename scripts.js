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
    card.id = Book.idNum;
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let title = document.createElement('h4');
    title.innerHTML = Book.title;
    title.className = 'card-title';
    let description = document.createElement('p');
    description.innerHTML = '<strong>By:</strong> ' + Book.author + '<br/>' 
                            + '<strong>Pages:</strong> ' + Book.pages + '<br/>'
                             + '<strong>Read:</strong> ' + readOrNot;
    description.className = 'card-text'
    let delButton = document.createElement('button');
    delButton.className = 'btn btn-danger';
    delButton.id = 'delbutton' + Book.idNum;
    delButton.innerHTML = 'delete';

    // Links all components made prior to their respective parents 
    // and appends the card to the DOM
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(delButton);
    card.appendChild(cardBody);
    container.appendChild(card);

    // Binds delete function to card button click
    // also reassigns idNums for books so as to keep myLibrary
    // indexing
    delButton.onclick = function(){
        console.log(this.id);
        let cardID = parseInt(this.parentNode.parentNode.id);
        myLibrary.splice(cardID, 1);
        this.parentNode.parentNode.remove();
        console.table(myLibrary);
        for(let i = myLibrary.length -1; i > cardID; i--) {
            myLibrary[i].idNum--;
        }
    }
}
