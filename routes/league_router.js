/**
 * Created by tonghema on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var league = require('../controllers/league_controller');

/* GET 赛事 listing. */
router.get('/', league.getLeaguesByList);

/* 获取赛事信息 */
router.get('/:leagueId', league.getLeague);

/* 更新赛事信息 */
router.put('/:leagueId', league.updateLeague);

/* 保存赛事信息到正服数据 */
router.post('/', league.synchroLeagueToPro);

module.exports = router;
