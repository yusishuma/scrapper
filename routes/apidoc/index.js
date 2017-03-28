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
                 "cover": "http:// 192.168.2.29:3060/test1_cover.png",
                 "title": "精品卫衣",
                 "designer": {
                     "username": "15911020373",
                     "avatar": "http:// 192.168.2.29:3060/test1_avatar.jpg",
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
                     "http:// 192.168.2.29:3060/test1_show1.png",
                     "http:// 192.168.2.29:3060/test1_show2.png",
                     "http:// 192.168.2.29:3060/test1_show3.png"
                 ],
                 "status": 1,
                 "updatedAt": "2017-03-28 10:43:30",
                 "createdAt": "2017-03-28 10:43:30",
                 "productionId": "58d8d1ae56e9cb0ee6235303"
             }
         ],
         "status": 1,
         "strategyId": "58d8cfa18c9c200ebaae2239",
         "cover": "http:// 192.168.2.29:3060/undefined"
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