/**
 * Created by tonghema on 18/04/2017.
 */
'use strict';

var request = require('request');
var CONSTANTS = require('../../utils/constants');
var Q = require('q');
var moment = require('moment');
var _ = require('lodash');
var League = require('../../models/index').ping_LeagueModel;
var Event = require('../../models/index').EventModel;
var LeagueModel = require('../../models/index').LeagueModel;
var TeamModel = require('../../models/index').TeamModel;
var MatchModel = require('../../models/index').MatchModel;
var qlimit = require('qlimit');
var limit = qlimit(10);
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
        return Q.all(data.leagues.map(limit(function (league) {
            return Event.update({ leagueId: league.id }, { '$set': { 'leagueName': league.name } }, { 'multi': true }).then(function (result) {
                return new League(league).save()
            })
        }))).then(function (results) {
            console.log(results);
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
            return Q.all(league.events.map(limit(function (event) {
                event.leagueId = league.id;
                return Event.update({ id: event.id }, { '$set': { settled: true,  periods: event.periods }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new Event(event).save()
                    }else {
                        return result;
                    }
                })
            }))).then(function () {
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
            return Q.all(league.events.map(limit(function (event) {
                event.leagueId = league.id;
                event.starts = moment(event.starts).valueOf();
                return Event.update({ id: event.id }, { '$set': { home: event.home, away: event.away, starts: event.starts, status: event.status }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new Event(event).save()
                    }else {
                        return result;
                    }
                })
            }))).then(function (results) {
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
            return Q.all(league.events.map(limit(function (event) {
                event.leagueId = league.id;
                event.odds = event.periods;

                return Event.update({ id: event.id }, { '$set': { odds: event.odds }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new Event(event).save()
                    }else {
                        return result;
                    }
                })
            }))).then(function (results) {
                return results;
            })
        }))

    })
};

/**
 *  抓取https://www.pinbet88.com数据
 */
exports.fetchPingbetData = function () {
    Event.find({ exist_production: CONSTANTS.EXIST_PRODUCTION.NO_EXIST }).then(function (events) {
        return Q.all(events.map(limit(function (event) {
            var gameAndLeagueName = event.leagueName.split(' - ');
            var game = gameAndLeagueName[0];
            var leagueName = gameAndLeagueName[1];
            var league = {
                gameType: CONSTANTS.translateGameType(game),
                leagueName: leagueName,
                leagueSource: CONSTANTS.SOURCE.PING_BO
            };
            //同步赛事到Temp
            LeagueModel.find({ leagueName: leagueName }).then(function (results) {
                if(results || results.length === 0){
                    console.log('创建temp league');
                    return new LeagueModel(league).save()
                }else {
                    return null;
                }
            }).then(function () {//同步战队到Temp
                var teamNames = [event.home, event.away];
                return Q.all(teamNames.map(function(teamName){
                    var newTeam = {teamName: teamName, gameType: CONSTANTS.translateGameType(game)};
                    return TeamModel.findOne({teamName: teamName, gameType: CONSTANTS.translateGameType(game)}).then(function (team) {
                        if(team){
                            return '已存在'
                        }else{
                            console.log('创建temp team');
                            return new TeamModel(newTeam).save();
                        }
                    })
                }))
            }).then(function () {
                var newMatch = {
                    gameType: CONSTANTS.translateGameType(game),
                    matchName: CONSTANTS.generateMatchName(event.home, event.away),
                    matchSource: CONSTANTS.SOURCE.PING_BO,
                    matchSourceId: event.id,
                    teamA: event.home,
                    teamB: event.away,
                    league: leagueName
                };
                return MatchModel.findOne({ matchName: CONSTANTS.generateMatchName(event.home, event.away) }).then(function (match) {
                    if(match){
                        return null;
                    }else{
                        console.log('创建temp match');
                        return new MatchModel(newMatch).save();
                    }
                })
            })
        })))
    }).then(function () {

    }).then(function (data) {
        return data;
    })
};

(function () {
    exports.fetchLeagueData();
    exports.fetchSettledEventData();
    exports.fetchUnSettledEventData();
    exports.fetchOddsdEventData();
    exports.fetchPingbetData();
})();