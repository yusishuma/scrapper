'use strict';
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var spider = require('./spider');
var Q = require('q');
var async = require('async');
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
var saveBet = function (bet, defer) {
    console.log("bet.id", bet.id);
    var newBet = new BetModel(bet);
    BetModel.findOne({id: bet.id.toString()}, function (err, oldBet) {

        if (!oldBet) {
            return newBet.save(defer);
        }else{
            if (newBet.date !== oldBet.date || newBet.coef_1 !== oldBet.coef_1 || newBet.winner !== oldBet.winner || newBet.coef_2 !== oldBet.coef_2 || newBet.gamer_1.win !== oldBet.gamer_1.win || newBet.gamer_2.win !== oldBet.gamer_2.win) {
                BetModel.update({ id: oldBet.id }, {'$set':
                    {
                        date: newBet.date,
                        exist_production: CONSTANTS.EXIST_PRODUCTION.EXIST,
                        winner: newBet.winner,
                        gamer_1: newBet.gamer_1,
                        gamer_2: newBet.gamer_2,
                        coef_1: newBet.coef_1,
                        coef_2: newBet.coef_2
                    }
                }, defer)
            } else {
                defer(null, oldBet);
            }
        }

    });
};

/**
 * 保存NestedBet数据
 */
var saveNestedBet = function (nestedBet, defer) {
    console.log("nestedBet.id", nestedBet.id);
    var newNestedBet = new NestedBetModel(nestedBet);
    NestedBetModel.findOne({id: nestedBet.id.toString()}, function (err, oldNestedBet) {
        if (!oldNestedBet) {
            newNestedBet.save(defer);
        }else {
            if (oldNestedBet._id && newNestedBet.date !== oldNestedBet.date || nestedBet.winner !== oldNestedBet.winner || newNestedBet.coef_1 !== oldNestedBet.coef_1
                || newNestedBet.gamer_1.win !== oldNestedBet.gamer_1.win || newNestedBet.gamer_2.win !== oldNestedBet.gamer_2.win) {
                NestedBetModel.update({ id: oldNestedBet.id }, {'$set':
                    {
                        date: newNestedBet.date,
                        exist_production: CONSTANTS.EXIST_PRODUCTION.EXIST,
                        winner: nestedBet.winner,
                        gamer_1: newNestedBet.gamer_1,
                        gamer_2: newNestedBet.gamer_2,
                        coef_1: newNestedBet.coef_1,
                        coef_2: newNestedBet.coef_2
                    }
                }, defer)
            } else {
                defer(null, oldNestedBet);
            }
        }
    })
};

/**
 * 获取 bet 详细信息
 */
var fetchBetInfo = function (bets, callback) {
    console.log(bets.length);
    async.mapLimit(bets, 20, function (bet, defer) {
        var url = CONSTANTS.EGB_URL + '/' + bet.id;

        request.get({url: url, headers: CONSTANTS.HEADER,  json: true}, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                if (!body.success) {
                    defer(null);
                }
                if(body && body.bet){
                    if (body.bet.parent_gamer_1) {
                        saveNestedBet(body.bet, defer);
                    } else {
                        saveBet(body.bet, defer);
                    }
                }
            }else{
                defer(null);
            }
        });
    }, callback);
};
var refreshprodcutiondb = require('./toProdcutiondb');

/**
 * 备份spider 数据 到 临时数据库
 */
exports.backupsData = function () {

    spider.fetchBettingData().then(function (data) {
        if(data.bets && data.nested_bets && data.nested_bets.length > 0 && data.nested_bets.length > 0){
            console.log(data.nested_bets.length);
            fetchBetInfo(data.bets, function (err, result) {
                console.log(result.length, "==================================bets=============================================");
            });
            fetchBetInfo(data.nested_bets, function (err, result) {
                console.log(result.length, "==================================nested_bets======================================");
                refreshprodcutiondb.refreshProdcutionData();
            });
        }else{
            return '未抓取到数据';
        }
    })
};

