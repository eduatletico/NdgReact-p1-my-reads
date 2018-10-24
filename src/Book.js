import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Book extends Component {
	static propTypes = {
    book: PropTypes.object.isRequired,
    onAddBookToShelf: PropTypes.func.isRequired,
    query: PropTypes.string
  }

  render () {
  	const { book, onAddBookToShelf, query } = this.props

  	return (
  		<li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-details" title="See details">
            {
            	(query)
            	?
            		<Link
			            to={`/book/${query}/${book.id}`}
			          >See details</Link>
            	:
	            	<Link
			            to={`/book/${book.id}`}
			          >See details</Link>
		        }
            </div>
            <div className="book-shelf-changer">
              <select defaultValue={(book.shelf)?book.shelf:'none'} onChange={(e) => {onAddBookToShelf(book, e.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{(book.authors)?book.authors.join(', '):''}</div>
        </div>
      </li>
  	);
  }
}

export default Book