import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

class HomeNavBar extends React.Component{

    render() {
    	if(this.props.authToken)
    	{
    		return (
    			<div className = "topnav">
                	<button className="HomeButton" id="b" href="#home">CollectR</button>
                	<button id="a" href="#SignUp">{this.props.email}</button>
            	</div>
    		)
    	}
    	else{
	        return (
	            <div className = "topnav">
	                <button className="HomeButton" id="b" href="#home">Collectr</button>
	                <button id="a" href="#SignUp">SignUp</button>
	                <button id="a" href="#Login">Login</button>
	            </div>
	        );   		
    	}

    }
}

export default HomeNavBar