"use strict";

var express = require("express");
var router = express.Router();
var user_router = require('./user_router');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    var reqBody = req.body;
    if (!reqBody.username || !reqBody.password) res.status(400).json({ message: '参数错误' });else res.status(201).json({ nickname: 'tom', phone: '15811020373', userId: '55406c39b067bf29621bb48b' });
});
/**
 * 用户注册
 *
 */
router.post('/register', function (req, res) {
    var reqBody = req.body;
    if (!reqBody.username || !reqBody.password) res.status(400).json({ message: '参数错误' });else res.status(201).json({ nickname: 'tom', phone: '15811020373', userId: '55406c39b067bf29621bb48b' });
});

/**
 *  user routers
 */
router.use('/users', user_router);

module.exports = router;
//# sourceMappingURL=index.js.map