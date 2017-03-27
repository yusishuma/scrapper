"use strict";

var express = require("express");
var router = express.Router();
var user_router = require('./user_router');
var user_controller = require('../controllers/user_controller');
var production_router = require('./production_router');
var strategy_router = require('./strategy_router');
var passport = require('passport');
var  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/**
 * 登录
 */
router.post('/login',  passport.authenticate('local', {
    session: false
}), function(req, res, next) {
    console.log('login', req.session);
    var user = req.session.passport.user;
    return res.status(201).json(user);


});

/**
 * 用户注册
 */
router.post('/register', user_controller.registerUser);

/**
 *  user routers
 */
router.use('/users', ensureLoggedIn, user_router);
router.use('/strategies', ensureLoggedIn, strategy_router);
router.use('/productions', ensureLoggedIn, production_router);

module.exports = router;
