/**
 * Created by matonghe on 15/03/2017.
 */
var User = require("../models").User;
//登陆
exports.login = function(req, res){
    let reqBody = req.body;
    //TODO
    // User.find().then(function (user) {
    //     return res.json(user);
    // });
    res.status(201).json({ nickname: 'tom', phone: '15811020373' });
};

//验证用户手机号
exports.validatePhone = function (req, res) {
    let phone = req.body.phone;
    if(!phone)
        res.status(400).json({ message: '参数错误' });
    else
  //TODO
    res.status(201).json({ message: 'sccessful' });
};

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
               return res.json({ message: '用户已存在' });
           }
       })

};
