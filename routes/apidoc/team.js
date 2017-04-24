/**
 * Created by tonghema on 24/04/2017.
 */

/**
 * @apiVersion 1.0.0
 * @api {get} /teams?limit=12&gameType=1&page=1 获取战队列表
 * @apiName GetTeams
 * @apiGroup Teams
 *
 * @apiParam {Number} gameType 游戏类型【CSGO：1， LOL: 2, DOTA2: 3】
 * @apiParam {Number} limit 每页显示条目数（步长）默认为 20
 * @apiParam {Number} page 当前页数 > = 1
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {Object[]} data.teams   战队
 * @apiSuccess {String} data.teams.gameType   游戏类型
 * @apiSuccess {String} data.teams.teamName   战队名称
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "msg": "success",
     "status": 1,
     "data": {
         "teams": [
             {
                 "teamName": "Tricked",
                 "gameType": "CSGO",
                 "isExist": 0,
                 "createdAt": "2017-04-24T03:30:29.810Z",
                 "teamId": "58fd65801b00bbf932058b6e"
             },
             {
                 "teamName": "passions",
                 "gameType": "CSGO",
                 "isExist": 0,
                 "createdAt": "2017-04-24T03:30:29.812Z",
                 "teamId": "58fd71121b00bbf9320593ec"
             }
         ],
         "count": 2
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
 * @api {get} /teams/:teamId 获取战队详情
 * @apiName GetTeam
 * @apiGroup Teams
 *
 * @apiParam {String} teamId 战队ID
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.gameType   游戏类型
 * @apiSuccess {String} data.teamName   战队名称
 * @apiSuccess {Number} data.isExist   战队正服是否存在【 0 不存在 1 存在 】

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
   "msg": "success",
   "status": 1,
   "data": {
     "teamName": "Tricked",
     "gameType": "CSGO",
     "isExist": 0,
     "createdAt": "2017-04-24T03:38:21.178Z",
     "teamId": "58fd65801b00bbf932058b6e"
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
