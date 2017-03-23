/**
 * Created by matonghe on 14/03/2017.
 */
"use strict";

var Q = require("q");
var mongoose = require("mongoose");
var CONSTANTS = require("../utils/constants");
var UserSchema = require("./user");
mongoose.Promise = require('q').Promise;

/**
 * 分页
 * @param options
 * @returns {*}
 */
mongoose.Model.findAllAndCount = function (options) {
    var searchOption = options.searchOption || {};
    var sortOption = options.sortOption || {};
    var limit = options.limit || CONSTANTS.PAGE.NUM;
    var field = options.field || {};
    var page = options.page || 1;
    var skipNum = page * limit - limit;
    var populateOpt = [];
    return Q.all([this.find(searchOption, field).deepPopulate(populateOpt).skip(skipNum).limit(limit).sort(sortOption), this.count(searchOption)]);
};

// 数组属性分页
mongoose.Model.paginateForPro = function (id, property, options, callback) {
    var searchOption = options.searchOption || {};
    searchOption._id = id;
    var limit = options.limit || CONSTANTS.PAGE.NUM;
    var totalCount = options.totalCount;
    var page = options.page || 1;
    var populateOpt = [];
    var field = options.field || {};
    if (totalCount - page * limit < 0) {
        field[property] = {
            '$slice': totalCount - (page - 1) * limit

        };
    } else {
        field[property] = {
            '$slice': [totalCount - page * limit, limit]

        };
    }

    return this.findOne(searchOption, field).deepPopulate(populateOpt);
};

exports.User = mongoose.model("user", UserSchema);
//# sourceMappingURL=index.js.map