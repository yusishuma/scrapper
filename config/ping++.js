/**
 * Created by tonghema on 05/04/2017.
 */
var CONSTANTS = require('../utils/constants');

var pingpp = require('pingpp')(CONSTANTS.PINGPP.TEST_KEY);
var Q = require('q');
/**
 * 支付
 * @param options
 */
exports.createCharge = function (order, options) {
    var extra = {};
    if(options.channel == 'wx_pub') {
        extra =  {
            open_id: options.openId
        }
    }
    return Q.promise(function (resolve, reject) {
        pingpp.charges.create({
            order_no:  order.order_code,
            app:       { id: CONSTANTS.PINGPP.APP_ID },
            channel:   options.channel,
            amount:    order.payment,
            client_ip: "127.0.0.1",
            currency:  "cny",
            subject:   order.description,
            body:      order.description,
            extra:     extra
        }).then(function (err, result) {
            if(err) reject(err);
            resolve(result);
        });
    })
};