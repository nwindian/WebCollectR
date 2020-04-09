var express = require('express');
var router = express.Router();
const cors = require('cors');
var request = require('request');
var fs = require('fs');
var qs = require('qs');
var rp = require('request-promise');
//npmvar axios = require('axios');
//might have to requre app to get connection variable

var options = { origin: 'http://localhost:3000', optionsSuccessStatus: 200};
router.get('/', cors(options), function(req, res, next) {

	var url = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538';
	var jsonIsbns = req.query;
	var isbns = JSON.parse(jsonIsbns.books);

	var arrayOfPromises = isbns.map((isbn) => rp('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn +"&format=json"));
	Promise.all(arrayOfPromises)
		.then((arrayOfHtml) => {
			// fs.writeFile('boi.txt',arrayOfHtml, (err)=>{
			// 	if(err) throw err;
			// });
			// for(var i = 0; i < arrayOfHtml.length; i++){
			// 	arrayOfHtml[i] = arrayOfHtml[i].splice(0,17)
			// }
			res.send(arrayOfHtml);
		})
		.catch(function(err) {console.log('Error Getting books from ISBN'); });

	console.log(arrayOfPromises);
});

module.exports = router;