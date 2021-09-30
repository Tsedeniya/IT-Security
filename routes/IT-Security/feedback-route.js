const router = require('express-promise-router')();
var {hasPermissions,verifyToken} = require('../../middleware/auth')
const feedbackController = require('../../controllers/feedback-controller');


router.get('/',hasPermissions(['veiw all feedback']),feedbackController.getAllFeedbacks)

router.get('/:id',verifyToken(),hasPermissions(['view feedback']),feedbackController.getFeedbackById);

router.post('/create/:id',verifyToken(),hasPermissions(['create feedback']),  feedbackController.create);

router.get('/download/:path',verifyToken(), hasPermissions(['view feedback']),feedbackController.downloadfeedback);

router.delete('/delete/:id' ,verifyToken() ,hasPermissions(['delete feedback']),feedbackController.deleteFeedback);
  
router.patch('/update/:id',verifyToken(),hasPermissions(['update feedback']),feedbackController.updateFeedback)


module.exports = router;

