/**
 * Created by tonghema on 28/03/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {get} /index 获取首页信息
 * @apiName GetIndexInfo
 * @apiGroup Index
 *
 *
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.title   活动 标题
 * @apiSuccess {String} data.cover   活动 封面
 * @apiSuccess {String} data.description   活动 描述
 * @apiSuccess {Date} data.startDate   活动 开始时间
 * @apiSuccess {Date} data.endDate   活动 结束时间
 * @apiSuccess {Objects} data.productions   活动 商品列表
 * @apiSuccess {Number} data.status {0 未发布，1 已发布} 活动状态 接口得到的数据都是已发布的.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "msg": "success",
     "status": 1,
     "data": {
         "title": "test strategy",
         "description": "test strategy description",
         "updatedAt": "2017-03-27 16:38:57",
         "createdAt": "2017-03-27 16:38:57",
         "endDate": "2017-03-27 16:38:57",
         "startDate": "2017-03-27 16:38:57",
         "productions": [
             {
                 "price": 100,
                 "amount": 50,
                 "cover": "http://192.168.2.29:3000/test1_cover.png",
                 "title": "精品卫衣",
                 "designer": {
                     "username": "15911020373",
                     "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
                     "design": {
                         "title": "一个好的创意",
                         "img": "",
                         "content": "就是个好的创意，就这么不讲理"
                     },
                     "gender": 1,
                     "nickname": "yusi",
                     "updatedAt": "2017-03-28 10:43:30",
                     "createdAt": "2017-03-28 10:43:30",
                     "userId": "58d878838b81190732fdd202"
                 },
                 "description": "test production description",
                 "showImages": [
                     "http://192.168.2.29:3000/test1_show1.png",
                     "http://192.168.2.29:3000/test1_show2.png",
                     "http://192.168.2.29:3000/test1_show3.png"
                 ],
                 "status": 1,
                 "updatedAt": "2017-03-28 10:43:30",
                 "createdAt": "2017-03-28 10:43:30",
                 "productionId": "58d8d1ae56e9cb0ee6235303"
             }
         ],
         "status": 1,
         "strategyId": "58d8cfa18c9c200ebaae2239",
         "cover": "http://192.168.2.29:3000/undefined"
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
 * @api {post} /login 登陆
 * @apiName login
 * @apiGroup Index
 *
 *
 * @apiParam {String} username   用户名
 * @apiParam {String} password   用户密码
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.username   用户名
 * @apiSuccess {String} data.nickname   昵称
 * @apiSuccess {String} data.avatar   用户头像
 * @apiSuccess {Object} data.design   用户设计思路文稿
 * @apiSuccess {String} data.design.title   用户设计标题
 * @apiSuccess {String} data.design.content   用户设计内容
 * @apiSuccess {String} data.design.img   用户设计图
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
        "design": {
          "title": "一个好的创意",
          "img": "http://192.168.2.29:3000/test1_img.png",
          "content": "我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。"
        },
        "role": "0",
        "gender": 1,
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
 * @apiGroup Index
 *
 *
 * @apiParam {String} username   用户名
 * @apiParam {String} password   用户密码
 * @apiParam {String} nickname   用户密码
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.username   用户名
 * @apiSuccess {String} data.nickname   昵称
 * @apiSuccess {String} data.avatar   用户头像
 * @apiSuccess {Object} data.design   用户设计思路文稿
 * @apiSuccess {String} data.design.title   用户设计标题
 * @apiSuccess {String} data.design.content   用户设计内容
 * @apiSuccess {String} data.design.img   用户设计图
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
        "gender": 1,
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
 * @api {post} /requestSmsCode 获取短信验证码
 * @apiName requestSmsCode
 * @apiGroup Index
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
 * @apiGroup Index
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