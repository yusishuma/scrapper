/**
 * Created by tonghema on 21/04/2017.
 */
/**
 * @apiVersion 1.0.0
 * @api {get} /gambles?limit=12&gameType=1&page=1 获取赌局列表
 * @apiName GetGambles
 * @apiGroup Gambles
 *
 * @apiParam {Number} gameType 游戏类型【CSGO：1， LOL: 2, DOTA2: 3】
 * @apiParam {Number} limit 每页显示条目数（步长）默认为 20
 * @apiParam {Number} page 当前页数 > = 1
 * @apiParam {String} matchName 赛程名称
 * @apiParam {String} gambleName 赌局名称
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {Object[]} data.gambles   用户名
 * @apiSuccess {Object} data.league   所属赛事
 * @apiSuccess {String} data.league.leagueName   所属赛事名称
 * @apiSuccess {String} data.league.leagueId   所属赛事ID
 * @apiSuccess {String} data.gambles.gameType   游戏类型
 * @apiSuccess {String} data.gambles.gambleName   赌局名称
 * @apiSuccess {String} data.gambles.match   赌局所属比赛
 * @apiSuccess {Number} data.gambles.endTime   赌局结束时间
 * @apiSuccess {Number} data.gambles.gambleSource   赌局来源
 * @apiSuccess {Object} data.gambles.optionA   赌局下注项A
 * @apiSuccess {Number} data.gambles.optionA.riskFund   赌局风险金
 * @apiSuccess {Number} data.gambles.optionA.payCeiling   赌局单注赔付上限
 * @apiSuccess {Object} data.gambles.optionB   赌局下注项A
 * @apiSuccess {Number} data.gambles.optionB.riskFund   赌局风险金
 * @apiSuccess {Number} data.gambles.optionB.payCeiling   赌局单注赔付上限
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "msg": "success",
    "status": 1,
    "data": {
        "gambles": [
            {
                "gameType": 1,
                "gambleType": 1,
                "gambleName": "胜负",
                "endTime": 1492768800,
                "gambleStatus": 2,
                "league": {
                    "leagueName": "CS:GO - Assembly AMD Challenge",
                    "leagueId": "58f70f261b00bbf93204fea7"
                },
                "match": "Fnatic vs Misfits",
                "gambleSourceId": "261799",
                "gambleSource": 2,
                "commentNum": 0,
                "isExist": 0,
                "allBetPeopleNum": 0,
                "allBetAmount": 0,
                "optionB": {
                    "riskFund": 20000,
                    "payCeiling": 2000,
                    "win": false,
                    "odds": 1.45
                },
                "optionA": {
                    "riskFund": 10000,
                    "payCeiling": 1000,
                    "win": false,
                    "odds": 1.65
                },
                "createdAt": "2017-04-21T10:59:11.301Z",
                "gambleId": "58f9c2681b00bbf932055dfa"
            },
            {
                "gameType": 1,
                "gambleType": 1,
                "gambleName": "胜负",
                "endTime": 1492764454,
                "gambleStatus": 2,
                "league": {
                    "leagueName": "CS:GO - Assembly AMD Challenge",
                    "leagueId": "58f70f261b00bbf93204fea7"
                },
                "match": "Fnatic vs Misfits",
                "gambleSourceId": "261799",
                "gambleSource": 2,
                "commentNum": 0,
                "isExist": 0,
                "allBetPeopleNum": 0,
                "allBetAmount": 0,
                "optionB": {
                    "riskFund": 20000,
                    "payCeiling": 2000,
                    "win": false,
                    "odds": 1.67
                },
                "optionA": {
                    "riskFund": 10000,
                    "payCeiling": 1000,
                    "win": true,
                    "odds": 1.25
                },
                "createdAt": "2017-04-21T10:59:11.304Z",
                "gambleId": "58f9c7951b00bbf93205630a"
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
 * @api {get} /gambles/:gambleId 获取赌局详情
 * @apiName GetGamble
 * @apiGroup Gambles
 *
 * @apiParam {String} gambleId 赌局ID
 * @apiSuccess {Object} data   请求结果
 * @apiSuccess {String} data.gameType   游戏类型
 * @apiSuccess {String} data.gambleName   赌局名称
 * @apiSuccess {Number} data.level   赌局等级
 * @apiSuccess {Number} data.riskFund   赌局风险金
 * @apiSuccess {Number} data.payCeiling   赌局单注赔付上限
 * @apiSuccess {Number} data.gambleStatus   赌局正服是否存在【 0 不存在 1 存在 】

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
   "msg": "success",
   "status": 1,
   "data": {
     "gameType": "CSGO",
     "gambleName": "CS:GO - Assembly AMD Challenge",
     "level": 1,
     "gambleSource": 2,
     "riskFund": 10000,
     "payCeiling": 1000,
     "gambleStatus": 2,
     "createdAt": "2017-04-19T09:43:30.377Z",
     "gambleId": "58f70f261b00bbf93204fea7"
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
 * @api {PUT} /gambles/:gambleId 更新赌局
 * @apiName updateGamble
 * @apiGroup Gambles
 *
 * @apiParam {String} gambleId 赌局ID
 * @apiParam {Object} optionA 赌局下注项A
 * @apiParam {Number} optionA.riskFund 赌局下注项A
 * @apiParam {Number} optionA.payCeiling 赌局下注项A
 * @apiParam {Object} optionB 赌局下注项B
 * @apiParam {Number} optionB.riskFund 赌局下注项B
 * @apiParam {Number} optionB.payCeiling 赌局下注项B
 * @apiExample {json} Request-Example:
 * {"optionB": {
          "riskFund": 20000,
          "payCeiling": 2000
        },
        "optionA": {
          "riskFund": 10000,
          "payCeiling": 1000
        }
 *}
 * @apiSuccess {Object} data   请求结果
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "更新赌局成功",
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
 * @api {POST} /gambles 同步创建赌局
 * @apiName synchroGambleToPro
 * @apiGroup Gambles
 *
 * @apiParam {String} gambleId 赌局ID
 * @apiSuccess {Object} data   请求结果
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 {
    "msg": "同步创建赌局成功",
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