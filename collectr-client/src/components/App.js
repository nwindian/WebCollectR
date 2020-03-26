import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';
import Routes from '../routes.js';
import axios from 'axios';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { apiResponse: "",
		  email: "",
		  password: "" 
		};
		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		axios.defaults.withCredentials = true;
	}

	//Call api to insert into db
	handleRegister = e => {

		//preventDefault();
		//alert(this.state.email);
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
				return response.json();
			})
			.catch(err => {
				console.log(err.response);
				console.log(err.request.headers);
			});

		//fetch("http://localhost:9000/registerUser")
		//.then(response => response.json())
		//.then(data => this.setState{})
	}

	//set email state
	setEmail = (e) => {
		e.preventDefault();
		this.setState({
			email: e.target.value
		})
	}

	//set Password state
	setPass = (e) => {
		e.preventDefault();
		this.setState({
			password: e.target.value
		})
	}

	callAPI(){
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res}));
	}

	componentDidMount() {
		this.callAPI();
		this.handleRegister();
	}

    render() {
        return (
            <div className="HomeNavBar">
                <Routes  setPass = {this.setPass} setEmail = {this.setEmail} handleRegister = {this.handleRegister()}/>
                <p className="App-intro">{this.state.apiResponse}</p>      
            </div>   
        );
    }
}

export default App