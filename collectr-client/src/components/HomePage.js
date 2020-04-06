import React from 'react';
import ReactDOM from 'react-dom';
import MetisMenu from 'react-metismenu';
import SidePane from './SidePane.js';
import HomeNavBar from './HomeNavBar.js';
import axios from 'axios';
import qs from 'qs';
import Loading from './Loading.js';

class HomePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			bookSearch: "",
			bookSearchResults: [],
			bookSearchFound: false,
			isLoading: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.alertBookName = this.alertBookName.bind(this);
		this.getBooksFromIsbn = this.getBooksFromIsbn.bind(this);
		axios.defaults.withCredentials = true;
	}

	changeBookName = (e) => {

		var bookName = e.target.value;
		bookName = bookName.split(' ').join('+');
		this.setState({bookSearch: bookName})
	}

	alertBookName(){
		alert(this.state.bookSearch);
	}

	async getBooksFromIsbn(isbns){

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

				})
				.catch(error => {
					console.log(error.response);
				});
	}

	async handleSearch(){

		var bookResults = [];

		var url = 'http://localhost:9000/api/getOpenLibrarySearch';

		this.setState({
			isLoading: true
		},
			function(){console.log("setState completed", this.state)}
		);

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
			//var results = res.data.docs.isbn.map(function(x)  { return x});
			//alert(JSON.stringify(res.data));
		})
		.catch(error => {
			console.log(error.response);
		});

		await this.getBooksFromIsbn(bookResults);

		this.setState({
			isLoading: false
		},
			function(){console.log("setState completed", this.state)}
		);
	}

	render(){

		if(this.state.isLoading == false){
			return(
				<div>
					<HomeNavBar authToken = {this.props.authToken} email = {this.props.email} />
					<SidePane changeBookName = {this.changeBookName} handleSearch = {this.handleSearch} />
				</div>
			)			
		}
		else
		{
			return <Loading />;
		}

	}
	//ReactDOM.render(<MetisMenu />, document.getElementById('dom_id'));
}

export default HomePage;