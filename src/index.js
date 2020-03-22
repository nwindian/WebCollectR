import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js'
import { BrowserRouter, Router } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ),
    document.getElementById('root')
);