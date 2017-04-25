/**
 * Created by tonghema on 25/04/2017.
 */

/**
 * @apiVersion 1.0.0
 * @api {get} /matches?limit=12&gameType=1&page=1 获取赛程列表
 * @apiName GetMatches
 * @apiGroup Matches
 *
 * @apiParam {Number} gameType 游戏类型【CSGO：1， LOL: 2, DOTA2: 3】
 * @apiParam {Number} limit 每页显示条目数（步长）默认为 20
 * @apiParam {Number} page 当前页数 > = 1
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {Object[]} data.matches   赛程
 * @apiSuccess {String} data.matches.gameType   游戏类型
 * @apiSuccess {String} data.matches.matchName   赛程名称
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "msg": "success",
     "status": 1,
     "data": {
         "matches": [
             {
                 "matchName": "Tricked",
                 "gameType": "CSGO",
                 "isExist": 0,
                 "createdAt": "2017-04-24T03:30:29.810Z",
                 "matchId": "58fd65801b00bbf932058b6e"
             },
             {
                 "matchName": "passions",
                 "gameType": "CSGO",
                 "isExist": 0,
                 "createdAt": "2017-04-24T03:30:29.812Z",
                 "matchId": "58fd71121b00bbf9320593ec"
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
