import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Link, withRouter, Router } from 'react-router-dom'

class Login extends React.Component{

    render() {

        return (
            <div>
                <div className = "topnav">
                    <Link to="/">
                      <button className="HomeButton" id="b" href="#home">CollectR</button>
                    </Link>
                    <Link to="/Register">
                      <button id="a">SignUp</button>
                    </Link>
                    <Link to="/Login">
                      <button id="a" href="#Login">Login</button>
                    </Link>
                </div>
                <div id="logo">CollectR</div>

                <div>
                    <form id="loginform">
                        <label id="loginregistertext">Email</label>
                        <input type="text" id="logintextbox" />

                        <label id="loginregistertext">Password</label>
                        <input type="Password" id="logintextbox" />

                        <button id="button">Login </button>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login