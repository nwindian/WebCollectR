import React from 'react';
import ReactDOM from 'react-dom';
import SidePane from './SidePane.js';
import HomeNavBar from './HomeNavBar.js';
import axios from 'axios';
import qs from 'qs';
import Loading from './Loading.js';

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
		this.handleSearch = this.handleSearch.bind(this);
		//this.alertBookName = this.alertBookName.bind(this);
		this.getBooksFromIsbn = this.getBooksFromIsbn.bind(this);
		this.getBooks = this.getBooks.bind(this);
		axios.defaults.withCredentials = true;
	}

	changeBookName = (e) => {

		var bookName = e.target.value;
		bookName = bookName.split(' ').join('+');
		this.setState({bookSearch: bookName})
	}

	async getBooksFromIsbn(isbns){

		var books = [];

		await axios
			.get('http://localhost:9000/api/getBooksFromIsbn',
			{
				params: {
					books: JSON.stringify(isbns)
				}
			})
			.then(res =>
			{
				console.log(res.data);
				books = res.data;
				//return res.data;

			})
			.catch(error => {
				console.log(error.response);
			});

			//alert("BOOKS: " + books);
			return books;
	}


	async getBooks(){


		this.props.setLoading(true);

		var bookResults = await this.handleSearch();
		var books = await this.getBooksFromIsbn(bookResults);

		this.props.setLoading(false);
		// alert("getBooks: " + books);
		this.props.setBookSearchResults(books);
	}


	async handleSearch(){

		var bookResults = [];

		var url = 'http://localhost:9000/api/getOpenLibrarySearch';

		await axios
		.get(url,
		{
			params: {
				bookSearch: this.state.bookSearch
			}
		})
		.then(res =>
		{
			//this.setState({bookSearchResults: res.data});

			for(var i=0; i < res.data.docs[i].isbn.length; i++){
				bookResults = bookResults.concat(res.data.docs[i].isbn);
			}
			console.log(bookResults);
		})
		.catch(error => {
			console.log(error.response);
		});

		return bookResults;
	}

	render(){

		if(this.state.isLoading == false){
			return(
				<div>
					<HomeNavBar authToken = {this.props.authToken} email = {this.props.email} />
					<SidePane changeBookName = {this.changeBookName} getBooks = {this.getBooks} />
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