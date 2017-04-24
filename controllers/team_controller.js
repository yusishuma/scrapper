/**
 * Created by tonghema on 19/04/2017.
 */
var Team = require("../models").TeamModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
var request = require('request');

/**
 * 获取团队列表
 * @param req
 * @param res
 */
exports.getTeamsByList = function (req, res) {
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
    Team.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '队伍不存在');
        else
            respondSuccess(res, { teams: results[0], count: results[1] }, 200);

    });
};

/**
 * 获取队伍详情
 * @param req
 * @param res
 */
exports.getTeam = function (req, res) {
    var teamId = req.params.teamId;
    Team.findById(teamId).then(function (result) {
        if(!result)
            respondFailure(res, 404, '队伍不存在');
        else
            respondSuccess(res, result, 200);
    })
};

/**
 * 更新队伍信息
 * @param req
 * @param res
 */
 exports.updateTeam = function (req, res) {
     var teamId = req.params.teamId;
     var isExist = req.body.isExist;
     if(!isExist || !teamId){
         respondFailure(res, 400, '参数错误');
     }else {
         isExist = parseInt(isExist);
         Team.update({_id: teamId}, {'$set': { isExist: isExist }}).then(function (result) {
             if(result && result.n === 0 && result.ok === 1){
                 respondFailure(res, 404, '队伍不存在');
             }else{
                 respondSuccess(res, {}, 201, '更新队伍成功');
             }
         })
     }
 };
/**
 * 保存战队信息到正服数据
 * @param req
 * @param res
 */
exports.synchroTeamToPro = function (req, res) {
    var teamId = req.body.teamId;
    Team.findById(teamId).then(function (team) {
        if(!team){
            return respondFailure(res, 404, '战队不存在');
        }
        return Team.update({_id: teamId}, {'$set': { 'isExist': CONSTANTS.EXIST_PRODUCTION.EXIST}}).then(function () {
            return team;
        });
    }).then(function (team) {
        var createUrl = CONSTANTS.SERVER_URL + '/teams';
        delete team.teamId;
        /**
         * 创建战队
         */
        // request.post({url: createUrl, form: team, json: true}, function (err, res, body) {
        //     if (!err && res.statusCode === 200) {
        //         if (body.status) {
        //             console.log('同步创建战队 ' + team.leagueName + ' 成功！');
                    respondSuccess(res, {}, 201, '同步创建战队成功');

        //         } else {
        //             console.log('同步创建战队 ' + team.leagueName + ' 失败！');
        //             respondFailure(res, 500, '同步创建战队失败');
        //
        //         }
        //     } else {
        //         console.log('同步创建战队 ' + team.leagueName + ' 失败！');
        //         respondFailure(res, 500, '同步创建战队失败');
        //
        //     }
        // });
    }).fail(function (err) {
        return respondFailure(res, 404, '同步创建战队失败');
    })
};