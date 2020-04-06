import React, {Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './components/App';
import Login from './components/Login.js';
import Register from './components/Register.js';
import HomePage from './components/HomePage.js';


// const PrivateRoute = (props) => (
//     alert(props.authToken),
//     <Fragment>
//         { props.authToken ? props.children : <Redirect to='/Login' /> }
//     </Fragment>
// )
const PrivateRoute = ({children, authToken, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authToken ? (
        children
        ) : (
        <Redirect
          to={{
            pathname: "/Login",
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

export default PrivateRoute;