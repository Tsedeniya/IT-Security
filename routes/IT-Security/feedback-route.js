const router = require('express-promise-router')();
var {hasPermissions} = require('../../middleware/auth')
const feedbackController = require('../../controllers/feedback-controller');
const upload = require('../../middleware/upload');

router.get('/',hasPermissions(['veiw all feedback']),feedbackController.getAllFeedbacks)

router.get('/:id',hasPermissions(['view feedback']),feedbackController.getFeedbackById);
  
router.post('/create/:id',hasPermissions(['create feedback']),upload.single('file'), feedbackController.create);

 
router.delete('/delete/:id' ,hasPermissions(['delete feedback']),feedbackController.deleteFeedback);
  
router.patch('/update/:id',hasPermissions(['update feedback']),feedbackController.updateFeedback)

  
  

module.exports = router;

