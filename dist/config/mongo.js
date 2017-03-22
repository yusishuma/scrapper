/**
 * Created by matonghe on 15/03/2017.
 */
"use strict";

var mongoose = require("mongoose");
var logger = require("../middlewares/log4j/logger").logger;
require('dotenv').config();
// 自动重练mongodb
var connectMongo = function connectMongo() {
    "use strict";
    return mongoose.connect("mongodb://localhost:27017/test", {
        mongos: false

    }, function (err) {
        if (err) {
            logger.warn('与mongodb断开连接 %ssec 后重试', process.env.RECONNECT_TIME / 1000);
            setTimeout(connectMongo, process.env.RECONNECT_TIME);
        } else {
            logger.info('已连接到mongodb');
        }
    });
};
exports.mongoConnection = mongoose.createConnection(process.env.DB_URI);
mongoose.Promise = require('q').Promise;
exports.connectMongo = connectMongo;
//# sourceMappingURL=mongo.js.map