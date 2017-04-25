/**
 * Created by tonghema on 25/04/2017.
 */
var Match = require("../models").MatchModel;
var respondSuccess = require('../utils/respond_fileter').respondSuccess;
var respondFailure = require('../utils/respond_fileter').respondFailure;
var Q = require('q');
var CONSTANTS = require('../utils/constants');
var _ = require('lodash');
var request = require('request');
/**
 * 获取赛程列表
 * @param req
 * @param res
 */
exports.getMatchesByList = function (req, res) {
    var page =  parseInt(req.query.page) || CONSTANTS.PAGINATE.PAGE;
    var limit = parseInt(req.query.limit) || 100;
    var options = {
        searchOption: {
            gameType: parseInt(req.query.gameType) || 1
        },
        limit: limit,
        page: page,
        sortOption: {
            createdAt: -1
        }
    };

    Match.findAllAndCount(options).then(function (results) {
        if(!results)
            respondFailure(res, 404, '队伍不存在');
        else
            respondSuccess(res, { matches: results[0], count: results[1] }, 200);

    });
};