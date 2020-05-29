import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom'

class HomeNavBar extends React.Component {

	render() {
		if (this.props.authToken) {
			return (
				<div className="topnav">
					<Link to="HomePage">
						<button className="HomeButton" id="b" href="#home"></button>
					</Link>
					<button id="a" href="#email">{this.props.email}</button>
					<Link to="HomePage">
						<button id="a">Home</button>
					</Link>
				</div>
			)
		}
		else {
			return (
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
			);
		}

	}
}

export default HomeNavBar