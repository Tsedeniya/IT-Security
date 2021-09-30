exports.hasPermissions = (permissions) => (req, res, next)  => {
    const { user } = req
    const errors = []
    try {

        if(user) {
            if (typeof permissions === 'string'){
                permissions = [permissions]
            }
            permissions.forEach(permission => {
                if(!user.data.permissions.includes(permission)) {
                    errors.push(`You dont have ${permission} permission`)
                }
            });

            if(errors.length === 0 ) {
                return  next();
            }
            throw new Error('You dont have the correct privilege ')
        }
        // throw new Error('You dont have the correct privilege ')
      } catch(err) {
        // err
        console.log(err, 'err');
        res.status(401).json({
            error: true,
            message: errors
        })
      }
}


exports.isAdmin = (req,res,next)=>{

}

exports.isMember = (req,res,next)=>{

}
exports.verifyToken = ()=>(req,res,next)=>{
    const { user } = req
    if(!user){
        return res.status(403).send({
            message: "No token provided!"
          });
    }
    user.data._id == req.userId
    next()
    

}