/**
 * Created by tonghema on 27/03/2017.
 */
var Production = require("../models").ProductionModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
/**
 * 获取 活动信息
 * @param req
 * @param res
 */
exports.getProduction = function (req, res) {
    var productionId = req.params.productionId;
    if(!productionId){
        respondFailure(res, 400, '参数错误');
    }
    Production.findById(productionId).deepPopulate('designer').then(function (production) {
        if(!production)
            respondFailure(res, 404, '活动不存在');
        else
            respondSuccess(res, production, 200);
    })  
};

