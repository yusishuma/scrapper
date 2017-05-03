/**
 * Created by tonghema on 18/04/2017.
 */
'use strict';

var request = require('request');
var CONSTANTS = require('../../utils/constants');
var Q = require('q');
var moment = require('moment');
var _ = require('lodash');
var ping_League = require('../../models/index').ping_LeagueModel;
var ping_Event = require('../../models/index').EventModel;
var LeagueModel = require('../../models/index').LeagueModel;
var TeamModel = require('../../models/index').TeamModel;
var MatchModel = require('../../models/index').MatchModel;
var GambleModel = require('../../models/index').GambleModel;
var qlimit = require('qlimit');
var limit = qlimit(10);
/**
 * 获取 联赛列表 保存到备份库
 */
var fetchLeagueData = function () {
    return Q.Promise(function (resolve, reject) { //获取 联赛数据
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
            return ping_League.find({ 'name': league.name }).
                then(function (leagues) {
                    if(leagues && leagues.length === 0){
                        return new ping_League(league).save()
                    }else{
                        return '';
                    }
                }).then(function () {
                    return ping_Event.update({ leagueId: league.id }, { '$set': { 'leagueName': league.name } }, { 'multi': true }).then(function (result) {
                        return result
                    })
                })
        })))
    }).then(function (results) {
        return results
    })
};

/**
 * 获取已结算的场次 保存到备份库
 */
var fetchSettledEventData = function () {
    return Q.Promise(function (resolve, reject) { //获取 联赛数据
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
                return ping_Event.update({ id: event.id }, { '$set': { settled: true,  periods: event.periods }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new ping_Event(event).save()
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
var fetchUnSettledEventData = function () {

    return Q.Promise(function (resolve, reject) { //获取 联赛数据
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
                return ping_Event.update({ id: event.id }, { '$set': { home: event.home, away: event.away, starts: event.starts, status: event.status }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new ping_Event(event).save()
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
var fetchOddsdEventData = function () {
    return Q.Promise(function (resolve, reject) { //获取 联赛数据
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
                delete event.periods;
                return ping_Event.update({ id: event.id }, { '$set': { odds: event.odds }}).then(function (result) {
                    if(result && result.n === 0 && result.ok === 1){
                        return new ping_Event(event).save()
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
var fetchPingbetData = function () {
    return ping_Event.find({ exist_production: CONSTANTS.EXIST_PRODUCTION.NO_EXIST, 'odds': { '$size': 1}}).then(function (events) {
        return Q.all(events.map(limit(function (event) {
            var gameAndLeagueName = event.leagueName.split(' - ');
            var game = gameAndLeagueName[0];
            var gameType = CONSTANTS.translateGameType(game);
            var leagueName = gameAndLeagueName[1];
            var teamA = CONSTANTS.parseTeamName(event.home);
            var teamB = CONSTANTS.parseTeamName(event.away);
            if(gameType < 4){

                //同步战队到Temp
            var teamNames = [teamA, teamB];
            return Q.all(teamNames.map(function(teamName){
                var newTeam = {teamName: teamName, gameType: gameType, teamSource: CONSTANTS.SOURCE.PING_BO};
                    return TeamModel.findOne({teamName: teamName, gameType: gameType}).then(function (team) {
                        if(team){
                            return '已存在'
                        }else{
                            console.log(event.leagueName, game,leagueName,'pingbo 创建temp team', newTeam);
                            return new TeamModel(newTeam).save().then(function (result) {
                                console.log(result)
                                return result
                            });
                        }
                    })

                }))
            .then(function () {//同步赛事到Temp
                var newMatch = {
                    gameType: gameType,
                    matchName: CONSTANTS.generateMatchName(teamA, teamB),
                    matchSource: CONSTANTS.SOURCE.PING_BO,
                    matchSourceId: event.id,
                    teamA: teamA,
                    teamB: teamB,
                    league: leagueName
                };
                return MatchModel.findOne({ matchName: CONSTANTS.generateMatchName(teamA, teamB) }).then(function (match) {
                    if(match){
                        return null;
                    }else{
                        console.log('pingbo 创建temp match');
                        return new MatchModel(newMatch).save();
                    }
                })
            }).then(function () {
                var gambleName = '', game_subsidiary = '', teamAScore, teamBScore, odd = event.odds[0];
                var newGambles = [];
                if (event.home.indexOf('(') !== -1) {
                    game_subsidiary = _.lowerCase(event.home.substr(event.home.indexOf('('), event.home.length));
                    game_subsidiary = _.replace(game_subsidiary, 'live', '');
                }
                var teamA = CONSTANTS.parseTeamName(event.home);
                var teamB = CONSTANTS.parseTeamName(event.away);
                var newGamble = {
                    gameType: gameType,
                    gambleType: 1,
                    gambleName: gambleName,     //赌局名称
                    match: CONSTANTS.generateMatchName(teamA, teamB),       //所属赛程ID
                    optionA:{},
                    optionB:{},
                    gambleSource: CONSTANTS.SOURCE.PING_BO,   //赌局数据来源
                    gambleSourceId: event.id //赌局来源ID

                };
                if(event.periods && event.periods.length > 0){
                    if(event.periods[0].status === 3){
                        newGamble.gambleStatus = 4
                    }
                    teamAScore = event.periods[0].team1Score;
                    teamBScore = event.periods[0].team2Score;
                }
                newGamble.endTime = moment(odd.cutoff).valueOf();       //赌局期限
                if(odd.spreads && odd.spreads.length > 0){
                    newGamble.gambleName = game_subsidiary + '让分';
                    if(event.periods && event.periods.length > 0){
                        var teamAwin = (teamAScore + odd.spreads[0].hdp -teamBScore) > 0;
                        newGamble.optionA.win = teamAwin? 1: 0;
                        newGamble.optionB.win = !teamAwin? 1: 0;

                    }
                    newGamble.optionA.name = teamA + '让' + odd.spreads[0].hdp;
                    newGamble.optionA.teamA = teamA;
                    newGamble.optionA.odds = CONSTANTS.parseOdds(odd.spreads[0].home, odd.maxSpread);
                    newGamble.optionB.name = teamB;
                    newGamble.optionB.teamB = teamB;
                    newGamble.optionB.odds = CONSTANTS.parseOdds(odd.spreads[0].away, odd.maxSpread);
                    newGamble.gambleSourceAndSourceId = CONSTANTS.SOURCE.PING_BO + event.id + newGamble.gambleName;
                    newGambles.push(newGamble);

                }
                if(odd.moneyline){
                    newGamble.gambleName = game_subsidiary + '1X2';
                    if(event.periods && event.periods.length > 0){
                        var teamAwin = (teamAScore - teamBScore) > 0;
                        newGamble.optionA.win = teamAwin? 1: 0;
                        newGamble.optionB.win = !teamAwin? 1: 0;

                    }
                    newGamble.optionA.name = teamA;
                    newGamble.optionA.teamA = teamA;
                    newGamble.optionA.odds = CONSTANTS.parseOdds(odd.moneyline.home, odd.maxMoneyline);

                    newGamble.optionB.name = teamB;
                    newGamble.optionB.teamB = teamB;
                    newGamble.optionB.odds = CONSTANTS.parseOdds(odd.moneyline.away, odd.maxMoneyline);
                    newGamble.gambleSourceAndSourceId = CONSTANTS.SOURCE.PING_BO + event.id + newGamble.gambleName;
                    newGambles.push(newGamble);

                }
                if(odd.totals&& odd.totals.length > 0){
                    newGamble.gambleName = game_subsidiary + ' ' +  '大小';
                    if(event.periods && event.periods.length > 0){
                        var teamAwin = (teamAScore - teamBScore) - odd.totals[0].points> 0;
                        newGamble.optionA.win = teamAwin? 1: 0;
                        newGamble.optionB.win = !teamAwin? 1: 0;

                    }
                    newGamble.optionA.name = '大于' + odd.totals[0].points;
                    newGamble.optionA.teamA = teamA;
                    newGamble.optionA.odds = CONSTANTS.parseOdds(odd.totals[0].over, odd.maxTotal);
                    newGamble.optionB.name = '小于' + odd.totals[0].points;
                    newGamble.optionB.teamB = teamB;
                    newGamble.optionB.odds = CONSTANTS.parseOdds(odd.totals[0].under, odd.maxTotal);
                    newGamble.gambleSourceAndSourceId = CONSTANTS.SOURCE.PING_BO + event.id + newGamble.gambleName;
                    newGambles.push(newGamble);
                }
            return LeagueModel.findOne({ leagueName: event.leagueName }).then(function (league) {
                if(!league && gameType && gameType < 4){
                    var newLeague = {
                        gameType: gameType,
                        leagueName: leagueName,
                        leagueSource: CONSTANTS.SOURCE.PING_BO
                    };
                    return new LeagueModel(newLeague).save()
                }else{

                    return league;
                }

            }).then(function (league) {
                return Q.all(newGambles.map(function (item) {
                    item.optionA.riskFund = league.riskFund || 1000;
                    item.optionB.riskFund = league.riskFund || 1000;
                    item.optionA.payCeiling = league.payCeiling || 10000;
                    item.optionB.payCeiling = league.payCeiling || 10000;
                    item.league = league._id;
                    if(newGamble.gameType && newGamble.gameType < 4 && newGamble.endTime ){
                        return GambleModel.findOne({ gambleSourceAndSourceId: item.gambleSourceAndSourceId }).then(function (results) {
                            if(results){
                                console.log("pingbo 更新temp Gamble");
                                return GambleModel.update({ gambleSourceAndSourceId: results.gambleSourceAndSourceId }, { '$set': { endTime: item.endTime, optionA: item.optionA, optionB: item.optionB, isRefreshed: true } });
                            }else{
                                console.log('pingbo 创建temp Gamble');
                                return new GambleModel(newGamble).save();
                            }
                        })
                    }
                    return ''
                }))
            })
        }).then(function () {
                return  ping_Event.update({ id: event.id }, {'$set': {exist_production: CONSTANTS.EXIST_PRODUCTION.EXIST}})
            })
        }else {
            return ''
        }
    })))
})
};
exports.synchroPingDataToTemp = function () {
    fetchSettledEventData().then(function () {
        return fetchOddsdEventData();
    }).then(function () {
        return fetchUnSettledEventData();
    }).then(function () {
        return fetchLeagueData();
    }).then(function () {
        return fetchPingbetData();
    }).then(function () {
        console.log("success")
    });
};
