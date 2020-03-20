import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
class Register extends React.Component{

    render() {

        return (
            <div>
                <div class = "topnav">
                    <button class="HomeButton" id="b" href="#home">CollectR</button>
                    <button id="a" href="#SignUp">SignUp</button>
                    <button id="a" href="#Login">Login</button>
                </div>
                <div id="logo">CollectR</div>

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