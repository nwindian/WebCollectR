var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mysql = require('mysql');

var app = express();

//CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.options('*', cors());

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var registerUserRouter = require('./routes/registerUser');
var getUserLoginRouter = require('./routes/getUserLogin');
var getOpenLibrarySearch = require('./routes/getOpenLibrarySearch');
var getBooksFromIsbn = require('./routes/getBooksFromIsbn');
var getBookImage = require('./routes/getBookImage');
var postBookToDb = require('./routes/postBookToDb');
var deleteBookFromDb = require('./routes/deleteBookFromDb');
var getUsersBooksFromDb = require('./routes/getUsersBooksFromDb');

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

app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/api/registerUser", registerUserRouter);
app.use("/api/getUserLogin", getUserLoginRouter);
app.use("/api/getOpenLibrarySearch", getOpenLibrarySearch);
app.use("/api/getBooksFromIsbn", getBooksFromIsbn);
app.use("/api/getBookImage", getBookImage);
app.use("/api/postBookToDb", postBookToDb);
app.use("/api/deleteBookFromDb", deleteBookFromDb);
app.use("/api/getUsersBooksFromDb", getUsersBooksFromDb);
app.use('/', indexRouter);

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
