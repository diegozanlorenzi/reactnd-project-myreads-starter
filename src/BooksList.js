import React from 'react'

const BooksList = (props) =>{

    const filter = books => shelf => books.filter(book => book.shelf === shelf);
    const filterBy = filter(props.books);
    
    let bookShelfs = [];

    if(props.showSearchedBooks){
        bookShelfs.push(
            {
                shelf: "none",
                shelfName: "Not shelved books", 
                books: filterBy(undefined)
            }
        );
    }


    bookShelfs.push(
        {
            shelf: "currentlyReading",
            shelfName: "Currently Reading", 
            books: filterBy("currentlyReading")
        }
    );

    bookShelfs.push(
        {
            shelf: "wantToRead",
            shelfName: "Want to Read", 
            books: filterBy("wantToRead")
        }
    );

    bookShelfs.push(
        {
            shelf: "read",
            shelfName: "Read", 
            books: filterBy("read")
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