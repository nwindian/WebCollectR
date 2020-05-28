var express = require('express');
var router = express.Router();
const cors = require('cors');
var request = require('request');
var fs = require('fs');
//npmvar axios = require('axios');
//might have to requre app to get connection variable

var options = { origin: 'http://localhost:3000', optionsSuccessStatus: 200 };
router.get('/', cors(options), function (req, res, next) {

	var bookSearch = req.query.bookSearch;
	const url = 'http://openlibrary.org/search.json?q=' + bookSearch;

	console.log(url);
	// axios
	// .get(url)
	// .then(res =>
	// {
	// 	callback(error);
	// })
	// .catch(error => {
	// 	console.log(error.response);
	// });

	fetchBooks(url, function (err, content) {

		if (err) {
			console.log(err);
		}
		else {
			res.send(content);
		}

	});

	function fetchBooks(url, callback) {

		request(url, function (error, response, body) {
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);

			callback(error, body)
			//res.send(body);
		});
	}

});

module.exports = router;