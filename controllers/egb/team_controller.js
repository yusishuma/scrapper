var request = require('request');
var CONSTANTS = require('../../utils/constants');
var models = require('../../models/index');
var BetModel = models.BetModel;
var TeamModel = models.TeamModel;
var Q = require('q');
var _ = require('lodash');
var qlimit = require('qlimit');
var limit = qlimit(10);
/**
 * 同步战队到Temp
 */
exports.synchroTeamsToTemp = function () {
    return BetModel.find({exist_production: { '$nin': CONSTANTS.EXIST_PRODUCTION.EXIST }}).then(function (bets) {
    if(bets.length == 0){
        return "success"
    }
    else
        return  Q.all(bets.map(limit(function (bet) {

            var teamNames = [bet.gamer_1, bet.gamer_2];
                return Q.all(teamNames.map(function(teamName){
                    var newTeam = {teamName: teamName, gameType: CONSTANTS.translateGameType(bet.game)};
                    return TeamModel.findOne({teamName: teamName, gameType: CONSTANTS.translateGameType(bet.game)}).then(function (team) {
                        if(team){
                            return '已存在'
                        }else{
                            console.log('创建temp team');
                            return new TeamModel(newTeam).save();
                        }
                    })
                }))
        })));
    })
};
