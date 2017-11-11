import React from 'react'
import {Link} from 'react-router-dom'
import BooksList from './BooksList'

const BooksShelf = (props) =>{

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <BooksList books={props.books} onUpdateBookShelf={props.onUpdateBookShelf} showSearchedBooks={false} />
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );

}

export default BooksShelf