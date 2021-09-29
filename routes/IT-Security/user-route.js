const router = require('express-promise-router')();
var {hasPermissions} = require('../../middleware/auth')
const userController = require('../../controllers/user-controller');

  
router.get('/',hasPermissions(['view all users']),userController.getAllUsers)

router.get('/:id',hasPermissions(['view user']), userController.getUserById);
router.delete('/delete/:id',hasPermissions(['delete user']) ,userController.deleteUser);
  
router.patch('/update/:id',hasPermissions(['update user']),userController.updateUser)
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

