import React from 'react';
import ReactDOM from 'react-dom';
import SidePane from './SidePane.js';
import HomeNavBar from './HomeNavBar.js';
import BooksLayout from './BooksLayout.js';

class BookResultsPage extends React.Component {

	render(){
		return(
			<div> <BooksLayout bookSearchResults ={this.props.bookSearchResults}/> </div>
		)
	}
	//ReactDOM.render(<MetisMenu />, document.getElementById('dom_id'));
}

export default BookResultsPage