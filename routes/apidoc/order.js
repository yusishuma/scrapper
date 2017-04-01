/**
 * Created by tonghema on 01/04/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {post} /orders 创建订单信息
 * @apiName createOrder
 * @apiGroup Order
 * @apiParam {String} owner 用户Id
 * @apiExample {json} Request-Example:
 * {
	"owner":"58d878838b81190732fdd202",
	"productions": [{
		"production":"58d8d1ae56e9cb0ee6235303",
		"count":1
	}],
	"name": "首单人"
}
 *
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.order_code   订单编号
 * @apiSuccess {String} data.paymentDec  订单价格
 * @apiSuccess {Number} data.payment  订单价格 * 100
 * @apiSuccess {Object} data.owner   用户Id
 * @apiSuccess {Object[]} data.productions   订单中的商品
 * @apiSuccess {Object} data.productions.production   商品ID
 * @apiSuccess {Number} data.productions.count   商品数量
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "order_code": "149102235610110860",
        "paymentDec": 1020.11,
        "payment": 102011,
        "owner": {
            "username": "15811020373",
            "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
            "design": {
                "title": "一个好的创意",
                "img": "",
                "content": "就是个好的创意，就这么不讲理"
            },
            "gender": 1,
            "nickname": "yusi",
            "updatedAt": "2017-04-01 12:52:36",
            "createdAt": "2017-04-01 12:52:36",
            "userId": "58d878838b81190732fdd202"
        },
        "updatedAt": "2017-04-01 12:52:36",
        "createdAt": "2017-04-01 12:52:36",
        "productions": [
            {
                "production": {
                    "price": 1020.11,
                    "amount": 50,
                    "cover": "http://192.168.2.29:3000/test1_cover.png",
                    "title": "精品卫衣",
                    "description": "test production description",
                    "designers": [
                        {
                            "username": "15811020373",
                            "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
                            "design": {
                                "title": "一个好的创意",
                                "img": "",
                                "content": "就是个好的创意，就这么不讲理"
                            },
                            "gender": 1,
                            "nickname": "yusi",
                            "updatedAt": "2017-04-01 12:52:36",
                            "createdAt": "2017-04-01 12:52:36",
                            "userId": "58d878838b81190732fdd202"
                        }
                    ],
                    "showImages": [
                        "http://192.168.2.29:3000/test1_show1.png",
                        "http://192.168.2.29:3000/test1_show2.png",
                        "http://192.168.2.29:3000/test1_show3.png"
                    ],
                    "status": 1,
                    "updatedAt": "2017-04-01 12:52:36",
                    "createdAt": "2017-04-01 12:52:36",
                    "productionId": "58d8d1ae56e9cb0ee6235303"
                },
                "count": 1,
                "_id": "58df321411b1b510f5132eae"
            }
        ],
        "status": 0,
        "orderId": "58df321411b1b510f5132ead"
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
 * @api {get} /orders 获取订单列表
 * @apiName getOrderList
 * @apiGroup Order
 * @apiParam {String} userId 用户Id
 * @apiParam {Number} page 页码 默认为 1
 * @apiParam {Number} limit 步长 默认为 20
 *
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {Object[]} data.orders   订单列表
 * @apiSuccess {Number} data.count   订单数量
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "orders": [
            {
                "order_code": "14910219386387376",
                "paymentDec": 1020.11,
                "payment": 102011,
                "owner": "58d878838b81190732fdd202",
                "updatedAt": "2017-04-01 12:45:38",
                "createdAt": "2017-04-01 12:45:38",
                "productions": [
                    {
                        "production": "58d8d1ae56e9cb0ee6235303",
                        "count": 1,
                        "_id": "58df3072e910851057162399"
                    }
                ],
                "status": 6,
                "orderId": "58df3072e910851057162398"
            }
        ],
        "count": 1
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
 * @api {get} /orders 获取订单详情
 * @apiName getOrder
 * @apiGroup Order
 * @apiParam {String} orderId 订单Id
 *
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.order_code   订单编号
 * @apiSuccess {String} data.paymentDec  订单价格
 * @apiSuccess {Number} data.payment  订单价格 * 100
 * @apiSuccess {Object} data.owner   用户Id
 * @apiSuccess {Object[]} data.productions   订单中的商品
 * @apiSuccess {Object} data.productions.production   商品ID
 * @apiSuccess {Number} data.productions.count   商品数量
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "order_code": "14910219386387376",
        "paymentDec": 1020.11,
        "payment": 102011,
        "owner": {
            "username": "15811020373",
            "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
            "design": {
                "title": "一个好的创意",
                "img": "",
                "content": "就是个好的创意，就这么不讲理"
            },
            "gender": 1,
            "nickname": "yusi",
            "updatedAt": "2017-04-01 13:08:04",
            "createdAt": "2017-04-01 13:08:04",
            "userId": "58d878838b81190732fdd202"
        },
        "updatedAt": "2017-04-01 12:45:38",
        "createdAt": "2017-04-01 12:45:38",
        "productions": [
            {
                "production": {
                    "price": 1020.11,
                    "amount": 50,
                    "cover": "http://192.168.2.29:3000/test1_cover.png",
                    "title": "精品卫衣",
                    "description": "test production description",
                    "designers": [
                        {
                            "username": "15811020373",
                            "avatar": "http://192.168.2.29:3000/test1_avatar.jpg",
                            "design": {
                                "title": "一个好的创意",
                                "img": "",
                                "content": "就是个好的创意，就这么不讲理"
                            },
                            "gender": 1,
                            "nickname": "yusi",
                            "updatedAt": "2017-04-01 13:08:04",
                            "createdAt": "2017-04-01 13:08:04",
                            "userId": "58d878838b81190732fdd202"
                        }
                    ],
                    "showImages": [
                        "http://192.168.2.29:3000/test1_show1.png",
                        "http://192.168.2.29:3000/test1_show2.png",
                        "http://192.168.2.29:3000/test1_show3.png"
                    ],
                    "status": 1,
                    "updatedAt": "2017-04-01 13:08:04",
                    "createdAt": "2017-04-01 13:08:04",
                    "productionId": "58d8d1ae56e9cb0ee6235303"
                },
                "count": 1,
                "_id": "58df3072e910851057162399"
            }
        ],
        "status": 6,
        "orderId": "58df3072e910851057162398"
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
