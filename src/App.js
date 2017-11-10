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
    console.log("Get all books");
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({books});
    });
  }

  updateBookShelf = (book, shelf) => {
    console.log("Update book shelf", {book, shelf});

    BooksAPI.update(book, shelf).then((books) => {
      console.log(books);
      this.getAllBooks();
    });
  }
 
  searchBooks = (query, maxResults = 20) => {

    console.log("Search books", {query, maxResults});
    if(query.length){
      BooksAPI.search(query, maxResults)
      .then((searchedBooks) => {
        console.log(searchedBooks);
        let categorizedShelvedBooks = this.categorizeShelvedBooks(searchedBooks, this.state.books);
        this.setState({
          books: categorizedShelvedBooks,
        });
      });
    }
  }


  categorizeShelvedBooks = (searchedBooks, books) => {
    console.log("categorizeShelvedBooks", {searchedBooks, books});
    return searchedBooks.map((searchedBook) => {

        books.map((book) => {
            if(searchedBook.id === book.id){
              console.log("books mapping", {book,searchedBook});
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
          <BooksSearch books={this.state.books} onSearchBooks={this.searchBooks} onUpdateBookShelf={ (book, shelf) => {
              this.updateBookShelf(book,shelf)
              history.push('/')
            }} />
        )} />
      </div>
    )
  }
}

export default BooksApp
