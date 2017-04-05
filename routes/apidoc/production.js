/**
 * Created by tonghema on 28/03/2017.
 */

/**
 * @apiVersion 1.0.0
 * @api {get} /productions/:productionId 获取商品信息
 * @apiName GetProductionInfo
 * @apiGroup Production
 *
 *
 * @apiParam {String} productionId  商品Id
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.price   商品名
 * @apiSuccess {String} data.amount   昵称
 * @apiSuccess {String} data.title   商品标题
 * @apiSuccess {Object[]} data.designers   商品投稿人
 * @apiSuccess {String} data.designers.nickname   投稿人昵称
 * @apiSuccess {String} data.designers.avatar   投稿人头像
 * @apiSuccess {Object} data.designers.design   投稿人设计文稿
 * @apiSuccess {Object[]} data.showImages   商品图列
 * @apiSuccess {Number} data.status { 0 未发布，1 已发布 5 被删除 } 商品性别.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "price": 100,
        "amount": 50,
        "cover": "http://192.168.2.29:3000/test1_cover.png",
        "title": "签名限量版卫衣超级限量版天霸动霸",
        "designers": [{
            "username": "15911020373",
            "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
            "design": {
                "title": "一个好的创意",
                "img": "http://192.168.2.29:3000/test1_img.png",
                "content": "我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。"
            },
            "gender": 1,
            "nickname": "yusi",
            "updatedAt": "2017-03-28 15:08:18",
            "createdAt": "2017-03-28 15:08:18",
            "userId": "58d878838b81190732fdd202"
        }],
        "description": "test production description",
        "updatedAt": "2017-03-27 16:47:42",
        "createdAt": "2017-03-27 16:47:42",
        "showImages": [
            "http://192.168.2.29:3000/test1_show1.png",
            "http://192.168.2.29:3000/test1_show2.png",
            "http://192.168.2.29:3000/test1_show3.png"
        ],
        "production_code": 1,
        "status": 1,
        "productionId": "58d8d1ae56e9cb0ee6235303"
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