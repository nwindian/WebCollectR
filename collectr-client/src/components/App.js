import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';
import Routes from '../routes.js';

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
	}

	//Call api to insert into db
	handleRegister() {
		alert(this.state.email);
	}

	//set email state
	setEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	//set Password state
	setPass = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	callAPI(){
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res}));
	}

	componentWillMount() {
		this.callAPI();
	}

    render() {
        return (
            <div className="HomeNavBar">
                <Routes  setPass = {this.setPass} setEmail = {this.setEmail} handleRegister = {this.handleRegister}/>
                <p className="App-intro">{this.state.apiResponse}</p>      
            </div>   
        );
    }
}

export default App