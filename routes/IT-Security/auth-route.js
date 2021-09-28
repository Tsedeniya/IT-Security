const router = require('express-promise-router')();

const authController = require('../../controllers/auth-controller');

router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.get('/logout', authController.logout)
module.exports = router;