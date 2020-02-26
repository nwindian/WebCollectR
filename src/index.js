import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class HomeTaskBar extends React.Component{

    render() {
        return (
            <div class = "topnav">
                <b>CollectR</b>
                <a href="#SignUp">SignUp</a>
                <a href="#Login">Login</a>
            </div>
        );
    }
}

class Login extends React.Component{

    render() {

        return (
            <div>
            <div id="logo">CollectR</div>

            <div>
                <form id="loginform">
                    <label id="loginregistertext">Email</label>
                    <input type="text" id="logintextbox" />

                    <label id="loginregistertext">Password</label>
                    <input type="text" id="logintextbox" />
                </form>
            </div>
            </div>
        )
    }
}
class Entry extends React.Component {

    render() {
        return (
            <div className="HomeTaskBar">
                <HomeTaskBar />
                <Login />
            </div>   
        );
    }
}

ReactDOM.render(
    <Entry />,
    document.getElementById('root')
);