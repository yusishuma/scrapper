/**
 * Created by matonghe on 21/03/2017.
 */
var request = require('request');
var CONSTANTS = require('../../utils/constants');
var Q = require('q');

/**
 * 新增赌局
 */
exports.createGamble = function (bet, defer) {
    console.log('生成赌局');
    var url = CONSTANTS.SERVER_URL + '/addgamble',
        gambleName = bet.game_id
            ? bet.gamer_1.nick
            : '1X2';
    var winnerName;
    if(bet.winner === 1 || bet.winner === 2){
        winnerName = bet.game_id
            ? bet['parent_gamer_' + bet.winner].nick + bet['gamer_' + bet.winner].nick
            : bet['gamer_' + bet.winner].nick;
    }
    var nestBetTeamA = bet.game_id? bet.parent_gamer_1.nick: '';
    var nestBetTeamB = bet.game_id? bet.parent_gamer_2.nick: '';

    var newGamble = {
        gameType: CONSTANTS.translateGameType(bet.game),
        gambleType: 1,
        gambleName: gambleName,     //赌局名称
        endTime: bet.date * 1000,        //赌局期限
        match: bet.matchId,       //所属赛程ID
        gambleSource: bet.source,   //赌局数据来源
        gambleSourceId: bet.id, //赌局来源ID
        gambleOptionA: nestBetTeamA + bet.gamer_1.nick,
        gambleOptionB:  nestBetTeamB + bet.gamer_2.nick,
        optionAOdds: bet.coef_1,
        optionBOdds: bet.coef_2,
        winGambleOption: winnerName

    };
    if(bet.winner === -1){
        newGamble.gambleStatus = 4;
    }
        request.post({url: url, form: newGamble, json: true}, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                if (body.status) {
                    console.log('生成赌局成功！');
                    defer(null, bet);
                } else {
                    console.log('生成赌局失败!', res.statusCode, err);
                    defer(null);
                }
            } else {
                defer(null);
            }
        });
};

/**
 * 更新赌局
 */
exports.updateGamble = function (gambleId, bet, defer) {
    console.log('更新赌局 :' + bet.id);
    //获取获胜队伍 ID
    //bet.winner === 3  平局
    //bet.winner === -1 取消
    var  winnerName;
    if(bet.winner === 1 || bet.winner === 2){
        winnerName = bet.game_id
            ? bet['parent_gamer_' + bet.winner].nick + bet['gamer_' + bet.winner].nick
            : bet['gamer_' + bet.winner].nick;
    }
    var data = {
        gambleId: gambleId,
        teamAOdds: bet.coef_1,
        teamBOdds: bet.coef_2,
        winGambleOption: winnerName
    };
    if(bet.winner === -1){
        data.gambleStatus = 4;
    }
    var postUrl = CONSTANTS.SERVER_URL + '/gambleupdate';

    request.post({url: postUrl, form: data, json: true}, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            if (body.status) {
                defer(null, bet);
            } else {
                defer(null);
            }
        } else {
            defer(null);
        }
    });
};

/**
 * 检测赌局是否存在
 */

exports.checkGambleExist = function (bet, defer) {
        var url = CONSTANTS.SERVER_URL + '/gamblesource?gambleSource=' + CONSTANTS.SOURCE + '&gambleSourceId=' + bet.id;
        request.get({url: url, json: true}, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                if (body.status) {
                    // 存在的话检测更新赌局
                    bet.betExist = true;
                    console.log('赌局存在:' + bet.id);
                    exports.updateGamble(body.data._id, bet, defer);
                } else {
                    bet.betExist = false;
                    console.log('赌局不存在:');
                    exports.createGamble(bet, defer);
                }
            }else {
                defer(null);
            }
        });
};




