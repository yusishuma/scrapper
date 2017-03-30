/**
 * Created by tonghema on 30/03/2017.
 */
var express = require('express');
var router = express.Router();
var contact_controller = require('../controllers/contact_controller');

/* 获取某用户收货信息列表 */
router.get('/', contact_controller.getContactsList);

/* 生成新收货信息 */
router.post('/', contact_controller.createContact);

/* 更新收货信息 */
// router.put('/:contactId', contact_controller.updateContact);

/* 获取收货信息详情 */
router.get('/:contactId', contact_controller.getContact);

module.exports = router;