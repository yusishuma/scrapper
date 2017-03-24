/**
 * Created by matonghe on 15/03/2017.
 */
var mongoose = require("mongoose");
var logger = require("../middlewares/log4j/logger").logger;
var CONSTANTS = require('../utils/constants');
// 自动重练mongodb
var connectMongo = function () {
    "use strict";
    return mongoose.connect(CONSTANTS.MONGODB_ENV.DB_URI, {
        mongos: false

    }, function (err) {
        if (err) {
            logger.warn('与mongodb断开连接 %ssec 后重试', CONSTANTS.MONGODB_ENV.RECONNECT_TIME / 1000);
            setTimeout(connectMongo, CONSTANTS.MONGODB_ENV.RECONNECT_TIME);

        }
        else {
            logger.info('已连接到mongodb');
        }
    });
};
exports.mongoConnection = mongoose.createConnection(CONSTANTS.MONGODB_ENV.DB_URI);
mongoose.Promise = require('q').Promise;
exports.connectMongo = connectMongo;