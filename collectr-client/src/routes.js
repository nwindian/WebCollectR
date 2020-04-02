import React from 'react';
import { Switch, Route, Router, withRouter } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './components/App';
import Login from './components/Login.js';
import Register from './components/Register.js';
import HomePage from './components/HomePage.js';
import PrivateRoute from './privateRoutes.js';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
 export default function Routes(props) {

  function _renderLoader() {
    alert(props.isGettingRequest);
  }

 	return (
        <div>
 		<Switch>
 		  <Route path='/Login'>
        <Login setPass = {props.setPass} setEmail = {props.setEmail} handleLogin = {props.handleLogin} />
      </Route>

 		  <Route path='/Register'>
        <Register setPass = {props.setPass} setEmail = {props.setEmail} handleRegister = {props.handleRegister} />
      </Route>

      <PrivateRoute authToken={props.authToken} path='/HomePage'>
        <HomePage authToken={props.authToken}/>
      </PrivateRoute>


      <Route path='/'> 
        <Login setPass = {props.setPass} setEmail = {props.setEmail} handleLogin = {props.handleLogin}  />
      </Route> 

 		</Switch>
        </div>
    );
}