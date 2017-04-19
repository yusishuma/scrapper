/**
 * Created by tonghema on 18/04/2017.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../../utils/constants');
// 赛事schema
var leagueSchema = new Schema({
    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    // 所属游戏
    gameType: {
        type: Number,
        required: true
    },
    // 赛事名称
    leagueName: {
        type: String,
        required: true
    },
    // 赛事图片
    leagueImageUrl: {
        type: String
    },
    // 风险金
    riskFund: {
        type: Number
    },
    // 单注赔付上限
    payCeiling: {
        type: Number
    },
    level: {
        type: Number
    },
    /**
     * 赛事是否存在
     */
    leagueStatus: {
        type: Number,
        default: CONSTANTS.BET_TEAM.HAVE_TEAMS,
        require: true
    },
    // 赛事来源
    leagueSource: {
        type: Number
    }
});
module.exports = leagueSchema;