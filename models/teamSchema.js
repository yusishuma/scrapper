/**
 * Created by tonghema on 18/04/2017.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/CONSTANTS');
var teamSchema = new Schema({

    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    /**
     * 战队是否存在
     */
    teamStatus: {
        type: Number,
        default: CONSTANTS.BET_TEAM.HAVE_TEAMS,
        require: true
    },
    teamId: { // 正服 队伍ID
        type: String,
        unique: true,
        index: true
    },
    alias: { // 别名
        type: [{
            id: String,
            source: Number,
            name: String
        }]
    },
    exist_production: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
    }
});

module.exports = teamSchema;