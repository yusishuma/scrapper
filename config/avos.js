/**
 * Created by tonghema on 29/03/2017.
 */
var requestJson = require('request-json');
var CONSTANTS = require('../utils/constants');

/**
 * 短信验证 客户端
 */
exports.client = requestJson.createClient('https://api.leancloud.cn/', {
    headers: {
        'X-LC-Id': CONSTANTS.AVOS.APP_ID,
        'X-LC-Key': CONSTANTS.AVOS.APP_KEY,
        'Content-Type': 'application/json'
    }
});