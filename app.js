var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDatabase = require('./config/database.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRoutes = require('./routes/gameRoutes');
var gameRoute = require('./routes/gameRoute');
var gamesRoutes = require('./routes/gamesRoutes');



var app = express();

connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(cors()); // Use the cors package for CORS headers
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/game', gameRoutes);
app.use('/api/games', gameRoute);
app.use('/api/gamess', gamesRoutes);




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


