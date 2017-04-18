/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../utils/CONSTANTS');
var Q = require('q');
var _ = require('lodash');
var models = require('../models');
var BetModel = models.BetModel;
var async = require('async');

/**
 * 检测赛事是否存在,如果不存在则创建赛事
 */
exports.checkLeaguesExist = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
    if(bets.length == 0){
        console.log('success');
        return "success"
    }
    else
        async.mapLimit(bets, 20, function (bet, defer) {
            var fetchUrl = CONSTANTS.SERVER_URL + '/leaguesource?leagueSource=' + CONSTANTS.SOURCE + '&leagueName=' + bet.tourn,
                createUrl = CONSTANTS.SERVER_URL + '/leagues',
                putUrl = CONSTANTS.SERVER_URL + '/leaguesupdate',
                league = {
                    gameType: CONSTANTS.translateGameType(bet.game),
                    leagueName: bet.tourn,
                    leagueImageUrl: 'http://static.idoool.com/upload/large/9cb73b9a64e61244223f1def5a7223e8.large.jpeg',
                    teams: _.compact([bet.teamA, bet.teamB]),
                    // 赛事开始结束时间，伪时间
                    division: 'global',
                    leagueSource: bet.source
                };
                request.get({url: fetchUrl, json: true}, function (err, res, body) {
                    if (!err && res.statusCode === 200) {
                        if (body.status) {
                            console.log('赛事' + bet.tourn + '存在');
                            bet.leagueId = body.data._id;
                            var newTeams = _.concat(_.compact(league.teams), body.data.teams);
                            /**
                             *  有新的teams 则 更新赛事
                             */
                            league._id = body.data._id;
                            league.teams = newTeams;
                            request.post({url: putUrl, form: league, json: true}, function (err, res, body) {
                                if (!err && res.statusCode === 200) {
                                    if (body.status) {
                                        console.log('更新赛事 ' + bet.tourn + ' 成功！');
                                        defer(null, bet);
                                    } else {
                                        console.log('更新赛事 ' + bet.tourn + ' 失败！');
                                        defer(null, bet);
                                    }
                                }else {
                                    console.log('更新赛事 ' + bet.tourn + ' 失败！');
                                    defer(null, bet);
                                }
                            });
                        }else {
                            console.log('赛事' + bet.tourn + '不存在');
                            /**
                             * 创建赛事
                             */
                            request.post({url: createUrl, form: league, json: true}, function (err, res, body) {
                                // console.log(league);
                                if (!err && res.statusCode === 200) {
                                    if (body.status) {
                                        console.log('创建赛事 ' + bet.tourn + ' 成功！');
                                        bet.leagueId = body.data._id;
                                        defer(null, bet);
                                    } else {
                                        console.log('创建赛事 ' + bet.tourn + ' 失败！');
                                        defer(null);
                                    }
                                } else {
                                    console.log('create leagues error');
                                    defer(null);

                                }
                            });
                        }
                    }
                });
        }, function (err, result) {
            return 'success';
        });
    });

};