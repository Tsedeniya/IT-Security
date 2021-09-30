const userModel = require('../models/user-model');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { jwt_key } = require('../config/vars')
const roleModel = require('../models/role-model');



exports.signup = async(req,res)=>{
  try {
    const schema = Joi.object({
        full_name:Joi.string().required(),
        username: Joi.string()
            .alphanum().required(),
    
        password: Joi.string()
            .required(),
        email: Joi.string()
            .email().required()
    })
    if(schema.validate(req.body).error){
        throw new Error(schema.validate(req.body).error)
    }
    let data = await roleModel.find({
        name: {
            $in: 'member'// [1,2,3]
        }
    })
      let user = await userModel.create({
            
        full_name:req.body.full_name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        roles:data.map(val => val._id)
       } );
     
          return res.json(user)
     

  } catch (error) {
      res.status(400).json({
           error : true,
           message:error.message

      })
  }

}
exports.login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({
            username: req.body.username
        }).populate({ path: 'roles', populate: {path: 'permissions'} });

        if(user && await user.verifyPassword(req.body.password)){
            // 1. map through all roles
            // 2. find each permissions inside the role
            // 3. combine permissions
            let permissions =  user._doc.roles.reduce((prev, next) => {
                return [...prev, ...next.permissions.map(permission => permission.name)]
            },[])
            user._doc.permissions = Array.from(new Set([...user._doc.permissions.map(v => v.name), ...permissions ]))

            user._doc.roles = user._doc.roles.map(role => role.name)
            req.brute.reset();
            return res.json({

                ...user._doc,
                token : jwt.sign({ data: user._doc, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, jwt_key, { algorithm: 'HS256' })
               
            })
        } else {

            throw new Error("Username/password not found")
        }



    }

    catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}


exports.logout = async(req, res) => {
    res.status(200).send({ auth: false, token: null });
  }
  