import React from 'react';
import axios from 'axios';
import Loading from './Loading.js';
import BooksLayout from './BooksLayout.js';

class HomePage extends React.Component {

	_isLoading = false;
	constructor(props) {
		super(props);
		this.state = {
			bookSearch: "",
			bookSearchResults: [],
			bookSearchFound: false,
			isLoading: false
		};

		axios.defaults.withCredentials = true;
	}



	render() {

		if (this.state.isLoading === false) {
			return (
				<>
					<BooksLayout setLoading={this.props.setLoading} bookSearchResults={this.props.bookSearchResults} getBooks={this.props.getBooks} isbns={this.props.isbns} getParsedImgUrl={this.props.getParsedImgUrl} getTitle={this.props.getTitle} addBookToDb={this.props.addBookToDb} email={this.props.email} authToken={this.props.authToken} changeBookName={this.props.changeBookName} getAuthor={this.props.getAuthor} isHomePage={true} getUsersBooksFromDb={this.props.getUsersBooksFromDb} />
				</>
			)
		}
		else {
			return <Loading />;
		}

	}
}

export default HomePage;