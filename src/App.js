import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount(){
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.getAllBooks();
    });
  }
 
  searchBooks = (query, maxResults = 20) => {
    if(query.length){
      BooksAPI.search(query, maxResults).then((searchedBooks) => {
        let categorizedShelvedBooks = this.categorizeShelvedBooks(searchedBooks, this.state.books);
        this.setState({
          books: categorizedShelvedBooks,
        });
      }).catch((exception) => {
        alert("No book has been found with this query");
      });
    }
  }


  categorizeShelvedBooks = (searchedBooks, books) => {
    return searchedBooks.map((searchedBook) => {
        books.map((book) => {
            if(searchedBook.id === book.id){
              searchedBook = book;
            }
            return book;
        });
        return searchedBook;
    });
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <BooksShelf books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
        <Route exact path="/search" render={({history}) => (
          <BooksSearch books={this.state.books} onSearchBooks={this.searchBooks} onBackButtonClick={this.getAllBooks} onUpdateBookShelf={ (book, shelf) => {
              this.updateBookShelf(book,shelf)
              history.push('/')
            }} />
        )} />
      </div>
    );
  }
}

export default BooksApp
