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
		var layout = [];
		var y = 2;
		for(var i = 0; i <(Object.keys(this.props.bookSearchResults).length); i+=3 ){
			var idOne = Math.random().toString(36).slice(2);
			var idTwo = Math.random().toString(36).slice(2);
			var idThree = Math.random().toString(36).slice(2);

			if((i % 3 == 0) && i != 0){
				y += 9;
			}

			
			layout += {i: idOne, x: 3, y: y, w:1.7, h: 8, static:true};
			layout += {i: idTwo, x: 5, y: y, w:1.7, h: 8, static:true};
			layout += {i: idThree, x: 7, y: y, w:1.7, h: 8, static:true};
		}
	}
    render() {
	    // const layout = [
	    //   {i: 'a', x: 3, y: 2, w: 1.7, h: 8, static: true},
	    //   {i: 'b', x: 5, y: 2, w: 1.7, h: 8, static: true},
	    //   {i: 'b', x: 7, y: 2, w: 1.7, h: 8, static: true}
	    // ];
		var layouts = [];
		var y = 2;
		for(var i = 0; i <(Object.keys(this.props.bookSearchResults).length); i+=3 ){
			var idOne = Math.random().toString(36).slice(2);
			var idTwo = Math.random().toString(36).slice(2);
			var idThree = Math.random().toString(36).slice(2);

			if((i % 3 == 0) && i != 0){
				y += 9;
			}

			
			layouts.push( {i: idOne, x: 4, y: y, w:2.1, h: 8, static:true});
			layouts.push({i: idTwo, x: 7, y: y, w:2.1, h: 8, static:true});
			layouts.push({i: idThree, x: 10, y: y, w:2.1, h: 8, static:true});
			//alert(layouts.length);
		}
		//alert(layouts.length);

		const layoutsArray = Array.from(layouts);
		//alert(layoutsArray.length);
    	//<div key="a"><Fill bookSearchResults ={this.props.bookSearchResults}/></div>
   		//<div key="b">b</div>
		//<div key="c">c</div>
		return (

		<div>
		  <HomeNavBar />
		  <SidePane />
	      <GridLayout className="layout" layout={layouts} cols={12} rowHeight={30} width={1200}>

	      	{ 
	      		layoutsArray.map((item,index) => (
	      			   <div key={item.i}> {index} </div>
	      			))
	      	}

	      		
	      	

	      </GridLayout>
	     </div>
	    )

    }
}

export default BooksLayout