'use strict';
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var spider = require('./egb_spider');
var Q = require('q');
var qlimit = require('qlimit');
var limit = qlimit(10);
var teamController = require('./team_controller');
var matchController = require('./match_controller');
var leagueController = require('./league_controller');
var gambleController = require('./gamble_controller');
/**
 * 转换战队名称
 */
var parseTeamName = function (teamName) {
    if (teamName.indexOf('(') !== -1) {
        teamName = teamName.substr(0, teamName.indexOf('('));
    }
    return teamName.trim();
};

/**
 * 保存BET数据
 */
var saveBet = function (bet) {
    console.log("bet.id", bet.id);
    var newBet = new BetModel(bet);
    return BetModel.findOne({id: bet.id.toString()}).then(function (oldBet) {

        if (!oldBet) {
            return newBet.save();
        }else{
            if (newBet.date !== oldBet.date || newBet.coef_1 !== oldBet.coef_1 || newBet.winner !== oldBet.winner || newBet.coef_2 !== oldBet.coef_2 || newBet.gamer_1.win !== oldBet.gamer_1.win || newBet.gamer_2.win !== oldBet.gamer_2.win) {
                return BetModel.update({ id: oldBet.id }, {'$set':
                    {
                        date: newBet.date,
                        exist_production: CONSTANTS.EXIST_PRODUCTION.NO_EXIST,
                        winner: newBet.winner,
                        gamer_1: newBet.gamer_1,
                        gamer_2: newBet.gamer_2,
                        coef_1: newBet.coef_1,
                        coef_2: newBet.coef_2
                    }
                })
            } else {
                return oldBet;
            }
        }

    });
};

/**
 * 保存NestedBet数据
 */
var saveNestedBet = function (nestedBet) {
    console.log("nestedBet.id", nestedBet.id);
    var newNestedBet = new NestedBetModel(nestedBet);
    return NestedBetModel.findOne({id: nestedBet.id.toString()}).then(function (oldNestedBet) {
        if (!oldNestedBet) {
            return newNestedBet.save();
        }else {
            if (oldNestedBet._id && newNestedBet.date !== oldNestedBet.date || nestedBet.winner !== oldNestedBet.winner || newNestedBet.coef_1 !== oldNestedBet.coef_1
                || newNestedBet.gamer_1.win !== oldNestedBet.gamer_1.win || newNestedBet.gamer_2.win !== oldNestedBet.gamer_2.win) {
               return  NestedBetModel.update({ id: oldNestedBet.id }, {'$set':
                    {
                        date: newNestedBet.date,
                        exist_production: CONSTANTS.EXIST_PRODUCTION.NO_EXIST,
                        winner: nestedBet.winner,
                        gamer_1: newNestedBet.gamer_1,
                        gamer_2: newNestedBet.gamer_2,
                        coef_1: newNestedBet.coef_1,
                        coef_2: newNestedBet.coef_2
                    }
                })
            } else {
                return oldNestedBet;
            }
        }
    })
};

/**
 * 获取 bet 详细信息
 */
var fetchBetInfo = function (bets) {
    return  Q.all(bets.map(limit(function (bet) {
        var url = CONSTANTS.EGB_URL + '/' + bet.id;
        return Q.Promise(function (resolve, reject) {
            request.get({url: url, headers: CONSTANTS.HEADER,  json: true}, function (err, res, body) {
                if (!err && res.statusCode === 200) {
                    if (!body.success) {
                        resolve(null);
                    }
                    if(body && body.bet){
                        if (body.bet.parent_gamer_1) {
                            resolve(saveNestedBet(body.bet));
                        } else {
                            resolve(saveBet(body.bet));
                        }
                    }
                }else{
                    resolve(null);
                }
            });
        })
    })));
};

/**
 * 备份spider 数据 到 临时数据库
 */
exports.backupsData = function () {
    spider.fetchBettingData()
        .then(function (data) {
        if(data.bets && data.nested_bets && data.nested_bets.length > 0 && data.nested_bets.length > 0){
            return fetchBetInfo(data.bets).then(function (result) {
                console.log(result.length, "==================================抓取数据bets=============================================");
                return fetchBetInfo(data.nested_bets).then(function (result) {
                    console.log(result.length, "==================================抓取数据nested_bets======================================");
                    return "抓取数据完毕"
                });
            });

        }else{
            return '未抓取到数据';
        }
    }).then(function () {
        return leagueController.synchroLeaguesToTemp();
    }).then(function () {
        return teamController.synchroTeamsToTemp();
    }).then(function () {
        return matchController.synchroMatchesToTemp();
    }).then(function () {
        return gambleController.synchroGamblesToTemp();
    })
};

