import React from 'react';
import '../index.css';
import axios from 'axios';

axios.defaults.withCredentials = true;
class Register extends React.Component {

    render() {

        return (
            <>
                <img src={require("../darkLogo.PNG")} alt="CollectR logo" id="logo"></img>

                <div>
                    <form id="loginform" className="logintextbox">
                        <label id="loginregistertext">Email</label>
                        <input type="text" id="emailtextbox" onChange={e => this.props.setEmail(e)} />

                        <label id="loginregistertext">Password</label>
                        <input type="Password" id="passwordtextbox" onChange={e => this.props.setPass(e)} />

                        <button type="button" id="button" onClick={this.props.handleRegister}>SignUp </button>
                    </form>
                </div>
            </>
        )
    }
}

export default Register