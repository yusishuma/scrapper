'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/CONSTANTS');
var nestedBetSchema = new Schema({

    source: {
        type: Number,
        default: CONSTANTS.SOURCE.EGB
    },//来源
    matchId: String,//正式库获取的_id
    leagueId: String,//正式库获取的_id
    teamA: String,//正式库获取的_id
    teamB: String,//正式库获取的_id
    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: Number,
        require: true
    },
    /**
     * 战队是否存在
     */
    teamStatus: {
        type: Number,
        default: CONSTANTS.BET_TEAM.HAVE_TEAMS,
        require: true
    },
    id: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    date: Number,
    game: String,
    coef_1: String,
    coef_2: String,
    winner: Number,
    tourn: String,
    game_id: String,
    gamer_1: {
        _id: String,
        points: Number,
        win: Number,
        race: String,
        flag: String,
        nick: String,
        nickname: String,
        game_name: String,
        photo: {
            src: String,
            type_on: Boolean
        }
    },
    gamer_2: {
        _id: String,
        points: Number,
        win: Number,
        race: String,
        flag: String,
        nick: String,
        nickname: String,
        game_name: String,
        photo: {
            src: String,
            type_on: Boolean
        }
    },
    parent_gamer_1: {
        nick: String,
        flag: String,
        race: String,
        win: Number,
        points: Number
    },
    parent_gamer_2: {
        nick: String,
        flag: String,
        race: String,
        win: Number,
        points: Number
    },
    exist_production: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
    }

});

module.exports = nestedBetSchema;