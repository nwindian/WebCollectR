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

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { apiResponse: "",
		  email: "",
		  password: "",
		  authToken: false,
		  isGettingRequest: false
		};
		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		axios.defaults.withCredentials = true;
	}


	async handleLogin(){

		//alert("HIII");
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
					//alert(userId);
				})
				.catch(err => {
					console.log(err.response);
				});
			if(userId != 0){
				this.state.validUser = true;
			}
			//alert(this.state.validUser);
			//alert(userId);

			if(this.state.validUser){
				window.localStorage.setItem('auth', true);
				this.state.authToken = true;
				//alert("valid");
				//return <Redirect to="/HomePage/"/>;
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
			//alert(user.email);

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
		//this.callAPI();
		//this.handleRegister();
		//this.handleLogin();
	}

    render() {
        return (
            <div className="HomeNavBar">
                <GettingData  password = {this.state.password} email = {this.state.email} setPass = {this.setPass} setEmail = {this.setEmail} handleRegister = {this.handleRegister} handleLogin = {this.handleLogin} authToken = {this.state.authToken} isGettingRequest = {this.state.isGettingRequest}/>
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
		//return <HomePage/>
		return <Routes  password = {props.password} email = {props.email} setPass = {props.setPass} setEmail = {props.setEmail} handleRegister = {props.handleRegister} handleLogin = {props.handleLogin} authToken = {props.authToken}/>
	}
	return (
		<p>Loading......</p>
	);
	
}
export default App