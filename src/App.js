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
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({books});
    })
  }

  updateBookShelf = (book, shelf) => {
    console.log("Update book shelf", {book, shelf});
    BooksAPI.update(book, shelf).then((books) => {
      console.log(books);
      //this.setState({books: books});
    });
  }

  searchBooks = (query, maxResults = 20) => {
    console.log("Search books", {query, maxResults});
    if(query.length){
      BooksAPI.search(query, maxResults).then((books) => {
        console.log(books);
        this.setState({books: books});
      });
    }
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <BooksShelf books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
        <Route exact path="/search" render={({history}) => (
          <BooksSearch books={this.state.books} onSearchBooks={this.searchBooks} onUpdateBookShelf={this.updateBookShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
