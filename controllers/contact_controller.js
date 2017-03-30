/**
 * Created by tonghema on 30/03/2017.
 */
var models = require('../models/index');
var Contact = models.ContactModel;
var User = models.UserModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');

/**
 *  获取用户 收货信息列表
 * @param req
 * @param res
 */
exports.getContactsList = function (req, res) {
    var userId = req.query.userId;
    if(!userId){
        respondFailure(res, 400, '参数错误');
    }
    //TODO: 返回默认收货地址， 后续会返回所有地址 根据需要加分页
    Contact.find({ owner: userId, isDefault: true }).then(function (contact) {
        if(!contact)
            respondFailure(res, 404, '收货信息不存在');
        else
            respondSuccess(res, contact, 200);
    })
};

/**
 *  获取用户 收货信息详情
 * @param req
 * @param res
 */
exports.getContact = function (req, res) {
    var contactId = req.params.contactId;
    if(!contactId){
        respondFailure(res, 400, '参数错误');
    }
    Contact.findById(contactId).then(function (contact) {
        if(!contact)
            respondFailure(res, 404, '收货信息不存在');
        else
            respondSuccess(res, contact, 200);
    })
};

/**
 *  创建收获地址信息
 * @param req
 * @param res
 */
exports.createContact = function (req, res) {
    var data = req.body;
    if(!data.owner || !data.phone){
        respondFailure(res, 400, '参数错误');
    }
    User.findById(data.owner).then(function (user) {
        if(!user)
            respondFailure(res, 404, '用户不存在');
        return new Contact(data).save();
    }).then(function (contact) {
        respondSuccess(res, contact, 201);
    })
};