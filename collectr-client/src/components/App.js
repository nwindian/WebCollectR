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
		this.state = { apiResponse: "" };
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
                //<Routes />
                <p className="App-intro">{this.state.apiResponse}</p>      
            </div>   
        );
    }
}

export default App