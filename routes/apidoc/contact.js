/**
 * Created by tonghema on 30/03/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {get} /contacts 获取收货信息列表
 * @apiName GetContactList
 * @apiGroup Contact
 *
 *
 * @apiParam {String} userId
 * @apiSuccess {Object[]} data   请求结果
 * @apiSuccess {String} data.name   收货人
 * @apiSuccess {String} data.phone  联系电话
 * @apiSuccess {String} data.owner   用户Id
 * @apiSuccess {Object} data.shippingAddress   用户设计思路文稿
 * @apiSuccess {String} data.shippingAddress.province   省
 * @apiSuccess {String} data.shippingAddress.city   市
 * @apiSuccess {String} data.shippingAddress.area    区
 * @apiSuccess {String} data.shippingAddress.details    详细地址
 * @apiSuccess {String} data.isDefault   是否为默认地址
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
    "status": 1,
    "data": [
        {
            "owner": "58d878838b81190732fdd202",
            "phone": "15911020373",
            "updatedAt": "2017-03-30 17:13:10",
            "createdAt": "2017-03-30 17:13:10",
            "isDefault": true,
            "shippingAddress": {
                "province": "北京",
                "city": "北京市",
                "area": "朝阳区",
                "details": "东方科技园"
            },
            "name": "首单人",
            "contactId": "58dccc26541a09a0a5b61b73"
        }
    ]
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
 * @api {post} /contacts 创建收货信息
 * @apiName createContact
 * @apiGroup Contact
 * @apiParam {String} owner 用户Id
 * @apiExample {json} Request-Example:
 * {
 *	"owner":"58d878838b81190732fdd202",
 *	"phone": "15911020373",
 *	"name": "首单人",
 *	"shippingAddress":{
 *		"province":"北京",
 *		"city":"北京市",
 *		"area":"朝阳区",
 *		"details":"东方科技园"
 *	}
 *}
 *
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.name   收货人
 * @apiSuccess {String} data.phone  联系电话
 * @apiSuccess {String} data.owner   用户Id
 * @apiSuccess {Object} data.shippingAddress   用户设计思路文稿
 * @apiSuccess {String} data.shippingAddress.province   省
 * @apiSuccess {String} data.shippingAddress.city   市
 * @apiSuccess {String} data.shippingAddress.area    区
 * @apiSuccess {String} data.shippingAddress.details    详细地址
 * @apiSuccess {String} data.isDefault   是否为默认地址
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "owner": "58d878838b81190732fdd202",
        "phone": "15911020373",
        "updatedAt": "2017-03-30 17:13:10",
        "createdAt": "2017-03-30 17:13:10",
        "isDefault": true,
        "shippingAddress": {
            "province": "北京",
            "city": "北京市",
            "area": "朝阳区",
            "details": "东方科技园"
        },
        "name": "首单人",
        "contactId": "58dccc26541a09a0a5b61b73"
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
 * @api {put} /contacts/:contactId 更新收货信息
 * @apiName updateContact
 * @apiGroup Contact
 * @apiParam {String} contactId 收货信息Id
 *
 * @apiExample {json} Request-Example:
 * {
 *	"owner":"58d878838b81190732fdd202",
 *	"phone": "15911020373",
 *	"name": "首单人",
 *	"shippingAddress":{
 *		"province":"北京",
 *		"city":"北京市",
 *		"area":"朝阳区",
 *		"details":"东方科技园"
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
/**
 * @apiVersion 1.0.0
 * @api {get} /contacts/:contactId 获取收货信息详情
 * @apiName GetContact
 * @apiGroup Contact
 *
 *
 * @apiParam {String} contactId
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.name   收货人
 * @apiSuccess {String} data.phone  联系电话
 * @apiSuccess {String} data.owner   用户Id
 * @apiSuccess {Object} data.shippingAddress   用户设计思路文稿
 * @apiSuccess {String} data.shippingAddress.province   省
 * @apiSuccess {String} data.shippingAddress.city   市
 * @apiSuccess {String} data.shippingAddress.area    区
 * @apiSuccess {String} data.shippingAddress.details    详细地址
 * @apiSuccess {String} data.isDefault   是否为默认地址
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "owner": "58d878838b81190732fdd202",
        "phone": "15911020373",
        "updatedAt": "2017-03-30 17:13:10",
        "createdAt": "2017-03-30 17:13:10",
        "isDefault": true,
        "shippingAddress": {
            "province": "北京",
            "city": "北京市",
            "area": "朝阳区",
            "details": "东方科技园"
        },
        "name": "首单人",
        "contactId": "58dccc26541a09a0a5b61b73"
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

