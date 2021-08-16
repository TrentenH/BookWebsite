'use strict'

let myLibrary = [];

// Book object constructor
let Book = function(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

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

    // Stores book in array of books
    myLibrary.push(newBook);

    // Calls function to make displayable card
    makeBookCard(newBook);

    console.log(myLibrary.length);
    // test
    for(let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
    }

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
    card.style = 'width: 18rem';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let title = document.createElement('h4');
    title.innerHTML = Book.title;
    title.className = 'card-title';
    let description = document.createElement('p');
    description.innerHTML = '<strong>By:</strong> ' + Book.author + '<br/>' + '<strong>Pages:</strong> ' + Book.pages + '<br/>' + '<strong>Read:</strong> ' + readOrNot;
    description.className = 'card-text'

    // Links all components made prior to their respective parents 
    // and appends the card to the DOM
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    card.appendChild(cardBody);
    container.appendChild(card);

}

// Adds books from myLibrary to html page
function displayBooks() {

}