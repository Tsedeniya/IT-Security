const router = require('express-promise-router')();
var {hasPermissions,verifyToken} = require('../../middleware/auth')
const userController = require('../../controllers/user-controller');

  
router.get('/',hasPermissions(['view all users']),userController.getAllUsers)

router.get('/:id',verifyToken(),hasPermissions(['view feedback']), userController.getUserById);
router.delete('/delete/:id',verifyToken(),hasPermissions(['delete user']) ,userController.deleteUser);
  
router.patch('/update/:id',verifyToken(),hasPermissions(['update user']),userController.updateUser)
router.post('/profile',(req,res)=>{
    const {user} = req
    if(user){
        res.json({

        _id:user.data._id,
        full_name:user.data.full_name,
        email:user.data.email,
        roles:user.data.roles
        })
    }
})

  

module.exports = router;

