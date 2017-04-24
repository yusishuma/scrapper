/**
 * Created by tonghema on 19/04/2017.
 */
var League = require("../models").LeagueModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
var request = require('request');
/**
 * 获取赛事列表
 * @param req
 * @param res
 */
exports.getLeaguesByList = function (req, res) {
    var page =  parseInt(req.query.page) || CONSTANTS.PAGINATE.PAGE;
    var limit = parseInt(req.query.limit) || CONSTANTS.PAGINATE.LIMIT;
    var options = {
        searchOption: {
            gameType: parseInt(req.query.gameType) || 1,
            isExist: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
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
    League.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '赛事不存在');
        else
            respondSuccess(res, {leagues: results[0], count: results[1]}, 200);

    });

};
/**
 * 获取赛事详情
 * @param req
 * @param res
 */
exports.getLeague = function (req, res) {
    var leagueId = req.params.leagueId;
    League.findById(leagueId).then(function (result) {
        if(!result)
            respondFailure(res, 404, '赛事不存在');
        else
            respondSuccess(res, result, 200);
    })
};
/**
 * 更新赛事信息
 * @param req
 * @param res
 */
exports.updateLeague = function (req, res) {
    var leagueId = req.params.leagueId;
    var level = req.body.level;
    if(!level || !leagueId){
        respondFailure(res, 400, '参数错误');
    }else {
        var riskFund = CONSTANTS.translaterRiskFund(parseInt(level));
        var payCeiling = CONSTANTS.translaterPayCeiling(parseInt(level));
        League.update({_id: leagueId}, {'$set': { 'level': parseInt(level), 'riskFund': riskFund, 'payCeiling': payCeiling }}).then(function (result) {
            if(result && result.n === 0 && result.ok === 1){
                respondFailure(res, 404, '赛事不存在');
            }else{
                respondSuccess(res, {}, 201, '更新赛事成功');
            }
        })
    }

};
/**
 * 同步赛事数据到正服库
 * @param req
 * @param res
 */
exports.synchroLeagueToPro = function (req, res) {

    var leagueId = req.body.leagueId;
    League.findById(leagueId).then(function (league) {
        if(!league){
            return respondFailure(res, 404, '赛事不存在');
        }
        return League.update({_id: leagueId}, {'$set': { 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST}}).then(function () {
            return league;
        });
    }).then(function (league) {
        var createUrl = CONSTANTS.SERVER_URL + '/leagues';
        delete league.leagueId;
        /**
         * 创建赛事
         */
        // request.post({url: createUrl, form: league, json: true}, function (err, res, body) {
        //     if (!err && res.statusCode === 200) {
        //         if (body.status) {
        //             console.log('同步创建赛事 ' + league.leagueName + ' 成功！');
                    respondSuccess(res, {}, 201, '同步创建赛事成功');

        //         } else {
        //             console.log('同步创建赛事 ' + league.leagueName + ' 失败！');
        //             respondFailure(res, 500, '同步创建赛事失败');
        //
        //         }
        //     } else {
        //         console.log('同步创建赛事 ' + league.leagueName + ' 失败！');
        //         respondFailure(res, 500, '同步创建赛事失败');
        //
        //     }
        // });
    }).fail(function (err) {
        return respondFailure(res, 404, '同步创建赛事失败');
    })
};