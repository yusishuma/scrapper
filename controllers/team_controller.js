/**
 * Created by tonghema on 19/04/2017.
 */
var Team = require("../models").TeamModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
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
// exports.updateTeam = function (req, res) {
//     var teamId = req.params.teamId;
//     var isExist = req.body.isExist;
//     if(!isExist || !teamId){
//         respondFailure(res, 400, '参数错误');
//     }else {
//         isExist = parseInt(isExist);
//         Team.update({_id: teamId}, {'$set': { isExist: isExist }}).then(function (result) {
//             if(result && result.n === 0 && result.ok === 1){
//                 respondFailure(res, 404, '队伍不存在');
//             }else{
//                 respondSuccess(res, {}, 201, '更新队伍成功');
//             }
//         })
//     }
//
// };
/**
 * 保存战队信息到正服数据
 * @param req
 * @param res
 */
exports.synchroTeamToPro = function (req, res) {

};