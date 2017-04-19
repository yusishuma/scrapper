/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var async = require('async');

/**
 * 生成名称
 */
var generateMatchName = function (teamA, teamB) {
   
    return teamA + ' VS ' + teamB;
};

/**
 * 创建比赛
 */
exports.createMatch = function (bet, defer) {

    var url = CONSTANTS.SERVER_URL + '/addmatch',
        data = {
            gameType: CONSTANTS.translateGameType(bet.game),
            matchName: generateMatchName(bet.gamer_1.nick, bet.gamer_2.nick),
            gameStartTime: bet.date * 1000,
            matchSource: bet.source,
            matchSourceId: bet.id,
            teamA: bet.teamA,
            teamB: bet.teamB,
            teamAOdds: bet.coef_1,
            teamBOdds: bet.coef_2,
            teamAScore: bet.gamer_1.points,
            teamBScore: bet.gamer_2.points,
            leagues: bet.leagueId
        };
    console.log(data);
    request.post({url: url, form: data, json: true}, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            if (body.status) {
                console.log('比赛创建成功: ' + bet.id);
                bet.matchId = body.data._id;
                BetModel.update({ id: bet.id }, {'$set': { matchId: bet.matchId }}, function (err, result) {
                    console.log(result);
                    NestedBetModel.update({ game_id: bet.id }, {'$set': { matchId: bet.matchId }},{'multi': true}).exec(defer);
                });
            } else {
                console.log('比赛创建失败: ' + bet.id );
                defer(null, bet);
            }
        } else {
            console.log('比赛创建失败: ' + bet.id + '..' + err);
            defer(null);
        }
    });
};

/**
 * 更新比赛
 */
exports.updateMatch = function (match, bet, defer) {
    console.log('更新比赛:' + bet.id);
    var url = CONSTANTS.SERVER_URL + '/matchupdate',
    data = {
        _id: match._id,
        teamAOdds: bet.coef_1,
        teamBOdds: bet.coef_2,
        teamAScore: bet.gamer_1.points,
        teamBScore: bet.gamer_2.points
    };
    request.post({url: url, form: data, json: true}, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            bet.matchId = body.data._id;
            BetModel.update({ id: bet.id }, {'$set': { matchId: bet.matchId }}, function (err, result) {
                NestedBetModel.update({ game_id: bet.id }, {'$set': { matchId: bet.matchId }},{'multi': true}).exec(defer);
            });
        }else{
            defer(null, bet);
        }
    });
};

/**
 * 检测比赛是否存在
 */
exports.checkMatchExist = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, teamStatus: CONSTANTS.BET_TEAM.HAVE_TEAMS , 'leagueId': { '$exists': true }}).then(function (bets) {

        async.mapLimit(bets, 20, function (bet, defer) {
            var url = CONSTANTS.SERVER_URL + '/matchsource?matchSource=' + CONSTANTS.SOURCE + '&matchSourceId=' + bet.id;
            request.get({url: url, json: true}, function (err, res, body) {
                if (!err && res.statusCode === 200) {
                    if (body.status) {
                        bet.matchId = body.data._id;
                        bet.teamA = body.data.teamA;
                        bet.teamB = body.data.teamB;
                        // 更新未结束比赛信息
                        console.log('更新未结束比赛信息');
                        exports.updateMatch(body.data, bet, defer);
                    } else {
                        console.log('创建比赛');
                        exports.createMatch(bet, defer);
                    }
                }else {
                    console.log('获取比赛信息失败');
                    defer(null);
                }
            });
        }, function (err, result) {
            return 'success';
        });
    })
};
