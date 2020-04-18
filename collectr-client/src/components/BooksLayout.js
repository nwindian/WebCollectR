import React from 'react';
import ReactDOM from 'react-dom';
import GridLayout from 'react-grid-layout';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import fs from 'fs'

import RGL, { WidthProvider } from "react-grid-layout";

import '../GridLayout.css'
import HomeNavBar from './HomeNavBar.js';
import SidePane from './SidePane.js'

const ReactGridLayout = WidthProvider(RGL);

class Fill extends React.Component{

	handleJsonBooks(){

		// alert("fill : " +JSON.stringify(this.props.bookSearchResults));
		// fs.appendFile('mynewfile1.txt', this.props.bookSearchResults, function (err) {
		//   if (err) throw err;
		//   console.log('Saved!');
		// });
	}

    render() {

	return (
      <div> {Object.keys(this.props.bookSearchResults).length} </div>
    )

    }
}

class BooksLayout extends React.Component{


	async getBooksFromDb(){

		var bookResults = [];
		await this.props.getUsersBooksFromDb().then(result => {
			console.log("result: " + result);
			bookResults = result;
		});

		return bookResults;
	}

    render() {
    	var layouts = [];
		var y = 2;
		var x = 2;

	    if(this.props.isHomePage == true){

	    	var usersBooks = this.getBooksFromDb();
	    	console.log("books: " + usersBooks);

			//alert("Before: " + (typeof this.props.bookSearchResults[0]));
			for(var i = 0; i <(Object.keys(usersBooks).length); i+=1 ){
				var idOne = Math.random().toString(36).slice(2);
				var idTwo = Math.random().toString(36).slice(2);
				var idThree = Math.random().toString(36).slice(2);

				if((i % 3 == 0) && i != 0){
					y += 9;
					x = 2;
				}

				//parse up the chain	
				layouts.push( {i: idOne, x: x, y: y, w:2.1, h: 8, static:true, img: usersBooks[i].img_url, isbn: usersBooks[i].isbn, title: usersBooks[i].title, author: usersBooks[i].author, checked: true});
				x+=3;
			}
	    }
	    else{

			//alert("Before: " + (typeof this.props.bookSearchResults[0]));
			for(var i = 0; i <(Object.keys(this.props.bookSearchResults).length); i+=1 ){
				var idOne = Math.random().toString(36).slice(2);
				var idTwo = Math.random().toString(36).slice(2);
				var idThree = Math.random().toString(36).slice(2);

				if((i % 3 == 0) && i != 0){
					y += 9;
					x = 2;
				}

				var imgArray = this.props.getParsedImgUrl(i);
				var book = this.props.getTitle(i);
				var author = this.props.getAuthor(i);
				if(imgArray != "0"){
					var str = imgArray;
					var res = str.replace("-S","-M");
					imgArray = res;
				}

				console.log(imgArray);
				//parse up the chain	
				layouts.push( {i: idOne, x: x, y: y, w:2.1, h: 8, static:true, img: imgArray, isbn: this.props.isbns[i], title: book, author: author, checked: false});
				x+=3;
			}

	    }

		const layoutsArray = Array.from(layouts);
		
		return (

		<div>
		  <HomeNavBar authToken = {this.props.authToken} email = {this.props.email} />
		  <SidePane getBooks = {this.props.getBooks} changeBookName = {this.props.changeBookName}/>
	      <GridLayout className="layout" layout={layouts} cols={12} rowHeight={30} width={1200}>

	      	{ 
	      		layoutsArray.map((item,index) => (
	      			   <div key={item.i} > <img id="bookImage" src={item.img} onError={(e)=>{e.target.onerror = null; e.target.src="../NoImage.png"}} />
	      			   		<div id="title"> Title: {item.title} </div>
	      			   		<div id="title"> Author: {item.author} </div>
	      			   		<div id = "title"> {item.isbn} </div>
	      			   		<div class="center">
							  <label class="label">
							    <input  class="label__checkbox" type="checkbox" onChange={() => this.props.addBookToDb(item)} />
							    <span class="label__text">
							      <span class="label__check">
							        <i class="fa fa-check icon"></i>
							      </span>
							    </span>
							  </label>
							</div>

	      			    </div>
	      			))
	      	}

	      		
	      	

	      </GridLayout>
	     </div>
	    )

    }
}

export default BooksLayout