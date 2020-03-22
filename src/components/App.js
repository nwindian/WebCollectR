import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavBar from './HomeNavBar.js'
import Login from './Login.js'
import Register from './Register.js'
import '../index.css';
import Routes from '../routes.js';

class App extends React.Component {

    render() {
        return (
            <div className="HomeNavBar">
                <Routes />           
            </div>   
        );
    }
}

export default App