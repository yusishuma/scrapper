/**
 * Created by tonghema on 19/04/2017.
 */
var League = require("../models").LeagueModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
exports.getLeaguesByList = function (req, res) {
    // var userId = req.query.userId;
    var page =  parseInt(req.query.page) || CONSTANTS.PAGINATE.PAGE;
    var limit = parseInt(req.query.limit) || CONSTANTS.PAGINATE.LIMIT;
    var options = {
        searchOption: {
            gameType: parseInt(req.query.gameType) || 1
        },
        limit: limit,
        page: page,
        sortOption: {
            createdAt: -1
        }
    };
    if(req.query.leagueName){
        options.searchOption.leagueName = req.query.leagueName;
    }
        // if(!userId){//获取所有订单
        //     respondFailure(res, 401, '用户未登录');
        // }
    League.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '赛事不存在');
        else
            respondSuccess(res, {leagues: results[0], count: results[1]}, 200);

    });

};