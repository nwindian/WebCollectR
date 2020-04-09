import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';
import Routes from '../routes.js';
import axios from 'axios';
import qs from 'qs';
import HomePage from './HomePage.js';
import {Redirect} from 'react-router-dom';
import Loading from './Loading.js'
import BooksLayout from './BooksLayout.js';
import BookResultsPage from './BookResultsPage.js'

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { apiResponse: "",
		  email: "",
		  password: "",
		  authToken: false,
		  isGettingRequest: false,
		  bookSearchResults: [],
		  isbns: [],
		  bookSearch: ""
		};
		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.setBookSearchResults = this.setBookSearchResults.bind(this);
		this.setLoading = this.setLoading.bind(this);
		this.getBooks = this.getBooks.bind(this);
		this.getBooksFromIsbn = this.getBooksFromIsbn.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.getParsedImgUrl = this.getParsedImgUrl.bind(this);
		this.changeBookName = this.changeBookName.bind(this);
		axios.defaults.withCredentials = true;
	}

	changeBookName = (e) => {

		var bookName = e.target.value;
		bookName = bookName.split(' ').join('+');
		this.setState({bookSearch: bookName})
	}


	async handleLogin(){


		if(this.state.email == "" || this.state.password == "") {
			this.setState({
				authToken: false
			},
			function(){console.log("setState completed", this.state)}
			)
			alert("Please complete form.");
		}
		else{
			
			const{email, password} = this.state;

			const user = {
				email,
				password,
			};

			var userId = 0;

			this.setState({
				isGettingRequest: true
			},
				function(){console.log("setState completed", this.state)}
			)

			await axios
				.post('http://localhost:9000/api/getUserLogin', user)
				.then(function (response){
					console.log(response);
					userId = response.data.userId;

				})
				.catch(err => {
					console.log(err.response);
				});
			if(userId != 0){
				this.state.validUser = true;
			}


			if(this.state.validUser){
				window.localStorage.setItem('auth', true);
				this.state.authToken = true;

			}
			else{

				window.localStorage.setItem('auth', false);
				this.state.authToken = false;
				alert("User not found");
				
			}

			this.setState({
				isGettingRequest: false
			},
				function(){console.log("setState completed", this.state)}
			)

		}
	}

	//Call api to insert into db
	handleRegister = () => {

		if(this.state.email != "" && this.state.password != ""){

			const { email, password} = this.state;

			const user = {
				email,
				password,
			};

			axios.defaults.withCredentials = true;
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			axios
				.post('http://localhost:9000/api/registerUser', user)
				.then(function (response){
					console.log(response);
				})
				.catch(err => {
					console.log(err.response);
				});
		}
		else
		{
			alert("Please complete form.");
		}
	}

	//set email state
	setEmail = (e) => {
		e.preventDefault();
		this.setState({
			email: e.target.value
		})
	}

	setBookSearchResults = (e) => {
		//e.preventDefault();
			this.setState({
				bookSearchResults: e
			},
				function(){console.log("setState completed", this.state)}
			)
	}

	//set Password state
	setPass = (e) => {
		e.preventDefault();
		this.setState({
			password: e.target.value
		})
	}

	setLoading = (e) => {
		this.setState({
			isGettingRequest: e
		})
	}

	callAPI(){
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res}));
	}

	componentDidMount() {
		//this.callAPI();
		//this.handleRegister();
		//this.handleLogin();
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

			return books;
	}


	async getBooks(){


		this.setLoading(true);

		var bookResults = await this.handleSearch();
		var books = await this.getBooksFromIsbn(bookResults);

		var copy = []
		for(var i = 0; i < bookResults.length; i++){
			copy.push('ISBN:' + bookResults[i]);
		}

		console.log(bookResults)
		this.setState({
			isbns: copy,
			bookSearchResults: books,
			isGettingRequest: false
		})

		// this.state.isbns = copy;
		// this.state.bookSearchResults = books;
		// this.state.isGettingRequest = true;



		//this.setLoading(false);

		//alert("isbns: " + this.state.isbns);


		//this.setBookSearchResults(books);

	}

	getParsedImgUrl(index){

		var book1 = this.state.bookSearchResults[index];
		var isbn1 = this.state.isbns[index];

		var book2 = this.state.bookSearchResults[index+1];
		var isbn2 = this.state.isbns[index+1];

		var book3 = this.state.bookSearchResults[index+2];
		var isbn3 = this.state.isbns[index+2];

		//console.log("isbn: " + isbn1);
		//console.log( "book " + JSON.parse(book1)[isbn1].bib_key);

		var parsed = [];

		if(JSON.parse(book1)[isbn1].hasOwnProperty('thumbnail_url')){
			parsed.push(JSON.parse(book1)[isbn1].thumbnail_url)
		}
		else{
			parsed.push('0');
		}

		if(JSON.parse(book2)[isbn2].hasOwnProperty('thumbnail_url')){
			parsed.push(JSON.parse(book2)[isbn2].thumbnail_url)
		}
		else{
			parsed.push('0');
		}

		if(JSON.parse(book2)[isbn2].hasOwnProperty('thumbnail_url')){
			parsed.push(JSON.parse(book1)[isbn1].thumbnail_url)
		}
		else{
			parsed.push('0');
		}

		//var parsed = [JSON.parse(book1)[isbn1].thumbnail_url, JSON.parse(book2)[book2].thumbnail_url, JSON.parse(book3)[book3].thumbnail_url]
		return parsed;
	}

	async getBookImages(url){

		this.setLoading(true);

		var url = 'http://localhost:9000/api/getBookImage';
		var img;
		await axios
		.get(url,
		{
			params: {
				imgUrl: url
			}
		})
		.then(res =>
		{
			//this.setState({bookSearchResults: res.data});

			img = res.data;
		})
		.catch(error => {
			console.log(error.response);
		});

		this.setLoading(false);
		return img;
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

    render() {
        return (
            <div className="HomeNavBar">
                <GettingData  password = {this.state.password} email = {this.state.email} setPass = {this.setPass} setEmail = {this.setEmail} handleRegister = {this.handleRegister} handleLogin = {this.handleLogin} authToken = {this.state.authToken} isGettingRequest = {this.state.isGettingRequest}
                 setBookSearchResults = {this.setBookSearchResults} setLoading = {this.setLoading} bookSearchResults = {this.state.bookSearchResults} getBooks = {this.getBooks} isbns = {this.state.isbns} getParsedImgUrl = {this.getParsedImgUrl} changeBookName = {this.changeBookName}/>
                <p className="App-intro">{this.state.apiResponse}</p>     
            </div>   
        );
    }
}

function GettingData(props) {
	const isGettingData = props.isGettingRequest;
	if(!isGettingData){
		//alert(isGettingData)
		//alert(isGettingData)
		//return <Loading/>
		//return <BookResultsPage />
		//return <BooksLayout />
		//return <HomePage authToken = {true} getBooks = {props.getBooks} changeBookName = {props.changeBookName} setLoading = {props.setLoading} bookSearchResults = {props.bookSearchResults} getParsedImgUrl = {props.getParsedImgUrl} />;
		return <Routes  password = {props.password} email = {props.email} setPass = {props.setPass} setEmail = {props.setEmail} handleRegister = {props.handleRegister} handleLogin = {props.handleLogin} authToken = {props.authToken}
		setBookSearchResults = {props.setBookSearchResults} setLoading = {props.setLoading} bookSearchResults = {props.bookSearchResults} getBooks = {props.getBooks} isbns = {props.isbns} getParsedImgUrl = {props.getParsedImgUrl} changeBookName = {props.changeBookName}/>
	}
	return (
		<Loading />
	);
	
}
export default App