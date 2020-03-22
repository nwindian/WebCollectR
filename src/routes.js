import React from 'react';
import { Switch, Route, Router, withRouter } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './components/App';
import Login from './components/Login.js';
import Register from './components/Register.js';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
 export default function Routes(props) {
 	return (
        <div>
 		<Switch>
 		  <Route path='/Login'>
            <Login />
          </Route>

 		  <Route path='/Register'>
            <Register />
          </Route>

          <Route path='/'> 
            <Login />
          </Route>  
 		</Switch>
        </div>
    );
}