/**
 * Created by matonghe on 15/03/2017.
 */
var User = require("../models").UserModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var avosClient = require('../config/avos').client;
/**
 * 验证用户手机号
 */
exports.validatePhone = function (req, res) {
    var username = req.body.username;
    if(!username)
        respondFailure(res, 400, '参数错误');
    else
        User.findOne({ username: username }).then(function (user) {
           if(!!user)
               respondFailure(res, 400, '用户已存在');
           else
               respondSuccess(res, {}, 201, '用户不存在');
        });
};

/**
 * 用户注册
 * @param req
 * @param res
 */
exports.registerUser = function (req, res) {
   var reqBody = req.body;
    if (!reqBody.username || !reqBody.password)
        respondFailure(res, 400, '用户名或密码不存在');
    else
       User.findOne({ username: reqBody.username }).then(function (user) {
           if(!user){
               var newUser = new User(reqBody);
               return newUser.save().then(function (user) {
                    return respondSuccess(res, user, 201);
               })
           }else{
               return respondFailure(res, 400, '用户已存在');
           }
       })

};

/**
 * 获取用户信息
 * @param req
 * @param res
 */
exports.getUser = function (req, res) {

  var userId = req.params.userId;
  if(!userId){
      return respondFailure(res, 400, '参数错误');
  }
  if(userId === 'me')
      userId = req.session.passport.user.userId;
  User.findById(userId).then(function (user) {
      if(!!user)
          respondSuccess(res, user, 200);
      else
          respondFailure(res, 404, '用户不存在');
  })
};

/**
 * 获取短信验证码
 * @param req
 * @param res
 */
exports.getSmsCode = function (req, res) {
    var username = req.body.username;
    if(!username) {
        respondFailure(res, 400, '参数错误');
    }
    var data = {
        mobilePhoneNumber: username,
        ttl: 15,
        name:'荧光棒'
    };
    avosClient.post('1.1/requestSmsCode', data, function (err, result) {
        respondSuccess(res, {}, 201, '获取短信验证码成功!');
    });

};

/**
 * 验证短信验证码是否正确
 * @param req
 * @param res
 */
exports.verifySmsCode = function (req, res) {
    var smsCode = req.body.smsCode;
    var username = req.body.username;
    if(!username || !smsCode) {
        respondFailure(res, 400, '参数错误');
    }
    avosClient.post('1.1/verifySmsCode/' + smsCode + '?mobilePhoneNumber=' + username, {}, function (err, results, body) {
        if(err || body.error) {
            return respondFailure(res, body.code, { message: body.error });
        }else{
            respondSuccess(res, {}, 201, '验证成功!');
        }
    });
};