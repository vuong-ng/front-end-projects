const myLibrary = [];

function Book(title, author, pagesNum, currentPage) {
    this.title=title;
    this.author=author;
    this.pagesNum=pagesNum;
    this.currentPage=currentPage;
}

const dialog = document.getElementsByTagName("dialog")[0];
console.log(dialog);
const showButton = document.getElementsByClassName("add-book")[0];
console.log(showButton);
const closeButton = document.querySelector("dialog button");
showButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})

const form = document.querySelector(".book-info");

// const submit = document.getElementById("submit-book")[0];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(form[0].value, form[1].value, form[2].value, form[3].value);
    // console.log(form[0].value);
    myLibrary.push(newBook);
    renderBook(newBook);
    dialog.close();
    
})

function renderBook(newBook) {
    // add book to the library
    const library = document.getElementsByClassName('library')[0];
    const book = document.createElement("div");
    book.setAttribute('class','book-card');
    content = `
    <div class='head-mark'></div>
    <div class='card-content'>
    <div class='title'>${newBook.title}</div>
    <div class='author'>${newBook.author}</div>
    <div class='page-number'>${newBook.pagesNum}</div>
    <div class='progress'>${newBook.currentPage}</div>
    </div>`;
    book.innerHTML = content;
    library.appendChild(book);
    console.log(book);
}

