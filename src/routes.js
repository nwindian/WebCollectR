import React from 'react';
import { Switch, Route, Router } from 'react-router';

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
 const routes = () => {
 	return (
 		<Switch>
 		  <Route exact path='/Login' component={Login}></Route>
 		  <Route exact path='/Register' component={Register}></Route>
          <Route exact path='/' component={Login}></Route>
 		</Switch>
    );
}

export default routes;