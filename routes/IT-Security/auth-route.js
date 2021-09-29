const router = require('express-promise-router')();
var ExpressBrute = require('express-brute');
const authController = require('../../controllers/auth-controller');
MemcachedStore = require('express-brute-memcached'),
moment = require('moment')

let store = new ExpressBrute.MemoryStore(); 

var failCallback = function (req, res, next, nextValidRequestDate) {
    res.status(400).json({
        error: true,
        message: 'You have incurred too many attempts. Try again later.'
    })  
};
var handleStoreError = function (error) {
	log.error(error); // log this error so we can figure out what went wrong
	// cause node to exit, hopefully restarting the process fixes the problem
	throw {
		message: error.message,
		parent: error.parent
	};
}
// Start slowing requests after 5 failed attempts to do something for the same user
var userBruteforce = new ExpressBrute(store, {
	freeRetries: 5,
	minWait: 5*60*1000, // 5 minutes
	maxWait: 60*60*1000, // 1 hour,
	failCallback: failCallback,
	handleStoreError: handleStoreError
});
// No more than 1000 login attempts per day per IP
var globalBruteforce = new ExpressBrute(store, {
	freeRetries: 1000,
	attachResetToRequest: false,
	refreshTimeoutOnRequest: false,
	minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
	maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
	lifetime: 24*60*60, // 1 day (seconds not milliseconds)
	failCallback: failCallback,
	handleStoreError: handleStoreError
});

router.post('/login',globalBruteforce.prevent,
userBruteforce.getMiddleware({
    key: function(req, res, next) {
        // prevent too many attempts for the same username
        next(req.body.username);
    }
}),authController.login);
router.post('/signup',authController.signup);
router.get('/logout', authController.logout)
module.exports = router;