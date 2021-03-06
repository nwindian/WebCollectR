import React from 'react';
import '../index.css';
import Routes from '../routes.js';
import axios from 'axios';
import Loading from './Loading.js';
import HomeNavBar from './HomeNavBar.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			apiResponse: "",
			email: "",
			userId: 0,
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
		this.getTitle = this.getTitle.bind(this);
		this.addBookToDb = this.addBookToDb.bind(this);
		this.getAuthor = this.getAuthor.bind(this);
		this.getUsersBooksFromDb = this.getUsersBooksFromDb.bind(this);
		axios.defaults.withCredentials = true;
	}

	changeBookName = (e) => {

		var bookName = e.target.value;
		bookName = bookName.split(' ').join('+');
		this.setState({ bookSearch: bookName })
	}


	async handleLogin() {


		if (this.state.email === "" || this.state.password === "") {
			this.setState({
				authToken: false
			},
				function () { console.log("setState completed", this.state) }
			)
			alert("Please complete form.");
		}
		else {

			const { email, password } = this.state;

			const user = {
				email,
				password,
			};

			var userId = 0;

			this.setState({
				isGettingRequest: true
			},
				function () { console.log("setState completed", this.state) }
			)

			await axios
				.post('http://localhost:9000/api/getUserLogin', user)
				.then(function (response) {
					//console.log(response);
					userId = response.data.userId;

				})
				.catch(err => {
					console.log(err.response);
				});
			if (userId !== 0) {
				this.state.validUser = true;
			}


			if (this.state.validUser) {
				window.localStorage.setItem('auth', true);
				this.state.authToken = true;

			}
			else {

				window.localStorage.setItem('auth', false);
				this.state.authToken = false;
				alert("User not found");

			}

			this.setState({
				userId: userId,
				isGettingRequest: false
			},
				function () { console.log("setState completed", this.state) }
			)

		}
	}

	//Call api to insert into db
	handleRegister = () => {

		if (this.state.email !== "" && this.state.password !== "") {

			const { email, password } = this.state;

			const user = {
				email,
				password,
			};

			axios.defaults.withCredentials = true;
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			axios
				.post('http://localhost:9000/api/registerUser', user)
				.then(function (response) {
					console.log(response);
				})
				.catch(err => {
					console.log(err.response);
				});
		}
		else {
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
			function () { console.log("setState completed", this.state) }
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

	callAPI() {
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		//this.callAPI();
		//this.handleRegister();
		//this.handleLogin();
	}

	async getBooksFromIsbn(isbns) {

		var books = [];

		await axios
			.get('http://localhost:9000/api/getBooksFromIsbn',
				{
					params: {
						books: JSON.stringify(isbns)
					}
				})
			.then(res => {
				//console.log(res.data);
				books = res.data;
				//return res.data;

			})
			.catch(error => {
				console.log(error.response);
			});

		return books;
	}


	async getBooks() {


		this.setLoading(true);

		var bookResults = await this.handleSearch();
		var books = await this.getBooksFromIsbn(bookResults);

		var copy = []
		for (var i = 0; i < bookResults.length; i++) {
			copy.push('ISBN:' + bookResults[i]);
		}

		//console.log(bookResults)
		this.setState({
			isbns: copy,
			bookSearchResults: books,
			isGettingRequest: false
		})


	}

	async getUsersBooksFromDb() {


		const userId = this.state.userId;
		const user = {
			userId,
		};

		var bookResults = [];
		await axios
			.post('http://localhost:9000/api/getUsersBooksFromDb', user)
			.then(function (response) {
				//console.log(response);
				//console.log("books: " + JSON.stringify(response));
				bookResults = response;
			})
			.catch(err => {
				console.log(err.response);
			});

		return bookResults;
	}
	getParsedImgUrl(index) {

		var temp = index;
		var book1 = this.state.bookSearchResults[temp];
		var isbn1 = this.state.isbns[temp];

		var parsed = [];

		if (JSON.parse(book1)[isbn1].hasOwnProperty('cover')) {
			parsed.push(JSON.parse(book1)[isbn1].cover.medium)
		}
		else {
			parsed.push('0');
		}

		//var parsed = [JSON.parse(book1)[isbn1].thumbnail_url, JSON.parse(book2)[book2].thumbnail_url, JSON.parse(book3)[book3].thumbnail_url]
		return parsed[0];
	}

	getTitle(index) {

		var temp = index;
		var book1 = this.state.bookSearchResults[temp];
		var isbn1 = this.state.isbns[temp];

		var title = "";

		if (JSON.parse(book1)[isbn1].hasOwnProperty('title')) {
			title = JSON.parse(book1)[isbn1].title;
		}
		else {
			title = "Not Available";
		}

		return title;
	}

	getAuthor(index) {

		var temp = index;
		var book1 = this.state.bookSearchResults[temp];
		var isbn1 = this.state.isbns[temp];

		var name = "";

		if (JSON.parse(book1)[isbn1].hasOwnProperty('authors')) {
			//console.log("Yes: " + JSON.parse(book1)[isbn1].authors.name )
			name = JSON.parse(book1)[isbn1].authors[0].name;
		}
		else {
			name = "Not Available";
		}

		return name;
	}

	async getBookImages() {

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
			.then(res => {
				//this.setState({bookSearchResults: res.data});

				img = res.data;
			})
			.catch(error => {
				console.log(error.response);
			});

		this.setLoading(false);
		return img;
	}


	async handleSearch() {

		var bookResults = [];

		var url = 'http://localhost:9000/api/getOpenLibrarySearch';

		await axios
			.get(url,
				{
					params: {
						bookSearch: this.state.bookSearch
					}
				})
			.then(res => {
				//this.setState({bookSearchResults: res.data});

				for (var i = 0; i < res.data.docs[i].isbn.length; i++) {
					bookResults = bookResults.concat(res.data.docs[i].isbn);
				}
				//console.log(bookResults);
			})
			.catch(error => {
				console.log(error.response);
			});

		return bookResults;
	}

	//Call api to insert into db
	addBookToDb = (item) => {

		//If checked already, they're deleting it so delete from db. Otherwise add it
		if (item.checked === true) {
			item.checked = false;

			const userId = this.state.userId;
			const title = item.title;
			const isbn = item.isbn;
			const img = item.img;
			const author = item.author;

			const book = {
				userId,
				title,
				isbn,
				img,
				author
			};

			axios.defaults.withCredentials = true;
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			axios
				.post('http://localhost:9000/api/deleteBookFromDb', book)
				.then(function (response) {
					console.log(response);
				})
				.catch(err => {
					console.log(err.response);
				});
		}
		else {

			item.checked = true;

			const userId = this.state.userId;
			const title = item.title;
			const isbn = item.isbn;
			const img = item.img;
			const author = item.author;

			const book = {
				userId,
				title,
				isbn,
				img,
				author
			};

			axios.defaults.withCredentials = true;
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			axios
				.post('http://localhost:9000/api/postBookToDb', book)
				.then(function (response) {
					console.log(response);
				})
				.catch(err => {
					console.log(err.response);
				});
		}

	}

	render() {
		return (
			<>
				<HomeNavBar email={this.state.email} authToken={this.state.authToken} />

				<div className="HomeNavBar">
					<GettingData password={this.state.password} email={this.state.email} setPass={this.setPass} setEmail={this.setEmail} handleRegister={this.handleRegister} handleLogin={this.handleLogin} authToken={this.state.authToken} isGettingRequest={this.state.isGettingRequest}
						setBookSearchResults={this.setBookSearchResults} setLoading={this.setLoading} bookSearchResults={this.state.bookSearchResults} getBooks={this.getBooks} isbns={this.state.isbns} getParsedImgUrl={this.getParsedImgUrl} changeBookName={this.changeBookName} getTitle={this.getTitle} addBookToDb={this.addBookToDb} getAuthor={this.getAuthor} getUsersBooksFromDb={this.getUsersBooksFromDb} />
					<p className="App-intro">{this.state.apiResponse}</p>
				</div>
			</>
		);
	}
}

function GettingData(props) {
	const isGettingData = props.isGettingRequest;
	if (!isGettingData) {
		//alert(isGettingData)
		//alert(isGettingData)
		//return <Loading/>
		//return <BookResultsPage />
		//return <BooksLayout />
		//return <HomePage authToken = {true} getBooks = {props.getBooks} changeBookName = {props.changeBookName} setLoading = {props.setLoading} bookSearchResults = {props.bookSearchResults} getParsedImgUrl = {props.getParsedImgUrl} />;
		return <Routes password={props.password} email={props.email} setPass={props.setPass} setEmail={props.setEmail} handleRegister={props.handleRegister} handleLogin={props.handleLogin} authToken={props.authToken}
			setBookSearchResults={props.setBookSearchResults} setLoading={props.setLoading} bookSearchResults={props.bookSearchResults} getBooks={props.getBooks} isbns={props.isbns} getParsedImgUrl={props.getParsedImgUrl}
			changeBookName={props.changeBookName} getTitle={props.getTitle} addBookToDb={props.addBookToDb} getAuthor={props.getAuthor} getUsersBooksFromDb={props.getUsersBooksFromDb} />
	}
	return (
		<Loading />
	);

}
export default App