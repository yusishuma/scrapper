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
/**
 * 数据库 配置
 * @type {{DB_URI: string, RECONNECT_TIME: number}}
 */
exports.MONGODB_ENV = {
    DB_URI: 'mongodb://localhost:27017/fluorescence',
    RECONNECT_TIME: 300
};

/**
 * 文件服务器路径
 * @type {string}
 */
exports.SERVER_URL = "http://192.168.2.29:3000/";

/**
 * avos 配置 - dev
 * @type {{}}
 */
exports.AVOS = {
    APP_ID: "odvAKLksl71NqBhYhRarjkWs-gzGzoHsz",
    APP_KEY: "Bt9HQ5dSsO1V8kvnT5oitEdF"
};

/**
 * 用户角色
 * @type {{CUSTOMER: number, ADMIN: number, DESIGNER: number}}
 */
exports.ROLE = {
    CUSTOMER: 0,
    ADMIN: 1,
    DESIGNER: 2
};

/**
 * 状态码说明
 * @type {{UNPUBLISHED: number, PUBLISHED: number, PREPARING: number, STARTED: number, ENDED: number, DELETED: number}}
 */
exports.STATUS = {
        UNPUBLISHED: 0, //未发布
        PUBLISHED: 1,// 已发布
        PREPARING: 2,//准备中

        STARTED: 3,//已开始
        ENDED:4,//已结束

        DELETED: 5,//被删除

        PAID: 6,// 已支付
        UNPAID:7, //未支付

        APPLY: 8,// 申请为设计人
        NOT_APPLY: 9 //未申请
    };
exports.PAGINATE = {
    PAGE: 1,
    LIMIT: 20
};

/**
 * session 配置
 * @type {{SECRET: string, MAX_AGE: number}}
 */
exports.SESSION = {
    SECRET: 'fluorescence',
    MAX_AGE: 24 * 60 * 60 * 1000 * 30
};