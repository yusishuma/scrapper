/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var Q = require('q');
var _ = require('lodash');
var models = require('../../models/index');
var BetModel = models.BetModel;
var LeagueModel = models.LeagueModel;
var qlimit = require('qlimit');
var limit = qlimit(10);

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
        return Q.all(bets.map(limit( function (bet) {
            var league = {
                    gameType: CONSTANTS.translateGameType(bet.game),
                    leagueName: bet.tourn,
                    leagueSource: bet.source
                };
                LeagueModel.find({ leagueName: bet.tourn }).then(function (results) {
                    if(results || results.length === 0){
                            return new LeagueModel(league).save()
                    }else {
                        return null;
                    }
                })
        })));
    });

};
//     var fetchUrl = CONSTANTS.SERVER_URL + '/leaguesource?leagueSource=' + CONSTANTS.SOURCE + '&leagueName=' + bet.tourn,
//         createUrl = CONSTANTS.SERVER_URL + '/leagues',
//         putUrl = CONSTANTS.SERVER_URL + '/leaguesupdate',

