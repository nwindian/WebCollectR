import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Link, withRouter } from 'react-router-dom'
class Register extends React.Component{

    render() {

        return (
            <div>
                <div class = "topnav">
                    <Link to="/">
                      <button class="HomeButton" id="b" href="#home">CollectR</button>
                    </Link>
                    <Link to="/Register">
                      <button id="a">SignUp</button>
                    </Link>
                    <Link to="/Login">
                      <button id="a" href="#Login">Login</button>
                    </Link>
                </div>
                <div id="logo">Collect</div>

                <div>
                    <form id="loginform">
                        <label id="loginregistertext">Email</label>
                        <input type="text" id="logintextbox" />

                        <label id="loginregistertext">Password</label>
                        <input type="Password" id="logintextbox" />

                        <button id="button">SignUp </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register