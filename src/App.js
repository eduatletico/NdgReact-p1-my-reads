import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import Shelves from './Shelves';
import BookDetails from './BookDetails';
import Loader from './Loader';

if (!Array.prototype.last){
  /*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
  Array.prototype.last = function(){
    return this[this.length - 1];
  };
};

class BooksApp extends React.Component {
  state = {
    books: [],
    showLoader: true
  }

  addBookToShelf = (book, shelf) => {
    this.setState({ showLoader: true });

    BooksAPI.update(book, shelf);

    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([ book ]),
      showLoader: false
    }))
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books, showLoader: false })
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
                const urlParams = window.location.href.split('/')
                if (urlParams.length > 5) {
                  history.push(`/search/${urlParams[4]}`)
                } else {
                  history.goBack()
                }
              }}
            />
          )}
        />

        <Route exact path='/' render={() => (
            <div>
            { this.state.showLoader && <Loader /> }
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
