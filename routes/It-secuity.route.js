var express = require('express');
var router = express.Router();
var users = require('./IT-Security/user-route');
var auth = require('./IT-Security/auth-route');
var feedback = require('./IT-Security/feedback-route')
var index = require('./IT-Security/index')
router.use('/',index);
router.use('/auth',auth);
router.use('/users',users);
router.use('/feedback',feedback);
module.exports = router;