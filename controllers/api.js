'use strict';
var async = require('async');
var models = require('../models');
var BetModel = models.BetModel;
var NestedBetModel = models.NestedBetModel;
var CONSTANTS = require('../utils/CONSTANTS');
/**
 * 获取 没有战队的 bets data
 * @param req
 * @param res
 */
exports.getBetsByStatus = function (req, res) {
    BetModel.find({teamStatus: CONSTANTS.EXIST_PRODUCTION.NO_EXIST}, function (err, bets) {
        if (err) {
            console.log(err);
        }
        res.end(JSON.stringify({
            status: CONSTANTS.EXIST_PRODUCTION.NO_EXIST,
            data: bets
        }));
    });
};

/**
 * 更新 bet 信息
 * 添加战队
 * @param req
 * @param res
 */
exports.updateStatus = function (req, res) {
    var betId = req.url.substr(6),
        updateBetStatus = function (callback) {
            BetModel.update({id: betId}, {$set: {teamStatus: CONSTANTS.EXIST_PRODUCTION.EXIST}}, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        updateNestedBetStatus = function (callback) {
            NestedBetModel.update({game_id: betId}, {$set: {teamStatus: CONSTANTS.EXIST_PRODUCTION.EXIST}}, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        };
    async.parallel(
        [
            updateBetStatus,
            updateNestedBetStatus
        ],
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log('成功');
            exports.getBetsByStatus(req, res);
        }
    );
};
