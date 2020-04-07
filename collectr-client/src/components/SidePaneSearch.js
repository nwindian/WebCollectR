import React from 'react';
import ReactDOM from 'react-dom';
import SidePane from './SidePane.js';
import HomeNavBar from './HomeNavBar.js';
import '../SidePaneSearch.css';
import { Link, withRouter, Router } from 'react-router-dom'

class SidePaneSearch extends React.Component {

	render(){
		return(
			<div id="cover">
			  <form method="get" action="">
			    <div className="tb">
			      <div className="td"><input id="searchInput" onChange={this.props.changeBookName} type="text" placeholder="Find a book.." required /></div>
			      <div className="td" id="s-cover">
			      	<Link to="/SearchResults">
				        <button id="searchButton" type="button" onClick={() => this.props.getBooks()}>
				          <div id="s-circle"></div>
				          <span></span>
				        </button>
			        </Link>
			      </div>
			    </div>
			  </form>
			</div>
		)
	}
	//ReactDOM.render(<MetisMenu />, document.getElementById('dom_id'));
}

export default SidePaneSearch;