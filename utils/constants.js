/**
 * Created by matonghe on 15/03/2017.
 *
 *  常量
 */

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
exports.SESSION = {
    SECRET: 'fluorescence',
    MAX_AGE: 24 * 60 * 60 * 1000 * 30
};