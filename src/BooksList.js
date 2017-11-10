import React from 'react'

function BooksList (props){

    let bookShelfs = [];

    bookShelfs.push(
        {
            shelf: "none",
            shelfName: "Not shelved books", 
            books: props.books.filter((book) => (typeof book.shelf === 'undefined' ))
        }
    );

    bookShelfs.push(
        {
            shelf: "currentlyReading",
            shelfName: "Currently Reading", 
            books: props.books.filter((book) => (book.shelf === 'currentlyReading'))
        }
    );

    bookShelfs.push(
        {
            shelf: "wantToRead",
            shelfName: "Want to Read", 
            books: props.books.filter((book) => (book.shelf === 'wantToRead'))
        }
    );

    bookShelfs.push(
        {
            shelf: "read",
            shelfName: "Read", 
            books: props.books.filter((book) => (book.shelf === 'read'))
        }
    );

    return (
        <div className="list-books-content">
            <div>
                {bookShelfs.map((bookShelf) => (
                    bookShelf.books.length > 0 && (
                    <div className="bookshelf" key={bookShelf.shelf}>
                        <h2 className="bookshelf-title">{bookShelf.shelfName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">          
                                {bookShelf.books.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                            <select value={book.shelf ? book.shelf : "none" } onChange={(event) => props.onUpdateBookShelf(book, event.target.value)}>
                                                <option value="" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.subtitle}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );

}

export default BooksList