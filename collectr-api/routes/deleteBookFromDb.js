var express = require('express');
var router = express.Router();
const cors = require('cors');
var mysql = require('mysql');
//might have to requre app to get connection variable

var options = { origin: 'http://localhost:3000', optionsSuccessStatus: 200};
router.post('/', cors(options), function(req, res, next) {

	var connection = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'Pioneer1177!?!?',
	database: 'collectr',
	port: '3306'
	});
	
	connection.connect();

	//Create new user for db
	const book = {
		userId: req.body.userId,
		title: req.body.title,
		author: req.body.author,
		isbn: req.body.isbn,
		img: req.body.img
	};

	var sql = "DELETE FROM books WHERE isbn='" + book.isbn +"';";

	connection.query(sql, function(err, result) {
		if(err) throw err;
		console.log("1 record deleted");
	});

    res.send('API is working properly');
    connection.end();
});

module.exports = router;