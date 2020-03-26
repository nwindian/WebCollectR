var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mysql = require('mysql');

var app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.options('*', cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var registerUserRouter = require('./routes/registerUser');


//Connection to db
const connection = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'Pioneer1177!?!?',
	database: 'collectr'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors(), function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
//app.use("/api/registerUser", registerUserRouter);
var options = { origin: 'http://localhost:3000', optionsSuccessStatus: 200};
app.post('http://localhost:9000/api/registerUser', cors(options), function(req, res, next) {
	connection.connect();

	//Create new user for db
	const newUser = {
		email: req.body.email,
		password: req.body.password,
	};

	var sql = "INSERT INTO userinfo (email, password) VALUES ('${newUser.email}', '${newUser.password}')";

	connection.query(sql, function(err, result) {
		if(err) throw err;
		console.log("1 record inserted");
	});

    res.send('API is working properly');
    connection.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
