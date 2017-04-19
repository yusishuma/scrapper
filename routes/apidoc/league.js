/**
 * Created by tonghema on 19/04/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {get} /leagues?limit=12&gameType=1&page=1 获取赛事列表
 * @apiName GetLeagues
 * @apiGroup Leagues
 *
 * @apiParam {Number} gameType 游戏类型【CSGO：1， LOL: 2, DOTA2: 3】
 * @apiParam {Number} limit 每页显示条目数（步长）默认为 20
 * @apiParam {Number} page 当前页数 > = 1
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {Object[]} data.leagues   用户名
 * @apiSuccess {String} data.leagues.gameType   游戏类型
 * @apiSuccess {String} data.leagues.leagueName   赛事名称
 * @apiSuccess {Number} data.leagues.level   赛事等级
 * @apiSuccess {Number} data.leagues.riskFund   赛事风险金
 * @apiSuccess {Number} data.leagues.payCeiling   赛事单注赔付上限

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
  "msg": "success",
  "status": 1,
  "data": {
    "leagues": [
      {
        "gameType": "CSGO",
        "leagueName": "CS:GO - Assembly AMD Challenge",
        "level": 1,
        "leagueSource": 2,
        "riskFund": 10000,
        "payCeiling": 1000,
        "leagueStatus": 2,
        "createdAt": "2017-04-19T08:31:16.291Z",
        "leagueId": "58f70f261b00bbf93204fea7"
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
