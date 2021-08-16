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
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const newBook = Object.create(Book);
    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.read = read;
    myLibrary.push(newBook);
    // test
    for(let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
    }
    
}

// Adds books from myLibrary to html page
function displayBooks() {

}