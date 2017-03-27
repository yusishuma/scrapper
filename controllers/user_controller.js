/**
 * Created by matonghe on 15/03/2017.
 */
var User = require("../models").UserModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');

/**
 * 验证用户手机号
 */
exports.validatePhone = function (req, res) {
    var username = req.body.username;
    if(!username)
        res.status(400).json({ message: '参数错误' });
    else
        User.findOne({ username: username }).then(function (user) {
           if(!user)
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
    console.log('registerUser', reqBody);
    if (!reqBody.username || !reqBody.password)
       res.status(400).json({ message: '用户名或密码不存在' });
   else
       User.findOne({ username: reqBody.username }).then(function (user) {
           if(!user){
               var newUser = new User(reqBody);
               console.log(newUser);
               return newUser.save().then(function (user) {
                    return res.status(201).json(user);
               }).fail(function (err) {
                   return res.json({ message: err });
               });
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
      userId = req.session.passport.user._id;
  User.findById(userId).then(function (user) {
      if(!!user)
          respondSuccess(res, user, 200);
      else
          respondFailure(res, 404, '用户不存在');
  })
};