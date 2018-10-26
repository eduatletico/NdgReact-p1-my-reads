import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Loader from './Loader';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 140,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  typography: {
    useNextVariants: true
  }
})

class BookDetails extends Component {
	static propTypes = {
    bookId: PropTypes.string.isRequired
  }

	state = {
    open: true,
    book: ''
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
  	this.props.onCloseDetails()
    this.setState({ open: false });
  }

  getModalStyle = () => {
	  return {
	    top: `50%`,
	    left: `50%`,
	    transform: `translate(-50%, -50%)`,
	    maxHeight: `85%`,
	    overflowY: `auto`
	  }
	}

	componentDidMount () {
		BooksAPI.get(this.props.bookId)
      .then((book) => {
        this.setState(() => ({
          book
        }))
      })
	}

	render () {
		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

		const { book } = this.state

		return (
			<div>
      {(book)
      	?
				<Modal
	          aria-labelledby="simple-modal-title"
	          aria-describedby="simple-modal-description"
	          open={this.state.open}
	          onClose={this.handleClose}
	        >
		      	<div style={this.getModalStyle()} className={this.props.classes.paper}>
		      		<div style={{float:`left`,clear:`none`}}>
		      			<img src={(book.imageLinks)?book.imageLinks.thumbnail:require('./imgs/nocover.jpg')} alt="Thumb" />
		      		</div>
		      		<div style={{float:`left`,clear:`none`, marginLeft: `20px`}}>
		      			{(book.authors) &&
		      			<Typography variant="subheading">
		      				<b>Author(s):</b>
		              {book.authors.map(author => (
		              	<div style={{marginLeft:`5px`}} key={author}>{author}</div>
		              ))}
		            </Typography>
		          	}
		          	{(book.pageCount) &&
			          	<Typography variant="subheading">
		        				<b>Page Count: </b>
			              {book.pageCount}
			            </Typography>
		          	}
		          	{(book.publisher) &&
			            <Typography variant="subheading">
		        				<b>Publisher: </b>
			              {book.publisher}
			            </Typography>
			          }
		          	{(book.publishedDate) &&
			            <Typography variant="subheading">
		        				<b>Publish Date: </b>
			              {book.publishedDate}
			            </Typography>
			          }
			          {(book.ratingsCount) &&
			            <Typography variant="subheading">
			      				<b>Ratings Count: </b>
			              {book.ratingsCount}
			            </Typography>
			          }
		      		</div>
		          <Typography variant="h6" style={{clear:`both`}}>
		            {book.title}
		          </Typography>
		          <Typography variant="subheading">
		            {book.description}
		          </Typography>
		        </div>
	        </Modal>
        	:
        	<Loader />
      	}
      </div>
		)
	}
}

export default withStyles(styles)(BookDetails)