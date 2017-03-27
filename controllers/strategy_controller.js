/**
 * Created by tonghema on 27/03/2017.
 */
var Strategy = require("../models").StrategyModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
/**
 *  获取活动详情
 * @param req
 * @param res
 */
exports.getStrategy = function (req, res) {
    var strategyId = req.params.strategyId;
    if(!strategyId){
        respondFailure(res, 400, '参数错误');
    }
    Strategy.findById(strategyId).deepPopulate('productions').then(function (strategy) {
        if(!strategy)
            respondFailure(res, 404, '活动不存在');
        else
            respondSuccess(res, strategy, 200);
    })
};