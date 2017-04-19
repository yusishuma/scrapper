/**
 * Created by tonghema on 28/03/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {post} /login 登陆
 * @apiName login
 * @apiGroup User
 *
 *
 * @apiParam {String} username   用户名
 * @apiParam {String} password   用户密码
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.username   用户名
 * @apiSuccess {String} data.nickname   昵称
 * @apiSuccess {String} data.avatar   用户头像
 * @apiSuccess {String} data.role   用户角色
 * @apiSuccess {Number} data.gender { 0 未知，1 男 2 女 } 用户性别.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "success",
      "status": 1,
      "data": {
        "salt": "J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=",
        "username": "15911020373",
        "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
        "updatedAt": "2017-03-27 10:27:15",
        "createdAt": "2017-03-27 10:27:15",
        "role": "0",
        "nickname": "yusi",
        "userId": "58d878838b81190732fdd202"
      }
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */


/**
 * @apiVersion 1.0.0
 * @api {post} /register 用户注册
 * @apiName register
 * @apiGroup User
 *
 *
 * @apiParam {String} username   用户名
 * @apiParam {String} password   用户密码
 * @apiParam {String} nickname   用户密码
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.username   用户名
 * @apiSuccess {String} data.nickname   昵称
 * @apiSuccess {String} data.avatar   用户头像
 * @apiSuccess {String} data.role   用户角色
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "success",
      "status": 1,
      "data": {
        "salt": "J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=",
        "username": "15911020373",
        "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
        "updatedAt": "2017-03-27 10:27:15",
        "createdAt": "2017-03-27 10:27:15",
        "role": "0",
        "nickname": "yusi",
        "userId": "58d878838b81190732fdd202"
      }
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */
/**
 * @apiVersion 1.0.0
 * @api {get} /users/:userId 获取用户信息
 * @apiName GetUserInfo
 * @apiGroup User
 *
 *
 * @apiParam {String} userId [userId, me]参数为me时，获取登陆用户自己的信息
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.username   用户名
 * @apiSuccess {String} data.nickname   昵称
 * @apiSuccess {String} data.avatar   用户头像
 * @apiSuccess {String} data.role   用户角色
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
      "status": 1,
      "data": {
        "salt": "J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=",
        "username": "15911020373",
        "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
        "updatedAt": "2017-03-27 10:27:15",
        "createdAt": "2017-03-27 10:27:15",
        "role": 0,
        "nickname": "yusi",
        "userId": "58d878838b81190732fdd202"
      }
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */

/**
 * @apiVersion 1.0.0
 * @api {put} /users/:userId 更新用户信息
 * @apiName updateUser
 * @apiGroup User
 * @apiParam {String} userId 用户信息Id∑
 *
 * @apiExample {json} Request-Example:
 * {
 *	"userId":"58d878838b81190732fdd202",
 *	"nickname": "昵称",
 *	"avatar": "avatar.jpg",
 *}
 *
 * @apiSuccess {Object} data   请求结果
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "msg": "更新成功！",
     "status": 1,
     "data": {}
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */


/**
 * @apiVersion 1.0.0
 * @api {post} /requestSmsCode 获取短信验证码
 * @apiName requestSmsCode
 * @apiGroup User
 *
 *
 * @apiParam {String} username   用户名
 * @apiSuccess {Object} data   请求结果
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "获取短信验证码成功",
      "status": 1,
      "data": {
      }
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */

/**
 * @apiVersion 1.0.0
 * @api {post} /verifySmsCode 验证短信验证码
 * @apiName verifySmsCode
 * @apiGroup User
 *
 *
 * @apiParam {String} username   用户名
 * @apiParam {String} smsCode   短信验证码
 * @apiSuccess {Object} data   请求结果
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "验证成功",
      "status": 1,
      "data": {
      }
 }
 * @apiError NotFound .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFound"
 *     }
 */