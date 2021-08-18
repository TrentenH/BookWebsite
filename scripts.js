'use strict'

let myLibrary = [];

// Book object constructor
let Book = function(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = 0
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

    // Reorders in order to maintain uniqueness of idNum in case
    // of deletes followed by adds
    for(let i = 0; i < myLibrary.length; i++){
        myLibrary[i].idNum = i;
    }

    // If myLibrary size is 0, push to array. Else, verify that book
    // with title doesn't already exist within the array
    if(myLibrary.length == 0){
        myLibrary.push(newBook);
        makeBookCard(newBook);
    }else{
        // Checks to see if book has been entered previously
        for(let i = 0; i < myLibrary.length; i++){
            if(newBook.title == myLibrary[i].title){
                alert("Book has already been entered.");
            }else{
                myLibrary.push(newBook);
                makeBookCard(newBook);
            }
        }
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
    card.id = 'card' + Book.idNum;
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let title = document.createElement('h4');
    title.innerHTML = Book.title;
    title.className = 'card-title';
    title.id = 'card-title' + Book.idNum;
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

    // Binds delete function to card button click by checking through
    // array for a book with that title (retrieved from card title)
    delButton.onclick = function() {
        console.log(this.parentNode.parentNode.parentNode.id);
        let delButton = this.id;
        let position = delButton.substring(9);
        let titleID = 'card-title' + position;
        let title = document.getElementById(titleID).innerHTML;
        for(let i = 0; i < myLibrary.length; i++) {
            if(myLibrary[i].title == title){
                myLibrary.splice(i, 1);
                break;
            }else{
                console.log("no book by that title");
            }
        }
        this.parentNode.parentNode.parentNode.remove();
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
