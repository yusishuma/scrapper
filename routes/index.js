"use strict";

var express = require("express");
var router = express.Router();
var user_router = require('./user_router');
var user_controller = require('../controllers/user_controller');
var league_router = require('./league_router');
var gamble_router = require('./gamble_router');
var team_router = require('./team_router');
var passport = require('passport');
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
/**
 * 验证是否登陆
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var ensureLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 用户登录 */
router.post('/login',  passport.authenticate('local', {
    session: true, failureRedirect: '/login'
}), function(req, res, next) {
    console.log('login', req.session);
    var user = req.session.passport.user;
    respondSuccess(res, user, 201);
});

/* 用户注册 */
router.post('/register', user_controller.registerUser);

/* 获取短信验证码 */
router.post('/requestSmsCode', user_controller.getSmsCode);

/* 验证短信验证码 */
router.post('/verifySmsCode', user_controller.verifySmsCode);

/**
 *  用户 routers
 */
router.use('/users', ensureLoggedIn, user_router);
/**
 *  赛事 routers
 */
router.use('/leagues', league_router);
/**
 *  赌局 routers
 */
router.use('/gambles', gamble_router);
/**
 *  战队 routers
 */
router.use('/teams', team_router);


module.exports = router;
