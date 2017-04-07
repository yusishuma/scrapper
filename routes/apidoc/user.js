/**
 * Created by tonghema on 28/03/2017.
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
 * @apiSuccess {Object} data.design   用户设计思路文稿
 * @apiSuccess {String} data.design.title   用户设计标题
 * @apiSuccess {String} data.design.content   用户设计内容
 * @apiSuccess {String} data.design.img   用户设计图
 * @apiSuccess {String} data.design.weibo   微博
 * @apiSuccess {String} data.design.description   自我评价
 * @apiSuccess {String} data.design.qq   qq号
 * @apiSuccess {String} data.design.work   作品链接
 * @apiSuccess {String} data.role   用户角色
 * @apiSuccess {Number} data.gender { 0 未知，1 男 2 女 } 用户性别.
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
        "design": {
          "title": "一个好的创意",
          "img": "http://192.168.2.29:3000/test1_img.png",
          "content": "我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。"
        },
        "role": 0,
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
 *	"design":{
 *		"title":"北京",
 *		"content":"北京市",
 *		"img":""
 *	}
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