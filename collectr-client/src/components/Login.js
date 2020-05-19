import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    render() {

        return (
            <div>
                <div className="topnav">
                    <Link to="/">
                        <button className="HomeButton" id="b" href="#home"></button>
                    </Link>
                    <Link to="/Register">
                        <button id="a">SignUp</button>
                    </Link>
                    <Link to="/Login">
                        <button id="a" href="#Login">Login</button>
                    </Link>
                </div>
                <img src={require("../darkLogo.PNG")} alt="CollectR logo" id="logo"></img>

                <div>
                    <form id="loginform" className="logintextbox">
                        <label id="loginregistertext">Email</label>
                        <input type="text" id="emailtextbox" onChange={e => this.props.setEmail(e)} />

                        <label id="loginregistertext">Password</label>
                        <input type="Password" id="passwordtextbox" onChange={e => this.props.setPass(e)} />
                        <Link to="/HomePage">
                            <button type="button" id="button" onClick={() => this.props.handleLogin()}>Login</button>
                        </Link>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login