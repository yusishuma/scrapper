/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var GambleModel = models.GambleModel;
var LeagueModel = models.LeagueModel;
var Q = require('q');
var qlimit = require('qlimit');
var limit = qlimit(10);

/**
 * 同步赛程到Temp
 */
exports.synchroGamblesToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, teamStatus: CONSTANTS.EXIST_PRODUCTION.EXIST }).then(function (bets) {
        if(bets.length == 0){
            console.log('success');
            return "success"
        }
        else// Bet
            return translateGambles(bets)

    }).then(function () {
        // NestedBet
        return NestedBetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }, teamStatus: CONSTANTS.EXIST_PRODUCTION.EXIST }).then(function (bets) {
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
        var gambleName = bet.game_id
            ? bet.gamer_1.nick
            : '1X2';

        var optionA = bet.parent_gamer_1.nick? bet.parent_gamer_1.nick: '';
        var optionB = bet.parent_gamer_1.nick? bet.parent_gamer_2.nick: '';

        var newGamble = {
            gameType: CONSTANTS.translateGameType(bet.game),
            gambleType: 1,
            gambleName: gambleName,     //赌局名称
            endTime: bet.date * 1000,        //赌局期限
            match: bet.matchId,       //所属赛程ID
            gambleSource: bet.source,   //赌局数据来源
            gambleSourceId: bet.id, //赌局来源ID
            optionA: {
                name:'',
                odds: bet.coef_1,
                win: bet.gamer_1.win
            },
            optionB: {
                name:'',
                odds: bet.coef_1,
                win: bet.gamer_1.win
            }
        };
        return LeagueModel.findOne({ leagueName: bet.tourn }).then(function (league) {
            if(!league){
                console.log("temp： "+ bet.tourn +"赛事不存在");
                return ""
            }else{
                newGamble.optionA.riskFund = league.riskFund;
                newGamble.optionB.riskFund = league.riskFund;
                newGamble.optionA.payCeiling = league.payCeiling;
                newGamble.optionB.payCeiling = league.payCeiling;
            }

            return GambleModel.find({ matchName: CONSTANTS.generateMatchName(bet.gamer_1.nick, bet.gamer_2.nick) }).then(function (matches) {
                if(matches && matches.length > 0){
                    return null;
                }else{
                    return new GambleModel(newGamble).save();
                }
            })
        })
    })));
}


