import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Link} from 'react-router-dom'

class HomeNavBar extends React.Component{

    render() {
    	if(this.props.authToken)
    	{
    		return (
    			<div className = "topnav">
                    <Link to="/HomePage">
                	   <button className="HomeButton" id="b" href="#home"></button>
                    </Link>
                	<button id="a" href="#SignUp">{this.props.email}</button>
                    <Link to="/HomePage">
                        <button id="a">Home</button>
                    </Link>
            	</div>
    		)
    	}
    	else{
	        return (
	            <div className = "topnav">
	                <button className="HomeButton" id="b" href="#home"></button>
	                <button id="a" href="#SignUp">SignUp</button>
	                <button id="a" href="#Login">Login</button>
	            </div>
	        );   		
    	}

    }
}

export default HomeNavBar