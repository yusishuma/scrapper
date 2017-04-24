/**
 * Created by tonghema on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var team = require('../controllers/team_controller');

/* GET 战队 listing. */
router.get('/', team.getTeamsByList);

/* 获取战队信息 */
router.get('/:teamId', team.getTeam);

/* 更新战队信息 */
router.put('/:teamId', team.updateTeam);

/* 保存战队信息到正服数据 */
router.post('/', team.synchroTeamToPro);
module.exports = router;
