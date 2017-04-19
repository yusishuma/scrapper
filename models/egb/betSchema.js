'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../../utils/constants');
var betSchema = new Schema({

    source: {
        type: Number,
        default: CONSTANTS.SOURCE.EGB
    },//来源
    matchId: String,//正式库获取的_id
    leagueId: String,//正式库获取的_id
    teamA: String,//正式库获取的_id
    teamB: String,//正式库获取的_id
    winner: Number,
    tourn: String,
    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: Number,
        default: CONSTANTS.BET_STATUS.NOT_START,
        require: true
    },
    /**
     * 战队是否存在
     */
    teamStatus: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.EXIST,
        require: true
    },
    id:  {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    date: Number,
    game: String,
    coef_1: String,
    coef_2: String,
    gamer_1: {
        nick: String,
        flag: String,
        race: String,
        win: Number,
        points: Number,
        photo: {
            src: String,
            type_on: Boolean
        }
    },
    gamer_2: {
        nick: String,
        flag: String,
        race: String,
        win: Number,
        points: Number,
        photo: {
            src: String,
            type_on: Boolean
        }
    },
    exist_production: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
    }
    }
    , {
    id: false,
    toJSON: {
        getters: true

    }
});

module.exports = betSchema;