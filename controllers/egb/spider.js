'use strict';

var request = require('request');
var CONSTANTS = require('../../utils/constants');
var fetch = require('node-fetch');
var moment = require('moment');
/**
 *  抓取https://egb.com/bets数据
 */
exports.fetchBettingData = function () {
    return new Promise(function (resolve, reject) {
        request.get({url: CONSTANTS.EGB_URL + '?st=0&ut=0&fg=1&f=', headers: CONSTANTS.HEADER, json: true}, function (err, res, data) {
            var bets = [],
                nested_bets = [];
            if (!err && res.statusCode === 200) {
                console.log('step 1: first request success!');
                data.nested_bets.forEach(function (nested_bet) {
                    if (nested_bet.game === 'Dota2' || nested_bet.game === 'Counter-Strike' || nested_bet.game === 'LoL') {
                        nested_bets.push(nested_bet);
                    }
                });
                data.bets.forEach(function (bet) {
                    if (bet.game === 'Dota2' || bet.game === 'Counter-Strike' || bet.game === 'LoL') {
                        bets.push(bet);
                    }
                });
                resolve({
                    bets: bets,
                    nested_bets: nested_bets
                });
            } else {
                resolve({
                    bets: [],
                    nested_bets: []
                });
            }
        });
    });
};
