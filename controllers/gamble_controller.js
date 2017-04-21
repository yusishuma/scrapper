/**
 * Created by tonghema on 19/04/2017.
 */
var Gamble = require("../models").GambleModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
var request = require('request');
/**
 * 获取赌局列表
 * @param req
 * @param res
 */
exports.getGamblesByList = function (req, res) {
    var page =  parseInt(req.query.page) || CONSTANTS.PAGINATE.PAGE;
    var limit = parseInt(req.query.limit) || CONSTANTS.PAGINATE.LIMIT;
    var options = {
        searchOption: {
            gameType: parseInt(req.query.gameType) || 1,
            gambleStatus: {'$nin': parseInt(req.query.gambleStatus) || 3 },
            isExist: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
        },
        limit: limit,
        page: page,
        sortOption: {
            createdAt: -1
        }
    };
    if(req.query.gambleName){
        options.searchOption.gambleName = req.query.gambleName;
    }
    Gamble.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '赌局不存在');
        else
            respondSuccess(res, {gambles: results[0], count: results[1]}, 200);

    });
};
/**
 * 更新赌局信息
 * @param req
 * @param res
 */
exports.updateGamble = function (req, res) {
    var gambleId = req.params.gambleId;
    var optionB = req.body.optionB;
    var optionA = req.body.optionA;
    Gamble.update({_id: gambleId}, {'$set': {
        'optionA.riskFund': parseInt(optionA.riskFund), 'optionA.payCeiling': parseInt(optionA.payCeiling),
        'optionB.riskFund': parseInt(optionB.riskFund), 'optionB.payCeiling': parseInt(optionB.payCeiling)
        }}).then(function (result) {
            if(result && result.n === 0 && result.ok === 1){
                respondFailure(res, 404, '赛事不存在');
            }else{
                respondSuccess(res, {}, 201, '更新赛事成功');
            }
    })

};