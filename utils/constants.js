/**
 * Created by matonghe on 15/03/2017.
 *
 *  常量
 */
var dotenv = require('dotenv');
// var variableExpansion = require('dotenv-expand');
// const myEnv = dotenv.config();
// variableExpansion(myEnv);
/**
 *  性别
 * @type {{UNKNOWN: number, MALE: number, FEMALE: number}}
 */
exports.GENDER = {
    UNKNOWN: 0,
    MALE: 1,
    FEMALE: 2
};
exports.PAGE = {
    NUM: 1
};
exports.MONGODB_ENV = {
    DB_URI: 'mongodb://localhost:27017/fluorescence',
    RECONNECT_TIME: 300
};

exports.SERVER_URL = "http://192.168.2.29:3000/";

exports.ROLE = {
    CUSTOMER: 0,
    ADMIN: 1,
    DESIGNER: 2
};
exports.STATUS = {
        UNPUBLISHED: 0, //未发布
        PUBLISHED: 1,// 已发布
        PREPARING: 2,//准备中
        STARTED: 3,//已开始
        ENDED:4,//已结束
        DELETED: 5//被删除
    };
exports.SESSION = {
    SECRET: 'fluorescence',
    MAX_AGE: 24 * 60 * 60 * 1000 * 30
};