const router = require('express-promise-router')();
var {hasPermissions} = require('../../middleware/auth')
const userController = require('../../controllers/user-controller');

  
router.get('/',hasPermissions(['view all users']),userController.getAllUsers)

router.get('/:id',hasPermissions(['view user']), userController.getUserById);
router.delete('/delete/:id',hasPermissions(['delete user']) ,userController.deleteUser);
  
router.patch('/update/:id',hasPermissions(['user']),userController.updateUser)

  
  

module.exports = router;

