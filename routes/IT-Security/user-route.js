const router = require('express-promise-router')();
var {hasPermissions} = require('../../middleware/auth')
const userController = require('../../controllers/user-controller');

  
router.get('/',userController.getAllUsers)

router.get('/:id', userController.getUserById);
  
router.post('/create',userController.create);

 
router.delete('/delete/:id' ,userController.deleteUser);
  
router.patch('/update/:id',userController.updateUser)

  //view a user 
 

  //view all users
  

  module.exports = router;

