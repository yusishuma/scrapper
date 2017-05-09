'use strict';
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var MatchModel = models.MatchModel;
var TeamModel = models.TeamModel;
var GambleModel = models.GambleModel;
var LeagueModel = models.LeagueModel;
var spider = require('./egb_spider');
var Q = require('q');
var qlimit = require('qlimit');
var limit = qlimit(10);
var _ = require('lodash');
/**
 * 同步赛事到Temp
 */
var synchroLeaguesToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
        if(bets.length == 0){
            console.log('success');
            return "success"
        }
        else
            return Q.all(bets.map(limit( function (bet) {
                var league = {
                    gameType: CONSTANTS.translateGameType(bet.game),
                    leagueName: bet.tourn,
                    leagueSource: bet.source
                };
                LeagueModel.findOne({ leagueName: bet.tourn }).then(function (results) {

                    if(results){
                        return '已存在'
                    }else{
                        console.log('egb 创建temp league');
                        return new LeagueModel(league).save()
                    }
                })
            })));
    });

};
/**
 * 同步赛程到Temp
 */
var synchroMatchesToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
        if(bets.length == 0){
            console.log('success');
            return "success"
        }
        else
            return Q.all(bets.map(limit(function (bet) {
                var teamA = CONSTANTS.parseTeamName(bet.gamer_1.nick),
                    teamB = CONSTANTS.parseTeamName(bet.gamer_2.nick);
                var newMatch = {
                    gameType: CONSTANTS.translateGameType(bet.game),
                    matchName: CONSTANTS.generateMatchName(teamA, teamB),
                    matchSource: bet.source,
                    matchSourceId: bet.id,
                    teamA: teamA,
                    teamB: teamB,
                    league: bet.tourn
                };
                return MatchModel.findOne({ matchName: CONSTANTS.generateMatchName(teamA, teamB) }).then(function (match) {
                    if(match){
                        console.log('match 已存在');
                        return '';
                    }else{
                        console.log('egb 创建temp match');
                        return new MatchModel(newMatch).save();
                    }
                }).fail(function () {
                    return ''
                })
            })));
    })
};
/**
 * 同步战队到Temp
 */
var synchroTeamsToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
        if(bets.length == 0){
            return "success"
        }
        else
            return  Q.all(bets.map(limit(function (bet) {

                var teamNames = [CONSTANTS.parseTeamName(bet.gamer_1.nick), CONSTANTS.parseTeamName(bet.gamer_2.nick)];
                return Q.all(teamNames.map(function(teamName){
                    var newTeam = {teamName: teamName, gameType: CONSTANTS.translateGameType(bet.game), teamSource: CONSTANTS.SOURCE.EGB};
                    return TeamModel.findOne({teamName: teamName}).then(function (team) {
                        if(team){
                            return '已存在'
                        }else{
                            console.log('egb 创建temp team');
                            return new TeamModel(newTeam).save();
                        }
                    })
                })).fail(function () {
                    return '';
                })
            })));
    })
};

/**
 * 同步赛程到Temp
 */
var synchroGamblesToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {

        if(bets.length == 0){
            console.log('success');
            return "success"
        }
        else// Bet
            return translateGambles(bets)

    }).then(function () {
        // NestedBet
        return NestedBetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
            if(bets.length == 0){
                console.log('success');
                return "success"
            }
            else
                return translateGambles(bets)
        })
    });
};

var translateGambles = function (bets) {
    return Q.all(bets.map(limit(function (bet) {
        var gambleName = '', teamA = '', teamB = '', optionAName = '', optionBName = '', game_subsidiary = '';
        if(!bet.game_id){

            var gameNameStr = _.replace(_.replace(bet.gamer_1.nick, '(L.)', ''), 'Live', '');
            if(gameNameStr.indexOf('(') !== -1){
                game_subsidiary = _.lowerCase(gameNameStr.substr(gameNameStr.indexOf('('), gameNameStr.length));
            }

            teamA = CONSTANTS.parseTeamName(bet.gamer_1.nick);
            teamB = CONSTANTS.parseTeamName(bet.gamer_2.nick);
            gambleName = game_subsidiary + ' 独赢';
            optionAName = teamA;
            optionBName = teamB;

        }else{
            var gameNameStr = _.replace(_.replace(bet.gamer_1.nick, '(L.)', ''), 'Live', '');
            if(gameNameStr.indexOf('on') !== -1){
                game_subsidiary = gameNameStr.split('on')[1]
            }else{
                gameNameStr = bet.gamer_1.nick;
            }
            teamA = CONSTANTS.parseTeamName(bet.parent_gamer_1.nick);
            teamB = CONSTANTS.parseTeamName(bet.parent_gamer_2.nick);
            if(bet.gamer_1.game_name){
                gambleName = game_subsidiary + ' ' +  '大小';
                var str ='';
                if( gameNameStr.split('on').length > 0){
                    str = gameNameStr.split('on')[0].replace('Over', '');
                    str = str.replace('over', '');
                }
                optionAName = '大于 ' + str;
                optionBName = '小于 ' + str;
            }else{
                gambleName = bet.gamer_1.nick;
                optionAName = teamA;
                optionBName = teamB;
            }
        }
        var newGamble = {
            gameType: CONSTANTS.translateGameType(bet.game),
            gambleType: 1,
            gambleName: gambleName,     //赌局名称
            endTime: bet.date * 1000,        //赌局期限
            match: CONSTANTS.generateMatchName(teamA, teamB),       //所属赛程ID
            gambleSource: bet.source,   //赌局数据来源
            gambleSourceId: bet.id, //赌局来源ID
            gambleSourceAndSourceId: bet.date + bet.id + gambleName,
            optionA: {
                name: optionAName,
                teamA: teamA,
                odds: bet.coef_1,
                win: bet.gamer_1.win
            },
            optionB: {
                name: optionBName,
                teamB: teamB,
                odds: bet.coef_2,
                win: bet.gamer_1.win
            }
        };
        if(bet.status === 3){
            newGamble.gambleStatus = 4
        }else if(bet.status === 2){
            newGamble.gambleStatus = 3
        }else{
            newGamble.gambleStatus = 1
        }
        return LeagueModel.findOne({ leagueName: bet.tourn }).then(function (league) {
            if(!league){
                console.log("temp： "+ bet.tourn +"赛事不存在");
                return ""
            }else{
                newGamble.optionA.riskFund = league.riskFund;
                newGamble.optionB.riskFund = league.riskFund;
                newGamble.optionA.payCeiling = league.payCeiling;
                newGamble.optionB.payCeiling = league.payCeiling;
                newGamble.league = league._id;

            }
            return GambleModel.findOne({ gameType: newGamble.gameType, gambleSourceAndSourceId: newGamble.gambleSourceAndSourceId }).then(function (gambels) {
                if(gambels){
                    return GambleModel.update({ _id: gambels.gambleId }, { '$set': { gambleStatus: newGamble.gambleStatus, endTime: newGamble.endTime, optionA: newGamble.optionA, optionB: newGamble.optionB, isRefreshed: true } });
                }else{
                    return new GambleModel(newGamble).save();
                }
            }).then(function () {
                /**
                 *  BetModel  更新是否存在
                 */
                return BetModel.update({ id: bet.id }, {'$set': {exist_production: CONSTANTS.EXIST_PRODUCTION.EXIST}})
            }).then(function () {
                /**
                 *  BetModel  更新是否存在
                 */
                return NestedBetModel.update({ game_id: bet.game_id }, {'$set': {exist_production: CONSTANTS.EXIST_PRODUCTION.EXIST}},{'multi': true});
            })
        })
    })));
}

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

    return spider.fetchBettingData()
        .then(function (data) {
        if(data.bets && data.nested_bets && data.nested_bets.length > 0 && data.nested_bets.length > 0){
            return fetchBetInfo(data.bets).then(function (result) {
                console.log(result.length, "==================================抓取数据bets=============================================");
                return fetchBetInfo(data.nested_bets).then(function (result) {
                    console.log(result.length, "==================================抓取数据nested_bets======================================");
                    return '抓取到数据'
                });
            });
        }else{
            console.log('未抓取到数据');
            return '未抓取到数据';
        }
    }).then(function () {
        return synchroLeaguesToTemp();
    }).then(function () {
        return synchroTeamsToTemp();
    }).then(function () {
        return synchroMatchesToTemp();
    }).then(function () {
         synchroGamblesToTemp();
    })
};

