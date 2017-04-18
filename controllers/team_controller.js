var request = require('request');
var CONSTANTS = require('../utils/CONSTANTS');
var models = require('../models');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var Q = require('q');
var _ = require('lodash');
/**
 * 检测战队是否存在
 */
exports.checkTeamExist = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
    if(bets.length == 0){
        return "success"
    }
    else
        return  Q.all(bets.map(function (bet) {
            var teamA = bet.gamer_1 || null,
                teamB = bet.gamer_2 || null;
                /**
                 * 查询战队teamA是否存在
                 */
                var urlA = CONSTANTS.SERVER_URL + '/teamsdetailforname?teamName=' + teamA.nick + '&gameType=' + CONSTANTS.translateGameType(bet.game);
                return Q.promise(function (resolve, reject) {
                    request.get({url: urlA, json: true}, function (err, res, body) {
                        if (!err && res.statusCode === 200) {
                            if (body.status) {
                                console.log('战队 ' + teamA.nick + ' 存在');
                                bet.teamA = body.data._id;
                                resolve(bet);
                            }else {
                                /**
                                 * 队伍不存在 更新战队状态
                                 */
                                console.log('队伍不存在 更新战队状态');
                                // 队伍不存在 更新战队状态
                                bet.teamStatus = CONSTANTS.BET_TEAM.NO_TEAMS;
                                resolve(bet);
                            }
                        }
                    })
                }).then(function (bet) {
                    /**
                     * 查询战队teamB是否存在
                     */
                    var urlB = CONSTANTS.SERVER_URL + '/teamsdetailforname?teamName=' + teamB.nick + '&gameType=' + CONSTANTS.translateGameType(bet.game);
                    return Q.promise(function (resolve, reject) {
                        request.get({url: urlB, json: true}, function (err, res, body) {
                            if (!err && res.statusCode === 200) {
                                if (body.status) {
                                    console.log('战队 ' + teamB.nick + ' 存在');
                                    bet.teamB = body.data._id;
                                    resolve(bet);
                                }else {
                                    /**
                                     * 队伍不存在 更新战队状态
                                     */
                                    console.log('队伍不存在 更新战队状态');
                                    // 队伍不存在 更新战队状态
                                    bet.teamStatus = CONSTANTS.BET_TEAM.NO_TEAMS;
                                    resolve(bet);

                                }
                            }
                        })
                });
            }).then(function (bet) {
                bet.teamStatus = bet.teamB && bet.teamA? CONSTANTS.BET_TEAM.HAVE_TEAMS: CONSTANTS.BET_TEAM.NO_TEAMS;
                    /**
                     *  BetModel  更新战队
                     */
                return BetModel.update({ id: bet.id }, {'$set': {teamA: bet.teamA, teamB: bet.teamB, teamStatus: bet.teamStatus}})
            }).then(function () {
                    /**
                     *  BetModel  更新战队
                     */
                return NestedBetModel.update({ game_id: bet.id }, {'$set': {teamA: bet.teamA, teamB: bet.teamB, teamStatus: bet.teamStatus}},{'multi': true});
            }).then(function () {
                    return bet;
            })
        })).then(function (result) {
            return result;
        });
    })
};
