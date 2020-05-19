import React from 'react';
import BooksLayout from './BooksLayout.js';

class BookResultsPage extends React.Component {

	render() {
		return (
			<div> <BooksLayout setLoading={this.props.setLoading} bookSearchResults={this.props.bookSearchResults} getBooks={this.props.getBooks} isbns={this.props.isbns} getParsedImgUrl={this.props.getParsedImgUrl} getTitle={this.props.getTitle} addBookToDb={this.props.addBookToDb} email={this.props.email} authToken={this.props.authToken} changeBookName={this.props.changeBookName} getAuthor={this.props.getAuthor} isHomePage={this.props.isHomePage} getUsersBooksFromDb={this.props.getUsersBooksFromDb} /> </div>
		)
	}
}

export default BookResultsPage