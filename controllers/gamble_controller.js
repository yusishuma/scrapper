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
// var userId = req.query.userId;
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
    if(req.query.leagueName){
        options.searchOption.leagueName = req.query.leagueName;
    }
    // if(!userId){
    //     respondFailure(res, 401, '用户未登录');
    // }
    Team.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '赌局不存在');
        else
            respondSuccess(res, {leagues: results[0], count: results[1]}, 200);

    });
};
/**
 * 更新赌局信息
 * @param req
 * @param res
 */
exports.updateGamble = function (req, res) {
    var gambleId = req.params.gambleId;
    
    Gamble.update({ _id: gambleId }, { '$set': { isExist: CONSTANTS.EXIST_PRODUCTION.EXIST } }).then(function () {
        return Gamble.findById(gambleId)
    }).then(function (result) {
        // var  winnerName;
        // if(bet.winner === 1 || bet.winner === 2){
        //     winnerName = bet.game_id
        //         ? bet['parent_gamer_' + bet.winner].nick + bet['gamer_' + bet.winner].nick
        //         : bet['gamer_' + bet.winner].nick;
        // }
        // var data = {
        //     gambleId: gambleId,
        //     teamAOdds: bet.coef_1,
        //     teamBOdds: bet.coef_2,
        //     winGambleOption: winnerName
        // };
        // if(bet.winner === -1){
        //     data.gambleStatus = 4;
        // }
        // var postUrl = CONSTANTS.SERVER_URL + '/gambleupdate';
        //
        // request.post({url: postUrl, form: data, json: true}, function (err, res, body) {
        //     if (!err && res.statusCode === 200) {
        //         if (body.status) {
        //             defer(null, bet);
        //         } else {
        //             defer(null);
        //         }
        //     } else {
        //         defer(null);
        //     }
        // });
    });

};