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
class Entry extends React.Component {

    render() {
        return (
            <div className="HomeTaskBar">
                <HomeTaskBar />
            </div>   
        );
    }
}

ReactDOM.render(
    <Entry />,
    document.getElementById('root')
);