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
	const user = {
		userId: req.body.userId,
	};

	fetchUser(user, function(err, content){
		if (err){
			console.log(err);
		}
		else
		{
			res.json(content);	
		}
	});

	function fetchUser(user, callback){
		var sql = "SELECT title,author,isbn,img_url FROM books WHERE user_id =" + user.userId + ";"
		connection.query(sql, function(err, result, fields) {
			if(err) {
				callback(err, null);
			} else{
				console.log(result);
				//response = result;
				//row = result[0];
				//id = row.email;

				callback(err, result);
			}
		});
	}

    connection.end();
});

module.exports = router;