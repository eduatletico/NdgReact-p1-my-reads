import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
  const { shelf, title, books, onAddBookToShelf } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            book.shelf === shelf && (
              <Book
                key={book.id}
                book={book}
                onAddBookToShelf={onAddBookToShelf}
              />
            )
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onAddBookToShelf: PropTypes.func.isRequired
}

export default BookShelf;