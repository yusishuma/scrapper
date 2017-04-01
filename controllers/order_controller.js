/**
 * Created by tonghema on 30/03/2017.
 */
var models = require('../models/index');
var Order = models.OrderModel;
var User = models.UserModel;
var Porduction = models.ProductionModel;
var CONSTANTS = require('../utils/constants');

var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');

/**
 * 获取订单列表
 * @param req
 * @param res
 */
exports.getOrderslist = function (req, res) {
    var userId = req.query.userId;
    var page = req.query.page || CONSTANTS.PAGINATE.PAGE;
    var limit = req.query.limit || CONSTANTS.PAGINATE.LIMIT;
    var options = {
        searchOption: {
            owner: userId,
            status: CONSTANTS.STATUS.PAID
        },
        limit: limit,
        page: page,
        sortOption: {
            createdAt: -1
        }
    };
    if(!userId){//获取所有订单
        delete options.searchOption.owner;
    }
    Order.findAllAndCount(options).then(function (results) {
        console.log(results);
        if(!results)
            respondFailure(res, 404, '订单不存在');
        else
            respondSuccess(res, {orders: results[0], count: results[1]}, 200);
    });
};

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
    Order.findById(orderId).deepPopulate('owner, productions.production, productions.production.designers').then(function (order) {
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
    if(!order.productions || order.productions.length < 1){
        respondFailure(res, 400, '参数错误');
    }
    var ids = order.productions.map(function (item) {
        return item.production;
    });
    //检查所有商品是存在且有效的
    Porduction.find({ '_id': { '$in': ids }, status: CONSTANTS.STATUS.PUBLISHED })
        .then(function (productions) {
            var newOrder = new Order(order);
            newOrder.payment = 0;
            productions.map(function (item) {
                //TODO 第一版默认 商品数量 为 1
                if(!item.count) item.count = 1;
                newOrder.payment += item.price * item.count;
            });
            newOrder.payment = newOrder.payment / 100;

            return newOrder.save().then(function (json) {
                return Order.findById(json.toJSON().orderId).deepPopulate('owner, productions.production, productions.production.designers').then(function (result) {
                    if(!result)
                        respondFailure(res, 404, '订单不存在');
                    else
                        respondSuccess(res, result, 200);
                })
            });
    })

};