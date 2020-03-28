import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';
import Routes from '../routes.js';
import axios from 'axios';
import qs from 'qs';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { apiResponse: "",
		  email: "",
		  password: "",
		  loginPressed: false
		};
		this.setEmail = this.setEmail.bind(this);
		this.setPass = this.setPass.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		axios.defaults.withCredentials = true;
	}


	handleLogin = () => {

		alert(this.state.email);
		if(this.state.email != "" && this.state.password != ""){
			this.state.loginPressed = true;
		}
		//alert("HIII");
		if((this.state.email == "" || this.state.password == "") && this.state.loginPressed == true) {
			alert("Please complete form.");
		}
		else if (this.state.email != "" && this.state.password != "" && this.state.loginPressed == true){
			alert("login boy");
		}
	}

	//Call api to insert into db
	handleRegister = (e) => {

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
                <Routes  password = {this.state.password} email = {this.state.email} setPass = {this.setPass} setEmail = {this.setEmail} handleRegister = {this.handleRegister} handleLogin = {this.handleLogin}/>
                <p className="App-intro">{this.state.apiResponse}</p>      
            </div>   
        );
    }
}

export default App