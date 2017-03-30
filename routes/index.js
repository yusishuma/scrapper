"use strict";

var express = require("express");
var router = express.Router();
var user_router = require('./user_router');
var user_controller = require('../controllers/user_controller');
var strategy_controller = require('../controllers/strategy_controller');
var production_router = require('./production_router');
var strategy_router = require('./strategy_router');
var contact_router = require('./contact_router');
var order_router = require('./order_router');
var passport = require('passport');
var  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
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
router.get('/login', function (req, res) {
    respondFailure(res, 401, '未登录');
});
/* 用户注册 */
router.post('/register', user_controller.registerUser);

/* 获取首页数据 */
router.get('/index', strategy_controller.getIndexInfo);

/* 获取短信验证码 */
router.post('/requestSmsCode', user_controller.getSmsCode);

/* 验证短信验证码 */
router.post('/verifySmsCode', user_controller.verifySmsCode);

/**
 *  用户 routers
 */
router.use('/users', ensureLoggedIn, user_router);
/**
 *  活动 routers
 */
router.use('/strategies', strategy_router);
/**
 *  商品 routers
 */
router.use('/productions', production_router);
/**
 *  订单 routers
 */
router.use('/orders', ensureLoggedIn, order_router);
/**
 *  收获信息 routers
 */
router.use('/contacts', ensureLoggedIn, contact_router);

module.exports = router;
