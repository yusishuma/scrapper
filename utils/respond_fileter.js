/**
 * Created by tonghema on 24/03/2017.
 */
/**
* 向客户端发送请求成功的响应
*/
exports.respondSuccess = function (res, data, status, successMsg) {
    res.status(status).json({
        msg: successMsg || 'success',
        status: 1,
        data: data || {}
    });
};

/**
 * 向客户端发送请求失败的响应
 */
exports.respondFailure = function (res, status, failureMsg) {
    res.status(status).json({
        status: 0,
        msg: failureMsg || 'failure',
        data: {}
    });
};