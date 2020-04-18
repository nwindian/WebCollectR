import React from 'react';
import ReactDOM from 'react-dom';
import SidePane from './SidePane.js';
import HomeNavBar from './HomeNavBar.js';
import axios from 'axios';
import qs from 'qs';
import Loading from './Loading.js';
import BookResultsPage from './BookResultsPage.js';

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
		//this.handleSearch = this.handleSearch.bind(this);
		//this.alertBookName = this.alertBookName.bind(this);
		//this.getBooksFromIsbn = this.getBooksFromIsbn.bind(this);
		//this.getBooks = this.getBooks.bind(this);
		axios.defaults.withCredentials = true;
	}



	render(){

		if(this.state.isLoading == false){
			return(
				<div>
					<HomeNavBar authToken = {this.props.authToken} email = {this.props.email} />
					<SidePane changeBookName = {this.props.changeBookName} getBooks = {this.props.getBooks} />
					<BookResultsPage bookSearchResults ={this.props.bookSearchResults} getBooks = {this.props.getBooks} isbns = {this.props.isbns} getParsedImgUrl = {this.props.getParsedImgUrl} getTitle = {this.props.getTitle} addBookToDb = {this.props.addBookToDb} email = {this.props.email} authToken = {this.props.authToken} changeBookName = {this.props.changeBookName} getAuthor = {this.props.getAuthor} isHomePage = {true} getUsersBooksFromDb = {this.props.getUsersBooksFromDb} /> 
				</div>
			)			
		}
		else
		{
			return <Loading />;
		}

	}
}

export default HomePage;