import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const Shelves = (props) => {
  const activeShelves = [
    {
      shelf: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      shelf: 'wantToRead',
      title: 'Want to Read'
    },
    {
      shelf: 'read',
      title: 'Read'
    }
  ];

  const { books, onAddBookToShelf } = props

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {activeShelves.map(activeShelf => (
            <BookShelf
              key={activeShelf.shelf}
              shelf={activeShelf.shelf}
              title={activeShelf.title}
              books={books}
              onAddBookToShelf={onAddBookToShelf}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link
          to='/search'
        >Add a book</Link>
      </div>
    </div>
  );
}

Shelves.propTypes = {
  books: PropTypes.array.isRequired,
  onAddBookToShelf: PropTypes.func.isRequired
}

export default Shelves