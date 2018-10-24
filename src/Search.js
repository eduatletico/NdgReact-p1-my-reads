import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import {DebounceInput} from 'react-debounce-input';
import Loader from './Loader';

class Search extends Component {
	static propTypes = {
		myBooks: PropTypes.array.isRequired,
    onAddBookToShelf: PropTypes.func.isRequired
  }

	state = {
		query: '',
    books: [],
    emptyResult: false,
		showLoader: false
  }

  searchBooks = (query) => {
  	if (query.trim() !== '') {

  		this.setState(() => ({
        showLoader: true,
        query: query.trim()
      }))

	    BooksAPI.search(query.trim())
	    	.then((filteredBooks) => {
	    		if (!filteredBooks.error) {
		    		let filter = filteredBooks.map(filtBook => {
			    		this.props.myBooks.map(book => {
		    				if (filtBook.id === book.id) {
		    					filtBook = book;
		    				}
		    				return true;
		    			})
		    			return filtBook
	    			})
		    		this.setState(() => ({
		          books: filter,
		          emptyResult: false,
		          showLoader: false
		        }))
	    		} else {
	    			this.setState(() => ({
		          emptyResult: true,
		          showLoader: false
		        }))
	    		}
	    	})
    } else {
 		 	this.setState(() => ({
        query: '',
        books: [],
        emptyResult: false,
        showLoader: false
      }))
    }
  }

  componentDidMount() {
  	let url = window.location.href.split('/');
  	if (url.length > 4) {
      this.searchBooks(url[url.length - 1])
  	}
  }

	render () {
		const { query, books, emptyResult, showLoader } = this.state

		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
							value={query}
          		minLength={2}
          		debounceTimeout={300}
          		placeholder="Search by title or author"
          		onChange={(event) => this.searchBooks(event.target.value)}
          	/>
          </div>
        </div>
        {
      		(showLoader)
      		?
      		<Loader />
      		:
      		''
      	}
        <div className="search-books-results">
          <ol className="books-grid">
          	{
          		(!emptyResult)
          		?
	          		books.map(book => (
		        			<Book
		        				key={book.id}
		        				book={book}
		        				onAddBookToShelf={this.props.onAddBookToShelf}
		        				query={query}
		        			/>
	          		))
          		:
          		`No results found`
          	}
          </ol>
        </div>
      </div>
		);
	}
}

export default Search