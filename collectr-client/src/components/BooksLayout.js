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

	
	createSquares(){
		// var layout = [];
		// var y = 2;
		// for(var i = 0; i <(Object.keys(this.props.bookSearchResults).length); i+=3 ){
		// 	var idOne = Math.random().toString(36).slice(2);
		// 	var idTwo = Math.random().toString(36).slice(2);
		// 	var idThree = Math.random().toString(36).slice(2);

		// 	if((i % 3 == 0) && i != 0){
		// 		y += 9;
		// 	}

			
		// 	layout += {i: idOne, x: 3, y: y, w:1.7, h: 8, static:true};
		// 	layout += {i: idTwo, x: 5, y: y, w:1.7, h: 8, static:true};
		// 	layout += {i: idThree, x: 7, y: y, w:1.7, h: 8, static:true};
		// }
	}
    render() {
	    // const layout = [
	    //   {i: 'a', x: 3, y: 2, w: 1.7, h: 8, static: true},
	    //   {i: 'b', x: 5, y: 2, w: 1.7, h: 8, static: true},
	    //   {i: 'b', x: 7, y: 2, w: 1.7, h: 8, static: true}
	    // ];
		var layouts = [];
		var y = 2;
		var x = 2;

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
			if(imgArray != "0"){
				var str = imgArray;
				var res = str.replace("-S","-M");
				imgArray = res;
			}
			// if(imgArray[1] != "0"){
			// 	var str = imgArray[1];
			// 	var res = str.replace("-S","-M");
			// 	imgArray[1] = res;
			// }
			// if(imgArray[2] != "0" && imgArray != "undefined"){
			// 	console.log("imageArray2: " + imgArray[2]);
			// 	var str = imgArray[2];
			// 	var res = str.replace("-S","-M");
			// 	imgArray[1] = res;
			// }

			console.log(imgArray);
			//parse up the chain	
			layouts.push( {i: idOne, x: x, y: y, w:2.1, h: 8, static:true, img: imgArray, isbn: this.props.isbns[i]});
			x+=3;
			//layouts.push({i: idTwo, x: 5, y: y, w:2.1, h: 8, static:true, img: imgArray[1], isbn: this.props.isbns[i+1]});
			//layouts.push({i: idThree, x: 8, y: y, w:2.1, h: 8, static:true, img: imgArray[2], isbn: this.props.isbns[i+2]});
			//alert(layouts.length);
		}
		//alert(layouts.length);
		var copy;
		var spliced;
 
 		// if(this.props.bookSearchResults != ""){
 		// 	if(this.props.bookSearchResults[0][this.props.isbns[0]] != ""){

  	// 			console.log(JSON.parse(this.props.bookSearchResults[0])[this.props.isbns[0]].thumbnail_url);
			//  	//console.log("Layout: " + this.props.bookSearchResults[0][this.props.isbns[0]]) 					
 		// 	}
		
 		// }

		const layoutsArray = Array.from(layouts);
		

		return (

		<div>
		  <HomeNavBar />
		  <SidePane getBooks = {this.props.getBooks} />
	      <GridLayout className="layout" layout={layouts} cols={12} rowHeight={30} width={1200}>

	      	{ 
	      		layoutsArray.map((item,index) => (
	      			   <div key={item.i} > <img id="bookImage" src={item.img} onError={(e)=>{e.target.onerror = null; e.target.src="../NoImage.png"}} />
	      			   		<div> {item.isbn} </div>
	      			    </div>
	      			))
	      	}

	      		
	      	

	      </GridLayout>
	     </div>
	    )

    }
}

export default BooksLayout