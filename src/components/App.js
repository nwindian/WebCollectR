import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        //TODO: Maybe add constructor for starte to set isloggedin, username, pass and such.
        login : true,
        //let loginOrRegister,
        }
    }

    render() {
        return (
            <div className="HomeNavBar">
                <HomeNavBar />
            </div>   
        );
    }
}

export default App