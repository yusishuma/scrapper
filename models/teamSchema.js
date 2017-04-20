/**
 * Created by tonghema on 18/04/2017.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/constants');
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
    isExist: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.EXIST,
        require: true
    },
    teamId: { // 正服 队伍ID
        type: String
    },
    // 游戏的类型
    gameType: {
        type: Number,
        required: true
    },
    // 战队名称
    teamName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    // ,
    // alias: { // 别名
    //     type: [{
    //         id: String,
    //         source: Number,
    //         name: String
    //     }]
    // }
});
teamSchema.options.toJSON.transform = function (doc, ret) {
    
}
module.exports = teamSchema;