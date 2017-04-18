'use strict';

var request = require('request');
var CONSTANTS = require('../utils/CONSTANTS');
var fetch = require('node-fetch');
var Q = require('q');
var moment = require('moment');
var _ = require('lodash');
var League = require('../models').LeagueModel;
var Event = require('../models').EventModel;
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

/**
 * 获取 联赛列表 保存到备份库
 */
exports.fetchLeagueData = function () {
    Q.Promise(function (resolve, reject) { //获取 联赛数据
        request.get({url: "http://api.pinbet88.com/v1/leagues?sportId=12&islive=0", headers: CONSTANTS.PING_BO.HEADERS, json: true}, function (err, res, data) {
            console.log("获取 联赛列表 保存到备份库", res.statusCode);
            if(res.statusCode === 200 && data && data.sportId){
                resolve(data);
            }else{
                reject([]);
            }
        });
    }).then(function (data) {
        return Q.all(data.leagues.map(function (league) {
            return Event.update({ leagueId: league.id }, { '$set': { 'leagueName': league.name } }, { 'multi': true }).then(function (result) {
                return new League(league).save()
            })
        })).then(function (results) {
            return results
        })
    })
};

/**
 * 获取已结算的场次 保存到备份库
 */
exports.fetchSettledEventData = function () {
    Q.Promise(function (resolve, reject) { //获取 联赛数据
        request.get({url: "http://api.pinbet88.com/v1/fixtures/settled?sportid=12", headers: CONSTANTS.PING_BO.HEADERS, json: true}, function (err, res, data) {
            console.log("获取已结算的场次 保存到备份库", res.statusCode);
            if(res.statusCode === 200 && data && data.sportId){
                resolve(data);
            }else{
                reject([]);
            }
        });
    }).then(function (data) {
        if(!data.leagues || data.leagues.length === 0){
            return '已完成获取已结算的场次'
        }
        return Q.all(data.leagues.map(function (league) {
            return Q.all(league.events.map(function (event) {
                event.leagueId = league.id;
                return Event.update({ id: event.id }, { '$set': { settled: true,  periods: event.periods }}).then(function (result) {
                        if(result && result.n === 0 && result.ok === 1){
                            return new Event(event).save()
                        }else {
                            return result;
                        }
                    })
            })).then(function () {
                return '已完成获取已结算的场次';
            })
        }))

    })
};

/**
 * 获取 未结算的场次 保存到备份库
 */
exports.fetchUnSettledEventData = function () {
    Q.Promise(function (resolve, reject) { //获取 联赛数据
        request.get({url: "http://api.pinbet88.com/v1/fixtures?sportid=12", headers: CONSTANTS.PING_BO.HEADERS, json: true}, function (err, res, data) {
            console.log("获取 未结算的场次 保存到备份库", res.statusCode);
            if(res.statusCode === 200 && data && data.sportId){
                resolve(data);
            }else{
                reject([]);
            }
        });
    }).then(function (data) {
        return Q.all(data.league.map(function (league) {
            return Q.all(league.events.map(function (event) {
                event.leagueId = league.id;
                event.starts = moment(event.starts).valueOf();
                return Event.update({ id: event.id }, { '$set': { home: event.home, away: event.away, starts: event.starts, status: event.status }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new Event(event).save()
                    }else {
                        return result;
                    }
                })
            })).then(function (results) {
                return results;
            })
        }))

    })
};

/**
 * 获取 场次赔率 保存到备份库
 */
exports.fetchOddsdEventData = function () {
    Q.Promise(function (resolve, reject) { //获取 联赛数据
        request.get({url: "http://api.pinbet88.com/v1/odds?sportid=12", headers: CONSTANTS.PING_BO.HEADERS, json: true}, function (err, res, data) {
            console.log("获取 场次赔率 保存到备份库", res.statusCode);
            if(res.statusCode === 200 && data && data.sportId){
                resolve(data);
            }else{
                reject([]);
            }
        });
    }).then(function (data) {
        return Q.all(data.leagues.map(function (league) {
            return Q.all(league.events.map(function (event) {
                event.leagueId = league.id;
                event.odds = event.periods;

                return Event.update({ id: event.id }, { '$set': { odds: event.odds }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new Event(event).save()
                    }else {
                        return result;
                    }
                })
            })).then(function (results) {
                return results;
            })
        }))

    })
};

/**
 *  抓取https://www.pinbet88.com数据
 */
exports.fetchPingbetData = function () {
        var results = {bets: [], nested_bets: []};
        Event.find({ exist_production: CONSTANTS.EXIST_PRODUCTION.NO_EXIST }).then(function (events) {
            return Q.all(events.map(function (item) { //遍历场次
                var game_tourn = item.leagueName.split(' - ');
                    var bet = {
                        id: event.id,
                        tourn: game_tourn[1],
                        game: game_tourn[0],
                        game_id: 0,
                        data: moment(event.starts).valueOf(),
                        gamer_1: {
                            nick: event.home
                        },
                        gamer_2: {
                            nick: event.away
                        }
                    };
                    results.bets.push(bet);
            }));
        }).then(function () {

        }).then(function (data) {
            console.log(data);

            return data;
        })
};

(function () {
    exports.fetchLeagueData();
     exports.fetchSettledEventData();
     exports.fetchUnSettledEventData();
    exports.fetchOddsdEventData();
    // exports.fetchBettingData();
})();