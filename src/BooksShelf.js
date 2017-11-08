import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BooksList from './BooksList'

class BooksShelf extends Component{

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <BooksList books={this.props.books} onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
    
}

export default BooksShelf