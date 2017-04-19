'use strict';
var async = require('async');
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var Q = require('q');
var teamController = require('./team_controller');
var gambleController = require('./gamble_controller');
var leaguesController = require('./leagues_controller');
var matchController = require('./match_controller');
/**
 * nestedBet创建gamble
 */
var checkNestedGambleData = function () {
    console.log('nestedBet创建gamble');
    return NestedBetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, 'matchId': { '$exists': true }}).then(function (nestedBets) {
        async.mapLimit(nestedBets, 20, function (bet, defer) {
            gambleController.checkGambleExist(bet, defer)
        }, function (err, result) {
            return { message: 'success'};
        });
    });
};

/**
 * bet创建match和gamble
 */
var checkBetGambleData = function () {
    console.log('Bet创建gamble');
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, 'matchId': { '$exists': true }}).then(function (bets) {
        async.mapLimit(bets, 20, function (bet, defer) {
            gambleController.checkGambleExist(bet, defer)
        }, function (err, result) {
            return { message: 'success'};
        });
    });
};
var refreshProdcutionData = function () {
    Q.fcall(function () {
        console.log('=============================================Teams');
        return teamController.checkTeamExist();
    }).then(function () {
        console.log('=============================================Leagues');
        return leaguesController.checkLeaguesExist()
    }).then(function () {
        console.log('=============================================Matches');
        return matchController.checkMatchExist()
    }).then(function () {
        console.log('=============================================Gambles');
        return checkBetGambleData();
    }).then(function () {
        console.log('=============================================Gambles');
        return checkNestedGambleData();
    }).fail(function (err) {
        console.log('err');
        return 'success'
    })
};
exports.refreshProdcutionData = refreshProdcutionData;
