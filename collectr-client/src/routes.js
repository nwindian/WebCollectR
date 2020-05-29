import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
import Login from './components/Login.js';
import Register from './components/Register.js';
import HomePage from './components/HomePage.js';
import BookResultsPage from './components/BookResultsPage.js';
import PrivateRoute from './privateRoutes.js';
import SidePane from './components/SidePane.js';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default function Routes(props) {

  return (
    <>
      <PrivateRoute authToken={props.authToken} path='/authenticated'>
        <SidePane changeBookName={props.changeBookName} getBooks={props.getBooks} />
      </PrivateRoute>

      <Switch>
        <Route path='/Login'>
          <Login setPass={props.setPass} setEmail={props.setEmail} handleLogin={props.handleLogin} />
        </Route>

        <Route path='/Register'>
          <Register authToken={props.authToken} setPass={props.setPass} setEmail={props.setEmail} handleRegister={props.handleRegister} />
        </Route>

        <PrivateRoute authToken={props.authToken} path='/authenticated/HomePage'>
          <HomePage authToken={props.authToken} email={props.email} setBookSearchResults={props.setBookSearchResults} setLoading={props.setLoading} bookSearchResults={props.bookSearchResults} getBooks={props.getBooks} isbns={props.isbns} getParsedImgUrl={props.getParsedImgUrl} changeBookName={props.changeBookName} getUsersBooksFromDb={props.getUsersBooksFromDb} addBookToDb={props.addBookToDb} />
        </PrivateRoute>

        <PrivateRoute authToken={props.authToken} path='/authenticated/SearchResults'>
          <BookResultsPage email={props.email} authToken={props.authToken} setBookSearchResults={props.setBookSearchResults} bookSearchResults={props.bookSearchResults} getBooks={props.getBooks} isbns={props.isbns} getParsedImgUrl={props.getParsedImgUrl} changeBookName={props.changeBookName} getTitle={props.getTitle} addBookToDb={props.addBookToDb} getAuthor={props.getAuthor} isHomePage={false} getUsersBooksFromDb={props.getUsersBooksFromDb} />
        </PrivateRoute>

        <Route path='/'>
          <Login authToken={props.authToken} setPass={props.setPass} setEmail={props.setEmail} handleLogin={props.handleLogin} />
        </Route>

      </Switch>
    </>
  );
}