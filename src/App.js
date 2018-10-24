import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import Shelves from './Shelves';
import BookDetails from './BookDetails';
import Loader from './Loader';

if (!Array.prototype.last){
  Array.prototype.last = function(){
    return this[this.length - 1];
  };
};

class BooksApp extends React.Component {
  state = {
    books: [],
    showLoader: true
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
          showLoader: false
        }))
      })
  }

  addBookToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book, shelf) => {
        this.getAllBooks()
      })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (
            <Search
              myBooks={this.state.books}
              onAddBookToShelf={this.addBookToShelf}
            />
          )}
        />

        <Route path='/book' render={({ history }) => (
            <BookDetails
              bookId={window.location.href.split('/').last()}
              onCloseDetails={() => {
                let url = window.location.href.split('/')
                if (url.length > 5) {
                  history.push(`/search/${url[url.length - 2]}`)
                } else {
                  history.goBack()
                }
              }}
            />
          )}
        />

        <Route exact path='/' render={() => (
            <div>
            {
              (this.state.showLoader)
              ?
              <Loader />
              :
              ''
            }
              <Shelves
                books={this.state.books}
                onAddBookToShelf={(book, shelf) => {
                  this.setState(() => ({
                    showLoader: true
                  }))
                  this.addBookToShelf(book, shelf)
                }}
              />
            </div>
          )}
        />

      </div>
    )
  }
}

export default BooksApp
