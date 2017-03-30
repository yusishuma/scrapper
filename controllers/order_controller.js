/**
 * Created by tonghema on 30/03/2017.
 */
var models = require('../models/index');
var Order = models.OrderModel;
var User = models.UserModel;
var Porduction = models.ProductionModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');

/**
 * 获取订单详情
 * @param req
 * @param res
 */
exports.getOrder = function (req, res) {
    var orderId = req.params.orderId;
    if(!orderId){
        respondFailure(res, 400, '参数错误');
    }
    Order.findById(orderId).deepPopulate('productions, productions.designers').then(function (order) {
        if(!order)
            respondFailure(res, 404, '订单不存在');
        else
            respondSuccess(res, order, 200);
    })
};

/**
 * 生成订单
 * @param req
 * @param res
 */
exports.createOrder = function (req, res) {

    var order = req.body;

    var newOrder = new Order(order);

};