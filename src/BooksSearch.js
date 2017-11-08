import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BooksList from './BooksList'
import {Debounce} from 'react-throttle'

class BooksSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
          query: ''
        }
    }

    updateQuery = (query) => {
        console.log("update query", query);
        this.setState({ query: query.trim() });
        this.props.onSearchBooks(query);
    }

    render(){

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="600" handler="onChange">
                            <input type="text" placeholder="Search by title or author" 
                                onChange={(event) => this.updateQuery(event.target.value)} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BooksList books={this.props.books} onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                    </ol>
                </div>
            </div>
        );
    }
}

export default BooksSearch