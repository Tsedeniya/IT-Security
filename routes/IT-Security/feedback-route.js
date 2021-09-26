const router = require('express-promise-router')();
var {hasPermissions} = require('../../middleware/auth')
const feedbackController = require('../../controllers/feedback-controller');
const upload = require('../../middleware/upload');

router.get('/',feedbackController.getAllFeedbacks)

router.get('/:id', feedbackController.getFeedbackById);
  
router.post('/create/:id',upload.single('comment file'), feedbackController.create);

 
router.delete('/delete/:id' ,feedbackController.deleteFeedback);
  
router.patch('/update/:id',feedbackController.updateFeedback)

  
  

module.exports = router;

