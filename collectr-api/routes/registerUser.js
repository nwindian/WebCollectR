var express = require('express');
var router = express.Router();
const cors = require('cors');
var mysql = require('mysql');
const { params, options } = require('../mySQLConnection.js');
//might have to requre app to get connection variable

router.post('/', cors(options), function (req, res, next) {

	var connection = mysql.createConnection({
		...params
	});

	connection.connect();

	//Create new user for db
	const newUser = {
		email: req.body.email,
		password: req.body.password,
	};

	console.log(newUser.email);
	var sql = "INSERT INTO userinfo (email, password) VALUES ('" + newUser.email + "', '" + newUser.password + "')";

	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	res.send('API is working properly');
	connection.end();
});

module.exports = router;