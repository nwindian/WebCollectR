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
	const newUser = {
		email: req.body.email,
		password: req.body.password,
	};

	console.log(newUser.email);

	var userId = 0;
	fetchUser(newUser, function(err, content){
		if (err){
			console.log(err);
		}
		else
		{
			userId = content;
			res.json({"userId" : userId});	
		}
	});

	function fetchUser(newUser, callback){
		var sql = "SELECT id FROM userinfo WHERE email = '" + newUser.email + "' AND password = '" + newUser.password + "';"
		connection.query(sql, function(err, result, fields) {
			if(err) {
				callback(err, null);
			} else{
				console.log("id received: " + result[0].id);
				//response = result;
				//row = result[0];
				//id = row.email;
				callback(err, result[0].id);
			}
		});
	}


	// var sql = "SELECT COUNT(1) FROM userinfo WHERE email = '" + newUser.email + "' AND password = '" + newUser.password + "';"

	// let response = 0;
	// connection.query(sql, function(err, result, fields) {
	// 	if(err) throw err;
	// 	console.log("1 record received");
	// 	response = result;
	// });
	//console.log("USERID: " + userId);
	//res.json({"id" : userId});
    //res.send(response);
    connection.end();
});

module.exports = router;