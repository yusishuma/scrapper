var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('./config/mongo');
var log4js = require('log4js');
var loggerHandler = require('./middlewares/log4j/logger').logger;
var router = require('./routes/index');
var passport = require('passport');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var CONSTANTS = require('./utils/constants');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(session({
    secret: CONSTANTS.SESSION.SECRET,
    store: new MongoStore({
        url: CONSTANTS.MONGODB_ENV.DB_URI,
        autoReconnect: true

    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: CONSTANTS.SESSION.MAX_AGE

    }


}));

require('./middlewares/passport/auth');

// 注册passport中间件
app.use(passport.initialize()); // 初始化passport
app.use(passport.session());
// 注册日志中间件
app.use(log4js.connectLogger(loggerHandler, {
    level: log4js.levels.INFO
}));

/**
 * mongodb  链接
 */
mongodb.connectMongo();

/**
 * Routes
 */
app.use('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');
    next();
})
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    "use strict";
    var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    "use strict";
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
